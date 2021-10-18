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
      <input v-model="pro_team" type="text" id="pro_team" placeholder="チーム" color="white">
      <input v-model="pro_name" type="text" id="pro_name" placeholder="名前" class="white ligten-1">
      <input v-model="pro_dpi" type="text" id="pro_dpi" placeholder="dpi">
      <input v-model="pro_mousesens" type="text" id="pro_mousesens" placeholder="マウス感度">
      <input v-model="pro_multisens" type="text" id="pro_multisens" placeholder="倍率感度">
      <input v-model="pro_hz" type="text" id="pro_hz" placeholder="Hz">
      <input v-model="pro_fov" type="text" id="pro_fov" placeholder="視野角">
      <input v-model="pro_mouse" type="text" id="pro_mouse" placeholder="マウス">
      <input v-model="pro_monitor" type="text" id="pro_monitor" placeholder="モニター">
      <input v-model="pro_gpu" type="text" id="pro_gpu" placeholder="gpu">
      <input v-model="pro_resolution" type="text" id="pro_resolution" placeholder="解像度">
      <input v-model="pro_mousepad" type="text" id="pro_mousepad" placeholder="マウスパッド">
      <input v-model="pro_keyboard" type="text" id="pro_keyboard" placeholder="キーボード">
      <input v-model="pro_headset" type="text" id="pro_headset" placeholder="ヘッドセット">
      <v-btn collor="primary"
            @click="test()">追加</v-btn>
    </div>
    <v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="2"
    ></v-data-table>
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
        { text: 'チーム', value: 'dpi'},
        { text: 'DPI', value: 'dpi'},
        { text: 'マウス感度', value: 'mousesens'},
        { text: '倍率感度', value: 'multisens'},
        { text: 'Hz', value: 'hz'},
        { text: '視野角', value: 'FOV'},
        { text: 'モニター', value: 'monitor'},
        { text: 'GPU', value: 'gpu'},
        { text: '解像度', value: 'resolution'},
        { text: 'マウスパッド', value: 'mousepad'},
        { text: 'キーボード', value: 'keyboard'},
        { text: 'ヘッドセット', value: 'headset'},
      ],
      search:'',
      sum:0,
      avg_edpi:0,
    }
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
        keyboard:this.pro_keybboard,
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
  },
  created() {
    this.asyncData();
  },
}
</script>
