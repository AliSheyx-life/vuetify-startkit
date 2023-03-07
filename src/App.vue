<template>
  <MainLayout>
    <RouterView />
  </MainLayout>
</template>

<script>
import MainLayout from "./layouts/MainLayout.vue";

export default {
  components: { MainLayout },
};
</script>
