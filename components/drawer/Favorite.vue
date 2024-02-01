<template>
  <div
    class="flex items-center gap-3 px-3 py-2 cursor-pointer transition-colors text-text-light hover:text-main"
  >
    <img :src="`/flag/${channel.countryId}.svg`" class="w-6" alt="" />
    <div>{{ channel.title }}</div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  channel: FavoriteChannel;
}

defineProps<Props>();
</script>
