<template>
   <div>
        <div class="mvlists" ref="mvlists">
            <i class="iconfont icon-zuo-fanhui" @click="$router.push('/newmv')"></i>
            <ul>
                <li>
                    <!-- <div class="imgs" v-show="playNum != index"  :style="{'background-image':'url('+item.cover+')'}">
                        <span class="iconfont icon-zanting"></span>
                    </div> -->
                    <!-- <div class="imgs" v-show="playNum == index"  @click="mvPlayend" >
                        <video :src="item.mvurl" controls :ref="'video'+index"  @loadeddata="loadeddataFun"></video>
                    </div> -->
                    <div class="imgs">
                     <video :src="mvurl" controls  ></video>
                     </div>
                    <p>
                        {{mvname}}
                    </p>
                  <div class="comment">
                     <div class="title">
                       <h3>评论</h3>
                       <span>共685条评论</span>
                     </div>
                     <h3 class="u-hd4">精彩评论</h3>

                     <div class="comment-content" v-for="(item,index) in commentlist" :key="index">
                        <div class="head">
                            <a >
                                <img :src="item.user.avatarUrl" alt="">
                            </a>
                        </div>
                        <div class="cntwrap">
                            <div class="cnt">
                                <a >{{item.user.nickname}}</a>
                                <span>：{{item.content}}</span>
                            </div>
                            <div class="rp">
                              <div class="time">{{timeFormat(item.time)}}</div>
                              <div class="dlt">
                                  <a  class="iconfont icon-zan" v-if="!item.liked" @click.stop="commentLike(index)">
                                     ({{item.likedCount}})
                                  </a>
                                  <a  class="iconfont icon-_dianzan acc" v-if="item.liked" @click.stop="commentLike(index)">
                                     ({{item.likedCount}})
                                  </a>
                                   <span>|</span>
                                   <a  class="reply">回复</a>
                              </div>
                            </div>
                        </div>
                     </div>

    

                  </div>
                 
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import {getMvUrl,mvComments,commentLike} from "../../api/mv"
export default {
    data(){
        return{
            mvurl:"",
            mvname:"",
            offset:0,
            commentlist:[],
            flag:false,
            t:0,
        }
    },
    methods:{
        timeFormat(timestamp){
                var time = new Date(timestamp);
              //   var year = time.getFullYear();
                   var month = time.getMonth()+1;
                   var date = time.getDate();
                  var hours = time.getHours();
                 var minutes = time.getMinutes();
                //  var seconds = time.getSeconds();
               date=date<10? '0'+date:date;
               hours=hours<10? '0'+hours:hours;
                minutes=minutes<10? '0'+minutes:minutes;
              return month+'月'+date+'日'+' '+hours+':'+minutes;
            },
            //评论点赞
            commentLike(index){
               
               this.commentlist[index].liked=!this.commentlist[index].liked;
               if(!this.commentlist[index].liked){
                    this.commentlist[index].likedCount-=1;
                    this.t=0;
               }else{
                   this.commentlist[index].likedCount+=1;
                   this.t=1;
               }
                commentLike(
                    {
                    id:this.$route.params.id,
                    cid:this.commentlist[index].commentId,
                    t:this.t,
                    type:1
                    }).then(data=>{
                     console.log(data);
                });
            }
    },
     created(){
         this.mvname=this.$route.params.name;
            getMvUrl({id:this.$route.params.id}).then(data=>{
                     this.mvurl=data.data.url;
                });
            mvComments({id:this.$route.params.id}).then(data=>{
                    this.commentlist=data.comments;
                    console.log(this.commentlist);
                });
        },

}
</script>

<style lang="less" scoped>
.mvlists{
    width: 100%;
     color: #333;
     .icon-zuo-fanhui{
       position: absolute;
       left: 3px;
       top: 3px;
       color: #fff;
       z-index: 999;
     }
    li{
        .imgs{
            width: 100%;
            height: 211px;
            background-repeat: no-repeat;
            background-size: contain;
            position: relative;
            text-align: center;
            span{
                width: 40px;
                height: 40px;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                margin: auto;
                text-align: center;
                line-height: 40px;
                background: rgba(0,0,0,0.5);
                border-radius: 50%;
                color: #fff;
                font-size: 24px;
            }
            video{
                height: 211px;
                margin: 0 auto;
                display: block;
                width: 100%;
            }
        }
        p{
            font-size: 16px;
            padding: 10px  10px 10px;
            position: relative;
        }
    }
    .comment{
        width: 100%;
        box-sizing: border-box;
        padding: 0 10px;
        .title{
            height: 33px;
            display: flex;
            border-bottom: 1px solid rgb(194,12,12);
            h3{
                font-size: 20px;
                line-height: 35px;
            }
            span{
                font-size: 12px;
                margin: 9px 0 0 20px;
                color: #666;
            }
        }
         .u-hd4{
                height: 22px;
         
                position: relative;
                top: 10px;
                font-size: 14px;
                border-bottom: 1px solid #cfcfcf;
            }
            .comment-content{
                 padding: 20px 0 10px;
                 display: flex;
                 border-bottom: 1px dotted #ccc;
                  font-size: 12px;
                .head{
                    a{
                        display: inline-block;
                        width: 50px;
                        height: 50px;
                        background: burlywood;
                        img{
                            width: 100%;
                        }
                    }
                }
                .cntwrap{
                   width: 100%;
                    margin-left: 10px;
                    .cnt{
                        a{
                            
                            color: #0c73c2;
                        }
                    }
                   
                   .rp{
                       display: flex;
                       margin-top: 10px;
                       justify-content: space-between;
                       .time{
                         color: #999;
                       }
                       .dlt{
                           a{
                               font-size: 12px;
                               color: #333;
                           }
                           
                           .acc{
                               color: rgb(#37a6ff);
                           }
                           span{
                               margin: 0 5px;
                               color: #ccc;
                           }
                           .reply{
                               color: #666;
                           }
                       }
                   }
                }
            }
    }
}
</style>