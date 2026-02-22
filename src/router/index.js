import { createRouter, createWebHistory } from "vue-router"

// Main Pages
import HomeView from "@/views/HomeView.vue"
import InvitationListView from "@/views/InvitationListView.vue"
import RegisterOrganizationView from "@/views/RegisterOrganizationView.vue"

// User Pages
import ClockView from "@/views/ClockView.vue"
import OverrideView from "@/views/OverrideView.vue"
import CreateOverride from "@/views/CreateOverride.vue"

// Supervisor Pages
import ApprovalView from "@/views/ApprovalView.vue"
import MyTeamView from "@/views/MyTeamView.vue"
import MemberDetailsView from "@/views/MemberDetailsView.vue"

//  Admin Pages
import AssignMemberView from "@/views/AssignMemberView.vue"
import ManageMemberView from "@/views/ManageMemberView.vue"
import InviteUserView from "@/views/InviteUserView.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes:[
        // Main Pages
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
        },
        // User Pages
        {
            path:'/Clock',
            name:'clock',
            component: ClockView
        },
        {
            path:'/Override',
            name:'override',
            component: OverrideView
        },
        {
            path:'/CreateOverride',
            name:'createoverride',
            component: CreateOverride
        },
        // Supervisor Pages
        {
            path:'/Approvals',
            name:"approvals",
            component: ApprovalView
        },
        {
            path:'/MyTeam',
            name:"myTeam",
            component: MyTeamView
        },
        {
            path:'/MemberDetails',
            name:'memberDetails',
            component: MemberDetailsView
        },
        // Admin Pages
        {
            path:'/AssignMember',
            name: 'assignMember',
            component: AssignMemberView
        },
        {
            path: '/ManageMember',
            name: 'manageMember',
            component: ManageMemberView
        },
        {
            path: '/InviteUser',
            name: 'inviteUser',
            component: InviteUserView
        }
    ]
})

export default router