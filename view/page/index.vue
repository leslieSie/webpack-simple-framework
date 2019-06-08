<template>
  <div>
    <Button type="primary" @click="changePage('ivewDemo')">完成对iview框架的调用</Button>
    <Button type="primary" @click="changePage('vuexDemo')">使用vuex来构建应用</Button>
    <Button type="primary" @click="changePage('buildDemo')">打包框架方法调用与其他使用方法</Button>
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
    changePage (name) {
      this.$router.push(name);
    }
  }
};
</script>
<style>
</style>
