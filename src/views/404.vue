<template>
  <div class="h-full page-404 p-5">
    <v-btn rounded="lg" class="bg-brand text-white" @click="$router.back()">
      <i class="fas fa-arrow-left"></i>
      <span>Back</span>
    </v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bgImage: "src/assets/images/404-pages.jpg",
    };
  },
};
</script>

<style v-bind>
.page-404 {
  background: url("src/assets/images/404-pages.jpg") no-repeat center / cover;
}
</style>
