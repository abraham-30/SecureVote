<script setup>
import { ref } from 'vue';

    const popupReqOverrideWaiting = ref(false);
    const popupReqLeaveWaiting = ref(false);
    const popupReqOverrideHistory = ref(false);
    const popupReqLeaveHistory = ref(false);

    // Data Dummy
    const dummyData = ref([
    {
      date: 'Lorem Ipsum',
      clockin: '00:00',
      clockout: '00:00',
      type: 'Late',
      notes: 'Lorem ipsum dolor sit amet',
    },
    {
      date: 'Lorem Ipsum',
      clockin: '--:--',
      clockout: '--:--',
      type: 'Leave',
      notes: 'Lorem ipsum dolor sit amet',
    },
    {
      date: 'Lorem Ipsum',
      clockin: '00:00',
      clockout: '00:00',
      type: 'Override',
      notes: 'Lorem ipsum dolor sit amet',
    },
    ])
</script>

<template>
    <div class="py-8 min-h-screen">
        <div class="d-flex flex-column ga-8">
            <div>
                <v-btn variant="text" style="width: fit-content;" @click="$router.back()">
                    ← Back
                </v-btn>
            </div>
            <div class="d-flex flex-column">
                <span class="text-headline-medium font-weight-bold">John Doe</span>
                <div class="text-grey-lighten-1">
                    <span>johndoe@example.org</span>
                </div>
                <div class="mt-2">
                    <v-chip 
                    color="blue-darken-2"
                    variant="flat"
                    >
                    <!-- Change color and role name here -->
                    Member
                    </v-chip>
                </div>
            </div>
            <div class="d-flex flex-column ga-4">
                <div class="d-flex flex-column ga-1">
                    <span class="text-title-medium font-weight-bold">This Month Attendance Report</span>
                    <v-divider class="border-opacity-50"></v-divider>      
                </div>
                <div>
                    <div class="d-flex flex-row ga-2">
                        <v-card class="d-flex flex-column align-center w-100 pa-4 bg-blur text-white border-sm border-opacity-100">
                            <v-card-title>On Time</v-card-title>
                            <v-card-text class="text-display-medium font-weight-bold">1000</v-card-text>
                        </v-card>
                        <v-card class="d-flex flex-column align-center w-100 pa-4 bg-blur text-white border-sm border-opacity-100">
                            <v-card-title>Late</v-card-title>
                            <v-card-text class="text-display-medium font-weight-bold">1000</v-card-text>
                        </v-card>
                        <v-card class="d-flex flex-column align-center w-100 pa-4 bg-blur text-white border-sm border-opacity-100">
                            <v-card-title>Override</v-card-title>
                            <v-card-text class="text-display-medium font-weight-bold">1000</v-card-text>
                        </v-card>
                        <v-card class="d-flex flex-column align-center w-100 pa-4 bg-blur text-white border-sm border-opacity-100">
                            <v-card-title>Leave</v-card-title>
                            <v-card-text class="text-display-medium font-weight-bold">1000</v-card-text>
                        </v-card>
                    </div>
                </div>
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
            <div class="d-flex flex-column ga-4">
                <div class="d-flex flex-column ga-1">
                    <span class="text-title-medium font-weight-bold">Request Waiting for Approval</span>
                    <v-divider class="border-opacity-50"></v-divider>      
                </div>
                <div class="d-flex flex-column ga-4">
                    <!-- Popup Override -->
                    <v-dialog 
                    v-model="popupReqOverrideWaiting"
                    max-width="750">
                        <v-card class="pa-4">
                            <v-card-actions>
                                <v-btn
                                variant="text"
                                icon="mdi-close"
                                @click="popupReqOverrideWaiting = false"></v-btn>
                            </v-card-actions>
                            <v-card-title class="font-weight-bold text-headline-medium">
                                Override Request
                                <v-divider class="border-opacity-50 mt-1"></v-divider>      
                            </v-card-title>
                            <v-card-text class="d-flex flex-column align-start ga-8 mt-4">
                                <div class="d-flex flex-column">
                                    <span class="text-title-large font-weight-bold">Requester</span>
                                    <span class="text-grey-lighten-1">John Doe <br>(johndoe@example.org)</span>
                                </div>
                                <div class="d-flex flex-column">
                                    <span class="text-title-large font-weight-bold">Date</span>
                                    <span class="text-grey-lighten-1">31 December 2025</span>
                                </div>
                                <div class="d-flex flex-column">
                                    <span class="text-title-large font-weight-bold">Clock In/Clock Out</span>
                                    <span class="text-grey-lighten-1">-- : -- / -- : --</span>
                                </div>
                                <div class="d-flex flex-column">
                                    <span class="text-title-large font-weight-bold">Reason</span>
                                    <span class="text-grey-lighten-1 text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse mollis justo eu dolor porta, at bibendum nulla lobortis. Morbi tempor, mi ut ultricies tempor, turpis felis laoreet neque, sit amet finibus lacus mauris eget lorem. Nam eu urna sed nibh feugiat vehicula. Mauris maximus accumsan odio, sed posuere felis pharetra sit amet. Suspendisse dapibus auctor risus, in euismod mi tempor vel. Mauris aliquet porta nisl dictum commodo. Donec vel turpis neque. Aenean faucibus volutpat risus, in laoreet augue bibendum ut. Nullam auctor felis et facilisis molestie. Aenean eleifend ligula justo, sit amet posuere ante dapibus at.</span>
                                </div>
                            </v-card-text>
                            <v-card-actions class="w-100">
                                <v-btn
                                color="success"
                                text="Approve"
                                variant="flat"
                                class="w-100"
                                style="max-width: 150px;"
                                ></v-btn>
                                <v-btn
                                color="red"
                                text="Reject"
                                variant="flat"
                                class="w-100"
                                style="max-width: 150px;"
                                ></v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <!-- Popup Leave -->
                    <v-dialog 
                    v-model="popupReqLeaveWaiting"
                    max-width="750">
                        <v-card class="pa-4">
                            <v-card-actions>
                                <v-btn
                                variant="text"
                                icon="mdi-close"
                                @click="popupReqLeaveWaiting = false"></v-btn>
                            </v-card-actions>
                            <v-card-title class="font-weight-bold text-headline-medium">
                                Override Request
                                <v-divider class="border-opacity-50 mt-1"></v-divider>      
                            </v-card-title>
                            <v-card-text class="d-flex flex-column align-start ga-8 mt-4">
                                <div class="d-flex flex-column">
                                    <span class="text-title-large font-weight-bold">Requester</span>
                                    <span class="text-grey-lighten-1">John Doe <br>(johndoe@example.org)</span>
                                </div>
                                <div class="d-flex flex-column">
                                    <span class="text-title-large font-weight-bold">Date</span>
                                    <span class="text-grey-lighten-1">31 December 2025</span>
                                </div>
                                <div class="d-flex flex-column">
                                    <span class="text-title-large font-weight-bold">Clock In/Clock Out</span>
                                    <span class="text-grey-lighten-1">-- : -- / -- : --</span>
                                </div>
                                <div class="d-flex flex-column">
                                    <span class="text-title-large font-weight-bold">Reason</span>
                                    <span class="text-grey-lighten-1 text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse mollis justo eu dolor porta, at bibendum nulla lobortis. Morbi tempor, mi ut ultricies tempor, turpis felis laoreet neque, sit amet finibus lacus mauris eget lorem. Nam eu urna sed nibh feugiat vehicula. Mauris maximus accumsan odio, sed posuere felis pharetra sit amet. Suspendisse dapibus auctor risus, in euismod mi tempor vel. Mauris aliquet porta nisl dictum commodo. Donec vel turpis neque. Aenean faucibus volutpat risus, in laoreet augue bibendum ut. Nullam auctor felis et facilisis molestie. Aenean eleifend ligula justo, sit amet posuere ante dapibus at.</span>
                                </div>
                            </v-card-text>
                            <v-card-actions class="w-100">
                                <v-btn
                                color="success"
                                text="Approve"
                                variant="flat"
                                class="w-100"
                                style="max-width: 150px;"
                                ></v-btn>
                                <v-btn
                                color="red"
                                text="Reject"
                                variant="flat"
                                class="w-100"
                                style="max-width: 150px;"
                                ></v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-card 
                    link
                    class="bg-blur border-sm border-opacity-75 pa-2 text-white"
                    @click = "popupReqOverrideWaiting = true"
                    >
                    <v-card-text class="d-flex flex-column ga-1">
                        <span class="text-title-large font-weight-bold">Request Title</span>
                        <span class="text-body-small text-grey-lighten-1">Request created at December 25th, 2025</span>
                    </v-card-text>
                    </v-card>
                    <v-pagination :length="5"></v-pagination>
                </div>
            </div>
            <div class="d-flex flex-column ga-4">
                <div class="d-flex flex-column ga-1">
                    <span class="text-title-medium font-weight-bold">Request History</span>
                    <v-divider class="border-opacity-50"></v-divider>      
                </div>
                <div class="d-flex flex-row ga-2">
                    <div class="w-33">
                        <v-select
                        clearable
                        chips
                        label="Approval Type"
                        :items="['Sawit1', 'Sawit2', 'Sawit3']"
                        multiple
                        variant="outlined"
                        persistent-placeholder
                        hide-details="auto"
                        class="w-100"
                        ></v-select>
                    </div>
                    <v-btn class="bg-white">Search</v-btn>
                </div>
                <div class="d-flex flex-column ga-4">
                    <!-- Popup Leave -->
                    <v-dialog 
                    v-model="popupReqLeaveHistory"
                    max-width="750">
                        <v-card class="pa-4">
                            <v-card-actions>
                                <v-btn
                                variant="text"
                                icon="mdi-close"
                                @click="popupReqLeaveHistory = false"></v-btn>
                            </v-card-actions>
                            <v-card-title class="font-weight-bold text-headline-medium">
                                Leave Request 
                                <br>
                                <v-chip 
                                color="success"
                                variant="flat"
                                >
                                <!-- Change color and role name here -->
                                Approved
                                </v-chip>
                                <v-divider class="border-opacity-50 mt-2"></v-divider>      
                            </v-card-title>
                            <v-card-text class="d-flex flex-column align-start ga-8 mt-4">
                                <div class="d-flex flex-column">
                                    <span class="text-title-large font-weight-bold">Requester</span>
                                    <span class="text-grey-lighten-1">John Doe <br>(johndoe@example.org)</span>
                                </div>
                                <div class="d-flex flex-column">
                                    <span class="text-title-large font-weight-bold">Date</span>
                                    <span class="text-grey-lighten-1">31 December 2025</span>
                                </div>
                                <div class="d-flex flex-column">
                                    <span class="text-title-large font-weight-bold">Clock In/Clock Out</span>
                                    <span class="text-grey-lighten-1">-- : -- / -- : --</span>
                                </div>
                                <div class="d-flex flex-column">
                                    <span class="text-title-large font-weight-bold">Reason</span>
                                    <span class="text-grey-lighten-1 text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse mollis justo eu dolor porta, at bibendum nulla lobortis. Morbi tempor, mi ut ultricies tempor, turpis felis laoreet neque, sit amet finibus lacus mauris eget lorem. Nam eu urna sed nibh feugiat vehicula. Mauris maximus accumsan odio, sed posuere felis pharetra sit amet. Suspendisse dapibus auctor risus, in euismod mi tempor vel. Mauris aliquet porta nisl dictum commodo. Donec vel turpis neque. Aenean faucibus volutpat risus, in laoreet augue bibendum ut. Nullam auctor felis et facilisis molestie. Aenean eleifend ligula justo, sit amet posuere ante dapibus at.</span>
                                </div>
                            </v-card-text>
                        </v-card>
                    </v-dialog>
                    <!-- Popup Override -->
                    <v-dialog 
                    v-model="popupReqOverrideHistory"
                    max-width="750">
                        <v-card class="pa-4">
                            <v-card-actions>
                                <v-btn
                                variant="text"
                                icon="mdi-close"
                                @click="popupReqOverrideHistory = false"></v-btn>
                            </v-card-actions>
                            <v-card-title class="font-weight-bold text-headline-medium">
                                Override Request 
                                <br>
                                <v-chip 
                                color="success"
                                variant="flat"
                                >
                                <!-- Change color and role name here -->
                                Approved
                                </v-chip>
                                <v-divider class="border-opacity-50 mt-2"></v-divider>      
                            </v-card-title>
                            <v-card-text class="d-flex flex-column align-start ga-8 mt-4">
                                <div class="d-flex flex-column">
                                    <span class="text-title-large font-weight-bold">Requester</span>
                                    <span class="text-grey-lighten-1">John Doe <br>(johndoe@example.org)</span>
                                </div>
                                <div class="d-flex flex-column">
                                    <span class="text-title-large font-weight-bold">Date</span>
                                    <span class="text-grey-lighten-1">31 December 2025</span>
                                </div>
                                <div class="d-flex flex-column">
                                    <span class="text-title-large font-weight-bold">Clock In/Clock Out</span>
                                    <span class="text-grey-lighten-1">-- : -- / -- : --</span>
                                </div>
                                <div class="d-flex flex-column">
                                    <span class="text-title-large font-weight-bold">Reason</span>
                                    <span class="text-grey-lighten-1 text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse mollis justo eu dolor porta, at bibendum nulla lobortis. Morbi tempor, mi ut ultricies tempor, turpis felis laoreet neque, sit amet finibus lacus mauris eget lorem. Nam eu urna sed nibh feugiat vehicula. Mauris maximus accumsan odio, sed posuere felis pharetra sit amet. Suspendisse dapibus auctor risus, in euismod mi tempor vel. Mauris aliquet porta nisl dictum commodo. Donec vel turpis neque. Aenean faucibus volutpat risus, in laoreet augue bibendum ut. Nullam auctor felis et facilisis molestie. Aenean eleifend ligula justo, sit amet posuere ante dapibus at.</span>
                                </div>
                            </v-card-text>
                        </v-card>
                    </v-dialog>
                    <v-card 
                        link
                        class="bg-blur border-sm border-opacity-75 pa-2 text-white"
                        @click = "popupReqLeaveHistory = true"
                        >
                        <v-card-text class="d-flex flex-column ga-1 align-start">
                            <span class="text-title-large font-weight-bold">Request Title</span>
                            <span class="text-body-small text-grey-lighten-1">Request created at December 25th, 2025</span>
                            <div class="mt-2">
                                <v-chip 
                                color="success"
                                variant="flat"
                                >
                                <!-- Change color and role name here -->
                                Approved
                                </v-chip>
                            </div>
                        </v-card-text>
                    </v-card>
                    <v-pagination :length="5"></v-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>