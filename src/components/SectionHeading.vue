<template>
  <div class="relative my-6">
    <div aria-hidden="true" class="absolute inset-0 flex items-center"><div class="w-full border-t border-secondary"></div></div>
    <div class="relative flex justify-center">
      <span class="px-3 bg-white text-xl font-bold text-primary-800 capitalize">{{ title }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>
