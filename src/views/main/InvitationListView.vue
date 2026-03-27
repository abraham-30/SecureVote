<script setup>

</script>

<template>
  <div class="min-h-screen py-14">
    <div class="d-flex flex-column ga-8 py-14">
      <v-btn variant="text" style="width: fit-content;" @click="$router.back()">
        ← Back
      </v-btn>
      <div class="d-flex flex-column">
        <span class="text-headline-medium font-weight-bold">Invitations</span>
        <span class="text-grey-lighten-1">Lorem Ipsum Dolor Sit Amet</span>
      </div>
      <div class="d-flex flex-column ga-4">
        <v-card 
        class="bg-blur border-sm border-opacity-75 pa-2 text-white"
        >
          <template v-slot:prepend>
            <div class="d-flex flex-column ga-1">
              <v-avatar size="40">
                <v-img
                  alt="John"
                  src="https://cdn.vuetifyjs.com/images/john.png"
                ></v-img>
              </v-avatar>
              <span class="text-title-large font-weight-bold">Organization Name</span>
              <span class="text-body-small text-grey-lighten-1">Invitation from Jane Doe at December 25th, 2025</span>
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