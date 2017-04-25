<template lang="html">
    <div class="store-detail">
        <top-bar :title="store.name"></top-bar>
        <div class="content">
            <!-- 商家图片 -->
            <image style="width: 750px;height: 420px;" :src="imgSrc"></image>

            <!-- 店铺名 -->
            <div class="name-wrapper">
                <text class="name">{{store.name}}</text>
            </div>

            <!-- 店铺类型 -->
            <div class="type-wrapper">
                <div class="type-item" v-for="value in typeShow">
                    <text class="type-text">{{value}}</text>
                </div>
            </div>

            <!-- 地址 -->
            <div class="location" @click="goSiteMap">
                <text class="site">地址</text>
                <image class="site-tag" style="width:20px;height:26px" src="https://s.kcimg.cn/wap/images/detail/o2oImg/settled_location@2x.png"></image>
                <text class="site-text" >{{store.address}}</text>
                <image class="map" style="width: 16px;height: 26px;" src="https://s.kcimg.cn/wap/images/detail/o2oImg/settled_into@2x.png"></image>
            </div>
        </div>
        <!-- footer -->
        <div class="footer" id="footer">

            <image class="tell-tag" style="width: 66px;height: 66px;" src="https://s.kcimg.cn/wap/images/detail/o2oImg/settled_tell@2x.png"></image>

            <!-- 店主 电话 -->
            <div class="owner-tell">
                <text class="owner">{{store.linkman}}</text>
                <a @click="call"><text class="tell-text">{{store.linkcall}}</text></a>
                <!---->
            </div>

            <!-- 分享 -->
            <div class="share-wrapper">
                <image style="width: 28px;height: 28px;" src="https://s.kcimg.cn/wap/images/detail/o2oImg/settled_share@2x.png"></image>
                <text class="text-share" @click="sharen">分享</text>
            </div>
        </div>


    </div>
</template>

<script type="text/babel">
    import TopBar from '../components/TopBar.vue'
import router from "../router/router"
let stream = weex.requireModule('stream')
    var modal = weex.requireModule('modal')
import Tools from '../common/js/Tools'
let thaw = weex.requireModule('THAW');


export default {
    data(){
        return{
            store:{},
            imgSrc:'',
            typeShow:[],
            titleName:''
        }
    },
    components:{
        TopBar
    },
    methods: {
        AlertTo(name){
            modal.alert({
                message: name,
                duration: 0.3
            })
        },
        getStarCount (repo, callback) {
            return stream.fetch({
              method: 'GET',
              type: 'json',
              url: 'https://didi.360che.com/nearby-api/' + repo
            }, callback)
        },
        goSiteMap(){
            thaw.onShowMap({longitude: this.store.lng,latitude: this.store.lat,type:''},function(data){
                _this.AlertTo('调取地图成功')
            });

//            router.push({name:'siteMap',params:{longitude: this.store.lng,latitude: this.store.lat}})
        },
        call(){
            thaw.onGoCall(this.store.linkcall);
        },
        sharen(){
            let _this = this;
            thaw.onShowShare({
                title:_this.store.name, // 分享标题
                desc:_this.store.address, // 分享描述
                link:'https://nearby.360che.com/#/home', // 分享链接
                imgUrl:_this.imgSrc // 分享图标
            })
        }
    },
    created () {

        let _this = this;

        this.getStarCount('shopout/shopinfo.aspx?shopid=' + this.$route.params.shopid, res => {
            _this.store = res.ok ? res.data: '(network error)';
            if(_this.store.photo){
                _this.imgSrc = 'https://img1.kcimg.cn/'+ this.store.photo + '!600';
            }
            else{
                _this.imgSrc = 'https://s.kcimg.cn/wap/images/detail/o2oImg/settled_nonel@2x.png'
            }
            if(_this.store.typeshow.indexOf('|') != -1){
                let index = _this.store.typeshow.split('|')[1];
                if(index.indexOf(',') != -1){
                    index = index.split(',');

                    _this.typeShow = index;
                }else{
                    _this.typeShow.push(index)
                }
            }else {
                _this.typeShow.push(_this.store.typeshow);
            }
            thaw.onHideLoading();

//            wx.ready(function() {
//                // 分享到朋友圈
//                wx.onMenuShareTimeline({
//                    title: _this.store.name,
//                    link: window.location.href,
//                    imgUrl: _this.imgSrc,
//                    success: function () {
//                        ga('send', 'event',"分享附近商家","朋友圈",_this.store.typeshow);
//                    },
//                    cancel: function () {
//                        // 用户取消分享后执行的回调函数
//                    }
//                });
//                //分享给朋友
//                wx.onMenuShareAppMessage({
//                    title: _this.store.name,
//                    desc: _this.store.address,
//                    link: window.location.href,
//                    imgUrl: _this.imgSrc,
//                    success: function () {
//                        ga('send', 'event',"分享附近商家","微信好友",_this.store.typeshow);
//                    },
//                    cancel: function () {
//                        // 用户取消分享后执行的回调函数
//                    }
//                });
//            })
      })

    },
    mounted(){
//        Tools.scrollTop();
//        document.querySelector('#footer').addEventListener('touchmove', function(event) {
//            event.preventDefault();
//        });
    }
}
</script>

