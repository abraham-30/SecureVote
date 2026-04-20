<script setup>

</script>

<template>
    <div class="d-flex flex-column ga-8">
        <div class="d-flex flex-row justify-space-between">
            <div class="d-flex flex-column">
                <span class="text-h5 font-weight-bold">Manage Member</span>
                <span class="text-grey-lighten-1">Lorem Ipsum Dolor Sit Amet.</span>
            </div>
            <div>
                <v-btn>
                    Add New Member +
                </v-btn>
            </div>
        </div>
        <div class="d-flex flex-column ga-1">
            <div class="d-flex flex-row ga-2 align-center">
                <div style="height: 32px;">
                    <!-- still hardcoded image -->
                    <img src="../assets/Wikimedia-logo.png" alt="" class="h-100">
                </div>
                <span class="text-h6 font-weight-bold">Organization Name</span>
            </div>
            <span class="text-grey-lighten-1">Total Users: 9999</span>
        </div>
        <div class="d-flex flex-column ga-4">
            <v-card 
            class="bg-blur border-sm border-primary border-opacity-75 text-white"
            link
            >
            <template v-slot:prepend>
                <div class="d-flex flex-column">
                    <v-card-title class="text-h5 font-weight-bold">
                    Name
                    </v-card-title>
                    <div class="text-grey-lighten-1 text-caption">
                        <p>
                            Lorem Ipsum.
                        </p>
                        <p>
                            Lorem Ipsum.
                        </p>
                    </div>
                </div>
            </template>
            <template v-slot:append>
                <v-card-actions>
                    <v-btn class="text-error" variant="text" prepend-icon="$vuetify" stacked>Remove</v-btn>
                </v-card-actions>
            </template>
            </v-card>
            <v-pagination :length="5"></v-pagination>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>