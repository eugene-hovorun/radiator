<template>
  <div class="favorite">
    <img :src="`/flag/${channel.countryId}.svg`" alt="" />
    <div>{{ channel.title }}</div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  channel: FavoriteChannel;
}

defineProps<Props>();
</script>

<style scoped lang="scss">
.favorite {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  color: var(--color-light);
  transition: color 0.25s;
  cursor: pointer;

  &:hover {
    color: var(--color-main);
  }

  img {
    width: 24px;
  }
}
</style>
