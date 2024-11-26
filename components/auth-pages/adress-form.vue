<template>
  <div class="w-full">
    <div class="flex flex-col justify-center items-center">
      <div class="grid grid-cols-2 gap-4 w-full">
        <div class="mt-4">
          <label
              class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
              for="LoggingEmailAddress"
          >CEP</label>
          <app-zip-code-input
              v-model="addressForm.zipcode"
              :errors="errors['zip-code']"
              @update-street="(street) => addressForm.street = street"
              @update-country="(country_id) => addressForm.country_id = parseInt(country_id)"
              @update-state="(abbr) => getStateByAbbr(abbr)"
              @update-city="(city_name) => getCityByName(city_name)"
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
      </div>
    </div>
  </div>
</template>

<script
    lang="ts"
    setup
>
import {defineModel, computed, watch} from 'vue';
import AppCountrySelect from '~/components/forms/address/app-country-select.vue';
import AppStateSelect from '~/components/forms/address/app-state-select.vue';
import AppCitySelect from '~/components/forms/address/app-city-select.vue';
import AppZipCodeInput from '~/components/forms/address/app-zip-code-input.vue';
import {useAddressStore} from '~/stores/address/addressStore';

const addressStore = useAddressStore();
const abbrState = ref('')

const addressForm = defineModel({
  type: Object,
  default: () => ({
    country_id: undefined,
    state_id: undefined,
    city_id: undefined,
    street: '',
    number: '',
    zipcode: '',
  }),
});

const errors = computed(() => addressStore.errors);

watch(() => addressForm.value.country_id, async (country_id: number) => {
  await addressStore.fetchStates(country_id);
});

async function getStateByAbbr(abbr: string) {
  setTimeout(async () => {
    const currentState = addressStore.states.find((state) => state.iso2 === abbr);
    if (currentState) {
      addressForm.value.state_id = parseInt(currentState.id);
      await addressStore.fetchCities(currentState.id);
    }
  }, 500)
}

async function getCityByName(city_name: string) {
  setTimeout(async () => {
    const currentCity = addressStore.cities.find((city) => city.name === city_name);
    addressForm.value.city_id = currentCity.id;
  }, 1000)
}
</script>

<style scoped>
</style>
