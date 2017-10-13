<template>
  <div class="experience-page">
    <div class="xp-container">
      <div class="overlay" :class="{ over }"></div>
      <div class="internships" @mouseover="overlayUp" @mouseout="overlayDown">
        <card>
          <h1 slot="title" class="title">Internships</h1>
        </card>
      </div>
      <div class="projects" @mouseover="overlayUp" @mouseout="overlayDown">
        <card>
          <h1 slot="title" class="title">Projects</h1>
        </card>
      </div>
    </div>
  </div>
</template>

<script>
import Card from './Card';

export default {
  components: {
    Card,
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
      width: 600px;
      height: 400px;
      cursor: pointer;
      &:hover {
        z-index: 3;
      }
    }
    .title {
      font-size: 42px;
      transform: translateY(-5px);
      margin: 0;
      text-align: left;
      color: $purple;
      border-bottom: 3px solid $purple;
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
    background: $black;
    transition: .4s opacity ease .2s;
    opacity: 0;
    &.over {
      transition: .25s opacity ease;
      opacity: .3;
    }
  }
}
</style>
