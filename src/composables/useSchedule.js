import { ref, readonly, computed } from 'vue'
import mlbStats from '@/utils/db'
import useYear from '@/composables/useYear'

export default function useTeams() {
  const { currentYear } = useYear()
  const isLoading = ref(false)
  const error = ref(null)
  const series = ref([])
  const seriesTypes = [["ALDS 'A'", "ALDS 'B'", "NLDS 'A'", "NLDS 'B'"], ['ALCS', 'NLCS'], ['WS']]

  const seriesRounds = computed(() => {
    const arr = []

    seriesTypes.forEach((types) => {
      const games = series.value
        .filter((s) => types.includes(s.series.id))
        .reverse()
        .map((s) => {
          const game = s.games.find((s) => s.seriesStatus.isOver)

          return {
            player1: { id: game.seriesStatus.winningTeam.id, name: game.seriesStatus.winningTeam.name, winner: true },
            player2: { id: game.seriesStatus.losingTeam.id, name: game.seriesStatus.losingTeam.name, winner: false }
          }
        })

      arr.push({ games })
    })

    return arr
  })

  const finalGame = computed(() => {
    const ws = series.value.find((s) => s.series.id === 'WS')
    const fg = ws?.games.find((s) => s.seriesStatus.isOver)

    return fg
  })

  const getSchedulePostseasonSeries = async ({ season = currentYear } = {}) => {
    isLoading.value = true

    try {
      const { data } = await mlbStats.getSchedulePostseasonSeries({
        params: {
          season,
          sportId: 1,
          hydrate: 'team,broadcasts(all),seriesStatus(useOverride=true),decisions,person,probablePitcher,linescore(matchup),game(content(media(epg),summary),tickets),gameId'
        }
      })
      if (error.value) throw error
      if (data.series) {
        series.value = data.series
      }
    } catch (err) {
      error.value = err
    } finally {
      isLoading.value = false
    }
  }

  return {
    getSchedulePostseasonSeries,
    series: readonly(series),
    finalGame,
    seriesRounds,
    error,
    isLoading
  }
}
