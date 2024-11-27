<template>
  <div class="h-full flex flex-col gap-5 pb-2">
    <div class="card p-5 flex flex-col-reverse md:flex-row items-center justify-between gap-4">
      <div>
        <h2 class="text-lg font-bold">
          <font-awesome-icon
              :icon="['fas', 'plus']"
              class="text-primary"
          />
          Produção
        </h2>
        <p class="text-gray-500">Lorem ipsum lorem fusce eleifend inceptos bibendum </p>
      </div>
      <Button
          aria-label="Star"
          class="w-52"
          icon="fa fa-plus"
          label="Novo"
          severity="primary"
          @click="router.push('breedings/create')"
      />
    </div>
    <div class="card py-5 flex flex-col gap-5 items-center justify-between h-full">
      <breedings-filters/>
      <div class="flex flex-col-reverse md:flex-row justify-center items-center w-full gap-4">
        <Tabs
            v-model:value="params.status"
            class="w-full"
        >
          <TabList class="flex flex-col items-start w-full">
            <Tab value="pending">Pendentes</Tab>
            <Tab value="cleaning">Hormonal</Tab>
            <Tab value="success">Bem sucedidos</Tab>
            <Tab value="abortion">Mal sucedidos</Tab>
          </TabList>
          <TabPanels class="!p-0">
            <TabPanel value="pending">
              <pregnancies-table status="pending"/>
            </TabPanel>
            <TabPanel value="cleaning">
              <pregnancies-table status="cleaning"/>
            </TabPanel>
            <TabPanel value="success">
              <pregnancies-table status="success"/>
            </TabPanel>
            <TabPanel value="abortion">
              <pregnancies-table status="aborted"/>
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
import PregnanciesTable from "~/components/production-cicle/pregnancies-datalist/pregnancies-table.vue";
import {useBreedingStore} from "~/stores/breeding/breeding";
import {useRouteQuery} from "@vueuse/router";
import BreedingsFilters from "~/components/production-cicle/pregnancies-datalist/breedings-filters.vue";

definePageMeta({
  middleware: "auth",
  title: "Breedings",
})

onMounted(() => {
  loadBreedings()
});

const router = useRouter()
const store = useBreedingStore()

const params = ref({
  occurrence_date: useRouteQuery("occurrence_date", null),
  coverage_date: useRouteQuery("coverage_date", null),
  date_birth_prediction: useRouteQuery("date_birth_prediction", null),
  date_birth: useRouteQuery("date_birth", null),
  cover_method: useRouteQuery("cover_method", null),
  status: useRouteQuery("status", 'pending'),
  female_id: useRouteQuery("female_id", null),
  male_id: useRouteQuery("male_id", null),
  current_page: useRouteQuery("current_page", 1),
  per_page: useRouteQuery("per_page", 10)
})

watch(() => params, () => {
  loadBreedings()
}, {deep: true});

async function loadBreedings() {
  await store.fetchBreedings(params.value)
}

</script>


<style scoped>

</style>