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
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <!-- <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      > -->
        <!-- <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon> -->
      <!-- </v-btn> -->
      <!-- <v-btn
        icon
        @click.stop="clipped = !clipped"ヘッダー固定
      >
        <v-icon>mdi-application</v-icon>
      </v-btn> -->
      <!-- <v-btn
        icon
        @click.stop="fixed = !fixed"フッター固定
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn> -->
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <div>
      <v-btn to="/register" color="primary">新規登録</v-btn>
      <v-btn to="/login" v-if="wasLogin">ログイン</v-btn>
      <v-btn v-if="isLogin" @click="logout()">ログアウト</v-btn>
      <!-- <v-btn v-if="isLogin">ログアウト</v-btn> -->
      <v-spacer />
      </div>
      <!-- <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn> -->
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <!-- <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import firebase from '~/plugins/firebase'

export default {
  data () {
    return {
      isLogin: false,
      wasLogin: false,
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'mdi-heart-circle',
          title: 'My Settings',
          to: '/savesetting'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Pro Setting List'
    }
  },
  async mounted () {
    await firebase.auth().onAuthStateChanged((user) => this.isLogin = user ? true :false)
    await firebase.auth().onAuthStateChanged((user) => this.wasLogin = user ? false :true)
  },
  methods: {
    async logout() {
      await firebase.auth().signOut()
      .then(() => {
          alert('ログアウトが完了しました')
          this.$router.push('/')
        })
    },
  },
  
}
</script>
