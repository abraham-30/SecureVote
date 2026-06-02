<script setup>
import { ref, onMounted, reactive, onUnmounted, computed, watch } from 'vue';
import { storeToRefs } from 'pinia';
import AdminSideNavbar from '@/components/AdminSideNavbar.vue';
import { addAttendanceType, attendanceTypesList, updateAttendanceType } from '@/services/AttendanceTypeService';
import { updateWorkingDays, updateWorkingHours, WorkingHoursList } from '@/services/WorkingHoursService';
import { useGroupStore } from '@/stores/GroupStore';
import { formatDate } from '@/utils/date';
import { fieldRequired, passwordFieldCheck } from '@/utils/rules';
import moment from 'moment';
import { deleteGroup } from '@/services/GroupServices';
import router from '@/router';
import { useUserStore } from '@/stores/UserStore';

const popupDelete = ref(false);
const popupDeleteCategory = ref(false);
const groupStore = useGroupStore()
const { group } = storeToRefs(groupStore)
const userStore = useUserStore()
const { email } = storeToRefs(userStore)

const isLoadingDays = ref(true)
const isLoadingWorkingHours = ref(true)
const isLoadingCategory = ref(true)
const isLoadingPopUpCategory = ref(false)
const isLoadingDeleteOrganization = ref(false)
const controller = new AbortController()
const isSidebarOpen = ref(false)
const formWorkingHoursRef = ref()

const formWorkingHours = reactive({
    startTime: null,
    endTime: null,
})

const formWorkingHoursTemp = reactive({
    isValid: false,
    ...formWorkingHours
})

const formWorkingDays = reactive({
    selectedDays: null,
})

const formWorkingDaysTemp = reactive({
    isValid: false,
    ...formWorkingDays
})

const formAttendanceTypes = reactive({
    attendanceTypes: null,
})

const formAttendanceTypesTemp = reactive({
    isValid: false,
    id: null,
    index: null,
    name: null,
    quantity: null,
})

const formDeleteOrg = reactive({
    isValid: false,
    password: null,
})

const allDays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
]

const passwordRules = [
    v => fieldRequired(v, 'Password is required'),
    v => passwordFieldCheck(v)
]

const passwordError = ref([])

const checkBoxRules = computed(() => {
    if (formWorkingDaysTemp.selectedDays?.length == 0) 
        return "Minimum 1 day is selected"
    return null
})

const workingHoursRules = computed(() => {
    return formWorkingHoursTemp.startTime &&
        formWorkingHoursTemp.endTime &&
        moment(formWorkingHoursTemp.startTime, "HH:mm:ss")
        .isBefore(moment(formWorkingHoursTemp.endTime, "HH:mm:ss"))
})

const isWorkingDaysDirty = computed(() => {
    const oriData = [...(formWorkingDays.selectedDays || [])].sort()
    const tempData = [...(formWorkingDaysTemp.selectedDays || [])].sort()

    return (
        oriData.length === tempData.length &&
        oriData.every((value, index) => value === tempData[index])
    )
})

const isWorkingHoursDirty = computed(() => {
    return (
        formWorkingHours.startTime === formWorkingHoursTemp.startTime &&
        formWorkingHours.endTime === formWorkingHoursTemp.endTime
    )
})

