<template>
  <v-flex class="leaderboard">
    <Loader dark v-if="loader"></Loader>
    <ul>
      <v-data-table
        v-bind:headers="headers"
        :items="items"
        hide-actions
        class="elevation-4"
      >
        <template slot="items" slot-scope="props">
          <td class="text-xs-left">{{ props.item.rank }}</td>
          <td class="text-xs-center">{{ props.item.nickname }}</td>
          <td class="text-xs-center">{{ props.item.record }}</td>
        </template>
      </v-data-table>
    </ul>
  </v-flex>
</template>
<script>
  import _ from 'lodash'
  import GameService from '../../services/GameService'
  import Loader from '../loader/Loader'

  export default {
    name: 'leaderboard',
    components: {
      Loader
    },
    methods: {
      getLeaderboard: function () {
        let _self = this
        this.loader = true

        GameService
          .getLeaderboard()
          .then((response) => {

            let data = _.map(_.orderBy(response.body.data, ['record'],['asc']), (d, i) => {
              d.rank = i + 1
              return d
            })

            _self.items = data

            // let it be live a bit for smoother UI :)
            setTimeout(() => {
              _self.loader = false
            }, 500)
          })
      }
    },
    mounted: function () {
      this.getLeaderboard()
    },
    data: function () {
      return {
        loader: false,
        items: [],
        headers: [
          {
            text: '#',
            align: 'left',
            sortable: false,
            value: 'rank'
          },
          {
            text: 'Nickname',
            align: 'center',
            sortable: false,
            value: 'nickname'
          },
          {
            text: 'Score',
            align: 'center',
            sortable: false,
            value: 'record'
          }
        ]
      }
    }
  }
</script>
<style scoped>
  .leaderboard {
    position: relative;
    min-height: 100px;
    min-width: 250px;
  }

</style>
