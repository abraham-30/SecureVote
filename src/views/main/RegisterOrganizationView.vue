<script setup>
import { ref } from 'vue';

    const allDays = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
    ]

    const popupAddCategory = ref(false)
    const popupConfirmation = ref(false)

    const dummyCategory = [
        {
            name : 'Cuti Tahunan',
            quantity : 2
        },
        {
            name : 'Sick Leave',
            quantity : 999
        },
        {
            name : 'Sick Leave',
            quantity : 999
        },
        {
            name : 'Sick Leave',
            quantity : 999
        },
    ]
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
            <v-form validate-on="input lazy" class="d-flex flex-column ga-8">
                <div class="d-flex flex-column ga-1">
                    <span class="text-title-medium font-weight-bold">Organization Details</span>
                    <v-divider class="border-opacity-50"></v-divider>    
                </div>
                <div class="w-100">
                    Name<br>
                    <v-text-field
                    variant="outlined"
                    hide-details="auto"
                    class="w-100 mt-2"></v-text-field>  
                </div>
                <div class="w-100">
                    Description<br>
                    <v-textarea
                    variant="outlined"
                    hide-details="auto"
                    class="w-100 mt-2"></v-textarea>
                </div>

                <div class="w-100">
                    <span class="text-title-medium font-weight-bold">Working Days</span>
                    <v-divider class="border-opacity-50"></v-divider>      
                </div>
                <div class="d-flex flex-wrap justify-center ga-2">
                    <v-card
                    v-for="day in allDays"
                    class="bg-white w-100"
                    style="max-width: 310px;"
                    >
                        <v-checkbox
                        :label="day"
                        :value="day"
                        hide-details="auto"
                        ></v-checkbox>
                    </v-card>
                </div>

                <div class="d-flex flex-column ga-1">
                    <span class="text-title-medium font-weight-bold">Working Hours</span>
                    <v-divider class="border-opacity-50"></v-divider>      
                </div>
                <div class="d-flex flex-wrap flex-sm-nowrap flex-row ga-4">
                    <div class="w-100">
                        Start Hour <br>
                        <v-text-field 
                        type="time" 
                        variant="outlined" 
                        hide-details="auto"
                        class="mt-2"></v-text-field>
                    </div>

                    <div class="w-100">
                        End Hour <br>
                        <v-text-field 
                        type="time" 
                        variant="outlined" 
                        hide-details="auto"
                        class="mt-2"></v-text-field>
                    </div>
                </div>
                <div class="d-flex flex-column ga-1">
                    <span class="text-title-medium font-weight-bold">Leave Categories</span>
                    <v-divider class="border-opacity-50"></v-divider>      
                </div>
                <div class="d-flex flex-column ga-2">
                    <v-btn 
                    text="Add Categories +"
                    class="bg-white"
                    style="max-width: 150px;"
                    @click="popupAddCategory = true">
                    </v-btn>
                    <div class="d-flex flex-wrap ga-2 mt-4">
                        <v-dialog
                        v-model="popupAddCategory"
                        width="600">
                            <v-card class="pa-2 pb-8 pa-sm-6 pb-sm-10">
                                <v-card-actions>
                                    <v-btn
                                    variant="text"
                                    icon="mdi-close"
                                    @click="popupAddCategory = false"></v-btn>
                                </v-card-actions>
                                <v-card-title class="font-weight-bold text-title-large">
                                    Add Category
                                </v-card-title>
                                <v-card-subtitle class="text-grey-lighten-1">
                                    <v-divider class="border-opacity-50 mt-1"></v-divider>      
                                </v-card-subtitle>
                                <v-card-text class="d-flex flex-column align-start ga-4">
                                    <v-form 
                                    class="d-flex flex-column ga-8 w-100">
                                        <div class="w-100">
                                            Name <br>
                                            <v-text-field
                                            hide-details="auto"
                                            variant="outlined"
                                            class="w-100 mt-2"></v-text-field>
                                        </div>
    
                                        <div class="w-100">
                                            Quantity <br>
                                            <v-text-field
                                            hide-details="auto"
                                            type="number"
                                            variant="outlined"
                                            class="w-100 mt-2"></v-text-field>
                                        </div>
                                        <div class="w-100 d-flex justify-end">
                                            <v-btn
                                            text="Create"
                                            class="bg-white w-100 w-sm-33"
                                            ></v-btn>
                                        </div>
                                    </v-form>
                                </v-card-text>
                            </v-card>
                        </v-dialog>
                        <v-dialog
                        width="600"
                        v-for="item in dummyCategory">
                        <template v-slot:activator="{ props: activatorProps }">
                            <v-card 
                            class="w-100"
                            :title="item?.name"
                            color="white"
                            link
                            style="max-width:300px"
                            v-bind="activatorProps">
                                <v-card-text>
                                    <v-chip
                                    :text="item?.quantity"
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
                                    @click="() => isActive.value = false"></v-btn>
                                </v-card-actions>
                                <v-card-title class="font-weight-bold text-title-large">
                                    Edit Category
                                </v-card-title>
                                <v-card-subtitle class="text-grey-lighten-1">
                                    <v-divider class="border-opacity-50 mt-1"></v-divider>      
                                </v-card-subtitle>
                                <v-card-text class="d-flex flex-column align-start ga-4">
                                    <v-btn
                                    variant="flat"
                                    text="Delete Category"
                                    color="red">
                                    </v-btn>
                                    <v-form 
                                    class="d-flex flex-column ga-8 w-100 mt-2">
                                        <div class="w-100">
                                            Name <br>
                                            <v-text-field
                                            hide-details="auto"
                                            variant="outlined"
                                            :model-value="item.name"
                                            class="w-100 mt-2"></v-text-field>
                                        </div>
    
                                        <div class="w-100">
                                            Quantity <br>
                                            <v-text-field
                                            hide-details="auto"
                                            type="number"
                                            variant="outlined"
                                            :model-value="item.quantity"
                                            class="w-100 mt-2"></v-text-field>
                                        </div>
                                        <div class="w-100 d-flex justify-end">
                                            <v-btn
                                            text="Create"
                                            class="bg-white w-100 w-sm-33"
                                            ></v-btn>
                                        </div>
                                    </v-form>
                                </v-card-text>
                            </v-card>
                        </template>
                        </v-dialog>
                        <v-dialog
                        width="400"
                        v-model="popupConfirmation">
                           <v-card class="pa-2 pb-6 pa-sm-6 pb-sm-8">
                                <v-card-item class=" d-flex justify-center">
                                    <v-card-title class="d-flex flex-column align-center font-weight-bold text-title-large">
                                        <v-icon
                                        icon="mdi-alert"
                                        color="warning"
                                        size="100"
                                        ></v-icon>
                                        <br>
                                        Are You Sure?
                                    </v-card-title>
                                    <v-card-subtitle class="text-grey-lighten-1">
                                        This action cannot be reverted
                                    </v-card-subtitle>
                                </v-card-item>
                                <v-card-text class="d-flex flex-row flex-wrap-reverse flex-sm-nowrap justify-center ga-2">
                                    <v-btn
                                    text="Cancel"
                                    color="white"
                                    class="w-100 w-sm-50"
                                    @click="popupConfirmation=false"
                                    ></v-btn>
                                    <v-btn
                                    text="Delete Category"
                                    color="red"
                                    class="w-100 w-sm-50"
                                    ></v-btn>
                                </v-card-text>
                            </v-card>
                        </v-dialog>
                    </div>
                </div>
                <div class="d-flex justify-center">
                    <div class="w-100 w-sm-33 mt-8">
                        <v-btn
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
    
</style>