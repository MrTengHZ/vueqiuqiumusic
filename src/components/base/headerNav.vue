<template>
  <div>
     <div class="header">
          <router-link to="/personalCenter" tag="div" class="left iconfont icon-gengduo1">
         </router-link>

         <div class="center">湫湫音乐</div>
         <div  class="right iconfont icon-sousuo" @click.stop="search">
        </div>
     </div>

     <div class="navs">
         <router-link to="/recommend" class="item">
         <span>推荐</span>
         </router-link>

         <router-link to="/rank" class="item">
         <span>排行</span>
         </router-link>

         <router-link to="/singer" class="item">
         <span>歌手</span>
         </router-link>

          <router-link to="/newmv" class="item">
         <span>MV</span>
         </router-link>
     </div>
  </div>
</template>

<script>
export default {
    methods:{
        search(){
         this.$emit("search-hidden");
        }
    }

}
</script>

<style lang="less">
.header{
    height: 40px;
    background-color: #d44439;
    color: #fff;
    text-align: center;
    display: flex;
    .left,.right{
        flex: 0 0 40px;
        line-height: 40px;
         color: #fff;
    }
    .center{
        flex: 1;
         line-height: 40px;
    }
}

.navs{
    height: 40px;
    display: flex;
     background-color: #d44439;
     .item{
         flex: 1;
         width: 33.33%;
         text-align: center;
        span{
            margin-top: 9px;
            display: inline-block;
            height: 21px;
             color: #fff;
            border-bottom: 2px solid transparent;
        }
        &.router-link-active span{
            //  font-weight: bold;
             border-color: #fff;
        }
      }
}
</style>