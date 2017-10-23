<template>
  <div class="portfolio">
    <svg viewBox="0 0 150 150" class="rect">
      <rect x="29.5" y="13.5" width="53" height="75"/>
    </svg>
    <svg viewBox="0 0 150 150" class="wave">
      <path d="M13,62v2A17,17,0,0,0,30,81h0A17,17,0,0,0,47,64h0A26,26,0,0,1,73,38h0A26,26,0,0,1,99,64v41H13Z"/>
    </svg>
    <svg viewBox="0 0 150 150" class="circle-top-left">
      <circle cx="26" cy="26" r="26"/>
    </svg>
    <svg viewBox="0 0 150 150" class="triangle">
      <polygon points="119.06 102.73 63.36 117.65 63.36 117.65 78.29 61.96 119.06 102.73"/>
    </svg>
    <svg viewBox="0 0 150 150" class="small-circles">
      <g class="circle-group-1">
        <circle cx="4.5" cy="71.5" r="4"/>
        <circle cx="19.5" cy="71.5" r="4"/>
        <circle cx="34.5" cy="71.5" r="4"/>
      </g>
      <g class="circle-group-2">
        <circle cx="4.5" cy="85.5" r="4"/>
        <circle cx="19.5" cy="85.5" r="4"/>
        <circle cx="34.5" cy="85.5" r="4"/>
      </g>
      <g class="circle-group-3">
        <circle cx="4.5" cy="99.5" r="4"/>
        <circle cx="19.5" cy="99.5" r="4"/>
        <circle cx="34.5" cy="99.5" r="4"/>
      </g>
      <g class="circle-group-4">
        <circle cx="4.5" cy="113.5" r="4"/>
        <circle cx="19.5" cy="113.5" r="4"/>
        <circle cx="34.5" cy="113.5" r="4"/>
      </g>
    </svg>
    <svg viewBox="0 0 150 150" class="brush">
      <path class="brush-head" d="M36.5,21.5c-9-8-21-2-24,8,12-4,13,8,24,1C40.72,27.82,38.61,23.38,36.5,21.5Z"/>
      <path class="brush-handle" d="M108.66,29l-69,3.37a3,3,0,0,1-3.13-3V22.63a3,3,0,0,1,3.13-3l69,3.37a3,3,0,0,1,2.84,3h0A3,3,0,0,1,108.66,29Z"/>
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    active: Boolean,
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/colors.scss';

.portfolio {
  position: relative;
  width: 200px;
  height: 200px;
  margin-left: 25px;
  animation: rotate 5s alternate infinite ease-in-out;
  transform-style: preserve-3d;
  svg {
    position: absolute;
    left: 0;
    top: 0;
  }
}
.rect {
  fill: $black;
  transform: translateZ(-20px);
}
.wave {
  fill: $aqua;
}
.brush {
  transform: translateZ(40px) rotateY(-15deg);
  .brush-head {
    fill: $warmRed;
  }
  .brush-handle {
    fill: $purple;
  }
}
.circle-top-left {
  transform: translateZ(15px);
  fill: $aqua;
}
.triangle {
  fill: none;
  stroke: $warmRed;
  stroke-miterlimit: 10;
  stroke-width: 5px;
  transform: translateZ(15px) rotate3d(1, 1, 0, 30deg);
}
.small-circles {
  fill: $purple;
  transform: translateZ(30px);
  g {
    animation: circle-group 2s alternate infinite ease;
  }
  .circle-group-1 {
    animation-delay: .5s;
  }
  .circle-group-2 {
    animation-delay: 1s;
  }
  .circle-group-3 {
    animation-delay: 1.5s;
  }
  .circle-group-4 {
    animation-delay: 2s;
  }
}

@keyframes rotate {
  0% {
    transform: rotate3d(.5, 1, 0, 0deg);
  }
  100% {
    transform: rotate3d(.5, 1, 0, 20deg);
  }
}

@keyframes circle-group {
  100% {
    transform: translateX(10px);
  }
}

</style>
