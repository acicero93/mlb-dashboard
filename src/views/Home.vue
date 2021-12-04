<template>
  <div>
    <!-- Hello world -->
    <TestBracket v-if="series.length" :series="series" />
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import mlbStats from '@/utils/db'
import useYear from '@/composables/useYear'
import TestBracket from '@/components/TestBracket'

export default {
  components: {
    TestBracket
  },
  setup() {
    const { currentYear } = useYear()
    const series = ref([])

    onMounted(async () => {
      console.log(mlbStats)
      const { data } = await mlbStats.getSchedulePostseasonSeries({
        params: {
          season: currentYear,
          sportId: 1,
          hydrate: 'team,broadcasts(all),seriesStatus(useOverride=true),decisions,person,probablePitcher,linescore(matchup),game(content(media(epg),summary),tickets),gameId'
        }
      })
      series.value = data.series

      console.log('data', data)
    })

    return {
      series
    }
  }
}
</script>