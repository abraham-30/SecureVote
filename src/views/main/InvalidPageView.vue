<script setup>

</script>

<template>
<div>
    <div class="min-h-screen d-flex flex-column ga-8 justify-center align-center">
        <div class="d-flex flex-column ga-3 align-center">
            <v-icon 
              size="x-large"
              icon="mdi-emoticon-sad" 
              class="text-light-blue-accent-3"
            ></v-icon>
            <h3>
                404 - Not Found
            </h3>
            <div class="text-center">
                <h1>
                    PAGE NOT FOUND
                </h1>
                <span class="text-grey-lighten-1">
                    You search has ventured beyond the known universe
                </span>
            </div>
        </div>
        <v-btn to="/">
            Back to Home
        </v-btn>
    </div>
</div>
</template>

<style src="@/assets/index.css" scoped>

</style>