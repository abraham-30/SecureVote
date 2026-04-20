<script setup>
    import iconUrl from '@/assets/icon-neutralgrey200.png'
    import dummyImgUrl from '@/assets/dummy-img.png'
</script>

<template>
    <v-sheet class="parent-container h-screen d-flex flex-row flex-lg-nowrap flex-wrap-reverse ga-12 align-center mx-auto" style="width: 80%">
        <v-sheet class="d-flex flex-column ga-8">
            <img :src="iconUrl" alt="" class="w-50">
            <v-sheet class="d-flex flex-column ga-4">
                <span class="text-headline-large font-weight-bold">
                    Absensi Digital, Kerja Lebih Cerdas.
                </span>
                <span class="text-title-large text-grey-lighten-1">
                    Hadirkan pengalaman absensi yang lebih cerdas, praktis, dan efisien bersama Tenda.
                </span>
            </v-sheet>
            <v-btn 
            class="bg-white"
            to="/login">
                Sign In →
            </v-btn>
        </v-sheet>
        <v-sheet class="child-container-2 d-flex flex-column align-end">
            <div class="d-flex flex-column align-end">
                <span class="font-weight-bold">
                    07:00 PM GMT+7
                    <v-icon 
                    size="small"
                    icon="mdi-white-balance-sunny" 
                    ></v-icon>
                </span>
                <span class="text-grey-lighten-1">
                    Jakarta, Indonesia
                </span>
            </div>
            <div class="image-container mt-4 mx-auto w-75">
                <img :src="dummyImgUrl" alt="" class="w-100 border-sm rounded-lg">
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