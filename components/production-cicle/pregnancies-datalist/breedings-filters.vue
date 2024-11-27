<template>
  <Panel
      class="w-full pb-5"
      collapsed
      header="Header"
      style="border: none"
      toggleable
  >
    <template #header>
      <div class="flex flex-row items-center justify-between flex-wrap w-full">
        <div class="flex justify-start items-center flex-wrap gap-5">
          <div class="flex flex-col w-full md:w-min">
            <label
                class="text-sm"
                for="sex"
            >Mãe</label>
            <Select
                id="sex"
                v-model="formData.female_id"
                :loading="store.loading.fetchingMothers"
                :options="store.availableMothers"
                class="w-full md:w-56"
                option-label="name"
                option-value="id"
                placeholder="Selecione"
                show-clear
            />
          </div>

          <div class="flex flex-col w-full md:w-max">
            <label
                class="text-sm"
                for="sex"
            >Método de cobertura</label>
            <div class="flex flex-row flex-wrap gap-2 w-full">
              <div class="flex items-center gap-2 w-min">
                <RadioButton
                    v-model="formData.cover_method"
                    inputId="natural"
                    name="cover_method"
                    value="natural"
                />
                <label for="natural">Natural</label>
              </div>
              <div class="flex items-center gap-2 w-min">
                <RadioButton
                    v-model="formData.cover_method"
                    inputId="artificial"
                    name="cover_method"
                    value="artificial"
                />
                <label for="artificial">Artificial</label>
              </div>
              <div class="flex items-center gap-2 w-min">
                <RadioButton
                    v-model="formData.cover_method"
                    inputId="artificial"
                    name="cover_method"
                    value=""
                />
                <label for="artificial">Todos</label>
              </div>
            </div>
          </div>
        </div>
        <Button
            aria-label="Star"
            icon="fa fa-filter"
            label="Limpar"
            severity="contrast"
            text
            @click="clearFilters"
        />
      </div>
    </template>
    <Divider align="left"><b>Todos os filtros</b></Divider>
    <div class="flex flex-wrap justify-start items-center w-full gap-5">
      <div class="flex flex-col w-full md:max-w-52">
        <label
            class="text-sm"
            for="sex"
        >Data da ocorrência</label>
        <DatePicker
            v-model="occurrence_date_model"
            show-button-bar
        />
      </div>
      <div class="flex flex-col w-full md:max-w-52">
        <label
            class="text-sm"
            for="sex"
        >Data da cobertura</label>
        <DatePicker
            v-model="coverage_date_model"
            show-button-bar
        />
      </div>
      <div class="flex flex-col w-full md:max-w-52">
        <label
            class="text-sm"
            for="sex"
        >Parto previsto para</label>
        <DatePicker
            v-model="date_birth_prediction_model"
            show-button-bar
        />
      </div>
      <div class="flex flex-col w-full md:max-w-52">
        <label
            class="text-sm"
            for="sex"
        >Parto previsto ocorido em:</label>
        <DatePicker
            v-model="date_birth_model"
            show-button-bar
        />
      </div>
      <div class="flex flex-col w-full md:w-min">
        <label
            class="text-sm"
            for="sex"
        >Touro</label>
        <Select
            id="sex"
            v-model="formData.male_id"
            :loading="store.loading.fetchingFathers"
            :options="store.availableFathers"
            class="w-full md:w-56"
            option-label="name"
            option-value="id"
            placeholder="Selecione"
            show-clear
        />
      </div>
    </div>
  </Panel>
</template>

<script
    lang="ts"
    setup
>
import moment from "moment";
import {useRouteQuery} from "@vueuse/router";
import {useFlockStore} from "~/stores/flock/flockStore";

const store = useFlockStore()

onMounted(() => {
  store.fetchMothers()
  store.fetchFathers()
})

const formData = ref({
  occurrence_date: useRouteQuery("occurrence_date", null),
  coverage_date: useRouteQuery("coverage_date", null),
  date_birth_prediction: useRouteQuery("date_birth_prediction", null),
  date_birth: useRouteQuery("date_birth", null),
  cover_method: useRouteQuery("cover_method", null),
  female_id: useRouteQuery("female_id", null),
  male_id: useRouteQuery("male_id", null),
});

const occurrence_date_model = ref(null);
const coverage_date_model = ref(null);
const date_birth_prediction_model = ref(null);
const date_birth_model = ref(null);

const clearFilters = () => {
  Object.keys(formData.value).forEach((key) => {
    formData.value[key] = null;
  });
  occurrence_date_model.value = null;
  coverage_date_model.value = null;
  date_birth_prediction_model.value = null;
  date_birth_model.value = null;
};

watch(() => occurrence_date_model.value, (val) => {
  formData.value.occurrence_date = moment(val).format("YYYY-MM-DD") || null
});

watch(() => coverage_date_model.value, (val) => {
  formData.value.coverage_date = moment(val).format("YYYY-MM-DD") || null;
});

watch(() => date_birth_prediction_model.value, (val) => {
  formData.value.date_birth_prediction = moment(val).format("YYYY-MM-DD") || null;
});

watch(() => date_birth_model.value, (val) => {
  formData.value.date_birth = moment(val).format("YYYY-MM-DD") || null;
});
</script>

<style scoped>
</style>
