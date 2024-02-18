<template>
  <div id="audio-container" />
  <div id="canvas-container" />
</template>

<script lang="ts" setup>
import AudioMotionAnalyzer from "audiomotion-analyzer";
import { setGradient } from "./utils";

interface Props {
  src?: string;
  colors: string[];
  volume: number;
  visibility: string;
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
  () => props.volume,
  (volume) => {
    const audio = getAudioElement();

    if (audio) {
      audio.volume = Math.min(volume, 1);
    }
  },
);

watch(
  () => props.playing,
  (playing) => {
    const audio = getAudioElement();

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

watch(
  () => props.visibility,
  (visibility) => {
    if (visibility === "hidden") {
      analyzer.value?.stop();
    } else {
      analyzer.value?.start();
    }
  },
);

const getAudioElement = () =>
  document.querySelector("#audio") as HTMLAudioElement;

const playChannel = (src?: string) => {
  const canvas = document.querySelector("#canvas-container") as HTMLElement;
  const container = document.querySelector("#audio-container") as HTMLElement;
  const audio = getAudioElement();

  canvas.innerHTML = "";

  if (audio) {
    // audio.src = "";
    audio.pause();
    audio.parentElement?.removeChild(audio);
  }

  if (!src) {
    return;
  }

  const player = Object.assign(document.createElement("audio"), {
    id: "audio",
    src,
    autoplay: true,
    crossOrigin: "anonymous",
    volume: 0,
    oncanplaythrough() {
      emit("loaded");
    },
    onerror() {
      emit("error");
    },
    onplay() {
      emit("play");

      const adjustVolumeInterval = setInterval(() => {
        if (this.volume < props.volume && this.volume < 0.95) {
          this.volume += 0.025;
        } else {
          clearInterval(adjustVolumeInterval);
        }
      }, 50);
    },
  });

  // https://github.com/hvianna/audioMotion-analyzer?tab=readme-ov-file
  analyzer.value = new AudioMotionAnalyzer(canvas, {
    source: player,
    showScaleX: false,
    overlay: true,
    showBgColor: false,
    gradient: "steelblue",
    alphaBars: true,
    mirror: 1,
  });

  setGradient(analyzer, props.theme, props.colors);

  container.appendChild(player);
  analyzer.value.start();
};
</script>

<style scoped>
[id="audio-container"] {
  position: absolute;
  width: 0px;
  height: 1px;
}

[id="canvas-container"] {
  position: fixed;
  width: 100%;
  height: 110%;
  bottom: 80px;
  left: 0;
}
</style>
