<template>
    <div class="container">
        <div class="upper">
            <div class="new-quote">
                <span id="source-and-theme">
                    <el-input v-model="author" placeholder="语录来源" class="author-input"></el-input>
                    <el-select v-model="value" placeholder="类型">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                      </el-select>
                </span>
                <el-input v-model="phrase" placeholder="语录文本" type="textarea" class="quote-input"></el-input>
            </div>
            <el-upload
                class="uploader"
                action="https://sm.ms/api/upload"
                ref="upload"
                name="smfile"
                :auto-upload="false"
                :file-list="fileList"
                list-type="picture"
                :on-change="handleFileChange"
                :on-success="handleUploadSuccess"
                :before-upload="beforeUpload"
                :http-request="handleNetworkUpload"
                :on-remove="handleRemove"
                accept="image/*">
                <div v-if="imageUrl"></div>
                <el-button id="upload-button" v-else size="small" type="primary"
                           style="background-color: rgba(0,0,0,0); border-color: rgba(0,0,0,0)">点击上传
                </el-button>
                <!--<img v-if="imageUrl" :src="imageUrl" class="image">-->
                <!--<i v-else class="el-icon-plus uploader-icon"></i>-->
            </el-upload>
            <el-button type="primary" plain class="commit-button" @click="commit">提交</el-button>
        </div>

    </div>
</template>

<script>
  import {commitForm, uploadForm} from "@/service/web-api";


  export default {
    name: "we-upload",
    data: function () {
      return {
        options: [{
          value: '音乐',
          label: '音乐'
        }, {
          value: '电影',
          label: '电影'
        }, {
          value: '动漫',
          label: '动漫'
        }],
        value: '',

        smfile: "",
        imageUrl: "",
        phrase: "",
        author: "",
        fileList: [],
        /*保存上传结果*/
        /**@type {SmmsApiResponse}*/
        uploaded: {},
        file: File
      };
    },
    methods: {
      //上传图片组件
      handleRemove(file, fileList) {
        // console.log(file, fileList);
        this.imageUrl = null;
      },
      handleFileChange(file, fileList) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      handleUploadSuccess() {
        this.$message.success("图片上传成功");
        console.log(this.uploaded.url);
        let newQuoteParams = {
          content: this.phrase,
          source: this.author,
          picture: this.uploaded.url,
          theme: this.value
        };
        commitForm(newQuoteParams)
          .then(succeed => {
              if (succeed) {
                this.$message({
                    message: "提交成功，请耐心等待审核通过",
                    duration: 2000,
                    type: 'success'
                  }
                );
                this.$router.push("/");
              } else {
                this.$message({
                    message: "提交失败",
                    duration: 2000,
                    type: 'error'
                  }
                );
              }
            }
          )
          .catch(error => error.data.message)
      },
      handleUploadFail() {
        this.$message.error("图片上传失败");
      }
      ,
      beforeUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error("上传图片大小不能超过 2MB!");
        }
        return isLt2M;
      }
      ,
      commit() {
        let uploader = this.$refs.upload;
        if (uploader.uploadFiles.length < 1) {
          this.$message.error("未选择图片");
        } else if (this.author.trim().length === 0) {
          this.$message.error("请填写作者");
        } else if (this.phrase.trim().length === 0) {
          this.$message.error("请填写句子");
        } else {
          uploader.submit();
        }
      }
      ,
      handleNetworkUpload(data) {
        uploadForm(data.file)
          .then(x => {
            this.uploaded = x;
            this.handleUploadSuccess();
          })
          .catch(x => {
            this.handleUploadFail();
          });
      }
    }
  }
  ;
</script>

<style scoped lang="stylus">
    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .upper {
        width 90%
        display flex
        flex-direction column
        align-items center

        #source-and-theme {
            display flex
            flex-direction row
            justify-content space-around
            align-items center
            margin-bottom 2em

            .author-input {
                margin-right 1em
            }
        }

        .commit-button {
            width: 100%
        }

        .quote-input {
             margin-bottom 2em
             height 10em
         }

        .uploader {
            margin-bottom 2em
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            box-sizing: border-box;
            min-height: 12vh;
            width: 100%;

            display: flex;
            flex-flow: column;
            justify-content: center;

            &:hover {
                border-color: $--color-primary;
            }

            .image {
                display: block;
                width: 100%;
                height: auto;
                object-fit: cover;
            }

            #upload-button {
                width: 100%
                height: 100%
            }
        }
    }





</style>
