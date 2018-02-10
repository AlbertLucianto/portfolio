<template>
  <div class="experience-page">
    <div class="xp-container" @mousedown="closeModal">
      <div class="xp-wrapper" :class="{ blur: opened >= 0 }">
        <h3 class="xp-title" :class="{ inverted: overlayActive, blur: opened >= 0 }">Experience</h3>
        <div class="overlay" :class="{ over: overlayActive }"></div>
        <div class="log-book" v-for="(logBook, idx) in logBooks" :key="idx"
          :class="{ front: transitioning === idx && opened < 0 }"
          @mouseover="overlayUp" @mouseout="overlayDown" @mousedown="expandBook($event, idx)">
          <card-template :colorIn="logBook.colorIn">
            <template scope="props">
              <h1 class="title" :style="props.getTransform(titleTransform)">{{ logBook.name }}</h1>
              <div class="content-wrapper" :style="props.getTransform(contentWrapTransform)">
                <div class="content" :style="contentStyle(idx)">
                </div>
              </div>
            </template>
          </card-template>
        </div>
      </div>
    </div>
    <div class="modal-container" v-if="transitioning >= 0 || opened >= 0">
      <intern-list :transitioning="transitioning === 0" :opened="opened === 0"></intern-list>
    </div>
  </div>
</template>

<script>
import CardTemplate from '../reusable/CardTemplate';
import InternList from './InternList';

export default {
  components: {
    CardTemplate,
    InternList,
  },
  data() {
    return {
      logBooks: [
        {
          name: 'Internships',
          colorIn: '#EF548F',
        },
        {
          name: 'Organisations',
          colorIn: '#FFC127',
        },
      ],
      over: false,
      opened: -1,
      transitioning: -1,
      startRect: { left: 0, right: 0, top: 0, bottom: 0 },
    };
  },
  computed: {
    overlayActive() {
      return this.opened >= 0 || this.over || this.transitioning >= 0;
    },
    titleTransform() {
      return 'translateZ(100px)';
    },
    contentWrapTransform() {
      return 'translateZ(50px)';
    },
    contentStyle() {
      const targetX = (window.innerWidth / 15) + 475;
      const startX = (this.startRect.left + this.startRect.right) / 2;
      return num => ({
        transform: `${this.transitioning === num ? `translateX(${targetX - startX}px) scale3d(1.3, 1.75, 1) rotateY(180deg)` : ''}`,
        opacity: this.opened === num ? 0 : 1,
      });
    },
    modalStyle() {
      return (num, idx) => ({
        transform: this.opened === num ? '' : `translateX(${-275 * idx}px)`,
      });
    },
  },
  methods: {
    overlayUp() {
      this.over = true;
    },
    overlayDown() {
      this.over = false;
    },
    closeModal() {
      this.transitioning = -1;
      setTimeout(() => {
        this.opened = -1;
      }, 200);
    },
    expandBook(e, idx) {
      e.stopPropagation();
      const { left, right, top, bottom } = e.target.getBoundingClientRect();
      this.startRect = { left, right, top, bottom };
      this.transitioning = idx;
      setTimeout(() => {
        this.opened = idx;
      }, 450);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/colors.scss';

.experience-page {
  position: fixed;
  display: table;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: $offWhite;
  .xp-container {
    margin: 20px;
    padding-top: 50px;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    .xp-wrapper {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin: auto;
      width: 1200px;
      max-width: calc(100% - 80px);
      &.blur {
        pointer-events: none;
        .log-book {
          filter: blur(40px);
          transition: 1.5s filter ease;
        }
      }
      .log-book {
        transition: .3s filter ease;
        margin: 30px;
        min-width: 400px;
        height: 600px;
        cursor: pointer;
        .title {
          position: absolute;
          font-size: 42px;
          top: 50px;
          left: 50px;
          margin: 0;
          text-align: left;
          color: $white;
          pointer-events: none;
        }
        .content-wrapper {
          position: absolute;
          top: 120px;
          pointer-events: none;
          perspective: 800px;
          transform-origin: 50% 50%;
          .content {
            box-shadow: -5px 5px 15px rgba(0,0,0,0.1);
            background: $white;
            border-radius: 5px;
            width: 300px;
            height: 400px;
            transition: transform .4s ease-in, opacity .3s ease;
          }
        }
        &:hover, &.front {
          z-index: 3;
          .title-not-set-for-now {
            font-size: 64px;
            top: unset;
            left: unset;
            bottom: 50px;
            left: 0;
          }
        }
      }
    }
  }
  .modal-container {
    position: fixed;
    z-index: 4;
    left: calc(5vw + 175px);
    top: calc(50vh - 325px);
    display: table-cell;
    vertical-align: middle;
    text-align: left;
  }
  .xp-title {
    position: fixed;
    top: 60px;
    font-size: 24px;
    color: $purple;
    transition: .4s color ease .2s, 1s filter ease;
    z-index: 3;
    &.inverted {
      color: $white;
    }
    &.blur {
      filter: blur(30px);
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
    background: linear-gradient(to left bottom, $black 50%, $warmRed 160%);
    transition: .4s opacity ease .2s;
    opacity: 0;
    &.over {
      transition: .25s opacity ease;
      opacity: .9;
    }
  }
}
</style>
