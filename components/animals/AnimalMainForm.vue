<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
    <div class="mt-4">
      <label
          class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
          for="name"
      >Nome
        <span class="text-danger text-xs align-super">*</span>
      </label>
      <InputText
          v-model="form.name"
          :invalid="errors['name'] && errors['name'].length > 0"
          class="w-full"
      />
      <small
          v-if="errors['name'] && errors['name'].length > 0"
          class="text-danger-600"
      >{{ errors['name'][0] }}</small>
    </div>

    <div class="mt-4">
      <label
          class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
          for="name"
      >Código
        <span class="text-danger text-xs align-super">*</span>
      </label>
      <InputText
          v-model="form.code"
          :invalid="errors['code'] && errors['code'].length > 0"
          class="w-full"
      />
      <small
          v-if="errors['code'] && errors['code'].length > 0"
          class="text-danger-600"
      >{{ errors['code'][0] }}</small>
    </div>

    <div class="mt-4">
      <label
          class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
          for="name"
      >Data de nascimento
        <span class="text-danger text-xs align-super">*</span>
      </label>
      <DatePicker
          v-model="form.born_date"
          :invalid="errors['born_date'] && errors['born_date'].length > 0"
          :max-date="new Date()"
          class="w-full"
          dateFormat="dd/mm/yy"
      />
      <small
          v-if="errors['born_date'] && errors['born_date'].length > 0"
          class="text-danger-600"
      >{{ errors['born_date'][0] }}</small>
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
          :options="availableStatus"
          :show-clear="!isEditing"
          class="w-full"
          empty-message="Nenhuma raça encontrada"
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
      >Sexo
        <span class="text-danger text-xs align-super">*</span>
      </label>
      <div class="flex flex-wrap gap-4">
        <div class="flex items-center">
          <RadioButton
              v-model="form.sex"
              :is-invalid="errors['sex'] && errors['sex'].length > 0"
              inputId="male"
              name="sex"
              value="male"
          />
          <label
              class="ml-2"
              for="male"
          >Macho</label>
        </div>
        <div class="flex items-center">
          <RadioButton
              v-model="form.sex"
              :is-invalid="errors['sex'] && errors['sex'].length > 0"
              inputId="female"
              name="sex"
              value="female"
          />
          <label
              class="ml-2"
              for="female"
          >Fêmea</label>
        </div>
      </div>
      <small
          v-if="errors['sex'] && errors['sex'].length > 0"
          class="text-danger-600"
      >{{ errors['sex'][0] }}</small>
    </div>

    <div class="mt-4">
      <label
          class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
          for="name"
      >Classificação
        <span class="text-danger text-xs align-super">*</span>
      </label>
      <Select
          v-model="form.classification"
          :invalid="errors['classification'] && errors['classification'].length > 0"
          :loading="false"
          :options="classificationOptionsBySex"
          :show-clear="!isEditing"
          class="w-full"
          empty-message="Nenhuma opção encontrada"
          fluid
          option-label="label"
          option-value="value"
          placeholder="Classificação"
          show-clear
      >
        <template #option="slotProps">
          <div
              :v-tooltip="slotProps.option.tooltip"
              class="flex items-center"
          >
            <span>{{ slotProps.option.label }}</span>
          </div>
        </template>
      </Select>
      <small
          v-if="errors['classification'] && errors['classification'].length > 0"
          class="text-danger-600"
      >{{ errors['classification'][0] }}</small>
    </div>

    <div class="mt-4">
      <label
          class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
          for="name"
      >Raça
        <span class="text-danger text-xs align-super">*</span>
      </label>

      <Select
          v-model="form.breed"
          :invalid="errors['breed'] && errors['breed'].length > 0"
          :options="availableBreeds"
          :show-clear="!isEditing"
          class="w-full"
          empty-message="Nenhuma raça encontrada"
          fluid
          option-label="value"
          option-value="value"
          placeholder="Raça"
      />
      <small
          v-if="errors['breed'] && errors['breed'].length > 0"
          class="text-danger-600"
      >{{ errors['breed'][0] }}</small>
    </div>

    <div class="mt-4">
      <label
          class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
          for="name"
      >Mãe</label>
      <Select
          v-model="form.mother_id"
          :is-invalid="errors['mother_id'] && errors['mother_id'].length > 0"
          :loading="loadingMothers"
          :options="mothers"
          class="w-full"
          empty-message="Nenhum animal encontrado"
          fluid
          option-label="name"
          option-value="id"
          placeholder="Selecione"
          show-clear
      />
      <small
          v-if="errors['mother_id'] && errors['mother_id'].length > 0"
          class="text-danger-600"
      >{{ errors['mother_id'] && errors['mother_id'].length > 0 }}</small>
    </div>

    <div class="mt-4">
      <label
          class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
          for="name"
      >Pai</label>
      <Select
          v-model="form.father_id"
          :is-invalid="errors['father_id'] && errors['father_id'].length > 0"
          :loading="loadingFathers"
          :options="fathers"
          class="w-full"
          empty-message="Nenhum animal encontrado"
          fluid
          option-label="name"
          option-value="id"
          placeholder="Selecione"
          show-clear
      />
      <small
          v-if="errors['father_id'] && errors['father_id'].length > 0"
          class="text-danger-600"
      >{{ errors['father_id'][0] }}</small>
    </div>
  </div>
</template>
<script
    lang="ts"
    setup
>
import {availableBreeds, availableClassifications, availableStatus} from "~/constants/animals";
import {useFlockStore} from "~/stores/flock/flockStore";

const props = defineProps({
  modelValue: {type: Object, default: null},
  old: {type: Object, default: null}
})

const emits = defineEmits(['update:modelValue'])

const form = ref({
  name: '',
  code: '',
  sex: 'female',
  breed: '',
  classification: '',
  status: 'alive',
  image: null,
  born_date: new Date().toLocaleDateString(),
  father_id: null,
  mother_id: null
})

const store = useFlockStore()

onMounted(() => {
  console.log(props.old, form.value);
  if (props.old) {
    form.value = props.old
  }
  store.fetchMothers()
  store.fetchFathers()
})

const mothers = computed(() => store.availableMothers);
const fathers = computed(() => store.availableFathers);
const errors = computed(() => store.errors.fields);
const loadingMothers = computed(() => store.loading.fetchingMothers);
const loadingFathers = computed(() => store.loading.fetchingFathers);

const isEditing = computed(() => props.modelValue && props.modelValue.id);

const classificationOptionsBySex = computed(() => {
  if (form.value.sex)
    return availableClassifications.filter(opt => opt.sex === form.value.sex)
  return availableClassifications
})

watch(() => form.value, (val) => {
  emits('update:modelValue', val);
}, {deep: true});

</script>


<style scoped>

</style>