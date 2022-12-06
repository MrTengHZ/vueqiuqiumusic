<template>
    <div>
       <div class="toplist">
            <div class="item" v-for="(item,index) in lists" :key="index" >
                <!-- 左边图片 -->
                <div class="img">
                    <router-link :to="'/rank/ranklist?id='+item.id">
                            <img :src="item.coverImgUrl" alt="">
                        </router-link>
                </div>
                <!-- 右边歌曲-歌手 -->
                <ul>
                     <li v-for="(key,i) in item.tracks" :key="i" v-show="i<3">
                        {{i+1}}.{{key.name}} - {{key.ar[0].name}}
                    </li>
                </ul>

            </div>
       </div>
    </div>
</template>

<script>
import {getTopList,getPlaylistDetail} from "../api/rank"
    export default {
        data(){
            return{
                lists:[],
            }
        },
        // 组件路由最早钩子
        beforeRouteEnter (to, from, next) {
            // 第一种写法,页面渲染前获取数据
            // 请求一个接口
            getTopList().then(data=>{
                // next();//跳转路由
                // 指定methods数据方法 调用方法
                next(vm=>vm.getPlaylistDetailFun(data.list))
            })
        },

        methods:{
            getPlaylistDetailFun(list){
                for(let i = 0;i < list.length;i++){
                    let id = list[i].id;
                    getPlaylistDetail({id}).then(data=>{
                        this.lists.push(data.playlist);
                    })
                }
            }
        },
         created(){
        //   getTopList().then(data=>{
        //       for(let i=0;i<data.list.length;i++){
        //           let id=data.list[i].id;
        //           getPlaylistDetail({id}).then(data=>{
        //               this.lists.push(data.playlist);
        //           })
        //       }
        //   })
         }
        
    }
</script>

<style lang="less">
.toplist{
    margin-top: 5px;
    padding-bottom: 50px;
    .item{
       margin: 0px 8px;
       padding:2px 0px;
       border-bottom: 1px solid #E1E2E2 ;
       height: 90px;
       display: flex;
      .img{
          flex: 0 0 90px;
          margin-right: 18px;
          background-color: chocolate;
          overflow: hidden;
          width: 90px;
          height: 90px;
          border-radius: 3px;
          img{
              width: 90px;
              height: 90px;
          }
          
        }
        ul{
            flex: 1;
            height: 90px;
            margin-top: 4px;
            li{
                height: 27px;
                line-height: 27px;
                color:#1B1B28;
                overflow: hidden;
                 text-overflow: ellipsis;
                 display: -webkit-box;
                -webkit-line-clamp: 1;
               -webkit-box-orient: vertical;
            }
        }
    }
}
</style>