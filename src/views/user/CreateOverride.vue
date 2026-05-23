<script setup>
import { onMounted, reactive, ref } from 'vue';
import { fieldRequired } from '@/utils/rules';
import { userGroupListSupervisor } from '@/services/UserGroupServices';
import { useGroupStore } from '@/stores/GroupStore';
import { storeToRefs } from 'pinia';
import { addOverideRequest } from '@/services/OverrideServices';
import { useUserStore } from '@/stores/UserStore';
import router from '@/router';

const groupStore = useGroupStore()
const { group } = storeToRefs(groupStore)
const userStore = useUserStore()
const { id } = storeToRefs(userStore)
const supervisorItems = ref()
const form = reactive({
    isValid: false,
    supervisor: null,
    date: null,
    clockIn: null,
    clockOut: null,
    reason: null,
})
const isLoadingSpv = ref(true)

const clockInOutRules = [
    v => !!form.clockIn || !!form.clockOut || "Clock In or Clock Out is required"
]

const handleSubmit = async() => {
    if(form.isValid) {
        try {
            await addOverideRequest(id.value, group.value?.id, form)
            .then((response) => {
                if (response.status == 201) {
                    router.push({ name: "override"} )
                }
            })
        } catch (error) {
            console.error(error)
        }
    }
}

onMounted(async() => {
    try {
        userGroupListSupervisor(group.value?.id, id.value)
        .then((response) => {
            supervisorItems.value = response.data
            isLoadingSpv.value = false
        }) 
    } catch (error) {
        console.log(error)
    }
})
</script>

<template>
    <div class="py-14 min-h-screen">
        <div class="d-flex flex-column ga-8">
            <v-btn variant="text" style="width: fit-content;" @click="$router.back()">
                ← Back
            </v-btn>
            <div class="d-flex flex-column">
                <span class="text-headline-medium font-weight-bold">Create Request</span>
            </div>
            <div>
                <v-form 
                v-model="form.isValid"
                validate-on="input lazy" 
                class="d-flex flex-column ga-8 align-center"
                @submit.prevent="handleSubmit()"
                >
                    <div class="w-100">
                        Supervisor <br>
                        <v-select
                        v-model="form.supervisor"
                        :items="supervisorItems"
                        :loading="isLoadingSpv"
                        :disabled="isLoadingSpv"
                        placeholder="Choose Supervisor"
                        hide-details="auto"
                        item-title="user.name"
                        item-value="user.id"
                        variant="outlined"
                        class="w-100"
                        :rules="[v => fieldRequired(v, 'Supervisor is required')]"
                        ></v-select>
                    </div>

                    <div class="w-100">
                        Date <br>
                        <v-date-input
                        v-model="form.date"
                        :rules="[v => fieldRequired(v, 'Date is required')]"
                        hide-details="auto"
                        variant="outlined"
                        class="w-100"
                        placeholder="Choose Date"
                        prepend-icon=""
                        clearable=""
                        >
                        </v-date-input>
                    </div>

                    <div class="d-flex flex-row ga-4 w-100">
                        <div class="w-50">
                            Clock In <br>
                            <v-text-field 
                            v-model="form.clockIn"
                            type="time"
                            hide-details="auto"
                            variant="outlined"
                            :rules="clockInOutRules"
                            ></v-text-field>
                        </div>

                        <div class="w-50">
                            Clock Out <br>
                            <v-text-field 
                            v-model="form.clockOut"
                            type="time"
                            hide-details="auto"
                            variant="outlined"
                            :rules="clockInOutRules"
                            ></v-text-field>
                        </div>
                    </div>

                    <div class="w-100">
                        Reason <br>
                        <v-textarea
                            v-model="form.reason"
                            placeholder="Reason"
                            hide-details="auto"
                            variant="outlined"
                            class="w-100"
                            :rules="[v => fieldRequired(v, 'Reason is required')]"
                        ></v-textarea>
                    </div>
                    <v-btn 
                    type="submit" 
                    class="bg-white"
                    >Submit Request</v-btn>
                </v-form>
            </div>
        </div>
    </div>
</template>

<style scoped></style>