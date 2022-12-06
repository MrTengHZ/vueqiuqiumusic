import axios from "axios";

// 创建axios实例化
// 本地：http://localhost:3000
// 服务器：http://47.242.6.152:3000
const service = axios.create({
    baseURL:"https://thzph.com",
    timeout:30000,  //请求超时时间
    headers:{
        "Content-Type":"application/json;charset=UTF-8" //表单数据传递转化
    }
})


// request 拦截器 发送数据到后台前拦截
service.interceptors.request.use(
    config=>{
        return config;
    },
    error=>{
        console.log("axios中request报错",error);
        Promise.reject(error);
    }
)

// response 拦截器 获取后台数据前拦截
service.interceptors.response.use(
    response =>{
        return response.data;
    },
    error=>{
        console.log("axios中response报错",error);
        Promise.reject(error);
    }
)

export default service;