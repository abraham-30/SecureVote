<script setup>
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import { fieldRequired } from '@/utils/rules';
import { useGroupStore } from '@/stores/GroupStore';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/UserStore';
import router from '@/router';
import { addLeaveRequest } from '@/services/LeaveServices';
import { userGroupListSupervisor } from '@/services/UserGroupServices';
import { leaveRemainingsList } from '@/services/LeaveRemainingService';

const groupStore = useGroupStore()
const { group } = storeToRefs(groupStore)
const userStore = useUserStore()
const { id } = storeToRefs(userStore)
const supervisorItems = ref()
const leaveRemainingItems = ref()
const isLoadingLeaveRemaining = ref(true)
const isLoadingSpv = ref(true)
const isLoadingSubmit = ref(false)
const form = reactive({
    isValid: false,
    supervisor: null,
    leaveType: null,
    startDate: null,
    endDate: null,
    reason: null,
})
const controller = new AbortController()

const handleSubmit = async() => {
    try {
        isLoadingSubmit.value = true

        if(form.isValid) {
            await addLeaveRequest(id.value, group.value?.id, form)
            .then((response) => {
                if (response.status == 201) {
                    router.push({ name: "leave"} )
                }
            })
        }
    } catch (error) {
        console.error(error)
    } finally {
        isLoadingSubmit.value = false
    }
}

onMounted(async() => {
    try {
        userGroupListSupervisor(group.value?.id, id.value, controller.signal)
        .then((response) => {
            supervisorItems.value = response.data
            isLoadingSpv.value = false
        }) 

        leaveRemainingsList(id.value, group.value?.id, controller.signal)
        .then((response) => {
            leaveRemainingItems.value = response.data
            isLoadingLeaveRemaining.value = false
        }) 
    } catch (error) {
        console.error(error)
    }
})

onUnmounted(() => {
    controller.abort()
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
                        class="w-100 mt-2"
                        :rules="[v => fieldRequired(v, 'Supervisor is required')]"
                        ></v-select>
                    </div>

                    <div class="w-100">
                        Leave Type <br>
                        <v-select
                        v-model="form.leaveType"
                        :items="leaveRemainingItems"
                        :loading="isLoadingLeaveRemaining"
                        :disabled="isLoadingLeaveRemaining"
                        placeholder="Choose Leave Type"
                        hide-details="auto"
                        item-title="attendance_type.name"
                        item-value="attendance_type.id"
                        variant="outlined"
                        class="w-100 mt-2"
                        :rules="[v => fieldRequired(v, 'Leave Type is required')]"
                        >
                            <template #item="{ item, props }">
                                <v-list-item 
                                v-bind="props"
                                :disabled="item?.remaining_days === 0"
                                >
                                    <template #title>
                                        <div class="d-flex flex-row justify-space-between">
                                            <span>
                                                {{ item?.attendance_type?.name }}                     
                                            </span>
                                            <span>
                                                {{ item?.remaining_days }} Remaining(s)
                                            </span>
                                        </div>
                                    </template>
                                </v-list-item>
                            </template>
                        </v-select>
                    </div>
                    <div class="d-flex flex-wrap flex-sm-nowrap flex-row ga-4 w-100">
                        <div class="w-100">
                            Start Date <br>
                            <v-date-input
                            v-model="form.startDate"
                            :rules="[v => fieldRequired(v, 'Date is required')]"
                            hide-details="auto"
                            variant="outlined"
                            class="mt-2"
                            placeholder="Choose Start Date"
                            prepend-icon=""
                            clearable=""
                            >
                            </v-date-input>
                        </div>
                        <div class="w-100">
                            End Date <br>
                            <v-date-input
                            v-model="form.endDate"
                            :rules="[v => fieldRequired(v, 'Date is required')]"
                            hide-details="auto"
                            variant="outlined"
                            class="mt-2"
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
                            class="w-100 mt-2"
                            :rules="[v => fieldRequired(v, 'Reason is required')]"
                        ></v-textarea>
                    </div>
                    <div class="d-flex justify-center w-100">
                        <div class="w-100 w-sm-33 mt-8">
                            <v-btn 
                            color="white"
                            type="submit"
                            block 
                            :loading="isLoadingSubmit"
                            >Submit Request</v-btn>
                        </div>
                    </div>
                </v-form>
                <div
                class="w-100"
                style="height: 150px;"></div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>