<template>
  <ClientOnly>
    <div class="radio-slider">
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

      <transition name="skeleton" mode="out-in">
        <div v-if="showSkeleton" class="skeleton">
          <div v-for="index in 5" :key="index" class="skeleton--item bg-main" />
        </div>
      </transition>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/virtual";
import { Virtual, Mousewheel } from "swiper/modules";

type Item = Country | Place | Channel;

defineEmits(["update:modelValue", "go-to-letter"]);

const props = defineProps<{
  items: Item[];
  modelValue: Item;
  title: string;
  loading?: boolean;
  alphabet?: boolean;
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

const setSliderRef = (swiper: any) => {
  sliderRef.value = swiper;
  slideToValue(0);
};

const findIndex = (item: Item) =>
  props.items.findIndex((i) => i.slug === item?.slug);

const slideToValue = (speed?: number) =>
  sliderRef.value?.slideTo(findIndex(props.modelValue), speed);

const sliderOptions = {
  modules: [Virtual, Mousewheel],
  centeredSlides: true,
  spaceBetween: 8,
  slidesPerView: 2,
  mousewheel: true,
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
  left: 0;
  right: 0;
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
</style>
