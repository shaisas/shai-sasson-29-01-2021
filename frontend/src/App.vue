<template>
  <div id="app">
    <error-message ref="errorMessage" />
    <header class="header">
      <font-awesome-icon icon="mail-bulk" />
      <h1>Mail App</h1>
    </header>
    <main class="main">
      <router-view />
    </main>
  </div>
</template>

<script>
import ErrorMessage from "./components/global/ErrorMessage";
import Vue from "vue";
export default {
  created() {
    Vue.prototype.$errorMessage = (text, isSuccess) => {
      this.$refs.errorMessage.showError(text, isSuccess);
    };
  },
  components: {
    ErrorMessage
  }
};
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  @include font-big();
  color: $primary;
  text-align: center;
  box-shadow: 0 4px 2px -2px lightgrey;
  padding: 5px 0;
  margin: 0 0 3px;
}
</style>
<style lang="scss">
body {
  margin: 0;
}
</style>
