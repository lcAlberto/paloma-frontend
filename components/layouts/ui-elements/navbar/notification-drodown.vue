<template>
  <custom-app-dropdown :items="notificationsItems">
    <template #activator="{open, toggleMenu}">
      <button
          aria-label="show notifications"
          class="mx-4 text-white dark:text-gray-200 hover:text-primary-50 dark:hover:text-gray-400 focus:text-white dark:focus:text-gray-500 focus:outline-none"
          @click="toggleMenu"
      >
        <font-awesome-icon
            :icon="['fas', 'bell']"
            shake
            size="lg"
        />
      </button>
    </template>
    <template #menu="{item, props}">
      <nuxt-link
          v-if="item.route"
          :to="item.route"
          class="flex gap-4 items-center py-5 px-3 max-w-96 flex-wrap"
      >
        <font-awesome-icon
            v-if="item.icon"
            :icon="item.icon"
            size="xl"
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
          v-else
          class="flex gap-4 items-center py-5 px-3 max-w-96 flex-wrap"
      >
        <font-awesome-icon
            v-if="item.icon"
            :icon="item.icon"
            size="xl"
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
        label: 'Sua assinatura vence em 4 dias! <b>Clique aqui e assine agora<b>',
        icon: ['fas', 'triangle-exclamation'],
        route: '/assinatura'
      },
    ]
  },
  {
    label: 'Lidas',
    items: [
      {
        label: 'O parto de <b>Filó está chegando!</b>',
        subLabel: 'É recomendado pausar a produção dela a fim de o animals recuperar-se para a proxima cria. <b>Clique aqui para fazer isso</b>',
        icon: 'fa fa-user'
      }
    ]
  }
])

</script>


<style scoped>

</style>