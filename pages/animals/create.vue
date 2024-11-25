<template>
  <div class="h-full flex flex-col gap-5 p-2">
    <div class="card p-5 flex flex-col-reverse md:flex-row justify-between gap-4 px-5 pt-5">
      <div>
        <h2 class="text-lg font-bold">
          <font-awesome-icon
              :icon="['fas', 'plus']"
              class="text-primary"
          />
          Adicionar novo registro de animal
        </h2>
        <p class="text-gray-500">Lorem ipsum lorem fusce eleifend inceptos bibendum conubia </p>
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
    <div class="card p-5 flex flex-col flex-wrap gap-5 items-center justify-start relative">
      <div class="flex flex-col-reverse md:flex-row gap-4 justify-center items-start w-full md:h-[58vh] overflow-auto pr-2">
        <animals-animal-main-form
            v-model="formData"
            class="w-full md:w-1/2 xl:w-10/12 min-w-56 flex-grow"
        />
        <animals-animal-image-form class="w-full md:w-1/2 lg:w-1/3 min-w-56 sticky top-0"/>
      </div>
      <Button
          class="w-64 capitalize"
          severity="primary"
          type="button"
          @click="submit"
      >
        Cadastrar
      </Button>

    </div>
  </div>
</template>
<script
    lang="ts"
    setup
>
definePageMeta({
  middleware: "auth",
  title: "Create animal",
})

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