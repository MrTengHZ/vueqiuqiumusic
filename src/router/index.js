import Vue from 'vue'
import VueRouter from 'vue-router'
import recommend from "../views/recommend.vue";
import guidePage from "../components/public/guidePage.vue";  //同步路由加载 引导页

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:"/recommend"
  },
  {
    path:"/guidePage",
    name:"guidePage",
    component:guidePage
  },
  {
    path:'/login',
    name:"login",
    component:()=>import("../components/base/login.vue")
  },
  {
    path:"/recommend",
    name:"recommend",
     // 添加路由元信息
     meta:{
      headerNav:true
  },
    component:recommend
  },
  {
    path:"/singer",
    name:"singer",
     // 添加路由元信息
     meta:{
      headerNav:true
  },
    component:()=>import("../views/singer.vue")  //懒加载
  },
  {
    path:"/rank",
    name:"rank",
     // 添加路由元信息
     meta:{
      headerNav:true
  },
    component:()=>import("../views/rank.vue")
  },
  {
    path:"/rank/ranklist",
    name:"ranklist",
    component:()=>import("../components/rank/ranklist.vue")
  },
  {
    path:"/base/songsheet",
    name:"songsheet",
    component:()=>import("../components/base/songsheet.vue")
  },
  {
    path:"/base/singerlist",
    name:"singerlist",
    component:()=>import("../components/base/singerlist.vue")
  },
  {
    path:'/personalCenter',
    name:"personalCenter",
    component:()=>import("../components/base/personalCenter.vue"),
    // 独享路由守卫
    beforeEnter: (to, from, next) => {
      let login = window.localStorage.getItem("login");
      // 判断登录情况
      if(!login){
        next("/login");
        return 
      }else{
        next();
      }
    }
  },
  {
    path:"/newmv",
    name:"newmv",
    meta:{
        headerNav:true
    },
    component:()=>import("../views/newmv.vue")
  },
  {
    path:'/mvdetails',
    name:"mvdetails",
    component:()=>import("../components/base/mvdetails.vue")
  },
  {
    path:'/favoriteMusicList',
    name:"favoriteMusicList",
    component:()=>import("../components/base/favoriteMusicList.vue")
  },
  // 创建歌单
  {
    path:'/establish',
    name:"establish",
    component:()=>import("../components/base/establish.vue")
  },
  // 收藏歌单
  {
    path:'/collection',
    name:"collection",
    component:()=>import("../components/base/collection.vue")
  },

]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to,from,next)=>{
//   let login = window.localStorage.getItem("login");
//   // 登录界面
//   if(to.path == "/login"){
//     next();
//     return;
//   }else{
//     // 判断登录情况
//     if(!login){
//       next("/login");
//       return;
//     }else{
//       next();
//     }
//   }
// })
export default router
