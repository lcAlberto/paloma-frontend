import {defineStore} from 'pinia';
import useAuthFetch from "~/composables/useAuthFetch";

export const useBreedingStore = defineStore('breedingStore', () => {
    const breedings = ref([]);
    const breeding = ref({});
    const availableMalesForReproduction = ref([]);
    const availableFemalesForReproduction = ref([]);
    const errors = ref({
        message: '',
        fields: []
    });
    const loading = {
        fetchingAll: false,
        fetching: false,
        creating: false,
        updating: false,
        deleting: false,
        fetchingAvailableMalesForReproduction: false,
        fetchingAvailableFemalesForReproduction: false,
    };
    const toast = ref<ToastType>({
        type: 'info',
        message: 'Message Content',
        config: {
            duration: 3000,
            position: 'tl'
        }
    });

    const router = useRouter();

    function handleError(error: ApiError) {
        if (error.errors) {
            errors.value.fields = error.errors;
            errors.value.message = error.message || 'Erro de validação.';
        } else {
            errors.value.message = error.message || 'Erro interno do servidor.';
        }
    }

    function clearErrorMessage() {
        errors.value.message = '';
        errors.value.fields = [];
    }

    async function fetchBreedings() {
        loading.fetchingAll = true;
        try {
            const response = await useAuthFetch(`/breeding/`, {method: 'GET'});
            console.log(response.breedings);
            clearErrorMessage();
            if (response.breedings) {
                breedings.value = response.breedings;
            }
        } catch (error) {
            handleError(error as ApiError);
        } finally {
            loading.fetchingAll = false;
        }
    }

    async function fetchBreeding(breeding_id: string | number) {
        loading.fetching = true;
        try {
            const response = await useAuthFetch(`/breeding/${breeding_id}`, {method: 'GET'});
            clearErrorMessage();
            if (response.breeding) {
                breeding.value = response.breeding;
            }
        } catch (error) {
            handleError(error as ApiError);
        } finally {
            loading.fetching = false;
        }
    }

    async function create(params: object) {
        loading.creating = true;
        try {
            const response = await useAuthFetch(`/breeding/`, {
                method: 'POST',
                body: params,
            });
            clearErrorMessage();
            if (response && response?.breeding) {
                breeding.value = response?.breeding;
            }
        } catch (error) {
            handleError(error as ApiError);
        } finally {
            loading.creating = false;
        }
    }

    async function update(params: object, id: string | number) {
        loading.updating = true;
        try {
            const response = await useAuthFetch(`/breeding/${id}`, {
                method: 'PUT',
                body: params,
            });
            clearErrorMessage();
            if (response && response?.breeding) {
                breeding.value = response?.breeding;
                const router = useRouter()
                router.push('/breedings')
            }
        } catch (error) {
            handleError(error as ApiError);
        } finally {
            loading.updating = false;
        }
    }

    async function destroy(breeding_id: string | number) {
        loading.deleting = true;
        try {
            const response = await useAuthFetch(`/breeding/${breeding_id}`, {method: 'DELETE'});
            clearErrorMessage();
            if (response.breeding) {
                breeding.value = response.breeding;
            }
        } catch (error) {
            handleError(error as ApiError);
        } finally {
            loading.deleting = false;
        }
    }


    async function fetchAvailableMalesForReproduction() {
        loading.fetchingAvailableMalesForReproduction = true;
        try {
            const response = await useAuthFetch(`/animal/getAvailableMalesForReproduction/`, {method: 'GET'});
            clearErrorMessage();
            if (response && response?.males) {
                availableMalesForReproduction.value = response?.males;
            }
        } catch (error) {
            handleError(error as ApiError);
        } finally {
            loading.fetchingAvailableMalesForReproduction = false;
        }
    }

    async function fetchAvailableFemalesForReproduction() {
        loading.fetchingAvailableFemalesForReproduction = true;
        try {
            const response = await useAuthFetch(`/animal/getAvailableFemalesForReproduction/`, {method: 'GET'});
            clearErrorMessage();
            if (response && response?.females) {
                availableFemalesForReproduction.value = response?.females;
            }
        } catch (error) {
            handleError(error as ApiError);
        } finally {
            loading.fetchingAvailableFemalesForReproduction = false;
        }
    }


    return {
        fetchBreedings,
        fetchBreeding,
        update,
        create,
        destroy,
        fetchAvailableMalesForReproduction,
        fetchAvailableFemalesForReproduction,
        breedings,
        breeding,
        availableFemalesForReproduction,
        availableMalesForReproduction,
        errors,
        loading,
        toast,
    };
});

interface ToastType {
    type: string;
    message: string;
    config: ConfigType;
}

interface ConfigType {
    duration: number;
    position: string;
}

interface ApiError {
    message: string;
    errors?: Record<string, string[]>;
}
