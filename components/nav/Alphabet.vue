<template>
  <div class="alphabet" :class="{ chip: !showLetters }">
    <template v-if="showLetters">
      <template v-for="(letter, index) in lettersMatrix[0]" :key="letter">
        <button class="alphabet__letter" @click="handleLetterClick(letter)">
          {{ letter }}
        </button>
        <span
          v-if="index !== lettersMatrix[0].length - 1"
          class="alphabet__dot"
        ></span>
      </template>
    </template>
    <slot />

    <template v-if="showLetters">
      <template v-for="(letter, index) in lettersMatrix[1]" :key="letter">
        <button class="alphabet__letter" @click="handleLetterClick(letter)">
          {{ letter }}
        </button>
        <span
          v-if="index !== lettersMatrix[1].length - 1"
          class="alphabet__dot"
        ></span>
      </template>
    </template>
  </div>
</template>

<script lang="ts" setup>
type Item = Country | Place | Channel;

const props = defineProps({
  items: {
    type: Array as PropType<Item[]>,
    default: () => [],
  },
});

const lettersMatrix = ref<[string[], string[]]>([[], []]);
const emit = defineEmits(["select"]);

const showLetters = computed(() => props.items.length > 10);

const updateFirstLetters = () => {
  const isCountry = () => props.items.some((item) => "colors" in item);

  if (isCountry()) {
    lettersMatrix.value = [
      ["a", "c", "e", "g", "i"],
      ["k", "m", "p", "s", "u"],
    ];
    return;
  }

  let firstLetters = [];
  const letters = props.items.map((item) =>
    item.title ? item.title.charAt(0).toUpperCase() : "",
  );

  const interval = Math.ceil(letters.length / 10);

  for (let i = 0; i < letters.length; i += interval) {
    firstLetters.push(letters[i]);
  }

  firstLetters = [...new Set(firstLetters)];

  if (firstLetters.length % 2 !== 0) {
    firstLetters.splice(firstLetters.length - 1, 1);
  }

  const middle = Math.ceil(firstLetters.length / 2);

  lettersMatrix.value = [
    firstLetters.slice(0, middle),
    firstLetters.slice(middle, firstLetters.length),
  ];
};

watch(
  [() => props.items],
  () => {
    if (showLetters.value) {
      updateFirstLetters();
    }
  },
  { immediate: true },
);

const handleLetterClick = (letter: string) =>
  emit("select", letter.toLowerCase());
</script>

<style lang="scss" scoped>
.alphabet {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 32px;
  margin: 0 auto 12px;
  padding: 4px;
  border-radius: 16px;
  background: color-mix(in srgb, var(--color-border) 80%, transparent);
  backdrop-filter: blur(8px);
  transition: background 0.25s;

  &.chip {
    width: calc(20% - 16px);

    @media (max-width: 1100px) {
      width: calc(33% - 16px);
    }

    @media (max-width: 600px) {
      width: calc(50% - 32px);
    }
  }

  &__letter {
    font-size: 12px;
    text-transform: capitalize;
    flex-grow: 1;
    color: var(--color-main);

    &:hover {
      text-decoration: underline;
    }
  }

  &__dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--color-dark);
  }
}
</style>
