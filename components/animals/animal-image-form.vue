<template>
  <div class="card shadow-none border-secondary-50 border-2 overflow-hidden">
    <div>
      <Image
          alt="Image"
          preview
      >
        <template #previewicon>
          <div class="flex flex-col">
            <font-awesome-icon
                :icon="['fas', 'maximize']"
                size="2xl"
            />
            <h1>Ampliar</h1>
          </div>
        </template>
        <template #image>
          <img
              alt="image"
              class="rounded-t-xl"
              src="~/assets/images/app/Artboard.png"
          />
        </template>
        <template #preview="slotProps">
          <img
              :style="slotProps.style"
              alt="preview"
              class="w-1/2 m-auto"
              src="~/assets/images/app/Artboard.png"
              @click="slotProps.onClick"
          />
        </template>
      </Image>
    </div>
    <div>
      <div class="flex flex-wrap justify-between items-center p-2">
        <h2>Foto do animal</h2>
        <Button
            aria-label="Star"
            icon="fa fa-upload"
            raised
            severity="contrast"
            text
        />
      </div>
    </div>
  </div>
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