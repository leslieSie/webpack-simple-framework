<template>
  <div>
    <Button @click="clickAlert">Click Test</Button>
    <img :src="image">
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
  /*   created(){
    console.log(img);
  } */
};
</script>
<style>
</style>
