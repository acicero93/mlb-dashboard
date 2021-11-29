import { ref } from 'vue'
import mlbStats from '@/utils/db'

export default function usePeople() {
  const isLoading = ref(false)
  const error = ref(null)

  const getPerson = async ({ personId = 0 } = {}) => {
    isLoading.value = true

    try {
      const { data, error } = await mlbStats.getPerson({
        pathParams: {
          personId
        },
        params: {
          hydrate: 'currentTeam,team,awards,stats(type=[yearByYear,yearByYearAdvanced,careerRegularSeason,careerAdvanced](team))'
          // hydrate: 'currentTeam,team,awards(team,league),stats(type=[yearByYear,yearByYearAdvanced,careerRegularSeason,careerAdvanced,availableStats](team(league)),sportListId=1)'
          // stats(type=[yearByYear,yearByYearAdvanced,careerRegularSeason,careerAdvanced,availableStats](team(league)),leagueListId=mlb_hist)&site=en
        }
      })
      if (error) throw error
      if (data?.people?.length) {
        return data.people[0]
      }
    } catch (err) {
      error.value = err
    } finally {
      isLoading.value = false
    }
  }

  const getPersonStats = async ({ personId = 0, group = 'hitting', stats = 'yearByYear,career,yearByYearAdvanced,careerAdvanced' } = {}) => {
    isLoading.value = true

    try {
      const { data, error } = await mlbStats.request(`${mlbStats.apiHost}people/${personId}/stats`, {
        params: {
          stats,
          gameType: 'R',
          leagueListId: 'mlb_hist',
          group,
          hydrate: 'team(league)',
          language: 'en'
        }
      })
      if (error) throw error
      if (data?.stats) {
        return data.stats
      }
    } catch (err) {
      error.value = err
    } finally {
      isLoading.value = false
    }
  }

  return {
    getPerson,
    getPersonStats,
    error,
    isLoading
  }
}
