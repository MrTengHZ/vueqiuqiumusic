<template>
    <div>
        <!-- 播放器 -->
        <div class="player" v-show="showplayer">
            <div class="button" @click="showplayer=false">
                <span class="iconfont icon-zuo-fanhui"></span>
            </div>
            <div class="title">
                <h2>{{SongDetail.name}}</h2>
                <h3><span v-for="(key,index) in SongDetail.ar" :key="index">{{key.name}}&nbsp;</span></h3>
            </div>
            <div class="content">
                <div v-show="togglelyric == true" @click="togglelyric=false" :class="['img','play',{'pause':iconplay}]">
                    <img :src="SongDetail.al.picUrl" alt="">
                </div>

                <!-- 歌词 -->
                <div v-show="togglelyric != true" @click="togglelyric=true" class="lyrics">
                    <ul :style="{'top':lyricTop}">
                        <li :class="{'con':currentRow == index}" ref="gchg" v-for="(item,index) in lyric" :key="index">
                            {{item.text}}
                        </li>
                    </ul>
                </div>
            </div>

            <!-- 扩展功能 -->
            <div class="functionExpansion">
                <ul>
                    <li> <i class="iconfont icon-dianzan1"></i> </li>
                    <li @click.stop="comment"> <i class="iconfont icon-pinglun"></i> </li>
                </ul>
            </div>

            <!-- 进度条 -->
            <div class="range">
                <div class="bar">
                    <span class="timeLeft">{{timeLeft | playerTime}}</span>
                    <van-slider :step="0.01" v-model="value" @input="lyricInput" bar-height="4px" @change="sliderchange"
                        @drag-start="start" @drag-end="end" active-color="#ee0a24">
                        <template #button>
                            <div class="custom-button"></div>
                        </template>
                    </van-slider>
                    <span class="timeRight">{{duration | playerTime}}</span>
                </div>
            </div>

            <!-- 下栏功能 -->
            <div class="buttons">
                <div v-if="playerType == 1" class="iconfont icon-shunxubofang1-icon" @click="changeMode"></div>
                <div v-else class="iconfont icon-suiji" @click="changeMode"></div>
                <div class="iconfont icon-shangyishou1" @click.stop="lastsong"></div>
                <div :class="['iconfont',iconplay?'icon-zanting':'icon-ico_zanting_xuanzhong','center']"
                    @click.stop="toggleplay"></div>
                <div class="iconfont icon-shangyishou-copy" @click.stop="nextsong"></div>
                <div :class="['iconfont',like==true ? 'icon-xinaixin-fuben':'icon-xinaixin11']"
                    @click.stop="collection"></div>
            </div>
        </div>

        <!-- 迷你播放器 -->
        <div class="mini-player">
            <div :class="['img','play',{'pause':iconplay}]" @click.stop="showplayer=true">
                <img :src="SongDetail.al.picUrl" alt="">
            </div>
            <div class="text" @click.stop="showplayer=true">
                <h2>{{SongDetail.name}}</h2>
                <h3><span v-for="(key,index) in SongDetail.ar" :key="index">{{key.name}}&nbsp;</span></h3>
            </div>
            <div class="control" @click.stop="toggleplay">
                <span class="iconfont icon-zanting" v-show="iconplay"></span>
                <span class="iconfont icon-ico_zanting_xuanzhong" v-show="!iconplay"></span>
            </div>
            <div class="lists" @click.stop="isMusicPlayList = true">
                <span class="iconfont icon-gengduo2"></span>
            </div>
        </div>

        <!-- 音乐播放列表 -->
        <div class="musicPlayList" v-if="isMusicPlayList">

            <div class="dt">
                <h1><i class="iconfont icon-shunxubofang1-icon"></i>顺序播放({{playerLists.length}})</h1>
                <span class="iconfont icon-lajitong1" @click.stop="delall"></span>
            </div>
            <dl>
                <dd v-for="(item,index) in playerLists" :key="index" @click="editPlayerId(item.id)">
                    <p><i v-if="item.id == playerId" class="iconfont icon-iconfontlaba"></i>{{item.name}}</p>
                    <span class="iconfont icon-message-close" @click.stop="del(item.id)"></span>
                </dd>

            </dl>
            <div class="button" @click="isMusicPlayList = false">关闭</div>
        </div>

        <audio v-show="false" ref="audio" controls :src="musicData" @ended="endedFun" @canplay="canplayFun"
            @timeupdate="timeupdate"></audio>
    </div>
</template>

