<template>
  <div :class="{ 'is-active': item.active }">
    <dt class="accordion-item-header">
      <button class="accordion-item-button" @click="$emit('toggle')">
        <base-icon-button :name="item.icon" transparent />
        <div class="accordion-item-title">{{ item.label }}</div>
        <span class="accordion-item-icon"></span>
      </button>
    </dt>

    <dd v-if="item.active">
      <slot />
    </dd>
  </div>
</template>

<script setup lang="ts">
interface Props {
  item: AccordionContent;
}

defineProps<Props>();
defineEmits(["toggle"]);
</script>

<style lang="scss" scoped>
dt,
dd {
  margin: 0;
}
.accordion-item-header {
  position: relative;
  padding: 8px 12px;

  .accordion-item-title {
    color: var(--color-text-light);
    font-size: 1.25rem;
    margin-bottom: 0;
    font-weight: bold;
  }
}

.accordion-item-button {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  text-align: left;
  background-color: transparent;
  border: none;
}

.accordion-item-icon {
  $size: 8px;
  display: block;
  position: absolute;
  top: 0;
  right: 20px;
  bottom: 0;
  margin: auto;
  width: 8px;
  height: 8px;
  border-right: 2px solid var(--color-main);
  border-bottom: 2px solid var(--color-main);
  transform: translateY(-2px) rotate(45deg);

  .is-active & {
    transform: translateY(2px) rotate(225deg);
  }
}
</style>
