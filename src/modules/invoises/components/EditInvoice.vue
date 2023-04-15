<template>
  <div class="p-5 h-full overflow-y-scroll" id="newInvoce">
    <h3 class="text-xl font-semibold mb-3 pl-2">Create new invoice</h3>

    <!--  -->
    <v-form @submit.prevent>
      <!-- name -->
      <v-text-field
        v-model="newInvoice.name"
        label="Invoice name"
      ></v-text-field>

      <!-- billTo -->
      <v-text-field v-model="newInvoice.billTo" label="Bill to"></v-text-field>

      <!-- email -->
      <v-text-field v-model="newInvoice.email" label="Email"></v-text-field>

      <!-- paymentDate -->
      <div class="flex justify-center flex-wrap">
        <VDatePicker v-model="newInvoice.paymentDate" />
        <p class="text-xl mb-5 mt-2">
          Payment date: {{ formatDate(newInvoice.paymentDate) }}
        </p>
      </div>

      <!-- address country-->
      <v-text-field
        v-model="newInvoice.address.country"
        label="Country"
      ></v-text-field>

      <!-- address city-->
      <v-text-field
        v-model="newInvoice.address.city"
        label="City"
      ></v-text-field>

      <!-- address street-->
      <v-text-field
        v-model="newInvoice.address.street"
        label="Street"
      ></v-text-field>

      <hr />

      <!-- items -->
      <div class="mt-2">
        <h3 class="text-lg text-gray-700 pl-2 mb-2">Items:</h3>
        <!-- item -->
        <TransitionGroup name="items-list" tag="div">
          <div
            class="flex gap-1"
            v-for="(item, idx) in newInvoice.items"
            :key="idx"
          >
            <v-text-field
              class="w-[200px]"
              v-model="newInvoice.items[idx].name"
              label="Item name"
            ></v-text-field>
            <v-text-field
              v-model="newInvoice.items[idx].qtty"
              label="QTTY"
            ></v-text-field>
            <v-text-field
              v-model="newInvoice.items[idx].price"
              label="Price"
            ></v-text-field>
            <v-text-field
              disabled
              v-model="newInvoice.items[idx].total"
              label="total"
            ></v-text-field>
            <!--  -->
            <v-btn
              class="bg-red-500 text-white mt-4"
              size="small"
              v-if="newInvoice.items.length !== 1"
              @click="removeItem(idx)"
            >
              <i class="fas fa-trash"></i>
            </v-btn>
          </div>
        </TransitionGroup>

        <div class="flex justify-end">
          <v-btn
            class="bg-blue-500 text-white ml-auto"
            size="small"
            @click="addItem"
            >Add item</v-btn
          >
        </div>
      </div>

      <hr class="my-5" />

      <div class="">
        <p class="text-2xl text-gray-800 font-bold">
          Total: {{ getTotalPrice }}
        </p>
      </div>

      <hr class="my-5" />

      <div class="flex gap-1">
        <v-btn class="text-white bg-gray-500 w-1/2" @click="$emit('close')"
          >Cancel</v-btn
        >
        <v-btn class="text-white bg-blue w-1/2" @click="createInvoice"
          >Edit</v-btn
        >
      </div>
    </v-form>
  </div>
</template>

<script>
import { useToast } from "vue-toastification";
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    editInvoiceData: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      toast: useToast(),
      newInvoice: this.editInvoiceData.data,
    };
  },
  computed: {
    ...mapGetters("status", ["GET_STATUSES"]),
    getTotalPrice() {
      let total = 0;
      this.newInvoice.items.forEach((item) => {
        item.total = item.qtty * item.price;
        total += item.total;
      });
      return total;
    },
    checkFills() {
      if (
        !this.newInvoice.name ||
        !this.newInvoice.billTo ||
        !this.newInvoice.email ||
        !this.newInvoice.paymentDate ||
        !this.newInvoice.items.length ||
        !this.newInvoice.address.city ||
        !this.newInvoice.address.country ||
        !this.newInvoice.address.street
      ) {
        this.toast.error("Fill all the fillds!");
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    ...mapActions("invoice", ["EDIT_INVOICE"]),
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
    addItem() {
      this.newInvoice.items.push({
        name: null,
        qtty: 1,
        price: 0,
        total: 0,
      });
    },
    removeItem(idx) {
      this.newInvoice.items.splice(idx, 1);
    },
    async createInvoice() {
      if (!this.checkFills) return;
      //   this.newInvoice.invoiceDate = new Date();
      //   this.newInvoice.total = this.getTotalPrice;
      //   const newStatus = this.GET_STATUSES.find(
      //     (status) => status?.title?.name === "new"
      //   );
      //   this.newInvoice.status = newStatus;
      try {
        console.log(this.editInvoiceData._id);
        await this.EDIT_INVOICE(
          {
            data: this.newInvoice,
            status: this.newInvoice.status._id,
            id: this.editInvoiceData._id
          },
        );
        this.toast.success("Invoce successfully edited!");
        this.$emit("close");
        this.$emit("edited");
      } catch (err) {
        console.log(err);
        this.toast.error("Somthing went wrong!");
      }
    },
  },
};
</script>

<style>
#newInvoce::-webkit-scrollbar {
  display: none;
}

.items-list-enter-active,
.items-list-leave-active {
  transition: all 0.5s ease;
}
.items-list-enter-from,
.items-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
