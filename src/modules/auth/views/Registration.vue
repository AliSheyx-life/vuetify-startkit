<template>
  <div class="login-page h-full min-h-screen flex justify-center items-center">
    <v-sheet width="400" class="">
      <h2 class="text-3xl mb-8 text-center font-bold text-gray-500">
        Registration
      </h2>
      <v-form @submit.prevent>
        <!-- inputs -->
        <v-text-field
          v-model="login"
          :rules="rules"
          label="Username"
        ></v-text-field>

        <!-- inputs -->
        <v-text-field
          v-model="email"
          :rules="rules"
          label="Email"
        ></v-text-field>

        <!-- inputs -->
        <v-text-field
          v-model="password"
          :rules="rules"
          label="Password"
        ></v-text-field>

        <v-btn type="submit" block class="mt-2">Sign Up</v-btn>
      </v-form>

      <p class="mt-3">
        Already have account?
        <span
          class="text-brand font-semibold cursor-pointer"
          @click="$router.push({ name: 'login' })"
          >Sign In</span
        >
      </p>
    </v-sheet>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: "",
      password: "",
      email: "",
      rules: [
        (value) => {
          if (!value) {
            return "You must enter a first name.";
          }
        },
      ],
    };
  },
};
</script>
