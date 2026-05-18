<script setup>
    import AdminSideNavbar from '@/components/AdminSideNavbar.vue';
</script>

<template>
    <admin-side-navbar></admin-side-navbar>
    <div class="py-14 min-h-screen">
        <div class="d-flex flex-column ga-8">
            <v-btn variant="text" style="width: fit-content;" @click="$router.back()">
                ← Back
            </v-btn>
            <div class="d-flex flex-column">
                 <span class="text-headline-medium font-weight-bold">Invite User</span>
            </div>

            <div class="w-100">
                Search User by Email <br>
                <div class="d-flex flex-column align-center ga-2">
                    <v-text-field
                    placeholder="Type Email"
                    append-inner-icon="mdi-magnify"
                    variant="outlined"
                    class="w-100"
                    ></v-text-field>
                    <v-btn 
                    text="Send Invitation →"
                    class="bg-white">
                    </v-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>