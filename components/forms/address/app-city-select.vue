<template>
  <Select
      v-model="selectedCity"
      :disabled="!stateId"
      :is-invalid="isInvalid"
      :loading="loading"
      :options="cities"
      class="w-full"
      empty-message="Nenhum estado, província ou unidade federativa encontrada"
      fluid
      optionLabel="name"
      optionValue="id"
      placeholder="Cidade"
      show-clear
  >
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
<script
    lang="ts"
    setup
>
import {useAddressStore} from "~/stores/address/addressStore";

const props = defineProps({
  errors: {type: String, required: false},
  stateId: {type: String, required: true},
});

const store = useAddressStore();

const selectedCity = defineModel({
  type: Number,
  default: () => (0),
});

const loading = computed(() => store.loading.fetchingCities);
const cities = computed(() => store.cities);
const isInvalid = computed(() => props.errors && props.errors.length > 0);

</script>

<style scoped></style>
