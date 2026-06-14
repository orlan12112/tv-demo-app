<template>
  <BContainer fluid class="mt-3">
    <BButton @click="$router.back()" variant="outline-secondary" size="sm">
      Назад к клипам
    </BButton>

    <div v-if="clip" class="mt-3 text-center">
      <h2>{{ clip.title }}</h2>
      <p class="text-muted">{{ clip.description }}</p>

      <div class="mt-4" style="max-width: 800px; margin: 0 auto">
        <video
          :src="clip.video"
          controls
          style="width: 100%; border-radius: 8px"
        >
          Ваш браузер не поддерживает видео.
        </video>
      </div>
    </div>

    <div v-else class="text-center mt-5">
      <p>Клип не найден</p>
      <BButton @click="$router.push('/clips')">К списку клипов</BButton>
    </div>
  </BContainer>
</template>

<script setup lang="ts">
  import { BContainer, BButton } from 'bootstrap-vue-next'
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { clipsData } from '@/entities/clip/lib/clipsData'

  const route = useRoute()
  const clipId = route.params.id as string

  const clip = computed(() => {
    return clipsData.find(c => c.id === clipId)
  })
</script>