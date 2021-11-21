<template>
  <div class="font-sans">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    <AppLayout>
      <router-view />
    </AppLayout>
  </div>
</template>
