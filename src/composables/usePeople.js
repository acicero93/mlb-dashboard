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
          hydrate: 'awards(team),stats(type=[yearByYear,yearByYearAdvanced,careerRegularSeason,careerAdvanced](team))'
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

  return {
    getPerson,
    error,
    isLoading
  }
}
