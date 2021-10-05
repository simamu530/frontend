<template>
  <v-main>
    <div>
      <table v-for="item in response.data" :key="item.id">
          <thead>
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
            <td><button class="editData">編集</button></td>
            <td><button class="delData">削除</button></td>
          </tbody>
        </table>
    </div>
    <div>
      <input type="text" id="pro_team" placeholder="チーム">
      <input type="text" id="pro_name" placeholder="名前">
      <input type="text" id="pro_dpi" placeholder="dpi">
      <input type="text" id="pro_mousesens" placeholder="マウス感度">
      <input type="text" id="pro_multisens" placeholder="倍率感度">
      <input type="text" id="pro_hz" placeholder="Hz">
      <input type="text" id="pro_fov" placeholder="視野角">
      <input type="text" id="pro_mouse" placeholder="マウス">
      <input type="text" id="pro_monitor" placeholder="モニター">
      <input type="text" id="pro_gpu" placeholder="gpu">
      <input type="text" id="pro_resolution" placeholder="解像度">
      <input type="text" id="pro_mousepad" placeholder="マウスパッド">
      <input type="text" id="pro_keyboard" placeholder="キーボード">
      <input type="text" id="pro_headset" placeholder="ヘッドセット">
      <button>追加</button>
    </div>
  
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
  // data() {
  //   response
  // },

    async asyncData({$axios}) {
      const response = await $axios.$get('/api/v1/apexprolist')
      console.log(response);
      return {
        response
      }
    }
    // async getData(){
    //   const res = await this.$axios('/api/v1/apexprolist')
    //   =>
    //   // console.log(res)
    //   return {
    //     team: res.data.team
    //   }
    // }
  
}
</script>
