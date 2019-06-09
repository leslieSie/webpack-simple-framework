<template>
  <div>
    <div>
      <p>调用src目录下面的源码</p>
      <Button @click="clickAlert">Click Test</Button>
    </div>

    <div>
      <p>加载图片</p>
      <img :src="image">
    </div>
    <!-- <img :src="image"> -->
  </div>
</template>
<script>
import img from "../public/by2.jpg";
let utils = require("../../src/index.js").default;
export default {
  data() {
    return {
      image: img
    };
  },
  methods: {
    clickAlert() {
      utils.alertTest("测试!");
    }
  },
  ceated() {
    console.log(utils);
  }
};
</script>
<style>
</style>
