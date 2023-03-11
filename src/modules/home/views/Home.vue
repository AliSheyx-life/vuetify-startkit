<template>
  <v-container>
    <h2 class="mb-5 text-3xl text-gray-600 font-bold">Invoises</h2>
    <Vue3EasyDataTable show-index :headers="headers" :items="items">
    </Vue3EasyDataTable>
  </v-container>
</template>

<script>
import Vue3EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";

export default {
  components: { Vue3EasyDataTable },
  data() {
    return {
      headers: [
        { text: "Name", value: "name" },
        { text: "Height (cm)", value: "height", sortable: true },
        { text: "Weight (kg)", value: "weight", sortable: true },
        { text: "Age", value: "age", sortable: true },
      ],
      items: [
        { name: "Curry", height: 178, weight: 77, age: 20 },
        { name: "James", height: 180, weight: 75, age: 21 },
        { name: "Jordan", height: 181, weight: 73, age: 22 },
      ],
    };
  },
};
</script>
