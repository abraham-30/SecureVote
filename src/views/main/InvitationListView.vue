<script setup>
import { useUserStore } from '@/stores/UserStore.js'
import { useInvitationStore } from '@/stores/InvitationStore.js'
import { storeToRefs } from 'pinia'
import { invitationListInvitee } from '@/services/InvitationServices.js'
import { ref, onMounted, watch } from 'vue'
import { formatDate } from '@/utils/date'

const userStore = useUserStore()
const { id } = storeToRefs(userStore)
const invitationStore = useInvitationStore()
const invitation = ref()

const size = 5
const page = ref(1)
const isLoading = ref(true)

onMounted(async () => {
  try {
    await invitationListInvitee(id.value, size, page.value)
    .then((response) => {
      invitation.value = response.data
      isLoading.value = false
    })
  } catch (error) {
    console.error(error)
  }
})

watch(page, async() => {
  isLoading.value = true

  try {
    await invitationListInvitee(id.value, size, page.value)
    .then((response) => {
      invitation.value = response.data
      isLoading.value = false
    })
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <div class="min-h-screen py-14">
    <div class="d-flex flex-column ga-8 py-14">
      <v-btn variant="text" style="width: fit-content;" @click="$router.back()">
        ← Back
      </v-btn>
      <div class="d-flex flex-column">
        <span class="text-headline-medium font-weight-bold">Invitations</span>
      </div>
      <div class="d-flex flex-column ga-4">
        <template v-if="isLoading">
          <v-skeleton-loader type="article" v-for="i in size"></v-skeleton-loader>
        </template>

        <template v-else>
          <v-dialog
            max-width="750"
            v-for="item in invitation.results"
          >
              <template v-slot:activator="{props:activatorProps}">
                <v-card 
                  class="bg-blur border-sm border-opacity-75 pa-2 text-white"
                  v-bind="activatorProps"
                  >
                    <v-card-text>
                      <div class="d-flex flex-column ga-1">
                        <span class="text-title-large font-weight-bold">{{ item?.group?.name }}</span>
                        <span class="text-body-small text-grey-lighten-1">Invitation from {{ item?.inviter?.name }} at {{ formatDate(item?.created_at, 'MMMM DD, YYYY') }}</span>
                      </div>
                    </v-card-text>
                </v-card>
              </template>

              <template v-slot:default="{isActive}">
                <v-card class="pa-4">
                  <v-card-actions>
                      <v-btn
                      variant="text"
                      icon="mdi-close"
                      @click="isActive.value = false"></v-btn>
                  </v-card-actions>
                  <v-card-title class="font-weight-bold text-headline-medium">
                      {{ item?.group?.name }}<span v-if="item?.status != 'requested'"> - </span>
                      <v-divider class="border-opacity-50 mt-1"></v-divider>      
                  </v-card-title>
                  <v-card-text class="d-flex flex-column align-start ga-8">
                      <div class="d-flex flex-column">
                          <span class="text-title-large font-weight-bold">Invitation From</span>
                          <span class="text-grey-lighten-1">{{ item?.inviter?.name }} <br>({{ item?.inviter?.email }})</span>
                          <!-- please change to name (email) -->
                      </div>
                      <div class="d-flex flex-column">
                          <span class="text-title-large font-weight-bold">Date</span>
                          <span class="text-grey-lighten-1">{{ formatDate(item?.created_at, "DD MMMM YYYY") }}</span>
                      </div>
                      <div class="d-flex flex-column">
                          <span class="text-title-large font-weight-bold">Organization Description</span>
                          <span class="text-grey-lighten-1 text-justify">{{ item?.group?.description }}</span>
                      </div>
                  </v-card-text>

                  <v-card-actions class="d-flex flex-row justify-end">
                    <v-btn size="large" class="w-25" variant="flat" text="Approve" color="success">
                    </v-btn>
                    <v-btn size="large" class="w-25" variant="flat" text="Reject" color="error">
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </template>
          </v-dialog>

          
        </template>

        <v-pagination v-model=page :disabled="isLoading" :length="invitation?.total_pages"></v-pagination>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
    
</style>