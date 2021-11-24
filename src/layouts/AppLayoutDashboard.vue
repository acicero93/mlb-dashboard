<template>
  <div class="flex flex-col h-screen">
    <Navbar />
    <div class="flex-grow">
      <router-view :key="$route.fullPath" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-2 xl:my-6"></router-view>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default {
  components: {
    Navbar,
    Footer
  }
}
</script>
