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
const { invitation } = storeToRefs(invitationStore)

const size = 5
const page = ref(1)
const isLoading = ref(true)

onMounted(async () => {
  await invitationListInvitee(id.value, size, page.value)
  isLoading.value = false
})

watch(page, async() => {
  await invitationListInvitee(id.value, size, page.value)
  isLoading.value = false
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
        <span class="text-grey-lighten-1">Lorem Ipsum Dolor Sit Amet</span>
      </div>
      <div class="d-flex flex-column ga-4">
        <template v-if="isLoading">
          <v-skeleton-loader :loading="isLoading" type="article" v-for="i in size"></v-skeleton-loader>
        </template>

        <template v-else>
          <v-card 
          class="bg-blur border-sm border-opacity-75 pa-2 text-white"
          v-for="item in invitation.results"
          >
            <template v-slot:prepend>
              <div class="d-flex flex-column ga-1">
                <span class="text-title-large font-weight-bold">{{ item?.group?.name }}</span>
                <span class="text-body-small text-grey-lighten-1">Invitation from {{ item?.inviter?.name }} at {{ formatDate(item?.created_at, 'MMMM DD, YYYY') }}</span>
              </div>
            </template>
          </v-card>
        </template>

        <v-pagination v-model=page :disabled="isLoading" :length="invitation?.total_pages" @update:model-value="() => isLoading=!isLoading"></v-pagination>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
    
</style>