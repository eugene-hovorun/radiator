<template>
  <div
    class="slide"
    :class="{ active, failed, channel: isChannel }"
    @click="handleSelect"
  >
    <play-button
      v-if="isChannel"
      :playing="playing"
      :loading="loading"
      :failed="failed"
    />
    <div class="slide__title">
      {{ failed ? "Unavailable" : item.title }}
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  item: Channel | Place | Country;
  type?: "channel" | "place";
  active: boolean;
  playing?: boolean;
  failed?: boolean;
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: "place",
  active: false,
  playing: false,
  failed: false,
  loading: false,
});

const isChannel = computed(() => "stream" in props.item);
const emit = defineEmits(["select"]);
const handleSelect = () => emit("select", props.item);
</script>

<style lang="scss" scoped>
.slide {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 34px;
  text-align: center;
  font-size: 12px;
  border-radius: 24px;
  padding-left: 16px;
  padding-right: 16px;
  color: var(--color-light);
  transition:
    background 0.25s,
    color 0.25s;
  backdrop-filter: blur(8px);
  cursor: pointer;
  overflow: hidden;

  &.channel {
    padding-left: 0;
    padding-right: 16px;
    gap: 8px;
    justify-content: space-between;
    border: 2px solid var(--color-main);
    color: var(--color-light);

    &.failed {
      opacity: 0.3;
    }
  }

  &.active {
    background: var(--color-main);
    color: var(--color-dark);
    font-weight: bold;
  }

  &__title {
    line-height: 1.2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
