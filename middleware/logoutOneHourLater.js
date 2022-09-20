export default function ({ redirect, store, route }) {
  // const user = store.state.user
  if (route.path == '/login') return

  //storeに保存してる内容
  let getExpired = store.state.dbState.expired;

  //現在時刻より前の場合（expire<now）
  const nowDate = new Date();
  const expireDate = new Date(getExpired);

  //ログインページにリダイレクト
  if (expireDate <= nowDate) {
    redirect('/login');
  }
}