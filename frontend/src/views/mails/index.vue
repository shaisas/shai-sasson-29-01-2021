<template>
  <div class="main_page">
    <navigation-bar class="navigation" />
    <router-view class="child_page" />
  </div>
</template>

<script>
import NavigationBar from "../../components/mails/NavigationBar";
export default {
  name: "index",
  beforeMount() {
    try {
      this.$store.dispatch("mails/setMails");
    } catch (e) {
      this.$errorMessage(e.message, false);
    }
  },
  components: {
    NavigationBar
  }
};
</script>

<style lang="scss" scoped>
.main_page {
  @media #{$medium}, #{$big} {
    display: flex;
    .navigation {
      flex: 2;
    }
    .child_page {
      flex: 5;
    }
  }
}
</style>
