<template>
  <div>
    <MainLayout v-if="!hasLayout">
      <router-view v-slot="{ Component }">
        <transition name="scale-effect" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </MainLayout>
    <router-view v-else />
  </div>
</template>

<script>
import MainLayout from "./layouts/MainLayout.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: { MainLayout },
  computed: {
    ...mapGetters("ui", ["IS_COLLAPSED"]),
    hasLayout() {
      const items = ["login", "register"];
      const currentRoute = this.$route.name;
      return items.includes(currentRoute);
    },
  },
  methods: {
    ...mapActions("ui", ["GET_SIDEBAR_STATE"]),
    async checkSidebarState() {
      const data = await this.GET_SIDEBAR_STATE();
      if (data === null) {
        localStorage.setItem("sidebar-ui", JSON.stringify(false));
      }
    },
  },
  mounted() {
    this.checkSidebarState();
  },
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
