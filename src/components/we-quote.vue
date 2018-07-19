<template>
    <div id="we-quote" class="we-quote-fullpage">

        <div class="bracket left">『</div>
        <div class="phrase" id="we-quote-text">
            {{phrase}}
        </div>
        <div class="bracket right">』</div>
        <div class="author" id="we-quote-author">
            -「{{author}}」
        </div>
    </div>
</template>

<script>
export default {
  name: "we-quote",
  props: {
    phrase: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped lang="stylus">
    #we-quote {
        position: relative;
        font-size: 1.75rem;
        color: white;
    }

    .bracket {
        font-size: 0.85em;
        position: absolute;

        &.left {
            left: 0;
            top: 0;
        }

        &.right {
            right: 0;
            bottom: 0;
        }
    }

    .phrase {
        font-size: 1.15em;
        text-align: center;
        line-height: 1.25em;
        word-break: normal;
        margin: 0;
        padding: 0.4em 1em;
    }

    .author {
        font-size: 0.8em;
        color: rgba(255, 255, 255, 0.7);
        float: right;
        margin-top: 1em;
    }
</style>
