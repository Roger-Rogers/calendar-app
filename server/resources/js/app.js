import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VCalendar from 'v-calendar';

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

Vue.config.productionTip = false;

Vue.use(VCalendar, {
  componentPrefix: 'vc'
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
