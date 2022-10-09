export default function ({ redirect, store, route }) {
  // const user = store.state.user
  if (route.path == '/login') return // indexページでは以下のmiddle wareを無効化（無限ループが発生してしまうため）

  //storeに保存してる内容
  let getExpired = store.state.dbState.expired;
  console.log(getExpired)

  //現在時刻より前の場合（expire<now）
  const nowDate = new Date();
  const expireDate = new Date(getExpired);
  console.log(expireDate)

  //ログインページにリダイレクト
  if (expireDate <= nowDate) {
    store.state.dbState.isAdmin = false; // リダイレクトさせる前にゲストユーザ用の権限にする
    store.state.dbState.isLogin = false; // ログアウト状態にする
    if(route.path !== "/"){ // 同じパスにアクセスするとエラーが発生するので「/」から「/」にアクセスしないようにする
      redirect('/');
    }
  }
}