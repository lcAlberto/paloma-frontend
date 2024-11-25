<template>
  <div class="flex flex-col lg:flex-row items-start gap-4 overflow-y-auto w-full h-[85vh] pb-2">
    <div class="card py-0 lg:py-5 w-full h-full">
      <Tabs
          v-if="breedingData"
          class="mt-5 h-full"
          value="0"
      >
        <TabList>
          <Tab value="0">Detalhes</Tab>
          <Tab value="1">Editar</Tab>
        </TabList>
        <TabPanels>
          <TabPanel
              class="flex flex-col justify-center items-center"
              value="0"
          >
            <breeding-details :data="breedingData"/>
          </TabPanel>
          <TabPanel
              class="flex flex-col justify-center items-center"
              value="1"
          >
            <div
                v-if="!loading"
                class="w-full"
            >
              <breeding-main-form
                  v-model="form"
                  :old="breedingData"
                  class="w-full"
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
  </div>
</template>

<script
    lang="ts"
    setup
>

import {useBreedingStore} from "~/stores/breeding/breeding";
import {computed, onMounted} from "vue";
import BreedingMainForm from "~/components/production-cicle/BreedingMainForm.vue";
import BreedingDetails from "~/components/production-cicle/BreedingDetails.vue";

const route = useRoute()
const store = useBreedingStore()

const breeding_id = route.params.id
const breedingData = computed(() => store.breeding)
const loading = computed(() => store.loading.fetching)

const form = ref({
  occurrence_date: undefined,
  coverage_date: undefined,
  cover_method: undefined,
  status: 'pending',
  female_id: undefined,
  male_id: undefined,
})

onMounted(async () => {
  if (breeding_id) {
    // await store.fetchMothers()
    // await store.fetchFathers()
    await store.fetchBreeding(`${breeding_id}`)
    form.value = breedingData
  }
})

async function submit() {
  await store.update(form.value, `${breeding_id}`)
}

</script>

<style scoped>
.custom-bg-overlay {
  background: rgb(0, 0, 0);
  background: linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(63, 21, 213, 0) 50%, rgba(255, 255, 255, 0) 100%);
}
</style>