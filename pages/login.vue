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
              <v-btn @click="google" color="primary" >google</v-btn>
                <ValidationObserver ref="myform">
                  <validation-provider v-slot="{ errors }" rules="email|required">
                    <v-text-field label="メールアドレス" prepend-icon="mdi-account-circle" v-model="email" type="email" name="email" required />
                    <span>{{ errors[0] }}</span>
                  </validation-provider>
                </ValidationObserver>
              <v-text-field v-bind:type="showPass ? 'text' : 'password'"
              @click:append="showPass = !showPass"
              v-bind:append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
              label="パスワード"  v-model="password"  prepend-icon="mdi-lock"
              required />
              <v-btn @click="login" color="primary">ログイン</v-btn>
              <v-btn @click="home">戻る</v-btn>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>


<script>
import firebase from '~/plugins/firebase'
export default {
  data() {
    return {
      email: null,
      password: null,
      showPass: false,
    }
  },
  methods: {
    async login() {
      if (!this.email || !this.password) {
        alert('メールアドレスまたはパスワードが入力されていません。')
        return
      }
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          alert('ログインが完了しました')
          this.$router.push('/')
        })
        .catch((error) => {
          switch (error.code) {
          case 'auth/invalid-email':
            alert('メールアドレスの形式が違います。')
          break
          case 'auth/user-disabled':
            alert('ユーザーが無効になっています。')
          break
          case 'auth/user-not-found':
            alert('ユーザーが存在しません。')
          break
          case 'auth/wrong-password':
            alert('パスワードが間違っております。')
          break
          default:
            alert('エラーが起きました。しばらくしてから再度お試しください。')
          break
        }
      })
    },
    home() {
      this.$router.push('/')
    },
    google() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
        this.$router.push('/')
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
    }
  },
}
</script>