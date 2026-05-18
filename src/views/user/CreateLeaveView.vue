<script setup></script>

<template>
    <div class="py-14 min-h-screen">
        <div class="d-flex flex-column ga-8">
            <v-btn variant="text" style="width: fit-content;" @click="$router.back()">
                ← Back
            </v-btn>
            <div class="d-flex flex-column">
                <span class="text-headline-medium font-weight-bold">Create Request</span>
            </div>
            <div>
                <v-form class="d-flex flex-column ga-8 align-center">
                    <div class="w-100">
                        Supervisor <br>
                        <v-select
                        placeholder="Choose Supervisor"
                        persistent-placeholder
                        hide-details="auto"
                        :items="['Sawit 1', 'Sawit 2']"
                        variant="outlined"
                        class="w-100"
                        ></v-select>
                    </div>

                    <div class="w-100">
                        Leave Type <br>
                        <v-select
                        placeholder="Choose Leave Type"
                        persistent-placeholder
                        hide-details="auto"
                        :items="['Sawit 1', 'Sawit 2']"
                        variant="outlined"
                        class="w-100"
                        ></v-select>
                    </div>
                    <div class="d-flex flex-row ga-4 w-100">
                        <div class="w-50">
                            Start Date <br>
                            <v-text-field 
                            v-model="startDate"
                            type="date"
                            hide-details="auto"
                            variant="outlined"></v-text-field>
                        </div>
                        <div class="w-50">
                            End Date <br>
                            <v-text-field 
                            v-model="endDate"
                            type="date"
                            hide-details="auto"
                            variant="outlined"></v-text-field>
                        </div>
                    </div>

                    <div class="w-100">
                        Reason <br>
                        <v-textarea
                            v-model="reason"
                            placeholder="Type Reason"
                            persistent-placeholder
                            hide-details="auto"
                            variant="outlined"
                            class="w-100"
                        ></v-textarea>
                    </div>
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