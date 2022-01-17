<template>
  <div id="mySettings">
    <v-app>
      <v-card>
        <v-card-title>現在の設定状況</v-card-title>
          <v-form ref="setting_form">
            <v-card-text>
              <v-text-field
                v-model="mouse"
                label="現在使っているマウス（入力必須で文字数制限のあるテキストフィールド"
                :rules="[required, limit_length]"
                required
                counter="10"
              >
              </v-text-field>
              <v-text-field
                v-model="keyboard"
                label="現在使っているキーボード（入力必須のみあるテキストフィールド）"
                :rules="[requierd]"
                required
              >
              </v-text-field>
              <v-text-field
                v-model="sens"
                label="現在のマウス感度（なんの制約もないテキストフィールド"
                req
              >
              </v-text-field>
            </v-card-text>
          </v-form>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn text v-on:click="submit">保存する</v-btn>
          <span v-if="success">保存されました</span>
        </v-card-actions>
      </v-card>
    </v-app>
  </div>
</template>

<script>
export default {
  data:function() {
    return {
      mouse: "",
      keyboard: "",
      sens: "",

      success: false,

      //入力ルール
      required: value => !!value || "必ず入力してください",//入力必須
      limit_length: value => value.length <= 10 || "10文字以内で入力してください"//文字数の制限
    }
  },
  methods: {
    submit() { //保存ボタンを押したら呼び出される
      if (this.$refs.setting_form.validate()) {
        //すべてのフォームのバリデーションが通過したときのみ
        //if文のなかに入る
        this.success = true;
      } else {
        this.success = false;
      }
    }
  }
}
</script>
