<template>
  <div class="bar">
    <div class="bar-container">
      <template v-if="activeChannel">
        <radio-channel-button
          :playing="countriesStore.playing"
          :loading="!!loadingChannelId"
          @click="togglePlay"
        />
        <div>
          <div v-if="countryTitle" class="bar-country">
            <img :src="flagSrc" class="bar-flag" alt="" />
            <span>{{ countryTitle }}</span>
          </div>
          <div class="bar-channel">
            <span v-if="activeChannel"> {{ activeChannel.title }}</span>
          </div>
        </div>
      </template>

      <div class="bar-actions">
        <base-icon-button
          name="bx:menu-alt-right"
          size="1.5"
          dynamic
          @click="() => countriesStore.toggleDrawer(true)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCountriesStore } from "../store/countries";

const route = useRoute();
const countriesStore = useCountriesStore();
const loadingChannelId = computed(() => countriesStore.loadingChannelId);
const activeChannel = computed(() => countriesStore.activeChannel);

const flagSrc = ref("");
const countryTitle = ref("");

watch(
  () => activeChannel.value,
  () => {
    const param = route.params.country;
    const country = countriesStore.countries.find((c) => c.id === param);

    flagSrc.value = `/flag/${country?.id}.svg`;
    countryTitle.value = country?.title || "";
  },
  { immediate: true },
);

const togglePlay = () => {
  if (loadingChannelId.value) {
    return;
  }

  countriesStore.togglePlay();
};
</script>

<style scoped>
.bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--color-border);
  box-shadow: 0 -4px 12px 0 rgba(0, 0, 0, 0.5);
}

.bar-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 12px;
  height: 80px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.channel-button {
  width: 48px;
  height: 48px;
  font-size: 2rem;
}

.bar-country {
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 12px;
  color: var(--color-primary);
}

.bar-flag {
  width: 24px;
  aspect-ratio: 3/4;
}

.bar-channel {
  max-width: 260px;
  height: 17px;
  font-size: 14px;
  color: var(--color-text-light);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.bar-actions {
  margin-left: auto;
}
</style>
