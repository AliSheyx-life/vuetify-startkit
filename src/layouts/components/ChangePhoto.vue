<template>
  <div class="p-5 w-[300px]">
    <div
      class="pic overflow-hidden w-[200px] h-[200px] bg-brand mx-auto rounded-md flex justify-center items-center"
    >
      <i v-if="!photo" class="fas fa-user text-5xl text-white"></i>
      <img v-else :src="photo" class="w-full h-full object-cover" alt="" />
    </div>

    <div class="text-center mt-3">
      <button
        class="py-2 px-5 rounded-md bg-brand text-white"
        v-if="photo"
        @click="setNewImage"
      >
        Upload image
      </button>
      <label for="user-image" class="text-sm cursor-pointer" v-else>
        <button
          class="py-2 px-5 rounded-md bg-dark text-white pointer-events-none"
        >
          Choose Image
        </button>
      </label>
      <input
        id="user-image"
        v-show="false"
        type="file"
        @change="uploadPhoto"
        ref="file"
      />
    </div>
  </div>
</template>

<script>
import UploadImage from "v-upload-image";
import { mapActions } from "vuex";
import { useToast } from "vue-toastification";

export default {
  components: { UploadImage },
  data() {
    return {
      photo: null,
      toast: useToast(),
    };
  },
  methods: {
    ...mapActions("users", ["CHANGE_PROFILE_PHOTO"]),
    async uploadPhoto() {
      const file = await this.$refs.file.files[0];
      const types = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
      if (!types.includes(file.type)) {
        this.toast.warning("You can choose only image!");
        return;
      }
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (e) => {
        this.photo = e.target.result;
      };
    },
    async setNewImage() {
      try {
        await this.CHANGE_PROFILE_PHOTO(this.photo);
      } catch (err) {
        console.log(err);
        if (err.response.data.message) {
          this.toast.error(err.response.data.message);
        } else {
          this.toast.error("Somthing went wrong!");
        }
      }
    },
  },
};
</script>
