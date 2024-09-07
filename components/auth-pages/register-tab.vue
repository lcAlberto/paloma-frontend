<template>
  <div class="w-full">
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
      >Nome</label>
      <InputText
          v-model="form.name"
          :invalid="errors.name"
          class="w-full"
      />
      <small
          v-if="errors['name']"
          class="text-danger-600"
      >{{ errors.name[0] }}</small>
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
        >Confime a senha</label>
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

    <div class="mt-4">
      <div class="flex items-center">
        <Checkbox
            v-model="useTerms"
            binary
            inputId="useTerms"
        />
        <label
            class="ml-2 text-sm font-medium text-gray-600 dark:text-gray-200"
            for="ingredient1"
        >Aceito os
          <a class="hover:underline cursor-pointer">Termos de uso</a>
        </label>
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
        Registrar
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
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})
const useTerms = ref(false)

const errors = computed(() => store.getFormErrors);
const errorMessage = computed(() => store.getErrorMessage);
const isInvalid = computed(() => {
  return form.value.password !== form.value.password_confirmation ||
      form.value.name.length === 0 ||
      form.value.email.length === 0 ||
      form.value.password.length === 0
});


async function submit() {
  await store.register(form.value, useTerms.value)
}

async function clearErrorMessage() {
  await store.clearErrorMessage()
}

</script>


<style scoped>

</style>