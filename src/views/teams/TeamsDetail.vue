<template>
  <div>
    <!-- <div>
      <h1 class="text-2xl">{{ teamDetail }}</h1>
      <img class="w-32 h-32 flex-shrink-0 mx-auto" :src="`https://www.mlbstatic.com/team-logos/${teamDetail.id}.svg`" alt="" />
    </div> -->
    <!-- <h2 class="text-xl">Affiliates</h2> -->
    <!-- <div>{{ affiliates }}</div> -->
    <main class="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
      <!-- Breadcrumb -->
      <nav class="flex items-start px-4 py-3 sm:px-6 lg:px-8 xl:hidden" aria-label="Breadcrumb">
        <a href="#" class="inline-flex items-center space-x-3 text-sm font-medium text-gray-900">
          <ChevronLeftIcon class="-ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
          <span>Directory</span>
        </a>
      </nav>

      <article>
        <!-- Profile header -->
        <div>
          <div>
            <img class="h-32 w-full object-cover lg:h-48" src="https://gray-wifr-prod.cdn.arcpublishing.com/resizer/SmLTgETHX37mcwm4eziSSFKScCY=/800x200/smart/filters:quality(70)/cloudfront-us-east-1.images.arcpublishing.com/gray/YR47QPTICFAMJKRIZ4PJLULWIY.png" alt="" />
          </div>
          <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  <button type="button" class="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
                    <MailIcon class="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                    <span>Message</span>
                  </button>
                  <button type="button" class="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
                    <PhoneIcon class="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                    <span>Call</span>
                  </button>
                </div>
              </div>
            </div>
            <div class="hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1">
              <h1 class="text-2xl font-bold text-gray-900 truncate">
                {{ teamDetail.name }}
              </h1>
            </div>
          </div>
        </div>

        <!-- Tabs -->
        <div class="max-w-5xl mx-auto px-4 my-3 sm:px-6 lg:px-8">
          <TabGroup>
            <TabList class="border-b border-gray-200 -mb-px flex space-x-8">
              <Tab v-for="tab in tabs" :key="tab.name" v-slot="{ selected }" as="template">
                <button :class="[selected ? 'border-pink-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300', 'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm']">
                  {{ tab.name }}
                </button>
              </Tab>
            </TabList>
            <TabPanels class="my-4">
              <TabPanel>
                <!-- Attributes -->
                <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                  <div v-for="field in descKeys" :key="field" class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500 capitalize">
                      {{ field.split(/(?=[A-Z])/).join(' ') }}
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      {{ teamDetail[field] }}
                    </dd>
                  </div>
                </dl>
              </TabPanel>
              <TabPanel>
                <!-- Team Affiliates -->
                <div class="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div v-for="team in affiliates" :key="team.id" class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pink-500">
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
              </TabPanel>
              <TabPanel>
                <!-- Team Venue -->
                TBD
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
      </article>
    </main>
  </div>
</template>

<script>
import useTeams from '@/composables/useTeams';
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';
import { ChevronLeftIcon, MailIcon, PhoneIcon } from '@heroicons/vue/solid';
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';

MailIcon;

const tabs = [{ name: 'Details' }, { name: 'Affiliates' }, { name: 'Venue' }];
const descKeys = ['name', 'parentOrgName', 'firstYearOfPlay'];

export default {
  components: {
    ChevronLeftIcon,
    MailIcon,
    PhoneIcon,
    TabGroup,
    TabList,
    Tab,
    TabPanels,
    TabPanel
  },
  setup() {
    const route = useRoute();
    const { getTeamById, getTeamsAffiliates, teamDetail } = useTeams();
    const affiliates = ref([]);

    getTeamById({ teamId: route.params.id });

    onMounted(async () => {
      affiliates.value = await getTeamsAffiliates({ teamIds: route.params.id });
    });

    return {
      tabs,
      descKeys,
      affiliates,
      teamDetail
    };
  }
};
</script>
