<template>
  <div>
    <Bracket :rounds="rounds">
      <template v-slot:player="{ player: team }">
        <img class="w-6 h-6 mr-3" :src="`https://www.mlbstatic.com/team-logos/${team.id}.svg`" alt="" />
        {{ team.name }}
      </template>
    </Bracket>
  </div>
</template>

<script>
import Bracket from 'vue-tournament-bracket/src/Bracket.vue'

export default {
  components: {
    Bracket
  },
  props: {
    rounds: {
      type: Object,
      require: true
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
