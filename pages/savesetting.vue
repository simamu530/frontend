

<template>
  <div id="mySettings">
    <v-app>
      <v-card>
        <v-card-title align="center">現在の設定状況</v-card-title>
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header color="primary">入力欄を表示する</v-expansion-panel-header>
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
      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title class="text-h5">削除しますか？</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="closeDelete()">キャンセル</v-btn>
            <v-btn text @click="deleteItemConfirm()">はい</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-card>
        <v-data-table
          :headers="headers"
          :items="items"
          sort-by="name"
          hide-default-footer
          class="elevation-1"
          :loading="loading"
          loading-text="Loading... Please wait"
        >
        <template v-slot:item.actions="{ item }">
          <v-icon
          small
          @click="deleteItem(item)"
          >
          mdi-delete
          </v-icon>
        </template>
        </v-data-table>
      </v-card>
    </v-app>
  </div>
</template>

<script>
import firebase from "~/plugins/firebase"


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
        { text: 'Actions',
          value: 'actions',
          sortable: false },
      ],
      items:[],
      game_title: null,
      mouse: null,
      dpi: null,
      mouse_sens: null,
      multi_sens: null,
      hz:null,
      mouse_pad: null,
      keyboard: null,
      fov:null,
      res:null,
      
      loading: true,
      editedIndex: -1,
      dialogDelete: false,
      success: false,
      disIcon: false,

      //入力ルール
      required: value => !!value || "必ず入力してください",//入力必須
      // limit_length: value => value.length <= 10 || "10文字以内で入力してください"//文字数の制限

      editedItem: {
        game_title: null,
        mouse: null,
        dpi: null,
        mouse_sens: null,
        multi_sens: null,
        hz:null,
        mouse_pad: null,
        keyboard: null,
        fov:null,
        res:null,
      },
      defaultItem: {
        game_title: null,
        mouse: null,
        dpi: null,
        mouse_sens: null,
        multi_sens: null,
        hz:null,
        mouse_pad: null,
        keyboard: null,
        fov:null,
        res:null,
      },
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
      const sendData = {
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
      }
      this.$axios.$post('http://127.0.0.1:8000/api/v1/admin/api/v1/savesetting', sendData)
      .then(this.asyncData)
      .catch(error => console.log(error))
    },

    reset() {
      this.$refs.setting_form.reset()
    },

    deleteItem (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItemConfirm () {
        this.desserts.splice(this.editedIndex, 1)
        this.closeDelete()
    },
    closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
    },
    deleteItemConfirm () {
      const testid = Object.assign(this.items[this.editedIndex].id);
        console.log(Object.assign(this.items[this.editedIndex].id));
        console.log(Object.assign(this.items[this.editedIndex], this.editedItem));
        Object.assign(this.items[this.editedIndex], this.editedItem)
        const sendData = Object.assign(this.items[this.editedIndex])
        this.items.splice(this.editedIndex, 1)
         console.log(this.items);
        try {
          this.$axios.delete('http://127.0.0.1:8000/api/v1/admin/api/v1/savesetting/' + testid, sendData)
          .then( res => {
            console.log(res);
            console.log("success");
          }
          )
        } catch (error) {
          console.log(error);
        }
      this.closeDelete()
    },

    async asyncData(){
      this.loading = true;
      await this.$axios.$get('http://127.0.0.1:8000/api/v1/admin/api/v1/savesetting')
    .then(res => {
      this.items = res.data;
      console.log(res)
      this.loading = false;
    })
    .catch(error => console.log(error))
    },


  },
  watch: {
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  // mounted: function(){
    
  //   this.asyncData()
  // },
  async mounted () {
    this.asyncData()
    
    await firebase.auth().onAuthStateChanged((user) => this.isLogin = user ? true :false)
  },

  middleware: 'authenticated'
}
</script>
