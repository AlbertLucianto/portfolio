<template>
  <div>
    <h1 class="main-title">Internships</h1>
    <div class="modal-wrapper" :class="{ fade: !transitioning || !opened }" ref="wrapper">
      <div class="modal-card" v-for="(intern, idx) in interns" :key="idx" :style="modalStyle(idx)">
        <card-template colorIn="#F7F9FF" colorOut="#DBDBDB">
          <template scope="props">
            <div :style="Object.assign(props.getTransform(titleTransform), {
                'background-image': `url(${intern.src})`
              })" class="logo"></div>
            <h3 class="year" :style="props.getTransform(titleTransform)">{{ intern.year }}</h3>
            <h1 class="period" :style="props.getTransform(titleTransform)">{{ intern.period }}</h1>
          </template>
        </card-template>
      </div>
      <div class="right-arrow">
        <svg>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import CardTemplate from '../reusable/CardTemplate';

export default {
  components: {
    CardTemplate,
  },
  props: {
    transitioning: Boolean,
    opened: Boolean,
  },
  data() {
    return {
      interns: [
        {
          name: 'SAP',
          title: 'Software Engineer Intern',
          src: 'https://vignette.wikia.nocookie.net/logopedia/images/1/13/SAP-Logo.png/revision/latest/scale-to-width-down/640?cb=20141014003217',
          year: 2017,
          period: 'Autumn',
        },
        {
          name: 'Sea',
          title: 'Full-Stack Engineer Intern',
          src: 'https://albertlucianto.github.io/images/sea-logo.png',
          year: 2017,
          period: 'Summer',
        },
        {
          name: 'Pinnacle Investment',
          title: 'Web Developer Intern',
          src: 'https://albertlucianto.github.io/images/pinnacle-logo.png',
          year: 2016,
          period: 'Summer',
        },
        {
          name: 'SAP',
          title: 'Software Engineer Intern',
          src: 'https://vignette.wikia.nocookie.net/logopedia/images/1/13/SAP-Logo.png/revision/latest/scale-to-width-down/640?cb=20141014003217',
          year: 2017,
          period: 'Autumn',
        },
        {
          name: 'Sea',
          title: 'Full-Stack Engineer Intern',
          src: 'https://albertlucianto.github.io/images/sea-logo.png',
          year: 2017,
          period: 'Summer',
        },
      ],
    };
  },
  computed: {
    titleTransform() {
      return 'translateZ(100px)';
    },
    modalStyle() {
      return idx => ({
        transform: this.opened && this.transitioning ? '' : `translateX(${-150 * idx}px)`,
      });
    },
  },
  mounted() {
    this.$nextTick(() => {
      console.log(window.innerWidth);
      console.log(this.$refs.wrapper.getBoundingClientRect().right);
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
    margin: 20px;
    width: 450px;
    height: 700px;
    transition: .5s transform ease;
    .logo {
      width: 120px;
      height: 120px;
      margin: auto;
      padding-top: 100px;
      background-position: 50% 50%;
      background-repeat: no-repeat;
      background-size: contain;
      pointer-events: none;
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
.right-arrow {
  position: fixed;
  width: 60px;
  height: 60px;
  right: 10px;
  top: calc(50vh - 30px);
  background: rgba(0,0,0,0.2);
  border-radius: 50%;
}
</style>


