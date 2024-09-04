import {useRouter, useRuntimeConfig} from "#imports";

export const actions = {
    async login(params: object) {
        const config = useRuntimeConfig();
        const router = useRouter();

        try {
            await $fetch(`${config.public.apiBase}/login`, {
                method: 'POST',
                body: params,
            });
        } catch (error) {
            console.log(error.data.errors);
            this.errors = error.data.errors;
        }
    },
}

interface RequestParams {
    search: null | string,
    sex: null | string
}