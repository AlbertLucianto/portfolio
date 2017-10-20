<template>
  <div class="about-me">
    <pass-code></pass-code>
  </div>
</template>

<script>
import PassCode from './PassCode';

export default {
  components: {
    PassCode,
  },
  data() {
    return {
      test: 'test',
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/colors.scss';

.about-me {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: $white;
}
</style>
