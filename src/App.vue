<template>
    <div id="app">
        <!--导航栏，覆盖在主体上层-->
        <we-navigation class='navigation-component' :isLogin="isUserLogin"/>

        <!--页面主体内容-->
        <transition name="slide-fade" mode="out-in">
            <router-view class='main-container'/>
        </transition>

        <!--底栏版权信息-->
        <we-footer class='footer-container'/>

    </div>
</template>

<script>
  import WeFooter from "@/components/we-footer";
  import WeNavigation from "@/components/we-navigation";

  export default {
    name: "App",
    components: {
      WeNavigation,
      WeFooter
    },
    ////监听路由检查登录
    watch: {
      $route: "checkLogin"
    },
    created() {
      this.checkLogin();
    },
    methods: {
      checkLogin: function () {
        //检查是否存在session
        let u = localStorage.getItem("username");
        if (u !=null) {
          this.$store.commit("login", u)
        } else {
        }
      }
    },
    computed: {
      isUserLogin(){
        return this.$store.getters.username != null
      }
    }
  };
</script>

<style lang="stylus">
    * {
        margin 0
        font-family "Roboto", Arial, Helvetica, sans-serif
    }

    .slide-fade-enter-active {
        transition: all .2s ease;
    }

    .slide-fade-leave-active {
        transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .slide-fade-enter, .slide-fade-leave-to {
        transform: translateX(10px);
        opacity: 0;
    }

    #app {
        width: 100vw;
        height: 100vh;
        /*background-color: #454545;*/
        background: #16222A;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to bottom , #3A6073, #16222A);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to bottom, #3A6073, #16222A); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    }

    .navigation-component {
        position: absolute;
        height: 100%;
        width: 100%;
        z-index: 20;
        pointer-events: none;
    }

    .main-container {
        position: absolute;
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .footer-container {
        position: fixed;
        right: 0;
        bottom: 0;
        padding-right: 0.8em;
        padding-bottom: 0.3em;
        z-index: 11;
    }

</style>
