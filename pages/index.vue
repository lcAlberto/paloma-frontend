<template>
  <div class="w-96">
    <Card>
      <template #content>
        <div class="flex w-full max-w-sm mx-auto overflow-hidden bg-white dark:bg-gray-800 lg:max-w-4xl rounded-2xl">
          <div class="w-full px-6 py-8">
            <div class="flex justify-center mx-auto">
              <img
                  alt=""
                  class="w-auto h-7 sm:h-8"
                  src="https://merakiui.com/images/logo.svg"
              >
            </div>

            <p class="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
              Welcome back!
            </p>

            <a
                class="flex items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                href="#"
            >
              <div class="px-4 py-2">
                <!--                <font-awesome-icon-->
                <!--                    :icon="['fab', 'google']"-->
                <!--                    size="lg"-->
                <!--                />-->
              </div>
              <span class="w-5/6 px-4 py-3 font-bold text-center">
                Sign in with Google</span>
            </a>

            <div class="flex items-center justify-between mt-4">
              <span class="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

              <a
                  class="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
                  href="/auth/register"
              >
                Ou Login com email
              </a>

              <span class="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
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
                    href="/auth/forget-password"
                >Esqueceu a senha?</a>
              </div>
              <InputText
                  v-model="form.password"
                  :invalid="errors.password"
                  class="w-full"
              />
              <small
                  v-if="errors['password']"
                  class="text-danger-600"
              >{{ errors.password[0] }}</small>

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

            <div class="flex items-center justify-between mt-4">
              <span class="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

              <a
                  class="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
                  href="/auth/register"
              >
                Ou crie uma conta
              </a>

              <span class="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
            </div>
          </div>
        </div>
      </template>
    </Card>
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

const form = ref({
  email: '',
  password: ''
})
const errors = computed(() => store.getErrors);

async function submit() {
  await store.login(form.value)
}

</script>


<style scoped>

</style>