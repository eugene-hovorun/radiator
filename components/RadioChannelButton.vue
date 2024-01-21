<template>
  <button
    class="play-button channel-button"
    :class="{ playing, loading, failed }"
  >
    <svg v-if="failed" viewBox="0 0 22 22" style="width: 80%">
      <path
        d="M0.5 11C0.5 13.0767 1.11581 15.1068 2.26957 16.8335C3.42332 18.5602 5.0632 19.906 6.98182 20.7007C8.90045 21.4955 11.0116 21.7034 13.0484 21.2982C15.0852 20.8931 16.9562 19.8931 18.4246 18.4246C19.8931 16.9562 20.8931 15.0852 21.2982 13.0484C21.7034 11.0116 21.4955 8.90045 20.7007 6.98182C19.906 5.0632 18.5602 3.42332 16.8335 2.26957C15.1068 1.11581 13.0767 0.5 11 0.5C8.21523 0.5 5.54451 1.60625 3.57538 3.57538C1.60625 5.54451 0.5 8.21523 0.5 11ZM17.8625 16.8125L5.1875 4.1375C6.91298 2.70125 9.11295 1.96173 11.3556 2.0641C13.5983 2.16646 15.7218 3.10331 17.3092 4.69077C18.8967 6.27824 19.8335 8.40169 19.9359 10.6444C20.0383 12.8871 19.2988 15.087 17.8625 16.8125ZM5.18 17.87C3.36374 16.3276 2.23325 14.1279 2.03642 11.7533C1.83959 9.37865 2.59248 7.02286 4.13 5.2025L16.7975 17.87C15.1732 19.2425 13.1153 19.9955 10.9887 19.9955C8.86219 19.9955 6.80433 19.2425 5.18 17.87Z"
        fill="white"
      />
    </svg>

    <svg v-else-if="loading" viewBox="0 0 42 42" style="width: 100%">
      <circle
        cx="21"
        cy="21"
        r="19"
        fill="none"
        stroke="var(--color-primary)"
        stroke-width="4"
        stroke-dasharray="10 5"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="4s"
          values="0 21 21;360 21 21"
        ></animateTransform>
      </circle>
    </svg>

    <svg v-else-if="playing" viewBox="0 0 42 59">
      <rect x="0.68" y="0.5" width="10" height="58" />
      <rect x="31.5" y="0.5" width="10" height="58" />
    </svg>

    <svg v-else viewBox="0 0 55 63">
      <path transform="translate(4)" d="M54 31L0 63L0 0.2L54 31Z" />
    </svg>
  </button>
</template>

<script lang="ts" setup>
defineProps({ playing: Boolean, loading: Boolean, failed: Boolean });
</script>
