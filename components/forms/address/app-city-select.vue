<template>
  <Select v-model="selectedCity" :disabled="!stateId" :is-invalid="isInvalid" :loading="loading" :options="cities"
    class="w-full" empty-message="Nenhum estado, província ou unidade federativa encontrada" fluid optionLabel="name"
    placeholder="Estado" show-clear>
    <template #value="slotProps">
      <div v-if="selectedCity">
        <span>{{ selectedCity.name }}</span>
        <span>
          - {{ selectedCity.state_code }}</span>
      </div>
      <div v-else>
        <span>Selecione a cidade</span>
      </div>
    </template>
    <template #option="slotProps">
      <div class="flex items-center">
        <span>{{ slotProps.option.name }}</span>
        <span class="mr-2">
          -
          {{ slotProps.option.state_code }}</span>
      </div>
    </template>
  </Select>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useAddressStore } from "~/stores/address/addressStore";

const props = defineProps({
  errors: { type: String, required: false },
  stateId: { type: String, required: true },
});

const emits = defineEmits(["update:modelValue"]);
const store = useAddressStore();

const selectedCity = ref();
const loading = false;
// const loading = computed(() => store.getLoading('fetchingCities'));
const cities = computed(() => store.cities);
const isInvalid = computed(
  () => props.errors && props.errors.length > 0
);

const preSelectedCity = computed(
  () => store.getZipCodeData
);

watch(() => preSelectedCity, (address) => {
  if (address.value.city !== selectedCity.name) {
    setPreselectedCity(address.value.city);
  }
}, { deep: true });

watch(() => props.stateId, (state) => {
  fetchCities(state)
});

watch(
  () => selectedCity.value,
  (state) => {
    emits("update:modelValue", state.id);
  }
);

async function fetchCities(state: string) {
  if (state) {
    await store.fetchCities(state).then(() => {
      if (
        preSelectedCity.value &&
        preSelectedCity.value.city
      )
        setPreselectedCity(
          preSelectedCity.value.city
        );
    });
  }
}

async function setPreselectedCity(
  cityName: string
) {
  if (cities.value && cities.value.length > 0) {
    selectedCity.value = cities.value.find(
      (city: object) => city.name === cityName
    );
  }
}
</script>

<style scoped></style>
