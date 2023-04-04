<template>
  <div class="p-5">
    <h2 class="text-xl font-semibold mb-4">Edit user:</h2>
    <v-form @submit.prevent="createUser">
      <!-- inputs -->
      <v-text-field
        class=""
        v-model="newUser.first_name"
        :rules="rules"
        label="First name"
      />
      <!-- inputs -->
      <v-text-field
        class=""
        v-model="newUser.last_name"
        :rules="rules"
        label="Last name"
      />
      <!-- inputs -->
      <v-text-field
        class=""
        v-model="newUser.username"
        :rules="rules"
        label="Username"
      />
      <!-- inputs -->
      <v-text-field
        class=""
        v-model="newUser.email"
        :rules="rules"
        label="Email"
      />
      <!-- inputs -->
      <v-text-field
        class=""
        v-model="newUser.phone_number"
        :rules="rules"
        label="Phone Number"
      />
      <div class="flex gap-px text-white">
        <v-btn
          type="submit"
          class="mt-2 w-1/2 bg-gray-400"
          @click="$emit('close')"
        >
          Cancel
        </v-btn>
        <v-btn type="submit" class="mt-2 w-1/2 bg-brand"> Edit </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import { useToast } from "vue-toastification";
import { mapActions } from "vuex";

export default {
  props: {
    userInfo: {
      type: [Object, null],
      default: {},
    },
  },
  data() {
    return {
      toast: useToast(),
      newUser: this.userInfo,
      rules: [
        (value) => {
          if (!value) {
            return "Fill all fields";
          }
        },
      ],
    };
  },
  methods: {
    ...mapActions("users", ["EDIT_USER"]),

    async createUser() {
      await this.rules;
      if (
        !this.newUser.username ||
        !this.newUser.email ||
        !this.newUser.phone_number
      ) {
        return this.toast.error("Fill all fields");
      }
      //   if (!(this.newUser.password === this.newUser.confirm_password)) {
      //     return this.toast.error("Passwords do not match");
      //   }
      try {
        const req = {
          _id: this.newUser._id,
          username: this.newUser.username,
          email: this.newUser.email,
          first_name: this.newUser.first_name,
          last_name: this.newUser.last_name,
        };
        const res = await this.EDIT_USER(req);
        this.toast.success("User successfully edited!");
        this.$emit("userEdited");
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
