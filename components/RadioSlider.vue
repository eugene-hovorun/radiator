<template>
  <ClientOnly>
    <div class="radio-slider" :class="{ loading }">
      <radio-alphabet
        :items="items"
        :enabled="alphabet"
        @select="(letter) => $emit('go-to-letter', letter)"
      >
        <div class="slider-title">
          <span>{{ title }}</span>
          <span v-if="items.length > 2">
            {{ findIndex(modelValue) + 1 }} / {{ items.length }}
          </span>
        </div>
      </radio-alphabet>

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
      <transition name="skeleton" mode="out-in">
        <div v-if="loading" class="skeleton">
          <div v-for="index in 5" :key="index" class="skeleton--item" />
        </div>
      </transition>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { Splide as Slider, SplideSlide as Slide } from "@splidejs/vue-splide";
import "@splidejs/vue-splide/css";

type Item = Country | Place | Channel;

defineEmits(["update:modelValue", "go-to-letter"]);

const props = defineProps<{
  items: Item[];
  modelValue: Item;
  title: string;
  loading?: boolean;
  alphabet?: boolean;
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
