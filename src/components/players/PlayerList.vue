<template>
  <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    <li v-for="player in players" :key="player.person.id" class="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
      <div class="relative flex-1 flex flex-col p-8">
        <img class="w-32 h-32 flex-shrink-0 mx-auto rounded-full border" :src="`https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:silo:current.png/r_max/w_180,q_auto:best/v1/people/${player.person.id}/headshot/silo/current`" alt="" />
        <h3 class="mt-6 text-gray-900 text-sm font-medium">{{ player.person.fullName }}</h3>
        <dl class="mt-1 flex-grow flex flex-col justify-between">
          <dt class="sr-only">Position</dt>
          <dd class="mt-3" v-if="player.position.name">
            <span class="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">{{ player.position.name }}</span>
          </dd>
        </dl>
        <div class="absolute -top-2 -right-2 h-10 w-10">
          <img :src="require(`@/assets/jersey-circle.png`)" alt="jersey" />
          <span class="font-graduate absolute top-2 right-0 h-10 w-10">{{ player.jerseyNumber || '??' }}</span>
        </div>
      </div>
    </li>
  </ul>
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
