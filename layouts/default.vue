<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      temporary
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <div>
        <v-btn to="/register" color="primary">新規登録</v-btn>
        <v-btn to="/login" v-if="!isLogin">ログイン</v-btn> <!--computedに登録されているisLoginプロパティの利用 （isLoginがfalseだった場合-->
        <v-btn v-else @click="logout()">ログアウト</v-btn>
        <v-spacer />
      </div>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import firebase from "~/plugins/firebase";

export default {
  middleware: ["logoutOneHourLater"],
  data() {
    return {
      wasLogin: false,
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-home",
          title: "Home",
          to: "/",
        },
        {
          icon: "mdi-heart-circle",
          title: "My Settings",
          to: "/savesetting",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Pro Setting List",
    };
  },
  methods: {
    async logout() {
      await firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.commit("dbState/setIsLogin", false); // ログインステータスをfalseに
          alert("ログアウトが完了しました");
          this.$router.push("/login");
        });
    },
  },
  computed: {
    isLogin() {
      return this.$store.getters["dbState/getIsLogin"]; // vuexからログインしているかの情報を取得
    },
  },
};
</script>