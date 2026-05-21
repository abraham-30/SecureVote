<script setup>
import { onMounted, reactive, ref } from 'vue';
import { fieldRequired } from '@/utils/rules';
import { useGroupStore } from '@/stores/GroupStore';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/UserStore';
import router from '@/router';
import { addLeaveRequest } from '@/services/LeaveServices';

const groupStore = useGroupStore()
const { group } = storeToRefs(groupStore)
const userStore = useUserStore()
const { id } = storeToRefs(userStore)
const supervisorItems = ref()
const leaveTypeItems = ref()
const leaveRemainingItems = ref()
const isLoadingLeaveType = ref(true)
const isLoadingLeaveRemaining = ref(true)
const form = reactive({
    isValid: false,
    supervisor: null,
    leaveType: null,
    startDate: null,
    endDate: null,
    reason: null,
})

const handleSubmit = async() => {
    if(form.isValid) {
        try {
            await addLeaveRequest(id.value, group.value?.id, form)
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
    await leaveTypesList(group.value?.id, id.value)
    .then((response) => {
        leaveTypeItems.value = response.data
        isLoadingLeaveType.value = false
    }) 
    
    await leaveRemainingItems(id.value, group.value?.id, id.value)
    .then((response) => {
        leaveRemainingItems.value = response.data
        isLoadingLeaveRemaining.value = false
    }) 
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
                        :loading="isLoadingLeaveType"
                        :disabled="isLoadingLeaveType"
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
                        Leave Type <br>
                        <v-select
                        v-model="form.leaveType"
                        :items="leaveTypeItems"
                        :loading="isLoadingLeaveType"
                        :disabled="isLoadingLeaveType"
                        placeholder="Choose Leave Type"
                        hide-details="auto"
                        item-title="name"
                        item-value="id"
                        variant="outlined"
                        class="w-100"
                        :rules="[v => fieldRequired(v, 'Leave Type is required')]"
                        >
                            <template #item="{ item }">
                                <v-list-item class="d-flex flex-row justify-space-between">
                                    <p>
                                    {{ item }}                     
                                    </p>
                                    <p>
                                    1 Remaining(s)
                                    </p>
                                </v-list-item>
                            </template>
                        </v-select>
                    </div>
                    <div class="d-flex flex-row ga-4 w-100">
                        <div class="w-50">
                            Start Date <br>
                            <v-date-input
                            v-model="form.startDate"
                            :rules="[v => fieldRequired(v, 'Date is required')]"
                            hide-details="auto"
                            variant="outlined"
                            class="w-100"
                            placeholder="Choose Start Date"
                            prepend-icon=""
                            clearable=""
                            >
                            </v-date-input>
                        </div>
                        <div class="w-50">
                            End Date <br>
                            <v-date-input
                            v-model="form.endDate"
                            :rules="[v => fieldRequired(v, 'Date is required')]"
                            hide-details="auto"
                            variant="outlined"
                            class="w-100"
                            placeholder="Choose End Date"
                            prepend-icon=""
                            clearable=""
                            >
                            </v-date-input>
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