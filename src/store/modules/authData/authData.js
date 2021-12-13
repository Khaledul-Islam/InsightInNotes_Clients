const state = {
  access_token:  null,
  logIn_User_Info: JSON.parse(sessionStorage.getItem('user')) || null,
}

const getters = {
  isLoggedIn(state) {
    return state.access_token !== null
  },
  accessToken(state) {
    return state.access_token
  },
  getEmail(state) {
    return state.logIn_User_Info.email
  },
  getUserName(state) {
    return state.logIn_User_Info.userName
  },
  getRole(state) {
    return state.logIn_User_Info.role
  },
};

const mutations = {
  setToken(state, access_token) {
    state.access_token = access_token
  },
  setLoginUserData(state, logInUserInfo) {
    state.logIn_User_Info = logInUserInfo
  },
};

const actions = {};

export default {
  state,
  getters,
  actions,
  mutations,
}
