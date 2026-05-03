<script setup>
    import { shallowRef } from 'vue';
    import AdminSideNavbar from '@/components/AdminSideNavbar.vue';

    const popupDelete = shallowRef(false);
    const popupAddCategory = shallowRef(false);
    const popupEditCategory = shallowRef(false);

    const daysItems = [
        {
            itemName:'Monday',
        },
        {
            itemName:'Tuesday',
        },
        {
            itemName:'Wednesday',
        },
        {
            itemName:'Thursday',
        },
        {
            itemName:'Friday',
        },
        {
            itemName:'Saturday',
        },
        {
            itemName:'Sunday'
        }
    ];
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
                <span class="text-grey-lighten-1">Lorem Ipsum Dolor Sit Amet.</span>
            </div>
            <div class="d-flex flex-column ga-4">
                <div class="d-flex flex-column ga-1">
                    <span class="text-title-medium font-weight-bold">Working Days</span>
                    <v-divider class="border-opacity-50"></v-divider>      
                </div>
                <div>
                    <v-card 
                    variant="flat"
                    color="white">
                        <v-card-actions>
                            <!-- iterate here -->
                            <v-data-iterator
                            :items="daysItems"
                            item-value="itemName">
                                <v-row>
                                    <v-col
                                    v-for="item in daysItems"
                                    :key="item.itemName">
                                        <v-checkbox 
                                        :label="item.itemName"
                                        hide-details="auto"
                                        ></v-checkbox>
                                    </v-col>
                                </v-row>
                            </v-data-iterator>
                        </v-card-actions>
                    </v-card>
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
                            <v-text-field
                            label="Start Hour"
                            placeholder="--:--"
                            hide-details="auto"
                            persistent-placeholder
                            variant="outlined"></v-text-field>
                            <v-text-field
                            label="End Hour"
                            placeholder="--:--"
                            hide-details="auto"
                            persistent-placeholder
                            variant="outlined"></v-text-field>
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
                                Lorem ipsum dolor sit amet
                                <v-divider class="border-opacity-50 mt-1"></v-divider>      
                            </v-card-subtitle>
                            <v-card-text class="d-flex flex-column align-start ga-8 mt-4">
                                <v-form class="d-flex flex-column ga-8 w-100 align-start">
                                    <v-text-field
                                    label="itemName"
                                    hide-details="auto"
                                    persistent-placeholder
                                    variant="outlined"
                                    class="w-100"></v-text-field>
                                    <v-text-field
                                    label="Quantity"
                                    hide-details="auto"
                                    persistent-placeholder
                                    type="number"
                                    variant="outlined"
                                    class="w-100"></v-text-field>
                                    <v-btn
                                    text="Save Changes"
                                    class="bg-white"></v-btn>
                                </v-form>
                            </v-card-text>
                        </v-card>
                    </v-dialog>
                    <v-dialog
                    v-model="popupEditCategory"
                    max-width="600">
                        <v-card class="pa-4">
                            <v-card-actions>
                                <v-btn
                                variant="text"
                                icon="mdi-close"
                                @click="popupEditCategory = false"></v-btn>
                            </v-card-actions>
                            <v-card-title class="font-weight-bold text-headline-medium">
                                Edit Category
                            </v-card-title>
                            <v-card-subtitle class="text-grey-lighten-1">
                                Lorem ipsum dolor sit amet
                                <v-divider class="border-opacity-50 mt-1"></v-divider>      
                            </v-card-subtitle>
                            <v-card-text class="d-flex flex-column align-start ga-8 mt-4">
                                <v-btn
                                color="red"
                                text="Delete Category"
                                @click = "popupReject = true"
                                ></v-btn>
                                <v-form class="d-flex flex-column ga-8 w-100 align-start">
                                    <v-text-field
                                    label="itemName"
                                    placeholder="Cuti Tahunan"
                                    hide-details="auto"
                                    persistent-placeholder
                                    variant="outlined"
                                    class="w-100"></v-text-field>
                                    <v-text-field
                                    label="Quantity"
                                    placeholder="999"
                                    hide-details="auto"
                                    persistent-placeholder
                                    type="number"
                                    variant="outlined"
                                    class="w-100"></v-text-field>
                                    <v-btn
                                    text="Save Changes"
                                    class="bg-white"></v-btn>
                                </v-form>
                            </v-card-text>
                        </v-card>
                    </v-dialog>
                    <div>
                        <!-- Iterate Here -->
                        <v-card 
                        title="Cuti Tahunan"
                        color="white"
                        link
                        @click = "popupEditCategory = true">
                            <v-card-text>
                                <v-chip
                                text="999"
                                color="blue-darken-2"
                                variant="flat"></v-chip>
                            </v-card-text>
                        </v-card>
                    </div>
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
                    class="d-flex flex-column align-center pa-8">
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
                                <v-text-field
                                label="Please enter your password to continue"
                                hide-details="auto"
                                persistent-placeholder
                                variant="outlined"
                                type="password"
                                class="w-100">
                                </v-text-field>
                                <div class="d-flex flex-row ga-2 w-100">
                                    <v-btn
                                    text="Cancel"
                                    class="bg-white"
                                    @click = "popupDelete = false"
                                    style="min-width: 150px;"
                                    block
                                    ></v-btn>
                                    <v-btn
                                    color="red"
                                    variant="flat"
                                    text="Delete"
                                    @click = ""
                                    style="min-width: 150px;"
                                    block
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