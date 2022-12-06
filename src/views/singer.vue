<template>
    <div>
        <van-loading v-if="!flag" type="spinner" color="#D4473C" />
        <b-scroll v-if="flag" :top="'80px'" :left="leftList" :right="rightList"></b-scroll>
    </div>
</template>

<script>
     import BScroll from "../components/base/BScroll.vue"
     import {getTopArtists,getArtistList} from "../api/singer"

    export default {
        data() {
            return {
                leftList:["热","A","B","C","D","E","F","G","H","I"],
                rightList:[
                    // {
                    //     name:"热",
                    //     data:[]
                    // }
                ],
                flag:false,
                name:"singer"
            }
        },
        methods: {
            // 热门歌手
            getTopArtistsFun(){
                getTopArtists().then(data=>{
                    this.rightList.unshift({
                        name:"热",
                        data:data.artists
                    })
                })
            },
            getArtistListFun(){
                let num=1;
                for(let i = 1; i < this.leftList.length;i++ ){
                    getArtistList({
                        type:1,
                        area:96,
                        initial:this.leftList[i],
                        limit:10
                    }).then(data=>{
                        let index = this.rightList.findIndex(item=>item.name == this.leftList[i]);
                        // this.rightList[index].data = data.artists;
                        // $set() 修改data数据，没有更新视图。
                        this.$set(this.rightList[index],"data",data.artists)

                        // this.rightList.push({
                        //     data:data.artists
                        // })
                        num++;
                        if(num == this.leftList.length){
                            this.flag = true;
                        }
                    })
                }
            },
            ArtistListFun(){
                for(let i = 1;i < this.leftList.length;i++){
                    this.rightList.push({
                        name:this.leftList[i],
                    })
                }
            }
        },
        created(){
            this.ArtistListFun();//调用方法
            this.getTopArtistsFun();
            this.getArtistListFun();
            
        },
        components:{
            BScroll
        },
    }
</script>

<style lang="less" scoped>
.van-loading {
    margin-top: 50px;
    text-align: center;
}
</style>