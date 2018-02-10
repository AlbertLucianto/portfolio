<template>
  <div class="contactMe__container">
    <div class="contact__item" v-for="(contact, idx) in contacts" :key="idx">
      <div class="label">{{ contact.label }}</div>
      <div class="value">{{ contact.value }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contacts: [
        {
          label: 'Email',
          value: 'albertlucianto@gmail.com',
        },
        {
          label: 'Phone',
          value: '+65 9053 2039',
        },
        {
          label: 'Address',
          value: 'NTU Hall 21, #21A-4-216',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/colors.scss';

.contactMe__container {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  .contact__item {
    padding: 20px;
    .label {
      font-weight: 500;
      color: $purple;
    }
    .value {
      font-size: 28px;
    }
  }
}
</style>
