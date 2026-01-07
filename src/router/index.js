import { createRouter, createWebHistory } from "vue-router"
import HomeView from "@/views/HomeView.vue"
import InvitationListView from "@/views/InvitationListView.vue"
import RegisterOrganizationView from "@/views/RegisterOrganizationView.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes:[
        {
            path:'/',
            name:'home',
            component:HomeView
        },
        {
            path:'/Invitations',
            name:'invitations',
            component:InvitationListView
        },
        {
            path:'/RegisterOrganization',
            name:'registerorganization',
            component: RegisterOrganizationView
        }
    ]
})

export default router