<script setup>

</script>

<template>
    <div class="d-flex flex-column ga-8">
        <div class="d-flex flex-column">
            <span class="text-h5 font-weight-bold">My Team</span>
            <span class="text-grey-lighten-1">Lorem Ipsum.</span>
            <span class="text-grey-lighten-1">Lorem Ipsum.</span>
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
                class="bg-blur border-sm border-primary border-opacity-75 text-white"
                link
                >
                    <template v-slot:prepend>
                        <div class="d-flex flex-column">
                            <v-card-title class="text-h5 font-weight-bold">
                            Request Title
                            </v-card-title>
                            <span class="text-grey-lighten-1 text-caption">
                                Lorem Ipsum Dolor Sit Amet.
                            </span>
                        </div>
                    </template>
                    <template v-slot:append>
                        <v-card-actions>
                            <v-btn class="text-success" variant="text">
                            Approve
                            </v-btn>
                            <v-btn class="text-error" variant="text">Reject</v-btn>
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
                <v-btn>Search</v-btn>
            </div>
            <div class="d-flex flex-column ga-4">
                <v-card 
                class="bg-blur border-sm border-primary border-opacity-75 text-white"
                link
                >
                    <template v-slot:prepend>
                        <div class="d-flex flex-column">
                            <v-card-title class="text-h5 font-weight-bold">
                            Request Title
                            </v-card-title>
                            <span class="text-grey-lighten-1 text-caption">
                                Lorem Ipsum Dolor Sit Amet.
                            </span>
                        </div>
                    </template>
                    <!-- <template v-slot:append>
                        <v-card-actions>
                            <v-btn class="text-success" variant="text" hidden>
                            Approve
                            </v-btn>
                            <v-btn class="text-error" variant="text">Reject</v-btn>
                        </v-card-actions>
                    </template> -->
                </v-card>
                <v-pagination :length="5"></v-pagination>
            </div>
        </div>
    </div>
</template>

<style src="@/assets/index.css" scoped>

</style>