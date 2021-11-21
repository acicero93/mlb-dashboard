import { ref, readonly } from "vue";
import mlbStats from "@/utils/db";

const venues = ref([]);

export default function useVenues() {
  const isLoading = ref(false);
  const error = ref(null);

  const getVenues = async () => {
    isLoading.value = true;

    try {
      const {
        data: { teams },
        error,
      } = await mlbStats.getTeams({ params: { season: 2022, sportIds: "1" } });
      if (error) throw error;
      if (teams) {
        venues.value = teams.map((team) => {
          return {
            teamName: team.name,
            ...team.venue,
          };
        });
      }
    } catch (err) {
      error.value = err;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    getVenues,
    venues: readonly(venues),
    error,
    isLoading,
  };
}
