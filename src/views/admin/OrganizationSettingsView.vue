<script setup>
    import AdminSideNavbar from '@/components/AdminSideNavbar.vue';
</script>

<template>
    <admin-side-navbar></admin-side-navbar>
    <div class="py-14">
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
            <div>
                <div class="d-flex flex-column ga-1">
                    <span class="text-title-medium font-weight-bold">Working Days</span>
                    <v-divider class="border-opacity-50"></v-divider>      
                </div>
                <div>
                    <v-card 
                    variant="flat"
                    color="surface-variant">
                        <v-card-actions>
                            <v-checkbox label="Monday"></v-checkbox>
                        </v-card-actions>
                    </v-card>
                    <v-card 
                    variant="flat"
                    color="surface-variant">
                        <v-card-actions>
                            <v-checkbox label="Tuesday"></v-checkbox>
                        </v-card-actions>
                    </v-card>
                    <v-card 
                    variant="flat"
                    color="surface-variant">
                        <v-card-actions>
                            <v-checkbox label="Wednesday"></v-checkbox>
                        </v-card-actions>
                    </v-card>
                </div>
            </div>
            <div>
                <div class="d-flex flex-column ga-1">
                    <span class="text-title-medium font-weight-bold">Working Hours</span>
                    <v-divider class="border-opacity-50"></v-divider>      
                </div>
                <div>
    
                </div>
            </div>
            <div class="d-flex flex-column ga-4">
                <div class="d-flex flex-column ga-1">
                    <span class="text-title-medium font-weight-bold">Leave Categories</span>
                    <v-divider class="border-opacity-50"></v-divider>      
                </div>
                <div>
                    <v-btn
                        text="Add Category +"
                        class="bg-white"
                    ></v-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>