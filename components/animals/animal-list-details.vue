<template>
  <Menu
      :model="items"
      class="w-1/2"
  >
    <template #submenulabel="{ item }">
        <span class="text-primary font-bold">{{ item.label }}</span>
    </template>
    <template #item="{ item, props }">
        <a
            v-ripple
            class="flex items-center"
            v-bind="props.action"
        >
            <span :class="item.icon"/>
            <span>{{ item.label }}</span>
            <Badge
                v-if="item.badge"
                :value="item.badge"
                class="ml-auto"
            />
        </a>
    </template>
</Menu>
</template>
<script
    lang="ts"
    setup
>


</script>


<style scoped>

</style>