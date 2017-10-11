<template>
  <div>
    <router-link to="/" class="link">
      <svg class="landing">
        <g class="rocket">
          <path class="body" d="M35,0C74.67,42.47,51.16,84.61,51.16,84.68c-7.72,3.23-26.53,2.54-32.27,0C18.81,84.64-4.61,42.47,35,0Z"/>
          <path class="fin" d="M13,66.62A18.89,18.89,0,0,0,2.53,94a18.89,18.89,0,0,1,16.3-9.45A61.58,61.58,0,0,1,13,66.62Z"/>
          <path class="fin" d="M57,66.62A18.89,18.89,0,0,1,67.47,94a18.89,18.89,0,0,0-16.3-9.45A61.58,61.58,0,0,0,57,66.62Z"/>
          <ellipse class="fin" cx="35.03" cy="80.43" rx="3.23" ry="16.13"/>
          <circle class="window" cx="35" cy="40" r="10"></circle>
          <path class="head" d="M35,0A90.88,90.88,0,0,0,19,23.28H51.09A90.74,90.74,0,0,0,35,0Z"/>
        </g>
      </svg>
      <div class="text">Landing</div>
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import '../../styles/colors.scss';

.landing {
  width: 110px;
  height: 110px;
  margin: 20px;
  margin-bottom: 0;
  .rocket {
    transform: scale(1.1) translateX(15px);
    transform-origin: 50% 50%;
    .body {
      fill: $lightGrey;
    }
    .fin {
      fill: $purple;
    }
    .head {
      fill: $aqua;
    }
    .window {
      fill: $white;
    }
  }
}
.link {
  &:link, &:visited, &:active {
    text-decoration: none;
    .text {
      color: $black;
      font-weight: 700;
      transition: 250ms color ease;
    }
  }
  &:hover .text {
    color: $warmRed;
  }
}
</style>
