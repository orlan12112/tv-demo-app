<template>
  <BContainer class="mt-4">
    <h2>Профиль пользователя</h2>

    <div v-if="user" class="mt-4">
      <BRow>
        <BCol><strong>Логин:</strong> {{ user.login }}</BCol>
      </BRow>
      <BRow class="mt-2">
        <BCol><strong>Имя:</strong> {{ user.firstName }}</BCol>
      </BRow>
      <BRow class="mt-2">
        <BCol><strong>Фамилия:</strong> {{ user.lastName }}</BCol>
      </BRow>

      <div class="mt-4">
        <BButton variant="danger" @click="showDeleteModal = true">
          Удалить профиль
        </BButton>
      </div>
    </div>

    <div v-else>
      <p>Вы не авторизованы.</p>
      <BButton @click="$router.push('/auth')">Войти</BButton>
    </div>

    <BModal
      v-model="showDeleteModal"
      title="Подтверждение удаления"
      body="Вы уверены, что хотите удалить свой профиль? Это действие нельзя отменить."
      :ok-title="'Да, удалить'"
      :cancel-title="'Отмена'"
      @ok="confirmDelete"
      @cancel="showDeleteModal = false"
    />
  </BContainer>
</template>

<script setup lang="ts">
  import {
    BContainer,
    BRow,
    BCol,
    BButton,
    BModal,
  } from 'bootstrap-vue-next'

  import { ref, computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { useUserStore } from '@/entities/user/model/userStore'

  const userStore = useUserStore()
  const user = computed(() => userStore.currentUser)
  const router = useRouter()
  const showDeleteModal = ref(false)

  const confirmDelete = () => {
    if (user.value) {
      userStore.users = userStore.users.filter(u => u.id !== user.value!.id);
      userStore.saveToStorage();
      router.push('/');
    }
    showDeleteModal.value = false;
  }
</script>