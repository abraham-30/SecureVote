<script setup>

</script>

<template>
  <div class="py-14">
    <div class="d-flex flex-column ga-8 py-8">
      <v-btn variant="text" style="width: fit-content;" @click="$router.back()">
        ← Back
      </v-btn>
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
            <div class="d-flex flex-column">
              <v-avatar size="48">
                <v-img
                  alt="John"
                  src="https://cdn.vuetifyjs.com/images/john.png"
                ></v-img>
              </v-avatar>
              <v-card-text>
                <h1>
                  Organization Name
                </h1>
                <span>
                  Invitation from Jane Doe at December 25th, 2025
                </span>
              </v-card-text>
            </div>
          </template>
          <template v-slot:append>
            <v-card-actions>
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
          </template>
        </v-card>
        <v-pagination :length="5"></v-pagination>
      </div>
    </div>
  </div>
</template>

<style src="/src/assets/index.css" scoped>
    
</style>