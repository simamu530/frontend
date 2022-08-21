<template>
  <v-app>
    <v-container fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card width="400px" class="mx-auto mt-5 pa-6" color="" outlined>
            <v-card-title>
              <h1 class="display-1">ログイン</h1>
            </v-card-title>

            <div class="login">
              <validation-observer ref="obs" v-slot="ObserverProps">
                <v-btn @click="google" color="primary">google</v-btn>
                <validation-provider
                  v-slot="{ errors }"
                  rules="email|required"
                  name="メール"
                >
                  <v-text-field
                    label="メールアドレス"
                    prepend-icon="mdi-account-circle"
                    v-model="email"
                    type="email"
                    required
                    :error-messages="errors"
                  />
                </validation-provider>
                <validation-provider
                  v-slot="{ errors }"
                  rules="required|min:6"
                  name="パスワード"
                >
                  <v-text-field
                    v-bind:type="showPass ? 'text' : 'password'"
                    @click:append="showPass = !showPass"
                    v-bind:append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                    label="パスワード"
                    v-model="password"
                    prepend-icon="mdi-lock"
                    required
                    :error-messages="errors"
                  />
                </validation-provider>
                <v-btn
                  @click="login"
                  color="primary"
                  :disabled="ObserverProps.invalid || !ObserverProps.validated"
                  >ログイン</v-btn
                >
                <v-btn @click="home">戻る</v-btn>
              </validation-observer>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import firebase from "~/plugins/firebase";
export default {
  data() {
    return {
      email: null,
      password: null,
      showPass: false,
    };
  },
  methods: {
    async login() {
      if (!this.email || !this.password) {
        alert("メールアドレスまたはパスワードが入力されていません。");
        return;
      }
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(async (res) => {
          const userId = res.user.uid;
          const response = await this.$axios.get(
            "http://127.0.0.1:8000/api/v1/admin/" + userId
          ); // mysqlのusersテーブルからユーザのデータ取得
          if (response.data.data.admin) {
            // 管理者の場合
            alert("管理者です");
            this.$store.commit("dbState/setIsAdmin", true); //ログイン状態の保存
          } else {
            // 管理者以外の場合
            alert("ユーザです");
            this.$store.commit("dbState/setIsAdmin", false);
          }
          alert("ログインが完了しました");
          //this.$router.push('/')
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/invalid-email":
              alert("メールアドレスの形式が違います。");
              break;
            case "auth/user-disabled":
              alert("ユーザーが無効になっています。");
              break;
            case "auth/user-not-found":
              alert("ユーザーが存在しません。");
              break;
            case "auth/wrong-password":
              alert("パスワードが間違っております。");
              break;
            default:
              alert("エラーが起きました。しばらくしてから再度お試しください。");
              break;
          }
        });
    },
    home() {
      this.$router.push("/");
    },
    google() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          /** @type {firebase.auth.OAuthCredential} */
          var credential = result.credential;

          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // ...
          this.$router.push("/");
        })
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
    },

    async mounted() {
      await firebase
        .auth()
        .onAuthStateChanged((user) => (this.disIcon = user ? true : false));
      firebase.auth().onAuthStateChanged(async function (user) {
        const userId = user.uid;
        const response = await this.$axios.get(
          "http://127.0.0.1:8000/api/v1/admin/" + userId
        ); // mysqlのusersテーブルからユーザのデータ取得
        if (response.data.data.admin) {
          firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
              // Signed in
              var user = userCredential.user;
              // ...
              const currentUser = firebase.auth().currentUser;
              // E-Mailの確認が取れていない場合は強制サインアウト
              if (!currentUser.emailVerified) {
                firebase.auth().signOut();
              }
            })
            .catch((error) => {
              var errorCode = error.code;
              var errorMessage = error.message;
            });
          // オブザーバーの登録
          firebase.auth().onAuthStateChanged((user) => {
            // ログイン状態ならuserが取得できる
            this.user = user ? user : {};
          });
          // 管理者の場合
          alert("管理者です");
        } else {
          // 管理者以外の場合
          alert("ユーザです");
        }
        alert("ログインが完了しました");
        this.$router.push("/");
      });
    },
  },
  computed: {
    isAdmin() {
      return this.$store.getters["dbState/getIsAdmin"];
    },
  },
};
</script>