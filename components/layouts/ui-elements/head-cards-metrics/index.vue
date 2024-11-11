<template>
  <div class="bg-blueGray-500">
    <div class="w-full">
      <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 gap-y-0 gap-x-3 md:gap-y-3 justify-items-stretch content-stretch">
        <single-card
            v-for="(item, index) in props.items"
            :key="index"
            :item="item"
        />
      </div>
    </div>
  </div>
</template>
<script
    lang="ts"
    setup
>
import SingleCard from "~/components/layouts/ui-elements/head-cards-metrics/single-card.vue";

const props = defineProps({
  items: {type: Array<propItem>, required: true}
})

interface propItem {
  title: string,
  data: string | null,
  icon: string,
  theme: string,
  legend: {
    icon: string,
    label: string | null,
    value: string | number,
  },
}

</script>

<style scoped>

</style>