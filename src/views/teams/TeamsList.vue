<template>
  <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10">
    <li v-for="team in teams" :key="team.id" class="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
      <div class="relative flex-1 flex flex-col p-8">
        <div class="absolute -top-4 -right-4 h-12 w-12">
          <img v-if="isAmericanLeague(team)" :src="require(`@/assets/al.png`)" />
          <img v-else :src="require(`@/assets/nl.png`)" />
        </div>
        <img class="w-32 h-32 flex-shrink-0 mx-auto" :src="`https://www.mlbstatic.com/team-logos/${team.id}.svg`" alt="" />
        <h3 class="mt-6 text-gray-900 text-sm font-medium">{{ team.name }}</h3>
        <dl class="mt-1 flex-grow flex flex-col justify-between">
          <dt class="sr-only">Title</dt>
          <dd class="text-gray-500 text-sm">{{ team.title }}</dd>
          <dt class="sr-only">Role</dt>
          <dd class="mt-3">
            <span class="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">Since {{ team.firstYearOfPlay }}</span>
          </dd>
        </dl>
      </div>
      <div>
        <div class="-mt-px flex divide-x divide-gray-200">
          <div class="-ml-px w-0 flex-1 flex">
            <router-link :to="{ name: 'TeamsDetail', params: { id: team.id } }" class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500">
              <InformationCircleIcon class="w-5 h-5 text-gray-400" aria-hidden="true" />
              <span class="ml-3">View More</span>
            </router-link>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import { InformationCircleIcon } from '@heroicons/vue/solid';
import useTeams from '@/composables/useTeams';

export default {
  components: {
    InformationCircleIcon
  },
  setup() {
    const { getTeams, teams } = useTeams();

    getTeams();

    function isAmericanLeague(team) {
      return team.league.name === 'American League';
    }

    return {
      teams,
      isAmericanLeague
    };
  }
};
</script>
