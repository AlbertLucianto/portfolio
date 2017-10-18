<template>
  <svg class="right-arrow" @mouseover="mouseOver" @mouseout="mouseOut" :style="position">
  </svg>
</template>

<script>
export default {
  props: {
    mouseOver: Function,
    mouseOut: Function,
    direction: {
      type: String,
      required: true,
      default: 'right',
    },
  },
  computed: {
    position() {
      const style = {};
      style[this.direction] = '10px';
      return style;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/colors.scss';

.right-arrow {
  position: fixed;
  width: 60px;
  height: 60px;
  top: calc(50vh - 30px);
  background: rgba(0,0,0,0.2);
  border-radius: 50%;
}
</style>
