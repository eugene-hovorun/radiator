<template>
  <div class="p-2 bg-bg text-xs text-center rounded-md">{{ title }}</div>
  <li
    v-for="result in items"
    :key="result.id"
    class="result-section list-none p-2 text-sm cursor-pointer transition-colors text-text-light hover:text-main"
    tabindex="0"
    @keydown.enter="$emit('select', result)"
    @click="$emit('select', result)"
    v-html="result.label"
  ></li>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  items: (Country | Place | Channel)[];
}

defineProps<Props>();
defineEmits(["select"]);
</script>
