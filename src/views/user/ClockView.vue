<script setup>
import { useGroupStore } from '@/stores/GroupStore';
import { groupDetails } from '@/services/GroupServices';
import { userGroupDetails } from '@/services/UserGroupServices';
import { useUserGroupStore } from '@/stores/UserGroupStore';
import { useUserStore } from '@/stores/UserStore'; 
import { formatDate } from '@/utils/date';
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router';
import SideNavbar from '@/components/SideNavbar.vue';
import { storeToRefs } from 'pinia';

const userStore = useUserStore()
const groupStore = useGroupStore()
const { group } = storeToRefs(groupStore)
const { name } = storeToRefs(userStore)

const userGroupStore = useUserGroupStore()
const selectedUserGroup = ref()
const route = useRoute()

const currentDate = ref(new Date())
const isSidebarOpen = ref(true)

function activateSidebar(){
    isSidebarOpen.value = !isSidebarOpen.value
}

onMounted(async () => {
    
})

// Data Dummy
const dummyData = ref([
{
    date: '12 April 2026',
    clockin: '08:30',
    clockout: '17:30',
    type: 'Override',
    notes: 'Lupa Absen',
},
{
  date: '11 April 2026',
  clockin: '07:30',
  clockout: '06:30',
  type: 'Leave',
  notes: 'Cuti',
},
{
  date: '10 April 2026',
  clockin: '09:30',
  clockout: '05:30',
  type: 'Late',
  notes: '',
},
{
  date: '09 April 2026',
  clockin: '08:30',
  clockout: '05:30',
  type: '',
  notes: '',
},
{
  date: '08 April 2026',
  clockin: '08:30',
  clockout: '05:30',
  type: '',
  notes: '',
},
])
</script>

<template>
    <side-navbar
    :is-open="isSidebarOpen"
    @activate="activateSidebar"
    />
    <div class="py-8 min-h-screen">
        <div class="d-flex flex-column ga-8">
            <div>
                <v-btn 
                icon="mdi-menu"
                variant="text"
                v-if="!isSidebarOpen"
                @click="activateSidebar"
                ></v-btn>
            </div>
            <div class="d-flex flex-column">
                <span class="text-headline-medium font-weight-bold">{{ group.name }}</span>
                <span class="text-grey-lighten-1">{{ name }}</span>
            </div>
            <div class="d-flex flex-column align-center ga-2">
                <span class="text-display-small font-weight-bold">
                    {{ currentDate.toLocaleTimeString('en-US', { hour: "2-digit", minute: "2-digit" }) }}
                </span>
                <span class="text-grey-lighten-1 text-center">
                    {{ formatDate(currentDate, "MMMM Do, YYYY") }}
                </span>
                <span class="text-grey-lighten-1"></span>
            </div>
            <div class="d-flex flex-column ga-4">
                <div class="d-flex flex-row w-100 ga-4">
                    <v-card class="w-100 bg-blur text-white border-sm border-opacity-100 pa-4">
                        <div class="d-flex flex-column ga-8 align-center">
                            <v-card-title class="text-subtitle-1">Registered Clock In</v-card-title>
                            <v-card-text class="text-title-large font-weight-bold">-- : --</v-card-text>
                            <v-card-actions class="w-100">
                                <v-btn block variant="elevated" class="bg-white">Clock In →</v-btn>
                            </v-card-actions>
                        </div>
                    </v-card>
                    <v-card class="w-100 bg-blur text-white border-sm border-opacity-100 pa-4">
                        <div class="d-flex flex-column ga-8 align-center">
                            <v-card-title class="text-subtitle-1">Registered Clock Out</v-card-title>
                            <v-card-text class="text-title-large font-weight-bold">-- : --</v-card-text>
                            <v-card-actions class="w-100">
                                <v-btn block variant="elevated" class="bg-white">Clock Out →</v-btn>
                            </v-card-actions>
                        </div>
                    </v-card>
                </div>
            </div>
            <div class="d-flex flex-column ga-4">
                <div class="d-flex flex-column ga-1">
                    <span class="text-title-medium font-weight-bold">Attendance History</span>
                    <v-divider class="border-opacity-50"></v-divider>      
                </div>

                <div>
                    <div class="d-flex flex-column ga-2">
                        <v-table 
                        theme="dark"
                        density="compact"
                        striped="even"
                        >
                            <thead>
                            <tr>
                                <th class="text-left">
                                Date
                                </th>
                                <th class="text-left">
                                Clock In
                                </th>
                                <th class="text-left">
                                Clock Out
                                </th>
                                <th class="text-left">
                                
                                </th>
                                <th class="text-left">
                                Notes
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr
                                v-for="item in dummyData"
                                :key="item.name"
                            >
                                <td>{{ item.date }}</td>
                                <td>{{ item.clockin }}</td>
                                <td>{{ item.clockout }}</td>
                                <td>{{ item.type }}</td>
                                <td>{{ item.notes }}</td>
                            </tr>
                            </tbody>
                        </v-table>
                        <v-pagination :length="5"></v-pagination>
                    </div>
                </div>
            </div>
            <div class="d-flex flex-column ga-4">
                <div class="d-flex flex-column ga-1">
                    <span class="text-title-medium font-weight-bold">Manage Your Administration</span>
                    <v-divider class="border-opacity-50"></v-divider>      
                </div>
                <div class="d-flex flex-row ga-4 w-100">
                    <div class="w-100" 
                    style=
                    "
                    max-width: 135px;
                    min-height: 135px;
                    "
                    >
                        <v-btn stacked variant="outlined" to="/override" class="bg-blur text-white w-100 h-100">
                            <v-icon 
                            size="72"
                            icon="mdi-clock-outline" 
                            class="text-yellow-darken-1"
                            ></v-icon>
                            Override
                        </v-btn>
                    </div>
                    <div class="w-100" 
                    style=
                    "
                    max-width: 135px;
                    min-height: 135px;
                    "
                    >
                        <v-btn stacked variant="outlined" to="/leave" class="bg-blur text-white w-100 h-100">
                            <v-icon 
                            size="72"
                            icon="mdi-door-closed" 
                            class="text-green-darken-1"
                            ></v-icon>
                            Leave
                        </v-btn>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>