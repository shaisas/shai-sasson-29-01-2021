<template>
  <div
    v-if="errorMessage"
    class="error_message"
    :class="{ success: isSuccess }"
  >
    <div class="left_icon">
      <font-awesome-icon
        :icon="isSuccess ? 'check-circle' : 'exclamation-circle'"
      />
    </div>
    <span>{{ errorMessage }}</span>
    <button @click="closeError">
      <font-awesome-icon icon="times" />
    </button>
  </div>
</template>

<script>
export default {
  name: "ErrorMessage",
  data() {
    return {
      errorMessage: null,
      isSuccess: false
    };
  },
  methods: {
    closeError() {
      this.errorMessage = null;
      this.isSuccess = false;
    },
    showError(text, isSuccess) {
      this.errorMessage = text;
      this.isSuccess = isSuccess;
      this.setAlertTimeout();
    },
    setAlertTimeout() {
      setTimeout(() => {
        this.errorMessage = null;
        this.isSuccess = false;
      }, 5000);
    }
  }
};
</script>

<style lang="scss" scoped>
.error_message {
  width: 300px;
  height: 50px;
  line-height: 50px;
  padding: 0 20px;
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-between;
  background-color: white;
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.15);
  .left_icon {
    color: $warning;
  }
  &.success {
    .left_icon {
      color: $success;
    }
  }
}
</style>
