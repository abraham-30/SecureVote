<script setup>
import { fieldRequired } from '@/utils/rules';
import { computed, reactive, ref, watch } from 'vue';
import moment from 'moment';
import { addGroup } from '@/services/GroupServices';
import { useUserStore } from '@/stores/UserStore';
import { useGroupStore } from '@/stores/GroupStore';
import router from '@/router';

const allDays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
]

const tempData = [
    {
        name:"Lorem Ipsum",
        max_days: 1
    },
    {
        name:"Lorem Ipsum 2",
        max_days: 2
    },
    {
        name:"Lorem Ipsum 3",
        max_days: 3
    },
    {
        name:"Lorem Ipsum 4",
        max_days: 4
    },
    {
        name:"Lorem Ipsum 5",
        max_days: 5
    },
    {
        name:"Lorem Ipsum 6",
        max_days: 6
    },
    {
        name:"Lorem Ipsum 7",
        max_days: 7
    },
]

const userStore = useUserStore()
const groupStore = useGroupStore()
const formStartTimeRef = ref()
const formEndTimeRef = ref()
const isLoadingSubmit = ref(false)

const form = reactive({
    isValid: false,
    isWorkingDaysDirty: false,
    workingDays: [],
    workingHours: {
        startTime: null,
        endTime: null,
    },
    group: {
        name: null,
        description: null,
    },
    attendanceTypes: [],
    tempName: null,
    tempMaxDays: null,
    tempIndex: null,
})

const checkBoxRules = computed(() => {
    if (form.isWorkingDaysDirty && form.workingDays?.length == 0) 
        return "Minimum 1 day is selected"
    return null
})

const workingHoursRules = computed(() => {
    return form.workingHours.startTime &&
        form.workingHours.endTime &&
        moment(form.workingHours.startTime, "HH:mm:ss")
        .isBefore(moment(form.workingHours.endTime, "HH:mm:ss"))
})

const startHourRules = [
    v => fieldRequired(v, "Start Hour is required"),
    v => workingHoursRules.value || "Start Hour must be before End Hour"
] 

const endHourRules = [
    v => fieldRequired(v, "End Hour is required"),
    v => workingHoursRules.value || "End Hour must be after Start Hour"
]

const closePopUpCategory = (isActive) => {
    if(!!isActive.value)
        isActive.value = false

    form.tempName = null
    form.tempMaxDays = null
    form.tempIndex = null
}

const handleAddAttendanceType = (isActive) => {
    form.attendanceTypes.push({
        name: form.tempName,
        max_days: form.tempMaxDays,
    })

    closePopUpCategory(isActive)
}

const handleDeleteAttendanceType = (isActive) => {
    form.attendanceTypes.splice(form.tempIndex, 1)

    closePopUpCategory(isActive)
}

const handleEditAttendanceType = (isActive) => {
    form.attendanceTypes[form.tempIndex].name = form.tempName,
    form.attendanceTypes[form.tempIndex].max_days = form.tempMaxDays,

    closePopUpCategory(isActive)
}

const handleSubmit = async () => {
    try {
        isLoadingSubmit.value = true

        if(form.isValid) {
            await addGroup(form)
            .then((response) => {
                if(response.status == 201) {
                    userStore.setRole("admin")
                    groupStore.setGroup(response.data)

                    router.push({ name: "organizationProfile" })
                }
            })
        }
    } catch (error) {
        console.error(error)
    } finally {
        isLoadingSubmit.value = false
    }
}

watch([() => form.workingHours.startTime, () => form.workingHours.endTime], () => {
    formStartTimeRef.value?.validate()
    formEndTimeRef.value?.validate()
})
</script>

