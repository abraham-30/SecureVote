<script setup>

</script>

<template>
    <div class="py-8 min-h-screen">
        <div class="d-flex flex-column ga-8">
            <div>
                <v-btn variant="text" style="width: fit-content;" @click="$router.back()">
                    ← Back
                </v-btn>
            </div>
            <div class="d-flex flex-row justify-space-between align-center">
                <div class="d-flex flex-column">
                    <v-icon 
                        size="60"
                        icon="mdi-account " 
                        class="text-blue-darken-2"
                    ></v-icon>
                    <span class="text-headline-medium font-weight-bold">John Doe</span>
                    <span class="text-grey-lighten-1">Lorem Ipsum.</span>
                    <span class="text-grey-lighten-1">Lorem Ipsum.</span>
                </div>
                <div class="d-flex flex-column">
                    <v-btn class="bg-white">
                        Remove Member -
                    </v-btn>
                </div>
            </div>
            <div>
                <span class="text-h6 font-weight-bold">This Month Attendance Report</span>
                <v-divider class="border-opacity-100"></v-divider>      
            </div>
            <div class="d-flex flex-column ga-4">
                <div>
                    <span class="text-h6 font-weight-bold">Request waiting for Approval</span>
                    <v-divider class="border-opacity-100"></v-divider>      
                </div>
                <div class="d-flex flex-column ga-4">
                    <v-card 
                    class="bg-blur border-sm pa-2 border-opacity-75 text-white"
                    link
                    >
                        <template v-slot:prepend>
                            <div class="d-flex flex-column">
                                <v-card-title class="text-title-large font-weight-bold">
                                Request Title
                                </v-card-title>
                                <span class="text-grey-lighten-1">
                                    Lorem Ipsum Dolor Sit Amet.
                                </span>
                            </div>
                        </template>
                        <template v-slot:append>
                            <v-card-actions>
                                <v-btn 
                                class="text-success" 
                                stacked
                                variant="text">
                                    <v-icon 
                                    size="x-large"
                                    icon="mdi-check" 
                                    ></v-icon>
                                    Approve
                                </v-btn>
                                <v-btn 
                                class="text-error" 
                                stacked
                                variant="text">
                                    <v-icon 
                                    size="x-large"
                                    icon="mdi-close" 
                                    ></v-icon>
                                    Reject
                                </v-btn>
                            </v-card-actions>
                        </template>
                    </v-card>
                    <v-pagination :length="5"></v-pagination>
                </div>
                </div>
            <div class="d-flex flex-column ga-4">
                <div>
                    <span class="text-h6 font-weight-bold">Request History</span>
                    <v-divider class="border-opacity-100"></v-divider>      
                </div>
                <div class="d-flex flex-row ga-2">
                    <div class="w-33">
                        <v-select
                        clearable
                        chips
                        label="Approval Type"
                        :items="['Sawit1', 'Sawit2', 'Sawit3']"
                        multiple
                        variant="outlined"
                        density="comfortable"
                        class="w-100"
                        ></v-select>
                    </div>
                    <v-btn class="bg-white">Search</v-btn>
                </div>
                <div class="d-flex flex-column ga-4">
                    <v-card 
                    class="bg-blur border-sm pa-2 border-opacity-75 text-white"
                    link
                    >
                    <template v-slot:prepend>
                        <div class="d-flex flex-column">
                            <v-card-title class="text-title-large font-weight-bold">
                            Request Title
                            </v-card-title>
                            <span class="text-grey-lighten-1">
                                Lorem Ipsum Dolor Sit Amet.
                            </span>
                        </div>
                    </template>
                    </v-card>
                    <v-pagination :length="5"></v-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<style src="@/assets/index.css" scoped>

</style>