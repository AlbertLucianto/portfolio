<template>
  <div class="achievement">
    <svg viewBox="0 0 121.75 107.99" class="paper">
      <rect y="16.99" width="92" height="70"/>
    </svg>
    <svg viewBox="0 0 121.75 107.99" class="paper-content">
      <rect class="paper-title" x="23.5" y="27.99" width="45" height="21" rx="2.5" ry="2.5"/>
      <rect class="paper-text" x="9.75" y="59.99" width="30" height="5"/>
      <rect class="paper-text" x="9.75" y="71.99" width="40" height="5"/>
    </svg>
    <svg viewBox="0 0 121.75 107.99" class="ribbon-top-right">
      <path class="out-top-right" d="M89.75,10c0-8,34-10,14,35"/>
      <path class="in-top-right" d="M89.75,10c0-8,34-10,14,35"/>
    </svg>
    <svg viewBox="0 0 121.75 107.99" class="trophy">
      <path class="trophy-stand" d="M86.75,102h-28l3.93-5.07a20.3,20.3,0,0,0,4.24-12.42h0a20.27,20.27,0,0,0-4.24-12.41L58.75,67h28l-3.93,5.08a20.27,20.27,0,0,0-4.24,12.41h0a20.3,20.3,0,0,0,4.24,12.42Z"/>
      <path class="trophy-bowl-out" d="M101.75,10c0,32-13,58-29,58s-29-26-29-58L51.2,9.5a327.78,327.78,0,0,1,45.09.1Z"/>
    </svg>
    <svg viewBox="0 0 121.75 107.99" class="trophy-bowl-mid">
      <path d="M93.75,10c0,22.65-9.18,41-20.5,41s-20.5-18.35-20.5-41l3.37-.33a176.65,176.65,0,0,1,34.26,0Z"/>
    </svg>
    <svg viewBox="0 0 121.75 107.99" class="trophy-bowl-in">
      <path d="M86.75,10c0,14.36-5.82,26-13,26s-13-11.64-13-26h0a85.85,85.85,0,0,1,26,0Z"/>
    </svg>
    <svg viewBox="0 0 121.75 107.99" class="trophy-foundation">
      <rect class="trophy-neck" x="54.75" y="62.99" width="36" height="6" rx="3" ry="3"/>
      <path class="trophy-bottom" d="M55.42,96H90.08a3.67,3.67,0,0,1,3.67,3.67V108a0,0,0,0,1,0,0h-42a0,0,0,0,1,0,0V99.66A3.67,3.67,0,0,1,55.42,96Z"/>
    </svg>
    <svg viewBox="0 0 121.75 107.99" class="ribbon-top-left">
      <line class="out-top-left" x1="70.75" y1="5.99" x2="89.75" y2="48.99"/>
      <line class="in-top-left" x1="70.75" y1="5.99" x2="89.75" y2="48.99"/>
    </svg>
    <svg viewBox="0 0 121.75 107.99" class="medal-back">
      <circle cx="96.3" cy="58.58" r="16.95"/>
    </svg>
    <svg viewBox="0 0 121.75 107.99" class="ribbon-bottom-left">
      <polygon class="out-bottom" points="70.84 100.54 79.38 98.25 81.67 106.79 104.8 66.72 93.97 60.47 70.84 100.54"/>
      <polygon class="in-bottom" points="95.08 66.62 76.36 99.06 79.38 98.25 80.19 101.27 98.91 68.83 95.08 66.62"/>
    </svg>
    <svg viewBox="0 0 121.75 107.99" class="ribbon-bottom-right">
      <polygon class="out-bottom" points="121.75 100.54 113.21 98.25 110.92 106.79 87.79 66.72 98.62 60.47 121.75 100.54"/>
      <polygon class="in-bottom" points="97.51 66.62 116.23 99.06 113.21 98.25 112.4 101.27 93.68 68.83 97.51 66.62"/>
    </svg>
    <svg viewBox="0 0 121.75 107.99" class="medal-front">
      <circle cx="96.3" cy="58.58" r="16.95"/>
    </svg>
    <svg viewBox="0 0 121.75 107.99" class="medal-shine">
      <path d="M90 47.5 A 12.5 12.5 0 0 1 108.5 62"></path>
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

.achievement {
  position: relative;
  width: 200px;
  height: 200px;
  margin-left: 20px;
  transition: all .5s ease;
  animation: rotate 5s alternate infinite ease-in-out;
  transform-style: preserve-3d;
  svg {
    position: absolute;
    left: 0;
    top: 0;
  }
}
.paper {
  fill: $grey;
  transform: translateZ(-40px);
}
.paper-content {
  transform: translateZ(-25px);
  .paper-title {
    fill: $lightGrey;
  }
  .paper-text {
    fill: $white;
  }
}
.trophy-bowl-out {
  fill: $orange;
}
.trophy-bowl-mid {
  fill: $yellow;
  transform: translateZ(15px);
}
.trophy-bowl-in {
  fill: $white;
  transform: translateZ(30px);
}
.trophy-stand {
  fill: $orange;
}
.trophy-foundation {
  transform: translateZ(5px);
  .trophy-neck {
    fill: $purple;
  }
  .trophy-bottom {
    fill: $black;
  }
}
.ribbon-bottom-left {
  transform: translateZ(25px);
}
.ribbon-bottom-right {
  transform: translateZ(30px);
}
.in-bottom {
  fill: $white;
}
.out-bottom {
  fill: $purple;
}
.medal-back {
  fill: $orange;
  transform: translateZ(20px);
}
.medal-front {
  fill: $yellow;
  transform: translateZ(35px);
}
.medal-shine {
  fill: none;
  stroke: $white;
  stroke-width: 3px;
  stroke-linecap: round;
  transform: translateZ(40px);
}
.ribbon-top-left {
  transform: translateZ(30px);
}
.ribbon-top-right {
  transform: translateZ(15px);
}
.in-top-left, .out-top-right, .in-top-right, .out-top-left {
  fill: none;
  stroke-miterlimit: 10;
}
.out-top-right, .out-top-left {
  stroke: $purple;
  stroke-width: 11px;
}
.in-top-left, .in-top-right {
  stroke: $white;
  stroke-width: 4px;
}
.in-top-left,.out-top-left {
  stroke-linecap: round;
}

@keyframes rotate {
  0% {
    transform: rotate3d(1, 1, 0, 0deg);
  }
  100% {
      transform: rotate3d(1, 1, 0, 20deg);
  }
}

</style>
