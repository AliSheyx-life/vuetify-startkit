<script>
export default {
  props: {
    width: {
      type: [String, Number],
      default: "auto",
    },
  },
};
</script>

<template>
  <v-dialog v-model="isOpen" :width="width">
    <v-card>
      <slot />
    </v-card>
  </v-dialog>
</template>
