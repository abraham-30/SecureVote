<script setup>
import { addUserLog } from '@/services/UserLogServices'
import { onMounted, onBeforeUnmount, computed, ref, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'

const route = useRoute()
const router = useRouter()
const isLoading = ref(false)
const isDialogOpen = ref(false)
const videoEl = ref(null)
const form = reactive(
  {
    photo: [],
  }
)
const canvasRef = ref(null)
const totalPhoto = computed(() => form.photo.length)
let intervalPhoto = null

const startPhotoInterval = () => {
  clearInterval(intervalPhoto)

  setTimeout(() => {
    if (!!videoEl.value && videoEl.value.readyState === 4) {
      setTimeout(() => {
        intervalPhoto = setInterval(() => {
            takePhoto()
          }, 300)
      }, 1000)
    }
  }, 1000)
}

const stopPhotoInterval = () => {
  clearInterval(intervalPhoto)
  intervalPhoto = null
}

const startCamera = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'user' }
    })
    videoEl.value.srcObject = stream
  } catch (error) {
    console.error(error)
  }
}
const stopCamera = () => {
  if (videoEl.value && videoEl.value.srcObject) {
    videoEl.value.srcObject.getTracks().forEach(t => t.stop())
    videoEl.value.srcObject = null
  }
}

const takePhoto = () => {
  canvasRef.value.width = videoEl.value.videoWidth;
  canvasRef.value.height = videoEl.value.videoHeight;
  canvasRef.value.getContext('2d').drawImage(videoEl.value, 0, 0);
  canvasRef.value.toBlob((blob) => form.photo.push(blob))
}

const handleSubmit = async () => {
  try {
    isLoading.value = true
    videoEl.value.pause()
    
    await addUserLog(form.photo, route.query.type)
    .then((response) => {
      if(response.status === 200 && !response.data.error) {
        console.log(response.data)
        router.push({ name: 'clock' })
      } else {
        isDialogOpen.value = true
      }
    })
  } catch (error) {
    console.error(error)
  }
}

const handleRetry = () => {
    router.push({ name: 'clock' })
}

onMounted(() => {
  startCamera()

  startPhotoInterval()
})

onBeforeUnmount(() => {
  stopCamera()
})

watch(totalPhoto.value, (newVal) => {
  if (newVal >= 1) {
    stopPhotoInterval()

    handleSubmit()
  }
})
</script>

<template>
    <div class="" style="height: 5vh; background-color: #1E1E1E; border-bottom: 1px solid #B5B5B5">
      <div class="w-25 h-100 d-flex flex-column justify-center align-center">
        <v-btn variant="text" style="width: fit-content;" @click="$router.back()">
          ← Back
        </v-btn>
      </div>
      
    </div>

  <div class="app">
    <!-- Main Camera Area -->
    <main class="main">
      <div class="camera-container">

        <!-- Video feed -->
        <video ref="videoEl" class="video-feed" autoplay playsinline muted></video>
        <canvas ref="canvasRef" class="d-none"></canvas>

      </div>
    </main>

    <v-overlay v-model="isLoading" class="align-center justify-center" persistent>
      <v-progress-circular indeterminate :size="64" :width="12"></v-progress-circular>
    </v-overlay>

    <v-dialog v-model="isDialogOpen" width="450" persistent>
      <v-card class="pa-2 pb-8 pa-sm-6 pb-sm-10 d-flex flex-column align-center">
        <!-- <svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M67.1626 124.043L67.1039 124.053L66.7253 124.24L66.6186 124.261L66.5439 124.24L66.1653 124.053C66.1084 124.036 66.0657 124.045 66.0373 124.08L66.0159 124.133L65.9253 126.416L65.9519 126.523L66.0053 126.592L66.5599 126.987L66.6399 127.008L66.7039 126.987L67.2586 126.592L67.3226 126.507L67.3439 126.416L67.2533 124.139C67.239 124.082 67.2088 124.05 67.1626 124.043ZM68.5759 123.44L68.5066 123.451L67.5199 123.947L67.4666 124L67.4506 124.059L67.5466 126.352L67.5733 126.416L67.6159 126.453L68.6879 126.949C68.7555 126.967 68.8071 126.953 68.8426 126.907L68.8639 126.832L68.6826 123.557C68.6648 123.493 68.6293 123.454 68.5759 123.44ZM64.7626 123.451C64.7391 123.436 64.711 123.432 64.6842 123.438C64.6574 123.444 64.6339 123.46 64.6186 123.483L64.5866 123.557L64.4053 126.832C64.4088 126.896 64.4391 126.939 64.4959 126.96L64.5759 126.949L65.6479 126.453L65.7013 126.411L65.7226 126.352L65.8133 124.059L65.7973 123.995L65.7439 123.941L64.7626 123.451Z" fill="#FFCC00"/>
          <path d="M70.9279 16.7893L116.976 96.544C117.678 97.7601 118.048 99.1396 118.048 100.544C118.048 101.948 117.678 103.328 116.976 104.544C116.274 105.76 115.264 106.77 114.048 107.472C112.832 108.174 111.452 108.544 110.048 108.544H17.9519C16.5477 108.544 15.1681 108.174 13.952 107.472C12.7359 106.77 11.726 105.76 11.0239 104.544C10.3218 103.328 9.95214 101.948 9.95215 100.544C9.95216 99.1396 10.3218 97.7601 11.0239 96.544L57.0719 16.7893C60.1493 11.456 67.8453 11.456 70.9279 16.7893ZM63.9999 80C62.5855 80 61.2289 80.5619 60.2287 81.5621C59.2285 82.5623 58.6666 83.9188 58.6666 85.3333C58.6666 86.7478 59.2285 88.1044 60.2287 89.1046C61.2289 90.1047 62.5855 90.6666 63.9999 90.6666C65.4144 90.6666 66.771 90.1047 67.7712 89.1046C68.7714 88.1044 69.3333 86.7478 69.3333 85.3333C69.3333 83.9188 68.7714 82.5623 67.7712 81.5621C66.771 80.5619 65.4144 80 63.9999 80ZM63.9999 42.6666C62.6936 42.6668 61.4328 43.1464 60.4566 44.0145C59.4804 44.8825 58.8568 46.0786 58.7039 47.376L58.6666 48V69.3333C58.6681 70.6927 59.1886 72.0001 60.1218 72.9886C61.055 73.9771 62.3304 74.5719 63.6874 74.6516C65.0444 74.7312 66.3806 74.2897 67.4231 73.4172C68.4655 72.5448 69.1354 71.3072 69.2959 69.9573L69.3333 69.3333V48C69.3333 46.5855 68.7714 45.2289 67.7712 44.2287C66.771 43.2285 65.4144 42.6666 63.9999 42.6666Z" fill="#FFCC00"/>
        </svg> -->
        <v-card-title class="d-flex flex-column ga-2 align-center font-weight-bold">
          <v-icon
          size="72"
          color="warning"
          icon="mdi-alert"></v-icon>
          Failed to Capture
        </v-card-title>
        <v-card-text class="text-center text-body-medium text-sm-body-large text-grey-lighten-1">
          Please try face verification again in a well-lit area and make sure your face is clearly visible to the camera.
        </v-card-text>
        <v-card-actions class="w-100">
          <div class="w-100 d-flex flex-wrap-reverse flex-sm-nowrap justify-center ga-2">
            <v-btn
            text="Retry" 
            variant="flat" 
            color="white" 
            class="w-100 w-sm-33" 
            @click="handleRetry()">
              Understood
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  background: #000;
  color: #e0e0e0;
  height: 95vh;
  font-family: 'Barlow', sans-serif;
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

</style>
