<template>
  <GridList>
    <TeamItem v-for="team in teams" :key="team.id" :team="team" />
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
    const { getTeams, teams } = useTeams()

    getTeams()

    return {
      teams
    }
  }
}
</script>
