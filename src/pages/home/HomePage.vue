<template>
  <div class="container mt-5 homePage">
    <div class="hp">
      <div class="hp_layout">
        <img src="/logo.svg" alt="logo">
      </div>
      <div class="hp_layout r">
        <h1 class="display-2">TV App</h1>
        <p class="lead">Демонстрационное приложение</p>
        <div class="btn_wrapper">
          <BButton variant="primary" @click="$router.push('/auth')">Войти</BButton>
          <BButton variant="outline-primary" @click="$router.push('/register')">Регистрация</BButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BButton } from "bootstrap-vue-next"

</script>

<style scoped lang="css">
  .homePage {
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .hp {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    gap: 150px;
  }

  .r {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  img {
    max-width: 400px;
  }

  .btn_wrapper {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
</style>