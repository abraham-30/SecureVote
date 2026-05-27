<script setup>
import iconUrl from '@/assets/icon-neutralgrey200.png'
import { ref, reactive, watch } from 'vue';
import { emailFieldCheck, fieldRequired, passwordFieldCheck } from '@/utils/rules';
import { register } from '@/services/auth';
import router from '@/router';

const usernameRules = [
    v => fieldRequired(v, 'Username is required'),
]

const emailRules = [
    v => fieldRequired(v, 'Email is required'),
    v => emailFieldCheck(v),
]

const passwordRules = [
    v => fieldRequired(v, 'Password is required'),
    v => passwordFieldCheck(v),
]

const form = reactive({
    isValid: null,
    username: null,
    email: null,
    password: null,
})

const emailError = ref([])

const handleSubmit =  async () => {
    emailError.value = []

    setTimeout(async () => {
        if(form.isValid) {
            try {
                await register(form)
                .then((response) => {
                    console.log(response.data)
                    if(response.status === 201 && !response.data.error_code) {
                        router.push({ name: 'facecheck1' })
                    } else if (response.data.error_code === 3) {
                        emailError.value = ['Email already exists']
                    }
                })
            } catch (error) {
                console.error(error)
            }
        }
    }, 100)
}

watch(() => form.email, () => {
  emailError.value = []
})
</script>

<template>
    <div>
        <v-btn class="mt-8" variant="text" style="width: fit-content;" @click="$router.back()">
            ← Back
        </v-btn>

        <div class="d-flex flex-column align-center ga-8" style="padding-top: 20%; height: 93vh;">
            <div class="d-flex flex-column ga-2">
                <div class="w-100 d-flex flex-column align-center">
                    <img :src="iconUrl" alt="" style="height: 16px;">
                </div>
                <span class="text-grey-lighten-1">
                    Please fill out the form
                </span>
            </div>
            <div class="w-66">
                <v-form validate-on="input lazy" v-model="form.isValid" class="d-flex flex-column align-center ga-8" @submit.prevent="handleSubmit()">
                    <v-text-field 
                        v-model="form.username"
                        variant="outlined"
                        label="Username"
                        class="w-100"
                        hide-details="auto"
                        :rules="usernameRules"
                        ></v-text-field>
                        <v-text-field 
                        v-model="form.email"
                        variant="outlined"
                        label="Email"
                        class="w-100"
                        hide-details="auto"
                        :rules="emailRules"
                        :error-messages="emailError"
                    ></v-text-field>
                    <v-text-field 
                        v-model="form.password"
                        variant="outlined"
                        label="Password"
                        class="w-100"
                        hide-details="auto"
                        type="password"
                        :rules="passwordRules"
                    ></v-text-field>
                    <v-btn 
                    class="w-50 bg-white" 
                    type="submit">
                        Continue →
                    </v-btn>
                </v-form>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>