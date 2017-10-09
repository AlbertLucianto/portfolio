<template>
  <div>
    <router-link to="/tools" class="link">
      <svg class="tools">
        <line x1="30" y1="25" x2="10" y2="50" class="code-line"></line>
        <line x1="30" y1="75" x2="10" y2="50" class="code-line"></line>
        <line x1="80" y1="25" x2="100" y2="50" class="code-line"></line>
        <line x1="80" y1="75" x2="100" y2="50" class="code-line"></line>
        <line x1="65" y1="22.5" x2="45" y2="77.5" class="code-line"></line>
      </svg>
      <div class="text">Tech Stack</div>
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import '../../styles/colors.scss';

.tools {
  width: 110px;
  height: 110px;
  margin: 20px;
  margin-bottom: 0;
  text-align: center;
  cursor: pointer;
  .code-line {
    stroke: $warmRed;
    stroke-width: 6px;
    stroke-linecap: round;
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
