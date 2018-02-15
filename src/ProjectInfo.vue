<template>
  <div class="project-info" @mouseleave="endOver">
    <div class="project-info-icon" @mouseenter="startOver" @click="firstClose"
      :class="{ over, 'cursor-pointer': first }">i</div>
    <transition name="slide-fade">
      <div class="project-info-description" v-if="over">
        This project is for pacticing on animations and user interactions, which are built using 
        <a href="https://vuejs.org/">Vue.js</a>, <a href="https://router.vuejs.org/en/">Vue Router</a>, and <a href="http://dynamicsjs.com/">dynamics.js</a>.<br>
        All assets, animations, and interactions here are custom made,
        including all reusable components you may encounter during the Tour.<br>
        <!-- <i>Sadly it's not very responsive, but I hope you enjoy it!</i> -->
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      over: true,
      first: true,
    };
  },
  methods: {
    startOver() {
      this.over = true;
    },
    endOver() {
      this.over = false;
    },
    firstClose() {
      if (this.first) {
        this.over = false;
        this.first = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import './components/styles/colors.scss';

.project-info {
  position: fixed;
  display: flex;
  flex-direction: row-reverse;
  top: 40px;
  right: 40px;
  user-select: none;
  cursor: default;
  .project-info-description {
    text-align: left;
    font-size: 15px;
    width: 300px;
    padding: 15px;
    padding-bottom: 20px;
    margin: 0 20px;
    background: $white;
    top: 0;
    right: 50px;
    border-radius: 2px;
    box-shadow: 0 15px 45px rgba(0,0,0,0.15);
    transition: all .3s ease;
    br {
      display: block;
      margin: 10px;
      line-height:22px;
      content: " ";
    }
    a:link , a:visited {
      font-weight: 600;
      text-decoration: none;
      color: $purple;
    }
  }
  .project-info-icon {
    width: 20px;
    height: 20px;
    font-size: 16px;
    font-weight: 900;
    color: $white;
    border-radius: 50%;
    box-shadow: 0 3px 15px rgba(0,0,0,0.1);
    // text-shadow: 0 3px 15px rgba(0,0,0,0.2);
    background: $purple;
    border: 2px solid $white;
    transition: all .2s ease;
    &.over {
      border: 2px solid rgba(247, 249, 255, 0);
      background: $white;
      color: $purple;
    }
    &.cursor-pointer {
      cursor: pointer;
    }
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
