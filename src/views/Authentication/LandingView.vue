<script setup>
import iconUrl from '@/assets/icon-neutralgrey200.png'
import dummyImgUrl from '@/assets/dummy-img.png'
import { onMounted, onUnmounted, ref } from 'vue';
import { formatDate, getCurrentDateTime } from '@/utils/date';

const currentDate = ref(getCurrentDateTime())
const timeInterval = ref()
const startTimeInterval = () => {
        timeInterval.value = setInterval(() => {
        currentDate.value = getCurrentDateTime()
    }, 1000)
}
onMounted(() => {
    startTimeInterval()
})

onUnmounted(() => {
    clearInterval(timeInterval.value)

})
</script>

<template>
    <v-sheet 
    class="parent-container min-h-screen d-flex flex-row flex-lg-nowrap flex-wrap-reverse ga-12 align-center">
        <v-sheet class="d-flex flex-column ga-8 ga-lg-12 w-100 w-lg-50">
            <v-img :src="iconUrl" alt="" width="125"></v-img>
            <v-sheet class="d-flex flex-column ga-4">
                <span class="text-headline-medium text-lg-headline-large font-weight-bold">
                    Absensi Digital, Kerja Lebih Cerdas.
                </span>
                <span class="text-title-medium text-lg-title-large text-grey-lighten-1">
                    Hadirkan pengalaman absensi yang lebih cerdas, praktis, dan efisien bersama Tenda.
                </span>
            </v-sheet>
            <div>
                <v-btn 
                class="bg-white w-100"
                to="/login">
                    Sign In →
                </v-btn>
            </div>
            <div 
            class="d-lg-none w-100" 
            style="height: 125px;">
            </div>
        </v-sheet>
        <v-sheet class="child-container-2 d-flex flex-column w-100 w-lg-50">
            <div class="d-flex flex-column align-end">
                <span>{{ formatDate(currentDate, "hh:mm A") }}</span>
            </div>
            <div class="image-container mt-2 justify-lg-center">
                <v-img 
                :src="dummyImgUrl" 
                alt="" 
                rounded="xl"
                class="w-100 border-solid"></v-img>
            </div>
        </v-sheet>
    </v-sheet>
</template>

<style lang="scss" scoped>
@use "@/assets/index.scss" as *;

.parent-container {
    @media (max-width: $lg-min) {
        margin-bottom: 40px;
        margin-top: 40px;
        height: auto;

        .image-container {
            width: 100%;
        }
    }
}
</style>