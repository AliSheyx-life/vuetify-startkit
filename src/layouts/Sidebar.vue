<template>
  <div class="sidebar p-5 bg-dark text-white">
    <div class="logo flex items-center">
      <img
        src="@/assets/images/logo.jpg"
        alt="logo"
        class="w-12 rounded-full"
      />
      <span class="ml-2 text-2xl uppercase font-semibold">It-Labs</span>
    </div>

    <!-- menu -->
    <ul class="py-5 mt-5">
      <li
        class="cursor-pointer text-xl p-2 rounded-md mb-2"
        :class="{ 'bg-brand': item.childs.includes($route.name) }"
        @click="$router.push({ name: item.routeName })"
        v-for="item in menuItems"
        :key="item.name"
      >
        <i :class="item.icon"></i>
        <span class="ml-2">{{ item.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import menuItems from "./menuConfig.js";

export default {
  data() {
    return {
      menuItems,
    };
  },
};
</script>

<style>
.sidebar {
  width: 250px;
}
</style>
