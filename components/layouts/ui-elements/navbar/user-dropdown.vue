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

const notificationsItems = ref([
  {
    label: 'Não lidas',
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

function logout() {
  console.log('saindo...')
}

</script>


<style scoped>

</style>