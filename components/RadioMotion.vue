<template>
  <div id="audio-container"></div>
  <div id="canvas-container"></div>
</template>

<script lang="ts" setup>
import AudioMotionAnalyzer from "audiomotion-analyzer";
import { watch } from "vue";

interface Props {
  src?: string;
  colors: string[];
  theme: Theme["value"];
  playing?: boolean;
}

const emit = defineEmits(["loaded", "play", "error"]);
const props = defineProps<Props>();
const analyzer = ref<AudioMotionAnalyzer>();

watch(
  () => props.src,
  (src) => playChannel(src),
);

watch(
  () => props.playing,
  (playing) => {
    const audio = document.querySelector("#audio") as HTMLAudioElement;

    if (playing) {
      audio?.play();
    } else {
      audio?.pause();
    }
  },
);

watch(
  () => props.theme,
  () => setGradient(),
);

const setGradient = () => {
  if (!analyzer.value) {
    return;
  }

  if (props.theme === "steelblue") {
    analyzer.value.gradient = "steelblue";
  } else if (props.theme === "orangered") {
    analyzer.value.gradient = "orangered";
  } else if (props.theme === "flag") {
    registerGradient();
  }
};

const registerGradient = () => {
  if (!analyzer.value) {
    return;
  }

  analyzer.value.registerGradient("country", {
    bgColor: "transparent",
    colorStops: [...props.colors].reverse().map((color, i) => ({
      color,
      pos: 1 / props.colors.length + i / props.colors.length,
    })),
  });

  analyzer.value.gradient = "country";
};

const playChannel = (src?: string) => {
  const canvas = document.querySelector("#canvas-container") as HTMLElement;
  const container = document.querySelector("#audio-container") as HTMLElement;
  const audio = document.querySelector("#audio") as HTMLAudioElement;

  canvas.innerHTML = "";
  audio?.pause();
  audio?.parentElement?.removeChild(audio);

  if (!src) {
    return;
  }

  const player = Object.assign(document.createElement("audio"), {
    id: "audio",
    src,
    autoplay: true,
    crossOrigin: "anonymous",
    volume: 0.4,
    oncanplaythrough() {
      emit("loaded");
    },
    onerror() {
      emit("error");
    },
    onplay() {
      emit("play");
    },
  });

  analyzer.value = new AudioMotionAnalyzer(canvas, {
    source: player,
    showScaleX: false,
    overlay: true,
    showBgColor: false,
    gradient: "steelblue",
  });

  setGradient();

  container.appendChild(player);
  analyzer.value.start();
};
</script>
