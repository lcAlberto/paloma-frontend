<template>
  <div class="flex w-full">
    <div class="flex flex-col lg:flex-row justify-between w-full bg-secondary-50 px-5 rounded-2xl h-[69vh] overflow-auto">
      <div class="flex flex-col overflow-auto">
        <div class="flex flex-row justify-between">
          <div class="mt-3 flex flex-col">
            <label class="text-sm">Fêmea/Matriz</label>
            <span class="font-bold text-lg text-primary">{{ props.data.female?.name }}</span>
          </div>
        </div>
        <div
            v-if="props.data.date_birth"
            class="mt-4 flex flex-col"
        >
          <label class="text-sm">Data do parto:</label>
          <span class="font-bold text-lg">{{ props.data.date_birth }}</span>
        </div>
        <div class="mt-3 flex flex-col">
          <label class="text-sm">Status:</label>
          <span class="font-bold text-lg">{{ props.data.status }}</span>
        </div>
        <div class="mt-3 flex flex-col">
          <label class="text-sm">Parto Previsto para:</label>
          <span class="font-bold text-lg">{{ moment(props.data.date_birth_prediction).format('DD/MM/YYYY') }}</span>
        </div>
        <div class="mt-3 flex flex-col">
          <label class="text-sm">Data da ocorrência:</label>
          <span class="font-bold text-lg">{{ moment(props.data.occurrence_date).format('DD/MM/YYYY') }}</span>
        </div>
        <div class="mt-3 flex flex-col">
          <label class="text-sm">Data da monta:</label>
          <span class="font-bold text-lg">{{ moment(props.data.coverage_date).format('DD/MM/YYYY') }}</span>
        </div>
        <div class="mt-3 flex flex-col">
          <label class="text-sm">Tipo de cobertura:</label>
          <span class="font-bold text-lg">{{ props.data.cover_method }}</span>
        </div>
        <div class="mt-3 flex flex-col">
          <label class="text-sm">Touro reprodutor:</label>
          <span class="font-bold text-lg">{{ props.data?.male?.name || 'Desconhecido' }}</span>
        </div>
        <div class="mt-3 flex flex-col">
          <label class="text-sm">Última atualização:</label>
          <span class="font-bold text-lg">{{ moment(props.data?.updated_at).format('DD/MM/YYYY') }}</span>
        </div>
        <div class="mt-3 flex flex-col">
          <label class="text-sm">Registrado em:</label>
          <span class="font-bold text-lg">{{ moment(props.data?.created_at).format('DD/MM/YYYY') }}</span>
        </div>
      </div>
      <div>
        <div>
          <div class="mt-3 flex flex-col">
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
      </div>
    </div>
  </div>
</template>
<script
    lang="ts"
    setup
>
import {useFlockStore} from "~/stores/flock/flockStore";
import ConfirmDeleteDialog from "~/components/animals/flock-datalist/confirm-delete-dialog.vue";
import moment from "moment";

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