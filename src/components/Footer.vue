<script setup>
    import iconUrl from '@/assets/icon-neutralgrey200.png'
</script>

<template>
    <footer>
        <v-divider class="border-opacity-100"></v-divider>
        <div class="d-flex flex-row justify-space-between align-center mt-4 mb-4">
            <div>
                <img :src="iconUrl" alt="" style="height: 14px;">
                <!-- <span>
                    | © 2026 Abraham and Fredy. All right reserved. 
                </span> -->
            </div>
            <div class="d-flex flex-row ga-2">
                <a href="" target="_blank" rel="noopener noreferrer" style="text-decoration: none; color: inherit;">
                    <v-icon 
                    icon="mdi-instagram" 
                    ></v-icon>
                </a>
                <a href="" target="_blank" rel="noopener noreferrer" style="text-decoration: none; color: inherit;">
                    <v-icon 
                    icon="mdi-instagram" 
                    ></v-icon>
                </a>
            </div>
        </div>
    </footer>
</template>

<style scoped>
    
</style>