<template>
  <Disclosure as="nav" class="bg-gray-800" v-slot="{ open, close }">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <router-link :to="{ name: 'Home' }">
              <img class="block lg:hidden h-8 w-auto" src="@/assets/mlb-logo.png" alt="MLB" />
              <img class="hidden lg:block h-8 w-auto" src="@/assets/mlb-logo.png" alt="MLB" />
            </router-link>
          </div>
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
              <router-link :class="[isActive(item) ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium']" v-for="item in navigation" :key="item.name" :to="{ name: item.name }">{{ item.text }}</router-link>
            </div>
          </div>
        </div>
        <div class="hidd en sm:ml-6 sm:block">
          <div class="flex items-center">
            <SeasonSwitcher class="w-28" />
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
        <router-link @click="close" :class="[isActive(item) ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block px-3 py-2 rounded-md text-base font-medium']" v-for="item in navigation" :key="item.name" :to="{ name: item.name }">{{ item.text }}</router-link>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script>
import { useRoute } from 'vue-router'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { MenuIcon, XIcon } from '@heroicons/vue/outline'
import SeasonSwitcher from '@/components/SeasonSwitcher'

const navigation = [
  { name: 'TeamsList', text: 'Teams' },
  { name: 'VenuesList', text: 'Venues' }
]

export default {
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    MenuIcon,
    XIcon,
    SeasonSwitcher
  },
  setup() {
    const route = useRoute()

    function isActive(item) {
      return route.name.includes(item.name)
    }
    return {
      navigation,
      isActive
    }
  }
}
</script>
