<template>
  <div class="flex items-start p-0">
    <nuxt-link
        active-class="text-primary-300"
        class="text-gray-50 dark:text-gray-200"
        href="#"
        to="/home"
    >
      <font-awesome-icon :icon="['fas', 'house']"/>
      <span class="ml-2">Home</span>
    </nuxt-link>

    <span class="mx-2 dark:text-gray-300 rtl:-scale-x-100">
      <font-awesome-icon
          :icon="['fas', 'chevron-right']"
          size="2xs"
      />
    </span>

    <template
        v-for="(page, index) in pages()"
        :key="index"
    >
      <nuxt-link
          :to="`/${page}`"
          active-class="text-primary-300"
          class="text-gray-50 dark:text-gray-200"
          href="#"
      >
        <!--      <font-awesome-icon :icon="['fas', 'house']"/>-->
        <span>{{ page }}</span>
      </nuxt-link>

      <span class="mx-2 dark:text-gray-300 rtl:-scale-x-100">
      <font-awesome-icon
          :icon="['fas', 'chevron-right']"
          size="2xs"
      />
    </span>
    </template>
  </div>
</template>

<script setup>
import {ref} from "vue";

const route = useRoute()
const pages = (() => {
  return route.path.split('/').filter((page) => page !== '' && page !== 'home')
})

</script>
