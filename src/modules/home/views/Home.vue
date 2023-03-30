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

            <v-btn class="bg-red-600 text-white" @click="deleteUser(user._id)">
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
  </v-container>
</template>

<script>
import TheTable from "@/components/TheTable.vue";
import { mapActions, mapGetters } from "vuex";
import Popup from "@/components/Popup.vue";
import CreateUser from "../components/CreateUser.vue";
import EditUser from "../components/EditUser.vue";
import { useToast } from "vue-toastification";

export default {
  components: { TheTable, Popup, CreateUser, EditUser },
  data() {
    return {
      toast: useToast(),
      createUser: false,
      editUser: null,
      headers: [
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
      const confirmData = confirm("Are you sure?");
      if (!confirmData) return;
      if (id) {
        try {
          await this.DELETE_USER(id);
          this.toast.success("User has been deleted!");
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
