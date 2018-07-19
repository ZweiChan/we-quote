<template>
    <div class="login" id="login">
        <a class="log-close"><i class="icons close"></i></a>
        <el-form class="login-form">
            <el-input type="text" placeholder="用户名"
                      v-model="username"/>
            <el-input type="password" placeholder="密码"
                      v-model="password"/>
            <el-button plain type="primary" class="login-btn" @click="login">登录</el-button>
        </el-form>
        <Loading v-if="isLogging" marginTop="-30%"></Loading>
    </div>
</template>

<script>
  import Loading from "./Loading.vue";
  import {userLogin} from "../service/web-api";

  export default {
    name: "we-login",
    data() {
      return {
        isLogging: false,
        username: "111",
        password: "111",
      };
    },
    components: {
      Loading
    },
    methods: {
      //登录逻辑
      login() {
        if (this.username !== "" && this.password !== "") {
          this.toLogin();
        }
      },
      //登录请求
      toLogin: function () {
        //需要想后端发送的登录参数
        let loginParam = {
          name: this.username,
          password: this.password
        };
        //设置在登录状态
        this.isLogging = true;

        //请求后端,比如:
        userLogin(loginParam)
          .then(succeed => {
            this.isLogging = false;
            if (succeed) {
              localStorage.setItem("username", this.username);
              this.$store.commit("login", this.username);
              this.$message({
                  message: "登录成功",
                  duration: 2000,
                  type: 'success'
                }
              );
              this.$router.push("/");
            } else {
              this.$message({
                  message: "登录失败",
                  duration: 2000,
                  type: 'error'
                }
              );
            }
          });

        //演示用
        // setTimeout(() => {
        //   //登录成功后
        //   this.$router.push("/");
        // }, 1000);
      }
    }
  };
</script>

<style scoped lang="stylus">
    .login {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        top: 25%;
        width: 100%;
        z-index: 10;
    }

    .log-close {
        display: block;
        position: absolute;
        top: 12px;
        right: 12px;
        opacity: 1;
    }

    .log-close:hover .icons {
        transform: rotate(180deg);
    }

    .log-close .icons {
        opacity: 1;
        transition: all .3s
    }

    .login-form {
        display block
        width 90%
    }

    .close {
        height: 16px;
        width: 16px;
        background-position: -13px 0;
    }

    .login-btn {
        width 100%
    }

    .isloading {
        background: #d6d6d6
    }

    .el-input {
        margin-bottom 2em
    }

</style>
