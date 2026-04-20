<script setup>
</script>

<template>
  <div class="min-h-screen py-14">
      <div class="d-flex flex-column ga-8 py-14">
        <div>
          <div class="d-flex flex-column">
            <span class="font-weight-bold">07:00 PM GMT+7                       
              <v-icon 
              size="small"
              icon="mdi-weather-night" 
              class="ml-1"
              ></v-icon>
            </span> 
            <span class="text-grey-lighten-1">Jakarta, Indonesia</span>
            <span class="mt-2 text-headline-large font-weight-bold">Welcome, John Doe!</span>
          </div>
        </div>
        <div class="d-flex flex-column ga-4">
          <div class="d-flex flex-column ga-1">
            <span class="text-title-medium font-weight-bold">My Organizations</span>
            <v-divider class="border-opacity-50"></v-divider>      
          </div>
          <div>
            <v-btn 
            text="Invitations →"
            to="/invitations"
            class="bg-white">
            </v-btn>
          </div>
          <div class="d-flex flex-column ga-4">
            <v-card 
            class="bg-blur border-sm border-opacity-75 pa-2 text-white"
            link
            to="/clock"
            >
              <template v-slot:prepend>
                <div class="d-flex flex-column ga-1">
                  <v-avatar size="40">
                    <v-img
                      alt="John"
                      src="https://cdn.vuetifyjs.com/images/john.png"
                    ></v-img>
                  </v-avatar>
                  <span class="text-title-large font-weight-bold">
                    Organization Name
                  </span>
                  <span class="text-grey-lighten-1 text-body-small">
                    Lorem ipsum dolor sit amet.
                  </span>
                </div>
              </template>
            </v-card>
            <v-pagination :length="5"></v-pagination>
          </div>
        </div>
        <div class="d-flex flex-column ga-4">
          <div class="d-flex flex-column ga-1">
            <span class="text-title-medium font-weight-bold">Managed Organizations</span>
            <v-divider class="border-opacity-50"></v-divider>      
          </div>
          <div>
            <v-btn 
            text="Register Organization +"
            to="/RegisterOrganization"
            class="bg-white">
            </v-btn>
          </div>
          <div class="d-flex flex-column ga-4">
            <v-card 
            class="bg-blur border-sm border-opacity-75 pa-2 text-white"
            link
            to="/clock"
            >
              <template v-slot:prepend>
                <div class="d-flex flex-column ga-1">
                  <v-avatar size="40">
                    <v-img
                      alt="John"
                      src="https://cdn.vuetifyjs.com/images/john.png"
                    ></v-img>
                  </v-avatar>
                  <span class="text-title-large font-weight-bold">
                    Organization Name
                  </span>
                  <span class="text-grey-lighten-1 text-body-small">
                    Lorem ipsum dolor sit amet.
                  </span>
                </div>
              </template>
            </v-card>
            <v-pagination :length="5"></v-pagination>
          </div>
        </div>
      </div>
  </div>
</template>

<style lang="scss" scoped>

</style>