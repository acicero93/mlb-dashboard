<template>
  <div>
    <h1 class="mt-4 text-center text-2xl font-bold text-gray-900 truncate">{{ currentYear }} Post Season</h1>

    <div class="flex overflow-scroll lg:overflow-hidden">
      <SeriesBracket v-if="seriesRounds.length" :rounds="seriesRounds" />

      <div v-if="finalGame" class="flex flex-col flex-grow justify-center items-center ml-8">
        <div class="w-32 p-6 mb-4 shadow-md rounded-full">
          <img :src="`https://www.mlbstatic.com/team-logos/${finalGame.seriesStatus.winningTeam.id}.svg`" alt="" />
        </div>
        <div class="font-bold">{{ finalGame.seriesStatus.description }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import useYear from '@/composables/useYear'
import useSchedule from '@/composables/useSchedule'
import SeriesBracket from '@/components/SeriesBracket'

export default {
  components: {
    SeriesBracket
  },
  setup() {
    const { currentYear } = useYear()
    const { seriesRounds, finalGame, getSchedulePostseasonSeries } = useSchedule()

    getSchedulePostseasonSeries()

    return {
      currentYear,
      seriesRounds,
      finalGame
    }
  }
}
</script>
