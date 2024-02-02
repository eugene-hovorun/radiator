import AudioMotionAnalyzer from "audiomotion-analyzer";
import type { Ref } from "vue";

const themeGradients: Partial<Record<Theme["value"], string[]>> = {
  deeppurple: ["#FFC7C7", "#C683D7", "#ED9ED6", "#7071E8"],
  sunlit: Array.from(
    { length: 17 },
    (_, i) => `hsl(${32 + i}, 99%, 56%)`,
  ).reverse(),
};

export const setGradient = (
  analyzer: Ref<AudioMotionAnalyzer | undefined>,
  theme: Theme["value"],
  colors?: string[],
) => {
  if (!analyzer.value) {
    return;
  }

  const registerGradient = (colors: string[]) => {
    analyzer.value!.registerGradient("country", {
      bgColor: "transparent",
      colorStops: [...colors].reverse().map((color, i) => ({
        color,
        pos: 1 / colors.length + i / colors.length,
      })),
    });

    analyzer.value!.gradient = "country";
  };

  if (theme === "steelblue") {
    analyzer.value.gradient = "steelblue";
  } else if (theme === "orangered") {
    analyzer.value.gradient = "orangered";
  } else if (themeGradients[theme]?.length) {
    registerGradient(themeGradients[theme] as string[]);
  } else if (colors?.length) {
    registerGradient(colors);
  }
};
