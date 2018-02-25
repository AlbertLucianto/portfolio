<template>
  <div class="container" :class="{ over }">
    <slot :getTransform="getTransform" :over="over"
      :mouseOffset="mouseOffset" :dimension="dimension"></slot>
    <div class="card" :style="cardStyle" ref="card"
      @mouseover="animateIn" @mousemove="animateMove" @mouseout="animateOut">
    </div>
  </div>
</template>

<script>
import dynamics from 'dynamics.js';

const rotateDamp = 4;
const adjustDuration = 400;
const purple = '#7D4896';
const warmRed = '#FFBA9C';

export default {
  props: {
    colorOut: {
      type: String,
      validator(val) {
        const re = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
        return re.test(val);
      },
    },
    colorIn: {
      type: String,
      validator(val) {
        const re = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
        return re.test(val);
      },
    },
  },
  data() {
    return {
      mouseOffset: {
        x: 0,
        y: 0,
      },
      lag: false,
      over: false,
      dimension: { x: 0, y: 0 },
      bg: {
        out: '',
        in: '',
      },
    };
  },
  computed: {
    cardStyle() {
      const offRatio = {
        x: this.mouseOffset.x / this.dimension.width,
        y: this.mouseOffset.y / this.dimension.height,
      };
      const disp = Math.sqrt(((offRatio.x ** 2) + (offRatio.y ** 2)) / 2);
      const shadowX = 10 * offRatio.x;
      const shadowY = (20 * offRatio.y) + 10;
      const blur = (30 * (1 - disp)) + (this.over ? 20 : 0);
      const spread = this.over ? -5 : -10;
      return {
        background: `radial-gradient(at ${offRatio.x * 100}% ${offRatio.y * 100}%, ${this.bg.in}, ${this.bg.out})`,
        'box-shadow': `${shadowX}px ${shadowY}px ${blur}px ${spread}px rgba(0,0,0,0.15)`,
        ...this.getTransform(),
      };
    },
    getTransform() {
      const offRatio = {
        x: this.mouseOffset.x / this.dimension.width,
        y: this.mouseOffset.y / this.dimension.height,
      };
      const disp = Math.sqrt(((offRatio.x ** 2) + (offRatio.y ** 2)) / 2);
      return (translate = '') => ({
        transform: `rotate3d(${offRatio.y},${-offRatio.x},0,${(90 * disp) / rotateDamp}deg) ${translate}`,
      });
    },
  },
  methods: {
    animateIn(e) {
      this.over = true;
      this.lag = true;
      const evt = e.changedTouches ? e.changedTouches[0] : e;
      const rect = this.$refs.card.getBoundingClientRect();
      const center = {
        x: (rect.left + rect.right) / 2,
        y: (rect.top + rect.bottom) / 2,
      };
      this.offsetTo(
        evt.pageX - center.x,
        evt.pageY - center.y,
      );
    },
    animateMove(e) {
      const evt = e.changedTouches ? e.changedTouches[0] : e;
      const rect = this.$refs.card.getBoundingClientRect();
      const center = {
        x: (rect.left + rect.right) / 2,
        y: (rect.top + rect.bottom) / 2,
      };
      const offset = {
        x: evt.pageX - center.x,
        y: evt.pageY - center.y,
      };
      if (this.lag) {
        setTimeout(() => {
          this.lag = false;
        }, adjustDuration);
        this.offsetTo(offset.x, offset.y);
      } else {
        dynamics.stop(this.mouseOffset);
        this.mouseOffset.x = offset.x;
        this.mouseOffset.y = offset.y;
      }
    },
    animateOut() {
      this.over = false;
      this.lag = false;
      this.offsetTo(0, 0);
    },
    offsetTo(offsetX, offsetY) {
      dynamics.animate(this.mouseOffset, {
        x: offsetX,
        y: offsetY,
      }, {
        type: dynamics.easeOut,
        duration: adjustDuration,
        friction: 50,
      });
    },
  },
  mounted() {
    this.$nextTick(() => {
      const rect = this.$refs.card.getBoundingClientRect();
      this.dimension = {
        width: rect.left - rect.right,
        height: rect.top - rect.bottom,
      };
      this.bg.out = this.colorOut ? this.colorOut : purple;
      this.bg.in = this.colorIn ? this.colorIn : warmRed;
    });
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/colors.scss';

.container {
  position: relative;
  width: 100%;
  height: 100%;
  perspective: 800px;
  perspective-origin: 50% 50%;
  transition: .2s transform ease;
  &.over {
    transform: scale(1.1);
  }
  .card {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 7.5px;
    will-change: box-shadow, transform;
  }
}
</style>
