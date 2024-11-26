<template>
  <div class="w-72">
    <div class="fixed bg-white w-72 rounded-2xl p-4 animate-fade-left animate-once animate-ease-in-out animate-duration-1000 shadow-2xl">
      <aside class="flex flex-col justify-center h-100 overflow-y-auto bg-white dark:bg-gray-900 dark:border-gray-700">
        <div
            v-if="authUser"
            class="flex flex-row justify-center items-center mt-6"
        >
          <img
              alt="avatar"
              class="object-cover w-14 h-14 mx-2 rounded-full"
              src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
          >
          <div class="flex flex-col">
            <h4 class="mx-2 font-medium text-gray-800 dark:text-gray-200">{{ authUser?.name }}</h4>
            <p class="mx-2 mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">{{ authUser?.email }}</p>
          </div>
        </div>

        <div class="flex flex-col justify-between flex-1 mt-6">
          <nav>


            <nuxt-link
                v-for="(page, index) in pages"
                :key="index"
                :to="page.link"
                active-class="text-primary-500"
                class="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
            >
              <font-awesome-icon :icon="page.icon"/>
              <span class="mx-4 font-medium">{{ page.label }}</span>
            </nuxt-link>

            <hr class="my-6 border-gray-200 dark:border-gray-600"/>

            <nuxt-link
                v-for="(link, i) in links"
                :key="i"
                active-class="text-primary-500"
                class="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
            >
              <font-awesome-icon :icon="link.icon"/>
              <span class="mx-4 font-medium">{{ link.label }}</span>
            </nuxt-link>
          </nav>

          <a
              class="flex items-center justify-center px-4 text-gray-400 dark:text-gray-200"
              href="#"
              @click="logout"
          >
            <font-awesome-icon :icon="['fas', 'right-from-bracket']"/>
            <span class="mx-2 font-medium">Sair</span>
          </a>
        </div>
      </aside>
    </div>
  </div>
</template>

<script
    lang="ts"
    setup
>
import {useAuthStore} from "~/stores/auth/authStore";

const authUser = useCookie("authUser");
const store = useAuthStore()
const pages = ref([
  {
    label: 'Dashboard',
    icon: ['fas', 'chart-line'],
    link: '/home'
  },
  {
    label: 'Rebanho',
    icon: ['fas', 'cow'],
    link: '/animals'
  },
  {
    label: 'Ciclos reprodutivos',
    icon: ['fas', 'mars-and-venus-burst'],
    link: '/breedings'
  },
  {
    label: 'Central veterinária',
    icon: ['fas', 'tractor'],
    link: '/health'
  },
  {
    label: 'Fazenda',
    icon: ['fas', 'heart-pulse'],
    link: '/farm'
  },
])

const links = ref([
  {
    label: 'Usuários',
    icon: ['fas', 'users'],
    link: '/users'
  },
  {
    label: 'Conta',
    icon: ['fas', 'id-card-clip'],
    link: '/accout'
  },
  {
    label: 'Configurações',
    icon: ['fas', 'gear'],
    link: '/settings'
  },

])

async function logout() {
  await store.logout()
}
</script>
<style scoped>
nav {
  min-height: 75vh;
  max-height: 80vh;
}
</style>