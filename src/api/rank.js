import request from "./http";
// http://127.0.0.1:3000/toplist

// 获取获取排行版类型
export function getTopList(){
    return request({
        url:'/toplist',
        method:"get",
    })
}

// 获取排行榜数据
export function getPlaylistDetail(params){
    return request({
        url:'/playlist/detail',
        method:"get",
        params,
        withCredentials: true
    })
}
