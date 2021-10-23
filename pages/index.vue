<template>
  <v-main>
    <div>
      <table v-for="item in items" :key="item.id">
          <thead>
            <tr></tr>
            <th>チーム</th>
            <th>名前</th>
            <th>DPI</th>
            <th>マウス感度</th>
            <th>倍率感度</th>
            <th>Hz</th>
            <th>視野角(FOV)</th>
            <th>マウス</th>
            <th>モニター</th>
            <th>GPU</th>
            <th>解像度</th>
            <th>マウスパッド</th>
            <th>キーボード</th>
            <th>ヘッドセット</th>
            <th>eDpi</th>
            <th>合計</th>
          </thead>
          <tbody>
            <td>{{item.team}}</td>
            <td>{{item.name}}</td>
            <td>{{item.dpi}}</td>
            <td>{{item.mousesens}}</td>
            <td>{{item.multisens}}</td>
            <td>{{item.hz}}</td>
            <td>{{item.fov}}</td>
            <td>{{item.mouse}}</td>
            <td>{{item.monitor}}</td>
            <td>{{item.gpu}}</td>
            <td>{{item.resolution}}</td>
            <td>{{item.mousepad}}</td>
            <td>{{item.keyboard}}</td>
            <td>{{item.headset}}</td>
            <td>{{item.dpi * item.mousesens}}</td>
            <td>{{item.sum}}</td>
            <td><button class="editData">編集</button></td>
            <td><button class="delData">削除</button></td>
          </tbody>
        </table>
        <p>平均</p>
        <p>{{avg_edpi}}</p>
    </div>
    <div>
      <input v-model="pro_team"  id="pro_team" placeholder="チーム" class="grey lighten-2">
      <input v-model="pro_name" type="text" id="pro_name" placeholder="名前" class="grey lighten-2">
      <input v-model="pro_dpi" type="text" id="pro_dpi" placeholder="dpi" class="grey lighten-2">
      <input v-model="pro_mousesens" type="text" id="pro_mousesens" placeholder="マウス感度" class="grey lighten-2">
      <input v-model="pro_multisens" type="text" id="pro_multisens" placeholder="倍率感度" class="grey lighten-2">
      <input v-model="pro_hz" type="text" id="pro_hz" placeholder="Hz" class="grey lighten-2">
      <input v-model="pro_fov" type="text" id="pro_fov" placeholder="視野角" class="grey lighten-2">
      <input v-model="pro_mouse" type="text" id="pro_mouse" placeholder="マウス" class="grey lighten-2">
      <input v-model="pro_monitor" type="text" id="pro_monitor" placeholder="モニター" class="grey lighten-2">
      <input v-model="pro_gpu" type="text" id="pro_gpu" placeholder="gpu" class="grey lighten-2">
      <input v-model="pro_resolution" type="text" id="pro_resolution" placeholder="解像度" class="grey lighten-2">
      <input v-model="pro_mousepad" type="text" id="pro_mousepad" placeholder="マウスパッド" class="grey lighten-2">
      <input v-model="pro_keyboard" type="text" id="pro_keyboard" placeholder="キーボード" class="grey lighten-2">
      <input v-model="pro_headset" type="text" id="pro_headset" placeholder="ヘッドセット" class="grey lighten-2">
      <v-btn collor="primary"
            @click="test()">追加</v-btn>
    </div>
    <v-app id="apexTable">
    <v-data-table
    :headers="headers"
    :items="items"
    sort-by="name"
    hide-default-footer
    class="elevation-1"
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
                    @click="save"
                  >
                  保存
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
      <template v-slot:item.actions="{ item }">
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
      <template v-slot:no-data>
        <v-btn
          @click="initialize"
        >
        リセット
        </v-btn>
      </template>
    </v-data-table>
  </v-app>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center">
        <NuxtLogo />
        <VuetifyLogo />
      </v-card>
      <v-card>
        <v-card-title class="headline">
          <div>
          Apex Pro Sens database
          </div>
        </v-card-title>
        <v-card-text>
          
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            @click="test()"
          >
          test
          </v-btn>
          <v-btn
            color="primary"
            nuxt
            to="/inspire"
          >
            Continue
          </v-btn>
          <v-btn
            color="primary"
            nuxt
            to="/three-column"
          >
            three
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
  </v-main>
</template>

<script>
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
      headers:[
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
        { text: 'アクション', value: 'actions', sortable: false },
      ],
      search:'',
      sum:0,
      avg_edpi:0,
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
      await this.$axios.post('/api/v1/apexprolist', sendData).then(res => {console.log(res);
      })
      this.asyncData();
    },
      async asyncData() {
      await  this.$axios.get('/api/v1/apexprolist')
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
      })
    },
    //テーブルの編集機能
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
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.items.splice(this.editedIndex, 1)
      const testid = Object.assign(this.items[this.editedIndex].id);
        console.log(Object.assign(this.items[this.editedIndex].id));
        console.log(Object.assign(this.items[this.editedIndex], this.editedItem));
        Object.assign(this.items[this.editedIndex], this.editedItem)
        const sendData = Object.assign(this.items[this.editedIndex])
        try {
          this.$axios.delete('/api/v1/apexprolist/' + testid, sendData)
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
          this.$axios.put('/api/v1/apexprolist/' + testid, sendData)
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
  },
}
</script>

<style lang="scss" scoped>

</style>