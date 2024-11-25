<template>
  <Select
      v-model="selectedState"
      :disabled="!countryId"
      :is-invalid="isInvalid"
      :loading="loading"
      :options="states"
      class="w-full"
      empty-message="Nenhum estado, província ou unidade federativa encontrada"
      fluid
      optionLabel="name"
      optionValue="id"
      placeholder="Estado"
      show-clear
  >
  </Select>
</template>
<script
    lang="ts"
    setup
>
import {useAddressStore} from "~/stores/address/addressStore";

const props = defineProps({
  errors: {type: String, required: false},
  countryId: {type: Number, required: false},
})

const store = useAddressStore()

const selectedState = defineModel({
  type: Number,
  default: () => (0),
});

const loading = computed(() => store.loading.fetchingStates);
const states = computed(() => store.states);
const isInvalid = computed(() => props.errors && props.errors.length > 0);


</script>


<style scoped>

</style>