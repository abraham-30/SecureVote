<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import AdminSideNavbar from '@/components/AdminSideNavbar.vue';
import { attendanceTypesList } from '@/services/AttendanceTypeService';
import { WorkingHoursList } from '@/services/WorkingHoursService';
import { useGroupStore } from '@/stores/GroupStore';

const popupDelete = ref(false);
const popupAddCategory = ref(false);
const groupStore = useGroupStore()
const { group } = storeToRefs(groupStore)
const workingHours = ref()
const attendanceTypes = ref()

onMounted(async () => {
    await attendanceTypesList(group?.id)
    .then((response) => {
        attendanceTypes.value = response.data
    })

    await WorkingHoursList(group?.id)
    .then((response) => {
        workingHours.value = response.data
    })
})
</script>

<template>
    <admin-side-navbar></admin-side-navbar>
    <div class="py-14 min-h-screen">
        <div class="d-flex flex-column ga-8">
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
                <div>
                    <div>
                        <v-form>
                            <v-row gap="8">
                                <v-col>
                                    <v-card class="bg-white">
                                        <v-checkbox label="Monday" hide-details="true"></v-checkbox>
                                    </v-card>
                                </v-col>
                                <v-col>
                                    <v-card class="bg-white">
                                        <v-checkbox label="Tuesday" hide-details="true"></v-checkbox>
                                    </v-card>
                                </v-col>
                                <v-col>
                                    <v-card class="bg-white">
                                        <v-checkbox label="Wednesday" hide-details="true"></v-checkbox>
                                    </v-card>
                                </v-col>
                                <v-col>
                                    <v-card class="bg-white">
                                        <v-checkbox label="Thursday" hide-details="true"></v-checkbox>
                                    </v-card>
                                </v-col>
                            </v-row>
                            <v-row gap="8">
                                <v-col>
                                    <v-card class="bg-white">
                                        <v-checkbox label="Friday" hide-details="true"></v-checkbox>
                                    </v-card>
                                </v-col>
                                <v-col>
                                    <v-card class="bg-white">
                                        <v-checkbox label="Saturday" hide-details="true"></v-checkbox>
                                    </v-card>
                                </v-col>
                                <v-col>
                                    <v-card class="bg-white">
                                        <v-checkbox label="Sunday" hide-details="true"></v-checkbox>
                                    </v-card>
                                </v-col>
                            </v-row>

                            <div class="d-flex flex-row ga-2 mt-4 justify-end">
                            <v-btn
                            text="Save Changes"
                            class="bg-white"
                            ></v-btn>
                            <v-btn
                            text="Discard Changes"
                            color="red"
                            ></v-btn> <!-- Disabled button when there no changes was made-->
                        </div>
                        </v-form>
                    </div>
                </div>
            </div>
            <div class="d-flex flex-column ga-4">
                <div class="d-flex flex-column ga-1">
                    <span class="text-title-medium font-weight-bold">Working Hours</span>
                    <v-divider class="border-opacity-50"></v-divider>      
                </div>
                <div>
                    <v-form class="d-flex flex-column align-end ga-8">
                        <div class="d-flex flex-row w-100 ga-4">
                            <div class="w-50">
                                Start Hour <br>
                                <v-text-field
                                type="time"
                                hide-details="auto"
                                variant="outlined"></v-text-field>
                            </div>

                            <div class="w-50">
                                End Hour <br>
                                <v-text-field
                                type="time"
                                hide-details="auto"
                                variant="outlined"></v-text-field>
                            </div>
                        </div>
                        <div class="d-flex flex-row ga-2">
                            <v-btn
                            text="Save Changes"
                            class="bg-white"
                            ></v-btn>
                            <v-btn
                            text="Discard Changes"
                            color="red"
                            ></v-btn> <!-- Disabled button when there no changes was made-->
                        </div>
                    </v-form>
                </div>
            </div>
            <div class="d-flex flex-column ga-4">
                <div class="d-flex flex-column ga-1">
                    <span class="text-title-medium font-weight-bold">Leave Categories</span>
                    <v-divider class="border-opacity-50"></v-divider>      
                </div>
                <div class="d-flex flex-column ga-4">
                    <v-btn
                        text="Add Category +"
                        class="bg-white"
                        style="max-width: 150px;"
                        @click = "popupAddCategory=true"
                    ></v-btn>
                    <v-dialog
                    v-model="popupAddCategory"
                    max-width="600">
                        <v-card class="pa-4">
                            <v-card-actions>
                                <v-btn
                                variant="text"
                                icon="mdi-close"
                                @click="popupAddCategory = false"></v-btn>
                            </v-card-actions>
                            <v-card-title class="font-weight-bold text-headline-medium">
                                Add Category
                            </v-card-title>
                            <v-card-subtitle class="text-grey-lighten-1">
                                <v-divider class="border-opacity-50 mt-1"></v-divider>      
                            </v-card-subtitle>
                            <v-card-text class="d-flex flex-column align-start ga-4">
                                <v-form class="d-flex flex-column ga-8 w-100 align-start">
                                    <div class="w-100">
                                        Name <br>
                                        <v-text-field
                                        placeholder="Type Name"
                                        hide-details="auto"
                                        variant="outlined"
                                        class="w-100"></v-text-field>
                                    </div>

                                    <div class="w-100">
                                        Quantity <br>
                                        <v-text-field
                                        placeholder="Type Quantity"
                                        hide-details="auto"
                                        type="number"
                                        variant="outlined"
                                        class="w-100"></v-text-field>
                                    </div>
                                    <v-btn
                                    text="Save Changes"
                                    class="bg-white"></v-btn>
                                </v-form>
                            </v-card-text>
                        </v-card>
                    </v-dialog>
                    <v-dialog
                    max-width="600"
                    v-for="item in attendanceTypes">
                    <template v-slot:activator="{ props: activatorProps }">
                        <!-- Iterate Here -->
                        <v-card 
                        class="w-25"
                        :title="item?.name"
                        color="white"
                        link
                        v-bind="activatorProps">
                            <v-card-text>
                                <v-chip
                                :text="item?.max_days"
                                color="blue-darken-2"
                                variant="flat"></v-chip>
                            </v-card-text>
                        </v-card>
                    </template>

                    <template v-slot:default="{ isActive }">
                        <v-card class=" ">
                            <v-card-actions>
                                <v-btn
                                variant="text"
                                icon="mdi-close"
                                @click="() => isActive.value = false"></v-btn>
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
                                @click = "popupReject = true"
                                ></v-btn>
                                <v-form class="d-flex flex-column ga-8 w-100 align-end">
                                    <div class="w-100">
                                        Name <br>
                                        <v-text-field
                                        placeholder="Type Name"
                                        hide-details="auto"
                                        variant="outlined"
                                        model-value="Cuti Tahunan"
                                        class="w-100"></v-text-field>
                                    </div>

                                    <div class="w-100">
                                        Quantity <br>
                                        <v-text-field
                                        placeholder="Type Quantity"
                                        hide-details="auto"
                                        type="number"
                                        variant="outlined"
                                        model-value="15"
                                        class="w-100"></v-text-field>
                                    </div>
                                    <v-btn
                                    text="Save Changes"
                                    class="bg-white"></v-btn>
                                </v-form>
                            </v-card-text>
                        </v-card>
                    </template>
                    </v-dialog>
                   
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
                    style="min-width: 150px;"
                    @click = "popupDelete = true"
                    ></v-btn>
                </div>
                <v-dialog
                v-model="popupDelete"
                max-width="500"
                >
                    <v-card
                    class="d-flex flex-column align-center pa-8 w-100">
                        <v-card-title class="d-flex flex-column ga-2 align-center font-weight-bold">
                            <v-icon
                            size="72"
                            color="warning"
                            icon="mdi-alert"></v-icon>
                            Are You Sure?
                        </v-card-title>
                        <v-card-text class="text-center text-grey-lighten-1">
                            By clicking the “Delete” button, this whole organization is going to be deleted forever
                        </v-card-text>
                        <v-card-actions class="d-flex flex-column w-100 align-center">
                            <v-form
                            class="d-flex flex-column align-center ga-8 w-100">
                                <div class="w-100">
                                    Please enter your password to continue <br>
                                    <v-text-field
                                    placeholder=""
                                    hide-details="auto"
                                    variant="outlined"
                                    type="password"
                                    class="w-100">
                                    </v-text-field>
                                </div>    
                            
                                <div class="d-flex flex-row ga-2 w-100">
                                    <v-btn
                                    variant="flat"
                                    text="Cancel"
                                    class="bg-white w-50"
                                    @click = "popupDelete = false"
                                    ></v-btn>
                                    <v-btn
                                    class="w-50"
                                    color="red"
                                    variant="flat"
                                    text="Delete"
                                    @click = ""
                                    
                                    ></v-btn>  <!-- Please add delete action -->
                                </div>
                            </v-form>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </div>
        </div>
    </div>
</template>

<style scoped></style>