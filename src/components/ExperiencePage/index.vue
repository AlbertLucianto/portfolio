<template>
  <div class="experience-page">
    <div class="xp-container">
      <div class="internships">
        <card>
          <h1 slot="title" class="title">Internships</h1>
        </card>
      </div>
      <div class="projects">
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
    };
  },
  computed: {
    cardStyle() {},
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
    }
    .title {
      font-size: 42px;
      transform: translateY(-5px);
      margin: 0;
      color: $purple;
    }
  }
}
</style>
