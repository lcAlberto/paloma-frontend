<template>
  <div class="w-full">
    <div class="flex flex-col justify-center items-center gap-5 px-6 py-3">
      <div class="w-full">

        <span class="text-sm text-gray-600 dark:text-gray-200">
          Vamos resetar sua senha!
        </span>
        <p class="mt-3 text-xs text-gray-600 dark:text-gray-200">
          Procure criar uma senha segura contendo letras, números e símbolos que você possa lembrar no futuro
        </p>
      </div>

      <div class="">

        <div class="mt-4">
          <div class="flex justify-between">
            <label
                class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                for="loggingPassword"
            >Nova Senha</label>
          </div>
          <Password
              v-model="form.password"
              :invalid="errors.password"
              class="w-full"
              fluid
              prompt-label="Digite uma senha segura"
              toggleMask
          />
          <small
              v-if="errors['password']"
              class="text-danger-600"
          >{{ errors.password[0] }}</small>
          <small
              v-else
              class="text-xs"
          >Mínimo 8 caracteres com letras, números e símbolos</small>

        </div>

        <div class="mt-4">
          <div class="flex justify-between">
            <label
                class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                for="loggingPassword"
            >Confime a nova senha</label>
          </div>
          <Password
              v-model="form.password_confirmation"
              :invalid="form.password_confirmation !== form.password"
              class="w-full"
              fluid
              prompt-label="Repita a senha para confirmar"
              toggleMask
          />
          <small
              v-if="form.password_confirmation !== form.password"
              class="text-danger-600"
          >As senhas não são identicas. Verifique</small>

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
  password: '',
  password_confirmation: ''
})
const errors = computed(() => store.getFormErrors);
const isInvalid = computed(() => form.value.password_confirmation.length === 0 ||
    form.value.password.length === 0)

async function submit() {
  router.replace({hash: "#reset-password"})
  // await store.login(form.value)
}
</script>


<style scoped>

</style>