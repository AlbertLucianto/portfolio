<template>
  <div class="experience-page">
    <div class="xp-container">
      <div class="overlay" :class="{ over }"></div>
      <div class="internships" @mouseover="overlayUp" @mouseout="overlayDown">
        <card-template>
          <template scope="props">
            <h1 class="title" :style="props.getTransform('translateZ(100px)')">Internships</h1>
          </template>
        </card-template>
      </div>
      <div class="projects" @mouseover="overlayUp" @mouseout="overlayDown">
        <card-template colorIn="#27CED6">
          <template scope="props">
            <h1 class="title" :style="props.getTransform('translateZ(100px)')">Projects</h1>
          </template>
        </card-template>
      </div>
    </div>
  </div>
</template>

<script>
import CardTemplate from './CardTemplate';

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
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: $offWhite;
  perspective-origin: 50% 50%;
  .xp-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: auto;
    width: 1200px;
    max-width: calc(100% - 80px);
    height: 100vh;
    .internships, .projects {
      margin: 20px;
      width: 400px;
      height: 600px;
      cursor: pointer;
      &:hover {
        z-index: 3;
        h1 {
          color: $white;
        }
      }
    }
    .title {
      position: absolute;
      font-size: 42px;
      left: 10px;
      top: 5px;
      margin: 0;
      text-align: left;
      color: $purple;
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
    background: linear-gradient(to left bottom, $black 50%, $warmRed 180%);
    transition: .4s opacity ease .2s;
    opacity: 0;
    &.over {
      transition: .25s opacity ease;
      opacity: .4;
    }
  }
}
</style>
