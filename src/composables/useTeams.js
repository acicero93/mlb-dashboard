import { ref, readonly } from 'vue'
import mlbStats from '@/utils/db'
import useYear from '@/composables/useYear'

const { selected } = useYear()

export default function useTeams() {
  const isLoading = ref(false)
  const error = ref(null)
  const teams = ref([])
  const teamDetail = ref({})

  const getTeams = async () => {
    isLoading.value = true

    try {
      const { data, error } = await mlbStats.getTeams({
        params: {
          season: selected.value,
          sportIds: '1'
        }
      })
      if (error) throw error
      if (data.teams) {
        teams.value = data.teams.sort((a, b) => a.id - b.id)
      }
    } catch (err) {
      error.value = err
    } finally {
      isLoading.value = false
    }
  }

  const getTeamById = async ({ teamId = 0 } = {}) => {
    isLoading.value = true

    try {
      const { data, error } = await mlbStats.getTeam({
        params: {
          season: selected.value
        },
        pathParams: {
          teamId,
          sportIds: '1'
        }
      })
      if (error) throw error
      if (data?.teams.length) {
        teamDetail.value = data.teams[0]
      }
    } catch (err) {
      error.value = err
    } finally {
      isLoading.value = false
    }
  }

  const getTeamsAffiliates = async ({ teamIds = 0 } = {}) => {
    isLoading.value = true

    try {
      const { data, error } = await mlbStats.request(`${mlbStats.apiHost}teams/affiliates`, {
        params: {
          teamIds,
          season: selected.value,
          sportIds: '1'
        }
      })
      if (error) throw error
      if (data?.teams.length) {
        return data.teams.filter((t) => t.id !== parseInt(teamIds))
      }
    } catch (err) {
      error.value = err
    } finally {
      isLoading.value = false
    }
  }

  const getTeamRoster = async ({ teamId = 0 } = {}) => {
    isLoading.value = true

    try {
      const { data, error } = await mlbStats.getTeamRoster({
        params: {
          season: selected.value
        },
        pathParams: {
          teamId,
          sportIds: '1'
        }
      })
      if (error) throw error
      if (data?.roster) {
        return data.roster.sort((a, b) => (a.position.name > b.position.name ? 1 : -1))
      }
    } catch (err) {
      error.value = err
    } finally {
      isLoading.value = false
    }
  }

  return {
    getTeams,
    getTeamById,
    getTeamsAffiliates,
    getTeamRoster,
    teams: readonly(teams),
    teamDetail: readonly(teamDetail),
    error,
    isLoading
  }
}
