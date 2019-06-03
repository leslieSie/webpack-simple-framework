<template>
  <Button @click="clickAlert">Click Test</Button>
</template>
<script>
import { alertTest } from '@/index.js';
export default {
  data () {
    return {};
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
