<template>
  <div >
    <div class="banner">
      <div class="imgs">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(item, index) in imgs" :key="index">
            <img :src="item.pic" alt="" />
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>

    <div class="remLists">
      <div class="title">
        <span>推荐歌单</span>
      </div>

      <div class="content">
        <ul>
          <li v-for="(item, index) in personalized" :key="index">
            <router-link :to="'/base/songsheet?id='+item.id">
            <div class="img">
              <img :src="item.picUrl" alt="" />
            </div>
            <span
              ><i class="iconfont icon-erji101"></i
              >{{ item.playCount | playCountNum }}</span
            >
            <p>{{ item.name }}</p>
             </router-link>
          </li>
        </ul>
      </div>
    </div>

    <div class="radio-station">
         <div class="radio-station-head" ref="left">
           <div class="radio-station-left"><span>推荐电台</span></div>
           <div class="radio-station-right"><a href="">更多></a></div>
         </div>

         <div class="radio-station-img">
           <ul>
             <li v-for="(item,index) in djRadios" :key="index"><img :src="item.picUrl" alt="">
              <span>{{item.name}}</span>
             </li>
           </ul>
         </div>
    </div>

    <div class="radio-station">
         <div class="radio-station-head" ref="left">
           <div class="radio-station-left"><span>最新专辑</span></div>
           <div class="radio-station-right"><a href="">更多></a></div>
         </div>

         <div class="radio-station-img">
           <ul>
             <li v-for="(item,index) in albums" :key="index"><img :src="item.picUrl" alt="">
              <span>{{item.name}}</span>
             </li>
           </ul>
         </div>
    </div>
  </div>
</template>

<script>
import { getBanner, getPersonalized,recommendedStation,album } from "../api/recommend";
import BScroll from "@better-scroll/core";
export default {
  data() {
    return {
      imgs: [],
      personalized: null,
      djRadios:[], //电台
      albums:[], //专辑
      scroll:null,
    };
  },
  methods: {
    getBannerFun() {
      // 轮播图数据
      getBanner().then((data) => {
        if (data.code == 200) {
          this.imgs = data.banners;
        }
      });
    },
    getPersonalizedFun() {
      // 热门歌单数据
      getPersonalized().then((data) => {
        if (data.code == 200) {
          this.personalized = data.result;
        }
      });
    },

    //推荐电台
    recommendedStationFun() {
      recommendedStation().then((data) => {
        if (data.code == 200) {
          this.djRadios=data.djRadios;
        }
      });
    },
    //专辑
    albumFun() {
      album().then((data) => {
        if (data.code == 200) {
          this.albums=data.albums;
        }
      });
    },
   
    _initScroll() {
      // 左侧滚动效果初始化
      this.scroll = new BScroll(this.$refs.left,{
        click: true, //点击触发
         probeType: 3, //深针的效果，时时获取滚动高度
         scrollX:true,

      });
    }
  },
  mounted() {
    this.$nextTick(() => {
        this._initScroll();
    });
  },
  created() {
    this.getBannerFun();
    this.getPersonalizedFun();
    this.recommendedStationFun();
    this.albumFun();
  },
  filters: {
    playCountNum(value) {
      let w = value > 10000 ? value / 10000 : value; //万计算
      let y = w > 10000 ? parseInt(w / 10000) + "亿" : parseInt(w) + "万"; //亿计算
      return y;
    },
  },
};
</script>

<style lang="less">
.banner {
  width: 100%;
  text-align: center;
  position: relative;
  &::after {
    background-color: #d4473c;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: -1;
    width: 100%;
    height: 132px;
    content: "";
    display: block;
  }
  .imgs {
    margin: auto;
    min-height: 100px;
    background: rgb(233, 233, 233);
    width: 96%;
    border-radius: 5px;
    .my-swipe {
      min-height: 100px;
      img {
        width: 100%;
        border-radius: 5px;
      }
    }
  }
}

.remLists {
  .title {
    height: 60px;
    line-height: 60px;
    text-indent: 5px;
    font-size: 16px;
    color: #000;
    font-weight: bold;
  }
  .content {
    margin: 0 2px;
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      li {
        flex: 0 0 33%;
        position: relative;
        padding: 0 3px;
        box-sizing: border-box;
        span {
          position: absolute;
          top: 0px;
          right: 4px;
          color: #fff;
          font-size: 10px;
          i {
            font-size: 12px;
            vertical-align: middle;
          }
        }
        .img {
          min-height: 50px;
          width: 100%;
          border-radius: 3px;
          img {
            width: 100%;
            border-radius: 3px;
            display:block;
          }
        }
        p {
          font-size: 12px;
          color: #565658;
          line-height: 15px;
          margin: 5px;
          margin-bottom: 10px;
          overflow: hidden;
          text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
           -webkit-box-orient: vertical;
        }
      }
    }
  }
}
.radio-station{
  width: 100%;
  box-sizing: border-box;
  padding: 10px 5px 0;
  border-top: 3px solid #ccc;
  .radio-station-head{
    height: 30px;
     display: flex;
     justify-content: space-between;
     line-height: 20px;
     span{
       font-size: 16px;
       font-weight: bold;
     }
     a{
       color: #565658;
       font-size: 14px;
     }
  }
  .radio-station-img{
    width: 100%;
    overflow: hidden;
    ul{
      width: 100%;
      overflow-y: scroll;
      display: flex;
       
      li{
        min-height: 50px;
        width:100%;
        margin-right: 10px;
        img{
          width: 105px;
          height: 105px;
          display: block;
          border-radius: 3px;
        }
        span{
          font-size: 12px;
    color: #565658;
    line-height: 15px;
    margin: 5px;
    margin-bottom: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
        }
      }
    }
  }
}
</style>