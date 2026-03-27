<script setup>
    const props = defineProps({
        isOpen: {
            type: Boolean,
            required: true,
            default: false,
        },
    })

    const emits = defineEmits([
        'activate'
    ])

    function activateSidebar(){
        emits('activate')
    }
</script>

<template>
    <v-navigation-drawer :width="400" class="pa-8" v-model="props.isOpen">
        <v-btn icon="mdi-close" variant="text" @click="activateSidebar"></v-btn>
        <v-list-item color='primary'></v-list-item>
        <v-list-item link title="Clock In / Clock Out" to="/clock"></v-list-item>
        <v-list-item link title="Override" to="/override"></v-list-item>
        <v-list-item link title="Leave"></v-list-item>
        <v-list-item link title="My Team" to="/MyTeam"></v-list-item>
        <v-list-item link title="Team Requests" to="/MyTeamRequest"></v-list-item>
        <v-list-item link title="My Organizations"></v-list-item>
        <template v-slot:append>
            <div class="d-flex flex-row ga-8 align-end">
                <div class="d-flex flex-column ga-2 w-100">
                    <div style="height: 32px;">
                    <!-- hardcoded image -->
                    <img src="@/assets/Wikimedia-logo.png" alt="" class="h-100">
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