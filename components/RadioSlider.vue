<template>
  <ClientOnly>
    <div class="radio-slider" :class="{ loading, border }">
      <div class="slider-title">
        {{ title }}
        <span v-if="items.length > 2">
          {{ findIndex(modelValue) + 1 }} / {{ items.length }}
        </span>
      </div>

      <slider
        ref="sliderRef"
        :options="{
          perPage: 5,
          focus: 'center',
          gap: '8px',
          wheel: true,
          breakpoints: {
            1400: { perPage: 5 },
            1100: { perPage: 3 },
            600: { perPage: 2 },
          },
        }"
      >
        <slide v-for="item in props.items" :key="item.slug">
          <slot :item="item" />
        </slide>
      </slider>

      <div v-if="loading" class="skeleton">
        <div class="skeleton--title" />
        <div class="skeleton--range" />
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { Splide as Slider, SplideSlide as Slide } from "@splidejs/vue-splide";
import "@splidejs/vue-splide/css";

type Item = Country | Place | Channel;

defineEmits(["update:modelValue"]);

const props = defineProps<{
  items: Item[];
  modelValue: Item;
  title: string;
  loading?: boolean;
  border?: boolean;
}>();

const sliderRef = ref<typeof Slider>();

watch(
  () => props.modelValue,
  (value) => {
    setTimeout(() => {
      sliderRef.value?.go(findIndex(value));
    });
  },
  { immediate: true },
);

const findIndex = (item: Item) =>
  props.items.findIndex((i) => i.slug === item?.slug);
</script>
