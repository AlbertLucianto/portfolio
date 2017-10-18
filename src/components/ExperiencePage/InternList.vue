<template>
  <div>
    <h1 class="main-title" :style="slideStyle(0.5)" :class="{ fade: !transitioning || !opened }">Internships</h1>
    <div class="modal-wrapper" :class="{ fade: !transitioning || !opened }" ref="wrapper" :style="wrapperStyle">
      <div class="modal-card" v-for="(intern, idx) in interns" :key="idx" :style="slideStyle(idx)">
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
    <arrow-button direction="right" v-if="showRight"
      :mouseOver="updateMoveLeft" :mouseOut="stopUpdate"></arrow-button>
    <arrow-button direction="left" v-if="showLeft"
      :mouseOver="updateMoveRight" :mouseOut="stopUpdate"></arrow-button>
  </div>
</template>

<script>
import CardTemplate from '../reusable/CardTemplate';
import ArrowButton from './ArrowButton';

const moveConstant = 5;
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
      panX: 0,
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
        transform: this.opened && this.transitioning ? '' : `translateX(${-150 * idx}px)`,
      });
    },
    wrapperStyle() {
      return {
        transform: `translateX(${this.panX}px)`,
      };
    },
    showRight() {
      return -this.panX < this.pannable;
    },
    showLeft() {
      return -this.panX > 0;
    },
  },
  watch: {
    showRight(val) {
      if (!val) {
        this.stopUpdate();
      }
    },
    showLeft(val) {
      if (!val) {
        this.stopUpdate();
      }
    },
  },
  methods: {
    updateMoveLeft() {
      let inc = 0;
      this.currentInv = setInterval(() => {
        this.panX -= (moveConstant + inc);
        inc += 0.05;
      }, 5);
    },
    updateMoveRight() {
      let inc = 0;
      this.currentInv = setInterval(() => {
        this.panX += (moveConstant + inc);
        inc += 0.05;
      }, 5);
    },
    stopUpdate() {
      clearInterval(this.currentInv);
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
  padding-left: 25px;
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
</style>


