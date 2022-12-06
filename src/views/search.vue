<template>
  <div class="search">
    <div class="tophe">
        <div class="button" @click="searchHidden">
           <span class="iconfont icon-zuo-fanhui"></span>
        </div>
        <div class="int">
          <!-- <van-search v-model="text" placeholder="搜索歌曲、歌手" /> -->
           <input type="text"  placeholder="搜索歌曲、歌手" v-model="text" @keyup.enter="submit" @input="sousuo">
        </div>
    </div>
    



    <div v-show="!text">
    <div class="Popular">
      <span>热门搜索</span>
      <ul>
        <li v-for="(item,index) in hotsearchlist" :key="index" @click="PopularSearch(item.first)">{{item.first}}</li>
      </ul>
    </div>

    <div class="history">
      <div class="dt">
        <p>搜索历史</p>
        <span class="iconfont icon-lajitong1" @click="delAll"></span>
      </div>
      <dl class="historical-records">

        <dt v-for="(item,index) in list" :key="index">
          <p>{{item.name}}</p>
          <span class="iconfont icon-message-close" @click="del(item.id)"></span>
        </dt>

      </dl>
    </div>
    </div>
    



    <!-- 搜索匹配 -->
    <div>
    <div class="musicList" v-if="text" ref="cont">
          <dt >
             <div class="imgs">
               <img :src="singerList[0].img1v1Url" alt="">
               </div>
             <span>歌手：{{singerList[0].name}}</span>
          </dt>
          <dt >
             <div class="imgs">
               <img :src="songSheetList[0].coverImgUrl" alt="">
             </div>
             <span>歌单：{{songSheetList[0].name}}</span>
          </dt>

         <dd v-for="(item,index) in resultlist" :key="index" @click.stop='setId(item.id)'>
            <div class="info">
              <h2>{{item.name}}</h2>
              <h3>
                <span>{{item.artists[0].name}}&nbsp;</span>
              </h3>
            </div>
          </dd>
    </div>
    </div>



  </div>
</template>

<script>
import {hotSearch,search,SearchSuggestions} from "../api/search";
// import BScroll from "@better-scroll/core";
export default {
    data(){
      return{
        id:0,
        text:"",
        list:[],
        hotsearchlist:[],
        resultlist:[],
        singerList:[],
        songSheetList:[],
      }
    },
    created(){
       hotSearch().then(data=>{
                this.hotsearchlist=data.result.hots;

            })
    },
    methods:{
      //搜索单曲
       searchSingle(){
         search({keywords:this.text}).then(data=>{
                this.resultlist=data.result.songs;
            });
       },
       //搜索歌手
       searchSinger(){
         search({keywords:this.text,type:100}).then(data=>{

                 this.singerList=data.result.artists;
            });
       },
       //搜索歌单
       searchSongSheet(){
         search({keywords:this.text,type:1000}).then(data=>{
                 this.songSheetList=data.result.playlists;
            });
       },
      //  搜索建议
      SearchSuggestionsAll(){
        SearchSuggestions({keywords:this.text}).then(data=>{
                console.log(data);
            });
      },
       //播放单曲
       setId(id){
         console.log(id);
                this.$emit("get-player-id",id);
            },
      searchHidden(){
       this.$emit("search-hidden");
      },
      sousuo(){
        if(this.text==""){
          return
        }else{
          this.searchSingle();
          this. searchSinger();
          this. searchSongSheet();
          this.SearchSuggestionsAll();
        }
          
      },
      submit(event){
        search({keywords:event.target.value}).then(data=>{
                this.resultlist=data.result.songs
            })
            this.text=event.target.value;
            this.list.push({name:event.target.value,id:this.id});
            event.target.value=" ";
            this.id+=1;
      },
      del(id){
       var index = this.list.findIndex(item => item.id == id);
              this.list.splice(index, 1);
      },
      delAll(){
        this.list=[];
      },
      PopularSearch(name){
         this.text=name;
         this.sousuo();
          this.list.push({name:name,id:this.id});
          this.id+=1;
      }
    
    },
    
}

</script>

<style lang="less">
.search{
 position: fixed;
 z-index: 0;
 left: 0;
 top: 0;
 right: 0;
 bottom: 0;
 margin: auto;
 .tophe{
         height: 40px;
         width: 100%;
         background: rgb(212,68,57);
          display: flex;
          // position: fixed;
         .button{
          flex: 0 0 40px;
          position: relative;
           span{
            font-size: 16px;
            left:10px;
            top:10px;
            color:#fff;
            position: absolute;
            }
          }
          .int{
            flex: 1;
            input{
               width: 88%;
               height: 24px;
                border: 0;
                color:#fff;
                background: rgb(212,68,57);
               border-bottom: 1px solid rgb(230,187,184);
               margin: 5px;
    
            }
               ::placeholder{  //通过这个设置 
                color: rgb(230,187,184) !important;
                font-size: 14px;
            }
          }
 }
 .Popular{
   width: 100%;
  //  height: 105px;
  //  border-bottom: 1px solid rgb(230,187,184);
   span{
     margin-top: 20px;
     margin-left: 20px;
     display: inline-block;
     font-size: 14px;
      color:rgb(127,128,128);
   }
   ul{
     margin: 10px 20px;
     display: flex;
     box-sizing: border-box;
     flex-wrap:wrap ;
     li{
       border: 1px solid #ccc;
        padding: 5px 4px;
        border-radius: 4px;
        font-size: 14px;
        margin:0 7px 7px  0;
        color:rgb(73,75,75);
     }
   }

 }
 .history{
   width: 100%;
   .dt{
     width: 100%;
     height: 30px;
     line-height: 30px;
     display: flex;
     position: relative;
     p{
       font-size: 14px;
       text-indent: 18px;
        color:rgb(127,128,128);
        
     }
     span{
       position: absolute;
       right: 20px;
       display: inline-block;
       font-size: 16px;
     }
   }
   .historical-records{
     margin: 5px 0px;
     dt{
       height: 30px;
       line-height: 30px;
       color:rgb(53,54,55);
       position: relative;
       text-indent: 18px;
       p{
         width: 80%;
         height: 30px;
         overflow: hidden;
       }
       span{
        display: inline-block;
         position: absolute;
        top: 2px;
        right: 20px;
        font-size: 16px;
       }
     }
   }
 }

 .musicList{
        background-color: #fff;
        width: 100%;
        position: relative;
        top:0px;
        padding-bottom: 50px;
        dt{
            height: 60px;
            line-height: 60px;
            font-size: 16px;
            color:#454747;
            border-bottom: 1px solid #E3E3E3;
            display: flex;
            .imgs{
              width: 46px;
              height: 46px;
              background: gold;
              margin:7px 18px;
              img{
                width: 100%;
                display: block;
              }
            }
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
            height: 50px;
            display: flex;
            .info{
                flex:1;
                text-indent: 18px;
               
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
        }
      }
}
</style>