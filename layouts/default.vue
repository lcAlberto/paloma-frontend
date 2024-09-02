<template>
  <div class="relative flex justify-center">
    <div class="bg-primary-500 absolute top-0 w-full h-80 shadow-2xl"></div>
    <div class="bg-primary-50 absolute top-2/3 w-full"></div>
    <div class="h-100 w-full absolute top-2 md:top-10 px-2 md:px-5 flex flex-col">
      <div class="px-5">
        <div class="flex flex-col md:flex-row justify-center gap-4 w-full">
          <div v-show="sidebar">
            <app-sidebar class="hidden md:block"/>
          </div>
          <div class="w-full">
            <app-navbar
                v-model:mobile-nav="mobileNav"
                v-model:sidebar="sidebar"
            />
            <app-mobile-navbar v-model="mobileNav"/>
            <div class="bg-white rounded-xl p-4 mt-5">
              <slot/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script
    lang="ts"
    setup
>
import AppNavbar from "~/components/layouts/auth/app-navbar.vue";
import AppSidebar from "~/components/layouts/auth/app-sidebar.vue";
import AppMobileNavbar from "~/components/layouts/auth/app-mobile-navbar.vue";

const sidebar = ref(true)
const mobileNav = ref(false)

watch(() => mobileNav, (val) => {
  console.log(val, 'mobileeee');
});
</script>


<style scoped>

</style>