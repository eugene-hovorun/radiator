<template>
  <dl role="presentation">
    <base-accordion-item
      v-for="item in items"
      :key="item.label"
      :item="item"
      @toggle="handleToggle(item)"
    >
      <slot :name="item.slot" />
    </base-accordion-item>
  </dl>
</template>

<script setup lang="ts">
interface Props {
  items: AccordionContent[];
}

const props = defineProps<Props>();

const handleToggle = (item: AccordionContent) => {
  props.items.forEach((i) => {
    if (i.label === item.label) {
      i.active = !i.active;
    } else {
      i.active = false;
    }
  });
};
</script>
