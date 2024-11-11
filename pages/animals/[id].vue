<template>
  <div class="flex flex-col lg:flex-row items-start gap-4 overflow-y-auto w-full h-[85vh] pb-2">
    <div class="card py-0 lg:py-5 w-full h-full">
      <Tabs
          v-if="animalData"
          class="mt-5 h-full"
          value="0"
      >
        <TabList>
          <Tab value="0">Ficha Técnica</Tab>
          <Tab value="1">Editar</Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="0">
            <div class="flex flex-col-reverse xl:flex-row items-start gap-5 justify-between">
              <technical-sheet :data="animalData"/>
            </div>
          </TabPanel>
          <TabPanel
              class="flex flex-col justify-center items-center"
              value="1"
          >
            <div class="w-full xl:w-10/12">
              <animals-animal-main-form
                  v-model="formData"
                  :old="animalData"
              />
            </div>
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
    <div class="w-full lg:w-1/3 flex flex-col gap-2">
      <animal-image-form/>
      <layouts-ui-elements-head-cards-metrics :items="animalMetrics"/>
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
import AnimalImageForm from "~/components/animals/animal-image-form.vue";
import {useRouter} from "#app";

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
  console.log(animal_id);
  if (animal_id) {
    await store.fetchMothers()
    await store.fetchFathers()
    await store.fetchAnimal(`${animal_id}`)
    formData.value = animalData
  }
})

async function submit() {
  await store.updateAnimal(formData.value, `${animal_id}`)
  const router = useRouter()
  router.push('/animals')
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
      label: 'Dias produzindo',
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