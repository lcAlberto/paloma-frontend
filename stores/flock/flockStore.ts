import {defineStore} from 'pinia';
import useAuthFetch from "~/composables/useAuthFetch";

export const useFlockStore = defineStore('flockStore', () => {
    const availableMothers = ref([]);
    const availableFathers = ref([]);
    const allFlock = ref([]);
    const animal = ref({});
    const createdAnimal = ref({});
    const errors = ref({
        message: '',
        fields: []
    });
    const loading = {
        fetchingMothers: false,
        fetchingFathers: false,
        fetchingAnimals: false,
        fetchingAnimal: false,
        creatingAnimal: false,
        deletingAnimal: false,
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

    async function fetchMothers() {
        loading.fetchingMothers = true;
        try {
            const response = await useAuthFetch(`/animal/mothers`, {method: 'GET'});
            clearErrorMessage();
            if (response && response?.mothers) {
                availableMothers.value = response?.mothers;
            }
        } catch (error) {
            handleError(error as ApiError);
        } finally {
            loading.fetchingMothers = false;
        }
    }

    async function fetchFathers() {
        loading.fetchingFathers = true;
        try {
            const response = await useAuthFetch(`/animal/fathers`, {method: 'GET'});
            clearErrorMessage();
            if (response && response?.fathers) {
                availableFathers.value = response?.fathers;
            }
        } catch (error) {
            handleError(error as ApiError);
        } finally {
            loading.fetchingFathers = false;
        }
    }

    async function createAnimal(params: object) {
        loading.creatingAnimal = true;
        try {
            const response = await useAuthFetch(`/animals`, {
                method: 'POST',
                body: params,
            });
            if (response) {
                createdAnimal.value = response;
                clearErrorMessage();
                router.push('/animals');
            }
        } catch (error) {
            handleError(error as ApiError);
        } finally {
            loading.creatingAnimal = false;
        }
    }

    async function fetchAnimals() {
        loading.fetchingAnimals = true;
        try {
            const response = await useAuthFetch(`/animals`, {method: 'GET'});
            clearErrorMessage();
            if (response) {
                allFlock.value = response;
            }
        } catch (error) {
            handleError(error as ApiError);
        } finally {
            loading.fetchingAnimals = false;
        }
    }

    async function fetchAnimal(animal_id: string | number) {
        loading.fetchingAnimal = true;
        try {
            const response = await useAuthFetch(`/animals/${animal_id}`, {method: 'GET'});
            clearErrorMessage();
            if (response) {
                animal.value = response;
            }
        } catch (error) {
            handleError(error as ApiError);
        } finally {
            loading.fetchingAnimal = false;
        }
    }

    async function updateAnimal(params: object, animal_id: string | number) {
        loading.fetchingAnimals = true;
        try {
            const response = await useAuthFetch(`/animals/${animal_id}`, {
                method: 'PUT',
                body: params,
            });
            clearErrorMessage();
            if (response) {
                allFlock.value = response;
            }
        } catch (error) {
            handleError(error as ApiError);
        } finally {
            loading.fetchingAnimals = false;
        }
    }

    async function deleteAnimal(animal_id: string | number) {
        loading.deletingAnimal = true;
        try {
            await useAuthFetch(`/animals/${animal_id}`, {method: 'DELETE'});
            errors.value.message = 'Sucesso!';
        } catch (error) {
            handleError(error as ApiError);
        } finally {
            loading.deletingAnimal = false;
        }
    }

    return {
        fetchMothers,
        fetchFathers,
        fetchAnimals,
        fetchAnimal,
        createAnimal,
        updateAnimal,
        deleteAnimal,
        availableMothers,
        availableFathers,
        createdAnimal,
        allFlock,
        animal,
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
