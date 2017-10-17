<template>
  <router-link to="/experience" class="link">
    <div class="experience-container" @mouseover="mouseOver" @mouseout="mouseOut">
      <svg class="experience" v-for="layer in layers" :key="layer" :style="bodyStyle(layer)">
        <g class="suitcase">
          <rect x="-15" y="-35" width="30" height="30" rx="5" ry="5" class="handle" v-if="layer === Math.floor(layers.length / 2)"></rect>
          <rect x="-48" y="-25" width="96" height="72" rx="10" ry="10" class="suitcase-body" :class="{ over }"></rect>
        </g>
      </svg>
      <svg class="buildings" :class="{ over }">
        <path :d="building0" class="building-0" :class="{ hidden: !over }"></path>
        <path :d="building1" class="building-1" :class="{ hidden: !over }"></path>
        <path :d="building2" class="building-2" :class="{ hidden: !over }"></path>
      </svg>
    </div>
    <div class="text">Experience</div>
  </router-link>
</template>

<script>
import dynamics from 'dynamics.js';

const buildingPos = [
  {
    startY: { left: 90, right: 90 },
    endY: { left: 5, right: 20 },
  },
  {
    startY: { left: 90, right: 90 },
    endY: { left: 35, right: 35 },
  },
  {
    startY: { left: 95, right: 95 },
    endY: { left: 50, right: 60 },
  },
];

export default {
  data() {
    return {
      layers: [...Array(3).keys()],
      over: false,
      squish: false,
      timer: undefined,
      buildingHeight: buildingPos.map(pos => Object.assign({}, pos.startY)),
    };
  },
  computed: {
    bodyStyle() {
      return idx => ({
        transform: this.over ? `rotateY(360deg) rotateX(-110deg) translateZ(${45 - ((idx) * (this.squish ? 0 : 7.5))}px)` : 'none',
      });
    },
    building0() {
      return `
      M 40 90
      H 65
      V ${this.buildingHeight[0].right}
      L 40 ${this.buildingHeight[0].left}
      Z
      `;
    },
    building1() {
      return `
      M 50 90
      H 80
      V ${this.buildingHeight[1].left}
      H 50
      Z
      `;
    },
    building2() {
      return `
      M 30 95
      H 65
      L 60 ${this.buildingHeight[2].right}
      L 30 ${this.buildingHeight[2].left}
      Z
      `;
    },
  },
  methods: {
    mouseOver() {
      this.over = true;
      this.timer = setTimeout(() => {
        this.squish = true;
      }, 500);
      this.buildingHeight.forEach((height, idx) => {
        dynamics.setTimeout(() => {
          dynamics.animate(height, {
            left: buildingPos[idx].endY.left,
            right: buildingPos[idx].endY.right,
          }, {
            type: dynamics.easeInOut,
            duration: 300,
            friction: 50,
          });
        }, 600 - (idx * 150));
      });
    },
    mouseOut() {
      clearTimeout(this.timer);
      this.over = false;
      this.squish = false;
      this.buildingHeight.forEach((height, idx) => {
        dynamics.setTimeout(() => {
          dynamics.stop(height);
          dynamics.animate(height, {
            left: buildingPos[idx].startY.left,
            right: buildingPos[idx].startY.right,
          }, {
            type: dynamics.easeInOut,
            duration: 250,
            friction: 50,
          });
        }, idx * 50);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/colors.scss';

.experience-container {
  position: relative;
  margin: 20px;
  perspective: 300px;
  width: 110px;
  height: 110px;
  .experience {
    pointer-events: none;
    position: absolute;
    left: 0;
    top: 0;
    width: 110px;
    height: 110px;
    text-align: center;
    transition: .5s all ease-in-out;
    perspective-origin: 50% 50%;
    .suitcase {
      position: absolute;
      transform: translate(55px, 55px);
      .suitcase-body {
        transition: .5s fill ease;
        fill: $grey;
        &.over {
          fill: $purple;
        }
      }
      .handle {
        fill: none;
        stroke: $black;
        stroke-width: 5px;
      }
    }
  }
  .buildings {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    transform: translateY(-2.5px);
    transition: .25s transform ease;
    &.over {
      transform: translateY(5px);
      transition: .25s transform ease .65s;
    }
    .building-0 {
      transition: 1.25s opacity ease;
      fill: $aqua;
    }
    .building-1 {
      transition: 1.25s opacity ease;
      fill: $warmRed;
    }
    .building-2 {
      transition: 1.25s opacity ease;
      fill: $yellow;
    }
    .hidden {
      transition: .2s opacity ease .2s;
      opacity: 0;
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

</style>
