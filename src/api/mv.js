import request from "./http";
// http://127.0.0.1:3000/toplist

// 获取mv视频
export function getMvList(){
    return request({
        url:'/mv/exclusive/rcmd',
        method:"get"
    })
}

// 获取mv视频地址
export function getMvUrl(params){
    return request({
        url:'/mv/url',
        method:"get",
        params
    })
}

//获取mv评论
export function mvComments(params){
    return request({
        url:'/comment/mv',
        method:"get",
        params
    })
}

//给mv评论点赞
export function commentLike(params){
    return request({
        url:'/comment/like',
        method:"get",
        params,
        withCredentials: true
    })
}




