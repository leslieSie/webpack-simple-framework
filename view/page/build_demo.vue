<template>
  <div>
    <div>
      <p>调用将要打包框架下面的alertTest方法,点击按钮前先执行npm build</p>
      <Button @click="clickAlert">Click Test</Button>
    </div>
  </div>
</template>
<script>
import img from "../public/by2.jpg";
let prodConfig = require("../../config/prod.config.js");
let utils;
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
  created() {
    let fileName = prodConfig.entryMainFile || "index";
    utils = require(`../../build/${fileName}.js`);
  }
};
</script>
<style>
</style>
