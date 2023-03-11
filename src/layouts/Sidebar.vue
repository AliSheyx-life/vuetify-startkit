<template>
  <div
    class="sidebar p-5 bg-dark text-white"
    :class="!IS_COLLAPSED ? 'collapsed' : ''"
  >
    <div class="logo flex items-center relative">
      <img
        src="@/assets/images/logo.jpg"
        alt="logo"
        class="rounded-full transition-all"
        :class="IS_COLLAPSED ? 'w-12' : 'w-10'"
      />
      <!-- <transition name="logo-fade-first"> -->
      <span
        v-if="IS_COLLAPSED"
        class="ml-2 text-2xl uppercase font-semibold absolute left-12"
        >It-Labs</span
      >
      <!-- </transition> -->
    </div>

    <!-- menu -->
    <ul class="py-5 mt-5">
      <li
        class="cursor-pointer text-xl p-2 rounded-md mb-2 relative"
        :class="{ 'bg-brand': item.childs.includes($route.name) }"
        @click="$router.push({ name: item.routeName })"
        v-for="item in menuItems"
        :key="item.name"
      >
        <i :class="item.icon"></i>
        <transition name="logo-fade">
          <span class="ml-2 absolute" v-if="IS_COLLAPSED">{{ item.name }}</span>
        </transition>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import menuItems from "./menuConfig.js";

export default {
  data() {
    return {
      menuItems,
    };
  },
  computed: {
    ...mapGetters("ui", ["IS_COLLAPSED"]),
  },
};
</script>

<style>
/* .logo-fade-enter-active,
.logo-fade-leave-active {
  transition: opacity 0.3s ease;
}

.logo-fade-enter-from,
.logo-fade-leave-to {
  opacity: 0;
} */

.sidebar {
  min-width: 250px;
  transition: 0.7s;
  overflow: hidden;
}
.sidebar.collapsed {
  min-width: 0px;
}

.logo-fade-enter-active,
.logo-fade-leave-active {
  transition: 0.3s ease;
  width: 0;
}

.logo-fade-enter-from,
.logo-fade-leave-to {
  width: 0;
  opacity: 0;
}
</style>
