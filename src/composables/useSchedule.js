import { ref, readonly, computed } from 'vue'
import mlbStats from '@/utils/db'
import useYear from '@/composables/useYear'

export default function useTeams() {
  const { currentYear } = useYear()
  const isLoading = ref(false)
  const error = ref(null)
  const series = ref([])
  // Division, League, World Series
  const seriesTypes = ['D', 'L', 'W']

  const seriesRounds = computed(() => {
    const arr = []

    seriesTypes.forEach((type) => {
      const seriesList = series.value.filter((s) => s.series.gameType === type)

      // Find games containing series decision/result
      let gamesList = seriesList
        .map(s => s.games)
        .flat()
        .filter(g => g.seriesStatus.isOver)
        .sort((a, b) => (a.seriesStatus.shortName > b.seriesStatus.shortName ? 1 : -1))

      // Remove duplicates
      gamesList = [...gamesList.reduce((a,c)=>{
        a.set(c.gamePk, c);
        return a;
      }, new Map()).values()];

      const games = gamesList.map(game => {
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
    const ws = series.value.find((s) => s.series.gameType === 'W')
    const fg = ws?.games.find((s) => s.seriesStatus.isOver)

    return fg
  })

  const getSchedulePostseasonSeries = async ({ season = currentYear } = {}) => {
    isLoading.value = true

    const prevSeason = season - 1

    try {
      const { data } = await mlbStats.getSchedulePostseasonSeries({
        params: {
          season,
          sportId: 1,
          hydrate: 'team,broadcasts(all),seriesStatus(useOverride=true),decisions,person,probablePitcher,linescore(matchup),game(content(media(epg),summary),tickets),gameId'
        }
      })
      if (error.value) throw error
      if (data?.series && data?.series.length) {
        series.value = data.series
      } else if (!data?.series.length) {
        return getSchedulePostseasonSeries({ season: prevSeason })
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
