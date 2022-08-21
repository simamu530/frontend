//ログイン制御用JS

//データの設定
export const state = () => ({
  isAdmin: false
});

//データの更新
export const mutations = {
  setIsAdmin(state, bool) {
    state.isAdmin = bool;
  }
};

//データの取得
export const getters = {
  getIsAdmin(state) {
    return state.isAdmin;
  }
}