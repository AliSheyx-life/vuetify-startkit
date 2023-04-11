import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import Toast from "vue-toastification";
import VCalendar from "v-calendar";

import "v-calendar/style.css";
import "vue-toastification/dist/index.css";
import "vuetify/styles";
import "./assets/styles/tailwind.css";

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);

app.use(router);
app.use(store);
app.use(vuetify);
app.use(VCalendar, {});
app.use(Toast);

app.mount("#app");
