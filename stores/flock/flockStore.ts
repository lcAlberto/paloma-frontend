import {defineStore} from 'pinia'
import useAuthFetch from "~/composables/useAuthFetch";

export const useFlockStore = defineStore('flockStore', () => {
    const availableMothers = ref([])
    const availableFathers = ref([])
    const allFlock = ref([])
    const animal = ref([])
    const createdAnimal = ref({})
    const errors = {
        message: '',
        fields: []
    }
    const loading = {
        fetchingMothers: false,
        fetchingFathers: false,

        fetchingAnimals: false,
        fetchingAnimal: false,
        creatingAnimal: false,
        deletingAnimal: false,
    }
    const toast = <ToastType>{
        type: 'info',
        message: 'Message Content',
        config: {
            duration: 3000,
            position: 'tl'
        }
    }

    async function fetchMothers() {
        loading.fetchingMothers = true
        await useAuthFetch(`/animal/mothers`, {
            method: 'GET',
        }).then((response) => {
            clearErrorMessage()
            if (response && response?.mothers)
                availableMothers.value = response?.mothers
        }).catch((error) => {
            if (error && error.data) {
                errors.fields = error.data.errors;
                errors.message = error.data.message
            } else {
                errors.message = 'Erro interno do servidor.'
            }
        }).finally(() => loading.fetchingMothers = false)
    }

    async function fetchFathers() {
        loading.fetchingMothers = true
        await useAuthFetch(`/animal/fathers`, {
            method: 'GET',
        }).then((response) => {
            clearErrorMessage()
            if (response && response?.fathers)
                availableFathers.value = response?.fathers
        }).catch((error) => {
            if (error && error.data) {
                errors.fields = error.data.errors;
                errors.message = error.data.message
            } else {
                errors.message = 'Erro interno do servidor.'
            }
        }).finally(() => loading.fetchingMothers = false)
    }

    async function createAnimal(params: object) {
        loading.creatingAnimal = false;
        const router = useRouter()

        await useAuthFetch(`/animals`, {
            method: 'POST',
            body: params,
        }).then((response) => {
            if (response) {
                createdAnimal.value = response
                clearErrorMessage()
                router.push('/animals')
            }
        }).catch((error) => {
            if (error && error.errors) {
                errors.fields = error.errors;
                errors.message = error.message || 'Erro de validação.';
            } else {
                errors.message = 'Erro interno do servidor.';
            }
        }).finally(() => {
            loading.creatingAnimal = false;
        })
    }

    async function fetchAnimals() {
        loading.fetchingAnimals = true;

        await useAuthFetch(`/animals`, {
            method: 'GET',
        }).then((response) => {
            clearErrorMessage();
            if (response)
                allFlock.value = response
        }).catch((error) => {
            if (error && error.errors) {
                errors.fields = error.errors;
                errors.message = error.message || 'Erro de validação.';
            } else {
                errors.message = 'Erro interno do servidor.';
            }
        }).finally(() => {
            loading.fetchingAnimals = false;
        })
    }

    async function fetchAnimal(animal_id: string | number) {
        loading.fetchingAnimals = true;

        await useAuthFetch(`/animals/${animal_id}`, {
            method: 'GET',
        }).then((response) => {
            clearErrorMessage();
            if (response)
                animal.value = response
        }).catch((error) => {
            if (error && error.errors) {
                errors.fields = error.errors;
                errors.message = error.message || 'Erro de validação.';
            } else {
                errors.message = 'Erro interno do servidor.';
            }
        }).finally(() => {
            loading.fetchingAnimals = false;
        })
    }

    async function updateAnimal(params: object, animal_id: string | number) {
        loading.fetchingAnimals = true;

        await useAuthFetch(`/animals/${animal_id}`, {
            method: 'PUT',
            body: params
        }).then((response) => {
            clearErrorMessage();
            console.log(response);
            if (response)
                allFlock.value = response
        }).catch((error) => {
            if (error && error.errors) {
                errors.fields = error.errors;
                errors.message = error.message || 'Erro de validação.';
            } else {
                errors.message = 'Erro interno do servidor.';
            }
        }).finally(() => {
            loading.fetchingAnimals = false;
        })
    }

    async function deleteAnimal(animal_id: string | number) {
        loading.deletingAnimal = true;

        await useAuthFetch(`/animals/${animal_id}`, {
            method: 'DELETE',
        }).then((response) => {
            errors.message = 'Sucesso!'
        }).catch((error) => {
            if (error && error.errors) {
                errors.fields = error.errors;
                errors.message = error.message || 'Erro de validação.';
            } else {
                errors.message = 'Erro interno do servidor.';
            }
        }).finally(() => {
            loading.deletingAnimal = false;
        })
    }

    function clearErrorMessage() {
        errors.message = ''
        errors.fields.value = []
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

    }
})

interface ToastType {
    type: string,
    message: string,
    config: ConfigType,
}

interface ConfigType {
    duration: number
    position: string
}