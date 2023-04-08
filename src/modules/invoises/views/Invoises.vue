<template>
  <div class="">
    <v-container>
      <v-row>
        <!-- invoises -->
        <Invoises />
        <!-- statuses -->
        <Statuses />
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Invoises from "../components/InvoisesComponent.vue";
import Statuses from "../components/StatusesComponents.vue";

export default {
  components: { Invoises, Statuses },
};
</script>
