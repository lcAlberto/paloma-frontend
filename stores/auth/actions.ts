import {useRouter, useRuntimeConfig} from "#imports";
import {state} from "~/stores/auth/state";

export const actions = {
    async login(params: object) {
        const config = useRuntimeConfig();
        const router = useRouter();

        try {
            await $fetch(`${config.public.apiBase}/login`, {
                method: 'POST',
                body: params,
            });
        } catch (error: any) {
            console.log(error.data.errors);
            state().errors = error.data.errors;
        }
    },
}

interface RequestParams {
    search: null | string,
    sex: null | string
}