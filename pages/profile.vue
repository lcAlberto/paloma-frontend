<template>
  <div class="p-0 flex flex-col justify-center items-center">
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
    <div class="relative mt-0 py-0 flex flex-col items-center gap-4 justify-evenly overflow-y-auto xl:w-8/12">
      <div class="w-full">
        <layouts-ui-elements-head-cards-metrics :items="animalMetrics"/>
        <Tabs v-if="animalData" class="mt-5" value="0">
          <TabList>
            <Tab value="0">Ficha Técnica</Tab>
            <Tab value="1">Editar</Tab>
          </TabList>
          <TabPanels>
            <TabPanel value="0">
              <div class="flex items-start justify-between">
                <technical-sheet :data="animalData"/>
                <div class="w-min">
                  <confirm-delete-dialog
                      :data="animalData"
                      @accept="(payload) => deleteAnimal()"
                  >
                    <template #activator="{toggleMenu}">
                      <Button
                          :loading="loading"
                          class="w-32 capitalize"
                          severity="danger"
                          type="button"
                          @click="toggleMenu"
                      >
                        <font-awesome-icon :icon="['fas', 'trash']" />
                        Excluir
                      </Button>
                    </template>
                  </confirm-delete-dialog>
                </div>
              </div>
            </TabPanel>
            <TabPanel class="" value="1">
              <animals-animal-main-form v-model="animalData"/>
              <div class="mt-5 w-full flex justify-center">
                <Button
                    :loading="loading"
                    class="w-64 capitalize"
                    severity="primary"
                    type="button"
                    @click="submit"
                >
                  Editar
                </Button>
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  </div>
</template>

<script
    lang="ts"
    setup
>
import {useFlockStore} from "~/stores/flock/flockStore";
import type {AnimalFormData} from "~/types/AnimalForm";
import TechnicalSheet from "~/components/animals/TechnicalSheet.vue";
import ConfirmDeleteDialog from "~/components/animals/flock-datalist/confirm-delete-dialog.vue";

const route = useRoute()
const store = useFlockStore()

const animal_id = route.params.id
const animalData = computed(() => store.animal)
const loading = computed(() => store.loading.fetchingAnimal)

const formData: Ref<AnimalFormData> = ref({
  name: undefined,
  code: undefined,
  sex: undefined,
  breed: undefined,
  classification: undefined,
  status: undefined,
  image: undefined,
  born_date: undefined,
  father_id: undefined,
  mother_id: undefined
})

onMounted(async () => {
  if (animal_id) {
    await store.fetchAnimal(`${animal_id}`)
    await store.fetchMothers()
    await store.fetchFathers()
  }
})

async function submit() {
  await store.updateAnimal(formData.value, `${animal_id}`)
}

async function deleteAnimal() {
  await store.deleteAnimal(`${animal_id}`)
}

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
  background: linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(63, 21, 213, 0) 50%, rgba(255, 255, 255, 0) 100%);
}
</style>