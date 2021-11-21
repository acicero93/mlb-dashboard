<template>
  <component :is="layoutName">
    <slot />
  </component>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import AppLayoutDefault from "@/layouts/AppLayoutDefault.vue";
import AppLayoutDashboard from "@/layouts/AppLayoutDashboard.vue";

export default {
  name: "AppLayout",
  components: {
    AppLayoutDefault,
    AppLayoutDashboard,
  },
  setup() {
    const route = useRoute();
    const layoutName = computed(() => {
      return route.meta.layout || "AppLayoutDefault";
    });

    return { layoutName };
  },
};
</script>
