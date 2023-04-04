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
    <v-menu>
      <template v-slot:activator="{ props }">
        <div class="user-info flex items-center cursor-pointer" v-bind="props">
          <div class="text-content text-right">
            <h4 class="user-name text-lg font-semibold text-gray-800 leading-3">
              {{ userInfo.username }}
            </h4>
            <p class="role text-xs font-semibold text-gray-500">
              {{ userInfo.email }}
            </p>
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
      </template>

      <!-- menu items -->
      <v-list>
        <!-- item -->
        <v-list-item @click="changePhoto = true">
          <v-list-item-title class="text-gray-600 cursor-pointer">
            <i class="fas fa-user"></i>
            <span class="ml-2 font-semibold">Change Image</span>
          </v-list-item-title>
        </v-list-item>
        <!-- item -->
        <v-list-item @click="changePass = true">
          <v-list-item-title class="text-gray-600 cursor-pointer">
            <i class="fas fa-lock"></i>
            <span class="ml-2 font-semibold">Change Password</span>
          </v-list-item-title>
        </v-list-item>
        <!-- item -->
        <v-list-item @click="logout = true">
          <v-list-item-title class="text-gray-600 cursor-pointer">
            <i class="fas fa-sign-out-alt"></i>
            <span class="ml-2 font-semibold">Logout</span>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <Dialog v-model="changePhoto" @close="changePhoto = false">
      <ChangePhoto />
    </Dialog>
    <Dialog v-model="changePass" @close="changePass = false">
      <ChangePassword @close="changePass = false" />
    </Dialog>
    <Dialog v-model="logout" @close="logout = false">
      <Logout @close="logout = false" />
    </Dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { fetchUserInfo } from "../api/auth";
import Dialog from "../components/Dialog.vue";
import ChangePhoto from "./components/ChangePhoto.vue";
import ChangePassword from "./components/ChangePassword.vue";
import Logout from "./components/Logout.vue";

export default {
  components: { Dialog, ChangePhoto, ChangePassword, Logout },
  data() {
    return {
      profileImage:
        "https://cdn-media-1.freecodecamp.org/images/0*xkJgg-6HskYrQ3N7.jpeg",
      isCollapsed: false,
      userInfo: {},
      changePhoto: true,
      changePass: false,
      logout: false,
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
  async mounted() {
    const res = await fetchUserInfo();
    this.userInfo = res;
  },
};
</script>
