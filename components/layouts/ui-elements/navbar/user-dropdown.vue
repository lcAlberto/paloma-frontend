<template>
  <custom-app-dropdown :items="notificationsItems">
    <template #activator="{open, toggleMenu}">
      <button
          aria-label="toggle profile dropdown"
          class="flex items-center focus:outline-none"
          type="button"
          @click="toggleMenu"
      >
        <div
            :class="{'ring-2': open}"
            class="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full"
        >
          <img
              alt="avatar"
              class="object-cover w-full h-full"
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
          >
        </div>

        <h3 class="mx-2 text-white dark:text-gray-200 lg:hidden">Khatab wedaa</h3>
      </button>
    </template>
    <template #header>
      <span class="inline-flex items-center gap-1 px-2 py-2">
          <svg
              class="h-8"
              fill="none"
              height="40"
              viewBox="0 0 35 40"
              width="35"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                d="M25.87 18.05L23.16 17.45L25.27 20.46V29.78L32.49 23.76V13.53L29.18 14.73L25.87 18.04V18.05ZM25.27 35.49L29.18 31.58V27.67L25.27 30.98V35.49ZM20.16 17.14H20.03H20.17H20.16ZM30.1 5.19L34.89 4.81L33.08 12.33L24.1 15.67L30.08 5.2L30.1 5.19ZM5.72 14.74L2.41 13.54V23.77L9.63 29.79V20.47L11.74 17.46L9.03 18.06L5.72 14.75V14.74ZM9.63 30.98L5.72 27.67V31.58L9.63 35.49V30.98ZM4.8 5.2L10.78 15.67L1.81 12.33L0 4.81L4.79 5.19L4.8 5.2ZM24.37 21.05V34.59L22.56 37.29L20.46 39.4H14.44L12.34 37.29L10.53 34.59V21.05L12.42 18.23L17.45 26.8L22.48 18.23L24.37 21.05ZM22.85 0L22.57 0.69L17.45 13.08L12.33 0.69L12.05 0H22.85Z"
                fill="var(--p-primary-color)"
            />
            <path
                d="M30.69 4.21L24.37 4.81L22.57 0.69L22.86 0H26.48L30.69 4.21ZM23.75 5.67L22.66 3.08L18.05 14.24V17.14H19.7H20.03H20.16H20.2L24.1 15.7L30.11 5.19L23.75 5.67ZM4.21002 4.21L10.53 4.81L12.33 0.69L12.05 0H8.43002L4.22002 4.21H4.21002ZM21.9 17.4L20.6 18.2H14.3L13 17.4L12.4 18.2L12.42 18.23L17.45 26.8L22.48 18.23L22.5 18.2L21.9 17.4ZM4.79002 5.19L10.8 15.7L14.7 17.14H14.74H15.2H16.85V14.24L12.24 3.09L11.15 5.68L4.79002 5.2V5.19Z"
                fill="var(--p-text-color)"
            />
          </svg>
          <span class="text-xl">
            <span class="text-primary mr-2">Olá</span>
            <span class="font-semibold">{{ authUser?.name }}!</span>
          </span>
        </span>
    </template>
    <template #menu="{item, props}">
      <nuxt-link
          v-if="item.route"
          :to="item.route"
          class="flex gap-4 items-center py-2 px-3 max-w-72 flex-wrap"
      >
        <font-awesome-icon
            v-if="item.icon"
            :icon="item.icon"
            size="md"
        />
        <div class="flex flex-col">
          <p v-html="item.label"/>
          <span
              class="text-sm"
              v-html="item.subLabel"
          />
        </div>
      </nuxt-link>
      <li
          v-else-if="item.action"
          class="flex gap-4 items-center py-2 px-3 max-w-96 flex-wrap"
          @click="executeAction(item.action)"
      >
        <font-awesome-icon
            v-if="item.icon"
            :icon="item.icon"
            size="md"
        />
        <div class="flex flex-col">
          <p v-html="item.label"/>
          <span
              class="text-sm"
              v-html="item.subLabel"
          />
        </div>
      </li>
    </template>
  </custom-app-dropdown>
</template>
<script
    lang="ts"
    setup
>
import CustomAppDropdown from "~/components/layouts/ui-elements/custom-app-dropdown.vue";
import {useAuthStore} from "~/stores/auth/authStore";

const store = useAuthStore()
const authUser = useCookie("authUser");

const notificationsItems = ref([
  {
    items: [
      {
        label: 'Perfil',
        icon: ['fas', 'user'],
        route: '/profile'
      },
      {
        label: 'Assinatura',
        icon: ['fas', 'wallet'],
        route: '/profile'
      },
      {
        label: 'Configurações',
        icon: ['fas', 'gear'],
        route: '/settings'
      },
    ]
  },
  {
    label: 'Fique por dentro',
    items: [
      {
        label: 'Suporte',
        subLabel: 'Nossa equipe está sempre online e vai sanar todas as suas dúvidas, ouvir seu feedback e te ajudar sempre!',
        icon: ['fas', 'headset'],
        route: '/profile'
      },
      {
        label: 'Newsletter',
        subLabel: 'Fique por dentro de tudo do mercado em nossa central de notícias do nosso <b>blog!</b>',
        icon: ['fas', 'newspaper'],
        route: '/profile'
      },
      {
        label: 'Instagram',
        subLabel: 'Siga-nos no <b>instagram</b>!, Lá tem dicas, postagens sobre o dia a dia da equipe que trabalha pra manter o Paloma!',
        icon: ['fab', 'instagram'],
        route: '/profile'
      }
    ]
  },
  {
    items: [
      {
        label: 'Sair',
        icon: ['fas', 'right-from-bracket'],
        action: 'logout'
      }
    ]
  }
])

function executeAction(action: string) {
  if (action === 'logout')
    logout()
}

async function logout() {
  await store.logout()
}

</script>


<style scoped>

</style>