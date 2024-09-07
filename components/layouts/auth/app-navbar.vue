<template>
  <nav class="bg-transparent dark:bg-gray-800 w-full mx-auto z-10 rounded-xl shadow">
    <div class="pb-4 mx-auto">
      <div class="flex flex-col-reverse md:flex-row w-full justify-between">
        <div class="flex items-center justify-start gap-2 text-white">
          <div class="hidden md:flex">
            <Button
                :icon="sidebar ? 'fas fa-angle-left' : 'fas fa-bars'"
                aria-label="Sidebar"
                severity="secondary"
                text
                @click="sidebar = !sidebar"
            />
          </div>
          <app-breadcrum/>
        </div>

        <div class="p-0 text-white dark:text-gray-800 mt-0 flex items-end flex-col-reverse sm:flex-row">
          <div class="flex justify-between w-full">
            <div class="block md:hidden">
              <Button
                  aria-label="Sidebar"
                  icon="fas fa-bars"
                  severity="secondary"
                  text
                  @click="mobileNav = !mobileNav"
              />
            </div>
            <div class="flex items-center justify-items-end mt-0">
              <notification-drodown/>
              <user-dropdown/>
            </div>
          </div>

        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import AppBreadcrum from "~/components/layouts/auth/app-breadcrum.vue";
import NotificationDrodown from "~/components/layouts/ui-elements/navbar/notification-drodown.vue";
import UserDropdown from "~/components/layouts/ui-elements/navbar/user-dropdown.vue";

const mobileNav = defineModel('mobileNav')
const sidebar = defineModel('sidebar')

</script>
<style scoped>
.bg-white-50 {
  color: #FFFFFF;
  background-color: rgba(255, 255, 255, 0.2);
}
</style>