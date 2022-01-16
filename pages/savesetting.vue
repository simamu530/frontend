<template>
  <div id="mySettings">
    <v-app>
      <v-card>
        <v-card-title>現在の設定状況</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="mouse"
            label="現在使っているマウス（入力必須で文字数制限のあるテキストフィールド"
          >
          </v-text-field>
          <v-text-field
            v-model="keyboard"
            label="現在使っているキーボード（入力必須のみあるテキストフィールド）"
          >
          </v-text-field>
          <v-text-field
            v-model="sens"
            label="現在のマウス感度（なんの制約もないテキストフィールド"
          >
          </v-text-field>
        </v-card-text>
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
  data: {
    mouse: "",
    keyboard: "",
    sens: "",

    success: false,
  },
  methods: {
    submit() {
      this.success = true;
    }
  }
}
</script>
