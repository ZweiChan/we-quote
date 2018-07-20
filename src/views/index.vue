<template>
    <div id="index-container">

        <!--整个网页的背景图层-->
        <div class='background' :style="{backgroundImage:`url(${currentQuote.imageUrl})`}"></div>

        <!--文字部分-->
        <div class="current-quote">
            <we-quote :author="currentQuote.author" :phrase="currentQuote.phrase"/>
        </div>

        <el-badge :value="currentQuote.likes" :max="99" class="like-badge">
            <el-button class="like-button"
                       circle
                       :class="{'animated': currentQuote.liked}"
                       @click="plusOne">
            </el-button>
        </el-badge>

        <!--音乐播放器-->
        <div class="music-player">
            <we-player></we-player>
        </div>

    </div>
</template>

<script>
  import WeQuote from "@/components/we-quote";
  import WePlayer from "@/components/we-player";
  import {ADD_WORD, DISLIKE_A_WORD, LIKE_A_WORD} from "@/data/mutation-types";
  import {getQuotes, likeAQuote} from "@/service/web-api";

  const switchInterval = 3000;

    export default {
        name: "index",
        components: {
            WeQuote,
            WePlayer
        },
        data() {
            return {
                animated: false,
                currentQuote: {
                    id: "",
                    phrase: "",
                    author: "",
                    imageUrl: "",
                    theme: "",
                    likes: 0,
                    liked: false
                },
            };
        },
        methods: {
            plusOne() {
                if (this.currentQuote.liked) {
                    this.$store.commit(DISLIKE_A_WORD, this.currentQuote.id);
                } else {
                    likeAQuote(this.currentQuote.id)
                      .then(succeed => {
                        if (succeed) {
                          this.$store.commit(LIKE_A_WORD, this.currentQuote.id);
                        } else {
                          this.$message({
                            message: "发生错误",
                            duration: 2000,
                            type: 'error'
                          })
                        }
                      })
                      .catch(() => {
                        this.$message({
                          message: "请求失败",
                          duration: 2000,
                          type: 'error'
                        });
                      })
                }
            },
            switchToNextQuote() {
                this.currentQuote = this.$store.state.quotes[Math.floor(Math.random() * this.$store.state.quotes.length)];
            }
        },
        beforeMount() {
            this.switchToNextQuote();
            setInterval(this.switchToNextQuote, switchInterval);
            getQuotes().then(quotes => {
                quotes.forEach(quote => {
                    let card = {
                        id: quote.id,
                        phrase: quote.content,
                        author: quote.source,
                        imageUrl: quote.picture,
                        theme: quote.theme,
                        likes: quote.praise,
                        liked: false
                    };
                  this.$store.commit(ADD_WORD, card);
                });
                this.$store.commit("removeFirst");
              }
            )
        }
    };
</script>

<style  lang="stylus">

    @keyframes bounce
        from, 20%, 53%, 80%, to {
            animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
            transform: translate3d(0, 0, 0);
        }
        40%, 43% {
            animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
            transform: translate3d(0, -30px, 0);
        }
        70% {
            animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
            transform: translate3d(0, -15px, 0);
        }
        90% {
            transform: translate3d(0, -4px, 0);
        }

    @keyframes heart-burst {
        0% {
            background-position: left;
        }
        100% {
            background-position: right;
        }
    }

    .bounce-enter-active {
        animation-name: bounce;
        transform-origin: center bottom;
        transition-duration: 400ms;
    }

    .bounce-leave-active {
        opacity: 0;
        animation-duration: 100ms;
    }

    /*整个容器*/
    #index-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        /*文字区域*/
        .current-quote {
            margin-left: 3vw;
            margin-right: 3vw;
            padding-bottom: 1em;
        }
        /*点赞按钮*/
        .like-button {
            display: block;
            padding: 2em;
            cursor: pointer;
            background: url(https://abs.twimg.com/a/1446862637/img/t1/web_heart_animation.png) 0 0 no-repeat, rgba(255, 255, 255, .9);
            background-size: 2900%;
            color: #e2264d;

            &.animated {
                animation: heart-burst steps(28) 0.8s 1 both;
            }
        }

        .like-badge {
            margin-top: 2em;
        }

        /*外链播放器*/
        .music-player {
            position fixed
            left 0
            bottom 1em
        }

        /*背景图层*/
        .background {
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;

            position: absolute;
            height: 100%;
            width: 100%;
            z-index: -1;
            filter: brightness(0.6);
        }
    }

</style>
