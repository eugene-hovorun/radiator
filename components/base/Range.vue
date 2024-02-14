<template>
  <input
    type="range"
    :min="min"
    :max="max"
    :step="step"
    :value="modelValue"
    :style="{ backgroundSize }"
    :aria-label="label"
    @input="handleInput"
  />
</template>

<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  step: {
    type: Number,
    default: 1,
  },
  label: {
    type: String,
    default: "range",
  },
});

const emit = defineEmits(["update:modelValue"]);
const backgroundSize = ref("0% 100%");

watch(
  () => props.modelValue,
  (value) => {
    const { min, max } = props;
    backgroundSize.value = ((value - min) * 100) / (max - min) + "% 100%";
  },
  { immediate: true },
);

const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement;

  emit("update:modelValue", parseFloat(target.value));
};
</script>

<style lang="scss" scoped>
input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  display: block;
  width: 100%;
  height: 6px;
  border-radius: 4px;
  background: var(--color-bg);
  background-image: linear-gradient(
    to right,
    var(--color-main) 0%,
    var(--color-main) 100%
  );
  background-repeat: no-repeat;

  &:focus {
    outline: none;

    &::-webkit-slider-runnable-track {
      background: transparent;
    }
  }

  &::-moz-range-thumb,
  &::-webkit-slider-thumb {
    box-shadow: none;
    border: 2px solid var(--color-main);
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: var(--color-main);
    cursor: pointer;
  }

  &::-webkit-slider-thumb {
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: var(--color-main);
    -webkit-appearance: none;
    transform: translateY(-5px);
  }

  &::-webkit-slider-runnable-track,
  &::-moz-range-track {
    width: 100%;
    cursor: pointer;
    box-shadow: none;
    background: transparent;
    border-radius: 0px;
    border: none;
  }

  &::-webkit-slider-runnable-track {
    height: 6px;
  }

  &::-moz-range-track {
    height: 4px;
  }
}
</style>
