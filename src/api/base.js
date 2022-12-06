import request from "./http";

// 通过id 获取歌曲url
export function getSongUrl(params){
    return request({
        url:'/song/url',
        method:"get",
        params,
        withCredentials: true
    })
}
// 通过id 获取歌曲url
export function getSongDetail(params){
    return request({
        url:'/song/detail',
        method:"get",
        params,
    })
}

// 通过id 获取歌词
export function getLyric(params){
    return request({
        url:'/lyric',
        method:"get",
        params
    })
}

// 歌曲评论
export function songReview(params){
    return request({
        url:'/comment/music',
        method:"get",
        params,
    })
}

//喜欢歌曲
export function likeSongs(params){
    return request({
        url:'/like',
        method:"get",
        params,
        withCredentials: true
    })
}

// 获取验证码
export function getCaptcha(params){
    return request({
        url:'/captcha/sent',
        method:"get",
        params
    })
}

// 通过id 手机验证码验证
export function getCaptchaVerify(params){
    return request({
        url:'/captcha/verify',
        method:"get",
        params
    })
}
