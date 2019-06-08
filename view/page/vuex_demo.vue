<template>
  <div>
    <span>{{count}}</span>
    <Button style="margin-left:20px" @click="addClcik">add</Button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // image: img
    };
  },
  computed: {
    count () {
      return this.$store.state.count;
    }
  },
  methods: {
    addClcik () {
      this.$store.commit('increment');
    }
  }
};
</script>
<style>
</style>
