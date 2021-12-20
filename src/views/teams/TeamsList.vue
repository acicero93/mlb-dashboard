<template>
  <div v-if="isLoading" class="flex justify-center">
    <Spinner class="h-12 w-12 my-12" />
  </div>
  <GridList v-else>
    <TeamItem :id="team.id" v-for="team in teams" :key="team.id" :team="team" />
  </GridList>
</template>

<script>
import useTeams from '@/composables/useTeams'
import GridList from '@/components/GridList'
import TeamItem from '@/components/teams/TeamItem'

export default {
  components: {
    GridList,
    TeamItem
  },
  setup() {
    const { getTeams, teams, isLoading } = useTeams()

    getTeams()

    return {
      teams,
      isLoading
    }
  }
}
</script>
