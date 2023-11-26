import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import {flash, flashes, FlashType, user} from "./store";
import { getUser } from "./api/user";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: () => import("./layouts/default.vue"),
        children: [
            {
                path: "/",
                component: () => import("./pages/index.vue")
            },
            {
                path: "/auth/login",
                component: () => import("./pages/auth/login.vue")
            },
            {
                path: "/auth/register",
                component: () => import("./pages/auth/register.vue")
            },
            {
                path: "/dashboard",
                component: () => import("./pages/dashboard/index.vue")
            },
            {
                path: "/dashboard/user",
                component: () => import("./pages/dashboard/user.vue")
            },
            {
                path: "/dashboard/system",
                component: () => import("./pages/dashboard/system.vue")
            },
            {
                path: "/dashboard/member/:id",
                component: () => import("./pages/dashboard/member.vue")
            },
            {
                path: "/:systemId",
                component: () => import("./pages/system.vue")
            },
            {
                path: "/:systemId/:memberId",
                component: () => import("./pages/member.vue")
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach(async (to) => {
    flashes.value = [];

    try {
        const data = (await getUser()).data;
        if (!data.success) throw new Error();

        user.value = data.data.user;
    } catch (error) {
        user.value = null;
    }

    if (to.path.startsWith("/auth") && !!user.value) {
        return router.push("/dashboard");
    }

    if (to.path.startsWith("/dashboard")) {
        if (!user.value) {
            return router.push("/auth/login")
        }

        if (!user.value.pluralKey) {
            flash("You must setup your Simply Plural API key!", FlashType.Danger)
            if (to.path !== "/dashboard/user") {
                router.push("/dashboard/user")
            }
            return;
        }
    }
})

export { router };