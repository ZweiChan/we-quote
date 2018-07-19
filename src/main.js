import Vue from "vue";
import App from "./App.vue";

import router from "./router";
import store from "./store";


// Element UI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./styles.scss";

Vue.use(ElementUI);

// FontAwesome 5
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faArrowAltCircleUp,
  faHeart
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faBars, faArrowAltCircleUp, faHeart);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
