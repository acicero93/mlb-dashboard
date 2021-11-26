<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-4">
    <div v-for="player in players" :key="player.person.id" class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
      <div class="flex-shrink-0">
        <img class="object-contain h-10 w-10 rounded-full" :src="`https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:silo:current.png/r_max/w_180,q_auto:best/v1/people/${player.person.id}/headshot/silo/current`" :alt="player.person.fullName" />
      </div>
      <div class="flex-1 min-w-0">
        <a href="#" class="focus:outline-none">
          <span class="absolute inset-0" aria-hidden="true" />
          <p class="text-sm font-medium text-gray-900">
            {{ player.person.fullName }}
          </p>
          <p class="text-sm text-gray-500 truncate">
            {{ player.position.name }}
          </p>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    players: {
      type: Array,
      required: true
    }
  }
}
</script>
