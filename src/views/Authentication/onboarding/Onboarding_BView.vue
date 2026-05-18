<template>
    <div class="" style="height: 5vh; background-color: #1E1E1E; border-bottom: 1px solid #B5B5B5">
      <div class="w-25 h-100 d-flex flex-column justify-center align-center">
        <v-btn variant="text" style="width: fit-content;" @click="$router.back()">
          ← Back
        </v-btn>
      </div>
      
    </div>

  <div class="app">
    <!-- Header -->

    <!-- Main Camera Area -->
    <main class="main">
      <div class="camera-container">

        <!-- Scan overlay grid -->
        <div class="scan-grid">
          <div v-for="n in 20" :key="n" class="grid-line-h" :style="{ top: (n * 5) + '%' }"></div>
          <div v-for="n in 20" :key="'v' + n" class="grid-line-v" :style="{ left: (n * 5) + '%' }"></div>
        </div>

        <!-- Video feed -->
        <video ref="videoEl" class="video-feed" autoplay playsinline muted></video>

        <!-- Canvas (hidden, used for frame capture) -->
        <canvas ref="canvasEl" class="capture-canvas"></canvas>

        <!-- Corner brackets -->
        <!-- <div class="corner tl"></div> -->
        <!-- <div class="corner tr"></div>
        <div class="corner bl"></div>
        <div class="corner br"></div> -->

        <!-- Face bounding boxes -->
        <div
          v-for="(face, i) in detectedFaces"
          :key="i"
          class="face-box"
          :style="{
            left: face.x + 'px',
            top: face.y + 'px',
            width: face.width + 'px',
            height: face.height + 'px'
          }"
        >
          <div class="face-label">
            <span class="face-name">{{ face.name || 'Unknown' }}</span>
            <span class="face-conf">{{ face.confidence ? (face.confidence * 100).toFixed(1) + '%' : '' }}</span>
          </div>
        </div>

        <!-- Scan line animation (active when recognizing) -->
        <div class="scan-line" :class="{ active: isRecognizing }"></div>

        <!-- No camera message -->
        <div v-if="!cameraActive" class="no-camera">
          <div class="no-camera-icon">◎</div>
          <p>Camera not active</p>
          <button class="start-btn" @click="startCamera">Start Camera</button>
        </div>

        <!-- Recognition result overlay -->
        <transition name="result-fade">
          <div v-if="lastResult" class="result-overlay" :class="lastResult.status">
            <div class="result-icon">{{ lastResult.status === 'match' ? '✓' : '✗' }}</div>
            <div class="result-name">{{ lastResult.name || 'No Match' }}</div>
            <div class="result-meta" v-if="lastResult.meta">{{ lastResult.meta }}</div>
          </div>
        </transition>
      </div>

    </main>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'FaceRecognition',

  data() {
    return {
      cameraActive: false,
      isRecognizing: false,
      mode: 'live',
      detectedFaces: [],
      logs: [],
      lastResult: null,
      errorMsg: null,
      captureInterval: 1000,       // ms between API calls
      threshold: 0.6,
      apiEndpoint: 'http://localhost:8000/api/face-recognize/',
      _intervalId: null,
      _resultTimeout: null,
    }
  },

  computed: {
    statusClass() {
      if (this.isRecognizing) return 'running'
      if (this.cameraActive) return 'ready'
      return 'idle'
    },
    statusLabel() {
      if (this.isRecognizing) return 'Recognizing'
      if (this.cameraActive) return 'Camera Ready'
      return 'Idle'
    }
  },

  mounted() {
    this.startCamera()
  },

  beforeUnmount() {
    this.stopRecognition()
    this.stopCamera()
  },

  methods: {
    // ── Camera ────────────────────────────────────────────────────────────
    async startCamera() {
      this.errorMsg = null
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } }
        })
        this.$refs.videoEl.srcObject = stream
        this.cameraActive = true
      } catch (err) {
        this.errorMsg = 'Camera access denied: ' + err.message
      }
    },

    stopCamera() {
      const video = this.$refs.videoEl
      if (video && video.srcObject) {
        video.srcObject.getTracks().forEach(t => t.stop())
        video.srcObject = null
      }
      this.cameraActive = false
    },

    // ── Frame Capture ─────────────────────────────────────────────────────
    captureFrame() {
      const video = this.$refs.videoEl
      const canvas = this.$refs.canvasEl
      if (!video || !canvas) return null

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext('2d')
      ctx.drawImage(video, 0, 0)

      // Return base64 JPEG (strip data URL prefix)
      return canvas.toDataURL('image/jpeg', 0.85).split(',')[1]
    },

    // ── API Call ──────────────────────────────────────────────────────────
    async sendFrameToApi(frameBase64) {
      try {
        /**
         * Django view should accept POST with JSON body:
         *   { image: "<base64 JPEG>", threshold: 0.6 }
         *
         * Expected response:
         * {
         *   faces: [
         *     {
         *       name: "John Doe",
         *       confidence: 0.93,
         *       bbox: { x: 120, y: 80, width: 200, height: 220 }
         *     }
         *   ],
         *   status: "match" | "no_match" | "no_face"
         * }
         */
        const response = await axios.post(
          this.apiEndpoint,
          {
            image: frameBase64,
            threshold: this.threshold,
          },
          {
            headers: { 'Content-Type': 'application/json' },
            // If your Django backend uses session auth or CSRF:
            // withCredentials: true,
            // headers: { 'X-CSRFToken': this.getCookie('csrftoken') }
          }
        )

        this.handleApiResponse(response.data)
        this.errorMsg = null
      } catch (err) {
        if (err.response) {
          this.errorMsg = `API error ${err.response.status}: ${err.response.data?.detail || 'Unknown error'}`
        } else {
          this.errorMsg = 'Network error: ' + err.message
        }
      }
    },

    handleApiResponse(data) {
      // Update bounding boxes
      this.detectedFaces = (data.faces || []).map(f => ({
        x: f.bbox?.x ?? 0,
        y: f.bbox?.y ?? 0,
        width: f.bbox?.width ?? 100,
        height: f.bbox?.height ?? 100,
        name: f.name,
        confidence: f.confidence,
      }))

      // Show result overlay
      const primaryFace = data.faces?.[0]
      if (data.status !== 'no_face') {
        this.lastResult = {
          status: data.status,
          name: primaryFace?.name || 'Unknown',
          meta: primaryFace ? `Confidence: ${(primaryFace.confidence * 100).toFixed(1)}%` : null,
        }
        clearTimeout(this._resultTimeout)
        this._resultTimeout = setTimeout(() => { this.lastResult = null }, 2500)

        // Add to log
        this.logs.unshift({
          time: new Date().toLocaleTimeString(),
          name: primaryFace?.name || 'Unknown',
          confidence: primaryFace ? `${(primaryFace.confidence * 100).toFixed(1)}%` : '—',
          status: data.status,
        })
        if (this.logs.length > 50) this.logs.pop()
      }
    },

    // ── Recognition Loop ──────────────────────────────────────────────────
    toggleRecognition() {
      this.isRecognizing ? this.stopRecognition() : this.startRecognition()
    },

    startRecognition() {
      if (!this.cameraActive) return
      this.isRecognizing = true
      const run = async () => {
        if (!this.isRecognizing) return
        const frame = this.captureFrame()
        if (frame) await this.sendFrameToApi(frame)
        this._intervalId = setTimeout(run, this.captureInterval)
      }
      run()
    },

    stopRecognition() {
      this.isRecognizing = false
      clearTimeout(this._intervalId)
      this.detectedFaces = []
    },

    async captureOnce() {
      const frame = this.captureFrame()
      if (frame) await this.sendFrameToApi(frame)
    },

    // ── Helpers ───────────────────────────────────────────────────────────
    getCookie(name) {
      const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
      return match ? match[2] : ''
    },
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Barlow:wght@300;400;600&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

