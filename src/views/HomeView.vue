<script setup>
  import { ref } from 'vue';
  const Time = ref('07:00 PM GMT+7')
  const Location = ref('Jakarta, Indonesia')
  const UserName = ref('John Doe')
</script>

<template>
  <div>
      <div class="d-flex flex-column ga-8">
        <div>
          <div class="d-flex flex-column">
            <span>{{ Time }} </span>
            <span class="text-grey-lighten-1">{{ Location }}</span>
          </div>
          <div>
            <span class="text-h4 font-weight-bold">Welcome, {{ UserName }}!</span>
          </div>
        </div>
        <div class="d-flex flex-column ga-4">
          <div>
            <span class="text-h6 font-weight-bold">My Organizations</span>
            <v-divider class="border-opacity-100"></v-divider>      
          </div>
          <div>
            <v-btn>
              Invitation →
            </v-btn>
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
                Lorem ipsum dolor sit amet.
              </v-card-text>
            </v-card>
            <v-pagination :length="5"></v-pagination>
          </div>
        </div>
        <div class="d-flex flex-column ga-4">
          <div>
            <span class="text-h6 font-weight-bold">Managed Organizations</span>
            <v-divider class="border-opacity-100"></v-divider>      
          </div>
          <div>
            <v-btn>
              Register Organization +
            </v-btn>
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
                  Lorem ipsum dolor sit amet.
                </v-card-text>
              </v-card>
              <v-pagination :length="5"></v-pagination>
          </div>
        </div>
      </div>
  </div>
</template>

<style src="/src/assets/index.css" scoped>

</style>