<script setup></script>

<template>
    <v-navigation-drawer :width="400" class="pa-8">
        <v-list-item color='primary'></v-list-item>
        <v-list-item class="text-title-large font-weight-bold">Organization Name</v-list-item>
        <v-divider></v-divider>
        <div class="pt-2">
            <v-list-item link title="Profile" to="/organizationprofile"></v-list-item>
            <v-list-item link title="Members" to=""></v-list-item>
            <v-list-item link title="Settings" to="/organizationsettings"></v-list-item>
        </div>
        <template v-slot:append>
            <div class="d-flex flex-row ga-8 align-end">
                <div class="d-flex flex-column ga-2 w-100">
                    <div>
                        <span>
                            John Doe
                        </span>
                    </div>
                    <div style="height: 16px;">
                        <img src="@/assets/icon-neutralgrey200.png" alt="" class="h-100">
                    </div>
                </div>
                <div class="w-100">
                    <v-btn 
                    block 
                    class="bg-white"
                    to="/">
                        Sign Out
                    </v-btn>
                </div>
            </div>
        </template>
    </v-navigation-drawer>
</template>

<style scoped></style>