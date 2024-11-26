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
  errors: {type: String, required: false}
})
const emits = defineEmits([
  'update:modelValue',
  'update-street',
  'update-country',
  'update-state',
  'update-city'
])

const store = useAddressStore()

const zipValue = ref('')
const isInvalid = computed(() => props.errors && props.errors.length > 0);
const zipcodeData = computed(() => store.zipcodeData);

watch(() => zipValue.value, (value) => {
  emits('update:modelValue', value)
  fetchZipCode(value.replace(/\D/g, ''))
});

async function fetchZipCode(zipCode: string) {
  if (zipCode && zipCode.length >= 8) {
    await store.fetchBrazilianZipCode(zipCode).then(() => {
      if (zipcodeData.value) {
        emits('update-country', '1')
        emits('update-state', zipcodeData.value.state)
        emits('update-city', zipcodeData.value.city)
        emits('update-street', zipcodeData.value.street)
      }
    })
  }
}


</script>


<style scoped>

</style>