<template>
    <header id="nav">
        <div class="header-row">
            <!-- Title -->
            <span class="header-title">WeQuote</span>
            <!-- Add spacer, to align navigation to the right -->
            <div class="layout-spacer"></div>
            <!-- Navigation -->
            <nav class="navigation">
                <a class="navigation-link doLike" href="#">
                    <div id="like_number1" class="" data-badge="18">
                        <img src="../assets/like.svg"/>
                    </div>
                </a>
                <a class="navigation-link" href="/login">登录</a>
                <a class="navigation-link" href="/register">戳我添加⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄</a>
                <a class="navigation-link" href="/about">关于一言...</a>
            </nav>
        </div>
    </header>
</template>

<script>
export default {
  name: "we-header"
};
</script>

<style scoped lang="stylus">
    #nav {
        font-size 14px
    }

    .header-row {
        display: flex;
        width: 100%;
        flex-wrap: nowrap;
    }

    .header-title {
        color white
    }

    .layout-spacer {
        flex-grow: 1;
    }

    .navigation {
        display: flex;
        align-items: center;
    }

    .navigation-link {
        text-decoration: none;
        opacity: 0.87;
        padding: 0 1.5em;
        color: whitesmoke;
    }
</style>