<script>
import { Toast } from "vant";
import { getSongUrl, getSongDetail, getLyric, likeSongs, songReview } from "../../api/base.js"
import { getPlaylistDetail } from "../../api/rank";
import { favoriteMmusic } from "../../api/login";
export default {
    props: ['playerId', 'listId', 'playIndex', 'playLists'],
    data() {
        return {
            showplayer: false,//隐藏播放器界面
            value: 0,
            timeLeft: 0,
            timeRight: 0,
            musicData: null,
            duration: 0, //总时长

            //音乐播放列表 
            playerLists: [],  //播放列表
            isMusicPlayList: false,
            playerType: 1, //播放类型 1列表播放 2 随机播放
            togglelyric: true,
            lyric: [],//歌词
            lyricTop: '210px',
            currentRow: 0, //歌词高亮

            aixin: true,
            iconplay: true, //暂停
            SongDetail: {
                al: {
                    picUrl: null
                }
            },
            flag2: true,
            height: "",
            lists: {},
            like: false,
        }
    },
    methods: {
        getPlaylistDetailFun() {
            favoriteMmusic({ uid: window.localStorage.userid }).then(data => {
                window.localStorage.setItem("musicListId", data.playlist[0].id);
            })
            getPlaylistDetail({ id: window.localStorage.musicListId }).then(data => {
                this.like = false;
                data.privileges.forEach(item => {
                    if (item.id == this.playerId) {
                        this.like = true;
                    }
                });
            })
        },
        // 播放歌曲地址
        getSongUrlFun() {
            getSongUrl({ id: this.playerId }).then(data => {
                this.musicData = data.data[0].url;
            })
        },
        // 歌曲信息
        getSongDetailFun() {
            getSongDetail(
                {
                    ids: this.playerId
                }).then(data => {
                    this.SongDetail = data.songs[0];

                    // 判断播放列表是否有相同数据
                    let index = this.playerLists.findIndex(item => item.id == data.songs[0].id);
                    if (index == "-1") { //数据找不到，数据添加播放列表里面
                        this.playerLists.push(this.SongDetail);
                    }
                })
        },
        // 调用接口获取歌词
        getLyricFun() {
            getLyric({ id: this.playerId }).then(data => {
                if (!data.lrc.lyric) {
                    this.formatLyric("找不到此歌曲歌词!")
                } else {
                    this.formatLyric(data.lrc.lyric);
                }

            })
        },
        // 处理歌词结构
        formatLyric(text) {
            this.lyric = [];
            let arr = text.split("\n"); //把原歌曲字符串转歌词
            let row = arr.length; //获取数组长度
            for (let i = 0; i < row; i++) {
                let temp_row = arr[i];//获取数据"[00:00.000] 作词 : 陈镇川"
                let temp_arr = temp_row.split("]");//分成两个数组
                let lyrictext = temp_arr.pop(); //删除数组最后一个，返回数据
                temp_arr.forEach(element => {
                    let obj = {};
                    // "[00:21.45" =>00:21.45
                    let time_arr = element.substr(1, element.length - 1).split(":");
                    let s = time_arr[0] * 60 + Math.ceil(time_arr[1]);//得到当前秒数
                    obj.text = lyrictext;
                    obj.time = s;
                    if (lyrictext.length > 0) {
                        this.lyric.push(obj);//每一行处理好数据放入数组中
                    }
                })
            }
        },

        // 开始拖动时触发
        start() {
            this.flag2 = false;
        },
        // 结束拖动时触发
        end() {
            this.flag2 = true;
            this.toggleplay();
        },

        // 点赞
        // likes(){

        // },

        //评论
        comment(){
            songReview({id: this.playerId }).then( data=>{
             console.log(data);
            })
        },

        // 切换播放
        toggleplay() {
            if (this.iconplay) {
                this.$refs.audio.play();//播放 
            } else {
                this.$refs.audio.pause();//暂停
            }
            this.iconplay = !this.iconplay;//切换按钮
        },
        // 上一首
        lastsong() {
            let { id } = this.SongDetail;  //获取id
            // 获取再播放列表中下标
            let index = this.playerLists.findIndex(item => item.id == id);
            // 让自减一，判断是否为第一首歌，上一首歌为歌曲最后一首歌。
            index = index - 1 < 0 ? this.playerLists.length - 1 : index - 1;
            this.$emit("get-player-id", this.playerLists[index].id); //修改父组件值
        },
        //下一首
        nextsong() {
            let { id } = this.SongDetail;  //获取id
            // 获取再播放列表中下标
            let index = this.playerLists.findIndex(item => item.id == id);
            // 1.让自加一下标，判断是否为最后一首歌，最后一首歌，显示第一首歌播放
            index = index + 1 > this.playerLists.length - 1 ? 0 : index + 1;
            this.$emit("get-player-id", this.playerLists[index].id); //修改父组件值
        },
        endedFun() {
            this.iconplay = true;
            clearInterval(this.clearset);//结束播放
            if (this.playerType == 1) { //列表播放
                this.nextsong();//下一首歌
            } else {  //随机播放
                let index = parseInt(Math.random() * this.playerLists.length);
                this.$emit("get-player-id", this.playerLists[index].id); //修改父组件值
            }
        },
        // 修改播放类型
        changeMode() {
            this.playerType = this.playerType == 1 ? 2 : 1
        },
        // 音乐播放器数据加载完，直接获取歌曲时间
        canplayFun() {
            if (this.iconplay) {
                this.$refs.audio.play();//播放
                this.iconplay = false;//切换按钮
            }

            this.duration = this.$refs.audio.duration; //歌曲总时间
            this.timeRight = this.duration;
        },
        // 获取滚动条变化
        sliderchange() {
            let duration = this.$refs.audio.duration * this.value / 100;
            this.timeLeft = duration;//修改页面数据
            this.$refs.audio.currentTime = duration;//修改播放器时间
        },
        timeupdate() {

            this.timeLeft = this.$refs.audio.currentTime;

            let currentTime = this.$refs.audio.currentTime; //实时变化时间
            // 计算滚动条效果
            if (this.flag2) {
                this.value = currentTime / this.duration * 100;
            } else {
                this.$refs.audio.pause();//暂停
            }
            if (this.value == 100) {
                this.$refs.audio.pause();
                this.iconplay = true;
            }
        },
        // 实时动态显示歌词变化
        lyricInput() {
            this.sliderchange()
            let duration = parseInt(this.$refs.audio.duration * this.value / 100);
            for (let i = 0; i < this.lyric.length; i++) {
                if (duration == this.lyric[i].time) {
                    //    this.height=this.$refs.gchg[i].offsetHeight;
                    this.lyricTop = 225 - i * 42 + "px";
                    this.currentRow = i; //歌词高亮
                    break;
                }
            }

        },
        editPlayerId(id) {
            this.$emit("get-player-id", id)
        },
        del(id) {
            var index = this.playerLists.findIndex(item => item.id == id);
            this.playerLists.splice(index, 1);
        },
        delall() {
            this.playerLists = [];
        },
        listIdtwo(listId) {
            getPlaylistDetail({ id: listId }).then(data => {
                this.playerLists = data.playlist.tracks;  //获取歌单数据  
            })
        },
        //喜欢音乐
        collection() {
            this.like = !this.like;
            likeSongs, songReview({ id: this.playerId, like: this.like }).then(data => {
                if (data.code == 200) {
                    if (this.like) {
                        Toast({
                            message: '收藏成功',
                            icon: 'like-o',
                        })
                    } else {
                        Toast({
                            message: '取消收藏',
                            icon: 'like-o',
                        })
                    }
                } else {
                    Toast({
                        message: '收藏失败',
                        icon: 'like-o',
                    });
                }
            })
        }
    },
    watch: {
        playerId() {
            this.getSongUrlFun();
            this.getSongDetailFun();
            this.getLyricFun();
            this.getPlaylistDetailFun();
            this.value = 0;
            this.iconplay = true;
        },
        listId() {
            getPlaylistDetail({ id: this.listId }).then(data => {
                this.playerLists = data.playlist.tracks;  //获取歌单数据  
            })
        },
        timeLeft() {
            for (let i = 0; i < this.lyric.length; i++) {
                if (parseInt(this.timeLeft) == this.lyric[i].time) {
                    // this.height=this.$refs.gchg[i].offsetHeight;
                    this.lyricTop = 225 - i * 42 + "px";
                    this.currentRow = i; //歌词高亮
                    break;
                }
            }
        }

    },
    filters: {
        playerTime(data) {

            let m = parseInt(data / 60);// 分钟
            let s = parseInt(data % 60);// 秒
            if (m == 0 && s == 0) {
                return "0:00";
            } else {
                return m + ":" + (s < 10 ? "0" + s : s);
            }
        }
    },
}
</script>

