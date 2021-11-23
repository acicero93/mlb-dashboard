<template>
  <TeamList>
    <TeamItem v-for="team in teams" :key="team.id" :team="team" />
  </TeamList>
</template>

<script>
import useTeams from '@/composables/useTeams'
import TeamList from '@/components/teams/TeamList'
import TeamItem from '@/components/teams/TeamItem'

export default {
  components: {
    TeamList,
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
