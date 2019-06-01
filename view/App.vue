<template>
  <div>
    <Tag>标签一</Tag>
    <div class="header">222</div>
    <Button type="info" @click="clickAlertMsg">信息按钮</Button>
  </div>
</template>
<script>
import { alertTest } from "@/index.js";
export default {
  data() {
    return {
      data: 2222
    };
  },
  methods: {
    clickAlertMsg() {
      alertTest();
    }
  }
};
</script>
<style scoped>
.header {
  padding: 10px;
  background: red;
  color: white;
}
</style>


