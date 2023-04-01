<template>
  <div class="p-5 min-w-[350px]">
    <h2 class="text-xl font-semibold text-center mb-3 text-gray-600">
      Change password
    </h2>

    <v-form @submit.prevent="changePassword">
      <!-- inputs -->
      <v-text-field
        v-model="newPassword"
        :rules="rules"
        label="New password"
      ></v-text-field>

      <!-- inputs -->
      <v-text-field
        v-model="confirmPassword"
        :rules="rules"
        label="Confirm new password"
      ></v-text-field>

      <v-btn type="submit" block class="mt-2 bg-brand text-white">Change</v-btn>
    </v-form>
  </div>
</template>

<script>
import { useToast } from "vue-toastification";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      toast: useToast(),
      newPassword: null,
      confirmPassword: null,
      rules() {
        if (!value) {
          return "Fill all fields";
        }
      },
    };
  },
  methods: {
    ...mapActions("users", ["CHANGE_PASSWORD"]),
    async changePassword() {
      if (!this.newPassword || !this.confirmPassword) {
        this.toast.warning("Fill all fields");
        return;
      } else if (this.newPassword !== this.confirmPassword) {
        this.toast.warning("Passwords do`nt match!");
        return;
      }
      try {
        await this.CHANGE_PASSWORD({
          password: this.newPassword,
          confirm_password: this.confirmPassword,
        });
        this.toast.success("Password has been changed!");
        this.$emit("close");
      } catch (err) {
        console.log(err);
        if (err?.response?.data?.message[0]) {
          this.toast.error(err?.response?.data?.message[0]);
        } else {
          this.toast.error("Something went wrong");
        }
      }
    },
  },
};
</script>
