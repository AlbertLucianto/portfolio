<template>
  <div class="project-info" @mouseleave="endOver">
      <div class="project-info-icon" @mouseenter="startOver" :class="{ over }">i</div>
      <transition name="slide-fade">
        <div class="project-info-description" v-if="over">
          This project is mainly focus on experimental animations and user interactions,
          so I tried to limit the libraries used, which are
          <a href="https://vuejs.org/">VueJS</a>, <a href="https://router.vuejs.org/en/">Vue Router</a>, and <a href="http://dynamicsjs.com/">dynamics.js</a>.<br>
          In other words, all assets, animations, and interactions you see here are made by myself,
          including all reusable components you may encounter during the Tour.<br>
          <i>Sadly, it's not very responsive, but I hope you enjoy it!</i>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      over: false,
    };
  },
  methods: {
    startOver() {
      this.over = true;
    },
    endOver() {
      this.over = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/colors.scss';

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
    padding-bottom: 25px;
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
    width: 32px;
    height: 32px;
    font-size: 24px;
    font-weight: 900;
    color: $white;
    border-radius: 50%;
    border: 2px solid $white;
    transition: all .2s ease;
    &.over {
      border: 2px solid rgba(247, 249, 255, 0);
      background: $white;
      color: $purple;
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
