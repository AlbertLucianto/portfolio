<template>
  <div>
    <h1 class="main-title" :style="slideStyle(0.5)" :class="{ fade: !transitioning || !opened }">Organisations</h1>
    <div class="modal-wrapper" :class="{ fade: !transitioning || !opened }" ref="wrapper" :style="wrapperStyle">
      <div class="modal-card" v-for="(organisation, idx) in organisations" :key="idx" :style="slideStyle(idx)" :class="{ 'no-event': transitioning && !opened }">
        <card-template colorIn="#F7F9FF" colorOut="#DBDBDB">
          <template scope="props">
            <div :style="props.getTransform(titleTransform)" class="position">{{ organisation.position }}</div>
            <div class="title" :style="props.getTransform(titleTransform)">{{ organisation.name }}</div>
            <h3 class="year" :style="props.getTransform(titleTransform)">{{ organisation.year }}</h3>
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
      organisations: [
        {
          name: 'ICN Cultural Production, 10th Management Committee',
          position: 'Director of IT and Ticketing',
        },
        {
          name: 'Nanyang Technological University Students\' Union',
          position: 'IT Officer',
        },
        {
          name: 'ICN Cultural Production, 9th Management Committee',
          position: 'Web Developer',
        },
        {
          name: 'Nanyang Technological University Students\' Union, 26th Management Committee',
          position: 'Corporate Communications Design Director',
        },
        {
          name: 'IUC Freshmen Orientation Camp, 19th Management Committee',
          position: 'Publications, Publicity and IT Committee Director',
        },
        {
          name: 'NTU Indonesian Students\' Association, 14th Management Committee',
          position: 'Head of Yearbook Division',
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
  will-change: transform;
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
    .position {
      width: 240px;
      margin: auto;
      font-size: 32px;
      font-weight: 600;
      padding-top: 100px;
      background-position: 50% 50%;
      background-repeat: no-repeat;
      background-size: contain;
      pointer-events: none;
      will-change: transform;
    }
    .title {
      pointer-events: none;
      width: 240px;
      margin: auto;
      margin-top: 10px;
      font-size: 16px;
      color: $black;
      border-radius: 5px;
      will-change: transform;
    }
    .year {
      position: absolute;
      font-size: 32px;
      bottom: 175px;
      left: 60px;
      margin: 0;
      margin-left: 2.5px;
      text-align: left;
      color: $black;
      pointer-events: none;
      will-change: transform;
    }
    .period {
      position: absolute;
      font-size: 56px;
      bottom: 100px;
      left: 60px;
      margin: 0;
      text-align: left;
      color: $grey;
      pointer-events: none;
      will-change: transform;
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


