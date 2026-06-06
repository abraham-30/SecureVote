<script setup>
import { sendInvitation } from '@/services/InvitationServices';
import { useGroupStore } from '@/stores/GroupStore';
import { useUserStore } from '@/stores/UserStore';
import { emailFieldCheck, fieldRequired } from '@/utils/rules';
import { storeToRefs } from 'pinia';
import { reactive, ref, watch } from 'vue';

const emailRules = [
    v => fieldRequired(v, 'Email is required'),
    v => emailFieldCheck(v),
]
const form = reactive({
    isValid: false,
    email: null,
})
const formRef = ref(null)

const isLoading = ref(false)
const errorMessages = reactive({
    message: null,
    color: null, 
})
const userStore = useUserStore()
const groupStore = useGroupStore()
const { id } =  storeToRefs(userStore)
const { group } = storeToRefs(groupStore)

const handleSubmit = async () => {
    const { valid } = await formRef.value.validate()

    try {
        if (valid) {
            isLoading.value = true
            await sendInvitation(form.email, id.value, group.value?.id)
            .then((response) => {
                if (!!response.data.error_code) {
                    errorMessages.message = response.data.error
                    errorMessages.color = "error"
                }
                else if (response.status == 201) {
                    form.email = null
                    setTimeout(() => {
                        errorMessages.message = ["Invitation sent successfully!"]
                        errorMessages.color = "success"
                    }, 200)
                }
            })
        }

    } catch (error) {
        console.error(error)
    } finally {
        isLoading.value = false
    }
}

watch(form.email, () => {
    errorMessages.message = null
    errorMessages.color = null
})
</script>

<template>
    <div class="py-14 min-h-screen">
        <div class="d-flex flex-column ga-8">
            <v-btn variant="text" style="width: fit-content;" @click="$router.back()">
                ← Back
            </v-btn>
            <div class="d-flex flex-column">
                 <span class="text-headline-medium font-weight-bold">Invite User</span>
            </div>

            <v-form 
            ref="formRef"
            v-model="form.isValid" 
            :disabled="isLoading" 
            validate-on="input lazy" 
            class="w-100" 
            @submit.prevent="handleSubmit()">
                Search User by Email <br>
                <div class="d-flex flex-column align-center ga-2">
                    <v-text-field
                    v-model="form.email"
                    placeholder="Type Email"
                    append-inner-icon="mdi-magnify"
                    variant="outlined"
                    :loading="isLoading"
                    :rules="emailRules"
                    :error-messages="errorMessages.message"
                    :class="{ 'w-100 mt-2': true, 'error-messages-red': errorMessages?.color === 'error', 'error-messages-green': errorMessages?.color === 'success' }"
                    ></v-text-field>
                    <div class="d-flex justify-center w-100">
                        <div class="w-100 w-sm-33 mt-8">
                            <v-btn 
                            :disabled="isLoading"
                            type="submit"
                            text="Send Invitation →"
                            class="bg-white"
                            block>
                            </v-btn>
                        </div>
                    </div>
                </div>
            </v-form>
        </div>
    </div>
</template>

<style scoped>
.v-text-field {
    &.error-messages-red {
        & :deep(.v-messages__message),
        & :deep(.v-field__outline),
        & :deep(.v-field__append-inner i) {
            color: #B00020;
        }
    }

    &.error-messages-green {
        & :deep(.v-messages__message),
        & :deep(.v-field__outline),
        & :deep(.v-field__append-inner i) {
            color: #4CAF50;
        }
    }
}
</style>