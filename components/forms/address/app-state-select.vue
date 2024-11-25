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
      placeholder="Estado"
      show-clear
  >
    <template #value="slotProps">
        <div v-if="selectedState">
          <span>{{ selectedState.iso2 }} | </span>
          <span>{{ selectedState.name }}</span>
        </div>
      <div v-else>
          <span>Selecione o estado</span>
        </div>
    </template>
    <template #option="slotProps">
        <div class="flex items-center">
          <span class="mr-2">{{ slotProps.option.iso2 }} | </span>
          <span>{{ slotProps.option.name }}</span>
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
  modelValue: {type: String, required: true},
  errors: {type: String, required: false},
  countryId: {type: String, required: true}
})

const emits = defineEmits(['update:modelValue'])
const store = useAddressStore()

const selectedState = ref();
const loading = false;
// const loading = computed(() => store.getLoading('fetchingStates'));
const states = computed(() => store.states);
const isInvalid = computed(() => props.errors && props.errors.length > 0);

const preSelectedState = computed(() => store.getZipCodeData);

watch(() => props.countryId, (countryId) => {
  fetchStates(countryId);
});

watch(() => preSelectedState, (address) => {
  setPreselectedState(address.value.state);
}, {deep: true});

watch(() => selectedState.value, (state) => {
  emits('update:modelValue', state.id)
});

async function fetchStates(country: string) {
  if (country) {
    await store.fetchStates(country).then(() => {
      // if (preSelectedState && preSelectedState.value.state) {
      //   setPreselectedState(preSelectedState.value.state)
      // }
    })
  }
}

async function setPreselectedState(abbrState: string) {
  if (states.value && states.value.length === 0) {
    await store.fetchCountries()
    await fetchStates('1')
  }
  selectedState.value = states.value.find((state: object) => state.iso2 === abbrState)
}

</script>


<style scoped>

</style>