<style lang="less" scoped>
.musicPlayList {
    background-color: #fff;
    position: fixed;
    left: 0px;
    bottom: 0px;
    z-index: 850;
    width: 100%;
    height: 310px;
    border-radius: 5px 5px 0 0;
    box-shadow: 0px 0px 4px 0px #bfbfbf;

    .dt {
        margin-top: 12px;
        height: 28px;
        line-height: 28px;
        position: relative;

        h1 {
            font-size: 16px;
            text-indent: 18px;

            i {
                font-size: 18px;
                margin-right: 8px;
            }
        }

        span.iconfont {
            display: inline-block;
            position: absolute;
            top: 2px;
            right: 25px;
            font-size: 18px;
        }
    }

    dl {
        height: 222px;
        overflow-y: scroll;

        dd {
            text-indent: 18px;
            font-size: 14px;
            height: 37px;
            line-height: 37px;
            position: relative;

            p {
                i {
                    margin-right: 8px;
                    color: red;
                }

                width: 80%;
                height: 37px;
                overflow: hidden;
            }

            span.iconfont {
                display: inline-block;
                position: absolute;
                top: 2px;
                right: 25px;
                font-size: 18px;
                color: red;
            }
        }
    }

    .button {
        height: 45px;
        line-height: 45px;
        text-align: center;
        font-size: 16px;
        position: absolute;
        left: 0px;
        bottom: 0px;
        width: 100%;
    }
}

