import Vue from 'vue'

const BASE_URL = 'https://dev.filipjelic.com';


export default {

  getLeaderboard() {
    return Vue.http.get(BASE_URL + '/api/33traps/leaderboard')
  },

  addRecord(data) {
    return Vue.http.post(BASE_URL + '/api/33traps/leaderboard', data)
  }

}
