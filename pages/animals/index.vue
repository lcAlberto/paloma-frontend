<template>
  <div class="p-0 lg:h-[80vh] pb-5">
    <div class="flex flex-col-reverse md:flex-row justify-between gap-4 px-5 pt-5">
      <div>
        <h2 class="text-lg font-bold">
          <font-awesome-icon
              :icon="['fas', 'plus']"
              class="text-primary"
          />
          Rebanho
        </h2>
        <p class="text-gray-500">Lorem ipsum lorem fusce eleifend inceptos bibendum conubia venenatis, erat torquent donec </p>
    </div>
      <Button
          aria-label="Star"
          icon="fa fa-plus"
          label="Cadastrar novo"
          severity="primary"
          @click="router.push('animals/create')"
      />
    </div>
    <Divider/>
    <div class="flex flex-col gap-5 items-center justify-between h-5/6">
      <div class="flex flex-col-reverse md:flex-row justify-center items-center w-full gap-4">
        <Tabs
            class="w-full"
            value="0"
        >
          <TabList class="flex flex-col items-start w-full">
            <Tab value="0">Fêmeas</Tab>
            <Tab value="1">Machos</Tab>
            <Tab value="2">Todos</Tab>
          </TabList>
          <TabPanels class="!p-0">
            <TabPanel value="0">
              <flock-table/>
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
import FlockTable from "~/components/animals/flock-datalist/flock-table.vue";

const router = useRouter()

</script>


<style scoped>

</style>