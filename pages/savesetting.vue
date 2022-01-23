<template>
  <div id="mySettings">
    <v-app>
      <v-card>
        <v-card-title align="center">現在の設定状況</v-card-title>
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header>入力欄を表示する</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-form ref="setting_form">
                  <v-card-text>
                    <v-text-field
                      v-model="game_title"
                      label="ゲームタイトル"
                      :rules="[required]"
                    >
                    </v-text-field>
                    <v-text-field
                      v-model="mouse"
                      label="マウス"
                      :rules="[required]"
                    >
                    </v-text-field>
                    <v-text-field
                      v-model="dpi"
                      label="DPI"
                      type="number"
                      :rules="[required]"
                    >
                    </v-text-field>
                    <v-text-field
                      v-model="mouse_sens"
                      label="マウス感度"
                      type="number"
                      :rules="[required]"
                    >
                    </v-text-field>
                    <v-text-field
                      v-model="multi_sens"
                      label="倍率感度"
                      type="number"
                    >
                    </v-text-field>
                    <v-text-field
                      v-model="hz"
                      label="ポーリングレート(hz)"
                      type="number"
                    >
                    </v-text-field>
                    <v-text-field
                      v-model="mouse_pad"
                      label="マウスパッド"
                      :rules="[required]"
                    >
                    </v-text-field>
                    <v-text-field
                      v-model="keyboard"
                      label="キーボード"
                      :rules="[required]"
                    >
                    </v-text-field>
                    <v-text-field
                      v-model="fov"
                      label="視野角(FOV)"
                      type="number"
                      :rules="[required]"
                    >
                    </v-text-field>
                    <v-text-field
                      v-model="res"
                      label="解像度"
                      :rules="[required]"
                    >
                    </v-text-field>
                  </v-card-text>
                </v-form>
              <v-divider></v-divider>
              <v-card-actions>
                <v-btn
                  color="cyan darken-1"
                  class="mr-4"
                   v-on:click="submit">保存する</v-btn>
                <v-btn
                  color="error"
                  class="mr-4"
                  @click="reset"
                >リセット
                </v-btn>
                <span v-if="success">保存されました</span>
              </v-card-actions>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card>
      <v-card>
        <v-data-table
          :headers="headers"
          :items="items"
          :items-per-page="5"
          class="elevation-1"
        >
        </v-data-table>
      </v-card>
    </v-app>
  </div>
</template>

<script>
export default {
  data:function() {
    return {
      headers: [
        {
          text: "ゲーム名",
          sortable: true,
          value: "game_title"
        },
        {
          text: "マウス",
          sortable: true,
          value: "mouse"
        },
        {
          text: "DPI",
          sortable: true,
          value: "dpi"
        },
        {
          text: "マウス感度",
          sortable: true,
          value: "mouse_sens"
        },
        {
          text: "倍率感度",
          sortable: true,
          value: "multi_sens"
        },
        {
          text: "ポーリングレート",
          sortable: true,
          value: "hz"
        },
        {
          text: "マウスパッド",
          sortable: true,
          value: "mouse_pad"
        },
        {
          text: "キーボード",
          sortable: true,
          value: "keyboard"
        },
        {
          text: "視野角",
          sortable: true,
          value: "fov"
        },
        {
          text: "解像度",
          sortable: true,
          value: "res"
        },
      ],
      items:[],
      game_title: "",
      mouse: "",
      dpi: "",
      mouse_sens: "",
      multi_sens: "",
      hz:"",
      mouse_pad: "",
      keyboard: "",
      fov:"",
      res:"",
      
      success: false,

      //入力ルール
      required: value => !!value || "必ず入力してください",//入力必須
      // limit_length: value => value.length <= 10 || "10文字以内で入力してください"//文字数の制限
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
      this.items.push({
        "game_title": this.game_title,
        "mouse": this.mouse,
        "dpi": this.dpi,
        "mouse_sens": this.mouse_sens,
        "multi_sens": this.multi_sens,
        "hz": this.hz,
        "mouse_pad": this.mouse_pad,
        "keyboard": this.keyboard,
        "fov": this.fov,
        "res": this.res,
      });
    },
    reset() {
      this.$refs.setting_form.reset()
    },
  }
}
</script>
