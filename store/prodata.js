const state = {
  proDatabase: []
};

const mutations = {
  setData(state, proDatabase) {
    state.proDatabase = proDatabase
  },
  update(state, { proData, newData }) {
    Object.assign(proData, newData);
  },
  delete(state, index) {
    state.proDatabase.splice(index, 1);
  },
  add(state, proData) {
    state.proDatabase.push(proData);
  }
};

const getters = {
  getProDatabase(state) {
    return state.proDatabase
  }
};

const actions = {
  async fetch({ commit }) {
    await axios.get('/api/v1/apexprolist').then(res => {
      commit('setData', res.data);
    });
  },
  async delete({ state, commit }, proData) {
    const index = state.proDatabase.indexOf(proData);

    return await axios.delete('/api/v1/apexprolist' + proData.id)
      .then(res => {
        commit('delete', index);
        return true;
      }).catch(error => {
        return error;
      });
  },
  async store({ state, commit }, proData) {
    return await axios.post('/api/v1/apexprolist', proData)
      .then(res => {
        commit('add', res.data);
        return true;
      }).catch(error => {
        return error;
      });
  },
  async update({ state, commit }, newData) {
    const proData = state.proDatabase.find((o) => {
      return o.id === newData.id;
    });

    if (!proData) {
      return false;
    }

    return await axios.patch('/api/v1/apexprolist' + newData.id, newData)
      .then(res => {
        commit('update', { proData, newData });
        return true;
      }).catch(error => {
        return error;
      });
  }
};//参考サイトhttps://www.webopixel.net/javascript/1457.html

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};