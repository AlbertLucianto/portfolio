<template>
  <div class="projectPage__container">
    <div class="title">Projects</div>
    <div class="background__hollow">Software Projects</div>
    <div class="horizontalList__container" ref="scrollView">
      <div class="horizontalList__wrapper">
        <project-card v-for="(project, idx) in projects" :style="idx | getCardStyle" :stacks="project.stacks"
          :key="idx" :title="project.title" :description="project.description" :links="project.links"
          :detail="project.detail" :imageUrl="project.imageUrl" :imgSize="project.imgSize"
          :imageHoverUrl="project.imageHoverUrl" :backgroundColor="project.backgroundColor"/>
      </div>
    </div>
  </div>
</template>

<script>
import ProjectCard from './ProjectCard';
import projects from './data';

export default {
  components: {
    ProjectCard,
  },
  data() {
    return {
      projects,
    };
  },
  filters: {
    getCardStyle(idx) {
      return {
        transform: `translateY(${idx % 2 === 0 ? -50 : 50}px)`,
      };
    },
  },
  methods: {
    horizontalScroll(e) {
      const delta = e.wheelDelta;
      this.$refs.scrollView.scrollLeft -= delta;
      e.preventDefault();
    },
  },
  mounted() {
    window.addEventListener('wheel', this.horizontalScroll);
  },
  beforeDestroy() {
    window.removeEventListener('wheel', this.horizontalScroll);
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/colors.scss';

.projectPage__container {
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  background: $black;
  display: flex;
  align-items: center;
  .title {
    color: $white;
    font-weight: 600;
    font-size: 36px;
    position: fixed;
    top: 70px;
    left: 180px;
  }
  .background__hollow {
    position: fixed;
    color: white;
    font-size: 250px;
    font-weight: 800;
    width: 1000px;
    line-height: 90%;
    bottom: -10px;
    right: 0;
    text-align: right;
    opacity: .1;
    pointer-events: none;
  }
  .horizontalList__container {
    overflow-x: auto;
    border-bottom: 2px solid $purple;
    &::-webkit-scrollbar {
      height: 10px;
      width: 0;
    }
    &::-webkit-scrollbar-thumb {
      background: $purple;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      &:hover {
        background: $warmRed;
      }
    }
  }
  .horizontalList__wrapper {
    box-sizing: border-box;
    padding: 50px;
    height: 720px;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
  }
}

</style>
