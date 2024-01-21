<template>
  <div class="radio-slider">
    <ClientOnly v-if="!loading">
      <div class="slider-title">{{ title }}</div>

      <slider
        ref="sliderRef"
        :options="{
          perPage: 5,
          focus: 'center',
          gap: '8px',
          arrowPath: '',
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
    </ClientOnly>

    <div v-if="loading || !mounted" class="slider-skeleton"></div>
  </div>
</template>

<script setup lang="ts">
import { Splide as Slider, SplideSlide as Slide } from "@splidejs/vue-splide";
import "@splidejs/vue-splide/css";

type Item = Country | Place | Channel;

const emit = defineEmits(["update:modelValue"]);

const props = defineProps<{
  items: Item[];
  modelValue: Item;
  title: string;
  loading?: boolean;
}>();

const sliderRef = ref<typeof Slider>();
const mounted = ref(false);

watch(
  () => props.modelValue,
  (value) => {
    setTimeout(() => {
      sliderRef.value?.go(findIndex(value));
    });
  },
  { immediate: true }
);

onMounted(() => {
  mounted.value = true;
});

const findIndex = (item: Item) =>
  props.items.findIndex((i) => i.slug === item?.slug);
</script>
