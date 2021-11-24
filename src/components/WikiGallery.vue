<template>
  <div class="pb-3 mb-3 border-b border-gray-200">
    <h3 class="text-lg leading-6 font-medium text-gray-900">Gallery</h3>
  </div>
  <ul role="list" class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
    <li v-for="file in filteredImages" :key="file.title" class="relative transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
      <div class="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
        <img :src="file.srcset[0].src" alt="" class="object-contain pointer-events-none group-hover:opacity-75" />
        <a :href="`https://en.wikipedia.org/wiki/${file.title}`" target="_imgdetail" type="button" class="absolute inset-0 focus:outline-none">
          <span class="sr-only">View details for {{ file.title }}</span>
        </a>
      </div>
    </li>
  </ul>
</template>

<script>
import { computed } from 'vue'
export default {
  props: {
    images: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const filteredImages = computed(() => {
      return props.images.filter((img) => img.srcset && img.srcset.length)
    })

    return {
      filteredImages
    }
  }
}
</script>
