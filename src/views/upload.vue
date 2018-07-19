<template>
    <div>
        <p class="title-medium">上传微语录</p>
        <we-upload></we-upload>
    </div>

</template>

<script>
  import WeUpload from "@/components/we-upload";

  export default {
    name: "upload",
    components: {
      WeUpload
    },
    mounted(){
      if (!this.isLogin) {
        this.$router.push('/login')
      }
    },
    computed:{
      isLogin(){
       return  this.$store.getters.username !=null
      }
    }
  };
</script>

<style scoped lang="stylus">

</style>
