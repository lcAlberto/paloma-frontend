<template>
  <div>
    <InputMask
        v-model="zipValue"
        :invalid="isInvalid || false"
        class="w-full"
        mask="99999-999"
        placeholder="00000-000"
        @input="fetchZipCode"
    />
  </div>
</template>
<script
    lang="ts"
    setup
>
import {useAddressStore} from "~/stores/address/addressStore";

const props = defineProps({
  modelValue: {type: String, required: true},
  errors: {type: String, required: true}
})
const emits = defineEmits([
  'update:modelValue',
  'update-street',
  'update-country',
  'update-state'
])

const store = useAddressStore()

const zipValue = ref('')
const isInvalid = computed(() => props.errors && props.errors.length > 0);
const zipcodeData = computed(() => store.getZipCodeData);
const states = computed(() => store.getStates);


watch(() => zipValue.value, (value) => {
  emits('update:modelValue', value)
  fetchZipCode(value.replace(/\D/g, ''))
});

async function fetchZipCode(zipCode: string) {
  if (zipCode && zipCode.length >= 8) {
    await store.fetchBrazilianZipCode(zipCode).then(() => {
      if (zipcodeData.value) {
        emits('update-street', zipcodeData.value.street)
        emits('update-country', '1')
      }
    })
  }
}


</script>


<style scoped>

</style>