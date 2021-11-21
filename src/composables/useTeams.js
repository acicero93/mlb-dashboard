import { ref, readonly } from 'vue';
import mlbStats from '@/utils/db';

const teams = ref([]);

export default function useTeams() {
  const isLoading = ref(false);
  const error = ref(null);

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

  return {
    getTeams,
    teams: readonly(teams),
    error,
    isLoading
  };
}
