import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VCalendar from "v-calendar";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

Vue.use(VCalendar);

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
