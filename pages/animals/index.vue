<template>
  <div class="h-full flex flex-col gap-5 pb-2">
    <div class="card p-5 flex flex-col-reverse md:flex-row items-center justify-between gap-4">
      <div>
        <h2 class="text-lg font-bold">
          <font-awesome-icon
              :icon="['fas', 'plus']"
              class="text-primary"
          />
          Rebanho
        </h2>
        <p class="text-gray-500">Lorem ipsum lorem fusce eleifend inceptos bibendum </p>
      </div>
      <Button
          aria-label="Star"
          class="w-52"
          icon="fa fa-plus"
          label="Novo"
          severity="primary"
          @click="router.push('animals/create')"
      />
    </div>
    <div class="card py-5 flex flex-col gap-5 items-center justify-between h-full">
      <flock-filters/>
      <div class="flex flex-col-reverse md:flex-row justify-center items-center w-full gap-4">
        <div class="w-full">
          <flock-table/>
        </div>
      </div>
    </div>
  </div>
</template>
<script
    lang="ts"
    setup
>
import FlockTable from "~/components/animals/flock-datalist/flock-table.vue";
import FlockFilters from "~/components/animals/flock-datalist/flock-filters.vue";
import {useRouteParams, useRouteQuery} from "@vueuse/router";
import {useFlockStore} from "~/stores/flock/flockStore";
import {useUrlSearchParams} from "@vueuse/core";
import moment from "moment/moment";
import {ref} from "vue";

definePageMeta({
  middleware: "auth",
  title: "Animals",
})

onMounted(() => {
  loadAnimals()
});

const router = useRouter()

const params = ref({
  name: useRouteQuery("name", null),
  code: useRouteQuery("code", null),
  classification: useRouteQuery("classification", null),
  born_date: useRouteQuery("born_date", null),
  born_date_from: useRouteQuery("born_date_from", null),
  born_date_to: useRouteQuery("born_date_to", null),
  age: useRouteQuery("age", null),
  sex: useRouteQuery("sex", null),
  status: useRouteQuery("status", null),
  mother_id: useRouteQuery("mother_id", null),
  father_id: useRouteQuery("father_id", null),
  current_page: useRouteQuery("current_page", 1),
  per_page: useRouteQuery("per_page", 10),
});

const store = useFlockStore();

watch(() => params, () => {
  loadAnimals()
}, {deep: true});

async function loadAnimals() {
  await store.fetchAnimals(params.value)
}

</script>


<style scoped>

</style>