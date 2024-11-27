<template>
  <DataTable
      v-model:expandedRows="expandedRows"
      v-model:selection="selected"
      :value="flock"
      class="overflow-x-auto"
      dataKey="id"
      empty-message="Nenhum animal encontrado"
      scrollHeight="45vh"
      scrollable
      selectionMode="multiple"
  >
    <template #empty>
      <div class="flex flex-col justify-center items-center">
        <img
            alt="404"
            class="w-52"
            src="~/assets/images/app/404-cow.png"
        >
        <h1>Oops! Nenhum animal encontrado</h1>
      </div>
    </template>
    <Column
        expander
        style="width: 5rem"
    />
    <Column
        headerStyle="width: 3rem"
        selectionMode="multiple"
    ></Column>
    <Column
        field="code"
        header="Código"
    />
    <Column header="Imagem">
      <template #body="slotProps">
        <img
            alt="slotProps.data.image"
            class="w-24 rounded"
            src="~/assets/images/app/login.jpg"
        />
      </template>
    </Column>
    <Column
        field="name"
        header="Name"
    >
      <template #body="{data}">
        <div class="flex gap-2 items-center">
          <font-awesome-icon
              :class="sexIconClass(data.sex)"
              :icon="['fas', sexIcon(data.sex)]"
              size="lg"
          />
          <div class="flex flex-col">
            <p class="font-bold">{{ data.name }}</p>
            <span class="text-sm text-secondary-300">{{ data.classification }}</span>
          </div>
        </div>
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
        field="born_date"
        header="Age"
        sortable
    >
      <template #body="{data}">
        {{ getAge(data.born_date) }}
      </template>
    </Column>
    <Column
        field="action"
        header="Ações"
    >
      <template #body="{data}">
        <datalist-action-dropdown
            :data="data"
            :link-list="[
              {
                label: 'Ficha técnica',
                icon: ['fas', 'newspaper'],
                route: `/animals/${data.id}`
              },
              {
                label: 'Deletar',
                icon: ['fas', 'trash'],
                action: 'confirm-delete'
              }
          ]"
            @delete="(item) => deleteAnimal(item)"
        />
      </template>
    </Column>
    <template #expansion="slotProps">
      <div class="p-4 flex flex-col gap-5">
        <h5>Detalhes de
          <span class="font-bold">{{ slotProps.data.name }}</span>
        </h5>
        <ul class="p-2 border border-1 border-secondary-200 rounded-2xl">
          <li class="flex gap-2 p-3">
            <label class="">Nascimento:</label>
            <span class="font-bold">{{ moment(slotProps.data.born_date).format('MM/DD/YYYY') }}</span>
          </li>
          <li class="flex gap-2 p-3">
            <label class="">Classificação:</label>
            <span class="font-bold">{{ slotProps.data.classification || 'Desconhecida' }}</span>
          </li>
          <li class="flex gap-2 p-3">
            <label class="">Mãe:</label>
            <span class="font-bold">{{ slotProps.data.mother.name || 'Desconhecida' }}</span>
          </li>
          <li class="flex gap-5 p-3">
            <label class="">Pai:</label>
            <span class="font-bold">{{ slotProps.data.father.name || 'Desconhecida' }}</span>
          </li>
        </ul>
      </div>
    </template>
    <template #footer> Rebanho total em {{ statePagination.total }} animais.</template>
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
import {useFlockStore} from "~/stores/flock/flockStore";
import moment from "moment";
import DatalistActionDropdown from "~/components/animals/flock-datalist/datalist-action-dropdown.vue";
import {useRouteQuery} from "@vueuse/router";

const store = useFlockStore()

const flock = computed(() => store.allFlock);
const statePagination = computed(() => store.pagination);

const selected = ref()
const expandedRows = ref({});

const perPage = useRouteQuery('per_page', 10)
const currentPage = useRouteQuery('current_page', 1)

const getAge = (bornDate: string) => {
  const date = moment(bornDate, 'YYYY-MM-DD');
  if (!date.isValid())
    return 'Idade inválida'
  const today = moment();

  const age = moment.duration(today.diff(date))
  return `${age.humanize()}`
}

const tagColor = ((status: string) => {
  switch (status) {
    case 'sold':
      return 'info'
    case 'alive':
      return 'success'
    case 'dead':
      return 'danger'
    default:
      return 'secondary'
  }
});

const sexIcon = (sex: string) => {
  return sex === 'female' ? 'venus' : 'mars'
}
const sexIconClass = (sex: string) => {
  return sex === 'female' ? 'text-red-500' : 'text-green-500'
}

async function deleteAnimal(animal_id: string | number) {
  await store.deleteAnimal(animal_id)
}

</script>


<style scoped>

</style>