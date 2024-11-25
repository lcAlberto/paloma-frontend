<template>
  <Select
      v-model="selectedCountry"
      :is-invalid="isInvalid"
      :loading="loading"
      :options="countries"
      class="w-full"
      empty-message="Nenhum país encontrado"
      fluid
      option-label="name"
      option-value="id"
      placeholder="País"
      show-clear
  >
    <template #option="slotProps">
      <div class="flex items-center">
        <span class="mr-2">{{ slotProps.option.emoji }}</span>
        <div>{{ slotProps.option.native }}</div>
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
  errors: {type: String, required: false}
})

const store = useAddressStore()

const selectedCountry = defineModel({
  type: Number,
  default: () => (0),
});

const loading = computed(() => store.loading.fetchingCountries);
const countries = computed(() => store.countries);
const isInvalid = computed(() => props.errors && props.errors.length > 0);

onMounted(() => {
  fetchCountries()
})

async function fetchCountries() {
  await store.fetchCountries()
}

</script>


<style scoped>

</style>