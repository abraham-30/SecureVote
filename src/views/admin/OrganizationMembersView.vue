<script setup>
    import AdminSideNavbar from '@/components/AdminSideNavbar.vue';
    import { shallowRef } from 'vue'

    const popupMember = shallowRef(false)
    const popupReject = shallowRef(false)
</script>

<template>
    <admin-side-navbar></admin-side-navbar>
    <div class="py-14 min-h-screen">
        <div class="d-flex flex-column ga-8">
            <div class="d-flex flex-row align-center justify-space-between">
                <div class="d-flex flex-column">
                    <v-icon 
                        size="60"
                        icon="mdi-account-group " 
                        class="text-blue-darken-2"
                    ></v-icon>
                    <span class="text-headline-medium font-weight-bold">Organization Members</span>
                    <span class="text-grey-lighten-1">Lorem Ipsum Dolor Sit Amet.</span>
                </div>
                <v-btn
                text="Invite User +"
                to="/InviteUser"
                class="bg-white">
                </v-btn>
            </div>
            <div>
                <span>
                    Total Members : 9999 <!-- Still hardcoded -->
                </span>
            </div>
            <div class="d-flex flex-column ga-8">
                <v-text-field
                label="Search"
                placeholder="Search by username or email"
                variant="outlined"
                prepend-icon="mdi-magnify"
                hide-details="auto"
                persistent-placeholder></v-text-field>
                <div class="d-flex flex-column ga-2">
                    <!-- Please do data iteration here -->
                    <v-card 
                    title="John Doe"
                    @click = "popupMember = true"
                    link
                    class="bg-blur border-sm border-opacity-75"
                    >
                        <v-card-text class="text-grey-lighten-1">
                            johndoe@example.com
                            <br>
                            <div class="mt-2">
                                <v-chip 
                                color="blue-darken-2"
                                variant="flat"
                                >
                                Member
                                </v-chip>
                            </div>
                        </v-card-text>
                    </v-card>
                    <v-dialog 
                    v-model="popupMember"
                    max-width="600">
                        <v-card class="pa-4">
                            <v-card-actions>
                                <v-btn
                                variant="text"
                                icon="mdi-close"
                                @click="popupMember = false"></v-btn>
                            </v-card-actions>
                            <v-card-title class="font-weight-bold text-headline-medium">
                                John Doe
                            </v-card-title>
                            <v-card-subtitle>
                                johndoe@example.com
                                <v-divider class="border-opacity-50 mt-1"></v-divider>      
                            </v-card-subtitle>
                            <v-card-text class="d-flex flex-column align-start ga-8 mt-4">
                                <v-btn
                                color="red"
                                text="Remove Member"
                                @click = "popupReject = true"
                                ></v-btn>
                                <v-form class="d-flex flex-column ga-8 w-100 align-start">
                                    <v-select
                                    label="User Role"
                                    variant="outlined"
                                    persistent-placeholder
                                    hide-details="auto"
                                    class="w-100"
                                    :items="['Member', 'Supervisor']"
                                    ></v-select>
                                    <v-btn
                                    text="Save Changes"
                                    class="bg-white"></v-btn>
                                </v-form>
                            </v-card-text>
                        </v-card>
                    </v-dialog>
                    <v-dialog
                    v-model="popupReject"
                    max-width="450">
                        <v-card class="pa-8 d-flex flex-column align-center">
                            <v-card-title class="d-flex flex-column ga-2 align-center font-weight-bold">
                                <v-icon
                                size="72"
                                color="warning"
                                icon="mdi-alert"></v-icon>
                                Are You Sure?
                            </v-card-title>
                            <v-card-text class="text-center text-grey-lighten-1">This action cannot be reverted</v-card-text>
                            <v-card-actions>
                                <v-btn
                                text="Cancel"
                                class="bg-white"
                                @click = "popupReject = false"
                                ></v-btn>
                                <v-btn
                                color="red"
                                variant="flat"
                                text="Remove Member"
                                @click = "" 
                                ></v-btn>  <!-- Please add remove member action -->
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </div> 
                <v-pagination :length="4"></v-pagination> <!-- Still hardcoded -->
            </div>
        </div>
    </div>
</template>

<style scoped></style>