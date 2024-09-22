<template>
  <div class="p-0">
    <div class="bg-[url('~/assets/images/app/login.jpg')] bg-cover bg-center w-full h-72 -top-1 left-0 shadow-3xl rounded-2xl rounded-b-none absolute"/>
    <div class="custom-bg-overlay bg-cover bg-center w-full h-72 -top-1 left-0 shadow-3xl rounded-2xl rounded-b-none absolute flex flex-row justify-between items-end text-white p-10">
      <div class="flex flex-col">
        <h1 class="text-5xl font-extrabold">{{ animalData.name }}</h1>
      <p>{{ animalData.classification }}</p>
      </div>
      <button class="">
        <font-awesome-icon :icon="['fas', 'camera-retro']"/>
      </button>

    </div>
    <div class="w-full min-h-64 bg-primary shadow-indigo-950 shadow-2xl mb-10"></div>
    <div class="relative h-[80vh] mt-0 py-0 flex flex-col items-center gap-4 justify-evenly overflow-y-auto">
      <layouts-ui-elements-head-cards-metrics :items="animalMetrics"/>
      <div class="w-full">
        <animals-animal-main-form v-model="animalData"/>
      </div>
    </div>
      <p>Animal: {{ animal_id }}</p>
      {{ loading }}
      {{ animalData }}
  </div>
</template>

<script
    lang="ts"
    setup
>
import {useFlockStore} from "~/stores/flock/flockStore";

const route = useRoute()
const store = useFlockStore()

const animal_id = route.params
const animalData = computed(() => store.getAnimal)
const loading = computed(() => store.getLoading('fetchingAnimal'))

onBeforeMount(async () => {
  if (animal_id && animal_id.id)
    await store.fetchAnimal(`${animal_id.id}`)
})

const animalMetrics = ref([
  {
    title: 'Tempo médio de produção',
    data: '5 anos',
    icon: 'fa fa-user',
    theme: 'primary',
    legend: {
      label: 'Tempo médio de descanso',
      icon: 'fas fa-umbrella-beach',
      data: '37 dias',
      theme: 'green-500',
    }
  },
  //
  {
    title: 'Partos bem sucedidos',
    data: '5',
    icon: 'fas fa-baby-carriage',
    theme: 'primary',
    legend: {
      label: 'Partos mau sucedidos',
      icon: 'fas fa-umbrella-beach',
      data: '1',
      theme: 'danger'
    }
  },
  //
  {
    title: 'Última Cria',
    data: '10/06/2024',
    icon: 'fas fa-calendar',
    theme: 'primary',
    legend: {
      label: 'Dias produzindo desde então',
      icon: 'fas fa-umbrella-beach',
      data: '59',
      theme: 'warning-800'
    }
  }
]);
</script>

<style scoped>
.custom-bg-overlay {
  background: rgb(0, 0, 0);
  background: linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(63, 21, 213, 0.5018382352941176) 50%, rgba(255, 255, 255, 0) 100%);
}
</style>