<template>
  <div
    class="flex justify-around items-center max-w-[calc(100%-24px)] h-8 mb-3 mx-auto p-1 rounded-full backdrop-blur bg-border/90"
  >
    <template v-if="showLetters">
      <template v-for="(letter, index) in lettersMatrix[0]" :key="letter">
        <button
          class="text-main hover:underline capitalize text-xs flex-grow"
          @click="handleLetterClick(letter)"
        >
          {{ letter }}
        </button>
        <span
          v-if="index !== lettersMatrix[0].length - 1"
          class="rounded border-2 border-text-dark"
        ></span>
      </template>
    </template>
    <slot />

    <template v-if="showLetters">
      <template v-for="(letter, index) in lettersMatrix[1]" :key="letter">
        <button
          class="text-main hover:underline capitalize text-xs flex-grow"
          @click="handleLetterClick(letter)"
        >
          {{ letter }}
        </button>
        <span
          v-if="index !== lettersMatrix[1].length - 1"
          class="rounded border-2 border-text-dark"
        ></span>
      </template>
    </template>
  </div>
</template>

<script lang="ts" setup>
type Item = Country | Place | Channel;

const props = defineProps({
  enabled: Boolean,
  items: {
    type: Array as PropType<Item[]>,
    default: () => [],
  },
});

const lettersMatrix = ref<[string[], string[]]>([[], []]);
const emit = defineEmits(["select"]);

const showLetters = computed(() => props.enabled && props.items.length > 10);

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
  [() => props.items, () => props.enabled],
  () => {
    if (props.enabled) {
      updateFirstLetters();
    }
  },
  { immediate: true },
);

const handleLetterClick = (letter: string) =>
  emit("select", letter.toLowerCase());
</script>
