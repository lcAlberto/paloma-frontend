<template>
  <div class="flex flex-col w-full bg-secondary-50 px-5 rounded-2xl h-[69vh] overflow-auto">
    <div class="flex flex-row justify-between">
      <div class="mt-4 flex flex-col">
        <label class="text-sm">Nome</label>
        <span class="font-bold text-lg text-primary">{{ props.data.name }}</span>
      </div>
      <div class="mt-4 flex flex-col">
        <confirm-delete-dialog
            :data="props.data"
            class="w-full"
            @accept="(payload) => deleteAnimal()"
        >
          <template #activator="{toggleMenu}">
            <Button
                :loading="loading"
                class="w-full capitalize"
                severity="danger"
                type="button"
                @click="toggleMenu"
            >
              <font-awesome-icon :icon="['fas', 'trash']"/>
              <span class="hidden md:block">Excluir dos registros</span>
            </Button>
          </template>
        </confirm-delete-dialog>
      </div>
    </div>
    <div class="mt-4 flex flex-col">
      <label class="text-sm">Código</label>
      <span class="font-bold text-lg">{{ props.data.code }}</span>
    </div>
    <div class="mt-4 flex flex-col">
      <label class="text-sm">Raça</label>
      <span class="font-bold text-lg">{{ props.data.breed?.value || props.data.breed }}</span>
    </div>
    <div class="mt-4 flex flex-col">
      <label class="text-sm">Sexo</label>
      <span class="font-bold text-lg">
        <font-awesome-icon
            v-if="props.data.sex === 'male'"
            :icon="['fas', 'mars']"
        />
        <font-awesome-icon
            v-else
            :icon="['fas', 'venus']"
        />
        {{ props.data.sex }}
      </span>
    </div>
    <div class="mt-4 flex flex-col">
      <label class="text-sm">Classificação</label>
      <span class="font-bold text-lg">{{ props.data.classification }}</span>
    </div>
    <div class="mt-4 flex flex-col">
      <label class="text-sm">Status</label>
      <span class="font-bold text-lg">{{ props.data.status }}</span>
    </div>
    <div class="mt-4 flex flex-col">
      <label class="text-sm">Data de nascimento</label>
      <span class="font-bold text-lg">{{ new Date(props.data.born_date).toLocaleDateString() }}</span>
    </div>
    <div class="mt-4 flex flex-col">
      <label class="text-sm">Mãe</label>
      <span
          v-if="mother && mother.name"
          class="font-bold"
      >
        {{ mother.name }}
      </span>
      <span
          v-else
          class="font-bold"
      >
        Desconhecida
      </span>
    </div>
    <div class="mt-4 flex flex-col">
      <label class="text-sm">Pai</label>
      <span
          v-if="father && father.name"
          class="font-bold"
      >
        {{ father.name }}
      </span>
      <span
          v-else
          class="font-bold"
      >
        Desconhecido
      </span>
    </div>
  </div>
</template>
<script
    lang="ts"
    setup
>
import {useFlockStore} from "~/stores/flock/flockStore";
import ConfirmDeleteDialog from "~/components/animals/flock-datalist/confirm-delete-dialog.vue";

const props = defineProps({
  data: {type: Object, required: true}
})

const store = useFlockStore()

const mother = computed(() => store.availableMothers?.find((mother: object) => mother.id === props.data?.mother_id));
const father = computed(() => store.availableFathers?.find((father: object) => father.id === props.data?.father_id));
const loading = computed(() => store.loading.deletingAnimal)

async function deleteAnimal() {
  await store.deleteAnimal(`${props.data.value.id}`)
}

</script>


<style scoped>

</style>