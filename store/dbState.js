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
};

//時間経過でログイン状態変化
export const loggetter = {
  expired(state) {
    
  }
}