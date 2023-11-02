import { useUserStore } from "@/stores/user-store";
import type { Router } from "vue-router";

export function useBeforeEach(router: Router) {
    router.beforeEach((to, from, next) => {
        const userStore = useUserStore();
        if (to.name !== 'login' && !userStore.isLoggerIn) {
            next({ name: 'login' });
        } else if (to.name === 'login' && userStore.isLoggerIn) {
            next('/');
        }
        else {
            next();
        }
    });
}