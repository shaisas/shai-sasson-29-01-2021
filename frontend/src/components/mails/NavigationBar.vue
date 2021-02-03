<template>
  <nav class="navigation_bar">
    <button @click="toggleMenu" class="hamburger_button">
      <font-awesome-icon icon="bars" class="icon" />
    </button>
    <router-link
      v-for="link in links"
      :key="link.to"
      :to="link.to"
      @click.native="hasMenu = false"
      class="navigation_link"
      :class="{ active: link.to === $route.path, hasMenu: hasMenu }"
    >
      <font-awesome-icon :icon="link.icon" class="icon" />
      {{ link.title }}
    </router-link>
  </nav>
</template>

<script>
export default {
  name: "NavigationBar",
  data() {
    return {
      links: [
        { title: "New Mail", to: "/mail/send", icon: "plus-circle" },
        { title: "Inbox", to: "/mail/inbox", icon: "inbox" },
        { title: "Trash", to: "/mail/trash", icon: "trash" },
        { title: "Favorites", to: "/mail/favorites", icon: "star" }
      ],
      hasMenu: false
    };
  },
  methods: {
    toggleMenu() {
      this.hasMenu = !this.hasMenu;
    }
  }
};
</script>

<style lang="scss" scoped>
.navigation_bar {
  @media #{$small} {
    min-height: calc(100vh - 70px);
    background-color: $background1;
    position: absolute;
    z-index: 1;
    &.active {
      display: block;
      width: 250px;
    }
    .hamburger_button {
      position: absolute;
      top: -43px;
      left: 20px;
    }
    .navigation_link {
      width: 0;
      display: none;
      &.hasMenu {
        display: flex;
        width: 250px;
      }
    }
  }

  @media #{$medium}, #{$big} {
    .hamburger_button {
      display: none;
      .navigation_link {
        display: flex;
      }
    }
  }
  display: flex;
  flex-direction: column;
  .navigation_link {
    padding: 10px;
    border-bottom-right-radius: 30px;
    border-top-right-radius: 30px;
    &:hover {
      background-color: $background2;
    }
    &.active {
      color: $primary;
      background-color: $secondery;
      font-weight: bold;
    }
    .icon {
      padding: 0 5px;
    }
  }
}
</style>
