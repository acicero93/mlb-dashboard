<template>
  <div>
    <SectionHeading title="Stats" />

    <RadioGroup v-model="selected" class="mb-4 flex justify-center">
      <div :class="`grid grid-cols-${stats.length} gap-3`">
        <RadioGroupOption as="template" v-for="stat in stats" :key="stat.group.displayName" :value="stat.group.displayName" v-slot="{ active, checked }">
          <div :class="[active ? 'ring-2 ring-offset-2 ring-indigo-500' : '', checked ? 'bg-indigo-600 border-transparent text-white hover:bg-indigo-700' : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50', 'cursor-pointer border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1']">
            <RadioGroupLabel as="p">
              {{ stat.group.displayName }}
            </RadioGroupLabel>
          </div>
        </RadioGroupOption>
      </div>
    </RadioGroup>
    <StatsLineChart v-show="stat.group.displayName === selected" v-for="(stat, i) in stats" :key="i" :stat="stat" />
  </div>
</template>

<script>
import { ref } from 'vue'
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'
import SectionHeading from '@/components/SectionHeading'
import StatsLineChart from '@/components/charts/StatsLineChart'

export default {
  components: {
    SectionHeading,
    StatsLineChart,
    RadioGroup,
    RadioGroupLabel,
    RadioGroupOption
  },
  props: {
    stats: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const selected = ref(props.stats[0].group.displayName)

    return {
      selected
    }
  }
}
</script>
