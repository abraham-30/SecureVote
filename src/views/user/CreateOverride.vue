<script setup>
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue';
import { fieldRequired } from '@/utils/rules';
import { userGroupListSupervisor } from '@/services/UserGroupServices';
import { useGroupStore } from '@/stores/GroupStore';
import { storeToRefs } from 'pinia';
import { addOverideRequest } from '@/services/OverrideServices';
import { useUserStore } from '@/stores/UserStore';
import router from '@/router';
import moment from 'moment';

const groupStore = useGroupStore()
const { group } = storeToRefs(groupStore)
const userStore = useUserStore()
const { id } = storeToRefs(userStore)
const controller = new AbortController()
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
const isLoadingSubmit = ref(false)

const compareClockTime = computed(() => {
    return form.clockIn &&
        form.clockOut &&
        moment(form.clockIn, "HH:mm:ss")
        .isBefore(moment(form.clockOut, "HH:mm:ss"))
})

const clockInOutRules = [
    () => {
        const hasAny = form.clockIn || form.clockOut
        if (!hasAny) return "Clock In or Clock Out is required"

        const isValidRange =
            !form.clockIn ||
            !form.clockOut ||
            compareClockTime.value

        return isValidRange ? true : "Clock Out must be after Clock In"
    }
]

const dateRules = [
    v => fieldRequired(v, 'Date is required'),
    v => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return new Date(v) <= today || 'Date cannot be larger than today';
    }
]

const handleSubmit = async() => {
    try {
        isLoadingSubmit.value = true

        if(form.isValid) {
            console.log(form)
            await addOverideRequest(id.value, group.value?.id, form)
            .then((response) => {
                if (response.status == 201) {
                    router.push({ name: "override"} )
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
    } catch (error) {
        console.log(error)
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
                        Date <br>
                        <v-date-input
                        v-model="form.date"
                        :rules="dateRules"
                        hide-details="auto"
                        variant="outlined"
                        class="w-100 mt-2"
                        placeholder="Choose Date"
                        prepend-icon=""
                        clearable=""
                        >
                        </v-date-input>
                    </div>

                    <div class="d-flex flex-wrap flex-sm-nowrap flex-row ga-4 w-100">
                        <div class="w-100">
                            Clock In <br>
                            <v-text-field 
                            v-model="form.clockIn"
                            type="time"
                            hide-details="auto"
                            variant="outlined"
                            :rules="clockInOutRules"
                            class="mt-2"
                            ></v-text-field>
                        </div>

                        <div class="w-100">
                            Clock Out <br>
                            <v-text-field 
                            v-model="form.clockOut"
                            type="time"
                            hide-details="auto"
                            variant="outlined"
                            :rules="clockInOutRules"
                            class="mt-2"
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