<template>
  <div ref="textfield" class="textfield">
    <input
      :value="modelValue"
      :placeholder="placeholder"
      autocomplete="off"
      type="text"
      class="textfield__input"
      @input="handleInput"
    />

    <transition name="play" mode="out-in">
      <base-icon-button
        v-if="loading"
        class="textfield__loading"
        name="loading"
        :transparent="true"
        :size="24"
      />
    </transition>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: "",
  },
  autofocus: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "input"]);
const textfield = ref<HTMLDivElement | null>(null);

const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  console.log(props.modelValue);
  console.log(target.value);
  emit("update:modelValue", target.value);
  emit("input");
};

onMounted(() => {
  if (props.autofocus && textfield.value) {
    textfield.value.querySelector("input")?.focus();
  }
});
</script>

<style lang="scss" scoped>
.textfield {
  position: relative;

  &__input {
    width: 100%;
    outline: none;
    border: 0;
    border-radius: 6px;
    padding: 8px 12px;
    line-height: 1.4;
    font-size: 16px;
    color: var(--color-text-light);
    box-shadow: 0 0 2px 0 var(--color-border);
    background-color: var(--color-bg);

    &::placeholder {
      color: var(--color-text-light);
      opacity: 0.618;
    }

    &:focus {
      box-shadow: 0 0 2px 0 var(--color-main);
    }
  }

  &__loading {
    position: absolute;
    width: 24px;
    right: 6px;
    top: 6px;
  }
}
</style>
