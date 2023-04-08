<template>
  <v-col xl="9">
    <v-card class="p-5">
      <!-- head -->
      <div class="flex justify-between items-center mb-3">
        <h2 class="text-2xl font-semibold text-gray-700">Invoises</h2>
        <v-btn class="bg-brand text-white">
          <i class="fas fa-plus"></i>
          <span class="ml-2">Add new</span>
        </v-btn>
      </div>

      <!-- table -->
      <div>
        <TheTable :headers="headers" :items="items" />
      </div>
    </v-card>
  </v-col>
</template>

<script>
import TheTable from "@/components/TheTable.vue";

export default {
  components: { TheTable },
  data() {
    return {
      headers: [
        { text: "ID", value: "id" },
        { text: "Created at", value: "created_at" },
        { text: "Name", value: "name" },
        { text: "Price", value: "price" },
        { text: "Status", value: "status" },
        { text: "Action", value: "action" },
      ],
      items: [],
    };
  },
};
</script>
