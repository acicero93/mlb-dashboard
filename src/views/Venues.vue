<template>
  <ul class="divide-y divide-gray-200">
    <li v-for="venue in venues" :key="venue.id" class="py-4 flex">
      {{ venue }}
    </li>
  </ul>
</template>

<script>
import useVenues from "@/composables/useVenues";

export default {
  setup() {
    const { getVenues, venues } = useVenues();

    getVenues();

    return {
      venues,
    };
  },
};
</script>
