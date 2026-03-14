<script setup>

</script>

<template>
    <div class="d-flex flex-column ga-8">
        <div class="d-flex flex-column">
            <span class="text-h5 font-weight-bold">My Team</span>
            <span class="text-grey-lighten-1">Lorem Ipsum Dolor Sit Amet.</span>
        </div>
        <div class="d-flex flex-column ga-4">
            <v-card 
            class="bg-blur border-sm border-primary border-opacity-75 text-white"
            link
            >
                <div class="d-flex flex-column">
                    <v-card-title class="text-h5 font-weight-bold">
                    Name
                    </v-card-title>
                    <v-card-text class="text-grey-lighten-1 text-caption">
                        <p>
                            Lorem Ipsum.
                        </p>
                        <p>
                            Lorem Ipsum.
                        </p>
                    </v-card-text>
                </div>
            </v-card>
            <v-pagination :length="5"></v-pagination>
        </div>
    </div>
</template>

<style src="@/assets/index.css" scoped>

</style>