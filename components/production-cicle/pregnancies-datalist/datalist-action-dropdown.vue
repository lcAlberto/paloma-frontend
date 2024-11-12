<template>
  <custom-app-dropdown :items="prop.linkList">
    <template #activator="{open, toggleMenu}">
      <Button
          :icon="open ? 'fa fa-chevron-up' : 'fa fa-chevron-down'"
          :severity="open ? 'primary' : 'secondary'"
          aria-label="Star"
          rounded
          text
          @click="toggleMenu"
      />
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
      <confirm-delete-dialog
          v-else-if="item.action"
          :data="prop.data"
          @accept="(payload) => emits('delete', payload)"
      >
        <template #activator="{toggleMenu}">
          <li
              class="flex gap-4 items-center py-2 px-3 max-w-96 flex-wrap cursor-pointer hover:bg-danger-200"
              @click.stop="toggleMenu"
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
      </confirm-delete-dialog>
    </template>
  </custom-app-dropdown>
</template>
<script
    lang="ts"
    setup
>
import CustomAppDropdown from "~/components/layouts/ui-elements/custom-app-dropdown.vue";
import ConfirmDeleteDialog from "~/components/animals/flock-datalist/confirm-delete-dialog.vue";

const prop = defineProps({
  data: {type: Object, required: true},
  linkList: {type: Array, required: true},
})
const emits = defineEmits(['delete'])
</script>


<style scoped>

</style>