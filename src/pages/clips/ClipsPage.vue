<template>
  <BContainer fluid class="mt-3">
    <h2 class="text-center mb-4">Клипы</h2>

    <BRow class="mb-4">
      <BCol cols="12" md="6" offset-md="3">
        <BFormGroup label="Поиск по названию:" label-for="search">
          <BFormInput
            id="search"
            v-model="searchQuery"
            placeholder="Введите название клипа..."
            type="text"
          />
        </BFormGroup>
      </BCol>
    </BRow>

    <BRow>
      <BCol
        v-for="clip in filteredClips"
        :key="clip.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        class="mb-4 d-flex"
      >
        <BCard
          :style="{ backgroundImage: `url(${clip.image})` }"
          class="clip-card w-100"
          no-body
        >
          <div class="clip-overlay">
            <h5 class="text-white">{{ clip.title }}</h5>
            <p class="text-white-50 small">{{ clip.description }}</p>
            <BButton
              variant="outline-info"
              size="sm"
              tabindex="0"
              @click="$router.push(`/clips/${clip.id}`)"
            >
              Смотреть
            </BButton>
          </div>
        </BCard>
      </BCol>

      <BCol v-if="filteredClips.length === 0" class="text-center mt-4">
        <p>Клипы не найдены.</p>
      </BCol>
    </BRow>
  </BContainer>
</template>

<script setup lang="ts">
  import { ref, computed, watch } from 'vue'
  import { BContainer, BRow, BCol, BCard, BButton, BFormGroup, BFormInput } from 'bootstrap-vue-next'
  import { clipsData } from '@/entities/clip/lib/clipsData'
  import debounce from 'lodash.debounce';

  const searchQuery = ref('');
  const debouncedQuery = ref('');

  const updateDebouncedQuery = debounce((query: string) => {
    debouncedQuery.value = query
  }, 300);

  watch(searchQuery, (newQuery) => {
    updateDebouncedQuery(newQuery)
  });

  const filteredClips = computed(() => {
    if (!debouncedQuery.value.trim()) {
      return clipsData;
    };

    const term = debouncedQuery.value.toLowerCase().trim();
    return clipsData.filter(clip =>
      clip.title.toLowerCase().includes(term)
    );
  });
</script>

<style scoped lang="css">
  .clip-card {
    height: 280px;
    background-size: cover;
    background-position: center;
    border-radius: 12px;
    overflow: hidden;
    position: relative;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .clip-card:focus-within,
  .clip-card:hover {
    transform: scale(1.03);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
    outline: 2px solid #0d6efd;
  }

  .clip-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
    padding: 16px;
    color: white;
  }

  .clip-overlay h5 {
    margin: 0 0 6px;
    font-weight: 600;
  }

  .clip-overlay p {
    margin: 0 0 12px;
    font-size: 0.85rem;
  }
</style>