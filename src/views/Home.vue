<template>
  <div>Hello world</div>
</template>

<script>
import { onMounted, ref } from 'vue'
import mlbStats from '@/utils/db'
import useYear from '@/composables/useYear'

export default {
  setup() {
    const { currentYear } = useYear()
    const records = ref([])

    onMounted(async () => {
      console.log(mlbStats)
      const { data } = await mlbStats.getSchedulePostseasonSeries({
        params: {
          leagueListId: 'mlb',
          season: currentYear
        }
      })
      records.value = data.records

      console.log('data', data)
    })

    return {
      records
    }
  }
}
</script>
