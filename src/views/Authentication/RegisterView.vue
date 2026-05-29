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
    <div class="mt-8">
        <v-btn 
        text="← Back"
        variant="text"
        to="/login"></v-btn>
    </div>
    <v-form 
    validate-on="input lazy" 
    v-model="form.isValid" 
    class="d-flex flex-column min-h-screen justify-center align-center ga-8 mt-n16" 
    @submit.prevent="handleSubmit()"
    >
        <v-sheet class="d-flex flex-column ga-2">
            <div class="w-100 d-flex flex-column align-center">
                <v-img
                 :src="iconUrl" 
                 alt=""
                 width="135" 
                 ></v-img>
            </div>
            <span class="text-grey-lighten-1">
                Please fill out the form
            </span>
        </v-sheet>
        <v-sheet class="w-100 px-lg-16">
            <v-sheet class="px-lg-16">
                <div class="d-flex flex-column align-center ga-8 px-lg-8 w-100">
                    <div class="w-100">
                        Username <br>
                        <v-text-field 
                            v-model="form.username"
                            variant="outlined"
                            hide-details="auto"
                            :rules="usernameRules"
                            class="w-100 mt-2"
                            ></v-text-field>
                    </div>
                    <div class="w-100">
                        Email <br>
                        <v-text-field 
                        v-model="form.email"
                        variant="outlined"
                        hide-details="auto"
                        :error-messages="emailError"
                        :rules="emailRules"
                        class="w-100 mt-2"
                    ></v-text-field>
                    </div>
                    <div class="w-100">
                        Password <br>
                        <v-text-field 
                            v-model="form.password"
                            variant="outlined"
                            hide-details="auto"
                            type="password"
                            :rules="passwordRules"
                            class="w-100 mt-2"
                        ></v-text-field>
                    </div>
                    <div class="w-100 d-flex justify-center mt-4">
                        <v-btn 
                        type="submit"
                        text="Continue →"
                        class="w-66 w-lg-50 bg-white" 
                        ></v-btn>
                    </div>
                </div>
            </v-sheet>
        </v-sheet>
    </v-form>
</template>

<style lang="scss" scoped>

</style>