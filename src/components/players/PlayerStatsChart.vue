<template>
  <div class="w-full">
    <LineChart v-bind="lineChartProps" />
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js'
import { LineChart, useLineChart } from 'vue-chart-3'
import { ref, computed, defineComponent } from 'vue'

// BarChart
// DoughnutChart
// LineChart
// PieChart
// PolarAreaChart
// RadarChart
// BubbleChart
// ScatterChart

Chart.register(...registerables)

export default defineComponent({
  name: 'PlayerStatsChart',
  props: {
    player: {
      type: Object,
      require: true
    },
    statType: {
      type: String,
      require: true
    }
  },
  components: {
    LineChart
  },
  setup(props) {
    const c = document.createElement('canvas')
    const ctx = c.getContext('2d')
    const { splits = [] } = props.player?.stats.find((t) => t.type.displayName === props.statType)
    const datasets = ref([])

    // Keys
    const statKeys = ['hits', 'doubles', 'singles', 'homeRuns']

    statKeys.forEach((k) => {
      const data = splits.map((s) => s.stat[k])

      datasets.value.push({
        label: k,
        data: data,
        backgroundColor: createGradient(),
        borderColor: '#FC2525',
        borderWidth: 1,
        pointBackgroundColor: 'white',
        pointBorderColor: 'black'
      })
    })

    function rn(max) {
      return Math.floor(Math.random() * (max || 255))
    }

    function createGradient() {
      const grd = ctx.createLinearGradient(0, 0, 0, 450)
      const color = `${rn()}, ${rn()}, ${rn()}`

      grd.addColorStop(0, `rgba(${color}, 0.5)`)
      grd.addColorStop(0.5, `rgba(${color}, 0.25)`)
      grd.addColorStop(1, `rgba(${color}, 0)`)

      return grd
    }

    const chartData = computed(() => ({
      labels: splits.map((s) => [s.season, s.team.teamName]),
      datasets: datasets.value
    }))

    const { lineChartProps, lineChartRef } = useLineChart({
      chartData,
      options: { fill: true, tension: 0.2 }
    })

    return { lineChartProps, lineChartRef }
  }
})
</script>
