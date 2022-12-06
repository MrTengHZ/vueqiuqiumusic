<template>
  <div>
    <div class="topheader">

      <div class="img">
             <img :src="lists.artist.img1v1Url" alt="">
      </div>

      <div class="title">
           {{lists.artist.name}}
      </div>

      <div class="button" @click="$router.push('/singer')">
        <span class="iconfont icon-zuo-fanhui"></span>
             歌手
      </div>
       <!-- <div class="icon"  @click.stop="collection">
        <i :class="['iconfont',aixin==true ? 'icon-xinaixin11':'icon-xinaixin-fuben']"></i>
        </div> -->
    </div>

    <div class="musicList">
          <dt @click="playAll">
            <i class="iconfont icon-zanting"></i>播放全部<span>(共{{length}}首)</span>
          </dt>

         <dd v-for="(item,index) in lists.hotSongs" :key="index" @click='setId(item.id)'>
             <h1>{{index+1}}</h1>
            <div class="info">
              <h2>{{item.name}}</h2>
              <h3>
                <span v-for="(key,index) in item.ar" :key="index">{{key.name}}&nbsp;</span>
              </h3>
            </div>
            <div class="right-icon iconfont icon-gengduo">
              <span></span>
              </div>
          </dd>
    </div>

  </div>
</template>

<script>
import {getPlaylistDetail} from "../../api/singerlist";
export default {
        data(){
          return {
            lists:{},
            length:0,
            aixin:true,
          }
        },
        created(){
          getPlaylistDetail({id:this.$route.query.id}).then(data=>{
                this.lists = data;
                this.length=data.hotSongs.length;
            })
        },
        methods:{
          setId(id){
                this.$emit("get-player-id",id);
            },
             playAll(){
                // 播放全部歌曲
                // this.$emit("get-play-all-id",this.$route.query.id); //传递歌单id
                this.$emit("get-player-id",this.lists.tracks[0].id); //播放歌曲id。播放第一首
            },
        }
}
</script>

<style lang="less" scoped>
  .topheader{
        position: relative;
        height: 270px;
        .img{
            background-color: rgb(233, 233, 233);
            width: 100%;
            height: 270px;
            position: relative;
            img{
                position: absolute;
                top:0px;
                left:0px;
                right: 0px;
                bottom: 0px;
                margin:auto;
                width: 100%;
            }
        }
        .title{
            font-size: 18px;
            position: absolute;
            left:18px;
            bottom:18px;
            color:#fff;
        }
        .button{
            font-size: 18px;
            position: absolute;
            left:12px;
            top:12px;
            color:#fff;
            .iconfont{
              font-size: 18px;
            }
        }
        .icon{
              position: absolute;
              top: 10px;
              right: 10px;
              i{
                 color: #fff;
                 font-size: 22px !important;
              }
        }
        .icon-xinaixin-fuben{
                color:#ff1b0a!important;
            }
    }
    .musicList{
        background-color: #fff;
        width: 100%;
        border-radius: 7px;
        position: relative;
        top:-7px;
        padding-bottom: 50px;
        dt{
            height: 36px;
            line-height: 36px;
            font-size: 16px;
            color:#454747;
            border-bottom: 1px solid #E3E3E3;
            span{
                font-size: 14px;
                color:#797B7A;
            }
            i{
                width: 44px;
                text-align: center;
                display: inline-block;
                font-size: 18px;
            }
        }
        dd{
            border-bottom: 1px solid #E3E3E3;
            height: 53px;
            display: flex;
            h1{
                flex: 0 0 44px;
                line-height: 53px;
                text-align: center;
                font-size: 16px;
                color:#6D6E6E;
            }
            .info{
                flex:1;
               
                h2{
                    font-size: 16px;
                    color:#1B1C1C;
                    margin-top: 10px;
                     overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
               -webkit-line-clamp: 1;
               -webkit-box-orient: vertical;
                }
                h3{
                    font-size: 12px;
                    color:#929393;
                     overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
               -webkit-line-clamp: 1;
               -webkit-box-orient: vertical;
                }
            }
            .right-icon{
              flex: 0 0 44px;
               line-height: 53px;
                text-align: center;
                font-size: 16px;
                color:#6D6E6E;
            }
        }
    }
</style>