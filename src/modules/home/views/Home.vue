<template>
  <v-container>
    <v-card class="p-5">
      <!--  -->
      <div class="head flex justify-between items-center mb-7">
        <h2 class="text-3xl text-gray-600 font-bold">Users</h2>

        <v-btn class="bg-green-600 text-white" @click="createUser = true">
          <i class="fas fa-plus"></i>
          <span class="ml-2">Create New</span>
        </v-btn>
      </div>

      <TheTable :headers="headers" :items="GET_USERS_LIST">
        <!--  -->
        <template #item-avatar="user">
          <div class="flex justify-center">
            <v-avatar class="bg-brand">
              <i v-if="!user.photo" class="fas fa-user text-white"></i>
              <img v-else :src="mediaUrl + user.photo" :alt="user.username" />
            </v-avatar>
          </div>
        </template>

        <!--  -->
        <template #item-name="user">
          <div class="text-center font-semibold">
            {{ user.first_name }}
            {{ user.last_name }}
          </div>
        </template>

        <!--  -->
        <template #item-username="user">
          <div class="text-center font-semibold">
            {{ user.username }}
          </div>
        </template>

        <!--  -->
        <template #item-phone_number="user">
          <div class="text-center">
            <a :href="'tel:' + user.phone_number" class="text-brand"
              >{{ user.phone_number }}
            </a>
          </div>
        </template>

        <!--  -->
        <template #item-email="user">
          <div class="text-center">
            <a :href="'mailto: ' + user.email" class="text-brand"
              >{{ user.email }}
            </a>
          </div>
        </template>

        <!--  -->
        <template #item-created_at="user">
          <div class="text-center">
            {{ new Date(user.created_at).toLocaleString() }}
          </div>
        </template>

        <!--  -->
        <template #item-action="user">
          <div class="flex justify-center items-center my-2">
            <v-btn class="bg-blue-600 text-white mr-2" @click="editUser = user">
              <i class="fas fa-edit"></i>
            </v-btn>

            <v-btn
              class="bg-red-600 text-white"
              @click="deleteUserDialog = user._id"
            >
              <i class="fas fa-trash"></i>
            </v-btn>
          </div>
        </template>
      </TheTable>
    </v-card>

    <Popup :open="createUser" @close="createUser = false">
      <CreateUser @close="createUser = false" @userCreated="fetchAllUsers" />
    </Popup>

    <Popup :open="editUser" @close="editUser = null">
      <EditUser
        :userInfo="editUser"
        @close="editUser = null"
        @userEdited="fetchAllUsers"
      />
    </Popup>

    <Dialog v-model="deleteUserDialog">
      <div class="p-5">
        <h2 class="text-xl font-semibold text-center mb-3">Are you sure?</h2>

        <div class="">
          <v-btn
            class="bg-red-500 text-white mr-3"
            @click="deleteUserDialog = null"
            >Cancel</v-btn
          >
          <v-btn
            class="bg-blue-500 text-white"
            @click="deleteUser(deleteUserDialog)"
            >Delete</v-btn
          >
        </div>
      </div>
    </Dialog>
  </v-container>
</template>

<script>
import TheTable from "@/components/TheTable.vue";
import { mapActions, mapGetters } from "vuex";
import Popup from "@/components/Popup.vue";
import CreateUser from "../components/CreateUser.vue";
import EditUser from "../components/EditUser.vue";
import { useToast } from "vue-toastification";
import Dialog from "@/components/Dialog.vue";
import { mediaUrl } from "@/axios.config";

export default {
  components: { TheTable, Popup, CreateUser, EditUser, Dialog },
  data() {
    return {
      toast: useToast(),
      mediaUrl: mediaUrl,
      deleteUserDialog: null,
      createUser: false,
      editUser: null,
      headers: [
        {
          text: "Avatar",
          value: "avatar",
          sortable: true,
        },
        {
          text: "Name",
          value: "name",
          sortable: true,
        },
        {
          text: "Username",
          value: "username",
          sortable: true,
        },
        {
          text: "Username",
          value: "username",
          sortable: true,
        },
        {
          text: "Phone number",
          value: "phone_number",
        },
        {
          text: "Email",
          value: "email",
        },
        {
          text: "Created at",
          value: "created_at",
          sortable: true,
        },
        {
          text: "Action",
          value: "action",
        },
      ],
    };
  },
  computed: {
    ...mapGetters("users", ["GET_USERS_LIST"]),
  },
  methods: {
    ...mapActions("users", ["FETCH_ALL_USERS", "DELETE_USER"]),
    async fetchAllUsers() {
      await this.FETCH_ALL_USERS();
    },
    async deleteUser(id) {
      if (id) {
        try {
          await this.DELETE_USER(id);
          this.toast.success("User has been deleted!");
          this.deleteUserDialog = null;
          await this.fetchAllUsers();
        } catch (err) {
          this.toast.danger("Somthing went wrong!");
        }
      }
    },
  },
  mounted() {
    this.fetchAllUsers();
  },
};
</script>
