//ログイン制御用JS

//データの設定
export const state = () => ({
  selectDb: null
});

//データの更新
export const mutations = {
  setDb(state, db) {
    state.selectDb = db;
  }
};

//データの取得
export const getters = {
  getDb(state) {
    return state.selectDb;
  }
}