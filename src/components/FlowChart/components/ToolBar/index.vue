<template>
  <div class="toolBar">
    <template
      v-for="item in buttonList"
      :key="item.type"
    >
      <el-tooltip
        v-if="item.type !== 'zoom'"
        effect="dark"
        :content="item.content"
        placement="bottom"
      >
        <template v-if="item.type === 'zoomIn' || item.type === 'zoomOut'">
          <el-button size="small" v-if="item.type === 'zoomIn'" :icon="item.icon" :disabled="zoom > 1.5" @click="()=>{handleClick(item.type)}"></el-button>
          <el-button size="small" v-else :icon="item.icon" :disabled="zoom < 0.5" @click="()=>{handleClick(item.type)}"></el-button>
        </template>
        <template v-else>
          <el-button v-if="item.type !== 'line'" :icon="item.icon"  size="small" @click="()=>{handleClick(item.type)}"></el-button>
          <el-button v-else type="text" :icon="item.icon"  size="small" style="transform:scale(2) rotate(90deg);color: rgba(0, 0, 0, 0.15)"></el-button>
        </template>
      </el-tooltip>
      <el-button type="text" :style="{lineHeight: '28px', fontSize: '12px', marginRight: '4px', color: 'rgba(0, 0, 0, 0.85)'}" v-else>{{`${(zoom * 100).toFixed(0)}%`}}</el-button>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, ref, watchEffect } from "vue";
import FlowGraph from "../../Graph";
import { DataUri } from "@antv/x6";

export default defineComponent({
  name: "ToolBar",
  setup() {
    const buttonList = [
      {
        icon: "el-icon-delete",
        content: "clear",
        type: "clear",
      },
      {
        icon: "el-icon-zoom-in",
        content: "clear",
        type: "zoomIn",
      },
      {
        icon: "el-icon-zoom-out",
        content: "clear",
        type: "zoomOut",
      },
      {
        icon: "el-icon-minus",
        content: "",
        type: "line",
      },
      {
        icon: "el-icon-minus",
        content: "",
        type: "zoom",
      },
    ];
    const canUndo = ref(false);
    const canRedo = ref(false);
    const zoom = ref(1);
    watchEffect(() => {
      nextTick(() => {
        const { graph } = FlowGraph;
        // history
        const { history } = graph;
        canUndo.value = history.canUndo();
        canRedo.value = history.canRedo();
        history.on("change", () => {
          canUndo.value = history.canUndo();
          canRedo.value = history.canRedo();
        });
        // zoom
        zoom.value = graph.zoom();
        graph.on("scale", () => {
          zoom.value = graph.zoom();
        });
      });
      console.log('value', zoom.value);
    });

    const handleClick = (name: string) => {
      const { graph } = FlowGraph;
      switch (name) {
        case "undo":
          graph.history.undo();
          break;
        case "redo":
          graph.history.redo();
          break;
        case "delete":
          graph.clearCells();
          break;
        case "save":
          graph.toPNG((datauri: string) => {
            DataUri.downloadDataUri(datauri, "flowchart.png");
          });
          break;
        case "zoomIn":
          graph.zoom(0.1);
          break;
        case "zoomOut":
          graph.zoom(-0.1);
          break;
        default:
          break;
      }
    };
    return {
      buttonList,
      canUndo,
      canRedo,
      zoom,
      handleClick,
    };
  },
});
</script>

<style scoped></style>
