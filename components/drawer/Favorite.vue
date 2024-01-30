<template>
  <div class="favorite">
    <img :src="`/flag/${channel.countryId}.svg`" class="favorite-flag" alt="" />
    <div>{{ channel.title }}</div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  channel: FavoriteChannel;
}

defineProps<Props>();
</script>

<style scoped>
.favorite {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  background: transparent;
  color: var(--color-text-light);
  cursor: pointer;
  transition: color 0.3s;
}

.favorite:hover {
  color: var(--color-primary);
}

.favorite-flag {
  width: 24px;
  aspect-ratio: 3/4;
}
</style>
