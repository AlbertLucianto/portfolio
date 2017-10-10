<template>
  <ul class="nav-item-list" :style="listStyle">
    <li class="nav-item" v-for="(item, index) in navItems" :key="index" :style="itemStyle(index)">
      <component :is="item" v-show="open"></component>
    </li>
  </ul>
</template>

<script>
import Profile from './NavItems/Profile';
import Tools from './NavItems/Tools';

const items = ['Profile', 'Tools'];
const navWidth = 250;
const offsetConstant = -50;

export default {
  components: {
    Profile,
    Tools,
  },
  props: {
    open: Boolean,
    curvePos: Object,
    curveHeight: Number,
  },
  data() {
    return {
      navItems: [...items],
    };
  },
  computed: {
    listStyle() {
      return {
        left: `${this.open ? 0 : -navWidth}px`,
      };
    },
    itemStyle() {
      return (idx) => {
        let offsetWidth = 0;
        let marginLeft = 0;
        const mid = (this.curvePos.y / ((window.innerHeight - 100) / items.length)) - 0.3;
        const offset = Math.abs(mid - idx);
        if (this.open) {
          marginLeft = this.curveHeight * (0.75 / (offset + 0.5));
        } else {
          offsetWidth = offset * (offsetConstant);
        }
        return {
          transform: `translateX(${offsetWidth}px)`,
          opacity: this.open ? 1 : 0,
          'margin-left': `${marginLeft}px`,
        };
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-item-list {
  position: absolute;
  z-index: 11;
  top: 0;
  transition: 100ms left ease;
  width: 250px;
  height: calc(100vh - 100px);
  margin-top: 0;
  padding: 0;
  list-style-type: none;
  display: flex;
  flex-flow: column wrap;
  justify-content: space-around;
  align-items: center;
  .nav-item {
    display: inline-block;
    transition: 1s opacity ease, 0.5s transform ease;
  }
}
</style>
