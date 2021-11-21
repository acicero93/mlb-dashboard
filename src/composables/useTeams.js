import { ref, readonly } from 'vue';
import mlbStats from '@/utils/db';

export default function useTeams() {
  const isLoading = ref(false);
  const error = ref(null);
  const teams = ref([]);
  const teamDetail = ref({});

  const getTeams = async ({ season = 2022 } = {}) => {
    isLoading.value = true;

    try {
      const { data, error } = await mlbStats.getTeams({
        params: {
          season: season,
          sportIds: '1'
        }
      });
      if (error) throw error;
      if (data.teams) {
        teams.value = data.teams.sort((a, b) => a.id - b.id);
      }
    } catch (err) {
      error.value = err;
    } finally {
      isLoading.value = false;
    }
  };

  const getTeamById = async ({ teamId = 0 } = {}) => {
    isLoading.value = true;

    try {
      const { data, error } = await mlbStats.getTeam({
        pathParams: {
          teamId,
          sportIds: '1'
        }
      });
      if (error) throw error;
      if (data?.teams.length) {
        teamDetail.value = data.teams[0];
      }
    } catch (err) {
      error.value = err;
    } finally {
      isLoading.value = false;
    }
  };

  const getTeamsAffiliates = async ({ teamIds = 0 } = {}) => {
    isLoading.value = true;

    try {
      // Incorrect api
      const { data, error } = await mlbStats.request(`${mlbStats.apiHost}teams/affiliates`, {
        params: {
          teamIds,
          sportIds: '1'
        }
      });
      if (error) throw error;
      if (data?.teams.length) {
        return data.teams.filter((t) => t.id !== parseInt(teamIds));
      }
    } catch (err) {
      error.value = err;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    getTeams,
    getTeamById,
    getTeamsAffiliates,
    teams: readonly(teams),
    teamDetail: readonly(teamDetail),
    error,
    isLoading
  };
}
