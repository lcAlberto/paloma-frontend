<template>
  <div class="h-full flex flex-col gap-5 pb-2">
    <div class="card p-5 flex flex-col-reverse md:flex-row items-center justify-between gap-4">
      <div>
        <h2 class="text-lg font-bold">
          <font-awesome-icon
              :icon="['fas', 'plus']"
              class="text-primary"
          />
          Fazenda {{ farmData.name }}
        </h2>
        <p class="text-gray-500">Lorem ipsum lorem fusce eleifend inceptos bibendum </p>
      </div>
    </div>
    <div class="card p-5 flex flex-col h-full">
      <h2 class="text-lg font-bold">
        Editar
      </h2>
      <div class="flex justify-center items-end gap-2 font-medium w-full">
        <div class="w-full">
          <label
              class="block text-sm font-medium text-gray-600 dark:text-gray-200"
              for="LoggingEmailAddress"
          >
            Nome
            <span class="text-danger align-super">*</span>
          </label>
          <InputText
              v-model="form.name"
              :invalid="store.errors?.name"
              :loading="store.loading.fetchingFarm"
              class="w-full"
              required
          />
          <small
              v-if="store.errors?.name"
              class="text-danger-600"
          >{{ store.errors?.name }}</small>
        </div>
        <Button
            icon="fa fa-save"
            label="Salvar"
            @click="submitAddressEdit"
        />
      </div>
    </div>
    <Panel
        v-if="farmData.address_id && !loading"
        toggleable
    >
      <template #header>
        <h2 class="text-lg font-bold">
          Endereço
        </h2>
      </template>
      <div class="flex flex-col gap-5">
        <address-form v-model="addressDataForm"/>
        <div class="flex flex-col items-end gap-5">
          <Button
              label="Salvar"
              @click="submitAddressEdit"
          />
        </div>
      </div>
    </Panel>
  </div>
</template>
<script
    lang="ts"
    setup
>
import {useFarmStore} from "~/stores/farm/farmStore";
import {authUser} from "~/constants/AuthUser";
import {useAddressStore} from "~/stores/address/addressStore";
import {computed} from "vue";

definePageMeta({
  middleware: "auth",
  title: "Minha fazenda",
})

onMounted(async () => {
  await store.fetchFarm(authUser()?.id)
  form.value.name = farmData.value.name;
  loadAddressData()
});

const store = useFarmStore()
const addressStore = useAddressStore()
const farmData = computed(() => store.farm)
const loading = computed(() => store.loading.fetchingFarm)
const addressData = computed(() => addressStore.address);

const form = ref({
  name: ''
})

const addressDataForm = ref({
  country_id: '',
  state_id: '',
  city_id: '',
  street: '',
  number: '333',
  zipcode: '',
})

function submitAddressEdit() {
  addressStore.edit(addressStore.address.id, addressDataForm.value)
}

async function loadAddressData() {
  await addressStore.fetchAddress(farmData.value.id).then(async () => {
    await addressStore.fetchCities(addressData.value.state_id);
  });
  addressDataForm.value = {
    country_id: addressData.value.country_id,
    state_id: addressData.value.state_id,
    city_id: addressData.value.city_id,
    street: addressData.value.street,
    number: addressData.value.number,
    zipcode: addressData.value.zipcode,
  }
}


</script>


<style scoped>

</style>