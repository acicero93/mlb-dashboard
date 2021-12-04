<template>
  <div class="overflow-scroll md:overflow-hidden">
    <Bracket :rounds="rounds">
      <template v-slot:player="{ player }">
        <img class="w-6 h-6 mr-3" :src="`https://www.mlbstatic.com/team-logos/${player.id}.svg`" alt="" />
        {{ player.name }}
      </template>
    </Bracket>
  </div>
</template>

<script>
import { ref } from 'vue'
import Bracket from 'vue-tournament-bracket/src/Bracket.vue'

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
      rounds
    }
  }
}
</script>

<style lang="scss">
.vtb-item-players {
  background: white;

  .vtb-player {
    width: 250px;
    @apply text-black;
    @apply relative rounded-lg border border-gray-300 bg-white px-3 py-3 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500;

    &.winner {
      @apply bg-green-50;
    }
    &.defeated {
      @apply bg-red-50;
    }
  }
}
</style>