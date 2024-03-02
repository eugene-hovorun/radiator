<template>
  <div ref="textfield" class="textfield">
    <span class="textfield__prepend">
      <slot name="prepend" />
    </span>

    <input
      :value="modelValue"
      :placeholder="placeholder"
      autocomplete="off"
      spellcheck="false"
      type="text"
      class="textfield__input"
      @input="handleInput"
      @focus="() => emit('focus')"
      @blur="() => emit('blur')"
    />

    <span class="textfield__append">
      <transition name="play" mode="out-in">
        <base-icon v-if="loading" color="light" name="loading" />

        <slot v-else name="append" />
      </transition>
    </span>
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

const emit = defineEmits(["update:modelValue", "input", "focus", "blur"]);
const textfield = ref<HTMLDivElement | null>(null);

const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement;

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
  flex-grow: 1;

  &__input {
    width: 100%;
    height: 45px;
    outline: none;
    border: 0;
    border-radius: 16px;
    padding: 8px 12px 8px 40px;
    line-height: 1.4;
    font-size: 16px;
    color: var(--color-light);
    background: color-mix(in srgb, var(--color-border) 80%, transparent);
    backdrop-filter: blur(8px);

    &::placeholder {
      color: var(--color-light);
      opacity: 0.618;
    }

    &:focus {
      box-shadow: 0 0 2px 0 var(--color-main);
    }
  }

  &__prepend {
    position: absolute;
    left: 6px;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    opacity: 0.618;
    z-index: 1;
  }

  &__append {
    position: absolute;
    right: 6px;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    opacity: 0.618;
    z-index: 1;
  }
}
</style>
