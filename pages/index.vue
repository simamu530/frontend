<template>
  
  <v-main>
    <v-app id="apexTable">
      <v-container>
        <v-row class="avgarea">
          <v-col>
            <p>このサイトは全世界のプロゲーマーの設定をデータベース化したものです。<br>
              それだけではなく、よく注目されるマウス感度にフォーカスし、保存されているデータを元に平均感度を出しております。
            </p>
              <!-- <v-card
                class="mx-auto"
                max-width="344"
                outlined
              > -->
                <v-row>
                  <v-col
                  align="center">
                    <p>
                    400dpi
                    </p>
                    <p class="orange--text">
                    {{dpi400.toFixed(3)}}
                    </p>
                  </v-col>
                  <v-divider vertical></v-divider>
                  <v-col
                  align="center">
                    <p>
                    800dpi
                    </p>
                    <p class="orange--text">
                    {{dpi800.toFixed(3)}}
                    </p>
                  </v-col>
                  <v-divider vertical></v-divider>
                  <v-col
                  align="center">
                    <p>
                    1600dpi
                    </p>
                    <p class="orange--text">
                    {{dpi1600.toFixed(3)}}
                    </p>
                  </v-col>
                  <v-divider vertical></v-divider>
                  <v-col
                  align="center">
                    <p>
                    平均edpi
                    </p>
                    <p class="orange--text">
                    {{avg_edpi.toFixed(3)}}
                    </p>
                  </v-col>
                </v-row>
              <!-- </v-card> -->
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-data-table
            :headers="headers"
            :items="items"
            sort-by="name"
            hide-default-footer
            class="elevation-1"
            :loading="loading"
            loading-text="Loading... Please wait"
            v-if="headers"
            >
            <template v-slot:top>
              <v-toolbar
                flat
              >
              <v-toolbar-title>Apex Pro Settings</v-toolbar-title>
              <v-divider
                class="mx-4"
                inset
                vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-dialog
                  v-model="dialog"
                  max-width="500px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary"
                      dark
                      class="mb-2"
                      v-bind="attrs"
                      v-on="on"
                      v-if="disIcon"
                    >
                    追加
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">{{ formTitle }}</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-text-field
                              v-model="editedItem.team"
                              label="チーム"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-text-field
                              v-model="editedItem.name"
                              label="名前"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-text-field
                              v-model="editedItem.dpi"
                              label="DPI"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-text-field
                              v-model="editedItem.mousesens"
                              label="マウス感度"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-text-field
                              v-model="editedItem.multisens"
                              label="倍率感度"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-text-field
                              v-model="editedItem.hz"
                              label="Hz"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-text-field
                              v-model="editedItem.fov"
                              label="FOV"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-text-field
                              v-model="editedItem.mouse"
                              label="マウス"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-text-field
                              v-model="editedItem.monitor"
                              label="モニター"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-text-field
                              v-model="editedItem.gpu"
                              label="GPU"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-text-field
                              v-model="editedItem.resolution"
                              label="解像度"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-text-field
                              v-model="editedItem.mousepad"
                              label="マウスパッド"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-text-field
                              v-model="editedItem.keyboard"
                              label="キーボード"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-text-field
                              v-model="editedItem.headset"
                              label="ヘッドセット"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        @click="close"
                      >
                      キャンセル
                      </v-btn>
                      <v-btn
                        text
                        @click="addItem()"
                        v-if="editedIndex == -1"
                      >
                      追加
                      </v-btn>
                      <v-btn
                        text
                        @click="save"
                        v-else
                      >
                      更新
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px">
                  <v-card>
                    <v-card-title class="text-h5">削除しますか？</v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn text @click="closeDelete">キャンセル</v-btn>
                      <v-btn text @click="deleteItemConfirm">はい</v-btn>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
            </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }" v-if="disIcon">
              <v-icon
                small
                class="mr-2"
                @click="editItem(item)"
              >
              mdi-pencil
              </v-icon>
              <v-icon
                small
                @click="deleteItem(item)"
              >
              mdi-delete
              </v-icon>
            </template>
            <!-- <template v-slot:no-data>
              <v-btn
                @click="initialize"
              >
              リセット
              </v-btn>
            </template> -->
            </v-data-table>
          </v-col>
        </v-row>
      </v-container>
    </v-app>
  </v-main>
</template>

<script>
import firebase from '~/plugins/firebase'

