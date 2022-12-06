<template>
  <div id="app">
    <div class="main">
       <!-- 顶部组件 -->
          <header-nav v-if="$route.meta.headerNav" v-show="hidden" @search-hidden="searchHidden"></header-nav>

       <!-- 路由视图 -->
          <router-view v-show="hidden"  @get-player-id="getPlayerId"  @get-play-all-id="getPlayAllId"></router-view>

          <!-- 播放音乐 -->
          <player ref="play" v-show="playerId" :player-id="playerId"  @get-player-id="getPlayerId" @get-play-allId="getPlayAllId" :list-id="listId"></player>

          <!-- 搜索歌曲 -->
          <search v-show="!hidden" @search-hidden="searchHidden"  @get-player-id="getPlayerId"></search>

          <!-- 个人中心 -->
          <!-- <personal-center></personal-center> -->

    </div>
  </div>
</template>

<script>
import headerNav from "./components/base/headerNav.vue"
import player from "./components/base/player.vue"
import search from "./views/search.vue"
// import personalCenter from "./components/base/personalCenter.vue"

export default {
  data(){
    return {
     playerId:null,
     listId:null,
     hidden:true,
    }
  },
  components: {
    headerNav,
     player,
     search,
    //  personalCenter
  },
   created(){
     
      },
      methods:{
        getPlayerId(id){
          this.playerId = id;
        },
        getPlayAllId(id){
          this.listId = id;
          this.$refs.play.listIdtwo(id);
        },
        searchHidden(){
          this.hidden=!this.hidden;
        },
      }
};
</script>

<style lang="less">
@import "./assets/css/base.css";

</style>