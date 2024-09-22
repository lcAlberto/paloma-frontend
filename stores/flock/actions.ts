import {useRuntimeConfig} from '#imports';
import useAuthFetch from '~/composables/useAuthFetch';

export const actions = {

  async fetchMothers() {
    this.loading.fetchingMothers = true
    await useAuthFetch(`/animal/mothers`, {
      method: 'GET',
    }).then((response) => {
      this.clearErrorMessage()
      if (response.data && response.data.value)
        this.availableMothers = response.data.value.mothers
    }).catch((error) => {
      if (error && error.data) {
        this.errors.fields = error.data.errors;
        this.errors.message = error.data.message
      } else {
        this.errors.message = 'Erro interno do servidor.'
      }
    }).finally(() => this.loading.fetchingMothers = false)
  },

  async fetchFathers() {
    this.loading.fetchingMothers = true
    await useAuthFetch(`/animal/fathers`, {
      method: 'GET',
    }).then((response) => {
      this.clearErrorMessage()
      if (response.data && response.data.value)
        this.availableFathers = response.data.value.fathers
    }).catch((error) => {
      if (error && error.data) {
        this.errors.fields = error.data.errors;
        this.errors.message = error.data.message
      } else {
        this.errors.message = 'Erro interno do servidor.'
      }
    }).finally(() => this.loading.fetchingMothers = false)
  },

  async createAnimal(params: object) {
    this.loading.creatingAnimal = false;

    await useAuthFetch(`/animals`, {
      method: 'POST',
      body: params,
    }).then((response) => {
      this.clearErrorMessage();
      console.log(response);
      // if (response.data && response.data.value)
      // this.createdAnimal = response.data.value.animals
    }).catch((error) => {
      if (error && error.errors) {
        this.errors.fields = error.errors;
        this.errors.message = error.message || 'Erro de validação.';
      } else {
        this.errors.message = 'Erro interno do servidor.';
      }
    }).finally(() => {
      this.loading.creatingAnimal = false;
    })
  },

  async fetchAnimals() {
    this.loading.fetchingAnimals = true;

    await useAuthFetch(`/animals`, {
      method: 'GET',
    }).then((response) => {
      this.clearErrorMessage();
      console.log(response);
      if (response)
        this.allFlock = response
    }).catch((error) => {
      if (error && error.errors) {
        this.errors.fields = error.errors;
        this.errors.message = error.message || 'Erro de validação.';
      } else {
        this.errors.message = 'Erro interno do servidor.';
      }
    }).finally(() => {
      this.loading.fetchingAnimals = false;
    })
  },

  async fetchAnimal(animal_id: string | number) {
    this.loading.fetchingAnimals = true;

    await useAuthFetch(`/animals/${animal_id}`, {
      method: 'GET',
    }).then((response) => {
      this.clearErrorMessage();
      console.log(response);
      if (response)
        this.animal = response
    }).catch((error) => {
      if (error && error.errors) {
        this.errors.fields = error.errors;
        this.errors.message = error.message || 'Erro de validação.';
      } else {
        this.errors.message = 'Erro interno do servidor.';
      }
    }).finally(() => {
      this.loading.fetchingAnimals = false;
    })
  },

  async editAnimal(params: object, animal_id: string | number) {
    this.loading.fetchingAnimals = true;

    await useAuthFetch(`/animals/${animal_id}`, {
      method: 'POST',
      body: params
    }).then((response) => {
      this.clearErrorMessage();
      console.log(response);
      if (response)
        this.allFlock = response
    }).catch((error) => {
      if (error && error.errors) {
        this.errors.fields = error.errors;
        this.errors.message = error.message || 'Erro de validação.';
      } else {
        this.errors.message = 'Erro interno do servidor.';
      }
    }).finally(() => {
      this.loading.fetchingAnimals = false;
    })
  },

  async deleteAnimal(animal_id: string | number) {
    this.loading.deletingAnimal = true;

    await useAuthFetch(`/animals/${animal_id}`, {
      method: 'DELETE',
    }).then((response) => {
      this.clearErrorMessage();
      console.log(response);
      if (response)
        console.log(response);
      this.fetchAnimals()
      // this.allFlock = response
    }).catch((error) => {
      if (error && error.errors) {
        this.errors.fields = error.errors;
        this.errors.message = error.message || 'Erro de validação.';
      } else {
        this.errors.message = 'Erro interno do servidor.';
      }
    }).finally(() => {
      this.loading.deletingAnimal = false;
    })
  },

  clearErrorMessage() {
    this.errors.message = null
  },
}
