<template>
  <div>
    <div class="project__card" @mouseenter="showDescription"
      @mouseleave="hideDescription" :style="cardStyle">
      <div class="image__wrapper">
        <img :src="imageUrl" class="project__image" :class="imgSize || ''"/>
      </div>
      <div class="title">{{ title }}</div>
      <div class="description">{{ description }}</div>
      <div class="hoveredDescription__wrapper">
        <transition name="slide">
          <div class="hoveredDescription" v-if="show">
            <div class="text" :class="{ show: showText }">{{ detail }}</div>
            <div class="links__container" :class="{ show: showText }">
              <a class="link" v-for="(link, idx) in links" :href="link.url"
                :key="idx" :style="linkStyle">{{ link.name }}</a>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import colors from '../styles/colors';

const SHOW_TEXT_DELAY = 500; // ms

export default {
  props: {
    title: String,
    description: String,
    detail: String,
    imageUrl: String,
    imageHoverUrl: String,
    backgroundColor: String,
    imgSize: String,
    links: Array,
  },
  computed: {
    cardStyle() {
      return {
        background: this.backgroundColor || colors.black,
      };
    },
    listLinks() {
      return this.links || [];
    },
    linkStyle() {
      return {
        background: this.backgroundColor || colors.white,
        'box-shadow': `0 4px 15px -5px ${this.backgroundColor || colors.white}`,
      };
    },
  },
  data() {
    return {
      show: false,
      timeoutId: undefined,
      showText: false,
    };
  },
  methods: {
    showDescription() {
      this.show = true;
      this.timeoutId = setTimeout(() => {
        this.showText = true;
      }, SHOW_TEXT_DELAY);
    },
    hideDescription() {
      this.show = false;
      clearTimeout(this.timeoutId);
      this.showText = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/colors.scss';

.project__card {
  width: 500px;
  min-width: 500px;
  height: 300px;
  background: $orange;
  position: relative;
  margin: 100px;
  border-radius: 8px;
  box-shadow: -5px 10px 45px -15px black;
  transition: transform .3s ease;
  .image__wrapper {
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40%;
    height: 100%;
    transition: margin-right .3s ease .08s;
  }
  .project__image {
    max-width: 100%;
    max-height: 100%;
    transform: scale(1.1);
    box-shadow: -5px 10px 20px -2px rgba(0,0,0,.3);
    z-index: 5;
    &.large {
      max-width: 120%;
    }
  }
  .title {
    position: absolute;
    bottom: -25px;
    left: -30px;
    line-height: 90%;
    width: 300px;
    text-align: left;
    color: $white;
    font-weight: 600;
    font-size: 60px;
    transition: transform .3s ease .08s;
    z-index: 10;
    pointer-events: none;
  }
  .description {
    box-sizing: border-box;
    width: 55%;
    text-align: left;
    padding: 40px 30px;
    color: white;
    font-weight: 500;
  }
  .hoveredDescription__wrapper {
    position: absolute;
    top: -5px;
    left: -5px;
    bottom: -5px;
    right: -5px;
    border-radius: 8px;
    overflow: hidden;
  }
  .hoveredDescription {
    box-sizing: border-box;
    text-align: left;
    width: 100%;
    height: 100%;
    background: #444444;
    padding: 30px 40px;
    padding-right: 40%;
    font-size: 13px;
    .text {
      color: white;
      transition: opacity .3s ease;
      &:not(.show) {
        opacity: 0;
      }
    }
    .links__container {
      display: flex;
      transition: opacity .3s ease .1s;
      margin: 10px 0;
      .link {
        color: $white;
        font-weight: 500;
        font-size: 16px;
        padding: 5px 12px 7px 12px;
        border-radius: 20px;
        text-decoration: none;
        margin-right: 5px;
      }
      &:not(.show) {
        opacity: 0;
      }
    }
  }
  &:hover {
    transform: scale(1.05);
    .title {
      transform: scale(1.05) translate(-3px, 2px);
    }
    .image__wrapper {
      margin-right: -50px;
    }
  }
}

.slide-enter-active {
  transition: transform .4s ease;
}
.slide-leave-active {
  transition: transform .7s ease;
}
.slide-enter {
  transform: translateX(100%);
}
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
