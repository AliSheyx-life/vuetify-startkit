<template>
  <v-col xl="3">
    <v-card class="p-5">
      <!-- head -->
      <div class="flex justify-between items-center mb-2">
        <h2 class="text-2xl font-semibold text-gray-700">Statuses</h2>
        <v-btn class="bg-brand text-white" @click="openDialog = true">
          <i class="fas fa-plus"></i>
          <span class="ml-2">Add new</span>
        </v-btn>
      </div>

      <!-- body -->
      <h3 class="text-xl text-gray-500 text-center" v-if="!GET_STATUSES.length">
        There is no status
      </h3>

      <v-list-item v-for="item in GET_STATUSES" :key="item.title.name" v-else>
        <div class="flex items-center">
          <div
            class="w-3 h-3 rounded-md"
            :style="`background: ${item.color}`"
          ></div>
          <p class="ml-2 uppercase">
            {{ item.title.name }}
          </p>
          <v-btn
            class="bg-red-500 text-white ml-auto"
            size="small"
            @click="deleteStatusDialog = item._id"
          >
            <i class="fas fa-trash"></i>
          </v-btn>
        </div>
      </v-list-item>
    </v-card>

    <!-- CREATE STATUS -->
    <Dialog v-model="openDialog">
      <CreateStatus @close="openDialog = false" @created="fetchStatuses" />
    </Dialog>

    <!-- DELETE STATUS -->
    <Dialog v-model="deleteStatusDialog">
      <div class="p-5">
        <h2 class="text-xl font-semibold text-center mb-3">Are you sure?</h2>

        <div class="">
          <v-btn
            class="bg-red-500 text-white mr-3"
            @click="deleteStatusDialog = null"
            >Cancel</v-btn
          >
          <v-btn
            class="bg-blue-500 text-white"
            @click="deleteStatus(deleteStatusDialog)"
            >Delete</v-btn
          >
        </div>
      </div>
    </Dialog>
  </v-col>
</template>

<script>
import Dialog from "@/components/Dialog.vue";
import CreateStatus from "./CreateStatus.vue";
import { mapActions, mapGetters } from "vuex";
import { useToast } from "vue-toastification";

export default {
  components: { Dialog, CreateStatus },
  data() {
    return {
      openDialog: false,
      deleteStatusDialog: null,
      toast: useToast(),
    };
  },
  computed: {
    ...mapGetters("status", ["GET_STATUSES"]),
  },
  methods: {
    ...mapActions("status", ["FETCH_STATUSES", "DELETE_STATUS"]),
    async fetchStatuses() {
      await this.FETCH_STATUSES();
    },
    async deleteStatus(id) {
      try {
        await this.DELETE_STATUS(id);
        this.toast.success("Status has been deleted!");
        this.fetchStatuses();
        this.deleteStatusDialog = null;
      } catch (err) {
        console.log(err);
        this.toast.error("Somthing went wrong!");
      }
    },
  },
  mounted() {
    this.fetchStatuses();
  },
};
</script>