<style lang="css" scoped>
    .store-detail{
        height: 100%;
        background-color: #e5e5e5;
    }
    .content{
        flex: 1;
    }
    .name-wrapper{
        justify-content: center;
        padding-left: 30px;
        background-color: #fff;
    }
    .name{
        font-size: 36px;
        color: #333;
        word-wrap: break-word;
        word-break: break-all;
        padding-right: 30px;
        padding-top:20px;
        padding-bottom:20px;
    }

    .type-wrapper{
        flex-direction: row;
        flex-wrap: wrap;
        padding-left: 30px;
        padding-right: 30px;
        padding-bottom: 30px;
        text-align: center;
        background-color: #fff;
    }
    .type-item{
        justify-content: center;
        align-items: center;
        padding-left: 8px;
        padding-right: 8px;
        margin-right: 20px;
        margin-top:20px;
        height: 44px;

        border-top-style: solid;
        border-right-style: solid;
        border-bottom-style: solid;
        border-left-style: solid;

        border-top-color: #FEA802;
        border-right-color: #FEA802;
        border-bottom-color: #FEA802;
        border-left-color: #FEA802;

        border-top-width: 2px;
        border-right-width: 2px;
        border-bottom-width: 2px;
        border-left-width: 2px;

        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
    }
    .location{
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        margin-top: 20px;
        padding-left: 30px;
        height: 88px;
        overflow: hidden;
        background-color: #fff;
    }
    .site{
        margin-right: 30px;
        font-size: 32px;
        color: #666;
    }
    .site-tag{
        margin-right: 10px;
    }
    .site-text{
        flex: 1;
        margin-right: 10px;
        font-size: 32px;
        color: #333;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        lines:1;
        display: block;
    }
    .map{
        margin-right: 26px;
    }
    .footer{
        flex-direction: row;
        align-items: center;
        width: 750px;
        height: 100px;
        background-color: #09BB07;
    }
    .tell-tag{
        margin-left: 20px;
        margin-right: 20px;
    }
    .owner-tell{
        flex: 1;
    }
    .owner{
        margin-bottom: 5px;
        font-size: 24px;
        color: #fff;
    }
    .tell-text{
        font-size: 32px;
        color: #fff;
    }
    .share-wrapper{
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 180px;
        height: 100px;
        background-color: #0AAA08;
    }
    .text-share{
        margin-left: 16px;
        font-size: 28px;
        color: #fff;
    }

    .shadow{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: url(https://s.kcimg.cn/wap/images/detail/o2oImg/share_guide.png);
        background-repeat: no-repeat;
        background-size: cover;
    }
    .type-item:nth-child(3n-2){
        border-top-color: #FEA802;
        border-right-color: #FEA802;
        border-bottom-color: #FEA802;
        border-left-color: #FEA802;
    }
    .type-item:nth-child(3n-1){
        border-top-color: #FE7302;
        border-right-color: #FE7302;
        border-bottom-color: #FE7302;
        border-left-color: #FE7302;
    }
    .type-item:nth-child(3n){
        border-top-color: #028DFE;
        border-right-color: #028DFE;
        border-bottom-color: #028DFE;
        border-left-color: #028DFE;
    }
    .type-text{
        font-size: 28px;
    }
    .type-item:nth-child(3n-2) .type-text {
        color:#FEA802;
    }
    .type-item:nth-child(3n-1) .type-text{
        color:#FE7302;
    }
    .type-item:nth-child(3n) .type-text{
        color:#028DFE;
    }
</style>
