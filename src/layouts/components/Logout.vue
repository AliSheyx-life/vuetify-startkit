<template>
  <div class="p-5">
    <h2 class="text-xl font-semibold text-center mb-3">Are you sure?</h2>

    <div class="">
      <v-btn class="bg-red-500 text-white mr-3" @click="$emit('close')"
        >Cancel</v-btn
      >
      <v-btn class="bg-blue-500 text-white" @click="logout">Logout</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem("access_token");
      this.$router.push("login");
    },
  },
};
</script>
