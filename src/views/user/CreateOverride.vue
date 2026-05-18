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
                        hide-details="auto"
                        :items="['Sawit 1', 'Sawit 2']"
                        variant="outlined"
                        class="w-100"
                        ></v-select>
                    </div>

                    <div class="w-100">
                        Date <br>
                        <v-text-field 
                        v-model="date"
                        type="date"
                        hide-details="auto"
                        variant="outlined"
                        class="w-100"
                        ></v-text-field>
                    </div>

                    <div class="d-flex flex-row ga-4 w-100">
                        <div class="w-50">
                            Clock In <br>
                            <v-text-field 
                            v-model="clockIn"
                            type="time"
                            hide-details="auto"
                            variant="outlined"></v-text-field>
                        </div>

                        <div class="w-50">
                            Clock Out <br>
                            <v-text-field 
                            v-model="clockOut"
                            type="time"
                            hide-details="auto"
                            variant="outlined"></v-text-field>
                        </div>
                    </div>

                    <div class="w-100">
                        Reason <br>
                        <v-textarea
                            v-model="reason"
                            placeholder="Reason"
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