export default {
  data() {
    return {
      pro_team: null,
      pro_name: null,
      pro_dpi: null,
      pro_mousesens: null,
      pro_multisens: null,
      pro_hz: null,
      pro_fov: null,
      pro_mouse: null,
      pro_monitor: null,
      pro_gpu: null,
      pro_resolution: null,
      pro_mousepad: null,
      pro_keyboard: null,
      pro_headset: null,
      items:[],
      headers:null,
      search:'',
      sum:0,
      avg_edpi:0,
      dpi400:0,
      dpi800:0,
      dpi1600:0,
      //テーブルの編集機能
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {
        team:'',
        name:'',
        dpi: 0,
        mousesens: 0,
        multisens: 0,
        hz: 0,
        fov: 0,
        mouse: '',
        monitor: '',
        gpu: '',
        resolution: '',
        mousepad: '',
        keyboard: '',
        headset: '',
      },
      defaultItem: {
        team:'',
        name:'',
        dpi: 0,
        mousesens: 0,
        multisens: 0,
        hz: 0,
        fov: 0,
        mouse: '',
        monitor: '',
        gpu: '',
        resolution: '',
        mousepad: '',
        keyboard: '',
        headset: '',
      },
      message: 'ログインができておりません',
      disIcon: false,
      delHead: false,
      adminState: '',
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },
  methods: {
    async test() {
      const sendData = {
        team :this.pro_team,
        name : this.pro_name,
        dpi :this.pro_dpi,
        mousesens:this.pro_mousesens,
        multisens:this.pro_multisens,
        hz:this.pro_hz,
        fov:this.pro_fov,
        mouse:this.pro_mouse,
        monitor:this.pro_monitor,
        gpu:this.pro_gpu,
        resolution:this.pro_resolution,
        mousepad:this.pro_mousepad,
        keyboard:this.pro_keyboard,
        headset:this.pro_headset,
      }
      console.log(sendData);
      await this.$axios.post('http://127.0.0.1:8000/api/v1/admin/api/v1/apexprolist', sendData).then(res => {console.log(res);
      })
      this.asyncData();
    },
      async asyncData() {
      await  this.$axios.get('http://127.0.0.1:8000/api/v1/admin/api/v1/apexprolist')
      .then(res => {
        this.items = res.data.data;
        console.log(res.data);
        console.log(res.data.data.length);
        for (let i = 0; i < res.data.data.length; i++ ) {
           this.sum += res.data.data[i].dpi*res.data.data[i].mousesens;
            console.log(this.sum);
          
        }
        this.avg_edpi=this.sum / res.data.data.length;
        // console.log(this.avg_edpi);
        this.dpi400 = (this.avg_edpi / 400);
        this.dpi800 = (this.avg_edpi / 800);
        this.dpi1600 = (this.avg_edpi / 1600);
      })
    },
    //テーブルの編集機能

    async addItem() {
      console.log("test");
      console.log(this.editedItem);//入力項目のデータが取得できてるか、確認
      await
      this.$axios.post('http://127.0.0.1:8000/api/v1/admin/api/v1/apexprolist',this.editedItem)
      .then(()=>{
        this.asyncData();
        this.close(); //データの反映を行うために実装してある
      })
    },
    initialize () {
      this.items
    },
    editItem(item) {
      this.editedIndex =this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      this.editedIndex = this.items.indexOf(item)
      console.log(this.editexIndex+"Index");
      this.editedItem = Object.assign({}, item)
      console.log(this.editexItem+"Item");
      this.dialogDelete = true
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
          this.$axios.delete('http://127.0.0.1:8000/api/v1/admin/api/v1/apexprolist/' + testid, sendData)
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

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        const testid = Object.assign(this.items[this.editedIndex].id);
        console.log(Object.assign(this.items[this.editedIndex].id));
        console.log(Object.assign(this.items[this.editedIndex], this.editedItem));
        Object.assign(this.items[this.editedIndex], this.editedItem)
        const sendData = Object.assign(this.items[this.editedIndex])
        try {
          this.$axios.put('http://127.0.0.1:8000/api/v1/admin/api/v1/apexprolist/' + testid, sendData)
          .then( res => {
            console.log(res);
            console.log("success");
          }
          )
        } catch (error) {
          console.log(error);
        }
      } else {
        this.items.push(this.editedItem)
      }
      this.close()
    },

    //10.21追加
  },
  created() {
    this.asyncData();
    this.initialize();
    const headers = [
        { text: 'チーム', value: 'team'},
        { text: '名前', value: 'name'},
        { text: 'DPI', value: 'dpi'},
        { text: 'マウス感度', value: 'mousesens'},
        { text: '倍率感度', value: 'multisens'},
        { text: 'Hz', value: 'hz'},
        { text: '視野角(FOV)', value: 'fov'},
        { text: 'マウス', value: 'mouse'},
        { text: 'モニター', value: 'monitor'},
        { text: 'GPU', value: 'gpu'},
        { text: '解像度', value: 'resolution'},
        { text: 'マウスパッド', value: 'mousepad'},
        { text: 'キーボード', value: 'keyboard'},
        { text: 'ヘッドセット', value: 'headset'},
    ];
    // firebase.auth().onAuthStateChanged((user) => this.disIcon = user ? true :false)
    firebase.auth().onAuthStateChanged(async (user) =>{
      //  this.disIcon = user ? true :false;
      this.delHead = user ? true :false;
      if(user) {
        const response = await this.$axios.get("http://127.0.0.1:8000/api/v1/admin/api/v1/admin/"+ user.uid);
        if(response.data.data.admin){
          alert('管理者です');
          this.adminState = response.data.data.admin;
          this.disIcon = true;
          headers.push({text: 'アクション', value: 'actions', sortable: false});
        }
        this.message = 'ログイン済みです';
      }else{
        this.headers = headers
        console.log('user?');
      }
      this.headers = headers;
    });
    
  },
  async mounted () {
  //   await firebase.auth().onAuthStateChanged((user) => this.disIcon = user ? true :false);

  //   firebase.auth().onAuthStateChanged(function(user) {
  //   if (user.admin) {
  //     // headers.push({text: 'アクション', value: 'actions', sortable: false});
  //     // firebase.auth().onAuthStateChanged((user) => this.delHead = user ? true :false);
  //     console.log('AdminLogin519');
  //   } else {
  //     // this.headers = headers
  //     console.log('NotAdmin');
      
  //   }
  //   // this.headers = headers
  // });   
  },
}
</script>

<style lang="scss" scoped>

</style>