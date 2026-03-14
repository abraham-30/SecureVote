<script setup>
    import iconUrl from '@/assets/icon-neutralgrey200.png'
    import dummyImgUrl from '@/assets/dummy-img.png'
</script>

<template>
    <div>
        <div class="d-flex flex-row min-h-screen ga-12 align-center">
            <div class="w-100 d-flex flex-column ga-8">
                <div>
                    <img :src="iconUrl" alt="" style="height: 14px;">
                </div>
                <div class="d-flex flex-column ga-4">
                    <h1>
                        Absensi Digital, Kerja Lebih Cerdas.
                    </h1>
                    <p class="text-grey-lighten-1">
                        Hadirkan pengalaman absensi yang lebih cerdas, praktis, dan efisien bersama Tenda.
                    </p>
                </div>
                <v-btn>
                    Sign In →
                </v-btn>
            </div>
            <div class="w-100 d-flex flex-column align-end">
                <div class="d-flex flex-column align-end">
                    <span class="font-weight-bold">
                        07:00 PM GMT+7
                        <v-icon 
                        size="small"
                        icon="mdi-white-balance-sunny" 
                        class="ml-1"
                        ></v-icon>
                    </span>
                    <span class="text-grey-lighten-1">
                        Jakarta, Indonesia
                    </span>
                </div>
                <div class="mt-4">
                    <img :src="dummyImgUrl" alt="" class="h-100 w-100 border-lg border-surface-bright rounded-lg">
                </div>
            </div>
        </div>
    </div>
</template>

<style src="@/assets/index.css" scoped>

</style>