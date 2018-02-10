<template>
  <div class="me-container">
    <h1>Welcome Visitor!</h1>
    <!-- <div class="image"></div> -->
    <p class="me-description">
      I'm Albert Lucianto.<br><br>
      I'm currently a third year student in Nanyang Technological University, majoring Computer Science
      with minor In Business.<br><br>
      I love working on Software or Design related projects.
    </p>
    <p class="label">Check out my projects</p>
    <div class="link-container">
      <router-link to="/project" class="link software">Software Projects</router-link>
      <a href="https://behance.net/albertlucianto" class="link design">Design Projects</a>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import '../../styles/colors.scss';

.me-container {
  padding: 25px;
  .me-description {
    padding: 15px;
  }
  .label {
    font-size: 18px;
    font-weight: 500;
    color: $purple;
  }
  .link-container {
    display: flex;
    justify-content: center;
    .link {
      padding: 5px 10px;
      border-radius: 5px;
      color: $white;
      font-weight: 500;
      margin: 0 5px;
      text-decoration: none;
      transition: background-color .1s ease;
      &.software {
        background: $purple;
      }
      &.design {
        background: $warmRed;
      }
      &:hover {
        cursor: pointer;
        background: $aqua;
      }
    }
  }
}
</style>
