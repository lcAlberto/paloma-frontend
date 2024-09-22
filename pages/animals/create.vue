<template>
  <div class="p-2 lg:h-[80vh] pb-2 overflow-y-auto">
    <div class="flex flex-col-reverse md:flex-row justify-between gap-4 px-5 pt-5">
      <div>
        <h2 class="text-lg font-bold">
          <font-awesome-icon
              :icon="['fas', 'plus']"
              class="text-primary"
          />
          Adicionar novo registro de animal
        </h2>
        <p class="text-gray-500">Lorem ipsum lorem fusce eleifend inceptos bibendum conubia venenatis, erat torquent donec </p>
    </div>
      <Button
          aria-label="Star"
          icon="fa fa-arrow-left"
          label="Voltar"
          severity="contrast"
          text
          @click="router.push('/animals')"
      />
    </div>
    <Divider/>
    <div class="flex flex-col gap-5 items-center justify-between pb-5 min-h-[86%] max-h-screen">
      <div class="flex flex-col-reverse md:flex-row justify-center items-center w-full gap-4">
          <div class="w-1/2">
            <animals-animal-main-form v-model="formData"/>
          </div>
          <animals-animal-image-form/>
      </div>

      <Button
          class="w-64 capitalize mt-auto"
          severity="primary"
          type="button"
          @click="submit"
      >
        Cadastrar
      </Button>

    </div>
    <div></div>
  </div>
</template>
<script
    lang="ts"
    setup
>
import type {AnimalFormData, AnimalFormPayload} from "~/types/AnimalForm";
import moment from "moment";
import {useFlockStore} from "~/stores/flock/flockStore";

const router = useRouter()
const store = useFlockStore()

//const year: Ref<string | number> = ref('2020')
const formData: Ref<AnimalFormData> = ref({
  name: undefined,
  code: undefined,
  sex: undefined,
  breed: undefined,
  classification: undefined,
  status: undefined,
  image: undefined,
  born_date: undefined,
  father_id: undefined,
  mother_id: undefined
})

async function submit() {
  const param: T = formData.value
  if (param.breed && param.breed?.id)
    param.breed = param.breed.value

  if (param.classification && param.classification?.id)
    param.classification = param.classification.value

  if (param.status && param.status?.id)
    param.status = param.status.value

  if (param.father_id && param.father_id?.id)
    param.father_id = param.father_id.id

  if (param.mother_id && param.mother_id?.id)
    param.mother_id = param.mother_id.id

  if (param.born_date)
    param.born_date = moment(param.born_date).format('YYYY-MM-DD hh:mm:ss')


  await store.createAnimal(param);
}


</script>


<style scoped>

</style>