<script setup>
import iconUrl from '@/assets/icon-neutralgrey200.png'
import { ref } from 'vue'
import { login } from '@/services/auth.js'
import router from '@/router'
import { fieldRequired, emailFieldCheck, passwordFieldCheck } from '@/utils/rules'

const email = ref()
const password = ref()
const isValid = ref(false)
const emailRules = [
    v => fieldRequired(v, 'Email is required'),
    v => emailFieldCheck(v)
]

const passwordRules = [
    v => fieldRequired(v, 'Password is required'),
    v => passwordFieldCheck(v)
]

const handleSubmit = async () => {
    if(isValid.value) {
        try {
            const response = await login(email.value, password.value)
            
            if (response.status == 200)
                router.push({name: 'home'})
        } catch (error) {
            console.log(error)
        }
    }
}
</script>

<template>
    <v-form 
        v-model="isValid"
        validate-on="input lazy"
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