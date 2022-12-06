<template>
    <div>
        <div class="guidePage">
              <!-- Swiper -->
            <div class="swiper-container guidePage-container">
                    
                <div class="swiper-wrapper">
                    <div class="swiper-slide">

                        <div class="guidePageslide">

                            <img src="../../assets/images/guidePage/1.jpg" alt="">
                        </div>
                        
                    </div>
                    <div class="swiper-slide">
                        <div class="guidePageslide">
                            <img src="../../assets/images/guidePage/2.jpg" alt="">
                        </div>
                    </div>
                    <div class="swiper-slide">
                        <div class="guidePageslide">
                            
                            <img src="../../assets/images/guidePage/3.jpg" alt="">
                            <div class="btn"><van-button type="primary" to="/" size="mini">进入首页</van-button></div>
                            
                        
                        </div>
                    </div>
                </div>
                <!-- Add Pagination -->
                <!-- <div class="swiper-pagination guidePage-pagination"></div> -->
            </div>
        </div>
    </div>
</template>

<script>
    // https://www.swiper.com.cn/
    // $cnpm install swiper@5.3.6 -S
    import Swiper from "swiper";
    export default {
        mounted(){
            new Swiper('.guidePage-container', {
                pagination: {
                    el: '.guidePage-pagination',
                    dynamicBullets: true,
                },
            });
        }
    }
</script>

<style lang="less" scoped>

    .swiper-container {
        position: fixed !important; 
        top:0px;
        left:0px;
        width: 100%;
        height: 100%;
        min-width: 320px;
        max-width: 750px;
        margin: 0 auto;
       --swiper-pagination-color: #fa818a;
    //    #5753b5
        //   #167e91
    }

    .guidePageslide{
        text-align: center;
        width: 100%;
        height: 100%;
         position: relative;
        img{
            width: 100%;
        }
        .btn{
            width: 100%;
            height: 100%;
            position: absolute;
            margin: 0 auto;
         
        }
    }
    
    button{
        background-color: rgb( 127,201,210)!important;
         border: 1px solid rgb( 127,201,210)!important;
        width: 126px;
        border-radius: 15px;
        height: 28px !important;
        bottom: 27%;
    }
</style>