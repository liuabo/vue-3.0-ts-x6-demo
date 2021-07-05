<template>
  <div class="home">
    <flow-chart />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FlowChart from "@/components/FlowChart/index.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Home",
  components: {
    FlowChart,
  },
});
</script>
