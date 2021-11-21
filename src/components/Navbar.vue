<template>
  <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <router-link
              :to="{
                name: 'Home'
              }"
            >
              <img class="block lg:hidden h-8 w-auto" src="@/assets/mlb-logo.png" alt="Workflow" />
              <img class="hidden lg:block h-8 w-auto" src="@/assets/mlb-logo.png" alt="Workflow" />
            </router-link>
          </div>
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
              <router-link :class="[isActive(item) ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium']" v-for="item in navigation" :key="item.name" :to="{ name: item.name }">{{ item.text }}</router-link>
            </div>
          </div>
        </div>
        <div class="hidden sm:ml-6 sm:block">
          <div class="flex items-center">
            <button type="button" class="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <span class="sr-only">View notifications</span>
              <BellIcon class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div class="-mr-2 flex sm:hidden">
          <!-- Mobile menu button -->
          <DisclosureButton class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <span class="sr-only">Open main menu</span>
            <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <router-link :class="[isActive(item) ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block px-3 py-2 rounded-md text-base font-medium']" v-for="item in navigation" :key="item.name" :to="{ name: item.name }">{{ item.text }}</router-link>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/vue/outline';
import { useRoute } from 'vue-router';

const navigation = [
  { name: 'Home', text: 'Home' },
  { name: 'TeamsList', text: 'Teams' },
  { name: 'VenuesList', text: 'Venues' }
];

export default {
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    BellIcon,
    MenuIcon,
    XIcon
  },
  setup() {
    const route = useRoute();

    function isActive(item) {
      return route.name.includes(item.name);
    }
    return {
      navigation,
      isActive
    };
  }
};
</script>
