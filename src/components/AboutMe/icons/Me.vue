<template>
  <div class="me">
    <svg viewBox="0 0 132.35 96.79" class="cover-back left">
      <path d="M46,83.79H5.19A5.19,5.19,0,0,1,0,78.6V25a5.19,5.19,0,0,1,5.19-5.19H46Z"/>
    </svg>
    <svg viewBox="0 0 132.35 96.79" class="cover-back right">
      <path d="M58,83.79H98.81A5.19,5.19,0,0,0,104,78.6V25a5.19,5.19,0,0,0-5.19-5.19H58Z"/>
    </svg>
    <svg viewBox="0 0 132.35 96.79" class="cover-back mid">
      <rect x="46" y="19.79" width="12" height="64"/>
    </svg>
    <svg viewBox="0 0 132.35 96.79" class="cover mid">
      <rect x="46" y="19.79" width="12" height="64"/>
    </svg>
    <svg viewBox="0 0 132.35 96.79" class="cover left">
      <path d="M46,83.79H5.19A5.19,5.19,0,0,1,0,78.6V25a5.19,5.19,0,0,1,5.19-5.19H46Z"/>
    </svg>
    <svg viewBox="0 0 132.35 96.79" class="cover right">
      <path d="M58,83.79H98.81A5.19,5.19,0,0,0,104,78.6V25a5.19,5.19,0,0,0-5.19-5.19H58Z"/>
    </svg>
    <svg viewBox="0 0 132.35 96.79" class="page-side left">
      <rect x="9" y="25.79" width="7" height="53"/>
    </svg>
    <svg viewBox="0 0 132.35 96.79" class="page-side right">
      <rect x="89" y="25.79" width="7" height="53"/>
    </svg>
    <svg viewBox="0 0 132.35 96.79" class="page left">
      <rect x="12" y="25.79" width="40" height="53"/>
    </svg>
    <svg viewBox="0 0 132.35 96.79" class="page right">
      <rect x="52" y="25.79" width="40" height="53"/>
    </svg>
    <svg viewBox="0 0 132.35 96.79" class="page-bottom left">
      <rect x="12" y="25.79" width="45" height="53"/>
    </svg>
    <svg viewBox="0 0 132.35 96.79" class="page-bottom mid">
      <rect x="46" y="19.79" width="12" height="54"/>
    </svg>
    <svg viewBox="0 0 132.35 96.79" class="page-bottom right">
      <rect x="52" y="25.79" width="45" height="53"/>
    </svg>
    <svg viewBox="0 0 132.35 96.79" class="content left">
      <line x1="21" y1="35.79" x2="47" y2="35.79"/>
      <line x1="21" y1="46.79" x2="47" y2="46.79"/>
      <line x1="21" y1="57.79" x2="47" y2="57.79"/>
      <line x1="21" y1="68.79" x2="47" y2="68.79"/>
    </svg>
    <svg viewBox="0 0 132.35 96.79" class="content right">
      <line x1="57" y1="35.79" x2="84" y2="35.79"/>
      <line x1="57" y1="46.79" x2="84" y2="46.79"/>
      <line x1="57" y1="57.79" x2="84" y2="57.79"/>
      <line x1="57" y1="68.79" x2="84" y2="68.79"/>
    </svg>
    <svg viewBox="0 0 132.35 96.79" class="bookmark bottom">
      <polygon points="55 90.13 58 93.13 58 56.79 52 56.79 52 93.13 55 90.13"/>
    </svg>
    <svg viewBox="0 0 132.35 96.79" class="bookmark top">
      <rect x="52" y="25.79" width="6" height="31"/>
    </svg>
    <svg viewBox="0 0 132.35 96.79" class="pen">
      <path class="feather" d="M92.62,47.93c8.86-24.71,18-37.08,31.27-44.07,12.67-6.66,9.21-4.3,2,4C115.32,20,122.88,23.25,92.62,47.93Z"/>
      <path class="pen-line" d="M121.64,8.44C102.22,28.83,87.93,55.68,87.93,55.68"/>
    </svg>
    <svg viewBox="0 0 132.35 96.79" class="bottle">
      <rect x="85" y="66.79" width="42" height="30" rx="15" ry="15"/>
    </svg>
    <svg viewBox="0 0 132.35 96.79" class="ink">
      <path d="M124,85.25c-11.66,2.7-26.7-5.8-36.1-.3a13.37,13.37,0,0,0,12.76,9.41h10.69A13.34,13.34,0,0,0,124,85.25Z"/>
    </svg>
    <svg viewBox="0 0 132.35 96.79" class="bottle-neck">
      <rect x="96" y="61.79" width="21" height="6"/>
    </svg>
    <svg viewBox="0 0 132.35 96.79" class="bottle-lip">
      <rect x="91" y="57.79" width="31" height="7" rx="3.5" ry="3.5"/>
    </svg>
    <svg viewBox="0 0 132.35 96.79" class="shine">
      <path d="M116,70.79a12.24,12.24,0,0,1,7,12"/>
    </svg>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import '../../styles/colors.scss';

