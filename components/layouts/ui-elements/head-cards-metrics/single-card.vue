<template>
  <div class="relative flex flex-col min-w-0 break-words bg-white rounded-2xl xl:mb-0 shadow-lg">
    <div class="flex-auto p-3">
      <div class="flex flex-wrap">
        <div
            :class="`text-${props.item.theme}`"
            class="relative w-full pr-4 max-w-full flex-grow flex-1"
        >
          <h5 class="uppercase font-bold text-xs">
            {{ props.item.title }}
          </h5>
          <span class="font-bold text-xl">
              {{ props.item.data }}
            </span>
        </div>
        <div class="relative w-auto pl-4 flex-initial">
          <div
              :class="`bg-${props.item.theme} text-${props.item.theme}`"
              class="p-3 text-center inline-flex items-center justify-center w-10 h-10 shadow-lg rounded-full"
          >
            <i
                :class="`${props.item.icon}`"
                class="text-white text-md"
            />
          </div>
        </div>
      </div>
      <div
          :class="`text-${props.item.legend.theme}`"
          class="flex flex-col text-sm text-blueGray-500 mt-4"
      >
          <span class="whitespace-nowrap">
            {{ props.item.legend.label }}
          </span>
        <span class="ml-2 font-bold text-lg">
            <i :class="props.item.legend.icon"/>
            {{ props.item.legend.data }}
          </span>
      </div>
    </div>
  </div>
</template>
<script
    lang="ts"
    setup
>
const props = defineProps({
  item: {type: Object, required: true}
})

</script>


<style scoped>

</style>