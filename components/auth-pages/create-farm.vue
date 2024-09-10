<template>
  <div class="w-full">
    <div class="flex flex-col justify-center items-center gap-5 px-6 py-2">
      <div class="w-full text-center">

        <span class="text-sm text-gray-600 dark:text-gray-200">
          Só mais uma etapa
          <span class="font-bold uppercase">Vamos registrar sua fazenda</span>
        </span>
        <p class="mt-3 text-xs text-gray-600 dark:text-gray-200">
          Em sua fazenda será possível ter o registro completo de seus animais desde o seu nascimento.
        </p>
      </div>

      <div class="flex flex-col justify-center items-center">
        <div class="flex items-center justify-center mt-4 w-full">
          <span class="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

          <span class="text-xs text-center text-gray-500 uppercase dark:text-gray-400">
                Dados da Fazenda
              </span>

          <span class="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="mt-4">
            <label
                class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                for="LoggingEmailAddress"
            >Nome da fazenda</label>
            <InputText
                v-model="form.name"
                :invalid="errors?.name"
                class="w-full"
            />
            <small
                v-if="errors['name']"
                class="text-danger-600"
            >{{ errors.email[0] }}</small>
          </div>
        </div>

        <div class="flex items-center justify-center mt-4 w-full">
          <span class="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

          <span class="text-xs text-center text-gray-500 uppercase dark:text-gray-400">
                Endereço
              </span>

          <span class="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
        </div>

        <div class="grid grid-cols-2 gap-4">
        <div class="mt-4">
          <label
              class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
              for="LoggingEmailAddress"
          >CEP</label>
          <app-zip-code-input
              v-model="addressForm.zipcode"
              :errors="errors['zip-code']"
              @update-street="(street) => addressForm.street = street"
              @update-country="(country) => addressForm.country_id = country"
              @update-state="(state) => addressForm.state_id = state"
          />
          <small
              v-if="errors['zip.code']"
              class="text-danger-600"
          >{{ errors.email[0] }}</small>
        </div>

        <div class="mt-4">
          <label
              class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
              for="LoggingEmailAddress"
          >Rua</label>
          <InputText
              v-model="addressForm.street"
              :invalid="errors.street"
              class="w-full"
          />
          <small
              v-if="errors['street']"
              class="text-danger-600"
          >{{ errors.street[0] }}</small>
        </div>

        <div class="mt-4">
          <label
              class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
              for="LoggingEmailAddress"
          >Número</label>
          <InputText
              v-model="addressForm.number"
              :invalid="errors.number"
              class="w-full"
          />
          <small
              v-if="errors['number']"
              class="text-danger-600"
          >{{ errors['number'][0] }}</small>
        </div>

        <div class="mt-4">
          <label
              class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
              for="LoggingEmailAddress"
          >País</label>
          <app-country-select
              v-model="addressForm.country_id"
              :errors="errors?.country_id"
          />
          <small
              v-if="errors['country']"
              class="text-danger-600"
          >{{ errors.country[0] }}</small>
        </div>

        <div class="mt-4">
          <label
              class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
              for="LoggingEmailAddress"
          >Estado</label>
          <app-state-select
              v-model="addressForm.state_id"
              :country-id="addressForm.country_id"
              :errors="errors?.state_id"
              pre-selected=""
          />
          <small
              v-if="errors['state']"
              class="text-danger-600"
          >{{ errors.state[0] }}</small>
        </div>

        <div class="mt-4">
          <label
              class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
              for="LoggingEmailAddress"
          >Cidade</label>
          <app-city-select
              v-model="addressForm.city_id"
              :errors="errors?.city_id"
              :state-id="addressForm.state_id"
          />
          <small
              v-if="errors['city']"
              class="text-danger-600"
          >{{ errors.city[0] }}</small>
        </div>
      </div>
        <div class="mt-6">
      <Button
          class="w-64 capitalize"
          severity="primary"
          type="button"
          @click="submit"
      >
        Entrar
      </Button>
    </div>
    </div>
  </div>
</div>
</template>
<script
    lang="ts"
    setup
>
import AppCountrySelect from "~/components/forms/address/app-country-select.vue";
import AppStateSelect from "~/components/forms/address/app-state-select.vue";
import AppCitySelect from "~/components/forms/address/app-city-select.vue";
import AppZipCodeInput from "~/components/forms/address/app-zip-code-input.vue";
import {useFarmStore} from "~/stores/farm/farmStore";
import {useAddressStore} from "~/stores/address/addressStore";

const farmStore = useFarmStore()
const addressStore = useAddressStore()

const addressData = computed(() => addressStore.getFarmAddress);

const form = ref({
  name: '',
  address_id: null
})

const addressForm = ref({
  country_id: '',
  state_id: '',
  city_id: '',
  street: '',
  number: '',
  zipcode: ''
})

const errors = computed(() => farmStore.getFormErrors);


async function submit() {
  await addressStore.createAddressFarm(addressForm.value)
  if (addressData.value && addressData.value.id) {
    form.value.address_id = addressData.value.id
    await farmStore.createFarm(form.value)
  }
}

function clearErrorMessage() {
  farmStore.clearErrorMessage()
  addressStore.clearErrorMessage()
}
</script>


<style scoped>

</style>