import request from "./http";
// http://127.0.0.1:3000/toplist

// 获取获取排行版类型
export function getTopList(){
    return request({
        url:'/toplist',
        method:"get",
    })
}

// 获取歌手歌单
export function getPlaylistDetail(params){
    return request({
        url:'/artists',
        method:"get",
        params,
    })
}
