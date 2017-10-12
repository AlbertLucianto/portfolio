<template>
  <div>
    <router-link to="/" class="link">
      <svg class="landing">
        <g :class="{ over }" class="stars-front">
          <circle v-for="(star, index) in starsFront" :key="index" class="star"
            :cx="star.pos.x" :cy="star.pos.y" :r="Math.abs(star.r)"></circle>
        </g>
        <g :class="{ over }" class="stars-back">
          <circle v-for="(star, index) in starsBack" :key="index" class="star"
            :cx="star.pos.x" :cy="star.pos.y" :r="star.r"></circle>
        </g>
        <circle cx="55" cy="170" r="80" class="planet" :class="{ over }"></circle>
        <g class="rocket" :class="{ over }">
          <ellipse class="fin rear" :class="{ over }" cx="35.03" cy="80.43" rx="3.23" ry="16.13"/>
          <path class="fin left" :class="{ over }" d="M13,66.62A18.89,18.89,0,0,0,2.53,94a18.89,18.89,0,0,1,16.3-9.45A61.58,61.58,0,0,1,13,66.62Z"/>
          <path class="body" d="M35,0C74.67,42.47,51.16,84.61,51.16,84.68c-7.72,3.23-26.53,2.54-32.27,0C18.81,84.64-4.61,42.47,35,0Z"/>
          <path class="fin right" :class="{ over }" d="M57,66.62A18.89,18.89,0,0,1,67.47,94a18.89,18.89,0,0,0-16.3-9.45A61.58,61.58,0,0,0,57,66.62Z"/>
          <ellipse class="fin mid" :class="{ over }" cx="35.03" cy="80.43" rx="3.23" ry="16.13"/>
          <circle class="window" :class="{ over }" cx="35" cy="40" r="10"></circle>
          <path class="head" d="M35,0A90.88,90.88,0,0,0,19,23.28H51.09A90.74,90.74,0,0,0,35,0Z"/>
        </g>
        <rect width="110" height="110" class="landing-helper" @mouseover="animateIn" @mouseout="animateOut"></rect>
      </svg>
      <div class="text">Welcome</div>
    </router-link>
  </div>
</template>

<script>
const numFrontStars = 5;
const numBackStars = 5;
const rFront = 3;
const rBack = 2;
const getRandomArbitrary = (min, max) => (Math.random() * (max - min)) + min;

export default {
  data() {
    return {
      over: false,
      starsFront: new Array(numFrontStars).fill({}).map(() => ({
        pos: {
          x: getRandomArbitrary(10, 100),
          y: getRandomArbitrary(20, 100),
        },
        r: rFront,
      })),
      starsBack: new Array(numBackStars).fill({}).map(() => ({
        pos: {
          x: getRandomArbitrary(10, 100),
          y: getRandomArbitrary(20, 90),
        },
        r: rBack,
      })),
    };
  },
  methods: {
    animateIn() {
      this.over = true;
    },
    animateOut() {
      this.over = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/colors.scss';

.landing {
  width: 110px;
  height: 110px;
  margin: 20px;
  margin-top: 15px;
  margin-bottom: 5px;
  .rocket {
    transition: 300ms all ease;
    transform: translate(20px, 7.5px) scale(1.05);
    transform-origin: 50% 50%;
    .body {
      fill: $lightGrey;
    }
    .fin {
      fill: $purple;
      transition: .2s transform ease;
      &.over {
        &.left {
          transform: scaleX(0.8) translateX(5px);
          transform-origin: 50% 50%;
        }
        &.right {
          transform: scaleX(0.8) translateX(-2.5px);
          transform-origin: 50% 50%;
        }
        &.mid {
          transform: translateX(-7.5px);
          transform-origin: 50% 50%;
        }
        &.rear {
          transform: translate(5px, -10px);
          transform-origin: 50% 50%;
        }
      }
    }
    .head {
      fill: $orange;
    }
    .window {
      fill: $white;
      stroke: $aqua;
      stroke-width: 3px;
      transition: .2s transform ease;
      &.over {
        transform: scaleX(0.8) translateX(-5px);
        transform-origin: 50% 50%;
      }
    }
    &.over {
      animation: rocket-over .6s forwards ease;
    }
  }
  .planet {
    fill: $grey;
    transition: 300ms transform ease;
    transform: translateY(30px);
    &.over {
      transition: .75s transform ease 100ms;
      transform: translateY(0);
    }
  }
  .star {
    fill: $yellow;
  }
  .landing-helper {
    opacity: 0;
  }
  .stars-front {
    transition: .75s transform ease 100ms, .25s opacity ease .25s;
    opacity: 0;
    &.over {
      transition: 1s transform ease 100ms, 500ms opacity ease;
      transform: translateY(-25px);
      opacity: 1;
    }
  }
  .stars-back {
    transition: .75s transform ease 100ms, .25s opacity ease .25s;
    opacity: 0;
    &.over {
      transition: 1s transform ease 100ms, 500ms opacity ease;
      transform: translateY(-15px);
      opacity: 1;
    }
  }
}
.link {
  &:link, &:visited, &:active {
    text-decoration: none;
    .text {
      color: $black;
      font-weight: 700;
      transition: 250ms color ease;
    }
  }
  &:hover .text {
    color: $warmRed;
  }
}

@keyframes rocket-over {
  25% {
    transform: translate(20px) scale(0.9);
  }
  100% {
    transform: translate(20px, 8.5px) scale(0.9);
  }
}
</style>
