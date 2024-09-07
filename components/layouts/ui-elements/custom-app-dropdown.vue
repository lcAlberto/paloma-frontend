<template>
  <div>
    <slot
        :open="isOpen"
        :toggleMenu="toggleMenu"
        name="activator"
        tabindex="0"
    />
    <Menu
        id="overlay_menu"
        ref="menu"
        :model="items"
        :popup="true"
        @blur="hide"
    >
      <template #start>
        <slot name="header"/>
      </template>
      <template #submenulabel="{ item }">
        <span class="text-primary-500 font-bold">{{ item.label }}</span>
      </template>
      <template #item="{ item, props }">
        <slot
            :item="item"
            :props="props"
            name="menu"
        />
      </template>
    </Menu>
  </div>
</template>
<script
    lang="ts"
    setup
>
const props = defineProps({
  enableHeader: {type: Boolean, default: false},
  items: {type: Array, required: true},
})

const menu = ref();
const isOpen = ref(false)

function toggleMenu(event: EventListener) {
  isOpen.value = !isOpen.value
  menu.value.toggle(event);
}

function hide() {
  isOpen.value = false
}

</script>


<style scoped>

</style>