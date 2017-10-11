<template>
  <div ref="profile">
    <router-link to="/" class="link">
      <svg class="profile">
        <g :style="headStyle" class="head-container">
          <path class="hair" d="M69.16,6.89C82.68,15.65,82.68,40.19,74,67.16,66.67,89.64,22.5,98.78,12.41,77.4-.31,50.43-2.76,30.69,2.83,23.57,1.23-1,49.23-6,69.16,6.89Z"/>
          <path class="head" d="M40.76,99.5A27.3,27.3,0,0,1,21,91l-3.41-3.62A44.64,44.64,0,0,1,5.32,56.64V30.69A27,27,0,0,1,32.41,3.84H49.11A27,27,0,0,1,76.2,30.69V56.64A44.64,44.64,0,0,1,64,87.36L60.55,91A27.3,27.3,0,0,1,40.76,99.5Z"/>
          <path class="hair" d="M49.11,3.34H32.41A27.47,27.47,0,0,0,4.82,30.69l.4,23.75,6.39-29.29L73.1,36.23,76.3,56.82l.4-26.13A27.47,27.47,0,0,0,49.11,3.34Z"/>
        </g>
        <g :style="faceStyle">
          <circle cx="-20" cy="-5" r="5" class="eye"></circle>
          <circle cx="-22.5" cy="-7.5" r="2.5" class="pupil"></circle>
          <circle cx="20" cy="-5" r="5" class="eye"></circle>
          <circle cx="17.5" cy="-7.5" r="2.5" class="pupil"></circle>
          <path :d="mouthPath" class="mouth"></path>
        </g>
        <g :style="glassStyle">
          <rect x="-35" y="-15" width="30" height="20" rx="5" ry="5" class="glass"/>
          <rect x="5" y="-15" width="30" height="20" rx="5" ry="5" class="glass"/>
          <line x1="-5" y1="-12.5" x2="5" y2="-12.5" class="glass"/>
        </g>
        <circle :cx="headPos.x" :cy="headPos.y" r="50" class="head-helper" @mousemove="moveFace" @mouseout="endMoveFace"></circle>
      </svg>
      <div class="text">About Me</div>
    </router-link>
  </div>
</template>

<script>
import dynamics from 'dynamics.js';

const startPos = { x: 55, y: 62.5 };
const dampMove = { x: 10, y: 10 };
const headPosAdjust = { x: -38, y: -57 };

export default {
  data() {
    return {
      over: false,
      facePos: { ...startPos },
      glassPos: { ...startPos },
      headPos: { ...startPos },
      firstEnter: true,
    };
  },
  computed: {
    faceStyle() {
      return {
        transform: `translate3d(${this.facePos.x}px, ${this.facePos.y}px, 0) scale(0.9)`,
      };
    },
    glassStyle() {
      return {
        transform: `translate3d(${this.glassPos.x}px, ${this.glassPos.y}px, 0) scale(0.9)`,
      };
    },
    headStyle() {
      return {
        transform: `translate3d(${this.headPos.x + headPosAdjust.x}px, ${this.headPos.y + headPosAdjust.y}px, 0) scale(0.925)`,
      };
    },
    mouthPath() {
      return `
      M -10, 20
      A 12.5 ${this.over ? 10 : 7.5} 0 0 0 10 20
      ${this.over ? '' : 'A 15 7.5 0 0 1 -10 20'}
      Z
      `;
    },
  },
  methods: {
    moveFace(e) {
      const evt = e.changedTouches ? e.changedTouches[0] : e;
      const rect = this.$refs.profile.getBoundingClientRect();
      const center = {
        x: (rect.left + rect.right) / 2,
        y: (rect.top + rect.bottom) / 2,
      };
      const newHeadPosX = startPos.x + ((evt.pageX - center.x) / dampMove.x);
      const newHeadPosY = startPos.y + ((evt.pageY - center.y) / dampMove.y);
      const newFacePosX = startPos.x + ((evt.pageX - center.x) / (dampMove.x / 2));
      const newFacePosY = startPos.y + ((evt.pageY - center.y) / (dampMove.y / 2));
      const newGlassPosX = startPos.x + ((evt.pageX - center.x) / (dampMove.x / 2.25));
      const newGlassPosY = startPos.y + ((evt.pageY - center.y) / (dampMove.y / 2.25));
      if (this.firstEnter) {
        setTimeout(() => {
          this.firstEnter = false;
        }, 75);
        if (!this.over) {
          dynamics.animate(this.facePos, {
            x: newFacePosX,
            y: newFacePosY,
          }, {
            type: dynamics.easeOut,
            duration: 75,
            friction: 50,
          });
          dynamics.animate(this.glassPos, {
            x: newGlassPosX,
            y: newGlassPosY,
          }, {
            type: dynamics.easeOut,
            duration: 75,
            friction: 50,
          });
          dynamics.animate(this.headPos, {
            x: newHeadPosX,
            y: newHeadPosY,
          }, {
            type: dynamics.easeOut,
            duration: 75,
            friction: 50,
          });
        }
        this.over = true;
      } else {
        dynamics.stop(this.facePos);
        dynamics.stop(this.headPos);
        dynamics.stop(this.glassPos);
        this.over = true;
        this.headPos.x = newHeadPosX;
        this.headPos.y = newHeadPosY;
        this.facePos.x = newFacePosX;
        this.facePos.y = newFacePosY;
        this.glassPos.x = newGlassPosX;
        this.glassPos.y = newGlassPosY;
      }
    },
    endMoveFace() {
      this.over = false;
      this.firstEnter = true;
      dynamics.animate(this.facePos, {
        x: startPos.x,
        y: startPos.y,
      }, {
        type: dynamics.easeOut,
        duration: 500,
        friction: 50,
      });
      dynamics.animate(this.glassPos, {
        x: startPos.x,
        y: startPos.y,
      }, {
        type: dynamics.easeOut,
        duration: 500,
        friction: 50,
      });
      dynamics.animate(this.headPos, {
        x: startPos.x,
        y: startPos.y,
      }, {
        type: dynamics.easeOut,
        duration: 500,
        friction: 50,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/colors.scss';

.profile {
  width: 110px;
  height: 110px;
  margin: 20px;
  margin-bottom: 0;
  text-align: center;
  cursor: pointer;
  .head-container {
    position: absolute;
    .head {
      fill: $yellow;
    }
    .hair {
      fill: $black;
    }
  }
  .eye {
    fill: $black;
  }
  .pupil {
    fill: $white;
  }
  .mouth {
    stroke: $black;
    stroke-width: 2px;
    fill: $black;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  .head-helper {
    fill: $white;
    opacity: 0;
    stroke-width: 0;
  }
  .glass {
    fill: none;
    stroke-width: 2.5px;
    stroke: $purple;
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
