<template>
  <v-col xl="9">
    <v-card class="p-5">
      <!-- head -->
      <div class="flex justify-between items-center mb-3">
        <h2 class="text-2xl font-semibold text-gray-700">Invoises</h2>
        <v-btn class="bg-brand text-white" @click="createPopup = true">
          <i class="fas fa-plus"></i>
          <span class="ml-2">Add new</span>
        </v-btn>
      </div>

      <!-- table -->
      <div>
        <TheTable :headers="headers" :items="GET_INVOICES">
          <!-- tmplt -->
          <template #item-user="data">
            <div class="flex items-center justify-center gap-3 py-2">
              <div
                class="image overflow-hidden w-[40px] h-[40px] rounded-full bg-gray-400 flex justify-center items-center"
              >
                <i v-if="!data.user.photo" class="fas fa-user text-white"></i>
                <img
                  v-else
                  :src="path + data.user.photo"
                  alt="photo"
                  class="w-full h-full object-cover"
                />
              </div>
              <div>
                <p class="font-semibold">
                  {{ data.user.first_name }} {{ data.user.last_name }}
                </p>
                <p class="text-center font-semibold text-gray-500">
                  {{ data.user.username }}
                </p>
              </div>
            </div>
          </template>

          <!--  -->
          <template #item-created_at="data">
            <div class="text-center">
              {{ new Date(data.created_at).toLocaleString() }}
            </div>
          </template>

          <!--  -->
          <template #item-billTo="data">
            <div class="text-center font-bold">
              {{ data.data.billTo }}
            </div>
          </template>

          <!--  -->
          <template #item-total="data">
            <div class="text-center font-bold text-brand">
              {{ data.data.total }}$
            </div>
          </template>

          <!--  -->
          <template #item-status="data">
            <div
              class="text-center font-bold flex items-center justify-center gap-2"
            >
              <div
                class="w-[20px] h-[20px] rounded-full"
                :style="`background: ${data.status.color}`"
              />
              <p class="uppercase">{{ data.status.title.name }}</p>
            </div>
          </template>

          <!--  -->
          <template #item-action="data">
            <div class="flex justify-center gap-1">
              <v-btn size="small" class="bg-blue text-white">
                <i class="fas fa-arrow-right"></i>
              </v-btn>
              <v-btn
                size="small"
                class="bg-yellow-500 text-white"
                @click="editPopup = data"
              >
                <i class="fas fa-edit"></i>
              </v-btn>
              <v-btn
                size="small"
                class="bg-red-500 text-white"
                @click="deleteInvoiceDialog = data._id"
              >
                <i class="fas fa-trash"></i>
              </v-btn>
            </div>
          </template>
        </TheTable>
        <!-- <pre>{{ GET_INVOICES }}</pre> -->
      </div>
    </v-card>
    <Popup :open="createPopup" @close="createPopup = false">
      <CreateInvoice @close="createPopup = false" @created="fetchInvoices" />
    </Popup>
    <Popup :open="editPopup" @close="editPopup = false">
      <EditInvoice
        @close="editPopup = false"
        @edited="fetchInvoices"
        :editInvoiceData="editPopup"
      />
    </Popup>

    <!-- dialog -->
    <Dialog v-model="deleteInvoiceDialog">
      <div class="p-5">
        <h2 class="text-xl font-semibold text-center mb-3">Are you sure?</h2>

        <div class="">
          <v-btn
            class="bg-red-500 text-white mr-3"
            @click="deleteInvoiceDialog = null"
            >Cancel</v-btn
          >
          <v-btn
            class="bg-blue-500 text-white"
            @click="deleteInvoice(deleteInvoiceDialog)"
            >Delete</v-btn
          >
        </div>
      </div>
    </Dialog>
  </v-col>
</template>

<script>
import TheTable from "@/components/TheTable.vue";
import Popup from "@/components/Popup.vue";
import Dialog from "@/components/Dialog.vue";
import CreateInvoice from "./CreateInvoice.vue";
import EditInvoice from "./EditInvoice.vue";
import { mapActions, mapGetters } from "vuex";
import { mediaUrl } from "@/axios.config";
import { useToast } from "vue-toastification";

export default {
  components: { TheTable, Popup, CreateInvoice, Dialog, EditInvoice },
  data() {
    return {
      toast: useToast(),
      path: mediaUrl,
      createPopup: false,
      editPopup: false,
      deleteInvoiceDialog: null,
      headers: [
        { text: "Created by", value: "user" },
        { text: "Created at", value: "created_at" },
        { text: "Bill To", value: "billTo" },
        { text: "Price", value: "total" },
        { text: "Status", value: "status" },
        { text: "Action", value: "action" },
      ],
      items: [],
    };
  },
  computed: {
    ...mapGetters("invoice", ["GET_INVOICES"]),
  },
  methods: {
    ...mapActions("invoice", ["FETCH_INVOICES", "DELETE_INVOICE"]),
    fetchInvoices(all = true) {
      this.FETCH_INVOICES(all);
    },
    async deleteInvoice(id) {
      try {
        await this.DELETE_INVOICE(id);
        this.toast.success("Invoice has been deleted!");
        this.fetchInvoices();
        this.deleteInvoiceDialog = null;
      } catch (err) {
        this.toast.error("Somthing went wrong!");
      }
    },
  },
  mounted() {
    this.fetchInvoices();
  },
};
</script>
