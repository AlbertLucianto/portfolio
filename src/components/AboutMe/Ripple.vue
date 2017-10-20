<template>
  <div class="ripple-container" @mousedown="createRipple">
    <svg v-for="(ripple, idx) in ripples" :key="ripple.id" class="ripple" :style="rippleStyle(ripple.x, ripple.y)">
      <circle cx="150" cy="150" r="150" class="wave"></circle>
    </svg>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ripples: [],
      lastId: 0,
    };
  },
  computed: {
    rippleStyle() {
      return (x, y) => ({
        left: `${x - 150}px`,
        top: `${y - 150}px`,
      });
    },
  },
  methods: {
    createRipple(e) {
      const evt = e.changedTouches ? e.changedTouches[0] : e;
      let numNew = Math.floor(Math.random() * 2) + 1;
      const itv = setInterval(() => {
        this.ripples.push({
          x: evt.pageX,
          y: evt.pageY,
          id: this.lastId,
        });
        setTimeout(() => {
          this.ripples.shift();
        }, 1000);
        this.lastId += 1;
        numNew -= 1;
        if (numNew < 1) clearInterval(itv);
      }, 500);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/colors.scss';

.ripple-container {
  width: 100%;
  height: 100%;
  background: $black;
  transform: rotateX(-90deg) translate3d(0, 0, 100px) scale(0.3);
  .ripple {
    position: fixed;
    width: 300px;
    height: 300px;
    .wave {
      fill: $white;
      animation: wave 1s forwards ease-out;
      opacity: 0;
      transform-origin: 50% 50%;
      transform: scale(0, 0);
    }
  }
}

@keyframes wave {
  33% {
    opacity: 0.25;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
    transform: scale(1, 1);
  }
}
</style>
