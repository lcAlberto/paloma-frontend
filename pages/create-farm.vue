<template>
  <div class="w-5/12 card">
    <div class="flex items-center justify-center p-5 mx-auto">
      <img
          alt=""
          class="w-25"
          src="https://merakiui.com/images/logo.svg"
      >
    </div>
    <div class="w-full text-center my-5 px-5">
      <h1 class="">Só mais um passo</h1>
      <h5>Vamos criar sua fazenda</h5>

      <p class="mt-3 w-11/12">
        Em sua fazenda será possível ter o registro completo de seus animais desde o seu nascimento.
      </p>
    </div>

    <div class="card p-5">
      <Stepper value="1">
        <StepList>
          <Step value="1">Fazenda</Step>
          <Step value="2">Onde ela fica?</Step>
        </StepList>
        <StepPanels class="bg-transparent">
          <StepPanel
              v-slot="{ activateCallback }"
              style="background: transparent;"
              value="1"
          >
            <div class="flex flex-col">
              <div class="flex justify-center items-center font-medium">
                <div class="my-4 w-full">
                  <label
                      class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                      for="LoggingEmailAddress"
                  >Qual o nome da fazenda?
                    <span class="text-danger align-super">*</span></label>
                  <InputText
                      v-model="form.name"
                      :invalid="errors?.name"
                      class="w-full"
                      required
                  />
                  <small
                      v-if="errors['name']"
                      class="text-danger-600"
                  >{{ errors.email[0] }}</small>
                </div>
              </div>
            </div>
            <div class="flex pt-6 justify-center">
              <Button
                  v-tooltip.top="'Digite o nome da sua fazenda'"
                  :disabled="form.name.length === 0"
                  class="w-1/2"
                  icon="fa fa-arrow-right"
                  iconPos="right"
                  label="Próxima etapa"
                  @click="activateCallback('2')"
              />
            </div>
          </StepPanel>

          <StepPanel
              v-slot="{ activateCallback }"
              style="background: transparent;"
              value="2"
          >
            <adress-form v-model="addressForm"/>
            <div class="flex pt-6 justify-between">
              <Button
                  icon="fa fa-arrow-left"
                  label="Back"
                  severity="secondary"
                  @click="activateCallback('1')"
              />
              <Button
                  class="w-1/2"
                  label="Continuar"
                  @click="submit"
              />
            </div>
          </StepPanel>
        </StepPanels>
      </Stepper>
    </div>
  </div>
</template>
<script
    lang="ts"
    setup
>
import {useFarmStore} from "~/stores/farm/farmStore";
import {useAddressStore} from "~/stores/address/addressStore";
import AdressForm from "~/components/auth-pages/adress-form.vue";
import {useAuthStore} from "~/stores/auth/authStore";

const farmStore = useFarmStore()
const addressStore = useAddressStore()
const route = useRouter()

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
const errors = computed(() => farmStore.errors.fields);
const addressData = computed(() => addressStore.farmAddress);


async function submit() {
  await addressStore.createAddressFarm(addressForm.value)
  form.value.address_id = addressData.value.id
  await farmStore.createFarm(form.value)
  const authStore = useAuthStore()
  await authStore.me()
  route.push('/home')
}

definePageMeta({
  middleware: 'auth',
  layout: 'onboard',
  title: 'Register your Farm'
})
</script>


<style scoped>

</style>