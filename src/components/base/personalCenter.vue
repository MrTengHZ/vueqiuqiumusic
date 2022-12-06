<template>
  <div>
    <div class="personal-center">
      <div class="header-content">
        <div class="head-portrait">
          <img :src="avatarUrl" alt="" />
        </div>

        <div class="user-name">
          <span>{{ username }}</span>
          <p class="grade">Lv.{{ grade }}</p>
        </div>

        <div class="icon" @click="$router.push('/recommend')">
          <i class="iconfont icon-you-fanhui-copy-copy"></i>
        </div>
      </div>

      <!-- 选项卡 -->
      <div class="tab-content">
        <ul>
          <li>
            <i class="iconfont icon-yinlexiazai"></i><span>本地/下载</span>
          </li>
          <li><i class="iconfont icon-yunpan-xiazai"></i><span>云盘</span></li>
          <li><i class="iconfont icon-gouwudai"></i><span>已购</span></li>
          <li><i class="iconfont icon-zanting"></i><span>最近播放</span></li>
          <li><i class="iconfont icon-haoyou"></i><span>我的好友</span></li>
          <li><i class="iconfont icon-xing"></i><span>收藏和赞</span></li>
          <li><i class="iconfont icon-guangbo"></i><span>我的博客</span></li>
          <li><i class="iconfont icon-add1"></i><span>音乐应用</span></li>
        </ul>
      </div>

      <router-link
        :to="'/favoriteMusicList?id=' + musicListId"
        tag="div"
        class="favorite-music"
      >
        <div class="favorite-img">
          <img :src="coverImgUrl" alt="" />
        </div>

        <div class="favorite-title">
          <span>我喜欢的音乐</span>
          <p>{{ trackCount }}首</p>
        </div>

        <div class="favorite-beckoning">
          <div class="cardiac-pattern">
            <i class="iconfont icon-huaban-copy"></i>
            <span>心动模式</span>
          </div>
        </div>
      </router-link>

      <div class="song-sheet">
        <div
          :class="flag == true ? 'establish acc' : 'establish'"
          @click.stop="flag = true"
        >
          <span>创建歌单</span>
        </div>

        <div
          :class="flag == true ? 'collection' : 'collection acc'"
          @click.stop="flag = false"
        >
          <span>收藏歌单</span>
        </div>
      </div>

      <!-- 创建歌单 -->
      <div class="song-list">
        <div class="song-list-haed">
          <span>创建歌单</span>
          <div class="song-list-icon">
            <p class="iconfont icon-jia1"></p>
            <i class="iconfont icon-gengduo"></i>
          </div>
        </div>

        <div
          v-for="(item, index) in createSongList"
          :key="index"
          class="song-list-content"
          @click="tiaozhuan(index)"
        >

          <div class="song-list-img">
            <img :src="item.coverImgUrl" alt="" />
          </div>
          
          <div class="favorite-title">
            <span>{{ item.name }}</span>
            <p>{{ item.trackCount }}首</p>
          </div>
        </div>
      </div>

      <!-- 收藏歌单 -->
      <div class="song-list">
        <div class="song-list-haed">
          <span>收藏歌单</span>
          <div><i class="iconfont icon-gengduo"></i></div>
        </div>

        <div
          class="song-list-content"
          v-for="(item, index) in collectionSongList"
          :key="index"
          @click="tiaozhuantwo(index)"
        >
          <div class="song-list-img">
            <img :src="item.coverImgUrl" alt="" />
          </div>

          <div class="favorite-title">
            <span>{{ item.name }}</span>
            <p>{{ item.trackCount }}首</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { userDetails, favoriteMmusic } from "../../api/login";
export default {
  data() {
    return {
      avatarUrl: "",
      username: "未登录",
      grade: "",
      trackCount: "",
      coverImgUrl: "",
      musicListId: "",

      //用户的歌单
      songSheet: [],
      //创建歌单
      createSongList: [],
      flag: true,
      //收藏歌单
      collectionSongList: [],
    };
  },
  methods: {
    // 跳转创建歌单列表
    tiaozhuan(index) {
      this.$router.push({
        name: "establish",
        params: {
          id: this.createSongList[index].id,
        },
      });
    },
    // 跳转收藏歌单列表
    tiaozhuantwo(index) {
      this.$router.push({
        name: "establish",
        params: {
          id: this.collectionSongList[index].id,
        },
      });
    },
  },
  created() {
    userDetails({ uid: window.localStorage.userid }).then((data) => {
      this.avatarUrl = data.profile.avatarUrl;
      this.username = data.profile.nickname;
      this.grade = data.level;
    });
    favoriteMmusic({ uid: window.localStorage.userid }).then((data) => {
      this.trackCount = data.playlist[0].trackCount;
      this.coverImgUrl = data.playlist[0].coverImgUrl;
      this.musicListId = data.playlist[0].id;
      this.songSheet = data.playlist;
      this.songSheet.splice(0, 1);
      this.songSheet.forEach((item) => {
        if (item.userId == window.localStorage.userid) {
          this.createSongList.push(item);
        } else {
          this.collectionSongList.push(item);
        }
      });
      // console.log("创建歌单",this.createSongList);
      // console.log("收藏歌单",this.collectionSongList);
    });
  },
};
</script>

