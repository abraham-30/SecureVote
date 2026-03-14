import { createRouter, createWebHistory } from "vue-router"

// Authentication Pages
import LandingView from "@/views/Authentication/LandingView.vue"
// Onboarding Pages
import Onboarding_AView from "@/views/Authentication/onboarding/Onboarding_AView.vue"
import Onboarding_BView from "@/views/Authentication/onboarding/Onboarding_BView.vue"
import Onboarding_CView from "@/views/Authentication/onboarding/Onboarding_CView.vue"

// Main Pages
import HomeView from "@/views/main/HomeView.vue"
import InvitationListView from "@/views/main/InvitationListView.vue"
import RegisterOrganizationView from "@/views/main/RegisterOrganizationView.vue"

// User Pages
import ClockView from "@/views/user/ClockView.vue"
import OverrideView from "@/views/user/OverrideView.vue"
import CreateOverride from "@/views/user/CreateOverride.vue"

// Supervisor Pages
import ApprovalView from "@/views/supervisor/ApprovalView.vue"
import MyTeamView from "@/views/supervisor/MyTeamView.vue"
import MemberDetailsView from "@/views/supervisor/MemberDetailsView.vue"

//  Admin Pages
import AssignMemberView from "@/views/admin/AssignMemberView.vue"
import ManageMemberView from "@/views/admin/ManageMemberView.vue"
import InviteUserView from "@/views/admin/InviteUserView.vue"
import LoginView from "@/views/Authentication/LoginView.vue"
import RegisterView from "@/views/Authentication/RegisterView.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes:[
        // Temporary Authentication Pages -> path open for DEV and DEBUG purpose
        {
            path:'/tenda',
            name:'tenda',
            component: LandingView
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterView
        },
        // Onboarding Pages -> don't forget to change the url
        {
            path: '/facecheck1',
            name: 'facecheck1',
            component: Onboarding_AView
        },
        {
            path: '/facecheck2',
            name: 'facecheck2',
            component: Onboarding_BView
        },
        {
            path: '/facecheck3',
            name: 'facecheck3',
            component: Onboarding_CView
        },
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