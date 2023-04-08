<template>
  <v-card class="p-5" id="status-dialog">
    <div class="w-[300px]">
      <h2 class="text-xl text-center font-semibold mb-3">Create new status</h2>

      <v-form @submit.prevent="login">
        <!-- inputs -->
        <v-text-field v-model="status" label="Status name"></v-text-field>
        <p class="mb-1 text-gray-600">Choose status color:</p>
        <v-color-picker
          v-if="showColorPicker && !color"
          hide-canvas
          hide-inputs
          hide-mode-switch
          show-swatches
          flat
          v-model="color"
        />

        <div class="flex" v-else>
          <p class="text-xl font-bold mr-3" :style="`color: ${color}`">
            {{ color }}
          </p>
          <v-btn
            class="bg-brand text-white"
            size="small"
            :style="`background: ${color}`"
            @click="(showColorPicker = true), (color = null)"
          >
            {{ color ? "Change color" : "Choose color" }}
          </v-btn>
        </div>

        <div class="buttons flex gap-1 mt-3">
          <v-btn class="bg-gray-500 text-white w-1/2" @click="$emit('close')"
            >Cancel</v-btn
          >
          <v-btn class="bg-blue-500 text-white w-1/2" @click="createStatus"
            >Create</v-btn
          >
        </div>
      </v-form>
    </div>
  </v-card>
</template>

<script>
import { useToast } from "vue-toastification";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      toast: useToast(),
      color: null,
      status: null,
      showColorPicker: false,
    };
  },
  methods: {
    ...mapActions("status", ["CREATE_STATUS"]),
    async createStatus() {
      if (!this.status) {
        this.toast.error("Enter text for status!");
        return;
      }
      if (this.status.length < 3) {
        this.toast.error("Minimum text length is 3");
        return;
      }
      if (!this.color) {
        this.toast.error("Choose color for status!");
        return;
      }
      const req = {
        title: {
          name: this.status.toLowerCase(),
        },
        color: this.color,
      };
      try {
        await this.CREATE_STATUS(req);
        this.toast.success("Status has been created!");
        this.$emit("close");
        this.$emit("created");
      } catch (err) {
        this.toast.error("Somthing went wrong!");
      }
    },
  },
};
</script>

<style>
#status-dialog .v-color-picker__controls {
  display: none;
}
</style>
