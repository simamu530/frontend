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
                <validation-observer ref="obs" v-slot="ObserverProps">
                  <validation-provider v-slot="{ errors }" rules="email|required" name="メール">
                    <v-text-field v-model="email" type="email" required class="" label="email" :error-messages="errors"></v-text-field>
                  </validation-provider>
                  <validation-provider v-slot="{ errors }" rules="required|min:6" name="パスワード">
                    <v-text-field input v-model="password" type="password" required label="password" :error-messages="errors"></v-text-field>
                  </validation-provider>
                    <v-btn @click="register" color="primary" :disabled="ObserverProps.invalid || !ObserverProps.validated">新規登録</v-btn>
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
          data.user.sendEmailVerification().then((userCredential) => { //userCredential.userにfirebaseに作成されたユーザーのデータが入っている
            // ...ユーザー登録リクエスト送信(api/admin)
            const body = { 
              id: data.user.uid, // firebaseのユーザID
              name: 'name',
              email: this.email,
              password: this.password,
              admin: false
            };
            await this.$axios.post("https://protected-refuge-26791.herokuapp.com/api/admin", body);
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