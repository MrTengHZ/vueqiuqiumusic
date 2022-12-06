import request from "./http";

// 搜索
export function search(params){
    return request({
        url:'/search',
        method:"get",
        params,
    })
}


// 获取热搜
export function hotSearch(params){
    return request({
        url:'/search/hot',
        method:"get",
        params,
    })
}

// 搜索建议
export function SearchSuggestions(params){
    return request({
        url:'/search/suggest',
        method:"get",
        params,
    })
}