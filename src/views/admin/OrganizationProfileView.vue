<script setup>
import AdminSideNavbar from '@/components/AdminSideNavbar.vue';
import { ref } from 'vue';
import { useGroupStore } from '@/stores/GroupStore';
import { storeToRefs } from 'pinia';
const groupStore = useGroupStore();
const { group } = storeToRefs(groupStore);
const orgName = ref(group.value?.name);
const orgDescription = ref(group.value?.description);
</script>

<template>
    <admin-side-navbar></admin-side-navbar>
    <div class="py-14 min-h-screen">
        <div class="d-flex flex-column ga-8">
            <div class="d-flex flex-column">
                <span class="text-headline-medium font-weight-bold">Organization Profile</span>
            </div>
            <div>
                <v-form class="d-flex flex-column ga-8">
                    <div>
                        Name <br>

                        <v-text-field variant="outlined"
                            placeholder="Type Name"
                            v-model="orgName"
                            hide-details="auto"
                        ></v-text-field> <!-- Please change the placeholder to the current organization name -->
                    </div>

                    <div>
                        Description <br>
                        
                        <v-textarea variant="outlined"
                            placeholder="Type Description"
                            v-model="orgDescription"
                            hide-details="auto"
                        ></v-textarea> <!-- Please change the placeholder to the current organization description -->
                    </div>
                    <div class="d-flex justify-end w-100">
                        <div class="d-flex flex-row ga-2">
                            <v-btn
                                text="Save Changes"
                                class="bg-white"
                            >    
                            </v-btn>
                            <v-btn
                                color="red"
                                text="Discard Changes"
                            >
                            </v-btn>
                        </div>
                    </div>
                </v-form>
            </div>
        </div>
    </div>
</template>

<style scoped></style>