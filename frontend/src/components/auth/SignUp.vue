<template>
  <form @submit.prevent="onSubmit" class="signup">
    <label class="input_container">
      <span class="label">id</span>
      <input type="text" v-model="id" class="input" />
    </label>
    <label class="input_container">
      <span class="label">name</span>
      <input type="text" v-model="name" class="input" />
    </label>
    <button type="submit" class="button">Login</button>
  </form>
</template>

<script>
export default {
  name: "SignUp",
  data() {
    return {
      id: "",
      name: ""
    };
  },
  methods: {
    async onSubmit() {
      try {
        await this.$store.dispatch("user/signUp", {
          name: this.name,
          id: this.id
        });
        this.$router.push("/");
      } catch (e) {
        this.$errorMessage(e.message, false);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.signup {
  @media #{$small} {
    .input {
      width: 250px;
    }
  }

  @media #{$medium}, #{$big} {
    .input {
      width: 285px;
    }
  }
  display: block;
  .input_container {
    display: block;
    .label {
      display: block;
      padding: 5px 0;
    }
    .input {
      width: 285px;
      height: 25px;
      padding: 0 5px;
      border-radius: 5px;
    }
  }
  .button {
    margin-top: 15px;
    padding: 10px;
    border: 1px solid $background1;
    border-radius: 10px;
    color: $primary;
    background-color: $secondery;
    &:hover {
      font-weight: bold;
      color: white;
      background-color: $primary;
    }
  }
}
</style>
