<script setup>
    import iconUrl from '@/assets/icon-neutralgrey200.png'
</script>

<template>
    <div>
        <div class="d-flex flex-column min-h-screen justify-center align-center ga-8">
            <div class="d-flex flex-column ga-2">
                <div class="w-100 d-flex flex-column align-center">
                    <img :src="iconUrl" alt="" style="height: 16px;">
                </div>
                <span class="text-grey-lighten-1">
                    Please enter your credential.
                </span>
            </div>
            <div class="w-66">
                <v-form class="d-flex flex-column align-center ga-4">
                    <v-text-field variant="outlined"
                        label="Username"
                        class="w-100"
                    ></v-text-field>
                    <v-text-field variant="outlined"
                        label="Password"
                        class="w-100"
                    ></v-text-field>
                    <v-btn 
                    class="w-50 bg-white"
                    to="/" >
                        Sign In →
                    </v-btn>
                </v-form>
            </div>
            <div class="d-flex flex-row ga-2">
                <span>New to TENDA?</span>
                <a href="/register">Register here</a>
            </div>
        </div>
    </div>
</template>

<style src="@/assets/index.css" scoped>

</style>