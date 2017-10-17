<template>
  <div class="experience-page">
    <div class="xp-container" @mousedown="closeModal">
      <div class="xp-wrapper" :class="{ blur: opened >= 0 }">
        <div class="overlay" :class="{ over: over || opened >= 0 }"></div>
        <div class="internships" @mouseover="overlayUp" @mouseout="overlayDown" @mousedown="expandIntern">
          <card-template>
            <template scope="props">
              <h1 class="title" :style="props.getTransform(titleTransform)">Internships</h1>
              <div class="content" :style="props.getTransform(contentTransform)">
                <div class="intern" v-for="(intern, idx) in interns" :key="idx">
                  <!-- <div>{{ intern.name }}</div> -->
                  <!-- <img :src="intern.src" width="100px" height="50px"></img> -->
                </div>
              </div>
            </template>
          </card-template>
        </div>
        <div class="projects" @mouseover="overlayUp" @mouseout="overlayDown">
          <card-template colorIn="#27CED6">
            <template scope="props">
              <h1 class="title" :style="props.getTransform(titleTransform)">Projects</h1>
              <div class="content" :style="props.getTransform(contentTransform)"></div>
            </template>
          </card-template>
        </div>
      </div>
    </div>
    <div class="modal-container" v-if="opened === 0">
      <div class="modal-wrapper">
        <div class="modal-card" @mouseover="overlayUp" @mouseout="overlayDown" v-for="(intern, idx) in interns" :key="idx">
          <card-template colorIn="#F7F9FF" colorOut="#DBDBDB">
            <template scope="props">
              <div :style="Object.assign(props.getTransform(titleTransform), {'background-image': `url(${intern.src})`})" class="logo"></div>
              <h3 class="year" :style="props.getTransform(titleTransform)">{{ intern.year }}</h3>
              <h1 class="period" :style="props.getTransform(titleTransform)">{{ intern.period }}</h1>
            </template>
          </card-template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardTemplate from '../reusable/CardTemplate';

export default {
  components: {
    CardTemplate,
  },
  data() {
    return {
      interns: [
        {
          name: 'SAP',
          title: 'Software Engineer Intern',
          src: 'https://vignette.wikia.nocookie.net/logopedia/images/1/13/SAP-Logo.png/revision/latest/scale-to-width-down/640?cb=20141014003217',
          year: 2017,
          period: 'Autumn',
        },
        {
          name: 'Sea',
          title: 'Full-Stack Engineer Intern',
          src: 'https://albertlucianto.github.io/images/sea-logo.png',
          year: 2017,
          period: 'Summer',
        },
        {
          name: 'Pinnacle Investment',
          title: 'Web Developer Intern',
          src: 'https://albertlucianto.github.io/images/pinnacle-logo.png',
          year: 2016,
          period: 'Summer',
        },
      ],
      projects: [],
      over: false,
      opened: -1,
    };
  },
  computed: {
    titleTransform() {
      return 'translateZ(100px)';
    },
    contentTransform() {
      return 'translateZ(50px)';
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
      if (this.opened >= 0) {
        this.opened = -1;
      }
    },
    expandIntern(e) {
      e.stopPropagation();
      this.opened = 0;
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
        .internships, .projects {
          filter: blur(40px);
        }
      }
      .internships, .projects {
        transition: 1s filter ease;
        margin: 20px;
        width: 400px;
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
        .content {
          position: absolute;
          background: $white;
          width: 300px;
          height: 400px;
          top: 120px;
          border-radius: 5px;
          pointer-events: none;
          box-shadow: -5px 5px 15px rgba(0,0,0,0.1);
        }
        &:hover {
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
    left: calc(5vw + 200px);
    top: calc(50vh - 350px);
    display: table-cell;
    vertical-align: middle;
    text-align: left;
    .modal-wrapper {
      display: flex;
      align-items: center;
      margin: auto;
      .modal-card {
        margin: 20px;
        width: 450px;
        height: 700px;
        .logo {
          width: 120px;
          height: 120px;
          margin: auto;
          padding-top: 100px;
          background-position: 50% 50%;
          background-repeat: no-repeat;
          background-size: contain;
          pointer-events: none;
        }
        .year {
          position: absolute;
          font-size: 32px;
          bottom: 175px;
          left: 60px;
          margin: 0;
          margin-left: 2.5px;
          text-align: left;
          color: $orange;
          pointer-events: none;
        }
        .period {
          position: absolute;
          font-size: 60px;
          bottom: 100px;
          left: 60px;
          margin: 0;
          text-align: left;
          color: $grey;
          pointer-events: none;
        }
      }
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
      opacity: .45;
    }
  }
}
</style>
