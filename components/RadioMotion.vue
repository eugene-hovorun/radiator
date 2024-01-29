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
  playing?: boolean;
}

const emit = defineEmits(["loaded", "play", "error"]);
const props = defineProps<Props>();

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

  const analyzer = new AudioMotionAnalyzer(canvas, {
    source: player,
    showScaleX: false,
    overlay: true,
    showBgColor: false,
    gradient: "steelblue",
  });

  if (props.colors.length) {
    analyzer.registerGradient("country", {
      bgColor: "transparent",
      colorStops: [...props.colors].reverse().map((color, i) => ({
        color,
        pos: 1 / props.colors.length + i / props.colors.length,
      })),
    });

    analyzer.gradient = "country";
  }

  container.appendChild(player);
  analyzer.start();
};
</script>
