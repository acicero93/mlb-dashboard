<template>
  <div>
    <h1 v-if="finalGame" class="mt-4 text-center text-2xl font-bold text-gray-900 truncate">{{ finalGame.season }} Post Season</h1>

    <div class="flex overflow-scroll lg:overflow-hidden">
      <SeriesBracket v-if="seriesRounds.length" :rounds="seriesRounds" />

      <div v-if="finalGame" class="flex flex-col flex-grow justify-center items-center ml-8">
        <div class="w-32 p-6 mb-4 shadow-md rounded-full">
          <img :src="`https://www.mlbstatic.com/team-logos/${finalGame.seriesStatus.winningTeam.id}.svg`" alt="" />
        </div>
        <div class="font-bold">{{ finalGame.seriesStatus.result }}</div>
      </div>
    </div>

    <LogoClouds />
  </div>
</template>

<script>
import useYear from '@/composables/useYear'
import useSchedule from '@/composables/useSchedule'
import SeriesBracket from '@/components/SeriesBracket'
import LogoClouds from '@/components/LogoClouds'

export default {
  components: {
    SeriesBracket,
    LogoClouds
  },
  setup() {
    const { selected } = useYear()
    const { seriesRounds, finalGame, getSchedulePostseasonSeries } = useSchedule()

    getSchedulePostseasonSeries({ season: selected.value })

    return {
      selected,
      seriesRounds,
      finalGame
    }
  }
}
</script>
