import request from "./http";
// http://127.0.0.1:3000/toplist


// 用户登录
export function userLogin(params){
    return request({
        url:'/login/cellphone',
        method:"post",
        params,
        withCredentials: true
    })
}

// 获取用户详情
export function userDetails(params){
    return request({
        url:'/user/detail',
        method:"get",
        params,
        withCredentials: true
    })
}

 //登录状态
 export function loginStatus(params){
    return request({
        url:'/login/status',
        method:"get",
        params,
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



