<script setup>

</script>

<template>
  <div class="d-flex flex-column ga-8">
    <v-btn icon="$vuetify" variant="text" @action="$router.back()"></v-btn>
    <div class="d-flex flex-column">
      <span class="text-h5 font-weight-bold">Invitation</span>
      <span class="text-grey-lighten-1">Lorem Ipsum Dolor Sit Amet</span>
    </div>
    <div class="d-flex flex-column ga-4">
      <v-card 
      class="bg-blur border-sm border-primary border-opacity-75 text-white"
      link
      >
        <template v-slot:prepend>
          <v-avatar size="48">
            <v-img
              alt="John"
              src="https://cdn.vuetifyjs.com/images/john.png"
            ></v-img>
          </v-avatar>
        </template>
        <v-card-title class="text-h5 font-weight-bold">
          Organization Name
        </v-card-title>
        <v-card-text class="text-grey-lighten-1">
          Invitation from Jane Doe at December 25th, 2025
        </v-card-text>
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
</template>

<style src="/src/assets/index.css" scoped>
    
</style>