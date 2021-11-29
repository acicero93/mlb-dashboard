<template>
  <div>
    <SectionHeading title="Awards" />
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div v-for="award in awards" :key="award.id" class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
        <div class="flex-1 min-w-0">
          <span class="absolute inset-0" aria-hidden="true" />
          <p class="text-sm font-medium text-gray-900">
            {{ award.name }}
          </p>
          <p class="text-sm text-gray-500 truncate">{{ award.season }} - {{ award.team.teamName }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SectionHeading from '@/components/SectionHeading'

export default {
  components: {
    SectionHeading
  },
  props: {
    awards: {
      type: Array,
      required: true
    }
  }
}
</script>
