<template>
  <div class="sidebar-container">
    <div class='drawer-widget'>
      <div class='drawer' :class='drawClassObject'>
        <!-- Title -->
        <span class="title">WeQuote</span>
        <!-- Add spacer, to align navigation to the right -->
        <div class="layout-spacer"></div>
        <!-- Navigation -->
        <nav class="navigation">
          <a class="navigation-link" href="/login">登录</a>
          <a class="navigation-link" href="#">用户名</a>
          <a class="navigation-link" href="/user-center">用户中心</a>
          <a class="navigation-link" href="/register">戳我添加</a>
          <a class="navigation-link" href="/about">关于</a>
          <a class="navigation-link" href="/logout">登出</a>
        </nav>
      </div>
      <div role='button' class='drawer-button' @click='openDrawer()'>
        <span>
          <img src="../assets/menu.svg" />
        </span>
      </div>
    </div>

    <div class='obfuscator' :class='drawClassObject' @click='closeDrawer()'></div>
  </div>
</template>

<script>
export default {
  name: "we-sidebar",
  data() {
    return {
      drawClassObject: {
        "is-visible": false
      }
    };
  },
  methods: {
    openDrawer() {
      this.drawClassObject["is-visible"] = true;
    },
    closeDrawer() {
      this.drawClassObject["is-visible"] = false;
    }
  }
};
</script>

<style scoped lang="stylus">
.drawer-widget {
  z-index: 5;
}

.drawer {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  width: 15em;
  height: 100%;
  z-index: 7;
  transform: translateX(-15em);
  position: absolute;
  top: 0;
  left: 0;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  box-sizing: border-box;
  border-right: 1px solid #e0e0e0;
  background: #fafafa;
  transform-style: preserve-3d;
  transition-duration: 300ms;
}

.drawer.is-visible {
  transform: translateX(0);
}

.drawer-button {
  position: absolute;
  height: 3em;
  width: 3em;
  cursor: pointer;
  margin: 0.5em 0.8em;
  z-index: 6;
}

.drawer .title {
  line-height: 4em;
  padding-left: 2.5em;
}

.drawer .navigation {
  display: flex;
  flex-direction: column;
  padding-top: 1em;
  align-items: stretch;
}

.drawer .navigation-link {
  text-decoration: none;
  opacity: 0.87;
  padding: 1em 2.5em;
  color: #757575;
}

.obfuscator {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 6;
  transition-duration: 300ms;
  background-color: transparent;
  pointer-events: none;
}

.obfuscator.is-visible {
  opacity: 1;
  background-color: #0000007f;
  pointer-events: auto;
}
</style>
