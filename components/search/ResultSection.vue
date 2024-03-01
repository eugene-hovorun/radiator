<template>
  <div class="result-title">
    {{ title }}
  </div>
  <li
    v-for="result in items"
    :key="result.id"
    class="result-section"
    tabindex="0"
    @keydown.enter="$emit('select', result)"
    @click="$emit('select', result)"
    v-html="'label' in result ? result.label : result.title"
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

<style scoped lang="scss">
.result-title {
  padding: 8px;
  font-size: 12px;
  background-color: var(--color-bg);
  color: var(--color-main);
  text-align: center;
}

.result-section {
  list-style: none;
  padding: 8px;
  font-size: 14px;
  color: var(--color-light);
  cursor: pointer;
  transition: color 0.25s;

  &:hover {
    color: var(--color-main);
  }

  & + & {
    border-top: 1px solid var(--color-bg);
  }
}
</style>
