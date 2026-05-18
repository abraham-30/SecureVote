<script setup>
    import iconUrl from '@/assets/icon-neutralgrey200.png'
    import { ref } from 'vue'
    import { login } from '@/services/auth.js'
    import router from '@/router'

    const email = ref()
    const password = ref()

    const emailRules = [
        v => !!v || 'Email is required',
        v => /.+@.+\..+/.test(v) || 'Email must be valid',
    ]

    const passwordRules = [
    v => !!v || 'Password is required',
        v => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(v) || 'Password must has min. 8 chars, 1 uppercase, 1 lowercase, and 1 number',
    ]

    const handleSubmit = async () => {
        try {
            const response = await login(email.value, password.value)
            
            if (response.status == 200)
                router.push({name: 'home'})
        } catch (error) {
            console.log(error)
        }
    }
</script>

<template>
    <v-form 
        class="d-flex flex-column min-h-screen justify-center align-center ga-8"
        @submit.prevent="handleSubmit()"
    >
        <v-sheet class="d-flex flex-column ga-2">
            <div class="w-100 d-flex flex-column align-center">
                <img :src="iconUrl" alt="" style="height: 16px;">
            </div>
            <span class="text-grey-lighten-1">
                Please enter your credential.
            </span>
        </v-sheet>
        <v-sheet class="w-66">
            <v-sheet class="d-flex flex-column align-center ga-8">
                <v-text-field 
                    v-model="email"
                    :rules="emailRules"
                    hide-details="auto"
                    type="email"
                    variant="outlined"
                    label="Email"
                    class="w-100"
                ></v-text-field>
                <v-text-field 
                    v-model="password"
                    :rules = "passwordRules"
                    hide-details="auto"
                    type="password"
                    variant="outlined"
                    label="Password"
                    class="w-100"
                >
                </v-text-field>
                <v-btn 
                    class="w-50 bg-white"
                    type="submit"
                >
                    Sign In →
                </v-btn>
            </v-sheet>
        </v-sheet>
        <v-sheet class="d-flex flex-row ga-2">
            <span>New to TENDA?</span>
            <a href="/register">Register here</a>
        </v-sheet>
    </v-form>
</template>

<style lang="scss" scoped>

</style>