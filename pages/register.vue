<template>
  <v-app>
    <v-container fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card width="400px" class="mx-auto mt-5 pa-6" color="" outlined>
            <v-card-title>
              <h1 class="display-1">新規登録</h1>
            </v-card-title>           
            <div class="register" >
              <v-text-field v-model="email" type="email" required class="" label="email"></v-text-field>
              <v-text-field input v-model="password" type="password" required label="password"></v-text-field>
              <v-btn @click="register" color="primary">新規登録</v-btn>
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
    }
  },
  methods: {
    register() {
      if (!this.email || !this.password) {
        alert('メールアドレスまたはパスワードが入力されていません。')
        return
      }
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          data.user.sendEmailVerification().then(() => {
            this.$router.replace('/confirm')
          })
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/invalid-email':
              alert('メールアドレスの形式が違います。')
              break
            case 'auth/email-already-in-use':
              alert('このメールアドレスはすでに使われています。')
              break
            case 'auth/weak-password':
              alert('パスワードは6文字以上で入力してください。')
              break
            default:
              alert('エラーが起きました。しばらくしてから再度お試しください。')
              break
          }
        })
    },
    home() {
      this.$router.push('/')
    }
  },
}
</script>