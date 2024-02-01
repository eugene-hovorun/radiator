<template>
  <div id="audio-container" class="absolute w-0 h-1"></div>
  <div
    id="canvas-container"
    class="fixed w-[102%] h-[110%] bottom-20 left-0 pointer-events-none"
  ></div>
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

const themeGradients: Partial<Record<Theme["value"], string[]>> = {
  deeppurple: ["#FFC7C7", "#C683D7", "#ED9ED6", "#7071E8"],
};

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
  } else if (props.theme in themeGradients) {
    registerGradient(themeGradients[props.theme]);
  } else if (props.theme === "flag") {
    registerGradient();
  }
};

const registerGradient = (themeColors?: string[]) => {
  if (!analyzer.value) {
    return;
  }

  if (themeColors) {
    analyzer.value.registerGradient("country", {
      bgColor: "transparent",
      colorStops: themeColors.map((color, i) => ({
        color,
        pos: 1 / themeColors.length + i / themeColors.length,
      })),
    });

    analyzer.value.gradient = "country";
  } else {
    analyzer.value.registerGradient("country", {
      bgColor: "transparent",
      colorStops: [...props.colors].reverse().map((color, i) => ({
        color,
        pos: 1 / props.colors.length + i / props.colors.length,
      })),
    });

    analyzer.value.gradient = "country";
  }
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
