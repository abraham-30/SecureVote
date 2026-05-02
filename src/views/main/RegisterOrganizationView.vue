<script setup>

</script>

<template>
    <div class="py-14 min-h-screen">
        <div class="d-flex flex-column ga-8 py-14">
            <v-btn variant="text" style="width: fit-content;" @click="$router.back()">
                ← Back
            </v-btn>
            <div class="d-flex flex-column">
                <span class="text-headline-medium font-weight-bold">Register Organization</span>
                <span class="text-grey-lighten-1">Lorem Ipsum Dolor Sit Amet.</span>
            </div>
            <v-form class="d-flex flex-column ga-8">
                <div class="d-flex flex-column ga-1">
                    <span class="text-title-medium font-weight-bold">Organization Details</span>
                    <v-divider class="border-opacity-50"></v-divider>    
                </div>
                <div class="d-flex flex-column">
                    <v-text-field label="Name" persistent-placeholder variant="outlined"></v-text-field>  
                    <v-textarea label="Description" persistent-placeholder variant="outlined"></v-textarea>
                </div>
                <div class="d-flex flex-column ga-1">
                    <span class="text-title-medium font-weight-bold">Working Days</span>
                    <v-divider class="border-opacity-50"></v-divider>      
                </div>
                <div>
                    <v-row gap="8">
                        <v-col>
                            <v-card class="bg-white">
                                <v-checkbox label="Lorem Ipsum" hide-details="true"></v-checkbox>
                            </v-card>
                        </v-col>
                        <v-col>
                            <v-card class="bg-white">
                                <v-checkbox label="Lorem Ipsum" hide-details="true"></v-checkbox>
                            </v-card>
                        </v-col>
                        <v-col>
                            <v-card class="bg-white">
                                <v-checkbox label="Lorem Ipsum" hide-details="true"></v-checkbox>
                            </v-card>
                        </v-col>
                        <v-col>
                            <v-card class="bg-white">
                                <v-checkbox label="Lorem Ipsum" hide-details="true"></v-checkbox>
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row gap="8">
                        <v-col>
                            <v-card class="bg-white">
                                <v-checkbox label="Lorem Ipsum" hide-details="true"></v-checkbox>
                            </v-card>
                        </v-col>
                        <v-col>
                            <v-card class="bg-white">
                                <v-checkbox label="Lorem Ipsum" hide-details="true"></v-checkbox>
                            </v-card>
                        </v-col>
                        <v-col>
                            <v-card class="bg-white">
                                <v-checkbox label="Lorem Ipsum" hide-details="true"></v-checkbox>
                            </v-card>
                        </v-col>
                    </v-row>
                </div>
                <div class="d-flex flex-column ga-1">
                    <span class="text-title-medium font-weight-bold">Working Hours</span>
                    <v-divider class="border-opacity-50"></v-divider>      
                </div>
                <div class="d-flex flex-row ga-4">
                    <v-text-field label="Clock In" placeholder="--:--" persistent-placeholder variant="outlined"></v-text-field>
                    <v-text-field label="Clock Out" placeholder="--:--" persistent-placeholder variant="outlined"></v-text-field>
                </div>
                <div class="d-flex flex-column ga-1">
                    <span class="text-title-medium font-weight-bold">Leave Categories</span>
                    <v-divider class="border-opacity-50"></v-divider>      
                </div>
                <v-btn 
                text="Add Categories +"
                class="bg-white">
                </v-btn>
                <v-btn
                text="Save and Register"
                type="submit"
                class="bg-white"></v-btn>
            </v-form>
        </div>
    </div>
</template>

<style scoped>
    
</style>