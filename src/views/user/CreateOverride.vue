<script setup></script>

<template>
    <div class="py-14">
        <div class="d-flex flex-column ga-8">
            <v-btn variant="text" style="width: fit-content;" @click="$router.back()">
                ← Back
            </v-btn>
            <div class="d-flex flex-column">
                <span class="text-title-large font-weight-bold">Create Request</span>
                <span class="text-grey-lighten-1">Lorem Ipsum Dolor Sit Amet.</span>
            </div>
            <div>
                <v-form class="d-flex flex-column ga-4">
                    <v-text-field variant="outlined"
                        v-model="date"
                        label="Date"
                    ></v-text-field>
                    <div class="d-flex flex-row ga-4">
                        <v-text-field 
                        v-model="clockIn"
                        label="Clock In"
                        variant="outlined"></v-text-field>
                        <v-text-field 
                        v-model="clockOut"
                        label="Clock Out"
                        variant="outlined"></v-text-field>
                    </div>
                    <v-textarea
                        v-model="note"
                        label="Note"
                        variant="outlined"
                    ></v-textarea>
                    <v-btn type="submit" block>Submit Request</v-btn>
                </v-form>
            </div>
        </div>
    </div>
</template>

<style scoped></style>