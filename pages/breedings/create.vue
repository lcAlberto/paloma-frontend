<template>
  <div class="h-full flex flex-col gap-5 p-2">
    <div class="card p-5 flex flex-col-reverse md:flex-row justify-between gap-4 px-5 pt-5">
      <div>
        <h2 class="text-lg font-bold">
          <font-awesome-icon
              :icon="['fas', 'plus']"
              class="text-primary"
          />
          Adicionar novo registro reprodutivo
        </h2>
        <p class="text-gray-500">
          Um novo ciclo que irá impactar em seu rebanho
        </p>
      </div>
      <Button
          aria-label="Star"
          icon="fa fa-arrow-left"
          label="Voltar"
          severity="contrast"
          text
          @click="router.push('/breedings')"
      />
    </div>
    <div class="card p-5 flex flex-col flex-wrap gap-5 items-center justify-start relative">
      <div class="flex flex-col-reverse md:flex-row gap-4 justify-center items-start w-full md:h-[58vh] overflow-auto pr-2">
        <breeding-main-form
            v-model="formData"
            class="w-full md:w-1/2 xl:w-10/12 min-w-56 flex-grow"
        />
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
import BreedingMainForm from "~/components/production-cicle/BreedingMainForm.vue";
import type {BreedingFormData} from "~/types/BreedingForm";
import {useBreedingStore} from "~/stores/breeding/breeding";

const router = useRouter()
const store = useBreedingStore()

const formData: Ref<BreedingFormData> = ref({
  occurrence_date: undefined,
  coverage_date: undefined,
  cover_method: undefined,
  status: undefined,
  female_id: undefined,
  male_id: undefined,
})

async function submit() {
  const param: T = formData.value
  await store.create(param);
}
</script>

<style scoped>

</style>