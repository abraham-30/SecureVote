<script setup>
import { useUserStore } from '@/stores/UserStore.js'
import { storeToRefs } from 'pinia'
import { approveInvitationRequest, invitationListInvitee, updateInvitationRequest } from '@/services/InvitationServices.js'
import { ref, onMounted, watch, onUnmounted } from 'vue'
import { formatDate } from '@/utils/date'

const userStore = useUserStore()
const { id } = storeToRefs(userStore)
const isReviewLoading = ref(false)
const invitation = ref()
const controller = new AbortController()

const size = 5
const page = ref(1)
const isLoading = ref(true)

const fetchInvitationInvitee = async () => {
    isLoading.value = true

    await invitationListInvitee(id.value, size, page.value, controller.signal)
        .then((response) => {
            invitation.value = response.data
            isLoading.value = false
        })
}

const handleReject = async (id, isActive) => {
    try {
        isReviewLoading.value = true

        await updateInvitationRequest(id, {
            status: "rejected",
        })
            .then(async (response) => {
                if (response.status == 200) {
                    isActive.value = false

                    const currentLen = invitation.value?.results.length
                    if (currentLen == 1 && page.value != 1)
                        page.value -= 1
                    await fetchInvitationInvitee()
                }
            })
    } catch (error) {
        console.error(error)
    } finally {
        isReviewLoading.value = false
    }
}

const handleApprove = async (item, isActive) => {
    try {
        isReviewLoading.value = true

        await approveInvitationRequest(item)
            .then(async (response) => {
                if (response.status == 200) {
                    isActive.value = false

                    const currentLen = invitation.value?.results.length
                    if (currentLen == 1 && page.value != 1)
                        page.value -= 1
                    await fetchInvitationInvitee()
                }
            })

    } catch (error) {
        console.error(error)
    } finally {
        isReviewLoading.value = false
    }
}

onMounted(async () => {
    try {
        await fetchInvitationInvitee()
    } catch (error) {
        console.error(error)
    }
})

watch(page, async () => {
    isLoading.value = true

    try {
        await fetchInvitationInvitee()
    } catch (error) {
        console.error(error)
    }
})

onUnmounted(() => {
    controller.abort()
})
</script>

<template>
    <div class="min-h-screen py-14">
        <div class="d-flex flex-column ga-8 py-14">
            <v-btn variant="text" style="width: fit-content" @click="$router.back()">
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
                    <v-dialog :persistent="isReviewLoading" max-width="600" v-for="item in invitation.results">
                        <template v-slot:activator="{ props: activatorProps }">
                            <v-card class="bg-blur border-sm border-opacity-75 pa-2 text-white" v-bind="activatorProps">
                                <v-card-text>
                                    <div class="d-flex flex-column ga-1">
                                        <span class="text-title-large font-weight-bold">{{
                                            item?.group?.name
                                        }}</span>
                                        <span class="text-grey-lighten-1 text-truncate">{{
                                            item?.group?.description
                                        }}</span>
                                        <span class="text-body-small text-grey-lighten-1">Invitation from {{
                                            item?.inviter?.name }} at
                                            {{ formatDate(item?.created_at, "MMMM DD, YYYY") }}</span>
                                    </div>
                                </v-card-text>
                            </v-card>
                        </template>

                        <template v-slot:default="{ isActive }">
                            <v-card class="pa-2 pb-8 pa-sm-6 pb-sm-10" :disabled="isReviewLoading"
                                :loading="isReviewLoading">
                                <v-card-actions>
                                    <v-btn variant="text" icon="mdi-close" @click="isActive.value = false"></v-btn>
                                </v-card-actions>
                                <v-card-title class="font-weight-bold text-title-large text-truncate">
                                    {{ item?.group?.name
                                    }}<span v-if="item?.status != 'requested'"></span>
                                    <v-divider class="border-opacity-50 mt-1"></v-divider>
                                </v-card-title>
                                <v-card-text class="d-flex flex-column align-start ga-8">
                                    <div class="d-flex flex-column">
                                        <span class="text-title-medium font-weight-bold">Invitation From</span>
                                        <span class="text-grey-lighten-1">{{ item?.inviter?.name }} <br />({{
                                            item?.inviter?.email
                                        }})</span>
                                    </div>
                                    <div class="d-flex flex-column">
                                        <span class="text-title-medium font-weight-bold">Date</span>
                                        <span class="text-grey-lighten-1">{{
                                            formatDate(item?.created_at, "DD MMMM YYYY")
                                        }}</span>
                                    </div>
                                    <div class="d-flex flex-column">
                                        <span class="text-title-medium font-weight-bold">Organization Description</span>
                                        <span class="text-grey-lighten-1 text-justify">{{
                                            item?.group?.description
                                        }}</span>
                                    </div>
                                </v-card-text>

                                <v-card-actions>
                                    <div
                                        class="w-100 d-flex flex-row flex-wrap flex-sm-nowrap justify-end ga-4 ga-sm-2">
                                        <v-btn variant="flat" text="Approve" color="green" class="w-33"
                                            @click="handleApprove(item, isActive)">
                                        </v-btn>
                                        <v-btn variant="flat" text="Reject" color="red" class="w-33"
                                            @click="handleReject(item?.id, isActive)">
                                        </v-btn>
                                    </div>
                                </v-card-actions>
                            </v-card>
                        </template>
                    </v-dialog>
                </template>

                <v-pagination v-model="page" :disabled="isLoading" :length="invitation?.total_pages"></v-pagination>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
