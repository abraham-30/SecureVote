<script setup>
import { useUserStore } from '@/stores/UserStore.js'
import { useGroupStore } from '@/stores/GroupStore'
import { storeToRefs } from 'pinia'
import { userGroupList, userGroupListAdmin } from '@/services/UserGroupServices.js'
import { ref, onMounted, watch, onUnmounted } from 'vue'
import router from '@/router/index.js'
import { formatDate, getCurrentDateTime } from '@/utils/date';

const userStore = useUserStore()
const groupStore = useGroupStore()
const { id } = storeToRefs(userStore)
const { name } = storeToRefs(userStore)
const userGroups = ref()
const userGroupAdmin = ref()
const controller = new AbortController()
const timeInterval = ref()
const size = 5
const pageMyOrg = ref(1)
const pageManagedOrg = ref(1)
const isLoadingMyOrg = ref(true)
const isLoadingManagedOrg = ref(true)
const currentDate = ref(getCurrentDateTime())
const onOrgClick = async (item, isManagedOrg) => {
    userStore.setRole(item?.role?.name)
    groupStore.setGroup(item?.group)

    if (isManagedOrg)
      router.push({ name: "organizationProfile" })
    else
      router.push({ name: "clock", query: { id: id } })
}

const fetchUserGroup = async () => {
  await userGroupList(id.value, size, pageMyOrg.value, controller.signal)
    .then((response) => {
      userGroups.value = response.data
      isLoadingMyOrg.value = false
    })
}

const fetchUserGroupAdmin = async () => {
  await userGroupListAdmin(id.value, size, pageManagedOrg.value, controller.signal)
  .then((response) => {
    userGroupAdmin.value = response.data
    isLoadingManagedOrg.value = false
  })
}

const startTimeInterval = () => {
  timeInterval.value = setInterval(() => {
    currentDate.value = getCurrentDateTime()
  }, 1000)
}

onMounted(async () => {
  userStore.setRole(null)
  groupStore.setGroup(null)

  try {
    fetchUserGroup()
    
    fetchUserGroupAdmin()
  } catch (error) {
    console.error(error)
  }

  startTimeInterval()
})

watch(pageMyOrg, async() => {
  try {
    await fetchUserGroup()
  } catch (error) {
    console.error(error)
  }
})

watch(pageManagedOrg, async() => {
  try {
    await fetchUserGroupAdmin()
  } catch (error) {
    console.error(error)
  }
})

onUnmounted(() => {
  controller.abort()
  clearInterval(timeInterval.value)
})
</script>

<template>
  <div class="min-h-screen py-14 ">
      <div class="d-flex flex-column ga-8 py-14 ">
        <div class="d-flex flex-column ga-4 ">
          <div class="d-flex flex-column ga-2">
            <span>{{ formatDate(currentDate, "hh:mm A") }}</span>
            <span class="text-headline-medium font-weight-bold text-truncate">Welcome, {{ name }}!</span>
          </div>
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

          <div class="d-flex flex-column ga-4 ">
            <template v-if="isLoadingMyOrg">
              <v-skeleton-loader type="article" v-for="i in size">
              </v-skeleton-loader>
            </template>
            
            <template v-else>
              <v-card
                class="bg-blur border-sm border-opacity-75 pa-2 text-white "
                link
                @click="onOrgClick(item, false)"
                v-for="item in userGroups?.results"
                >
                <v-card-text>
                  <div class="d-flex flex-column ga-1 ">
                    <span class="text-title-large font-weight-bold">
                      {{ item?.group?.name }}
                    </span>
                    <span class="text-grey-lighten-1 text-body-small desc">
                      {{ item?.group?.description }}
                    </span>
                  </div>
                </v-card-text>
              </v-card>
            </template>

            <v-pagination v-model=pageMyOrg :disabled="isLoadingMyOrg" :length="userGroups?.total_pages" @update:model-value="() => isLoadingMyOrg=!isLoadingMyOrg"></v-pagination>
          </div>
        </div>

        <div class="d-flex flex-column ga-4 ">
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
          
          <div class="d-flex flex-column ga-4 ">
            <template v-if="isLoadingManagedOrg">
              <v-skeleton-loader type="article" v-for="i in size"></v-skeleton-loader>
            </template>

            <template v-else>
              <v-card 
              class="bg-blur border-sm border-opacity-75 pa-2 text-white "
              link
              @click="onOrgClick(item, true)"
              v-for="item in userGroupAdmin.results"
              >
                <v-card-text>
                  <div class="d-flex flex-column ga-1 ">
                    <span class="text-title-large font-weight-bold">
                      {{ item?.group?.name }}
                    </span>
                    <span class="text-grey-lighten-1 text-body-small desc" >
                      {{ item?.group?.description }}
                    </span>
                  </div>
                </v-card-text>
              </v-card>
            </template>

            <v-pagination v-model=pageManagedOrg :disabled="isLoadingManagedOrg" :length="userGroupAdmin?.total_pages" @update:model-value="() => isLoadingManagedOrg=!isLoadingManagedOrg"></v-pagination>
          </div>
        </div>
      </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.v-card-text) {

  span {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}
</style>