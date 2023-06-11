import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/:catchAll(.*)",
        name: "NotFound",
        music: "@/assets/audios/2.mp3",
        component: () => import(/* webpackChunkName: "profile" */ '@/views/ProFile.vue')
    },
    {
        path: "/profile",
        name: "Profile",
        music: "@/assets/audios/2.mp3",
        component: () => import(/* webpackChunkName: "profile" */ '@/views/ProFile.vue')
    },
    {
        path: "/logout",
        name: "Logout",
        music: "@/assets/audios/2.mp3",
        component: () => import(/* webpackChunkName: "logout" */ '@/views/Logout.vue')
    },
    {
        path: "/result",
        name: "Result",
        music: "@/assets/audios/2.mp3",
        component: () => import(/* webpackChunkName: "result" */ '@/components/ResultScreen.vue')
    },
    {
        path: "/interact",
        name: "Interact",
        music: "@/assets/audios/2.mp3",
        component: () => import(/* webpackChunkName: "interact" */ '@/components/InteractScreen.vue')
    },
    {
        path: "/match",
        name: "Match",
        music: "@/assets/audios/2.mp3",
        component: () => import(/* webpackChunkName: "match" */ '@/components/MainScreen.vue')
    },
    {
        path: "/signin" | "",
        name: "SignIn",
        music: "@/assets/audios/2.mp3",
        component: () => import(/* webpackChunkName: "signin" */ '@/views/SignIn.vue')
    },
    {
        path: "/signup",
        name: "SignUp",
        music: "@/assets/audios/2.mp3",
        component: () => import(/* webpackChunkName: "signup" */ '@/views/SignUp.vue')
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;