<template>
  <section class="send_mail">
    <form @submit.prevent="onSubmit" class="form">
      <h2 class="title">Send Mail</h2>
      <label class="label">
        <span class="label_text">receiver ID:</span>
        <input
          name="receiverId"
          type="text"
          v-model="receiverId"
          placeholder="to"
          class="text_input"
        />
      </label>
      <label class="label">
        <span class="label_text">subject:</span>
        <input
          type="text"
          name="subject"
          v-model="subject"
          placeholder="subject"
          class="text_input"
        />
      </label>
      <label class="label">
        <span class="label_text">paragraph:</span>
        <textarea
          name="paragraph"
          cols="30"
          rows="10"
          v-model="paragraph"
          class="textarea"
        />
      </label>
      <div class="buttons">
        <button type="reset" class="reset">Reset</button>
        <button type="submit" class="submit">
          <font-awesome-icon icon="paper-plane" />
          Send
        </button>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  name: "SendMail",
  data() {
    return {
      receiverId: "",
      subject: "",
      paragraph: ""
    };
  },
  methods: {
    async onSubmit() {
      try {
        await this.$store.dispatch("mails/sendMail", {
          receiverId: this.receiverId,
          subject: this.subject,
          paragraph: this.paragraph
        });
        this.$errorMessage("mail sent", true);
      } catch (e) {
        this.$errorMessage(e.message, false);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.send_mail {
  @media #{$small} {
    .form {
      margin: auto;
    }
  }
  @media #{$medium}, #{$big} {
    .form {
      margin: 20px auto;
      border: 1px solid;
    }
  }
  .form {
    padding: 25px;
    box-shadow: 5px 10px 18px #888888;
    background-color: $background1;
    max-width: fit-content;
    .title {
      @include font-big();
    }
    .label {
      display: block;
      padding: 5px 0;
      .label_text {
        display: block;
      }
      .text_input {
        width: 250px;
        height: 25px;
        padding: 0 5px;
      }
      .text_input,
      .textarea {
        max-width: calc(100% - 15px);
        border-radius: 5px;
      }
    }
    .buttons {
      display: flex;
      justify-content: space-between;
      .reset {
        &:hover {
          font-weight: bold;
          color: $primary;
        }
      }
      .submit {
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
  }
}
</style>
