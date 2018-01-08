import Vue from 'vue'

export default {

  getLeaderboard() {
    return Vue.http.get('/api/33traps/leaderboard')
  }

}
