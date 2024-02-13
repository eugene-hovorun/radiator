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
  id: string;
}

const props = defineProps<Props>();

const handleToggle = (item: AccordionContent) => {
  props.items.forEach((i) => {
    if (i.label === item.label) {
      i.active = !i.active;

      if (i.active) {
        localStorage.setItem(`${props.id}-accordion`, i.label);
      }
    } else {
      i.active = false;
    }
  });
};

onMounted(() => {
  const activeItem = localStorage.getItem(`${props.id}-accordion`);

  if (activeItem) {
    props.items.forEach((i) => {
      i.active = i.label === activeItem;
    });
  }
});
</script>
