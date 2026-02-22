<script setup>

</script>

<template>
    <div class="d-flex flex-column ga-8">
        <div class="d-flex flex-row justify-space-between">
            <div class="d-flex flex-column">
                <span class="text-h5 font-weight-bold">Invite User</span>
                <span class="text-grey-lighten-1">Lorem Ipsum Dolor Sit Amet.</span>
            </div>
            <div>
                <v-btn>
                    Share Link
                </v-btn>
            </div>
        </div>
        <div class="d-flex flex-column ga-2">
            <v-text-field
            label="Search User"
            prepend-icon="$vuetify"
            density="comfortable"
            variant="outlined"
            ></v-text-field>
            <v-btn>Invite</v-btn>
        </div>
    </div>
</template>

<style scoped>

</style>