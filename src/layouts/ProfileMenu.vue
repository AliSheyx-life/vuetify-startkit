<template>
  <div
    class="pofile-menu bg-gray-50 px-5 py-2 flex items-center justify-between border-b-[1px] border-gray-200"
  >
    <!-- toggler -->
    <div class="sidebar-toggler-wrapper h-full">
      <div
        class="sidebar-toggler w-9 h-full shadow-md rounded-md p-1 bg-white cursor-pointer"
        @click="toggleSidebar"
      >
        <div
          class="sidebar-toggler-item w-1/2 h-full bg-brand rounded-md transition-all"
          :class="IS_COLLAPSED ? 'ml-auto' : 'mr-auto'"
        ></div>
      </div>
    </div>

    <!-- user info -->
    <div class="user-info flex items-center">
      <div class="text-content text-right">
        <h4 class="user-name text-lg font-semibold text-gray-800 leading-3">
          Evan You
        </h4>
        <p class="role text-xs font-semibold text-gray-500">Creator</p>
      </div>
      <div class="profile-pic ml-2">
        <v-avatar color="info">
          <img :src="profileImage" alt="image" v-if="profileImage" />
          <div class="icon" v-else>
            <i class="fas fa-user"></i>
          </div>
        </v-avatar>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      profileImage:
        "https://cdn-media-1.freecodecamp.org/images/0*xkJgg-6HskYrQ3N7.jpeg",
      isCollapsed: false,
    };
  },
  computed: {
    ...mapGetters("ui", ["IS_COLLAPSED"]),
  },
  methods: {
    ...mapActions("ui", ["TOGGLE_SIDEBAR"]),
    toggleSidebar() {
      this.TOGGLE_SIDEBAR();
    },
  },
};
</script>
