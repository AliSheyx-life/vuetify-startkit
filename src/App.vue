<template>
  <MainLayout>
    <router-view v-slot="{ Component }">
      <transition name="scale-effect" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </MainLayout>
</template>

<script>
import MainLayout from "./layouts/MainLayout.vue";

export default {
  components: { MainLayout },
};
</script>

<style>
.scale-effect-enter-active,
.scale-effect-leave-active {
  transition: all 0.3s ease;
}
.scale-effect-enter-from,
.scale-effect-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
