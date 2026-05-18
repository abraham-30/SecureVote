<script setup>
    import iconUrl from '@/assets/icon-neutralgrey200.png'

    const usernameRules = [
        v => !!v || 'Email is required',
    ]

    const emailRules = [
        v => !!v || 'Email is required',
        v => /.+@.+\..+/.test(v) || 'Email must be valid',
    ]

    const passwordRules = [
    v => !!v || 'Password is required',
        v => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(v) || 'Password must has min. 8 chars, 1 uppercase, 1 lowercase, and 1 number',
    ]
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
                <v-form class="d-flex flex-column align-center ga-8">
                    <v-text-field variant="outlined"
                        label="Username"
                        class="w-100"
                        hide-details="auto"
                        :rules="usernameRules"
                    ></v-text-field>
                    <v-text-field variant="outlined"
                        label="Email"
                        class="w-100"
                        hide-details="auto"
                        :rules="emailRules"
                    ></v-text-field>
                    <v-text-field variant="outlined"
                        label="Password"
                        class="w-100"
                        hide-details="auto"
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