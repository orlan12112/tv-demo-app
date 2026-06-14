<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#" @click.prevent="$router.push('/ClipsPage')">
        <img
          src="/logo.svg"
          alt="Логотип"
          height="30"
          class="d-inline-block align-text-top"
        />
        <span class="ms-2">TV App</span>
      </a>

      <div class="navbar-nav">
        <BLink
          :to="{ name: 'ClipsPage' }"
          class="nav-link"
          :class="{ active: route.name === 'ClipsPage' }"
        >
          Клипы
        </BLink>
        <BLink
          :to="{ name: 'Profile' }"
          class="nav-link"
          :class="{ active: route.name === 'Profile' }"
        >
          Профиль
        </BLink>
      </div>

       <div class="d-flex">
        <BButton variant="outline-light" size="sm" @click="handleLogout">
          Выйти
        </BButton>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
  import { BLink, BButton } from 'bootstrap-vue-next';
  import { useRoute, useRouter } from 'vue-router';
  import { useUserStore } from '@/entities/user/model/userStore';

  const route = useRoute();
  const router = useRouter();
  const userStore = useUserStore();

  const handleLogout = () => {
    userStore.logout()
    router.push('/')
  };
</script>

<style scoped>
  .navbar {
    margin-bottom: 1rem;
  }

  .nav-link.active {
    font-weight: bold;
    color: #fff !important;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }

  .navbar .btn-outline-light {
    border-color: rgba(255, 255, 255, 0.5);
  }
</style>