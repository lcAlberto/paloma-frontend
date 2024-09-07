<template>
  <div class="w-full">
    <div class="flex flex-col justify-center items-center gap-5 px-6 py-3">
      <div class="w-full">

        <span class="text-sm text-gray-600 dark:text-gray-200">
          Fique tranquilo!
        </span>
        <p class="mt-3 text-xs text-gray-600 dark:text-gray-200">
          Vamos recuperar sua senha rapidinho e logo poderá logar novamente
        </p>
      </div>

      <div class="">

        <div class="mt-4">
          <label
              class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
              for="LoggingEmailAddress"
          >Email</label>
          <InputText
              v-model="form.email"
              :invalid="errors.email"
              class="w-full"
          />
          <small
              v-if="errors['email']"
              class="text-danger-600"
          >{{ errors.email[0] }}</small>
        </div>

        <div class="mt-4">
          <div class="flex items-center">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-200">
              Será enviado um link para esse email com instruuções de recuperação de senha
            </p>
          </div>
        </div>

        <Divider/>

        <div class="mt-4 w-full">
          <div class="flex flex-col items-center">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-200 mb-2">
              Não recebeu o email?
            </p>
            <Button
                class="w-full capitalize"
                severity="secondary"
                type="button"
                @click="submit"
            >
              Reenviar
            </Button>
          </div>
        </div>

        <div class="mt-6">
          <Button
              :disabled="isInvalid"
              class="w-full capitalize"
              severity="primary"
              type="button"
              @click="submit"
          >
            Enviar
          </Button>
        </div>

        <div class="flex items-center justify-center mt-4">
          <a
              class="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
              href="/public"
          >
            Lembrou da senha? Faça login
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script
    lang="ts"
    setup
>
import {useAuthStore} from "~/stores/auth/authStore";

definePageMeta({
  layout: 'guest'
})

const store = useAuthStore()
const router = useRouter()
const form = ref({
  email: ''
})
const errors = computed(() => store.getFormErrors);
const isInvalid = computed(() => form.value.email.length === 0)

async function submit() {
  router.replace({hash: "#reset-password"})
  // await store.login(form.value)
}
</script>


<style scoped>

</style>