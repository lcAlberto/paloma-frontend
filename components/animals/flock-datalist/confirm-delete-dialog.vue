<template>
  <div>
    <ConfirmDialog
        :group="`confirm-${props.data.id}`"
        class="bg-accent"
    >
      <template #message="slotProps">
        <div class="flex flex-row items-center w-full gap-4 text-danger">
            <font-awesome-icon
                :icon="['fas', 'circle-exclamation']"
                shake
                size="2xl"
            />
            <p>{{ slotProps.message.message }}</p>
        </div>
    </template>
    </ConfirmDialog>
    <Toast/>
    <ConfirmDialog :id="props.data.id"/>
    <slot
        :open="open"
        :toggleMenu="toggleMenu"
        name="activator"
    />
  </div>
</template>
<script
    lang="ts"
    setup
>
const props = defineProps({
  data: {type: Object, required: true},
})
const emits = defineEmits(['accept', 'reject'])

const confirm = useConfirm();
const open = ref(false)

const toast = useToast();
const confirmDelete = () => {
  confirm.require({
    group: `confirm-${props.data.id}`,
    message: 'Tem certeza que quer prosseguir? A ação será irreversível!',
    header: `Excluir ${props.data.name}?`,
    icon: 'pi pi-exclamation-triangle',
    position: 'right',
    rejectProps: {
      label: 'Cancelar',
      severity: 'secondary',
      icon: 'fa fa-ban',
      outlined: true
    },
    acceptProps: {
      label: 'Deletar',
      severity: 'danger',
      icon: 'fa fa-check',
    },
    accept: () => {
      emits('accept', props.data)
    },
    reject: () => {
      emits('reject')
    }
  });
};

function toggleMenu(event: EventListener) {
  open.value = !open.value
  if (open.value)
    confirmDelete()
}
</script>


<style lang="scss">
.bg-accent {
  &.p-confirmdialog {
    &.p-component {
      &.p-component {
        &.bg-accent {
          border: 1px solid #ed1516 !important;
          color: #ed1516;
        }
      }
    }
  }
}

</style>