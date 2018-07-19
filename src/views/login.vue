<template>
    <div id="login">
        <div class="shift">
            <p class="title-medium">登录</p>
            <we-login></we-login>
        </div>
    </div>
</template>

<script>
    import WeLogin from "../components/we-login";

    export default {
        name: "login",
        components: {
            WeLogin
        }
    };
</script>

<style scoped lang="stylus">
    .shift {
        transform translateY(-30%)
    }
</style>
