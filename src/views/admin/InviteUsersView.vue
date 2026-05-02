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
                 <span class="text-grey-lighten-1">Lorem Ipsum Dolor Sit Amet.</span>
            </div>
            <div class="d-flex flex-column align-center ga-2">
                <v-text-field
                label="Search"
                placeholder="Search by username or email"
                prepend-icon="mdi-magnify"
                variant="outlined"
                persistent-placeholder
                class="w-100"
                ></v-text-field>
                <v-btn 
                text="Send Invitation →"
                class="bg-white">
                </v-btn>
            </div>
        </div>
    </div>
</template>

<style scoped></style>