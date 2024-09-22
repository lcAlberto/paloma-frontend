<template>
  <div class="w-full">
    <div class="relative pt-2 bg-blueGray-500">
       <div class="px-4 md:px-6 mx-auto w-full">
          <div>
             <div class="flex items-center justify-center flex-wrap">
                <single-card
                    v-for="(item, index) in props.items"
                    :key="index"
                    :item="item"
                />
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