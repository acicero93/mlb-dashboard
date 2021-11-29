<template>
  <div>
    <template v-if="player">
      <!-- Breadcrumb -->
      <nav class="flex items-start px-4 py-3 sm:px-6 lg:px-8 xl:hidden" aria-label="Breadcrumb">
        <ol role="list" class="flex items-center space-x-4">
          <li class="flex items-center">
            <router-link :to="{ name: 'TeamsList' }" class="text-sm font-medium text-gray-500 hover:text-gray-700">Teams</router-link>
          </li>
          <li class="flex items-center">
            <ChevronRightIcon class="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
            <router-link :to="{ name: 'TeamsDetail', params: { id: player.currentTeam.id } }" class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">{{ player.currentTeam.name }}</router-link>
          </li>
          <li class="flex items-center">
            <ChevronRightIcon class="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
            <a href="#" class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">{{ player.fullName }}</a>
          </li>
        </ol>
      </nav>

      <div>
        <img class="h-32 w-full object-cover object-top lg:h-60" :src="`https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:action:hero:current.jpg/q_auto:good,w_1500/v1/people/${player.id}/action/hero/current`" alt="" />
      </div>
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
          <div class="flex">
            <img class="bg-gray-200 h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32" :src="`https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:silo:current.png/r_max/w_180,q_auto:best/v1/people/${player.id}/headshot/silo/current`" alt="" />
          </div>
          <div class="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div class="sm:hidden md:block mt-6 min-w-0 flex-1">
              <h1 class="text-2xl font-bold text-gray-900 truncate">
                {{ player.fullName }}
              </h1>
            </div>
            <div class="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">{{ player.primaryPosition.name }} | B/T: {{ player.batSide.code }}/{{ player.pitchHand.code }} | {{ player.height }}/{{ player.weight }} | Age: {{ player.currentAge }}</div>
          </div>
        </div>
        <div class="hidden sm:block md:hidden mt-6 min-w-0 flex-1">
          <h1 class="text-2xl font-bold text-gray-900 truncate">
            {{ player.fullName }}
          </h1>
        </div>

        <!-- Stats -->
        <RadioGroup v-model="selected" class="mt-2 flex justify-center">
          <div class="grid grid-cols-3 gap-3">
            <RadioGroupOption as="template" v-for="stat in stats" :key="stat.group.displayName" :value="stat.group.displayName" v-slot="{ active, checked }">
              <div :class="[active ? 'ring-2 ring-offset-2 ring-indigo-500' : '', checked ? 'bg-indigo-600 border-transparent text-white hover:bg-indigo-700' : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50', 'border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1']">
                <RadioGroupLabel as="p">
                  {{ stat.group.displayName }}
                </RadioGroupLabel>
              </div>
            </RadioGroupOption>
          </div>
        </RadioGroup>
        <StatsLineChart v-show="stat.group.displayName === selected" v-for="(stat, i) in stats" :key="i" :stats="stat" />

        <!-- Awards -->
        <PlayerAwardList :awards="player.awards" />
      </div>
    </template>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { ChevronRightIcon } from '@heroicons/vue/solid'
import usePeople from '@/composables/usePeople'
import StatsLineChart from '@/components/charts/StatsLineChart'
import PlayerAwardList from '@/components/players/PlayerAwardList'
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'

export default {
  components: {
    ChevronRightIcon,
    PlayerAwardList,
    StatsLineChart,
    RadioGroup,
    RadioGroupLabel,
    RadioGroupOption
  },
  setup() {
    const route = useRoute()
    const { getPerson, getPersonStats } = usePeople()
    const player = ref(null)
    const stats = ref(null)
    const selected = ref(null)

    onMounted(async () => {
      player.value = await getPerson({ personId: route.params.id })
      stats.value = await getPersonStats({ personId: route.params.id, stats: 'yearByYear', group: 'hitting,pitching,fielding' })
      selected.value = stats.value[0].group.displayName
    })

    return {
      selected,
      player,
      stats
    }
  }
}
</script>
