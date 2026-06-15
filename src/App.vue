<template>
  <div id="app" class="mainApp">
    <AppNavbar v-if="userStore.isAuthenticated" />
    <router-view />
  </div>
  <AppFooter v-if="userStore.isAuthenticated"/>
</template>

<script setup lang="ts">
  import AppFooter from './shared/ui/AppFooter.vue';
import AppNavbar from './shared/ui/AppNavbar.vue';
  import { useUserStore } from '@/entities/user/model/userStore';

  const userStore = useUserStore();
  
</script>

<style scoped>
.mainApp {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 44px);
}
</style>