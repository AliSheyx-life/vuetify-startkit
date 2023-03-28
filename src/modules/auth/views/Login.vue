<template>
  <div class="login-page h-full min-h-screen flex justify-center items-center">
    <v-sheet width="400" class="">
      <h2 class="text-3xl mb-8 text-center font-bold text-gray-500">Login</h2>
      <v-form @submit.prevent="login">
        <!-- inputs -->
        <v-text-field
          v-model="username"
          :rules="rules"
          label="Username"
        ></v-text-field>

        <!-- inputs -->
        <v-text-field
          v-model="password"
          :rules="rules"
          label="Password"
        ></v-text-field>

        <v-btn type="submit" block class="mt-2 bg-brand text-white">Sign In</v-btn>
      </v-form>

      <p class="mt-3" v-if="false">
        Do'nt have account?
        <span
          class="text-brand font-semibold cursor-pointer"
          @click="$router.push({ name: 'register' })"
          >Sign Up</span
        >
      </p>
    </v-sheet>
  </div>
</template>

<script>
import http from "../../../axios.config";
import { setToLocaleStorage } from "../../../utils/localStorage";
import { useToast } from "vue-toastification";

export default {
  data() {
    return {
      username: "",
      password: "",
      toast: useToast(),
      rules: [
        (value) => {
          if (!value) {
            return "You must enter a first name.";
          }
        },
      ],
    };
  },
  methods: {
    async login() {
      const data = await this.rules;
      try {
        const res = await http.post("auth/login", {
          username: this.username,
          password: this.password,
        });
        if (res) {
          setToLocaleStorage("access_token", res.data.access_token);
        }
        this.toast.success("You are welcome!");
        this.$router.push({ name: "home" });
      } catch (err) {
        this.toast.error(err.response.data.message);
      }
    },
  },
};
</script>