<style lang="less" scoped>
.personal-center {
  width: 100%;
  padding-bottom: 50px;
  background: rgb(250, 250, 250);
  .header-content {
    width: 100%;
    height: 85px;
    display: flex;
    line-height: 85px;
    box-sizing: border-box;
    padding: 17.5px 16px;
    .head-portrait {
      flex: 0 0 50px;
      height: 50px;
      border-radius: 50%;
      background: rgb(197, 197, 197);
      margin-right: 14px;
      overflow: hidden;
      border: 4px solid rgb(221, 221, 221);
      box-sizing: border-box;
      img {
        width: 100%;
      }
    }
    .user-name {
      height: 50px;
      line-height: 25px;
      flex: 1;
      span {
        font-size: 16px;

        color: rgb(26, 26, 26);
      }
      .grade {
        display: block;
        width: 32px;
        height: 18px;
        border-radius: 10px;
        background: rgb(124, 124, 124);
        bottom: 0;
        font-size: 12px;
        text-align: center;
        line-height: 18px;
        color: rgb(255, 255, 255);
      }
    }
    .icon {
      flex: 0 0 20px;
      height: 50px;
      line-height: 50px;
      i {
        font-size: 16px;
        color: rgb(95, 95, 95);
      }
    }
  }

  .tab-content {
    width: 94%;

    margin: 0 auto;
    border-radius: 7px;
    background: #ffffff;
    ul {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      padding: 15px 10px 0;
      li {
        height: 48px;
        width: 23.5%;
        //   background: burlywood;
        text-align: center;
        margin-bottom: 15px;
        i {
          font-size: 24px;
          color: #f75346;
        }
        span {
          font-size: 12px;
          display: block;
          color: rgb(95, 95, 95);
        }
      }
    }
  }

  .favorite-music {
    width: 94%;
    margin: 15px auto;
    border-radius: 7px;
    padding: 15px;
    background: #ffffff;
    box-sizing: border-box;
    display: flex;
    .favorite-img {
      flex: 0 0 45px;
      background: burlywood;
      height: 45px;
      border-radius: 5px;
      text-align: center;
      line-height: 45px;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    .favorite-title {
      flex: 1;
      font-size: 14px;
      margin: 0 10px;
      height: 45px;
      box-sizing: border-box;
      padding: 2px 0;
      span {
        color: rgb(36, 36, 36);
      }
      p {
        font-size: 12px;
        color: rgb(104, 104, 104);
      }
    }
    .favorite-beckoning {
      flex: 0 0 75px;
      height: 45px;
      font-size: 12px;
      line-height: 45px;
      .cardiac-pattern {
        display: inline-block;
        width: 75px;
        height: 25px;
        border-radius: 14px;
        text-align: center;
        line-height: 23px;
        border: 1px solid rgb(156, 153, 153);
        position: relative;
        i {
          color: rgb(36, 36, 36);
        }
        span {
          color: rgb(36, 36, 36);
        }
      }
    }
  }
  .song-sheet {
    margin-top: 40px;
    color: rgb(95, 95, 95);
    display: flex;
    justify-content: space-around;
    font-size: 16px;
    .establish {
      text-align: center;
    }
    .collection {
      text-align: center;
    }
    .acc {
      border-bottom: 3px solid rgb(204, 85, 85);
    }
  }
  .song-list {
    width: 94%;
    margin: 15px auto;
    border-radius: 7px;
    padding: 15px 15px 15px;
    background: #ffffff;
    box-sizing: border-box;
    .song-list-haed {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #5f5f5f;
      .song-list-icon {
        display: flex;
        p {
          margin-right: 15px;
        }
      }
    }
    .song-list-content {
      margin-top: 10px;
      display: flex;
      .song-list-img {
        flex: 0 0 45px;
        background: #ccc;
        height: 45px;
        border-radius: 5px;
        text-align: center;
        line-height: 45px;
        overflow: hidden;
        position: relative;
        img {
          display: block;
          width: 100%;
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          margin: auto;
        }
      }
      .favorite-title {
        flex: 1;
        font-size: 14px;
        margin: 0 10px;
        height: 45px;
        box-sizing: border-box;
        padding: 2px 0;
        span {
          color: rgb(36, 36, 36);
        }
        p {
          font-size: 12px;
          color: rgb(104, 104, 104);
        }
      }
    }
  }
}
</style>