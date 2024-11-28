<template>
  <div :class="route.hash === '#create-farm' ? 'w-1/3' : 'w-96'">
    <Card class="bg-white dark:bg-gray-800 rounded-2xl">
      <template #content>
        <div class="flex flex-col gap-3 w-full">

          <div class="px-3">
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

          </div>

          <forget-password v-if="route.hash === '#forget-password'"/>
          <reset-password v-else-if="route.hash === '#reset-password'"/>
          <email-validation v-else-if="route.hash === '#email-validation'"/>
          <create-farm v-else-if="route.hash === '#create-farm'"/>
          <div
              v-else
              class="min-h-[35rem]"
          >
            <Tabs value="0">
              <TabList>
                <Tab value="0">
                  Login
                </Tab>
                <Tab value="1">
                  Registrar
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel
                    style="padding: 0"
                    value="0"
                >
                  <login-with-google-tab/>
                  <auth-pages-login-tab/>
                </TabPanel>
                <TabPanel value="1">
                  <auth-pages-register-tab/>
                </TabPanel>
              </TabPanels>
            </Tabs>
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

import LoginWithGoogleTab from "~/components/auth-pages/login-with-google-tab.vue";
import ForgetPassword from "~/components/auth-pages/forget-password.vue";
import ResetPassword from "~/components/auth-pages/reset-password.vue";
import EmailValidation from "~/components/auth-pages/email-validation.vue";
import CreateFarm from "~/components/address/AddressForm.vue";

definePageMeta({
  layout: 'guest',
  title: 'Paloma Management'
})

const route = useRoute()

</script>


<style>
.p-tablist-tab-list {
  display: flex;
  justify-content: space-evenly;
}
</style>