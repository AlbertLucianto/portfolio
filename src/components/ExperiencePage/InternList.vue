<template>
  <div>
    <h1 class="main-title" :style="slideStyle(0.5)" :class="{ fade: !transitioning || !opened }">Internships</h1>
    <div class="modal-wrapper" :class="{ fade: !transitioning || !opened }" ref="wrapper" :style="wrapperStyle">
      <div class="modal-card" v-for="(intern, idx) in interns" :key="idx" :style="slideStyle(idx)" :class="{ 'no-event': transitioning && !opened }">
        <card-template colorIn="#F7F9FF" colorOut="#DBDBDB">
          <template scope="props">
            <div :style="Object.assign(props.getTransform(titleTransform), {
                'background-image': `url(${intern.src})`
              })" class="logo"></div>
            <div class="position" :style="props.getTransform(titleTransform)">{{ intern.position }}</div>
            <h3 class="year" :style="props.getTransform(titleTransform)">{{ intern.year }}</h3>
            <h1 class="period" :style="props.getTransform(titleTransform)">{{ intern.period }}</h1>
          </template>
        </card-template>
      </div>
    </div>
    <div class="navigation-right">
      <arrow-button direction="right" v-if="showRight" :startClick="updateMoveLeft"></arrow-button>
    </div>
    <div class="navigation-left">
      <arrow-button direction="left" v-if="showLeft" :startClick="updateMoveRight"></arrow-button>
    </div>
  </div>
</template>

<script>
import dynamics from 'dynamics.js';
import CardTemplate from '../reusable/CardTemplate';
import ArrowButton from '../reusable/ArrowButton';

const moveConstant = 450;
const panTreshold = -100;

export default {
  components: {
    CardTemplate,
    ArrowButton,
  },
  props: {
    transitioning: Boolean,
    opened: Boolean,
  },
  data() {
    return {
      panX: { value: 0 },
      pannable: 0,
      currentInv: undefined,
      interns: [
        {
          name: 'SAP',
          position: 'Software Engineer Intern',
          src: 'https://vignette.wikia.nocookie.net/logopedia/images/1/13/SAP-Logo.png/revision/latest/scale-to-width-down/640?cb=20141014003217',
          year: 2017,
          period: 'Autumn',
        },
        {
          name: 'Sea',
          position: 'Full-Stack Engineer Intern',
          src: 'https://albertlucianto.github.io/images/sea-logo.png',
          year: 2017,
          period: 'Summer',
        },
        {
          name: 'Pinnacle Investment',
          position: 'Web Developer Intern',
          src: 'https://albertlucianto.github.io/images/pinnacle-logo.png',
          year: 2016,
          period: 'Summer',
        },
      ],
    };
  },
  computed: {
    titleTransform() {
      return 'translateZ(100px)';
    },
    slideStyle() {
      return idx => ({
        transform: this.opened && this.transitioning ? '' : `translateX(${(-125 * idx) - 50}px)`,
      });
    },
    wrapperStyle() {
      return {
        transform: `translateX(${this.panX.value}px)`,
      };
    },
    showRight() {
      return -this.panX.value < this.pannable - 5;
    },
    showLeft() {
      return -this.panX.value > 5;
    },
  },
  methods: {
    updateMoveLeft(e) {
      e.stopPropagation();
      const newPos = Math.max(this.panX.value - moveConstant, -this.pannable);
      dynamics.stop(this.panX);
      dynamics.animate(this.panX, {
        value: newPos,
      }, {
        type: dynamics.easeOut,
        duration: 200,
        friction: 50,
      });
    },
    updateMoveRight(e) {
      e.stopPropagation();
      const newPos = Math.min(this.panX.value + moveConstant, 0);
      dynamics.stop(this.panX);
      dynamics.animate(this.panX, {
        value: newPos,
      }, {
        type: dynamics.easeOut,
        duration: 200,
        friction: 50,
      });
    },
  },
  mounted() {
    this.$nextTick(() => {
      const wrapperRightPos = this.$refs.wrapper.getBoundingClientRect().right;
      this.pannable = wrapperRightPos - window.innerWidth - panTreshold;
    });
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/colors.scss';

.main-title {
  position: fixed;
  top: 40px;
  padding-left: 40px;
  color: $lightGrey;
  font-weight: 900;
  transition: .5s all ease;
  &.fade {
    opacity: 0;
  }
}
.modal-wrapper {
  display: flex;
  align-items: center;
  margin: auto;
  transition: .25s opacity ease;
  &.fade {
    opacity: 0;
  }
  .modal-card {
    margin: 30px;
    width: 450px;
    height: 700px;
    transition: .5s transform ease;
    &.no-event {
      pointer-events: none;
    }
    .logo {
      width: 120px;
      height: 60px;
      margin: auto;
      padding-top: 150px;
      background-position: 50% 50%;
      background-repeat: no-repeat;
      background-size: contain;
      pointer-events: none;
    }
    .position {
      pointer-events: none;
      width: 200px;
      padding: 20px;
      border: 1px solid $grey;
      margin: auto;
      margin-top: 40px;
      font-size: 20px;
      font-weight: 600;
      text-align: center;
      color: $black;
      border-radius: 10px;
    }
    .year {
      position: absolute;
      font-size: 32px;
      bottom: 175px;
      left: 60px;
      margin: 0;
      margin-left: 2.5px;
      text-align: left;
      color: $orange;
      pointer-events: none;
    }
    .period {
      position: absolute;
      font-size: 60px;
      bottom: 100px;
      left: 60px;
      margin: 0;
      text-align: left;
      color: $grey;
      pointer-events: none;
    }
  }
}
.navigation-right {
  position: fixed;
  right: 20px;
  top: 50vh;
}
.navigation-left {
  position: fixed;
  left: 20px;
  top: 50vh;
}
</style>