const isEditAttendanceTypeDirty = computed(() => {
    return (
        formAttendanceTypes.attendanceTypes?.[formAttendanceTypesTemp.index || 0].name === formAttendanceTypesTemp.name &&
        formAttendanceTypes.attendanceTypes?.[formAttendanceTypesTemp.index || 0].max_days === formAttendanceTypesTemp.quantity
    )
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

    formAttendanceTypesTemp.name = null
    formAttendanceTypesTemp.quantity = null
    formAttendanceTypesTemp.id = null
    formAttendanceTypesTemp.index = null
}

function activateSidebar(){
    isSidebarOpen.value = !isSidebarOpen.value
}

const resetWorkingHours = () => {
    formWorkingHoursTemp.startTime = formWorkingHours.startTime
    formWorkingHoursTemp.endTime = formWorkingHours.endTime
}

const resetWorkingDays = () => {
    formWorkingDaysTemp.selectedDays = [...formWorkingDays.selectedDays]
}

const handleSubmitWorkingHours = async () => {
    try {
        isLoadingWorkingHours.value = true

        if(formWorkingHoursTemp.isValid) {
            await updateWorkingHours(formWorkingHoursTemp, group.value?.id)
            .then(response => {
                if(response.status == 200) {
                    formWorkingHours.startTime = formatDate(response.data.start_time, "HH:mm", "HH:mm:ss") 
                    formWorkingHours.endTime = formatDate(response.data.end_time, "HH:mm", "HH:mm:ss") 
    
                    formWorkingHoursTemp.startTime = formWorkingHours.startTime
                    formWorkingHoursTemp.endTime = formWorkingHours.endTime
                }
            })
        }
    } catch (error) {
        console.error(error)
    } finally {
        isLoadingWorkingHours.value = false
    }
}

const handleSubmitWorkingDays = async () => {
    try {
        isLoadingDays.value = true

        if(formWorkingDaysTemp.isValid) {
            const oriData = [...formWorkingDays.selectedDays]
            const tempData = [...formWorkingDaysTemp.selectedDays]

            const added = tempData.filter(day => !oriData.includes(day))
            const removed = oriData.filter(day => !tempData.includes(day))

            const combined = {
                added_days: added,
                deleted_days: removed,
                start_time: formWorkingHours.startTime,
                end_time: formWorkingHours.endTime,
            }

            await updateWorkingDays(combined, group.value?.id)
            .then(response => {
                if(response.status == 200) {
                    formWorkingDays.selectedDays = response.data.map(item => item.day)
                    formWorkingDaysTemp.selectedDays = [...formWorkingDays.selectedDays]
                }
            })
        }
    } catch (error) {
        console.error(error)
    } finally {
        isLoadingDays.value = false
    }
}

const handleSubmitAddAttendanceType = async (isActive) => {
    try {
        isLoadingPopUpCategory.value = true

        if(formAttendanceTypesTemp.isValid) {
            await addAttendanceType({
                name: formAttendanceTypesTemp.name,
                group_id: group.value.id,
                max_days: parseInt(formAttendanceTypesTemp.quantity),
            }, group.value.id)
            .then((response) => {
                if (response.status == 201) {
                    formAttendanceTypes.attendanceTypes.push(response.data)
                    
                    closePopUpCategory(isActive)
                }
            })
        }
    } catch (error) {
        console.error(error)
    } finally {
        isLoadingPopUpCategory.value = false
    }
}

const handleSubmitEditAttendanceType = async (isActive) => {
    try {
        isLoadingPopUpCategory.value = true

        if(formAttendanceTypesTemp.isValid) {
            await updateAttendanceType({
                name: formAttendanceTypesTemp.name,
                max_days: parseInt(formAttendanceTypesTemp.quantity),
            }, formAttendanceTypesTemp.id, group.value.id)
            .then((response) => {
                if (response.status == 200) {
                    formAttendanceTypes.attendanceTypes[formAttendanceTypesTemp.index].name = response.data.name
                    formAttendanceTypes.attendanceTypes[formAttendanceTypesTemp.index].max_days = response.data.max_days
                    
                    closePopUpCategory(isActive)
                }
            })
        }
    } catch (error) {
        console.error(error)
    } finally {
        isLoadingPopUpCategory.value = false
    }
}

const handleSubmitDeleteAttendanceType = async () => {
    try {
        isLoadingPopUpCategory.value = true

        if(formAttendanceTypesTemp.isValid) {
            await updateAttendanceType({
                is_deleted: true,
            }, formAttendanceTypesTemp.id, group.value.id)
            .then((response) => {
                if (response.status == 200) {
                    formAttendanceTypes.attendanceTypes.splice(formAttendanceTypesTemp.index, 1)

                    popupDeleteCategory.value = false
                }
            })
        }
    } catch (error) {
        console.error(error)
    } finally {
        isLoadingPopUpCategory.value = false
    }
}

const handleDeleteOrganization = async () => {
    isLoadingDeleteOrganization.value = true

    try {
        await deleteGroup({
            data: {
                email: email.value, 
                password: formDeleteOrg.password
            }
        }, group.value.id)
        .then((response) => {
            if (response.status == 204 && !response.data.error_code)
                    router.push({name: 'home'})
                else if(response.data.error_code == 6) {
                    passwordError.value = ['Invalid password']
                }
        })
    } catch (error) {
        console.error(error)
    } finally {
        isLoadingDeleteOrganization.value = false
    }
}

onMounted(async () => {
    attendanceTypesList(group.value?.id, controller.signal)
    .then((response) => {
        formAttendanceTypes.attendanceTypes = response.data

        isLoadingCategory.value = false
    })
    
    WorkingHoursList(group.value?.id, controller.signal)
    .then((response) => {
        formWorkingHours.startTime = formatDate(response.data[0]?.start_time, "HH:mm", "HH:mm:ss") 
        formWorkingHours.endTime = formatDate(response.data[0]?.end_time, "HH:mm", "HH:mm:ss") 
        formWorkingDays.selectedDays = response.data.map(item => item.day)
        
        formWorkingDaysTemp.selectedDays = [...formWorkingDays.selectedDays]
        formWorkingHoursTemp.startTime = formWorkingHours.startTime
        formWorkingHoursTemp.endTime = formWorkingHours.endTime
        isLoadingDays.value = false
        isLoadingWorkingHours.value = false
    })
})

watch([() => formWorkingHoursTemp.startTime, () => formWorkingHoursTemp.endTime], () => {
    formWorkingHoursRef.value?.validate()
})

watch(() => formDeleteOrg.password, () => {
    passwordError.value = []
})

onUnmounted(() => {
    controller.abort()  
})
</script>

<template>
    <admin-side-navbar
    :is-open = isSidebarOpen
    @activate="activateSidebar"
    ></admin-side-navbar>    
    <div class="py-14 min-h-screen">
        <div class="d-flex flex-column ga-8">
            <div>
                <v-btn 
                icon="mdi-menu"
                variant="text"
                v-if="!isSidebarOpen"
                @click="activateSidebar"
                ></v-btn>
            </div>
            <div class="d-flex flex-column">
                <v-icon 
                size="60"
                icon="mdi-cog-outline" 
                class="text-yellow-darken-1"
                ></v-icon>
                <span class="text-headline-medium font-weight-bold">Organization Settings</span>
            </div>
            <div class="d-flex flex-column ga-4">
                <div class="d-flex flex-column ga-1">
                    <span class="text-title-medium font-weight-bold">Working Days</span>
                    <v-divider class="border-opacity-50"></v-divider>      
                </div>
                <div class="d-flex flex-column ga-2">
                    <v-form v-model="formWorkingDaysTemp.isValid" validate-on="input lazy" @submit.prevent="handleSubmitWorkingDays()">
                        <div class="d-flex flex-wrap justify-center ga-2">
                            <v-checkbox
                            v-for="day in allDays"
                            v-model="formWorkingDaysTemp.selectedDays"
                            :loading="isLoadingDays"
                            :disabled="isLoadingDays"
                            :label="day"
                            :value="day"
                            hide-details="auto"
                            multiple
                            class="bg-white rounded w-100 w-sm-25 flex-grow-1"
                            ></v-checkbox>
                        </div>
                        <p v-if="!!checkBoxRules" class="ma-0 text-error text-body-small pt-2 pl-4">{{ checkBoxRules }}</p>
                        <div class="d-flex flex-wrap flex-sm-nowrap flex-row ga-2 mt-8 justify-end">
                            <v-btn
                            color="white"
                            text="Save Changes"
                            type="submit"
                            class="w-100 w-sm-25"
                            :disabled="isLoadingDays || isWorkingDaysDirty"
                            ></v-btn>
                            <v-btn
                            text="Discard Changes"
                            color="red"
                            class="w-100 w-sm-25"
                            :disabled="isLoadingDays || isWorkingDaysDirty"
                            @click="resetWorkingDays()"
                            ></v-btn>
                        </div>
                    </v-form>
                </div>
            </div>
            <div class="d-flex flex-column ga-4">
                <div class="d-flex flex-column ga-1">
                    <span class="text-title-medium font-weight-bold">Working Hours</span>
                    <v-divider class="border-opacity-50"></v-divider>      
                </div>
                <v-form 
                ref="formWorkingHoursRef"
                v-model="formWorkingHoursTemp.isValid"
                validate-on="input lazy"
                class="d-flex flex-column ga-8"
                @submit.prevent=handleSubmitWorkingHours()
                >
                <div class="d-flex flex-row flex-wrap flex-sm-nowrap w-100 ga-4">
                    <div class="w-100">
                        Start Hour <br>
                        <v-text-field
                        v-model="formWorkingHoursTemp.startTime"
                        :loading="isLoadingWorkingHours"
                        :disabled="isLoadingWorkingHours"
                        :rules="startHourRules"
                        type="time"
                        hide-details="auto"
                        variant="outlined"
                        class="mt-2"></v-text-field>
                    </div>
                    <div class="w-100">
                        End Hour <br>
                        <v-text-field
                        v-model="formWorkingHoursTemp.endTime"
                        :loading="isLoadingWorkingHours"
                        :disabled="isLoadingWorkingHours"
                        :rules="endHourRules"
                        type="time"
                        hide-details="auto"
                        variant="outlined"
                        class="mt-2"></v-text-field>
                    </div>
                </div>
                <div class="d-flex flex-wrap flex-sm-nowrap flex-row ga-2 justify-end">
                        <v-btn
                        color="white"
                        text="Save Changes"
                        type="submit"
                        class="w-100 w-sm-25"
                        :disabled="isLoadingWorkingHours || isWorkingHoursDirty"
                        ></v-btn>
                        <v-btn
                        :disabled="isLoadingWorkingHours || isWorkingHoursDirty"
                        text="Discard Changes"
                        color="red"
                        class="w-100 w-sm-25"
                        @click="resetWorkingHours()"
                        ></v-btn>
                    </div>
                </v-form>
            </div>
            <div class="d-flex flex-column ga-4">
                <div class="d-flex flex-column ga-1">
                    <span class="text-title-medium font-weight-bold">Leave Categories</span>
                    <v-divider  class="border-opacity-50"></v-divider>      
                </div>
                <div class="d-flex flex-column ga-2">
                    <template v-if="isLoadingCategory">
                        <div class="d-flex flex-wrap ga-2">
                            <v-skeleton-loader v-for="i in 4" type="image" class="w-100 flex-grow-1" style="width: 20%;"></v-skeleton-loader>
                        </div>
                    </template>
                    <template v-else>
                        <div class="d-flex flex-column ga-4">
                            <v-dialog                                
                            max-width="600"
                            :persistent="isLoadingPopUpCategory"
                            >
                                <template v-slot:activator="{ props: activatorProps }">
                                    <v-btn
                                        color="white"
                                        text="Add Category +"
                                        class="w-100 w-sm-33"
                                        v-bind="activatorProps"
                                    ></v-btn>
                                </template>

                                <template #default="{ isActive }">
                                    <v-card class="pa-4" :loading="isLoadingPopUpCategory" :disabled="isLoadingPopUpCategory">
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
                                            <v-form 
                                            v-model="formAttendanceTypesTemp.isValid"
                                            validate-on="input lazy"
                                            class="d-flex flex-column ga-8 w-100 align-end"
                                            @submit.prevent="handleSubmitAddAttendanceType(isActive)"
                                            >
                                                <div class="w-100">
                                                    Name <br>
                                                    <v-text-field
                                                    v-model="formAttendanceTypesTemp.name"
                                                    :rules="[v => fieldRequired(v, 'Name is required')]"
                                                    placeholder="Type Name"
                                                    hide-details="auto"
                                                    variant="outlined"
                                                    class="w-100 mt-2"></v-text-field>
                                                </div>
            
                                                <div class="w-100">
                                                    Quantity <br>
                                                    <v-number-input
                                                    v-model="formAttendanceTypesTemp.quantity"
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
                                                class="w-100 w-sm-33"></v-btn>
                                            </v-form>
                                        </v-card-text>
                                    </v-card>
                                </template>
                            </v-dialog>
                            <div class="d-flex flex-wrap ga-2">
                                <v-dialog
                                :persistent="isLoadingPopUpCategory"
                                max-width="600"
                                v-for="(item, index) in formAttendanceTypes.attendanceTypes">
                                <template v-slot:activator="{ props: activatorProps }">
                                    <!-- Iterate Here -->
                                    <v-card 
                                    class="rounded w-100 w-sm-25 flex-grow-1"
                                    :title="item?.name"
                                    color="white"
                                    link
                                    v-bind="activatorProps"
                                    @click="() => {
                                        formAttendanceTypesTemp.id = item?.id
                                        formAttendanceTypesTemp.name = item?.name
                                        formAttendanceTypesTemp.quantity = item?.max_days
                                        formAttendanceTypesTemp.index = index
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
                                    <v-card class="pa-2 pb-8 pa-sm-6 pb-sm-10" :loading="isLoadingPopUpCategory" :disabled="isLoadingPopUpCategory">
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
                                            @click = "() => {
                                                popupDeleteCategory = true
                                                isActive.value = false
                                            }"
                                            ></v-btn>
                                            <v-form
                                            v-model="formAttendanceTypesTemp.isValid"
                                            validate-on="input eager"
                                            class="d-flex flex-column ga-8 w-100 align-end"
                                            @submit.prevent="handleSubmitEditAttendanceType(isActive)"
                                            >
                                                <div class="w-100">
                                                    Name <br>
                                                    <v-text-field
                                                    v-model="formAttendanceTypesTemp.name"
                                                    :rules="[v => fieldRequired(v, 'Name is required')]"
                                                    placeholder="Type Name"
                                                    hide-details="auto"
                                                    variant="outlined"
                                                    class="w-100 mt-2"></v-text-field>
                                                </div>
            
                                                <div class="w-100">
                                                    Quantity <br>
                                                    <v-number-input
                                                    v-model="formAttendanceTypesTemp.quantity"
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
                                                :disabled="isEditAttendanceTypeDirty"
                                                class="w-100 w-sm-33"></v-btn>
                                            </v-form>
                                        </v-card-text>
                                    </v-card>
                                </template>
                                </v-dialog>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
            <div class="d-flex flex-column ga-4">
                <div class="d-flex flex-column ga-1">
                    <span class="text-title-medium font-weight-bold">Delete Organization</span>
                    <v-divider class="border-opacity-50"></v-divider>      
                </div>
                <div class="d-flex flex-column align-end ga-4">
                    <span class="w-100">By clicking the “Delete” button, this whole organization is going to be deleted forever</span>
                    <v-btn
                    text="Delete"
                    color="red"
                    class="w-100 w-sm-33"
                    :disabled="isLoadingDays || isLoadingWorkingHours || isLoadingCategory"
                    @click = "() => {
                        popupDelete = true
                        formDeleteOrg.password = ''
                    }"
                    ></v-btn>
                </div>
                <v-dialog
                v-model="popupDelete"
                :persistent="isLoadingPopUpCategory"
                max-width="450"
                >
                    <v-card
                    class="pa-2 pb-8 pa-sm-6 pb-sm-10 d-flex flex-column align-center" :disabled="isLoadingDeleteOrganization" :loading="isLoadingDeleteOrganization">
                        <v-card-title class="d-flex flex-column ga-2 align-center font-weight-bold">
                            <v-icon
                            size="72"
                            color="warning"
                            icon="mdi-alert"></v-icon>
                            Are You Sure?
                        </v-card-title>
                        <v-card-text class="text-center text-body-medium text-sm-body-large text-grey-lighten-1">
                            By clicking the “Delete” button, this whole organization is going to be deleted forever
                        </v-card-text>
                        <v-card-actions class="d-flex flex-column w-100 align-center" >
                            <v-form
                            v-model="formDeleteOrg.isValid"
                            validate-on="input lazy"
                            class="d-flex flex-column align-center ga-8 w-100"
                            @submit.prevent="handleDeleteOrganization()"
                            >
                                <div class="w-100">
                                    Please enter your password to continue <br>
                                    <v-text-field 
                                        v-model="formDeleteOrg.password"
                                        :rules = "passwordRules"
                                        :error-messages="passwordError"
                                        hide-details="auto"
                                        type="password"
                                        variant="outlined"
                                        class="w-100 mt-2"
                                    >
                                    </v-text-field>
                                </div>    
                            
                                <div class="w-100 d-flex flex-wrap-reverse flex-sm-nowrap justify-center ga-2">
                                    <v-btn
                                    color="white"
                                    variant="flat"
                                    text="Cancel"
                                    class="w-100 w-sm-33"
                                    @click = "popupDelete = false"
                                    ></v-btn>
                                    <v-btn
                                    type="submit"
                                    class="w-100 w-sm-33"
                                    color="red"
                                    variant="flat"
                                    text="Delete"
                                    ></v-btn>  <!-- Please add delete action -->
                                </div>
                            </v-form>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </div>
            <v-dialog
            :persistent="isLoadingPopUpCategory"
            max-width="450"
            v-model="popupDeleteCategory">
                <v-card class="pa-2 pb-8 pa-sm-6 pb-sm-10 d-flex flex-column align-center" :loading="isLoadingPopUpCategory" :disabled="isLoadingPopUpCategory">
                    <v-card-title class="d-flex flex-column ga-2 align-center font-weight-bold">
                        <v-icon
                        size="72"
                        color="warning"
                        icon="mdi-alert"></v-icon>
                        Are You Sure?
                    </v-card-title>
                    <v-card-text class="text-center text-grey-lighten-1">This action cannot be reverted</v-card-text>
                    <v-card-actions class="w-100">
                        <div class="w-100 d-flex flex-wrap-reverse flex-sm-nowrap justify-center ga-2">
                            <v-btn
                            color="white"
                            variant="flat"
                            text="Cancel"
                            class="w-100 w-sm-50"
                            @click="() => popupDeleteCategory = false"
                            ></v-btn>
                            <v-btn
                            color="red"
                            variant="flat"
                            text="Remove Category"
                            class="w-100 w-sm-50"
                            @click = "handleSubmitDeleteAttendanceType()" 
                            ></v-btn>
                        </div>
                    </v-card-actions>
                </v-card>
            </v-dialog>
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