<template>
  <div class="contact">
    <svg viewBox="0 0 175 175" class="body">
      <path d="M101.76,46.66c-27-25-53-33-63-39-14.58-8.75-30-13-37,4-4.78,11.58.06,24.1,16,15,7-4,2,17,19,31,24,19.77,50-1,48,9-1.59,7.9,13.68,3.14,18-5,9-17,26.75,35.94,28,21C131.76,70.66,130.76,66.66,101.76,46.66Z"/>
    </svg>
    <svg viewBox="0 0 200 200" class="wing left">
      <path class="cls-1" d="M75.3,42.74l-2.06-.09L76,37.5a2.88,2.88,0,0,0-3.48-4.07l-1.35.47h0l1.18-8.27A2.88,2.88,0,0,0,67.61,23l-1.19,1-.5-9a2.87,2.87,0,0,0-5.3-1.36l-.91,1.45h0L58.53,6.84a2.88,2.88,0,0,0-5.29-1.12L51.79,8,48.06,1.46a2.87,2.87,0,0,0-5.3.77L42,5.61A3.83,3.83,0,0,0,41.42,8c1,24-1.11,44.73-36,60C-6.8,73.38,2.52,86.17,24.58,84c-.12.17-.18.27-.18.27L35,85.6a2.88,2.88,0,0,0,3.23-3l-.1-1.43,10.61-.06a2.87,2.87,0,0,0,2.52-4.21l-.49-.94,8.76-1.4a2.88,2.88,0,0,0,2.36-3.4L61.42,69l4.71-.77A2.87,2.87,0,0,0,67.24,63h0l7.08-4A2.88,2.88,0,0,0,74,53.79l-1.76-.73,5-5.5A2.88,2.88,0,0,0,75.3,42.74Z"/>
    </svg>
    <svg viewBox="0 0 220 220" class="wing right out">
      <path d="M75.3,42.74l-2.06-.09L76,37.5a2.88,2.88,0,0,0-3.48-4.07l-1.35.47h0l1.18-8.27A2.88,2.88,0,0,0,67.61,23l-1.19,1-.5-9a2.87,2.87,0,0,0-5.3-1.36l-.91,1.45h0L58.53,6.84a2.88,2.88,0,0,0-5.29-1.12L51.79,8,48.06,1.46a2.87,2.87,0,0,0-5.3.77L42,5.61A3.83,3.83,0,0,0,41.42,8c1,24-1.11,44.73-36,60C-6.8,73.38,2.52,86.17,24.58,84c-.12.17-.18.27-.18.27L35,85.6a2.88,2.88,0,0,0,3.23-3l-.1-1.43,10.61-.06a2.87,2.87,0,0,0,2.52-4.21l-.49-.94,8.76-1.4a2.88,2.88,0,0,0,2.36-3.4L61.42,69l4.71-.77A2.87,2.87,0,0,0,67.24,63h0l7.08-4A2.88,2.88,0,0,0,74,53.79l-1.76-.73,5-5.5A2.88,2.88,0,0,0,75.3,42.74Z"/>
    </svg>
    <svg class="tail">
      <path d="M0,0C11,6,11,15,15,24s11,6,9-4C22.07,10.34,12,4,0,0Z"/>
    </svg>
    <svg viewBox="0 0 140 140" class="leg right">
      <path d="M14,1.5C-2,5.5,4.46,9,11.46,15"/>
      <path d="M8,18.5s-3,2-3.63-9.3C0,12.5,2,17.5,2,17.5"/>
    </svg>
    <svg viewBox="0 0 140 140" class="leg left">
      <path d="M14,1.5C-2,5.5,4.46,9,11.46,15"/>
      <path d="M8,18.5s-3,2-3.63-9.3C0,12.5,2,17.5,2,17.5"/>
    </svg>
    <svg viewBox="0 0 140 140" class="beak">
      <path d="M4.22,2.23A73,73,0,0,0,.11,11.69,1.89,1.89,0,0,0,3,13.86c6.09-4.24,9.9-5.11,9.9-5.11L12.92,0Z"/>
    </svg>
    <svg class="eye">
      <circle cx="6" cy="6" r="6"/>
      <circle cx="4" cy="4" r="3" class="glare"/>
    </svg>
    <svg class="letter-body">
      <rect width="62" height="40" rx="3" ry="3"/>
    </svg>
    <svg class="letter-open-inside">
      <path d="M0,11.07,25.43,26.6a10.68,10.68,0,0,0,11.14,0L62,11.07V3.56A3.56,3.56,0,0,0,58.44,0H3.56A3.56,3.56,0,0,0,0,3.56Z"/>
    </svg>
    <svg class="letter-open">
      <path d="M0,11.07,25.43,26.6a10.68,10.68,0,0,0,11.14,0L62,11.07V3.56A3.56,3.56,0,0,0,58.44,0H3.56A3.56,3.56,0,0,0,0,3.56Z"/>
    </svg>
    <svg class="stamp">
      <circle cx="7.5" cy="7.5" r="7.5"/>
    </svg>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import '../../styles/colors.scss';

.contact {
  position: relative;
  width: 200px;
  height: 200px;
  margin-left: 30px;
  transition: all .5s ease;
  animation: rotate 5s alternate infinite ease-in-out;
  transform-style: preserve-3d;
  svg {
    position: absolute;
    left: 0;
    top: 0;
  }
}
.leg {
  fill: none;
  stroke-linecap: round;
  stroke-miterlimit: 10;
  stroke-width: 3px;
  &.left {
    stroke: $yellow;
    transform: rotateY(30deg) translate3d(75px, 107.5px, 7.5px);
  }
  &.right {
    stroke: $orange;
    transform: rotateY(-30deg) translate3d(75px, 105px, 5px);
  }
}
.body {
  fill: $white;
  transform: rotateY(30deg) translate3d(-2px, 35px, -1px);
}
.wing {
  &.left {
    fill: $lightRed;
    transform: translate3d(70px, -10px, 5px) rotateX(-30deg);
  }
  &.right {
    &.out {
      fill: $grey;
      transform: scaleX(-1) rotateX(-30deg) rotateZ(30deg) translate3d(130px, -15px, -10px);
    }
    &.in {
      fill: $black;
      transform: scaleX(-1) rotateX(-30deg) rotateZ(10deg) translate3d(160px, 20px, 1.5px);
    }
  }
}
.tail {
  fill: $lightRed;
  transform: rotateY(30deg) translate3d(125px, 100px, -30px);
}
.beak {
  fill: $yellow;
  transform: rotateY(20deg) translate3d(-7.5px, 57.5px, 17.5px);
}
.eye {
  fill: $black;
  transform: translate3d(25px, 47.5px, 45px);
  .glare {
    fill: $white;
  }
}
.letter-body {
  fill: $aqua;
  transform: rotate3d(-.5, 1, .5, -30deg) translate3d(15px, 65px, 107.5px);
}
.letter-open-inside {
  fill: $black;
  transform: rotate3d(-.5, 1, .5, -30deg) scale(.75) translate3d(-17.5px, 65px, 110px);
}
.letter-open {
  fill: $purple;
  transform: rotate3d(-.5, 1, .5, -30deg) rotateX(45deg) translate3d(15px, 142.5px, 83.5px);
}
.stamp {
  fill: $warmRed;
  transform: rotate3d(-.5, 1, .5, -30deg) rotateX(45deg) translate3d(37.5px, 162.5px, 83.5px);
}

@keyframes rotate {
  0% {
    transform: rotate3d(1, 1, 0, 0deg);
  }
  100% {
      transform: rotate3d(1, 1, 0, -20deg);
  }
}
</style>
