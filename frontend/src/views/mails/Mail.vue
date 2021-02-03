<template>
  <section class="mail">
    <h2 class="title">{{ mail.subject }}</h2>
    <span class="sender_name">{{ mail.sender.name }}</span>
    <span class="send_date">{{ getDate(mail.date) }}</span>
    <p class="paragraph">{{ mail.paragraph }}</p>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Mail",
  data() {
    return {
      mail: {}
    };
  },
  computed: {
    ...mapGetters({
      getMail: "mails/mail"
    })
  },
  beforeMount() {
    this.mail = this.getMail(this.$route.params.id);
    const changePropObj = {
      mailId: this.mail._id,
      propName: "isRead",
      propValue: true
    };
    try {
      this.$store.dispatch("mails/changeProp", changePropObj);
    } catch (e) {
      this.$errorMessage(e.message, false);
    }
  },
  methods: {
    getDate(date) {
      return new Date(date).toString();
    }
  }
};
</script>

<style lang="scss" scoped>
.mail {
  background-color: $background1;
  padding: 25px;
  .title {
    @include font-big();
  }
  .sender_name {
    @include font-medium();
    font-weight: bold;
    display: block;
    margin: 5px 0;
    color: $text1;
  }
  .send_date {
    @include font-small();
    margin: 5px 0;
    display: block;
    color: $text3;
  }
  .paragraph {
    color: $text2;
    @include font-medium-small();
  }
}
</style>
