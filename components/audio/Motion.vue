<template>
  <div id="audio-container" class="absolute w-0 h-1" />
  <div
    id="canvas-container"
    class="fixed w-[105%] h-[110%] bottom-20 -left-[10px] pointer-events-none"
  />
</template>

<script lang="ts" setup>
import AudioMotionAnalyzer from "audiomotion-analyzer";
import { setGradient } from "./utils";

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
  () => setGradient(analyzer, props.theme, props.colors),
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

  // https://github.com/hvianna/audioMotion-analyzer?tab=readme-ov-file
  analyzer.value = new AudioMotionAnalyzer(canvas, {
    source: player,
    showScaleX: false,
    overlay: true,
    showBgColor: false,
    gradient: "steelblue",
    // alphaBars: true,
  });

  setGradient(analyzer, props.theme, props.colors);

  container.appendChild(player);
  analyzer.value.start();
};
</script>
