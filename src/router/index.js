import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/profile",
        name: "Profile",
        component: () => import(/* webpackChunkName: "profile" */ '@/views/ProFile.vue')
    },
    {
        path: "/logout",
        name: "Logout",
        component: () => import(/* webpackChunkName: "logout" */ '@/views/Logout.vue')
    },
    {
        path: "/result",
        name: "Result",
        component: () => import(/* webpackChunkName: "result" */ '@/components/ResultScreen.vue')
    },
    {
        path: "/interact",
        name: "Interact",
        component: () => import(/* webpackChunkName: "interact" */ '@/components/InteractScreen.vue')
    },
    {
        path: "/match",
        name: "Match",
        component: () => import(/* webpackChunkName: "match" */ '@/components/MainScreen.vue')
    },
    {
        path: "/signin" | "",
        name: "SignIn",
        component: () => import(/* webpackChunkName: "signin" */ '@/views/SignIn.vue')
    },
    {
        path: "/signup",
        name: "SignUp",
        component: () => import(/* webpackChunkName: "signup" */ '@/views/SignUp.vue')
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;