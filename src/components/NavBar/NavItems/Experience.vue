<template>
  <router-link to="/experience" class="link">
    <svg class="experience">
      <g class="suitcase">
        <rect x="-15" y="-35" width="30" height="30" rx="5" ry="5" class="handle"></rect>
        <rect x="-48" y="-25" width="96" height="72" rx="10" ry="10" class="suitcase-body"></rect>
      </g>
    </svg>
    <div class="text">Experience</div>
  </router-link>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import '../../styles/colors.scss';

.experience {
  width: 110px;
  height: 110px;
  margin: 20px;
  text-align: center;
  transition: 150ms all ease;
  .suitcase {
    position: absolute;
    transform: translate3d(55px, 55px, 0);
    .suitcase-body {
      fill: $purple;
    }
    .handle {
      fill: none;
      stroke: $black;
      stroke-width: 5px;
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
