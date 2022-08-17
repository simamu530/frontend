import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'prosensKey',
    storage: window.sessionStorage
  })(store)
}