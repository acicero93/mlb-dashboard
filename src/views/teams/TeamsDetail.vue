<template>
  <div>Detail {{ teamDetail }}</div>
</template>

<script>
import useTeams from '@/composables/useTeams';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const { getTeamById, teamDetail } = useTeams();

    getTeamById({ teamId: route.params.id });

    return {
      teamDetail
    };
  }
};
</script>
