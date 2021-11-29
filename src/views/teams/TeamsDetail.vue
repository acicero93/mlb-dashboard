<template>
  <div>
    <main class="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
      <!-- Breadcrumb -->
      <nav class="flex items-start px-4 py-3 sm:px-6 lg:px-8 xl:hidden" aria-label="Breadcrumb">
        <ol role="list" class="flex items-center space-x-4">
          <li class="flex items-center">
            <router-link :to="{ name: 'TeamsList' }" class="text-sm font-medium text-gray-500 hover:text-gray-700">Teams</router-link>
          </li>
          <li class="flex items-center">
            <ChevronRightIcon class="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
            <a href="#" class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">{{ teamDetail.name }}</a>
          </li>
        </ol>
      </nav>

      <article v-if="teamDetail.id">
        <!-- Details Header -->
        <div>
          <img class="h-32 w-full object-cover lg:h-48" src="@/assets/mlb-banner.png" alt="" />
        </div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
            <div class="flex">
              <img class="h-24 w-24 ring-1 ring-gray-600 bg-gray-100 p-3 sm:h-32 sm:w-32 object-contain" :src="`https://www.mlbstatic.com/team-logos/${teamDetail.id}.svg`" alt="" />
            </div>
            <div class="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
              <div class="sm:hidden 2xl:block mt-6 min-w-0 flex-1">
                <h1 class="text-2xl font-bold text-gray-900 truncate">
                  {{ teamDetail.name }}
                </h1>
              </div>
              <div class="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                <a href="https://github.com/acicero93" target="_blank" type="button" class="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800">
                  <MailIcon class="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                  <span>Message</span>
                </a>
                <a href="https://github.com/acicero93" target="_blank" type="button" class="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800">
                  <PhoneIcon class="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                  <span>Call</span>
                </a>
              </div>
            </div>
          </div>
          <div class="hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1">
            <h1 class="text-2xl font-bold text-gray-900 truncate">
              {{ teamDetail.name }}
            </h1>
          </div>
        </div>

        <!-- Tabs -->
        <div class="max-w-7xl mx-auto px-4 my-3 sm:px-6 lg:px-8">
          <TabGroup :defaultIndex="defaultIndex" @change="changedTab">
            <TabList class="border-b border-gray-200 -mb-px flex space-x-8">
              <Tab v-for="tab in tabs" :key="tab.name" v-slot="{ selected }" as="template">
                <button :class="[selected ? 'border-gray-800 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300', 'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm']">
                  {{ tab.name }}
                </button>
              </Tab>
            </TabList>
            <TabPanels class="my-4">
              <TabPanel>
                <!-- Team Details -->
                <template v-if="wikiTeamDetails">
                  <div class="my-4" v-html="wikiTeamDetails.content.extract_html" />

                  <WikiGallery v-if="wikiTeamDetails?.images.length" :images="wikiTeamDetails.images" />
                </template>
                <template v-else>Loading...</template>
              </TabPanel>
              <TabPanel>
                <!-- Team Affiliates -->
                <template v-if="wikiVenueDetails">
                  <div class="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div v-for="team in affiliates" :key="team.id" class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-gray-800">
                      <div class="flex-shrink-0">
                        <img class="h-10 w-10 rounded-full" :src="`https://www.mlbstatic.com/team-logos/${team.id}.svg`" alt="" />
                      </div>
                      <div class="flex-1 min-w-0">
                        <router-link :to="{ name: 'TeamsDetail', params: { id: team.id } }" class="focus:outline-none">
                          <span class="absolute inset-0" aria-hidden="true" />
                          <p class="text-sm font-medium text-gray-900">
                            {{ team.name }}
                          </p>
                          <p class="text-sm text-gray-500 truncate">
                            {{ team.league?.name }}
                          </p>
                        </router-link>
                      </div>
                    </div>
                  </div>
                </template>
                <template v-else>Loading...</template>
              </TabPanel>
              <TabPanel>
                <!-- Venue Details -->
                <template v-if="wikiVenueDetails">
                  <div class="my-4" v-html="wikiVenueDetails.content.extract_html" />

                  <iframe v-if="hasCoords && !isMapsDisabled" class="w-full h-96 my-6 rounded-3xl bg-gray-100" width="450" height="250" frameborder="0" style="border: 0" :src="`https://www.google.com/maps/embed/v1/view?key=${gmapsKey}&center=${latLng}&zoom=18&maptype=satellite`" allowfullscreen> </iframe>

                  <WikiGallery v-if="wikiVenueDetails?.images.length" :images="wikiVenueDetails.images" />
                </template>
                <template v-else>Loading...</template>
              </TabPanel>
              <TabPanel>
                <!-- Roster Details -->
                <template v-if="roster.length">
                  <PlayerList class="hidden lg:grid" :players="roster" />
                  <PlayerListCondensed class="lg:hidden" :players="roster" />
                </template>
                <template v-else>Loading...</template>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
      </article>
    </main>
  </div>
</template>

<script>
import { onMounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import { MailIcon, PhoneIcon, ChevronRightIcon } from '@heroicons/vue/solid'
import useTeams from '@/composables/useTeams'
import useWiki from '@/composables/useWiki'
import WikiGallery from '@/components/WikiGallery'
import PlayerList from '@/components/players/PlayerList'
import PlayerListCondensed from '@/components/players/PlayerListCondensed'

const tabs = [{ name: 'Details' }, { name: 'Affiliates' }, { name: 'Venue' }, { name: 'Players' }]

export default {
  components: {
    ChevronRightIcon,
    MailIcon,
    PhoneIcon,
    TabGroup,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    WikiGallery,
    PlayerList,
    PlayerListCondensed
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const { getTeamById, getTeamsAffiliates, getTeamRoster, teamDetail } = useTeams()
    const { getWikiArticle } = useWiki()
    const affiliates = ref([])
    const roster = ref([])
    const wikiTeamDetails = ref(null)
    const wikiVenueDetails = ref(null)
    const defaultIndex = ref(parseInt(route.query.tab) || 0)
    const latLng = computed(() => `${wikiVenueDetails.value?.content?.coordinates?.lat},${wikiVenueDetails.value?.content?.coordinates?.lon}`)
    const hasCoords = computed(() => Boolean(wikiVenueDetails.value?.content?.coordinates?.lat && wikiVenueDetails.value?.content?.coordinates?.lon))
    const isMapsDisabled = process.env.VUE_APP_GMAPS_DISABLED === 'true'
    const gmapsKey = process.env.VUE_APP_GMAPS_KEY

    onMounted(async () => {
      await getTeamById({ teamId: route.params.id })

      affiliates.value = await getTeamsAffiliates({ teamIds: route.params.id })
      roster.value = await getTeamRoster({ teamId: route.params.id })
      wikiTeamDetails.value = await getWikiArticle(teamDetail.value.name)
      wikiVenueDetails.value = await getWikiArticle(teamDetail.value.venue.name)
    })

    function changedTab(index) {
      router.push({ query: { tab: index } })
    }

    return {
      tabs,
      latLng,
      hasCoords,
      isMapsDisabled,
      gmapsKey,
      wikiTeamDetails,
      wikiVenueDetails,
      affiliates,
      roster,
      teamDetail,
      defaultIndex,
      changedTab
    }
  }
}
</script>
