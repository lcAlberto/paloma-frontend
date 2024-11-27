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
        <div class="flex justify-start items-center flex-wrap w-full gap-5">
          <div class="flex flex-col w-full md:w-min">
            <label
                class="text-sm"
                for="username"
            >Pesquisar</label>
            <InputText
                v-model="formData.name"
                placeholder="Pesquise pelo nome"
                type="text"
            />
          </div>
          <div class="flex flex-col w-full md:w-min">
            <label
                class="text-sm"
                for="sex"
            >Classificação</label>
            <Select
                id="sex"
                v-model="formData.classification"
                :options="availableClassifications"
                class="w-full md:w-56"
                option-label="label"
                option-value="value"
                placeholder="Selecione"
                show-clear
            />
          </div>
          <div class="flex flex-col w-full md:w-max">
            <label
                class="text-sm"
                for="sex"
            >Sexo</label>
            <div class="flex flex-row flex-wrap gap-2 w-full">
              <div class="flex items-center gap-2 w-min">
                <RadioButton
                    v-model="formData.sex"
                    inputId="male"
                    name="sex"
                    value="male"
                />
                <label for="male">Masculino</label>
              </div>
              <div class="flex items-center gap-2 w-min">
                <RadioButton
                    v-model="formData.sex"
                    inputId="female"
                    name="female"
                    value="female"
                />
                <label for="female">Feminino</label>
              </div>
              <div class="flex items-center gap-2 w-min">
                <Button
                    aria-label="Star"
                    icon="fa fa-times"
                    label="Limpar"
                    severity="contrast"
                    text
                    @click="clearSexFilters"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <Divider align="left"><b>Todos os filtros</b></Divider>
    <div class="flex flex-wrap justify-start items-center w-full gap-5">
      <div class="flex flex-col w-full md:w-min">
        <label
            class="text-sm"
            for="username"
        >Código</label>
        <InputText
            v-model="formData.code"
            placeholder="Código"
            type="text"
        />
      </div>
      <div class="flex flex-col w-full md:w-min">
        <label
            class="text-sm"
            for="sex"
        >Status</label>
        <Select
            id="sex"
            v-model="formData.status"
            :options="availableStatus"
            class="w-full md:w-56"
            option-label="label"
            option-value="value"
            placeholder="Selecione"
            show-clear
        />
      </div>
      <div
          v-if="false"
          class="flex flex-col w-full md:w-min"
      >
        <label
            class="text-sm"
            for="username"
        >Idade</label>
        <InputText
            v-model="formData.age"
            placeholder="Anos"
            type="text"
        />
      </div>
      <div class="flex flex-col w-full md:max-w-52">
        <label
            class="text-sm"
            for="sex"
        >Nascidos entre</label>
        <DatePicker
            v-model="born_between"
            selectionMode="range"
            show-button-bar
        />
      </div>
      <div class="flex flex-col w-full md:max-w-52">
        <label
            class="text-sm"
            for="sex"
        >Nascidos em</label>
        <DatePicker
            v-model="born_date_model"
            show-button-bar
        />
      </div>
      <div class="flex flex-col w-full md:w-min">
        <label
            class="text-sm"
            for="sex"
        >Mãe</label>
        <Select
            id="sex"
            v-model="formData.mother_id"
            :loading="store.loading.fetchingMothers"
            :options="store.availableMothers"
            class="w-full md:w-56"
            option-label="name"
            option-value="id"
            placeholder="Selecione"
            show-clear
        />
      </div>
      <div class="flex flex-col w-full md:w-min">
        <label
            class="text-sm"
            for="sex"
        >Pai</label>
        <Select
            id="sex"
            v-model="formData.father_id"
            :loading="store.loading.fetchingFathers"
            :options="store.availableFathers"
            class="w-full md:w-56"
            option-label="name"
            option-value="id"
            placeholder="Selecione"
            show-clear
        />
      </div>
      <Button
          aria-label="Star"
          icon="fa fa-filter"
          label="Limpar filtros"
          severity="contrast"
          text
          @click="clearFilters"
      />
    </div>
  </Panel>
</template>

<script
    lang="ts"
    setup
>
import {availableClassifications, availableStatus} from "~/constants/animals";
import moment from "moment";
import {useRouteQuery} from "@vueuse/router";
import {useFlockStore} from "~/stores/flock/flockStore";

const store = useFlockStore()

onMounted(() => {
  store.fetchMothers()
  store.fetchFathers()
})

const formData = ref({
  name: useRouteQuery("name", ""),
  code: useRouteQuery("code", ""),
  classification: useRouteQuery("classification", ""),
  born_date: useRouteQuery("born_date", ""),
  born_date_from: useRouteQuery("born_date_from", ""),
  born_date_to: useRouteQuery("born_date_to", ""),
  age: useRouteQuery("age", ""),
  sex: useRouteQuery("sex", ""),
  status: useRouteQuery("status", ""),
  mother_id: useRouteQuery("mother_id", ""),
  father_id: useRouteQuery("father_id", ""),
});

const born_between = ref([]);
const born_date_model = ref(null);

const clearFilters = () => {
  Object.keys(formData.value).forEach((key) => {
    formData.value[key] = "";
  });
  born_between.value = [];
  born_date_model.value = null;
};

const clearSexFilters = () => {
  formData.value.sex = "";
};

watch(() => born_between.value, (val) => {
  if (val && val.length > 0) {
    formData.value.born_date_from = moment(val[0]).format("YYYY-MM-DD");
    formData.value.born_date_to = moment(val[1]).format("YYYY-MM-DD");
  } else {
    formData.value.born_date_from = "";
    formData.value.born_date_to = "";
  }
});

watch(() => born_date_model.value, (val) => {
  if (val) {
    formData.value.born_date = moment(val).format("YYYY-MM-DD");
  } else {
    formData.value.born_date = "";
  }
});
</script>

<style scoped>
</style>
