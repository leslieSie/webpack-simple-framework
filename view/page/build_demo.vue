<template>
  <div>
    <div>
      <p>调用将要打包框架下面的alertTest方法</p>
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
import { alertTest } from '@/index.js';
import img from '../public/by2.jpg';
export default {
  data () {
    return {
      image: img
    };
  },
  methods: {
    clickAlert () {
      alertTest('测试!');
    }
  }
};
</script>
<style>
</style>
