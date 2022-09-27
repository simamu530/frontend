export default function ({ redirect, store, route }) {
  // const user = store.state.user
  if (route.path == '/login' || route.path == '/') return // indexページでは以下のmiddle wareを無効化（無限ループが発生してしまうため）

  //storeに保存してる内容
  let getExpired = store.state.dbState.expired;

  //現在時刻より前の場合（expire<now）
  const nowDate = new Date();
  const expireDate = new Date(getExpired);

  //ログインページにリダイレクト
  if (expireDate <= nowDate) {
    store.commit("dbState/setIsAdmin", false);  // リダイレクトさせる前にゲストユーザ用の権限にする
    redirect('/');
  }
}