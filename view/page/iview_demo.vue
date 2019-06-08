<template>
  <div>
    <div class="line-between">
      <p>评分：</p>
      <Rate allow-half :value.sync="valueHalf"></Rate>
    </div>

    <div class="line-between">
      <p>日期选择器：</p>
      <Date-picker type="date" placeholder="选择日期" style="width: 200px"></Date-picker>
    </div>

    <div>
      <p>标签：</p>
      <Tag>标签一</Tag>
      <Tag>标签二</Tag>
      <Tag>标签三</Tag>
    </div>

    <div class="line-between">
      <p>进度条：</p>
      <Progress :percent="25"></Progress>
    </div>
    <!-- <Button @click="clickAlert">Click Test</Button> -->
    <!-- <img :src="image"> -->
  </div>
</template>
<script>
/* import { alertTest } from '@/index.js';
import img from '../public/by2.jpg'; */
export default {
  data () {
    return {
      valueHalf: 2.5
    };
  },
  methods: {
    clickAlert () {
      // alertTest('测试!');
    }
  }
  /*   created(){
    console.log(img);
  } */
};
</script>
<style scoped>
.line-between {
  margin: 20px 10px;
}
</style>
