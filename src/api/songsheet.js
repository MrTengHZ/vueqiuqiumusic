import request from "./http";
// http://127.0.0.1:3000/toplist

// 获取获取排行版类型
export function getTopList(){
    return request({
        url:'/toplist',
        method:"get",
    })
}

// 获取歌单
export function getPlaylistDetail(params){
    return request({
        url:'/playlist/detail',
        method:"get",
        params,
        withCredentials: true
    })
}

// 收藏歌单
export function collectionSongList(params){
    return request({
        url:'/playlist/subscribe',
        method:"get",
        params,
        withCredentials: true
    })
}
 //用户歌单
 export function favoriteMmusic(params){
    return request({
        url:'/user/playlist',
        method:"get",
        params,
        withCredentials: true
    })
}
 
//用户喜欢的歌单
export function likeList(params){
    return request({
        url:'/likelist',
        method:"get",
        params,
        withCredentials: true
    })
}

