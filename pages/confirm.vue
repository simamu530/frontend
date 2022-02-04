<template>
  <v-app>
    <v-container fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="pa-6">
            <div class="confirm">
              <v-card-title>
              <h1>仮登録完了</h1>
              </v-card-title>
              <p>仮登録が完了しました。メールをご確認ください。</p>
              <v-btn @click="$router.push('/')">戻る</v-btn>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>