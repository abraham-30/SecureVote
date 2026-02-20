<script setup>
    
</script>

<template>
    <div class="d-flex flex-column ga-8">
        <div class="d-flex flex-column">
            <div style="height: 40px;">
                <!-- still hardcoded image -->
                <img src="../assets/Wikimedia-logo.png" alt="" class="h-100">
            </div>
            <span class="text-h5 font-weight-bold">Organization Name</span>
            <span class="text-grey-lighten-1">John Doe</span>
        </div>
        <div class="d-flex flex-column">
            <div class="d-flex flex-row w-100 ga-4">
                <v-card class="w-100 bg-blur text-white border-md border-primary border-opacity-75 pa-4">
                    <div class="d-flex flex-column ga-4 align-center">
                        <v-card-title class="text-subtitle-1">Registered Clock In</v-card-title>
                        <v-card-text class="text-h4 font-weight-bold">-- : --</v-card-text>
                        <v-card-actions class="w-100">
                            <v-btn block variant="elevated">Clock In →</v-btn>
                        </v-card-actions>
                    </div>
                </v-card>
                <v-card class="w-100 bg-blur text-white border-md border-primary border-opacity-75 pa-4">
                    <div class="d-flex flex-column ga-4 align-center">
                        <v-card-title class="text-subtitle-1">Registered Clock Out</v-card-title>
                        <v-card-text class="text-h4 font-weight-bold">-- : --</v-card-text>
                        <v-card-actions class="w-100">
                            <v-btn block variant="elevated">Clock Out →</v-btn>
                        </v-card-actions>
                    </div>
                </v-card>
            </div>
        </div>
        <div>
            <span class="text-h6 font-weight-bold">This Month Attendance Report</span>
            <v-divider class="border-opacity-100"></v-divider>      
        </div>
        <div class="d-flex flex-column ga-4">
            <div>
                <span class="text-h6 font-weight-bold">Manage Your Administration</span>
                <v-divider class="border-opacity-100"></v-divider>      
            </div>
            <div>
                <v-btn prepend-icon="$vuetify" stacked class="bg-blur text-white">
                    Override
                </v-btn>
            </div>
        </div>
    </div>
</template>

<style src="/src/assets/index.css" scoped>

</style>