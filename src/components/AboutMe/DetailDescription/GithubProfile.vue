<template>
  <div class="github__container">
    <img src="../../../assets/github-logo.png" class="githubLogo"/>
    <a href="https://github.com/albertlucianto" class="github__link">AlbertLucianto</a>
  </div>  
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import '../../styles/colors.scss';

.github__container {
  box-sizing: border-box;
  height: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .githubLogo {
    width: 200px;
  }
  .github__link {
    font-size: 56px;
    color: $black;
    text-decoration: none;
    margin: 20px;
    transition: color .1s ease;
    &:hover {
      color: $grey;
    }
  }
}
</style>
