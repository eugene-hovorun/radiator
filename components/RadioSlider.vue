<template>
  <ClientOnly>
    <div class="radio-slider" @wheel.passive="onWheel">
      <radio-alphabet
        :items="items"
        @select="(letter) => $emit('go-to-letter', letter)"
      >
        <div class="slider-title">
          <span>{{ title }}</span>
          <span v-if="items.length > 2">
            {{ findIndex(modelValue) + 1 }} / {{ items.length }}
          </span>
        </div>
      </radio-alphabet>

      <transition name="skeleton" mode="out-in">
        <swiper v-if="!loading" v-bind="sliderOptions" @swiper="setSliderRef">
          <swiper-slide
            v-for="(item, index) in props.items"
            :key="index"
            :virtual-index="index"
          >
            <slot :item="item" />
          </swiper-slide>
        </swiper>
      </transition>

      <base-icon-button
        v-if="sliderRef?.allowSlidePrev"
        class="slider-button--prev"
        name="arrow-left"
        transparent
        @click="() => sliderRef?.slidePrev()"
      />
      <base-icon-button
        v-if="sliderRef?.allowSlideNext"
        class="slider-button--next"
        name="arrow-right"
        transparent
        @click="() => sliderRef?.slideNext()"
      />

      <transition name="skeleton" mode="out-in">
        <div v-if="showSkeleton" class="skeleton">
          <div v-for="index in 5" :key="index" class="skeleton--item" />
        </div>
      </transition>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/virtual";
import { Virtual } from "swiper/modules";

type Item = Country | Place | Channel;

defineEmits(["update:modelValue", "go-to-letter"]);

const props = defineProps<{
  items: Item[];
  modelValue: Item;
  title: string;
  loading?: boolean;
}>();

const sliderRef = ref();
const showSkeleton = ref(false);
let skeletonTimeout: ReturnType<typeof setTimeout> | null = null;

watch(
  () => props.modelValue,
  () => slideToValue(250),
);

watch(
  () => props.loading,
  (loading) => {
    if (loading) {
      skeletonTimeout = setTimeout(() => {
        showSkeleton.value = true;
      }, 500);
    } else {
      if (skeletonTimeout) {
        clearTimeout(skeletonTimeout);
        skeletonTimeout = null;
      }
      showSkeleton.value = false;
    }
  },
  { immediate: true },
);

const onWheel = (e: WheelEvent) =>
  e.deltaY > 0 ? sliderRef.value?.slideNext() : sliderRef.value?.slidePrev();

const setSliderRef = (swiper: any) => {
  sliderRef.value = swiper;
  slideToValue(0);
};

const findIndex = (item: Item) =>
  props.items.findIndex((i) => i.slug === item?.slug);

const slideToValue = (speed?: number) =>
  sliderRef.value?.slideTo(findIndex(props.modelValue), speed);

const sliderOptions = {
  modules: [Virtual],
  centeredSlides: true,
  spaceBetween: 8,
  slidesPerView: 2,
  virtual: true,
  breakpoints: {
    1100: { slidesPerView: 5 },
    600: { slidesPerView: 3 },
  },
};
</script>

<style lang="scss">
.radio-slider {
  position: relative;
  min-height: 78px;
  max-width: calc(100% - 24px);
  margin: 0 auto 12px;
}

.swiper-horizontal {
  max-width: calc(100% - 64px);
  margin: 0 auto;
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
}

.slider-title {
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  font-size: 10px;
  margin: 0 12px;
  text-align: center;
  color: var(--color-main);
}

.slide-title {
  line-height: 1.2;
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
  left: 32px;
  right: 32px;
  overflow: hidden;

  &--item {
    flex-grow: 1;
    flex-shrink: 0;
    height: 100%;
    border-radius: 24px;
    background: var(--color-main);
    animation: pulse 4s infinite;
  }
}

.skeleton :nth-child(1),
.skeleton :nth-child(5) {
  animation-delay: -2.66s;
}

.skeleton :nth-child(2),
.skeleton :nth-child(4) {
  animation-delay: -1.33s;
}

.skeleton :nth-child(3) {
  animation-delay: 0s;
}

@media (max-width: 1100px) {
  .skeleton :nth-child(1),
  .skeleton :nth-child(2) {
    display: none;
  }

  .skeleton :nth-child(3),
  .skeleton :nth-child(5) {
    animation-delay: -1s;
  }

  .skeleton :nth-child(4) {
    animation-delay: 0s;
  }
}

@media (max-width: 600px) {
  .skeleton > * {
    width: calc(50% - 4px);
    transform: translateX(calc(-50% - 4px));
  }
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

.slider-button {
  &--prev,
  &--next {
    position: absolute;
    bottom: 2px;
    background: var(--color-bg-main);
    z-index: 1;
  }

  &--prev {
    left: 0;
  }

  &--next {
    right: 0;
  }

  &--prev::before,
  &--next::before {
    position: absolute;
    top: -2px;
    width: 4vw;
    height: calc(100% + 4px);
    pointer-events: none;
  }

  @media (max-width: 600px) {
    &--prev::before,
    &--next::before {
      content: "";
    }

    &--prev::before {
      left: 100%;
      background: linear-gradient(to right, var(--color-bg), transparent);
    }

    &--next::before {
      right: 100%;
      background: linear-gradient(to left, var(--color-bg), transparent);
    }
  }
}
</style>
