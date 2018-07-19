<template>
    <nav id="navigation">
        <div class="header-row">
            <!-- Bars icon -->
            <font-awesome-icon id="draw-trigger" icon='bars' @click="toggleDrawer"/>
            <!-- Title -->
            <router-link to='/' class='header-title'>
                <span>WeQuote</span>
            </router-link>
            <!-- Upload icon-->
            <a class="navigation-link" @click="toUpload">
                <font-awesome-icon id="draw-uploader" icon='arrow-alt-circle-up'/>
            </a>
        </div>

        <aside class='drawer' :class="{'is-visible': drawerOpened}">
            <!-- Title -->
            <span class="header-title">WeQuote</span>
            <!-- Navigation -->
            <ul class="drawer-navigation" @click="toggleDrawer()">

                <router-link to='/' class='navigation-link'>
                    <li>主页</li>
                </router-link>

                <router-link v-if="!isLogin" to='/login' class='navigation-link'>
                    <li>登录</li>
                </router-link>

                <router-link v-if="isLogin" to='/dashboard' class='navigation-link'>
                    <li>用户</li>
                </router-link>

                <li v-if="isLogin" class='navigation-link' @click="logout">登出</li>

                <router-link to='/about' class='navigation-link'>
                    <li>关于</li>
                </router-link>

            </ul>
        </aside>
        <div class='drawer-obfuscator' :class="{'is-visible': drawerOpened}" @click="toggleDrawer()"></div>
    </nav>
</template>

<script>
  export default {
    name: "we-navigation",
    props: {
      isLogin: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        drawerOpened: false
      };
    },
    methods: {
      toggleDrawer() {
        this.drawerOpened = !this.drawerOpened;
      },
      logout() {
        this.$confirm('是否确定登出?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '登出成功!'
          });
          this.$store.commit("login", null);
          localStorage.removeItem("username");
          this.$router.push('/')
        })
      },
      toUpload() {
        if (!this.isLogin) {
          this.$message({
            message: "请登录后上传微语录",
            type: "warning",
            duration: 2000
          })
          this.$router.push('/login')
        }
        else {
          this.$router.push('/upload')
        }
      }
    }
  }
  ;
</script>

<style scoped lang="stylus">
    $transition-duration = 600ms

    #navigation {

    }

    .navigation-link {
        text-decoration: none;
        cursor: pointer;
    }

    .header-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: nowrap;
        width: 100%;
        color: #efefef;
        pointer-events: auto;

        #draw-trigger {
            margin: 0.5em 0.75em;
            font-size: 2em;
            cursor: pointer;
        }

        .header-title {
            flex-grow: 1;
            padding-left: 0.25em;
            font-size: 2em;
            text-decoration: inherit;
            color: inherit;
        }

        #draw-uploader {
            margin: 0.5em 0.75em;
            font-size: 2em;
            color: #efefef;
        }

    }

    .drawer {
        z-index: 22;
        position: absolute;
        top: 0;
        width: 100%;
        max-height: 75vh;

        display: flex;
        flex-direction: column;
        box-sizing: border-box;

        background-color: whitesmoke;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .2), 0 1px 5px 0 rgba(0, 0, 0, .12);

        padding: 2em 3em;

        pointer-events: auto;

        transform: translateY(-105%);
        transition-duration: $transition-duration;
        &.is-visible {
            transform: translateY(0);
        }

        .header-title {
            font-size: 2em;
        }

        /*列表元素样式*/
        .drawer-navigation {
            display: flex;
            flex-direction: column;
            list-style-type: none;
            margin-bottom: 0;
            padding-left: 0;

            .navigation-link {
                opacity: .87;
                color: #232323;
                font-size: 1.5em;
                padding: 0.6em 0;
            }
        }
    }

    .drawer-obfuscator {
        z-index: 1;
        height: 100%;
        width: 100%;
        position: absolute;
        opacity: 0;
        left: 0;
        top: 0;
        background-color: #121212 7 f;
        pointer-events: none;
        transition-duration: $transition-duration * 2 / 3;

        &.is-visible {
            opacity: 1;
            pointer-events: auto;
        }
    }
</style>
