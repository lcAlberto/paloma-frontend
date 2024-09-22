<template>
  <DataTable
      v-model:selection="selected"
      :rows="5"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      :value="flock"
      class="overflow-x-auto"
      dataKey="id"
      paginator
      scrollHeight="50vh"
      scrollable
      selectionMode="multiple"
      tableStyle="min-width: 100%"
  >
    <Column
        headerStyle="width: 3rem"
        selectionMode="multiple"
    ></Column>
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
        field="code"
        header="Código"
    />
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
        header="Data de nascimento"
        sortable
    >
      <template #body="{data}">
        {{ moment(data.born_date).format('MM/DD/YYYY') }}
      </template>
    </Column>
    <Column
        field="mother_id"
        header="Mãe"
    >
      <template #body="{data}">
        {{ data?.mother?.name || 'Não registrado' }}
      </template>
    </Column>
    <Column
        field="father_id"
        header="Pai"
    >
      <template #body="{data}">
        {{ data?.father?.name || 'Não registrado' }}
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
    <template #footer> Rebanho total em {{ flock ? flock.length : 0 }} animais. </template>
</DataTable>
</template>
<script
    lang="ts"
    setup
>
import {useFlockStore} from "~/stores/flock/flockStore";
import moment from "moment";
import DatalistActionDropdown from "~/components/animals/flock-datalist/datalist-action-dropdown.vue";

const store = useFlockStore()

onMounted(() => {
  loadFlock()
});

const selected = ref()
const flock = computed(() => store.getFlock);


const tagColor = ((status: string) => {
  switch (status) {
    case 'sold':
      return 'info'
      break
    case 'alive':
      return 'success'
      break
    case 'dead':
      return 'danger'
      break
    default:
      return 'secondary'
      break
  }
});

const sexIcon = (sex: string) => {
  return sex === 'female' ? 'venus' : 'mars'
}
const sexIconClass = (sex: string) => {
  return sex === 'female' ? 'text-red-500' : 'text-green-500'
}


async function loadFlock() {
  await store.fetchAnimals()
}

async function deleteAnimal(animal: object) {
  await store.deleteAnimal(animal.id)
}
</script>


<style scoped>

</style>