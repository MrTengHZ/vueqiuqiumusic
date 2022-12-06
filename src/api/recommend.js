import request from "./http";
// http://127.0.0.1:3000/banner?type=3

// 获取轮播图数据
export function getBanner(){
    return request({
        url:'/banner?type=3',
        method:"get"
    })
}

// 获取推荐歌单接口

export function getPersonalized(){
    return request({
        url:'/personalized?limit=15',
        method:"get",
    })
}

// 推荐电台
export function recommendedStation(){
    return request({
        url:'/dj/recommend',
        method:"get",
    })
}

// 最新专辑
export function album(){
    return request({
        url:'/album/newest',
        method:"get",
    })
}
