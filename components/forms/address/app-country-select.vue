<template>

  <Select
      v-model="selectedCountry"
      :is-invalid="isInvalid"
      :loading="loading"
      :options="countries"
      class="w-full"
      empty-message="Nenhum país encontrado"
      fluid
      optionLabel="name"
      placeholder="País"
      show-clear
  >
    <template #value="slotProps">
        <div v-if="selectedCountry && selectedCountry.native">
          <span class="mr-2">{{ selectedCountry.emoji }}</span>
          <span>{{ selectedCountry?.native }}</span>
        </div>
      <div v-else>
          <span>Selecione o país</span>
        </div>
    </template>
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
import {ref} from "vue";
import {useAddressStore} from "~/stores/address/addressStore";

const props = defineProps({
  errors: {type: String, required: false}
})

const emits = defineEmits(['update:modelValue'])
const store = useAddressStore()

const selectedCountry = ref();
// const loading = computed(() => store.getLoading('fetchingCountries'));
const loading = false;

const countries = computed(() => store.countries);
const isInvalid = computed(() => props.errors && props.errors.length > 0);

onMounted(() => {
  fetchCountries()
})

watch(() => selectedCountry.value, (country) => {
  emits('update:modelValue', country.id)
});

async function fetchCountries() {
  await store.fetchCountries()
}

</script>


<style scoped>

</style>