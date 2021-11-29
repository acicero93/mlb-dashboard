<template>
  <div class="w-full">
    <SectionHeading :title="stats.group.displayName" />
    <LineChart class="h-96" v-bind="lineChartProps" />
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js'
import { LineChart, useLineChart } from 'vue-chart-3'
import { ref, computed, defineComponent } from 'vue'
import SectionHeading from '@/components/SectionHeading'

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
  name: 'StatsLineChart',
  props: {
    stats: {
      type: Object,
      require: true
    }
  },
  components: {
    LineChart,
    SectionHeading
  },
  setup(props) {
    const c = document.createElement('canvas')
    const ctx = c.getContext('2d')
    // const { splits = [], group } = props.stats
    // const group = props.stats.splits
    // const splits = props.stats.group
    const datasets = ref([])

    // Keys
    // const statKeys = ['hits', 'doubles', 'homeRuns']

    const statKeys = {
      pitching: ['wins', 'saves', 'era'],
      hitting: ['hits', 'doubles', 'homeRuns'],
      fielding: ['assists', 'chances', 'doublePlays', 'errors', 'fielding', 'games', 'gamesStarted', 'innings']
    }

    statKeys[props.stats.group.displayName].forEach((k) => {
      const data = props.stats.splits.map((s) => s.stat[k])
      const { grd, color } = createGradient()

      datasets.value.push({
        label: k,
        data: data,
        backgroundColor: grd,
        borderColor: color,
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

      return { grd, color: `rgb(${color})` }
    }

    const chartData = computed(() => ({
      labels: props.stats.splits.map((s) => [s.season, s.team?.teamName || '']),
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
