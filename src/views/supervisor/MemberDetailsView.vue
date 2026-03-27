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
                    <div class="text-grey-lighten-1">
                        <span>Subtitle 1</span>
                        <br>
                        <span>Subtitle 2</span>
                    </div>
                </div>
                <div class="d-flex flex-column">
                    <v-btn class="bg-white">
                        Remove Member -
                    </v-btn>
                </div>
            </div>
            <div class="d-flex flex-column ga-1">
                <span class="text-title-medium font-weight-bold">This Month Attendance Report</span>
                <v-divider class="border-opacity-50"></v-divider>      
            </div>
            <div class="d-flex flex-column ga-4">
                <div class="d-flex flex-column ga-1">
                    <span class="text-title-medium font-weight-bold">Request Waiting for Approval</span>
                    <v-divider class="border-opacity-50"></v-divider>      
                </div>
                <div class="d-flex flex-column ga-4">
                    <v-dialog max-width="750">
                        <template v-slot:activator="{props:activatorProps}">
                            <v-card 
                            link
                            class="bg-blur border-sm border-opacity-75 pa-2 text-white"
                            v-bind="activatorProps"
                            >
                            <template v-slot:prepend>
                                <div class="d-flex flex-column ga-1">
                                <span class="text-title-large font-weight-bold">Request Title</span>
                                <span class="text-body-small text-grey-lighten-1">Request created at December 25th, 2025</span>
                                </div>
                            </template>
                            </v-card>
                        </template>
                        <template v-slot:default="{isActive}">
                            <v-card class="pa-4">
                                <v-card-actions>
                                    <v-btn
                                    icon="mdi-close"
                                    @click="isActive.value = false">
                                    </v-btn>
                                </v-card-actions>
                                <v-card-title
                                class="d-flex flex-column align-center ga-2">
                                    <v-icon 
                                    size="32"
                                    icon="mdi-note-alert-outline"
                                    ></v-icon>
                                    <span class="font-weight-bold">Request Title</span>
                                    <span class="text-body-small font-weight-regular text-grey-lighten-1">Requested by John Doe at 25 December 2025</span>
                                </v-card-title>
                                <v-card-text
                                class="d-flex flex-column ga-8">
                                    <div class="d-flex flex-column ga-2">
                                        <span class="text-title-medium font-weight-bold">Registered Time</span>
                                        <div class="d-flex flex-row justify-space-evenly pa-4 border-sm border-opacity-50 rounded-lg font-weight-bold">
                                            <span>
                                                -- : --
                                            </span>
                                            <span>
                                                -- : --
                                            </span>
                                        </div>
                                    </div>
                                    <div class="d-flex flex-column ga-2">
                                        <span class="text-title-medium font-weight-bold">
                                            Description
                                        </span>
                                        <div class="pa-4 border-sm border-opacity-50 rounded-lg">
                                            <span class="py-2 text-body-medium">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras viverra efficitur magna eu dignissim. Morbi efficitur metus efficitur libero dapibus pulvinar. Phasellus at urna tortor. Sed vel fringilla dui, eu condimentum nunc. Proin ultrices interdum neque, sit amet pellentesque odio ultricies id. Sed nec justo eget felis lacinia commodo. Curabitur sit amet ante vestibulum, consectetur nisl nec, porta leo. Mauris gravida lobortis tincidunt. Maecenas at eros neque. Morbi rhoncus justo id purus fermentum efficitur. Ut congue eros lacus, non interdum arcu vehicula nec. Sed faucibus diam vitae dui lacinia imperdiet. 
                                            </span>
                                        </div>
                                    </div>
                                </v-card-text>
                                <v-card-actions class="d-flex flex-row justify-center">
                                    <v-btn class="text-success" stacked variant="text">
                                        <v-icon 
                                        size="x-large"
                                        icon="mdi-check" 
                                        ></v-icon>
                                        Approve
                                    </v-btn>
                                    <v-btn class="text-error" stacked variant="text">
                                        <v-icon 
                                        size="x-large"
                                        icon="mdi-close" 
                                        ></v-icon>
                                        Reject
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </template>
                    </v-dialog>
                    <v-pagination :length="5"></v-pagination>
                </div>
                </div>
            <div class="d-flex flex-column ga-4">
                <div class="d-flex flex-column ga-1">
                    <span class="text-title-medium font-weight-bold">Request History</span>
                    <v-divider class="border-opacity-50"></v-divider>      
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
                    <v-dialog max-width="750">
                        <template v-slot:activator="{props:activatorProps}">
                            <v-card 
                            link
                            class="bg-blur border-sm border-opacity-75 pa-2 text-white"
                            v-bind="activatorProps"
                            >
                            <template v-slot:prepend>
                                <div class="d-flex flex-column ga-1 align-start">
                                    <v-chip
                                    class="mb-1"
                                    color="green"
                                    >
                                    Approved
                                    </v-chip>
                                    <span class="text-title-large font-weight-bold">Request Title</span>
                                    <span class="text-body-small text-grey-lighten-1">Request created at December 25th, 2025</span>
                                </div>
                            </template>
                            </v-card>
                        </template>
                        <template v-slot:default="{isActive}">
                            <v-card class="pa-4">
                                <v-card-actions>
                                    <v-btn
                                    icon="mdi-close"
                                    @click="isActive.value = false">
                                    </v-btn>
                                </v-card-actions>
                                <v-card-title
                                class="d-flex flex-column align-center ga-2">
                                    <v-icon 
                                    size="32"
                                    icon="mdi-note-alert-outline"
                                    ></v-icon>
                                    <span class="font-weight-bold">Request Title</span>
                                    <span class="text-body-small font-weight-regular text-grey-lighten-1">Requested by John Doe at 25 December 2025</span>
                                    <v-chip
                                    color="green"
                                    >
                                    Approved
                                    </v-chip>
                                </v-card-title>
                                <v-card-text
                                class="d-flex flex-column ga-8">
                                    <div class="d-flex flex-column ga-2">
                                        <span class="text-title-medium font-weight-bold">Registered Time</span>
                                        <div class="d-flex flex-row justify-space-evenly pa-4 border-sm border-opacity-50 rounded-lg font-weight-bold">
                                            <span>
                                                -- : --
                                            </span>
                                            <span>
                                                -- : --
                                            </span>
                                        </div>
                                    </div>
                                    <div class="d-flex flex-column ga-2">
                                        <span class="text-title-medium font-weight-bold">
                                            Description
                                        </span>
                                        <div class="pa-4 border-sm border-opacity-50 rounded-lg">
                                            <span class="py-2 text-body-medium">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras viverra efficitur magna eu dignissim. Morbi efficitur metus efficitur libero dapibus pulvinar. Phasellus at urna tortor. Sed vel fringilla dui, eu condimentum nunc. Proin ultrices interdum neque, sit amet pellentesque odio ultricies id. Sed nec justo eget felis lacinia commodo. Curabitur sit amet ante vestibulum, consectetur nisl nec, porta leo. Mauris gravida lobortis tincidunt. Maecenas at eros neque. Morbi rhoncus justo id purus fermentum efficitur. Ut congue eros lacus, non interdum arcu vehicula nec. Sed faucibus diam vitae dui lacinia imperdiet. 
                                            </span>
                                        </div>
                                    </div>
                                </v-card-text>
                            </v-card>
                        </template>
                    </v-dialog>
                    <v-pagination :length="5"></v-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<style src="@/assets/index.css" scoped>

</style>