<template>
    <div class="py-14 min-h-screen">
        <div class="d-flex flex-column ga-8 py-14">
            <v-btn variant="text" style="width: fit-content;" @click="$router.back()">
                ← Back
            </v-btn>
            <div class="d-flex flex-column">
                <span class="text-headline-medium font-weight-bold">Register Organization</span>
            </div>
            <v-form v-model="form.isValid" validate-on="input lazy" class="d-flex flex-column ga-8" @submit.prevent="handleSubmit()">
                <div class="d-flex flex-column ga-1">
                    <span class="text-title-medium font-weight-bold">Organization Details</span>
                    <v-divider class="border-opacity-50"></v-divider>    
                </div>
                <div class="w-100">
                    Name<br>
                    <v-text-field
                    v-model="form.group.name"
                    :disabled="isLoadingSubmit"
                    :rules = "[v => fieldRequired(v, 'Organization Name is required')]"
                    placeholder="Type Name"
                    variant="outlined"
                    hide-details="auto"
                    class="w-100 mt-2"></v-text-field>  
                </div>
                <div class="w-100">
                    Description<br>
                    <v-textarea
                    v-model="form.group.description"
                    :disabled="isLoadingSubmit"
                    :rules = "[v => fieldRequired(v, 'Organization Description is required')]"
                    placeholder="Type Description"
                    variant="outlined"
                    hide-details="auto"
                    class="w-100 mt-2"></v-textarea>
                </div>

                <div class="w-100">
                    <span class="text-title-medium font-weight-bold">Working Days</span>
                    <v-divider class="border-opacity-50"></v-divider>      
                </div>
                <div>
                    <div class="d-flex flex-wrap justify-center ga-2">
                        <v-checkbox
                        v-for="day in allDays"
                        v-model="form.workingDays"
                        :loading="isLoadingSubmit"
                        :disabled="isLoadingSubmit"
                        :label="day"
                        :value="day"
                        hide-details="auto"
                        multiple
                        class="bg-white rounded w-100 w-sm-25 flex-grow-1"
                        @click="form.isWorkingDaysDirty = true"
                        ></v-checkbox>
                    </div>
                    <p v-if="!!checkBoxRules" class="ma-0 text-error text-body-small pt-2 pl-4">{{ checkBoxRules }}</p>
                </div>

                <div class="d-flex flex-column ga-1">
                    <span class="text-title-medium font-weight-bold">Working Hours</span>
                    <v-divider class="border-opacity-50"></v-divider>      
                </div>
                <div class="d-flex flex-wrap flex-sm-nowrap flex-row w-100 ga-4">
                    <div class="w-100">
                        Start Hour <br>
                        <v-text-field
                        ref="formStartTimeRef"
                        v-model="form.workingHours.startTime"
                        :loading="isLoadingSubmit"
                        :disabled="isLoadingSubmit"
                        :rules="startHourRules"
                        type="time"
                        hide-details="auto"
                        variant="outlined"
                        class="mt-2"></v-text-field>
                    </div>
                    <div class="w-100">
                        End Hour <br>
                        <v-text-field
                        ref="formEndTimeRef"
                        v-model="form.workingHours.endTime"
                        :loading="isLoadingSubmit"
                        :disabled="isLoadingSubmit"
                        :rules="endHourRules"
                        type="time"
                        hide-details="auto"
                        variant="outlined"
                        class="mt-2"></v-text-field>
                    </div>
                </div>
                <div class="d-flex flex-column ga-4">
                    <div class="d-flex flex-column ga-1">
                        <span class="text-title-medium font-weight-bold">Leave Categories</span>
                        <v-divider class="border-opacity-50"></v-divider>      
                    </div>
                    <div class="d-flex flex-column ga-2">
                        <div class="d-flex flex-column ga-4">
                            <v-dialog                                
                            max-width="600"
                            >
                                <template v-slot:activator="{ props: activatorProps }">
                                    <v-btn
                                        color="white"
                                        :disabled="isLoadingSubmit"
                                        text="Add Category +"
                                        class="w-100 w-sm-33"
                                        v-bind="activatorProps"
                                    ></v-btn>
                                </template>
    
                                <template #default="{ isActive }">
                                    <v-card class="pa-2 pb-8 pa-sm-6 pb-sm-10" :disabled="isLoadingSubmit">
                                        <v-card-actions>
                                            <v-btn
                                            variant="text"
                                            icon="mdi-close"
                                            @click="closePopUpCategory(isActive)"></v-btn>
                                        </v-card-actions>
                                        <v-card-title class="font-weight-bold text-headline-medium">
                                            Add Category
                                        </v-card-title>
                                        <v-card-subtitle class="text-grey-lighten-1">
                                            <v-divider class="border-opacity-50 mt-1"></v-divider>      
                                        </v-card-subtitle>
                                        <v-card-text class="d-flex flex-column align-start ga-4">
                                            <div class="d-flex flex-column ga-8 w-100 align-end">
                                                <div class="w-100">
                                                    Name <br>
                                                    <v-text-field
                                                    v-model="form.tempName"
                                                    :rules="[v => fieldRequired(v, 'Name is required')]"
                                                    placeholder="Type Name"
                                                    hide-details="auto"
                                                    variant="outlined"
                                                    class="w-100 mt-2"></v-text-field>
                                                </div>
            
                                                <div class="w-100">
                                                    Quantity <br>
                                                    <v-number-input
                                                    v-model="form.tempMaxDays"
                                                    :rules="[v => v !== null || 'Quantity is required', v => v !== 0 || 'Quantity must be >0']"
                                                    placeholder="Type Quantity"
                                                    hide-details="auto"
                                                    variant="outlined"
                                                    control-variant="hidden"
                                                    class="w-100 mt-2"></v-number-input>
                                                </div>
                                                <v-btn
                                                color="white"
                                                text="Save Changes"
                                                class="w-100 w-sm-33"
                                                @click="handleAddAttendanceType(isActive)"
                                                ></v-btn>
                                            </div>
                                        </v-card-text>
                                    </v-card>
                                </template>
                            </v-dialog>
                            <div class="d-flex flex-wrap ga-2">
                                <v-dialog
                                max-width="600"
                                v-for="(item, index) in form.attendanceTypes">
                                <template v-slot:activator="{ props: activatorProps }">
                                    <!-- Iterate Here -->
                                    <v-card 
                                    :disabled="isLoadingSubmit"
                                    :title="item?.name"
                                    class="rounded w-100 w-sm-25 flex-grow-1"
                                    color="white"
                                    link
                                    v-bind="activatorProps"
                                    @click="() => {
                                        form.tempName = item?.name
                                        form.tempMaxDays = item?.max_days
                                        form.tempIndex = index
                                    }"
                                    >
                                        <v-card-text>
                                            <v-chip
                                            :text="item?.max_days"
                                            color="blue-darken-2"
                                            variant="flat"></v-chip>
                                        </v-card-text>
                                    </v-card>
                                </template>
                                <template v-slot:default="{ isActive }">
                                    <v-card class="pa-2 pb-8 pa-sm-6 pb-sm-10">
                                        <v-card-actions>
                                            <v-btn
                                            variant="text"
                                            icon="mdi-close"
                                            @click="closePopUpCategory(isActive)"></v-btn>
                                        </v-card-actions>
                                        <v-card-title class="font-weight-bold text-headline-medium">
                                            Edit Category
                                        </v-card-title>
                                        <v-card-subtitle class="text-grey-lighten-1">
                                            <v-divider class="border-opacity-50 mt-1"></v-divider>      
                                        </v-card-subtitle>
                                        <v-card-text class="d-flex flex-column align-start ga-4">
                                            <v-btn
                                            color="red"
                                            text="Delete Category"
                                            class="w-100 w-sm-33"
                                            @click = "handleDeleteAttendanceType(isActive)"
                                            ></v-btn>
                                            <div class="d-flex flex-column ga-8 w-100 align-end">
                                                <div class="w-100">
                                                    Name <br>
                                                    <v-text-field
                                                    v-model="form.tempName"
                                                    :rules="[v => fieldRequired(v, 'Name is required')]"
                                                    placeholder="Type Name"
                                                    hide-details="auto"
                                                    variant="outlined"
                                                    class="w-100 mt-2"></v-text-field>
                                                </div>
            
                                                <div class="w-100">
                                                    Quantity <br>
                                                    <v-number-input
                                                    v-model="form.tempMaxDays"
                                                    :rules="[v => v !== null || 'Quantity is required', v => v !== 0 || 'Quantity must be >0']"
                                                    placeholder="Type Quantity"
                                                    hide-details="auto"
                                                    variant="outlined"
                                                    control-variant="hidden"
                                                    class="w-100 mt-2"></v-number-input>
                                                </div>
                                                <v-btn
                                                color="white"
                                                type="submit"
                                                text="Save Changes"
                                                @click="handleEditAttendanceType(isActive)"
                                                class="w-100 w-sm-33"></v-btn>
                                            </div>
                                        </v-card-text>
                                    </v-card>
                                </template>
                                </v-dialog>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-center">
                    <div class="w-100 w-sm-33 mt-8">
                        <v-btn
                        :loading="isLoadingSubmit"
                        text="Save and Register"
                        type="submit"
                        class="bg-white"
                        block></v-btn>
                    </div>
                </div>
            </v-form>
        </div>
    </div>
</template>

<style scoped>
.v-checkbox {
    &:deep(.v-selection-control__wrapper) {
        height: 100%;
    }
    &:deep(.v-label.v-label--clickable) {
        width: 100%;
    }
}
</style>