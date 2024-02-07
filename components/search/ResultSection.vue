<template>
  <div class="p-2 bg-bg text-xs text-center rounded-md">{{ title }}</div>
  <div
    v-for="result in items"
    :key="result.id"
    class="result-section p-2 text-sm cursor-pointer transition-colors text-text-light hover:text-main"
    @click="$emit('select', result)"
    v-html="result.label"
  ></div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  items: (Country | Place | Channel)[];
}

defineProps<Props>();
defineEmits(["select"]);
</script>
