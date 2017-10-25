<template>
  <div class="detail-container">
    <me-in-brief></me-in-brief>
  </div>
</template>

<script>
import MeInBrief from './MeInBrief';

export default {
  components: {
    MeInBrief,
  },
};
</script>

<style lang="scss" scoped>
.detail-container {
  padding: 20px;
  font-size: 24px;
}
</style>
