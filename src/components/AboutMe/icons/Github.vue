<template>
  <div class="octocat">
    <svg viewBox="0 0 300 300" class="whiskers">
      <path class="whisker" d="M78.59,113.4c-40.26-3.23-77.09,9-77.09,9"/>
      <path class="whisker" d="M78.21,122C37.35,122.72,7,138.17,7,138.17"/>
      <path class="whisker" d="M240.35,113.4c40.26-3.23,77.09,9,77.09,9"/>
      <path class="whisker" d="M240.73,122c40.86.68,71.17,16.13,71.17,16.13"/>
    </svg>
    <svg viewBox="0 0 300 300" class="back-limbs">
      <path class="limb" d="M222.05,229.13h-18a11.19,11.19,0,0,1-11.2-11.2v-17.3a33,33,0,0,0-33-33h0a33,33,0,0,0-33,33v17.3a11.2,11.2,0,0,1-11.2,11.2h-18"/>
    </svg>
    <svg viewBox="0 0 300 300" class="front-limbs">
      <path class="limb" d="M192.92,256.17H182.33A11.19,11.19,0,0,1,171.14,245v-54.3a11.2,11.2,0,0,0-11.2-11.2h0a11.2,11.2,0,0,0-11.2,11.2V245a11.19,11.19,0,0,1-11.2,11.2H126.36"/>
    </svg>
    <svg viewBox="0 0 300 300" class="head-group">
      <path class="head" d="M179.39,178.17h-38.9a85,85,0,0,1-84.85-80.1h0a85,85,0,0,1,84.85-89.9h38.9a85,85,0,0,1,84.85,89.9h0A85,85,0,0,1,179.39,178.17Z"/>
    </svg>
    <svg viewBox="0 0 300 300" class="ears">
      <path class="ear" d="M123.44,23.17C104.44.17,71.86,0,71.86,0S64.28,33.61,84.11,48.47,123.44,23.17,123.44,23.17Z"/>
      <path class="ear" d="M196.44,23.17C215.44.17,248,0,248,0s7.59,33.61-12.24,48.47S196.44,23.17,196.44,23.17Z"/>
    </svg>
    <svg viewBox="0 0 300 300" class="face-skin">
      <path class="face" d="M182.44,166.17h-42c-29.14,0-64-23.62-64-52.76h0a40.17,40.17,0,0,1,44.92-39.89l13.31,1.58a217.79,217.79,0,0,0,51.54,0l13.31-1.58a40.17,40.17,0,0,1,44.92,39.89h0C244.44,142.55,211.58,166.17,182.44,166.17Z"/>
    </svg>
    </svg>
    <svg viewBox="0 0 300 300" class="face-group">
      <ellipse class="eye" cx="118.44" cy="110.17" rx="15" ry="19"/>
      <ellipse class="pupil" cx="119.44" cy="110.17" rx="9" ry="13"/>
      <ellipse class="eye" cx="203.44" cy="110.17" rx="15" ry="19"/>
      <ellipse class="pupil" cx="202.44" cy="110.17" rx="9" ry="13"/>
      <circle class="nose" cx="160.44" cy="134.17" r="4"/>
      <path class="mouth" d="M171.44,147.17c0,4.42-4.93,8-11,8s-11-3.58-11-8"/>
    </svg>
    <svg viewBox="0 0 300 300" class="glasses">
      <rect class="glass" x="89.44" y="91.17" width="61" height="43" rx="9.16" ry="9.16"/>
      <rect class="glass" x="172.44" y="91.17" width="61" height="43" rx="9.16" ry="9.16"/>
      <line class="glass" x1="150.44" y1="102.84" x2="172.44" y2="102.84"/>
    </svg>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import '../../styles/colors.scss';

.octocat  {
  position: relative;
  width: 200px;
  height: 200px;
  animation: rotate 4s alternate infinite ease;
  transform-style: preserve-3d;
}
.whiskers, .back-limbs, .front-limbs, .head-group, .face-group, .glasses, .face-skin, .ears {
  position: absolute;
  left: 0;
  top: 0;
}

.whiskers {
  transform: translateZ(-5px);
}
.glasses {
  transform: translate3d(0, -5px, 25px);
}
.face-group {
  transform: translate3d(0, -1.5px, 15px);
}
.face-skin {
  transform: translateZ(5px);
}
.back-limbs {
  transform: translateZ(-10px);
}
.front-limbs {
  transform: translate3d(2.5px, -5px, -2.5px);
}
.ears {
  transform: translateZ(10px);
}

/*
Some styling of body parts
*/
.whisker, .limb, .mouth, .glass {
  fill:none;
  stroke-linecap:round;
  stroke-miterlimit:10;
}
.whisker, .limb, .glass {
  stroke:$black;
}
.whisker, .mouth {
  stroke-width:3px;
}
.limb {
  stroke-width:20px;
  transform: translateZ(-10px);
}
.head {
  fill:$black;
}
.ear {
  fill:$black;
}
.face {
  fill:$lightRed;
}
.eye {
  fill:#fff;
}
.pupil {
  fill:#915131;
}
.nose {
  fill:#915131;
}
.mouth {
  stroke:#915131;
}
.glass {
  stroke-width:7.5px;
}

@keyframes rotate {
  0% {
    transform: rotate3d(1, 1, 0, 0deg);
  }
  100% {
      transform: rotate3d(1, 1, 0, 10deg);
  }
}

</style>
