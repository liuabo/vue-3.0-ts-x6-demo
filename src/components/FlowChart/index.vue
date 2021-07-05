<template>
  <div class="wrap">
    <div class="toolbar">
      <tool-bar />
    </div>
    <div class="content">
      <div id="stencil" class="shapes"></div>
      <div id="container" class="x6-graph"></div>
      <div class="x6-config">
      </div>
      <div id="minimap" class="minimap"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watchEffect, ref, nextTick } from "vue";
import FlowGraph from "./Graph";
import "../../reset.less";
import "../../global.css";
import "./index.less";
import ToolBar from "./components/ToolBar/index.vue";

export default defineComponent({
  name: "flowChart",
  components: { ToolBar },
  props: {
    msg: String,
  },
  setup() {
    const isReady = ref<boolean>(false);

    const getContainerSize = () => {
      return {
        width: document.body.offsetWidth - 214,
        height: document.body.offsetHeight - 105,
      };
    };
    watchEffect(() => {
      nextTick(() => {
        const graph = FlowGraph.init();
        isReady.value = true;
        const resizeFn = () => {
          const { width, height } = getContainerSize();
          graph.resize(width, height);
        };
        resizeFn();
        window.addEventListener("resize", resizeFn);
        return () => {
          window.removeEventListener("resize", resizeFn);
        };
      });
    });
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
