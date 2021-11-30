<template>
  <div class="overflow-hidden">
    <div class="px-4 py-5 sm:px-6">
      <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Full name</dt>
          <dd class="mt-1 text-sm text-gray-900">{{ player.fullName }}</dd>
        </div>
        <div v-if="player.nickName" class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Nickname</dt>
          <dd class="mt-1 text-sm text-gray-900">{{ player.nickName }}</dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Born</dt>
          <dd class="mt-1 text-sm text-gray-900">
            {{ player.birthDate }} in {{ player.birthCity }}
            <template v-if="player.birthStateProvince">, {{ player.birthStateProvince }}</template>
          </dd>
        </div>
        <div v-if="player.currentTeam" class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Current Team</dt>
          <dd class="mt-1 text-sm text-gray-900">{{ player.currentTeam.name }}</dd>
        </div>
        <div v-if="player.draftYear" class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Draft Year</dt>
          <dd class="mt-1 text-sm text-gray-900">{{ player.draftYear }}</dd>
        </div>
        <div v-if="player.mlbDebutDate" class="sm:col-span-2">
          <dt class="text-sm font-medium text-gray-500">MLB Debut</dt>
          <dd class="mt-1 text-sm text-gray-900">{{ player.mlbDebutDate }}</dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    player: {
      type: Object,
      require: true
    }
  }
}
</script>
