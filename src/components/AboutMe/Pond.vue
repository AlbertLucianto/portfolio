<template>
  <div class="pond" @mousedown="createRipple" :style="rippleContainerStyle" :class="{ raining }">
    <svg v-for="(ripple, idx) in ripples" :key="ripple.id" class="ripple" :style="rippleStyle(ripple.x, ripple.y)">
      <circle cx="250" cy="250" r="250" class="wave"></circle>
    </svg>
    <svg v-for="(ripple, idx) in smallRipples" :key="ripple.id" class="small-ripple" :style="rippleStyle(ripple.x, ripple.y)">
      <circle cx="150" cy="150" :r="ripple.r" class="small-wave"></circle>
    </svg>
    <img src="../../assets/cliffs.svg" class="cliff"></svg>
  </div>
</template>

<script>
export default {
  props: {
    cursor: {
      type: Object,
      validator(val) {
        if (typeof val.x === 'number' && typeof val.y === 'number') return true;
        return false;
      },
    },
  },
  data() {
    return {
      ripples: [],
      lastId: 0,
      raining: false,
      smallRipples: [],
      clickNum: 0,
      bg: {
        in: '#27CED6',
        out: '#232222',
      },
    };
  },
  computed: {
    rippleStyle() {
      return (x, y) => ({
        left: `${x - 250}px`,
        top: `${y - 250}px`,
      });
    },
    rippleContainerStyle() {
      return {
        background: `radial-gradient(at
        ${(this.cursor.x / window.innerWidth) * 50}%
        ${((this.cursor.y / window.innerHeight) * 20) - 50}%,
        ${this.bg.in}, ${this.bg.out})`,
      };
    },
  },
  watch: {
    raining(val) {
      if (val) {
        this.createSmallRipples();
      }
    },
    clickNum(val) {
      if (val > 3) {
        this.raining = true;
      }
    },
  },
  methods: {
    createRipple(e) {
      this.clickNum += 1;
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
      }, 750);
    },
    createSmallRipples() {
      setInterval(() => {
        this.smallRipples.push({
          x: (Math.random() * window.innerWidth) + 100,
          y: (Math.random() * window.innerHeight) + 100,
          r: (Math.random() * 100) + 50,
          id: this.lastId,
        });
        this.lastId += 1;
        setTimeout(() => {
          this.smallRipples.shift();
        }, 750);
      }, 25);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/colors.scss';

.pond {
  width: 100%;
  height: 100%;
  background: $black;
  transition: transform 4s ease-out;
  transform-style: preserve-3d;
  &.raining {
    transform: rotateX(90deg) translate3d(0, -1000px, 0) scale(0.5);
  }
  .ripple {
    position: fixed;
    width: 500px;
    height: 500px;
    .wave {
      fill: $white;
      stroke: $aqua;
      stroke-width: 0;
      animation: wave 1s forwards ease-out;
      fill-opacity: 0;
      transform-origin: 50% 50%;
      transform: scale(0, 0);
    }
  }
  .small-ripple {
    position: fixed;
    width: 300px;
    height: 300px;
    .small-wave {
      fill: $white;
      stroke: $aqua;
      stroke-width: 0;
      animation: wave .75s forwards ease-out;
      fill-opacity: 0;
      transform-origin: 50% 50%;
      transform: scale(0, 0);
    }
  }
  .cliff {
    transform: scaleX(3) rotateX(-90deg) translate3d(0, -75px, -200px);
    width: 1000px;
  }
}

@keyframes wave {
  15% {
    stroke-width: 15px;
  }
  33% {
    fill-opacity: 0.25;
    stroke-width: 7.5px;
  }
  50% {
    fill-opacity: 0.5;
    stroke-width: 10px;
  }
  100% {
    fill-opacity: 0;
    transform: scale(1, 1);
  }
}
</style>
