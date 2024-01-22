<template>
  <div v-if="mounted" class="alphabet">
    <template
      v-for="letter in ['a', 'c', 'e', 'g', 'i', 'k', 'm', 'p', 's', 'u']"
      :key="letter"
    >
      <button class="alphabet__letter" @click="handleLetterClick(letter)">
        {{ letter }}
      </button>
      <span v-if="letter !== 'u'" class="alphabet__separator">.</span>
    </template>
  </div>
  <div v-else style="height: 25px"></div>
</template>

<script lang="ts" setup>
const mounted = ref(false);

const emit = defineEmits(["select"]);

const handleLetterClick = (letter: string) => {
  emit("select", letter);
};

onMounted(() => {
  mounted.value = true;
});
</script>
