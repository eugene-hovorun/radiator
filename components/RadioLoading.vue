<template>
  <transition name="fade">
    <div v-if="$attrs.loading">
      <svg width="120px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
        <circle cx="28" cy="75" r="11" fill="#4981b2">
          <animate
            attributeName="fill-opacity"
            repeatCount="indefinite"
            dur="1.2048192771084336s"
            values="0;1;1"
            keyTimes="0;0.2;1"
            begin="0s"
          ></animate>
        </circle>

        <path
          d="M28 47A28 28 0 0 1 56 75"
          fill="none"
          stroke="#ffffff"
          stroke-width="10"
        >
          <animate
            attributeName="stroke-opacity"
            repeatCount="indefinite"
            dur="1.2s"
            values="0;1;1"
            keyTimes="0;0.2;1"
            begin="0.12s"
          ></animate>
        </path>
        <path
          d="M28 25A50 50 0 0 1 78 75"
          fill="none"
          stroke="#4981b2"
          stroke-width="10"
        >
          <animate
            attributeName="stroke-opacity"
            repeatCount="indefinite"
            dur="1.2s"
            values="0;1;1"
            keyTimes="0;0.2;1"
            begin="0.24s"
          ></animate>
        </path>
      </svg>
    </div>
  </transition>
</template>

<style scoped>
div {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: radial-gradient(
    circle,
    rgba(0, 0, 0, 0.1) 0%,
    rgba(0, 0, 0, 0.4) 100%
  );
  display: grid;
  place-content: center;
  pointer-events: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: 0.25s;
}
.fade-enter {
  opacity: 0;
}

.fade-leave-to {
  opacity: 0;
}

.fade-enter div,
.fade-leave-to div {
  background: transparent;
}
</style>
