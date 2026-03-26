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
import MyTeamRequestView from "@/views/supervisor/MyTeamRequestView.vue"
import MyTeamView from "@/views/supervisor/MyTeamView.vue"
import MemberDetailsView from "@/views/supervisor/MemberDetailsView.vue"

//  Admin Pages
import AssignMemberView from "@/views/admin/AssignMemberView.vue"
import ManageMemberView from "@/views/admin/ManageMemberView.vue"
import InviteUserView from "@/views/admin/InviteUserView.vue"
import LoginView from "@/views/Authentication/LoginView.vue"
import RegisterView from "@/views/Authentication/RegisterView.vue"
import InvalidPageView from "@/views/main/InvalidPageView.vue"

// Components
import TopNavbar from "@/components/TopNavbar.vue"
import Footer from "@/components/Footer.vue"

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
            components:{
                default: HomeView,
                navbar: TopNavbar,
                footer: Footer
            }
        },
        {
            path:'/Invitations',
            name:'invitations',
            components:{
                default: InvitationListView,
                navbar: TopNavbar,
                footer: Footer
            }
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
            components:{
                default: ClockView,
                footer: Footer
            },
            props:{
                navbar:{
                    sidebarActive: false
                }
            }
        },
        {
            path:'/Override',
            name:'override',
            components:{
                default: OverrideView,
                footer: Footer
            } 
        },
        {
            path:'/CreateOverride',
            name:'createoverride',
            component: CreateOverride
        },
        // Supervisor Pages
        {
            path:'/MyTeamRequest',
            name:"myteamrequest",
            components: {
                default: MyTeamRequestView,
                footer: Footer
            }
        },
        {
            path:'/MyTeam',
            name:"myTeam",
            components:{
                default: MyTeamView,
                footer: Footer
            }
        },
        {
            path:'/MemberDetails',
            name:'memberDetails',
            components: {
                default: MemberDetailsView,
                footer: Footer
            } 
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
        },

        {
            path: '/:pathMatch(.*)*',
            name: 'InvalidPage',
            component: InvalidPageView
        }
    ]
})

export default router