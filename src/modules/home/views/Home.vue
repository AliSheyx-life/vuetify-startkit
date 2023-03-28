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
            <a :href="'tel:' + user.phone_number" class="text-brand
                  ">{{ user.phone_number }}
            </a>
          </div>
        </template>

        <!--  -->
        <template #item-email="user">
          <div class="text-center">
            <a :href="'mailto: ' + user.email" class="text-brand
                  ">{{ user.email }}
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
        <template #item-action>
          <div class="flex justify-center items-center my-2">
            <v-btn class="bg-blue-600 text-white mr-2">
              <i class="fas fa-edit"></i>
            </v-btn>
            <v-btn class="bg-red-600 text-white">
              <i class="fas fa-trash"></i>
            </v-btn>
          </div>
        </template>

      </TheTable>
    </v-card>
    
    <Popup :open="createUser" @close="createUser = false">
      <CreateUser 
        @close="createUser = false"
        @userCreated="fetchAllUsers"
      />
    </Popup>
  </v-container>
</template>

<script>
import TheTable from "@/components/TheTable.vue";
import { mapActions, mapGetters } from "vuex";
import Popup from '@/components/Popup.vue';
import CreateUser from "../components/CreateUser.vue"

export default {
  components: { TheTable, Popup, CreateUser },
  data() {
    return {
      createUser: false,
      headers: [
        {
          text: "Username",
          value: "username",
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
        },
        {
          text: "Action",
          value: "action",
        }
      ],
    };
  },
  computed: {
    ...mapGetters('users', ['GET_USERS_LIST'])
  },
  methods: {
    ...mapActions('users', ['FETCH_ALL_USERS']),
    async fetchAllUsers() {
      await this.FETCH_ALL_USERS();
    }
  },
  mounted() {
    this.fetchAllUsers()
  }
};
</script>
