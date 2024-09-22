<template>
  <Card style="max-width: 25rem; min-width: 20rem; overflow: hidden">
    <template #header>
      <Image
          alt="Image"
          preview
      >
          <template #previewicon>
            <i class="pi pi-search"></i>
          </template>
          <template #image>
            <img
                alt="image"
                src="~/assets/images/app/login.jpg"
            />
          </template>
          <template #preview="slotProps">
            <img
                :style="slotProps.style"
                alt="preview"
                src="~/assets/images/app/login.jpg"
                @click="slotProps.onClick"
            />
          </template>
        </Image>
    </template>
    <template #title>Imagem do animal</template>
    <template #subtitle>Carregue um arquivo de imagem válido, no formato png ou jpg</template>
    <!--    <template #footer>-->
    <!--        <div class="flex gap-4 mt-1">-->
    <!--            <Button-->
    <!--                class="w-full"-->
    <!--                label="Cancel"-->
    <!--                outlined-->
    <!--                severity="secondary"-->
    <!--            />-->
    <!--            <Button-->
    <!--                class="w-full"-->
    <!--                label="Save"-->
    <!--            />-->
    <!--        </div>-->
    <!--    </template>-->
</Card>
</template>
<script
    lang="ts"
    setup
>
function submit() {
  //
}
</script>


<style scoped>

</style>