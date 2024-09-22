<template>
  <div class="grid lg:grid-cols-2 gap-4">
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
      >Raça
        <span class="text-danger text-xs align-super">*</span>
      </label>

      <Select
          v-model="form.breed"
          :invalid="errors['breed'] && errors['breed'].length > 0"
          :loading="false"
          :options="availableBreeds"
          class="w-full"
          empty-message="Nenhuma raça encontrada"
          fluid
          option-label="value"
          placeholder="Raça"
          show-clear
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
          :options="availableClassifications.filter(opt => opt.sex === form.sex)"
          class="w-full"
          empty-message="Nenhuma opção encontrada"
          fluid
          option-label="label"
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
          >Status
            <span class="text-danger text-xs align-super">*</span>
          </label>
          <Select
              v-model="form.status"
              :invalid="errors['status'] && errors['status'].length > 0"
              :loading="false"
              :options="availableStatus"
              class="w-full"
              empty-message="Nenhuma raça encontrada"
              fluid
              option-label="label"
              placeholder="Status"
              show-clear
          />
          <small
              v-if="errors['status'] && errors['status'].length > 0"
              class="text-danger-600"
          >{{ errors['status'][0] }}</small>
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

const emits = defineEmits(['update:modelValue'])

const form = ref({
  name: '',
  code: '',
  sex: 'female',
  breed: '',
  classification: '',
  status: null,
  image: null,
  born_date: new Date().toLocaleDateString(),
  father_id: null,
  mother_id: null
})

const store = useFlockStore()

const mothers = computed(() => store.getMothers);
const fathers = computed(() => store.getFathers);

const errors = computed(() => store.getFormErrors);
const loadingMothers = computed(() => store.getLoading('fetchingMothers'));
const loadingFathers = computed(() => store.getLoading('fetchingFathers'));

onMounted(() => {
  fetchMothers()
  fetchFathers()
})

async function fetchMothers() {
  await store.fetchMothers()
}

async function fetchFathers() {
  await store.fetchFathers()
}

watch(() => form, (val) => {
  emits('update:modelValue', val.value);
}, {deep: true});

</script>


<style scoped>

</style>