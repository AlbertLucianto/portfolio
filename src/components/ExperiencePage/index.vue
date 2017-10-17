<template>
  <div class="experience-page">
    <div class="xp-container">
      <div class="xp-wrapper">
        <div class="overlay" :class="{ over }"></div>
        <div class="internships" @mouseover="overlayUp" @mouseout="overlayDown">
          <card-template>
            <template scope="props">
              <h1 class="title" :style="props.getTransform('translateZ(100px)')">Internships</h1>
              <div class="content" :style="props.getTransform('translateZ(50px)')"></div>
            </template>
          </card-template>
        </div>
        <div class="projects" @mouseover="overlayUp" @mouseout="overlayDown">
          <card-template colorIn="#27CED6">
            <template scope="props">
              <h1 class="title" :style="props.getTransform('translateZ(100px)')">Projects</h1>
              <div class="content" :style="props.getTransform('translateZ(50px)')"></div>
            </template>
          </card-template>
        </div>
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
  data() {
    return {
      interns: [],
      projects: [],
      over: false,
    };
  },
  computed: {
    cardStyle() {},
  },
  methods: {
    overlayUp() {
      this.over = true;
    },
    overlayDown() {
      this.over = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/colors.scss';

.experience-page {
  position: fixed;
  display: table;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: $offWhite;
  .xp-container {
    margin: 20px;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }
  .xp-wrapper {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: auto;
    width: 1200px;
    max-width: calc(100% - 80px);
    .internships, .projects {
      margin: 20px;
      width: 400px;
      height: 600px;
      cursor: pointer;
      .title {
        position: absolute;
        font-size: 42px;
        top: 50px;
        left: 50px;
        margin: 0;
        text-align: left;
        color: $white;
        pointer-events: none;
      }
      .content {
        position: absolute;
        background: $white;
        width: 300px;
        height: 400px;
        top: 120px;
        border-radius: 5px;
        pointer-events: none;
        box-shadow: -5px 5px 15px rgba(0,0,0,0.1);
      }
      &:hover {
        z-index: 3;
        .title-not-set-for-now {
          font-size: 64px;
          top: unset;
          left: unset;
          bottom: 50px;
          left: 0;
        }
      }
    }
  }
  .overlay {
    pointer-events: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 2;
    background: linear-gradient(to left bottom, $black 50%, $warmRed 160%);
    transition: .4s opacity ease .2s;
    opacity: 0;
    &.over {
      transition: .25s opacity ease;
      opacity: .25;
    }
  }
}
</style>
