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
import OrgProfileView from "@/views/admin/OrganizationProfileView.vue"
import OrgSettingsView from "@/views/admin/OrganizationSettingsView.vue"

// Other Pages
import LoginView from "@/views/Authentication/LoginView.vue"
import RegisterView from "@/views/Authentication/RegisterView.vue"
import InvalidPageView from "@/views/main/InvalidPageView.vue"

// Components
import TopNavbar from "@/components/TopNavbar.vue"
import Footer from "@/components/Footer.vue"
import LeaveView from "@/views/user/LeaveView.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes:[
        // Temporary Authentication Pages -> path open for DEV and DEBUG purpose
        {
            path:'/tenda',
            name:'tenda',
            components:{
                default: LandingView,
                footer: Footer
            }
        },
        {
            path: '/login',
            name: 'login',
            components:{
                default: LoginView,
                footer: Footer
            }
        },
        {
            path: '/register',
            name: 'register',
            components:{
                default: RegisterView,
                footer: Footer
            }
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
            path:'/Clock/:id',
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
            components:{
                default: CreateOverride,
                footer: Footer
            }
        },
        {
            path:'/Leave',
            name:'leave',
            components:{
                default: LeaveView,
                footer: Footer
            } 
        },
        {
            path:'/CreateLeave',
            name:'createleave',
            components:{
                default: CreateOverride,
                footer: Footer
            }
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
            path: '/OrganizationProfile',
            name: 'organizationProfile',
            components: {
                default: OrgProfileView,
                footer: Footer
            }
        },
        {
            path: '/OrganizationSettings',
            name: 'organizationSettings',
            components: {
                default: OrgSettingsView,
                footer: Footer
            }
        },
        // Other
        {
            path: '/:pathMatch(.*)*',
            name: 'InvalidPage',
            component: InvalidPageView
        }
    ]
})

export default router