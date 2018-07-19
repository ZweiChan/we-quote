import Vue from "vue";
import Router from "vue-router";
import Index from "@/views/index";
import Upload from "@/views/upload";
import Login from "@/views/login";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: Index
    },
    {
      path: "/upload",
      component: Upload
    },
    {
      path: "/login",
      component: Login
    }
  ]
});
