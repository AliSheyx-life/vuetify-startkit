<template>
  <main class="main-layout">
    <Sidebar />
    <div class="main-wrapper flex flex-column">
      <ProfileMenu />
      <div class="main-router-content grow overflow-y-scroll">
        <slot />
      </div>
    </div>
  </main>
</template>

<script>
import Sidebar from "./Sidebar.vue";
import ProfileMenu from "./ProfileMenu.vue";

export default {
  components: {
    Sidebar,
    ProfileMenu,
  },
};
</script>

<style>
.main-layout {
  display: flex;
  height: 100vh;
  width: 100%;
}

.main-layout .main-wrapper {
  flex-grow: 1;
}

.main-router-content {
  background: #f1f1f1;
}

.main-router-content::-webkit-scrollbar {
  display: none;
}
</style>
