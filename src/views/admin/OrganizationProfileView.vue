<script setup>
    import AdminSideNavbar from '@/components/AdminSideNavbar.vue';
</script>

<template>
    <admin-side-navbar></admin-side-navbar>
    <div class="py-14 min-h-screen">
        <div class="d-flex flex-column ga-8">
            <div class="d-flex flex-column">
                <span class="text-headline-medium font-weight-bold">Organization Profile</span>
                <span class="text-grey-lighten-1">Lorem Ipsum Dolor Sit Amet.</span>
            </div>
            <div>
                <v-form class="d-flex flex-column ga-8">
                    <v-text-field variant="outlined"
                        label="Name"
                        placeholder="Example Organization" 
                        v-model="orgName"
                        hide-details="auto"
                        persistent-placeholder
                    ></v-text-field> <!-- Please change the placeholder to the current organization name -->
                    <v-textarea variant="outlined"
                        label="Description"
                        placeholder="Lorem ipsum dolor sit amet"
                        v-model="orgDescription"
                        hide-details="auto"
                        persistent-placeholder
                    ></v-textarea> <!-- Please change the placeholder to the current organization description -->
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