// 播放器界面
.player {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: #817C7A;
    z-index: 900;

    .button {
        position: absolute;
        width: 20px;
        font-weight: bold;
        top: 14px;
        left: 14px;

        .iconfont {
            font-size: 18px;
            color: #fff;
        }
    }

    .title {
        text-align: center;
        color: #fff;

        h2 {
            font-size: 16px;
            margin-top: 10px;
        }

        h3 {
            font-size: 12px;
        }
    }

    .content {
        margin-top: 10px;
        height: 435px;
        width: 100%;
        position: relative;

        .img {
            width: 275px;
            height: 275px;
            border: 12px solid #96908D;
            position: absolute;
            top: 0px;
            left: 0px;
            right: 0px;
            bottom: 0px;
            margin: auto;
            border-radius: 50%;

            img {
                width: 100%;
                border-radius: 50%;
            }

            &.play {
                animation: rotate 20s linear infinite;
            }

            &.pause {
                animation-play-state: paused;
            }
        }

        .lyrics {
            width: 100%;
            height: 435px;
            position: relative;
            overflow: hidden;
            margin-top: 30px;

            ul {
                position: absolute;
                width: 100%;
                text-align: center;
                top: 225px;
                left: 0px;

                li {
                    // height: 36px;
                    line-height: 42px;
                    color: #CBCCCC;
                    font-size: 14px;

                    &.con {
                        color: #fff;
                    }
                }
            }
        }
    }

    .range {
        position: absolute;
        bottom: 90px;
        text-align: center;
        height: 20px;
        width: 100%;
        display: flex;
        align-items: center;

        .bar {
            width: 246px;
            margin: 0 auto;
            color: #fff;
            position: relative;
            font-size: 12px;
            .timeLeft {
                position: absolute;
                left: -36px;
                top: -4px;
            }

            .timeRight {
                position: absolute;
                right: -36px;
                top: -4px;
            }
        }
    }

    .buttons {
        display: flex;
        position: absolute;
        bottom: 40px;
        width: 100%;

        .iconfont {
            flex: 1;
            width: 20%;
            text-align: center;
            font-size: 27px;
            line-height: 38px;
            color: #fff;

            &.center {
                font-size: 37px;
            }
        }

        .icon-xinaixin-fuben {
            color: #ff1b0a !important;
        }
    }
}

//扩展功能
.functionExpansion {
    width: 100%;
    position: absolute;
    bottom: 122px;
    ul {
        display: flex;
        justify-content: space-around;
        li i {
            flex: 1;
            width: 20%;
            text-align: center;
            font-size: 27px;
            line-height: 38px;
            color: #fff;
        }
    }

}

// 迷你播放器
.mini-player {
    position: fixed;
    left: 0px;
    bottom: 0px;
    height: 48px;
    width: 100%;
    background: #fff;
    box-shadow: 0px 0px 4px 0px #bfbfbf;
    display: flex;
    z-index: 99;

    .img {
        flex: 0 0 55px;
        text-align: center;

        img {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            margin: 6px auto;
        }

        &.play {
            animation: rotate 10s linear infinite;
        }

        &.pause {
            animation-play-state: paused;
        }
    }

    .text {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;

        h2 {
            font-size: 16px;
            color: #1B1C1C;
            margin-top: 5px;
        }

        h3 {
            font-size: 12px;
            color: #929393;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
        }
    }

    .control {
        flex: 0 0 36px;

        .iconfont {
            font-size: 29px;
            color: #474848;
            line-height: 48px;
            display: inline-block;
        }
    }

    .lists {
        flex: 0 0 36px;

        .iconfont {
            font-size: 29px;
            color: #474848;
            line-height: 48px;
            display: inline-block;
        }
    }

}

@keyframes rotate {
    0% {
        transform: rotate(0);
    }

    100% {
        transform: rotate(360deg);
    }
}

.custom-button {
    width: 6px;
    height: 6px;
    border: 5px solid #fff;
    background-color: rgb(212, 68, 57);
    border-radius: 50%;
}
</style>