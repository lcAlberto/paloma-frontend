<template>
  <div>
    <div class="card my-5">
      <Message
          v-if="errorMessage && errorMessage.length > 0"
          :life="10000"
          closable
          severity="error"
          @close="clearErrorMessage"
          @life-end="clearErrorMessage"
      >{{ errorMessage }}
      </Message>
    </div>
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
      <div class="flex justify-between">
        <label
            class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
            for="loggingPassword"
        >Senha</label>
        <a
            class="text-xs text-gray-500 dark:text-gray-300 hover:underline"
            href="#forget-password"
        >Esqueceu a senha?</a>
      </div>
      <Password
          v-model="form.password"
          :invalid="errors.password"
          class="w-full"
          fluid
          toggleMask
      />
      <small
          v-if="errors['password']"
          class="text-danger-600"
      >{{ errors.password[0] }}</small>

    </div>

    <div class="mt-8">
      <div class="flex items-center">
        <Checkbox
            v-model="keepConnected"
            inputId="ingredient1"
            name="keep-connected"
            value="Cheese"
        />
        <label
            v-tooltip.right="'Mantém sua sessão nesmo depois de fechar a tab ou a janela do navegador'"
            class="ml-2 text-sm font-medium text-gray-600 dark:text-gray-200"
            for="ingredient1"
        >Permanecer logado
        </label>
      </div>
    </div>

    <div class="mt-6">
      <Button
          class="w-full capitalize"
          severity="primary"
          type="button"
          @click="submit"
      >
        Entrar
      </Button>
    </div>

  </div>

</template>
<script
    lang="ts"
    setup
>
import {useAuthStore} from "~/stores/auth/authStore";

const store = useAuthStore()

const form = ref({
  email: '',
  password: ''
})
const keepConnected = ref(false)

const errors = computed(() => store.getFormErrors);
const errorMessage = computed(() => store.getErrorMessage);

async function submit() {
  console.log('aaa')
  await store.login(form.value)
}

async function clearErrorMessage() {
  await store.clearErrorMessage()
}

</script>


<style scoped>

</style>