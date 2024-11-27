<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
    <div class="mt-4">
      <label
          class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
          for="name"
      >
        Fêmea Matriz
        <span class="text-danger text-xs align-super">*</span>
      </label>
      <Select
          v-model="form.female_id"
          :invalid="errors['female_id'] && errors['female_id'].length > 0"
          :loading="loadingFemales"
          :options="availableFemales"
          :show-clear="!isEditing"
          class="w-full"
          empty-message="Nenhuma fêmea apta a reprodução encontrada"
          fluid
          option-label="name"
          option-value="id"
          placeholder="Selecione uma fêmea apta a reprodução"
      />
      <small
          v-if="errors['female_id'] && errors['female_id'].length > 0"
          class="text-danger-600"
      >{{ errors['female_id'][0] }}</small>
    </div>

    <div class="mt-4">
      <label
          class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
          for="name"
      >
        Macho Reprodutor
        <span class="text-danger text-xs align-super">*</span>
      </label>
      <Select
          v-model="form.male_id"
          :invalid="errors['male_id'] && errors['male_id'].length > 0"
          :loading="loadingMales"
          :options="availableMales"
          :show-clear="!isEditing"
          class="w-full"
          empty-message="Nenhum reprodutor apto a reprodução encontrado"
          fluid
          option-label="name"
          option-value="id"
          placeholder="Selecione um macho reprodutor apta a reprodução"
      />
      <small
          v-if="errors['female_id'] && errors['female_id'].length > 0"
          class="text-danger-600"
      >{{ errors['female_id'][0] }}</small>
    </div>

    <div class="mt-4">
      <label
          class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
          for="name"
      >Data da ocorrência
        <span class="text-danger text-xs align-super">*</span>
      </label>
      <DatePicker
          v-model="form.occurrence_date"
          :invalid="errors['occurrence_date'] && errors['occurrence_date'].length > 0"
          :max-date="new Date()"
          class="w-full"
          dateFormat="dd/mm/yy"
      />
      <small
          v-if="errors['occurrence_date'] && errors['occurrence_date'].length > 0"
          class="text-danger-600"
      >{{ errors['occurrence_date'][0] }}</small>
    </div>

    <div class="mt-4">
      <label
          class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
          for="name"
      >Data da monta
        <span class="text-danger text-xs align-super">*</span>
      </label>
      <DatePicker
          v-model="form.coverage_date"
          :invalid="errors['coverage_date'] && errors['coverage_date'].length > 0"
          :max-date="new Date()"
          class="w-full"
          dateFormat="dd/mm/yy"
      />
      <small
          v-if="errors['coverage_date'] && errors['coverage_date'].length > 0"
          class="text-danger-600"
      >{{ errors['coverage_date'][0] }}</small>
    </div>

    <div class="mt-4">
      <label
          class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
          for="name"
      >Status
        <span class="text-danger text-xs align-super">*</span>
      </label>
      <Select
          v-model="form.status"
          :invalid="errors['status'] && errors['status'].length > 0"
          :loading="false"
          :options="availableBreedingStatus"
          :show-clear="!isEditing"
          class="w-full"
          empty-message="Nenhuma status encontrado"
          fluid
          option-label="label"
          option-value="value"
          placeholder="Status"
      />
      <small
          v-if="errors['status'] && errors['status'].length > 0"
          class="text-danger-600"
      >{{ errors['status'][0] }}</small>
    </div>

    <div class="mt-4 xl:col-span-2">
      <label
          class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
          for="name"
      >Tipo de cobertura
        <span class="text-danger text-xs align-super">*</span>
      </label>
      <div class="flex flex-wrap gap-4">
        <div class="flex items-center">
          <RadioButton
              v-model="form.cover_method"
              :is-invalid="errors['cover_method'] && errors['cover_method'].length > 0"
              inputId="natural"
              name="cover_method"
              value="natural"
          />
          <label
              class="ml-2"
              for="natural"
          >Natural (Touro ou Rufião)</label>
        </div>
        <div class="flex items-center">
          <RadioButton
              v-model="form.cover_method"
              :is-invalid="errors['cover_method'] && errors['cover_method'].length > 0"
              inputId="artificial"
              name="cover_method"
              value="artificial"
          />
          <label
              class="ml-2"
              for="artificial"
          >Inseminação Artificial</label>
        </div>
      </div>
      <small
          v-if="errors['cover_method'] && errors['cover_method'].length > 0"
          class="text-danger-600"
      >{{ errors['cover_method'][0] }}</small>
    </div>

  </div>
</template>
<script
    lang="ts"
    setup
>
import {useBreedingStore} from "~/stores/breeding/breeding";
import {availableBreedingStatus} from "~/constants/breedings";

const props = defineProps({
  modelValue: {type: Object, default: null},
  old: {type: Object, default: null}
})

const emits = defineEmits(['update:modelValue'])

const form = ref({
  occurrence_date: undefined,
  coverage_date: undefined,
  cover_method: undefined,
  status: 'pending',
  female_id: '',
  male_id: '',
})

const store = useBreedingStore()

onMounted(() => {
  // form.value = props.old
  if (props.old) {
    form.value = props.old
  }
  store.fetchAvailableFemalesForReproduction()
  store.fetchAvailableMalesForReproduction()
})

const availableFemales = computed(() => store.availableFemalesForReproduction);
const availableMales = computed(() => store.availableMalesForReproduction);
const errors = computed(() => store.errors.fields);
const loadingFemales = computed(() => store.loading.fetchingAvailableFemalesForReproduction);
const loadingMales = computed(() => store.loading.fetchingAvailableMalesForReproduction);

const isEditing = computed(() => props.modelValue && props.modelValue.id);

watch(() => form.value, (val) => {
  emits('update:modelValue', val);
}, {deep: true});

</script>


<style scoped>

</style>