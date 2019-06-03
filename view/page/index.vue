<template>
  <div>
    <Button @click="clickAlert">Click Test</Button>
    <img src="by2.jpg">
  </div>
</template>
<script>
import { alertTest } from "@/index.js";
export default {
  data() {
    return {};
  },
  methods: {
    clickAlert() {
      alertTest("测试!");
    }
  }
};
</script>
<style>
</style>
