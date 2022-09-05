//ログイン制御用JS

//データの設定
export const state = () => ({
  isAdmin: false,
  expired: '2022-09-06 20:00'//ログインを再要求する日付
});

//データの更新
export const mutations = {
  setIsAdmin(state, bool) {
    state.isAdmin = bool;
  },
  setExpired(state, value) {
    state.expired = value;
  },
};

//データの取得
export const getters = {
  getIsAdmin(state) {
    return state.isAdmin;
  },
  getExpired(state) {
    return state.expired;
  }
};