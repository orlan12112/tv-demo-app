<template>
  <div id="app">
    <AppNavbar v-if="userStore.isAuthenticated" />
    <router-view />
  </div>
</template>

<script setup lang="ts">
  import AppNavbar from './shared/ui/AppNavbar.vue';
  import { useUserStore } from '@/entities/user/model/userStore';

  const userStore = useUserStore();
  
</script>