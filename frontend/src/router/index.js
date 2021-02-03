import Vue from "vue";
import VueRouter from "vue-router";
import MainMails from "../views/mails/index.vue";
import Mails from "../views/mails/Mails.vue";
import Mail from "../views/mails/Mail.vue";
import SendMail from "../views/mails/SendMail.vue";
import Auth from "../views/Auth.vue";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/mail"
  },
  {
    path: "/mail",
    redirect: "/mail/inbox",
    component: MainMails,
    beforeEnter: (to, from, next) => {
      if (!store.getters["user/isLoggedIn"]) {
        next("/auth");
      } else next();
    },
    children: [
      {
        path: "inbox",
        name: "activeMails",
        component: Mails
      },
      {
        path: "trash",
        name: "deletedMails",
        component: Mails
      },
      {
        path: "favorites",
        name: "favoritesMails",
        component: Mails
      },
      {
        path: "send",
        name: "SendMail",
        component: SendMail
      },
      {
        path: ":id",
        name: "Mail",
        component: Mail
      }
    ]
  },
  {
    path: "/auth",
    component: Auth,
    redirect: "auth/login",
    beforeEnter: (to, from, next) => {
      if (store.getters["user/isLoggedIn"]) {
        next("/mail");
      } else next();
    },
    children: [
      {
        path: "login",
        name: "Login"
      },
      {
        path: "signUp",
        name: "SignUp"
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
