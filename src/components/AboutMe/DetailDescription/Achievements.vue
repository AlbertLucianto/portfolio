<template>
  <div class="achievements-container">
    <div class="h1__container">
      <h1>Personal Achievements</h1>
    </div>
    <div>
      <div v-for="(achievement, idx) in achievements" :key="idx" class="achievement">
        <div class="titleAndTime">
          <div class="achievement__title">{{ achievement.title }}</div>
          <div class="achievement__time">{{ achievement.time }}</div>
        </div>
        <div class="achievement__issuer">{{ achievement.issuer }}</div>
        <div class="separator"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      achievements: [
        {
          title: 'Dean\'s List (top 5% cohort)',
          issuer: 'Nanyang Technological University, School of Computer Science and Engineering',
          time: 'AY 2015/2016',
        },
        {
          title: 'Silver Medal',
          issuer: 'Indonesian National Science Olympiad (Mathematics)',
          time: '2014',
        },
        {
          title: 'Bronze Medal',
          issuer: 'Indonesian National Science Olympiad (Mathematics)',
          time: '2013 & 2012',
        },
        {
          title: 'Bronze Medal',
          issuer: 'International Mathematics Competition (IMC)',
          time: '2011',
        },
        {
          title: '4th Runner Up',
          issuer: 'Global Art International Competition in Singapore',
          time: '2009',
        },
        {
          title: 'Best of the Best',
          issuer: 'Global Art National Competition Indonesia',
          time: '2009',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/colors.scss';

.achievements-container {
  box-sizing: border-box;
  margin-top: 95px;
  padding: 25px 45px;
  height: calc(100% - 80px);
  background: $white;
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: $orange;
    border-radius: 5px;
  }
  .h1__container {
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    background: $white;
    width: 100%;
    padding-top: 15px;
    z-index: 10;
    box-shadow: 0 -5px 45px -15px $grey;
    h1 {
      font-size: 30px;
    }
  }
  .achievement {
    margin: 30px 0;
    .titleAndTime {
      display: flex;
      justify-content: center;
      .achievement__title {
        font-weight: 600;
        color: $purple;
      }
      .achievement__time {
        opacity: .6;
        margin-left: 10px;
      }
    }
    .achievement__issuer {
      font-size: 18px;
    }
    .separator {
      height: 8px;
      width: 25px;
      margin: auto;
      margin-top: 20px;
      background: $grey;
      border-radius: 10px;
      opacity: .7;
    }
  }
}
</style>
