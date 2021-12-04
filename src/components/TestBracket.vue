<template>
  <div>
    <Bracket :rounds="rounds">
      <template v-slot:player="{ player }"> {{ player.name }}</template>
    </Bracket>

    {{ rounds }}
  </div>
</template>

<script>
import { ref } from 'vue'
import Bracket from 'vue-tournament-bracket/src/Bracket.vue'

const testing = [
  //Semi finals
  {
    games: [
      {
        player1: { id: '1', name: 'Competitor 1', winner: false },
        player2: { id: '4', name: 'Competitor 4', winner: true }
      }
    ]
  },
  {
    games: [
      {
        player1: { id: '1', name: 'Competitor 1', winner: false },
        player2: { id: '4', name: 'Competitor 4', winner: true }
      },
      {
        player1: { id: '5', name: 'Competitor 5', winner: false },
        player2: { id: '8', name: 'Competitor 8', winner: true }
      }
    ]
  },
  //Third place play off
  {
    games: [
      {
        player1: { id: '1', name: 'Competitor 1', winner: false },
        player2: { id: '5', name: 'Competitor 5', winner: true }
      }
    ]
  },
  //Final
  {
    games: [
      {
        player1: { id: '4', name: 'Competitor 4', winner: false },
        player2: { id: '8', name: 'Competitor 8', winner: true }
      }
    ]
  }
]

export default {
  components: {
    Bracket
  },
  props: {
    series: {
      type: Array,
      require: true
    }
  },
  setup(props) {
    const rounds = ref([])
    console.log('HERE', props.series)

    // const order = ['WS', 'ALWC', 'NLWC', "NLDS 'A'", "NLDS 'B'", "ALDS 'B'", "ALDS 'A'", 'NLCS', 'ALCS']
    // const order = [['ALWC'], ["ALDS 'A'", "ALDS 'B'"], ['ALCS'], ['WS'], ['NLCS'], ["NLDS 'A'", "NLDS 'B'"], ['NLWC']]
    const order = [["ALDS 'A'", "ALDS 'B'", "NLDS 'A'", "NLDS 'B'"], ['ALCS', 'NLCS'], ['WS']]


    order.forEach((types) => {
      const series = props.series.filter((s) => types.includes(s.series.id))
      console.log('THE SERIOES', series)
      // types.forEach(type => {
      //   const series = props.series.filter(s => s.series.id === k)
      // })
      const games = series.reverse().map((s) => {
        const game = s.games.find((s) => s.seriesStatus.isOver)

        return {
          player1: { id: game.seriesStatus.winningTeam.id, name: game.seriesStatus.winningTeam.name, winner: true },
          player2: { id: game.seriesStatus.losingTeam.id, name: game.seriesStatus.losingTeam.name, winner: false }
        }
      })

      rounds.value.push({ games })
    })

    return {
      rounds,
      testing
    }
  }
}
</script>
