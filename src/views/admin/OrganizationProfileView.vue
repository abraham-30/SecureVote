<script setup>
    import AdminSideNavbar from '@/components/AdminSideNavbar.vue';
</script>

<template>
    <admin-side-navbar></admin-side-navbar>
    <div class="py-14">
        <div class="d-flex flex-column ga-8">
            <div class="d-flex flex-column">
                <div style="height: 40px;">
                    <!-- hardcoded image -->
                    <img src="@/assets/Wikimedia-logo.png" alt="" class="h-100">
                </div>        
                <span class="text-headline-medium font-weight-bold">Organization Profile</span>
                <span class="text-grey-lighten-1">Lorem Ipsum Dolor Sit Amet.</span>
            </div>
            <div>
                <v-form class="d-flex flex-column ga-4">
                    <v-text-field variant="outlined"
                        v-model="orgName"
                        label="Name"
                    ></v-text-field>
                    <div class="d-flex flex-row ga-2 pb-5">
                        <div class="border-md border-opacity-25 rounded" style="min-width: 125px; height: 125px;">
                            <div class="w-100 h-100 pa-4">
                                <img src="@/assets/Wikimedia-logo.png" alt="" class="h-100">
                            </div>
                        </div>
                        <v-file-input label="Change Organization Icon" 
                        variant="outlined"
                        hint="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet condimentum leo. Curabitur ultricies odio et dui cursus efficitur. In vel magna quis ipsum euismod mattis in ut risus."
                        persistent-hint
                        ></v-file-input>
                    </div>
                    <v-text-field variant="outlined"
                        v-model="orgDescription"
                        label="Description"
                    >
                    </v-text-field>
                    <div class="d-flex justify-end w-100">
                        <div class="d-flex flex-row ga-2">
                            <v-btn
                                text="Save Changes"
                            >    
                            </v-btn>
                            <v-btn
                                color="error"
                                text="Discard Changes"
                                variant="tonal"
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