<template>
  <div id="app">
    <nav-bar></nav-bar>
    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
    <project-info></project-info>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar';
import ProjectInfo from './ProjectInfo';

export default {
  name: 'app',
  components: {
    NavBar,
    ProjectInfo,
  },
};
</script>

<style lang="scss">
@import './components/styles/colors.scss';

body {
  background: $offWhite;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  div, svg {
    user-select: none;
  }
}
.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
