<template>
   <div>
        <div class="mvlists" ref="mvlists">
            <ul>
                <li v-for="(item,index) in mvList" :key="index">
                    <div class="imgs" v-show="playNum != index" @click="getUrlShow(index,item.id)" :style="{'background-image':'url('+item.cover+')'}">
                        <span class="iconfont icon-bofang"></span>
                    </div>
                    <div class="imgs" v-show="playNum == index"  @click="mvPlayend" >
                        <video :src="item.mvurl" controls :ref="'video'+index"  @loadeddata="loadeddataFun"></video>
                    </div>
                    <p>
                        {{item.name}}
                 
                        <i class="iconfont icon-iconzhengli_tiaozhuan" @click="tiaozhuan(item.id,item.name)"></i>
                  
                    </p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import {getMvList,getMvUrl} from "../api/mv.js"
export default {
    data(){
        return{
            mvList:[],
            playNum:null,
             offset:0, //偏移数量 , 用于分页
             flag:true,
        }
    },
  created(){
            getMvList({
                limit:5,
                offset:this.offset
            }).then(data=>{
                this.mvList = data.data;
            })
        },
        methods:{
            getUrlShow(index,id){
                if(this.playNum || this.playNum == 0){
                   this.$refs['video' + this.playNum][0].pause(); 
                }
                this.playNum = index;
                getMvUrl({id}).then(data=>{
                    // this.mvList[index].mvurl = data.data.url;
                    // 数据没有通过视图
                    this.$set(this.mvList[index],"mvurl",data.data.url)
                })
            },
            loadeddataFun(event){
                event.target.play();
            },
            mvPlayend(){
                // console.log(this.$refs['video' + this.playNum]);
                this.$refs['video' + this.playNum][0].pause();
                this.playNum = null;
            },
            // 添加数据
            addData(){
                // 防抖
                if(this.flag){
                    this.flag = false;
                    this.offset += 5; //第五条数据后添加五条数据
                    getMvList({
                        limit:5,
                        offset:this.offset
                    }).then(data=>{
                        this.mvList = this.mvList.concat(data.data);
                        this.flag = true;
                    })
                }
            },
            // 滚动条监听
            handleScroll(){
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;//滚动条偏移量
                let lis = this.$refs.mvlists.getElementsByTagName("li");
                let num = lis.length;
                let liHeight = lis[num-3].offsetTop;
                if(scrollTop > liHeight){ //触发添加数据
                   this.addData();
                }
            },
            tiaozhuan(id,name){
                this.$router.push({
                    name:"mvdetails",
                    params:{
                           id:id,
                           name:name,
                        }
                    })
            }
        },
        mounted(){
            this.$nextTick(()=>{
                // 监听滚动事件
                window.addEventListener("scroll",this.handleScroll)
            })
        },
          destroyed() {
                 window.removeEventListener("scroll", this.handleScroll);
        },

}
</script>

<style lang="less" scoped>
.mvlists{
    width: 100%;
    margin-top: 10px;
    li{
       margin-top: 10px;
       margin: 0 10px;
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
                font-size: 20px;
            }
            video{
                height: 211px;
                margin: 0 auto;
                display: block;
                width: 100%;
            }
        }
        p{
            font-size: 14px;
            padding: 0  0 35px;
            position: relative;
            i{
                position: absolute;
                right: 10px;
                bottom: 18px;
                font-size: 18px;
            }
        }
    }
}
</style>