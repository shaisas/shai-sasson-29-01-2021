<template>
  <section class="mails">
    <ul class="mails_list">
      <li v-for="mail in mails" :key="mail._id" class="mail_item">
        <mail-item :mail="mail" />
      </li>
    </ul>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import MailItem from "../../components/mails/MailItem";

export default {
  name: "Mails",
  components: { MailItem },
  computed: {
    ...mapGetters({
      activeMails: "mails/activeMails",
      deletedMails: "mails/deletedMails",
      favoritesMails: "mails/favoritesMails",
      savedForLaterMails: "mails/savedForLaterMails"
    }),
    mails() {
      return this[this.$route.name];
    }
  }
};
</script>

<style lang="scss" scoped>
.mails_list {
  list-style: none;
}
</style>
