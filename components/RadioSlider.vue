<template>
  <ClientOnly>
    <div class="radio-slider mb-3" :class="{ loading, fade: items.length > 3 }">
      <radio-alphabet
        :items="items"
        :enabled="alphabet"
        @select="(letter) => $emit('go-to-letter', letter)"
      >
        <div class="slider-title text-main">
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
        <div v-if="loading && showSkeleton" class="skeleton">
          <div v-for="index in 5" :key="index" class="skeleton--item bg-main" />
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
const showSkeleton = ref(false);

watch(
  () => props.modelValue,
  (value) => {
    setTimeout(() => {
      sliderRef.value?.go(findIndex(value));
    });
  },
  { immediate: true },
);

onMounted(() => {
  setTimeout(() => {
    showSkeleton.value = true;
  }, 500);
});

const findIndex = (item: Item) =>
  props.items.findIndex((i) => i.slug === item?.slug);
</script>

<style>
.radio-slider {
  position: relative;
  min-height: 78px;
  box-sizing: border-box;
}

.splide {
  max-width: calc(100% - 80px);
  margin: auto;
}

.radio-slider.loading .splide__track,
.radio-slider.loading .slider-title {
  opacity: 0;
}

.splide__pagination {
  display: none;
}

.splide__arrow:disabled {
  display: none;
}

.splide__arrow {
  background: transparent;
}

.splide__arrow svg {
  fill: var(--color-text-dark);
}

.splide__arrow--prev {
  left: -32px;
}

.splide__arrow--next {
  right: -32px;
}

.slide {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 34px;
  text-align: center;
  font-size: 12px;
  border-radius: 24px;
  cursor: pointer;
  overflow: hidden;
  box-sizing: border-box;
}

.slider-title {
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  font-size: 10px;
  margin: 0 12px;
  text-align: center;
}

.slide-title {
  line-height: 1;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}

.skeleton {
  position: absolute;
  display: flex;
  gap: 8px;
  height: 34px;
  z-index: 1;
  bottom: 0;
  left: 40px;
  right: 40px;
  overflow: hidden;
}

@media (max-width: 1100px) {
  .skeleton :nth-child(1),
  .skeleton :nth-child(2) {
    display: none;
  }
}

@media (max-width: 600px) {
  .skeleton > * {
    width: calc(50% - 4px);
    transform: translateX(calc(-50% - 4px));
  }
}

.skeleton--item {
  flex-grow: 1;
  flex-shrink: 0;
  height: 100%;
  border-radius: 24px;
  animation: pulse 4s infinite;
}

@keyframes pulse {
  0% {
    opacity: 0.1;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.1;
  }
}

.skeleton-enter-active,
.skeleton-leave-active {
  transition: 0.2s;
}

.skeleton-enter,
.skeleton-leave-to {
  opacity: 0;
}

.fade .splide__track::before,
.fade .splide__track::after {
  content: "";
  position: absolute;
  top: 0;
  width: 10vw;
  height: 100%;
  pointer-events: none;
}

.splide__track::before {
  left: 0;
  background: linear-gradient(to right, var(--color-bg) 0%, transparent 100%);
  z-index: 1;
}

.splide__track::after {
  right: 0;
  background: linear-gradient(to left, var(--color-bg) 0%, transparent 100%);
  z-index: 1;
}
</style>
