<script setup>
import { useUserStore } from '@/stores/UserStore.js'
import { useUserGroupStore } from '@/stores/UserGroupStore.js'
import { useGroupStore } from '@/stores/GroupStore'
import { storeToRefs } from 'pinia'
import { userGroupList, userGroupListAdmin } from '@/services/UserGroupServices.js'
import { ref, onMounted, watch } from 'vue'

const userStore = useUserStore()
const userGroupStore = useUserGroupStore()
const groupStore = useGroupStore()
const { id } = storeToRefs(userStore)
const userGroups = ref()
const userGroupAdmin = ref()

const size = 5
const pageMyOrg = ref(1)
const pageManagedOrg = ref(1)
const isLoadingMyOrg = ref(true)
const isLoadingManagedOrg = ref(true)

onMounted(async () => {
  userGroupList(id.value, size, pageMyOrg.value)
  .then((response) => {
    userGroups.value = response.data
    isLoadingMyOrg.value = false
  })

  userGroupListAdmin(id.value, size, pageManagedOrg.value)
  .then((response) => {
    userGroupAdmin.value = response.data
    isLoadingManagedOrg.value = false
  })
})

watch(pageMyOrg, async() => {
  await userGroupList(id.value, size, pageMyOrg.value)
  .then((response) => {
    userGroups.value = response.data
    isLoadingMyOrg.value = false
  })
})

watch(pageManagedOrg, async() => {
  await userGroupListAdmin(id.value, size, pageManagedOrg.value)
  .then((response) => {
    userGroupAdmin.value = response.data
    isLoadingManagedOrg.value = false
  })
})
</script>

<template>
  <div class="min-h-screen py-14">
      <div class="d-flex flex-column ga-8 py-14">
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
            <template v-if="isLoadingMyOrg">
              <v-skeleton-loader type="article" v-for="i in size">
              </v-skeleton-loader>
            </template>
            
            <template v-else>
              <v-card
                class="bg-blur border-sm border-opacity-75 pa-2 text-white"
                link
                :to="`/clock/${item?.id}`"
                v-for="item in userGroups?.results"
                >
                <template v-slot:prepend>
                  <div class="d-flex flex-column ga-1">
                    <span class="text-title-large font-weight-bold">
                      {{ item?.group?.name }}
                    </span>
                    <span class="text-grey-lighten-1 text-body-small">
                      {{ item?.group?.description }}
                    </span>
                  </div>
                </template>
              </v-card>
            </template>

            <v-pagination v-model=pageMyOrg :disabled="isLoadingMyOrg" :length="userGroups?.total_pages" @update:model-value="() => isLoadingMyOrg=!isLoadingMyOrg"></v-pagination>
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
            <template v-if="isLoadingManagedOrg">
              <v-skeleton-loader type="article" v-for="i in size"></v-skeleton-loader>
            </template>

            <template v-else>
              <v-card 
              class="bg-blur border-sm border-opacity-75 pa-2 text-white"
              link
              :to="`/clock/${item?.id}`"
              v-for="item in userGroupAdmin.results"
              >
                <template v-slot:prepend>
                  <div class="d-flex flex-column ga-1">
                    <span class="text-title-large font-weight-bold">
                      {{ item?.group?.name }}
                    </span>
                    <span class="text-grey-lighten-1 text-body-small">
                      {{ item?.group?.description }}
                    </span>
                  </div>
                </template>
              </v-card>
            </template>

            <v-pagination v-model=pageManagedOrg :disabled="isLoadingManagedOrg" :length="userGroupAdmin?.total_pages" @update:model-value="() => isLoadingManagedOrg=!isLoadingManagedOrg"></v-pagination>
          </div>
        </div>
      </div>
  </div>
</template>

<style lang="scss" scoped>

</style>