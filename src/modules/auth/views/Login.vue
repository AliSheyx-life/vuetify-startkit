<template>
  <v-sheet width="300" class="mx-auto">
    <v-form @submit.prevent>
      <!-- inputs -->
      <v-text-field
        v-model="login"
        :rules="rules"
        label="First name"
      ></v-text-field>

      <!-- inputs -->
      <v-text-field
        v-model="password"
        :rules="rules"
        label="First name"
      ></v-text-field>

      <v-btn type="submit" block class="mt-2">Sign In</v-btn>
    </v-form>

    <v-btn @click="$router.push('/')" class="mt-2">Go home</v-btn>
  </v-sheet>
</template>

<script>
export default {
  data() {
    return {
      login: "",
      password: "",
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