.app {
  display: flex;
  flex-direction: column;
  background: #000;
  color: #e0e0e0;
  height: 95vh;
  font-family: 'Barlow', sans-serif;
}

/* ── Header ─────────────────────────────────────────────────────── */
.header {
  height: 56px;
  background: #1c1c1e;
  border-bottom: 1px solid #2e2e30;
  flex-shrink: 0;
}

.header-inner {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 24px;
  gap: 24px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 18px;
  letter-spacing: 3px;
  color: #fff;
}

.logo-icon { color: #00e5ff; font-size: 20px; }

.status-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 11px;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-left: auto;
}

.status-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: #444;
  transition: background 0.3s;
}
.status-dot.ready { background: #00e5ff; box-shadow: 0 0 6px #00e5ff; }
.status-dot.running {
  background: #00ff88;
  box-shadow: 0 0 8px #00ff88;
  animation: pulse-dot 1s infinite;
}
@keyframes pulse-dot {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.nav { display: flex; gap: 4px; }
.nav-btn {
  background: transparent;
  border: 1px solid #333;
  color: #888;
  padding: 4px 14px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 11px;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.2s;
}
.nav-btn.active, .nav-btn:hover {
  border-color: #00e5ff;
  color: #00e5ff;
}

/* ── Main ────────────────────────────────────────────────────────── */
.main {
  display: flex;
  flex: 1;
  overflow: hidden;
}

/* ── Camera Container ────────────────────────────────────────────── */
.camera-container {
  position: relative;
  flex: 1;
  background: #000;
  overflow: hidden;
}

.video-feed {
  width: 100%; height: 100%;
  object-fit: cover;
  display: block;
}

.capture-canvas { display: none; }

/* Grid overlay */
.scan-grid { position: absolute; inset: 0; pointer-events: none; }
.grid-line-h {
  position: absolute; left: 0; right: 0; height: 1px;
  background: rgba(0, 229, 255, 0.04);
}
.grid-line-v {
  position: absolute; top: 0; bottom: 0; width: 1px;
  background: rgba(0, 229, 255, 0.04);
}

/* Corner brackets */
.corner {
  position: absolute;
  width: 28px; height: 28px;
  pointer-events: none;
}
.corner::before, .corner::after {
  content: '';
  position: absolute;
  background: #00e5ff;
}
.corner::before { width: 100%; height: 2px; }
.corner::after { width: 2px; height: 100%; }

.corner.tl { top: 16px; left: 16px; }
.corner.tl::before { top: 0; left: 0; }
.corner.tl::after { top: 0; left: 0; }

.corner.tr { top: 16px; right: 16px; }
.corner.tr::before { top: 0; right: 0; left: auto; }
.corner.tr::after { top: 0; right: 0; left: auto; }

.corner.bl { bottom: 16px; left: 16px; }
.corner.bl::before { bottom: 0; top: auto; }
.corner.bl::after { bottom: 0; top: auto; }

.corner.br { bottom: 16px; right: 16px; }
.corner.br::before { bottom: 0; top: auto; right: 0; left: auto; }
.corner.br::after { bottom: 0; top: auto; right: 0; left: auto; }

/* Scan line */
.scan-line {
  position: absolute;
  left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #00e5ff, transparent);
  top: -2px;
  opacity: 0;
  pointer-events: none;
}
.scan-line.active {
  opacity: 1;
  animation: scan 2s linear infinite;
}
@keyframes scan {
  0% { top: 0; }
  100% { top: 100%; }
}

/* Face boxes */
.face-box {
  position: absolute;
  border: 2px solid #00ff88;
  box-shadow: 0 0 10px rgba(0, 255, 136, 0.4);
  pointer-events: none;
}

.face-label {
  position: absolute;
  bottom: 100%;
  left: 0;
  background: rgba(0, 255, 136, 0.15);
  border: 1px solid #00ff88;
  padding: 2px 8px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 11px;
  display: flex; gap: 8px;
  white-space: nowrap;
}
.face-name { color: #00ff88; }
.face-conf { color: #aaa; }

/* No camera */
.no-camera {
  position: absolute; inset: 0;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 16px;
  color: #444;
}
.no-camera-icon { font-size: 64px; opacity: 0.3; }
.start-btn {
  background: transparent;
  border: 1px solid #00e5ff;
  color: #00e5ff;
  padding: 10px 24px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 13px;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.2s;
}
.start-btn:hover { background: rgba(0,229,255,0.1); }

/* Result overlay */
.result-overlay {
  position: absolute;
  bottom: 32px; left: 50%;
  transform: translateX(-50%);
  display: flex; flex-direction: column; align-items: center;
  padding: 16px 32px;
  backdrop-filter: blur(10px);
  border: 1px solid;
  font-family: 'Share Tech Mono', monospace;
  text-align: center;
}
.result-overlay.match {
  border-color: #00ff88;
  background: rgba(0, 255, 136, 0.1);
}
.result-overlay.no_match {
  border-color: #ff4444;
  background: rgba(255, 68, 68, 0.1);
}
.result-icon { font-size: 28px; margin-bottom: 4px; }
.result-overlay.match .result-icon { color: #00ff88; }
.result-overlay.no_match .result-icon { color: #ff4444; }
.result-name { font-size: 18px; letter-spacing: 2px; }
.result-meta { font-size: 11px; color: #888; margin-top: 4px; }

.result-fade-enter-active, .result-fade-leave-active { transition: opacity 0.4s; }
.result-fade-enter-from, .result-fade-leave-to { opacity: 0; }

/* ── Side Panel ──────────────────────────────────────────────────── */
.side-panel {
  width: 280px;
  background: #0d0d0f;
  border-left: 1px solid #1e1e22;
  display: flex; flex-direction: column;
  overflow-y: auto;
  flex-shrink: 0;
}

.panel-section {
  padding: 20px;
  border-bottom: 1px solid #1a1a1e;
}

.panel-title {
  font-family: 'Share Tech Mono', monospace;
  font-size: 10px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #00e5ff;
  margin-bottom: 14px;
}

/* Log */
.log-list { display: flex; flex-direction: column; gap: 6px; max-height: 220px; overflow-y: auto; }
.log-empty { color: #333; font-size: 12px; font-style: italic; }
.log-item {
  display: grid;
  grid-template-columns: 70px 1fr auto;
  gap: 6px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 11px;
  padding: 6px 8px;
  border-left: 2px solid #222;
}
.log-item.match { border-left-color: #00ff88; }
.log-item.no_match { border-left-color: #ff4444; }
.log-time { color: #555; }
.log-name { color: #ccc; }
.log-conf { color: #666; }

/* Settings */
.setting-row {
  display: flex; align-items: center; gap: 10px;
  margin-bottom: 12px;
  font-size: 12px; color: #666;
}
.setting-row label { min-width: 80px; font-size: 11px; }
.setting-input {
  background: #111;
  border: 1px solid #222;
  color: #ccc;
  padding: 5px 8px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 11px;
  flex: 1;
  outline: none;
}
.setting-input:focus { border-color: #00e5ff; }
.api-input { font-size: 9px; }
.setting-range { flex: 1; accent-color: #00e5ff; }
.range-val { font-family: 'Share Tech Mono', monospace; font-size: 11px; color: #00e5ff; min-width: 30px; }

/* Controls */
.panel-controls {
  padding: 20px;
  display: flex; flex-direction: column; gap: 10px;
}
.ctrl-btn {
  width: 100%;
  padding: 10px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 12px;
  letter-spacing: 1px;
  cursor: pointer;
  border: 1px solid;
  transition: all 0.2s;
}
.ctrl-btn:disabled { opacity: 0.3; cursor: not-allowed; }
.ctrl-btn.primary {
  background: rgba(0, 229, 255, 0.1);
  border-color: #00e5ff;
  color: #00e5ff;
}
.ctrl-btn.primary:hover:not(:disabled) { background: rgba(0,229,255,0.2); }
.ctrl-btn.secondary {
  background: transparent;
  border-color: #333;
  color: #666;
}
.ctrl-btn.secondary:hover:not(:disabled) { border-color: #666; color: #aaa; }

/* Error */
.error-msg {
  margin: 0 20px 20px;
  padding: 10px;
  background: rgba(255, 68, 68, 0.1);
  border: 1px solid #ff4444;
  color: #ff7777;
  font-size: 11px;
  font-family: 'Share Tech Mono', monospace;
  line-height: 1.5;
}
</style>
