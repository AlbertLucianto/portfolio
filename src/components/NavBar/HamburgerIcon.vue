<template>
  <div class="hamburger-button">
    <svg class="hamburger-icon" @mouseover="animateIn" @mouseout="animateOut">
      <line :x1="line1.start.x" :y1="line1.start.y" :x2="line1.end.x" :y2="line1.end.y" class="hamburger-line"/>
      <line :x1="line2.start.x" :y1="line2.start.y" :x2="line2.end.x" :y2="line2.end.y" class="hamburger-line"/>
      <transition name="fade">
        <line :x1="line3.start.x" :y1="line3.start.y" :x2="line3.end.x" :y2="line3.end.y" class="hamburger-line" v-if="showThird && !dragging"/>
      </transition>
    </svg>
    <div class="guide" :class="{ 'first-hover': firstHover }">
      <div class="instruction">
        Drag or click.
      </div>
    </div>
  </div>
</template>

<script>
import dynamics from 'dynamics.js';

const leftTop = { x: 20, y: 20 };
const leftMid = { x: 20, y: 40 };
const leftBottom = { x: 20, y: 60 };
const rightTop = { x: 60, y: 20 };
const rightMid = { x: 60, y: 40 };
const rightBottom = { x: 60, y: 60 };

const animateSpring = (line, newPos) => {
  dynamics.animate(line.start, {
    x: newPos.start.x,
    y: newPos.start.y,
  }, {
    type: dynamics.easeInOut,
    duration: 400,
    friction: 50,
  });
  dynamics.animate(line.end, {
    x: newPos.end.x,
    y: newPos.end.y,
  }, {
    type: dynamics.easeInOut,
    duration: 400,
    friction: 50,
  });
};

export default {
  data() {
    return {
      showThird: true,
      line1: {
        start: { ...leftTop },
        end: { ...rightTop },
      },
      line2: {
        start: { ...leftMid },
        end: { ...rightMid },
      },
      line3: {
        start: { ...leftBottom },
        end: { ...rightBottom },
      },
      firstHover: true,
    };
  },
  props: {
    open: Boolean,
    dragging: Boolean,
  },
  methods: {
    animateIn() {
      if (this.open) {
        this.showThird = false;
        animateSpring(this.line1, {
          start: { ...leftMid },
          end: { ...rightTop },
        });
        animateSpring(this.line2, {
          start: { ...leftMid },
          end: { ...rightBottom },
        });
      } else {
        this.showThird = false;
        animateSpring(this.line1, {
          start: { ...rightMid },
          end: { ...leftTop },
        });
        animateSpring(this.line2, {
          start: { ...rightMid },
          end: { ...leftBottom },
        });
      }
    },
    animateOut() {
      this.firstHover = false;
      if (this.open) {
        this.showThird = false;
        animateSpring(this.line1, {
          start: { ...leftTop },
          end: { ...rightBottom },
        });
        animateSpring(this.line2, {
          start: { ...leftBottom },
          end: { ...rightTop },
        });
      } else {
        this.showThird = true;
        animateSpring(this.line1, {
          start: { ...leftTop },
          end: { ...rightTop },
        });
        animateSpring(this.line2, {
          start: { ...leftMid },
          end: { ...rightMid },
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/colors.scss';

.hamburger-button {
  .hamburger-icon {
    width: 100%;
    height: 100%;
    .hamburger-line {
      stroke-width: 4px;
      stroke: $white;
      fill: none;
    }
    .fade-enter-active {
      transition: all .5s ease;
    }
    .fade-leave-active {
      transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .fade-enter, .fade-leave-to {
      opacity: 0;
    }
  }
  .guide {
    position: absolute;
    top: -5px;
    width: 0;
    border-top: 1px solid $yellow;
    padding-top: 5px;
    text-align: left;
    color: $yellow;
    transition: 500ms opacity ease;
    .instruction {
      width: 0;
      text-align: right;
      overflow: hidden;
      white-space: nowrap;
    }
  }
  &:hover .guide, &:active .guide {
    animation: guide 0.5s forwards ease;
    animation-delay: 1.25s;
    .instruction {
      animation: instruction 0.75s forwards ease;
      animation-delay: 1.5s;
    }
    &.first-hover {
      animation-delay: .25s;
      .instruction {
        animation-delay: .5s;
      }
    }
  }
}

@keyframes guide {
  100% {
    width: 300px;
  }
}

@keyframes instruction {
  0% {
    opacity: 0;
  }
  100% {
    width: 100%;
    opacity: 1;
  }
}
</style>
