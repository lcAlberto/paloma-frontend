<template>
  <div class="h-full flex flex-col gap-5 pb-2">
    <div class="card p-5 flex flex-col-reverse md:flex-row items-center justify-between gap-4">
      <div>
        <h2 class="text-lg font-bold">
          <font-awesome-icon
              :icon="['fas', 'plus']"
              class="text-primary"
          />
          Produção
        </h2>
        <p class="text-gray-500">Lorem ipsum lorem fusce eleifend inceptos bibendum </p>
      </div>
      <Button
          aria-label="Star"
          class="w-52"
          icon="fa fa-plus"
          label="Novo"
          severity="primary"
          @click="router.push('breedings/create')"
      />
    </div>
    <div class="card py-5 flex flex-col gap-5 items-center justify-between h-full">
      <div class="flex flex-col-reverse md:flex-row justify-center items-center w-full gap-4">
        <Tabs
            class="w-full"
            value="0"
        >
          <TabList class="flex flex-col items-start w-full">
            <Tab value="0">Pendentes</Tab>
            <Tab value="2">Futuros</Tab>
            <Tab value="1">Concluídos</Tab>
          </TabList>
          <TabPanels class="!p-0">
            <TabPanel value="0">
              <pregnancies-table/>
            </TabPanel>
            <TabPanel value="1">
              ||
            </TabPanel>
            <TabPanel value="2">
              \\
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  </div>
</template>
<script
    lang="ts"
    setup
>
import PregnanciesTable from "~/components/production-cicle/pregnancies-datalist/pregnancies-table.vue";

const router = useRouter()

</script>


<style scoped>

</style>