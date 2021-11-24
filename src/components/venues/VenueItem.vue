<template>
  <router-link :to="{ name: 'TeamsDetail', params: { id: team.id }, query: { tab: 2 } }">
    <li class="relative cursor-pointer">
      <div :style="{ backgroundImage: `url(${require('@/assets/stadium.jpg')})` }" class="group block w-full aspect-w-10 aspect-h-10 rounded-lg bg-cover bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
        <img :src="`https://www.mlbstatic.com/team-logos/${team.id}.svg`" alt="" class="bg-black bg-opacity-20 object-fit pointer-events-none p-10 group-hover:opacity-75" />
      </div>
      <p class="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">{{ team.venue.name }}</p>
      <p class="block text-sm font-medium text-gray-500 pointer-events-none">{{ team.name }}</p>
    </li>
  </router-link>
</template>

<script>
export default {
  props: {
    team: {
      type: Object,
      required: true
    }
  }
}
</script>
