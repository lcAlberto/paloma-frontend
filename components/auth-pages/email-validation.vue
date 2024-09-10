<template>
  <div class="w-full">
    <div class="flex flex-col justify-center items-center gap-5 px-6 py-8">
      <div class="w-full text-center">

        <span class="text-sm text-gray-600 dark:text-gray-200">
          Verifique seu email
          <span class="font-bold">seu***@g***.com</span>
        </span>
        <p class="mt-3 text-xs text-gray-600 dark:text-gray-200">
          Enviamos um link para você prosseguir
        </p>
      </div>

      <div class="">
        <div class="flex items-center justify-between mt-4">
          <span class="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

          <span class="text-xs text-center text-gray-500 uppercase dark:text-gray-400">
                Esse não é seu email?
              </span>

          <span class="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
        </div>

        <div class="mt-4">
          <div class="flex items-center">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-200">
              Digite seu email corretamente para prosseguirmos
            </p>
          </div>
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
    </div>
  </div>
</template>
<script
    lang="ts"
    setup
>import {useAuthStore} from "~/stores/auth/authStore";

const store = useAuthStore()
const form = ref({
  email: '',
  password: ''
})

const errors = computed(() => store.getFormErrors);

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