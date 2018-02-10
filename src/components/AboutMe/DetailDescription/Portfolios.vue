<template>
  <div class="portfolio__container">
    <img src="../../../assets/behance-logo.png" class="behanceLogo"/>
    <a href="https://behance.net/albertlucianto" class="profile__link">
      <div class="profile">
        <div class="username">{{ profile.username }}</div>
        <div class="separator"/>
        <div class="profile__item">
          <div class="label">PROJECT VIEWS</div>
          <div class="value">{{ profile.projectViews }}</div>
        </div>
        <div class="profile__item">
          <div class="label">APPRECIATION</div>
          <div class="value">{{ profile.appreciation }}</div>
        </div>
        <div class="profile__item">
          <div class="label">FOLLOWERS</div>
          <div class="value">{{ profile.followers }}</div>
        </div>
        <div class="profile__item">
          <div class="label">FOLLOWING</div>
          <div class="value">{{ profile.following }}</div>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
// const BEHANCE_CLIENT_ID = 'r26abOGUOCAJUSohAr2c3b4vgYY7Dz5E';
// const URL = (username, clientId) => `https://api.behance.net/v2/users/${username}?client_id=${clientId}`;

export default {
  data() {
    return {
      profile: {
        /**
         * Stupid hardcode, Behance API requires
         * to be fetched from server to avoid CORS
         * */
        username: 'albertlucianto',
        projectViews: 13245,
        appreciation: 1622,
        followers: 550,
        following: 138,
      },
    };
  },
  mounted() {
    // fetch(URL(this.username, BEHANCE_CLIENT_ID))
    // .then(data => console.log(data))
    // .then((profile) => { this.profile = profile; });
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/colors.scss';

.portfolio__container {
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  padding: 60px 30px;
  .behanceLogo {
    width: 200px;
    margin-top: 15px;
  }
  .profile__link {
    color: $black;
    text-decoration: none;
  }
  .profile {
    margin: auto;
    width: 50%;
    margin-top: 40px;
    padding: 25px 40px;
    padding-top: 20px;
    border-radius: 10px;
    box-shadow: -10px 10px 55px -15px rgb(0, 122, 255);
    background: $white;
    transition: box-shadow .2s ease, background-color .1s ease;
    .username {
      font-weight: 600;
      font-size: 32px;
    }
    .separator {
      border-bottom: 1px solid $grey;
      margin-top: 10px;
      margin-bottom: 15px;
      width: 50%;
      margin-left: auto;
      margin-right: auto;
    }
    .profile__item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 3px 0;
      .label {
        font-weight: 600;
        font-size: 14px;
      }
      .value {
        opacity: .8;
      }
    }
    &:hover {
      box-shadow: -2px 2px 15px -5px rgb(0, 122, 255);
    }
    &:active {
      background: $grey;
    }
  }
}
</style>
