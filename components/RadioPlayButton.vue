<template>
  <button class="play-button" :class="{ playing }" @click="handleClick">
    <svg v-if="playing" viewBox="0 0 42 59">
      <rect x="0.68" y="0.5" width="10" height="58" />
      <rect x="31.5" y="0.5" width="10" height="58" />
    </svg>

    <svg v-else viewBox="0 0 55 63">
      <path transform="translate(4)" d="M54 31L0 63L0 0.2L54 31Z" />
    </svg>
  </button>
</template>

<script lang="ts" setup>
defineProps({ playing: Boolean });

const emit = defineEmits(["toggle"]);
const handleClick = () => emit("toggle");
</script>
