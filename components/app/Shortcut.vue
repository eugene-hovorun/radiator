<template>
  <render />
</template>

<script lang="ts" setup>
import { h, useCssModule } from "vue";
import { isMac } from "../../store/utils";

interface Props {
  is: string;
}

const props = defineProps<Props>();
const classes = useCssModule("classes");
const modifier = isMac() ? "⌘" : "Ctrl";

const getShortcut = () => {
  switch (props.is) {
    case "search":
      return [
        h("span", { class: classes.key }, modifier),
        h("span", { class: classes.plus }, "+"),
        h("span", { class: classes.key }, "F"),
      ];
    case "sidebar":
      return [
        h("span", { class: classes.key }, modifier),
        h("span", { class: classes.plus }, "+"),
        h("span", { class: classes.key }, "D"),
      ];
    case "volume":
      return [
        h("span", { class: classes.key }, "↑"),
        h("span", { class: classes.plus }, "/"),
        h("span", { class: classes.key }, "↓"),
      ];
    case "pause":
      return [h("span", { class: classes.key }, "Space")];
    case "shuffle":
      return [
        h("span", { class: classes.key }, modifier),
        h("span", { class: classes.plus }, "+"),
        h(
          "span",
          { class: classes.key, style: "transform: rotate(90deg)" },
          "↑",
        ),
      ];
    case "theme":
      return [
        h("span", { class: classes.key }, modifier),
        h("span", { class: classes.plus }, "+"),
        h("span", { class: classes.key }, "1 - 5"),
      ];
    case "favorite":
      return [h("span", { class: classes.key }, "1 - 9")];
  }
};

const render = () => h("div", { class: classes.row }, getShortcut());
</script>

<style module="classes">
.row {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
}
.key {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 24px;
  height: 24px;
  padding: 2px 4px;
  color: var(--color-dark);
  font-weight: bold;
  background: var(--color-main);
  border-radius: 4px;
  line-height: 0;
}

.plus {
  color: var(--color-main);
  font-weight: bold;
  line-height: 0;
}
</style>
