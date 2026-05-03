<script setup></script>

<template>
    <div class="py-14 min-h-screen">
        <div class="d-flex flex-column ga-8">
            <v-btn variant="text" style="width: fit-content;" @click="$router.back()">
                ← Back
            </v-btn>
            <div class="d-flex flex-column">
                <span class="text-headline-medium font-weight-bold">Create Request</span>
                <span class="text-grey-lighten-1">Lorem Ipsum Dolor Sit Amet.</span>
            </div>
            <div>
                <v-form class="d-flex flex-column ga-8 align-center">
                    <v-select
                    label="Supervisor"
                    persistent-placeholder
                    hide-details="auto"
                    :items="['Sawit 1', 'Sawit 2']"
                    variant="outlined"
                    class="w-100"
                    ></v-select>
                    <v-select
                    label="Leave Type"
                    persistent-placeholder
                    hide-details="auto"
                    :items="['Sawit 1', 'Sawit 2']"
                    variant="outlined"
                    class="w-100"
                    ></v-select>
                    <div class="d-flex flex-row ga-4 w-100">
                        <v-text-field 
                        v-model="startDate"
                        label="Start Date"
                        type="date"
                        persistent-placeholder
                        hide-details="auto"
                        variant="outlined"></v-text-field>
                        <v-text-field 
                        v-model="endDate"
                        label="End Date"
                        type="date"
                        persistent-placeholder
                        hide-details="auto"
                        variant="outlined"></v-text-field>
                    </div>
                    <v-textarea
                        v-model="reason"
                        label="Reason"
                        persistent-placeholder
                        hide-details="auto"
                        variant="outlined"
                        class="w-100"
                    ></v-textarea>
                    <v-btn 
                    type="submit" 
                    class="bg-white"
                    >Submit Request</v-btn>
                </v-form>
            </div>
        </div>
    </div>
</template>

<style scoped></style>