<template>
  <GridList>
    <VenueItem v-for="team in teams" :key="team.id" :team="team" />
  </GridList>
</template>

<script>
import useTeams from '@/composables/useTeams'
import GridList from '@/components/GridList'
import VenueItem from '@/components/venues/VenueItem'

export default {
  components: {
    GridList,
    VenueItem
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
