<template>
  <div class="container mt-5 text-center">
    <h1 class="display-1">404</h1>
    <h2 class="mb-4">Страница не найдена</h2>
    <p class="lead">К сожалению, запрашиваемая вами страница не существует.</p>
    <BButton variant="outline-primary" @click="$router.push('/')">
      Вернуться на главную
    </BButton>
  </div>
</template>

<script setup lang="ts">
  import { BButton } from 'bootstrap-vue-next'
</script>