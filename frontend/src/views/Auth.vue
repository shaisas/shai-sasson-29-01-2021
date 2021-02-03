<template>
  <section class="auth">
    <label class="tab" :class="{ active: tabName === 'Login' }">
      Login
      <input
        type="radio"
        value="Login"
        v-model="tabName"
        @change="onSwitchTab"
        class="radio"
      />
    </label>
    <label class="tab" :class="{ active: tabName === 'SignUp' }">
      SignUp
      <input
        type="radio"
        value="SignUp"
        v-model="tabName"
        @change="onSwitchTab"
        class="radio"
      />
    </label>
    <component :is="tabName" class="form" />
  </section>
</template>

<script>
import Login from "../components/auth/Login";
import SignUp from "../components/auth/SignUp";

export default {
  name: "Auth",
  data() {
    return {
      tabName: "Login"
    };
  },
  beforeMount() {
    this.tabName = this.$route.name;
  },
  methods: {
    onSwitchTab() {
      this.$router.push(`/auth/${this.tabName}`);
    }
  },
  components: {
    Login,
    SignUp
  }
};
</script>

<style lang="scss" scoped>
.auth {
  @media #{$small} {
    .form {
      padding: 15px;
    }
  }

  @media #{$medium}, #{$big} {
    width: 500px;
    .form {
      padding: 100px;
    }
  }

  margin: auto;
  display: block;
  box-shadow: 5px 10px 18px #888888;
  .tab {
    @include font-medium();
    padding: 10px 0;
    cursor: pointer;
    text-align: center;
    display: inline-block;
    width: 50%;
    &:hover {
      background-color: $background2;
    }
    .radio {
      display: none;
    }
    &.active {
      color: $primary;
      border-bottom: 3px solid $primary;
    }
  }
}
</style>
