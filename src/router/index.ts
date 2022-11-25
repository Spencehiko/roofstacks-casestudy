import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "add",
            component: () => import("@/pages/AddPage.vue"),
        },
        {
            path: "/orders/:orderType",
            name: "orders",
            component: () => import("@/pages/OrderPage.vue"),
        },
    ],
});

export default router;
