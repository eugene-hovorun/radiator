<template>
  <div>
    <img src="~/assets/loading.gif" alt="Radio Logo" />
  </div>
</template>

<style lang="scss" scoped>
div {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: grid;
  place-content: center;
  pointer-events: none;
  animation: enlarge 1s infinite;
}

img {
  width: 120px;
  height: 120px;
  pointer-events: none;
  opacity: 0.8;
}

@keyframes enlarge {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(0.8);
  }
}
</style>
