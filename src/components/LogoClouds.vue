<template>
  <div class="bg-white">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <p class="text-center text-base font-semibold uppercase text-gray-600 tracking-wider">Powered By</p>
      <div class="mt-6 grid grid-cols-2 gap-0.5 md:grid-cols-3 lg:mt-8">
        <div v-for="logo in logos" :key="logo.alt" class="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
          <img class="max-h-14" :src="logo.src" :alt="logo.alt" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const logos = [
  {
    alt: 'MLB',
    src: require(`@/assets/mlb-logo.png`)
  },
  {
    alt: 'Vue 3',
    src: require(`@/assets/vue.png`)
  },
  {
    alt: 'Netlify',
    src: require(`@/assets/netlify.png`)
  },
  {
    alt: 'tailwindcss',
    src: require(`@/assets/tailwindcss.png`)
  },
  {
    alt: 'heroicons',
    src: require(`@/assets/heroicons.png`)
  },
  {
    alt: 'wikipedia',
    src: require(`@/assets/wikipedia.png`)
  }
]

export default {
  setup() {
    return {
      logos
    }
  }
}
</script>
