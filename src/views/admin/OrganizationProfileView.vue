<script setup>
import AdminSideNavbar from '@/components/AdminSideNavbar.vue';
import { computed, reactive, ref } from 'vue';
import { useGroupStore } from '@/stores/GroupStore';
import { storeToRefs } from 'pinia';
import { fieldRequired } from '@/utils/rules';
import { updateGroupDetails } from '@/services/GroupServices';

const groupStore = useGroupStore();
const { group } = storeToRefs(groupStore);

const isLoadingSubmit = ref(false)

const form = {
    isValid: false,
    orgName: group.value?.name,
    orgDescription: group.value?.description,
}

const formTemp = reactive({
    ...form
})

const handleSubmit = async(name, description) => {
    try{
        isLoadingSubmit.value = true;
        // console.log(form.isValid)
        if(form.isValid){
            await updateGroupDetails(group.value?.id,{
                name: name,
                description: description
            })
        }
    } catch(error) {
        console.log(error)
    } finally {
        isLoadingSubmit.value = false;
    }
}

const resetForm = () => {
    Object.assign(formTemp, form)
}

const isChanged = computed(()=>{
    return JSON.stringify(form) !== JSON.stringify(formTemp)
})

const isSidebarOpen = ref(true)
function activateSidebar(){
    isSidebarOpen.value = !isSidebarOpen.value
}

</script>

<template>
    <admin-side-navbar
    :is-open = isSidebarOpen
    @activate="activateSidebar"
    ></admin-side-navbar>
    <div class="py-14 min-h-screen">
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
                <span class="text-headline-medium font-weight-bold">Organization Profile</span>
            </div>
            <div>
                <template v-if="isLoadingSubmit">
                    <v-skeleton-loader
                    type="paragraph"></v-skeleton-loader>
                </template>
                <template v-else>
                    <v-form 
                    v-model="form.isValid"
                    validate-on="lazy"
                    class="d-flex flex-column ga-8"
                    @submit.prevent="handleSubmit(formTemp.orgName, formTemp.orgDescription)">
                        <div>
                            Name <br>
                            <v-text-field variant="outlined"
                                placeholder="Type Name"
                                v-model="formTemp.orgName"
                                hide-details="auto" 
                                :rules = "[v => fieldRequired(v, 'Organization Name')]"
                            ></v-text-field>
                        </div>
    
                        <div>
                            Description <br>
                            <v-textarea variant="outlined"
                                placeholder="Type Description"
                                v-model="formTemp.orgDescription"
                                hide-details="auto"
                                :rules = "[v => fieldRequired(v, 'Organization Description')]"
                            ></v-textarea>
                        </div>
                        <div class="d-flex justify-end w-100">
                            <div class="d-flex flex-row ga-2">
                                <v-btn
                                    type="submit"
                                    text="Save Changes"
                                    :disabled="!isChanged"
                                    :loading="isLoadingSubmit"
                                    class="bg-white"
                                >    
                                </v-btn>
                                <v-btn
                                    color="red"
                                    text="Discard Changes"
                                    :disabled="!isChanged"
                                    @click = "resetForm()"
                                >
                                </v-btn>
                            </div>
                        </div>
                    </v-form>
                </template>
            </div>
        </div>
    </div>
</template>

<style scoped></style>