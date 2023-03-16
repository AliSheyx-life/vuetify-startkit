<template>
  <v-container>
    <v-card class="p-5">
      <!--  -->
      <div class="head flex justify-between items-center mb-7">
        <h2 class="text-3xl text-gray-600 font-bold">Invoises</h2>
        <v-btn class="bg-green-600 text-white">
          <i class="fas fa-plus"></i>
          <span class="ml-2">Create New</span>
        </v-btn>
      </div>

      <TheTable :headers="headers" :items="items">
        <!--  -->
        <template #item-id="data">
          <p class="font-semibold text-center">{{ data.id }}</p>
        </template>
        <!--  -->
        <template #item-name="data">
          <div class="text-center font-bold text-sm text-gray-700">
            <p>{{ data.name }}</p>
          </div>
        </template>
        <!--  -->
        <template #item-date="data">
          <div class="text-center font-semibold text-gray-500">
            <p>{{ data.date }}</p>
          </div>
        </template>
        <!--  -->
        <template #item-price="data">
          <div class="text-center font-semibold text-gray-800">
            <p>${{ data.price }}</p>
          </div>
        </template>
        <!--  -->
        <template #item-status="data">
          <div class="flex justify-center">
            <p
              class="text-center font-bold text-sm"
              :class="{
                'text-red-500 ': data.status === 'approved',
                'text-green-500 ': data.status === 'paid',
                'text-yellow-500 ': data.status === 'pending',
              }"
            >
              {{ data.status }}
            </p>
          </div>
        </template>
        <!--  -->
        <template #item-action>
          <div class="my-2 flex justify-center">
            <v-btn class="bg-brand text-white">View more</v-btn>
          </div>
        </template>
      </TheTable>
    </v-card>
  </v-container>
</template>

<script>
import TheTable from "@/components/TheTable.vue";
import usersArray from "./usersArray";

export default {
  components: { TheTable },
  data() {
    return {
      headers: [
        { text: "ID", value: "id", width: 150 },
        {
          text: "Name",
          value: "name",
          sortable: true,
          width: 500,
        },
        { text: "Date", value: "date", sortable: true },
        { text: "Price", value: "price", sortable: true, width: 150 },
        { text: "Status", value: "status", sortable: true, width: 200 },
        { text: "Action", value: "action", width: 200 },
      ],
      items: usersArray,
    };
  },
};
</script>