.me {
  position: relative;
  width: 200px;
  height: 200px;
  margin-left: 20px;
  transition: all .5s ease;
  animation: rotate 5s alternate infinite ease;
  transform-style: preserve-3d;
  svg {
    position: absolute;
    left: 0;
    top: 0;
  }
}
.cover-back {
  fill: #2b3a42;
  &.left {
    transform: translateZ(-40px) rotateX(30deg) rotateY(30deg);
  }
  &.right {
    transform: translate3d(0, -12px, -20px) rotateX(30deg) rotateY(-30deg);
  }
  &.mid {
    transform: translate3d(3px, -8px, -26px) rotateX(30deg);
  }
}
.cover {
  fill: #29d9c2;
  &.left {
    transform: translate3d(0, -5px, -35px) rotateX(30deg) rotateY(30deg);
  }
  &.right {
    transform: translate3d(0, -17px, -15px) rotateX(30deg) rotateY(-30deg);
  }
  &.mid {
    fill: #01a2a6;
    transform: translate3d(3px, -13px, -21px) rotateX(30deg);
  }
}
.page-side {
  fill: $purple;
  &.left {
    transform: rotateX(30deg) rotateY(90deg) translate3d(61px, -24px, -71px);
  }
  &.right {
    transform: rotateX(30deg) rotateY(-120deg) translate3d(-35px, -25px, -44px);
  }
}
.page {
  fill: #f1f7e6;
  &.left {
    transform: translate3d(0, -15px, -25px) rotateX(30deg) rotateY(30deg);  
  }
  &.right {
    transform: translate3d(0, -26px, -5px) rotateX(30deg) rotateY(-30deg);
  }
}
.page-bottom {
  fill: $warmRed;
  &.left {
    transform: translate3d(0, -7.5px, -35px) rotateX(30deg) rotateY(30deg);  
  }
  &.right {
    transform: translate3d(-2px, -19px, -15px) rotateX(30deg) rotateY(-30deg);
  }
  &.mid {
    transform: translate3d(3px, -9px, -15px) rotateX(30deg);
  }
}
.bookmark {
  fill: #cd2c24;
  &.bottom {
    transform: translate3d(0, -30px, -2px) rotateX(60deg) rotateY(-30deg);
  }
  &.top {
    transform: translate3d(0, -30px, 6px) rotateX(30deg) rotateY(-30deg);
  }
}
.content {
  stroke: #2f2933;
  stroke-width: 3px;
  &.left {
    transform: translate3d(0, -20px, -15px) rotateX(30deg) rotateY(30deg);  
  }
  &.right {
    transform: translate3d(0, -31px, 5px) rotateX(30deg) rotateY(-30deg);
  }
}
.pen {
  stroke-width: 2px;
  transform: translate3d(-20px, -30px, 45px);
}
.bottle {
  fill: #ffd393;
}
.bottle-neck {
  fill: #9c9b7a;
  transform: scaleY(1.1) translateZ(-5px);
}
.ink {
  fill: #405952;
  transform: translateZ(5px);
}
.shine {
  stroke: #efefef;
  stroke-width: 3px;
  transform: translateZ(5px);
}
.shine,.content,.pen-line {
  fill: none;
  stroke-linecap: round;
  stroke-miterlimit: 10;
}
.content,.pen-line {
  stroke: #2f2933;
}
.feather {
  fill: #f2836b;
}
.bottle-lip {
  fill: #ffd393;
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
