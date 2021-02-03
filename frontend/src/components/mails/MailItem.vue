<template>
  <div class="mail_item" :class="{ read: mail.isRead }">
    <ul class="buttons_list">
      <li v-for="button in buttons" :key="button.id" class="button_item">
        <button
          @click="onIconClick(button.onClick)"
          class="button"
          :class="button.id"
        >
          <font-awesome-icon :icon="button.icon" />
        </button>
      </li>
    </ul>
    <router-link :to="`/mail/${mail._id}`" class="link">
      <span class="name">{{ mail.sender.name }}</span>
      <span class="subject"
        >{{ mail.subject }}
        <span class="paragraph">{{ mail.paragraph }}</span>
      </span>
      <span class="date">{{ getDate(mail.date) }}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "MailItem",
  props: {
    mail: {
      type: Object,
      required: true
    }
  },
  computed: {
    buttons() {
      return [
        {
          id: "trash",
          icon: [this.mail.isDeleted ? "fas" : "far", "trash-alt"],
          onClick: "isDeleted"
        },
        {
          id: "star",
          icon: [this.mail.isFavorites ? "fas" : "far", "star"],
          onClick: "isFavorites"
        }
      ];
    }
  },
  methods: {
    getDate(date) {
      return new Date(date).toDateString();
    },
    async onIconClick(prop) {
      const changePropObj = {
        mailId: this.mail._id,
        propName: prop,
        propValue: !this.mail[prop]
      };
      try {
        await this.$store.dispatch("mails/changeProp", changePropObj);
      } catch (e) {
        this.$errorMessage(e.message, false);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.mail_item {
  position: relative;
  padding: 15px 15px 15px 75px;
  font-weight: bold;
  border-bottom: 1px solid $background2;
  &:hover {
    border: 1px solid $background1;
    border-bottom: none;
    box-shadow: 0 4px 2px -2px lightgrey;
    z-index: 1;
  }
  .buttons_list {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    .button {
      border-radius: 50%;
      padding: 10px;
      &:hover {
        background-color: $background2;
      }
    }
  }
  .link {
    display: flex;
    justify-content: space-between;
    .name,
    .date {
      flex: 2;
    }
    .date {
      @include font-small();
    }
    .subject {
      flex: 3;
    }
    .paragraph {
      max-width: 100px;
      display: block;
      color: $text3;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
  &.read {
    font-weight: normal;
    background-color: $background1;
  }
}
</style>
