<template>
  <div id="app">
    <nav-bar></nav-bar>
    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar';

export default {
  name: 'app',
  components: {
    NavBar,
  },
};
</script>

<style lang="scss">
@import './components/styles/colors.scss';

body {
  background: $purple;
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
  transition: all .3s ease;
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
