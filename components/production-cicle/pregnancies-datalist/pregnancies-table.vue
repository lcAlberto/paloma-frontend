<template>
  <DataTable
      v-model:expandedRows="expandedRows"
      v-model:selection="selected"
      :value="pregnancies"
      class="overflow-x-auto"
      dataKey="id"
      empty-message="Nenhum animal encontrado"
      scrollHeight="50vh"
      scrollable
      selectionMode="multiple"
  >
    <template #empty>
      <div class="flex flex-col justify-center items-center">
        <img
            alt="404"
            class="w-52"
            src="../../../assets/images/app/404-cow.png"
        >
        <h1>Oops! Nenhum animal encontrado</h1>
      </div>
    </template>
    <Column
        expander
        headerStyle="width: 1rem"
    />
    <Column
        headerStyle="width: 1rem"
        selectionMode="multiple"
    />
    <Column
        field="female"
        header="Fêmea"
    >
      <template #body="slotProps">
        <div class="flex flex-col justify-center items-center">
          <img
              alt="slotProps.data.image"
              class="w-24 rounded"
              src="../../../assets/images/app/login.jpg"
          />
          <p>{{ slotProps.data.female.name }}</p>
        </div>
      </template>
    </Column>
    <Column
        field="male"
        header="Macho"
    >
      <template #body="slotProps">
        <p>{{ slotProps.data.male.name }}</p>
      </template>
    </Column>
    <Column header="Status">
      <template #body="slotProps">
        <Tag
            :severity="tagColor(slotProps.data.status)"
            :value="slotProps.data.status"
        />
      </template>
    </Column>
    <Column
        field="date_birth_prediction"
        header="Monta"
        sortable
    >
      <template #body="{data}">
        {{ moment(data.coverage_date).format('DD/MM/YYYY') }}
      </template>
    </Column>
    <Column
        field="occurrence_date"
        header="Parto Previsto"
        sortable
    >
      <template #body="{data}">
        {{ moment(data.date_birth_prediction).format('DD/MM/YYYY') }}
      </template>
    </Column>
    <Column
        field="action"
        header="Ações"
    >
      <template #body="{data}">
        <datalist-action-dropdown
            :data="{
              id: data.id,
            }"
            :link-list="[
              {
                label: 'Detalhes',
                icon: ['fas', 'newspaper'],
                route: `/breedings/${data.id}`
              },
              {
                label: 'Deletar',
                icon: ['fas', 'trash'],
                action: 'confirm-delete'
              }
            ]"
            @delete="(item) => deleteBreedings(item)"
        />
      </template>
    </Column>
    <template #expansion="slotProps">
      <div class="p-4 flex flex-col gap-5">
        <h5>Detalhes do ciclo</h5>
        <ul class="p-2 border border-1 border-secondary-200 rounded-2xl">
          <li
              v-if="slotProps.data.status === 'done'"
              class="flex gap-2 p-3"
          >
            <label class="">Data do parto:</label>
            <span class="font-bold">{{ moment(slotProps.data.date_birth).format('MM/DD/YYYY') }}</span>
          </li>
          <li class="flex gap-2 p-3">
            <label class="">Previsto para:</label>
            <span class="font-bold">{{ moment(slotProps.data.date_birth_prediction).format('MM/DD/YYYY') }}</span>
          </li>
          <li class="flex gap-2 p-3">
            <label class="">Método:</label>
            <span class="font-bold">{{ slotProps.data.cover_method }}</span>
          </li>
          <li class="flex gap-2 p-3">
            <label class="">Fêmea:</label>
            <span class="font-bold">{{ slotProps.data.female.name }}</span>
          </li>
          <li class="flex gap-5 p-3">
            <label class="">Macho:</label>
            <span class="font-bold">{{ slotProps.data.male.name }}</span>
          </li>
          <li class="flex gap-2 p-3">
            <label class="">Última atualização:</label>
            <span class="font-bold">{{ moment(slotProps.data.updated_at).format('MM/DD/YYYY') }}</span>
          </li>
          <li class="flex gap-2 p-3">
            <label class="">Registrado em:</label>
            <span class="font-bold">{{ moment(slotProps.data.created_at).format('MM/DD/YYYY') }}</span>
          </li>
        </ul>
      </div>
    </template>
    <template #footer> Total de ciclos reprodutivos: {{ statePagination.total }}.</template>
  </DataTable>
  <Paginator
      :rows="parseInt(perPage)"
      :rows-per-page-options="[5, 10, 20, 100]"
      :total-records="statePagination.total"
      @page="(page) => currentPage = page.page + 1"
      @update:rows="(rows) => perPage = rows"
  />
</template>
<script
    lang="ts"
    setup
>
import moment from "moment";
import DatalistActionDropdown from "~/components/production-cicle/pregnancies-datalist/datalist-action-dropdown.vue";
import {useBreedingStore} from "~/stores/breeding/breeding";
import {useRouteQuery} from "@vueuse/router";

const props = defineProps({
  status: {type: String, required: true}
})

const store = useBreedingStore()

const selected = ref()
const expandedRows = ref({});

const perPage = useRouteQuery('per_page', 10)
const currentPage = useRouteQuery('current_page', 1)

const pregnancies = computed(() => store.breedings);
const statePagination = computed(() => store.pagination);

const tagColor = ((status: string) => {
  switch (status) {
    case 'done':
      return 'success'
      break
    case 'failed':
      return 'danger'
      break
    default:
      return 'info'
      break
  }
});

async function deleteBreedings(breeding_id: string | number) {
  await store.destroy(breeding_id)
}
</script>


<style scoped>

</style>