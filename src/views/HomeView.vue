<template>
    <div class="home">
        <top-bar title="附近商家"></top-bar>
        <!-- 商家列表 -->
        <list class="store-list" id="storeList">
            <cell class="header-wrapper">
                <!-- 附近商家类型选择  -->
                <home-header class="header"></home-header>
            </cell>

            <cell class="title-wrapper">
                <div class="title">
                    <text class="title-text">附近商铺</text>
                </div>
            </cell>

            <!-- 附近没有商家 -->
            <cell v-if="emptyList">
                <empty></empty>
            </cell>
            <!-- 附近商家列表 -->
            <cell v-if="lists.length"  class="cell" v-for="(item ,index) in lists" >
                <store-list :store="item" :id="item.id"></store-list>
            </cell>


        </list>
        <!-- 商家入驻按钮 -->
        <check-in-footer></check-in-footer>

        <!-- 加载中 -->
        <div v-if="Loading" class="loading">
            <div class="weui-toast">
                <div class="weui-loading weui-icon_toast"></div>
                <text class="weui-toast__content">数据加载中</text>
            </div>
        </div>

        <!--设置地址位置-->
        <setting-location v-if="settingLocationShow" @goSettingLocation="goSettingLocation"></setting-location>
    </div>
</template>

<script type="text/babel">
    import TopBar from '../components/TopBar.vue'
    import HomeHeader from '../components/HomeHeader.vue'
    import StoreList from '../components/StoreList.vue'
    import CheckInFooter from '../components/CheckInFooter.vue'
    import SettingLocation from '../components/SettingLocation.vue'
    import empty from '../components/empty.vue';
    import Tools from '../common/js/Tools';
    import router from '../router/router';

    const storage = weex.requireModule('storage');
    let stream = weex.requireModule('stream');
    let modal = weex.requireModule('modal');
    let thaw = weex.requireModule('THAW');
    let globalEvent = weex.requireModule('globalEvent');

    export default {
        data() {
            return {
                lists:[],
                emptyList:false,
                Loading: false,
                StoreListData:false,
                //当获取不到经纬度的时候显示去设置弹层
                settingLocationShow:false
            }
        },
        components:{
            TopBar,
            HomeHeader,
            StoreList,
            CheckInFooter,
            empty,
            SettingLocation,
        },
        methods: {
            alert(name){
                modal.alert({
                    message: name,
                    duration: 0.3
                })
            },
            getStarCount (repo, callback) {
                var url = 'https://didi.360che.com/nearby-api/' + repo;
                return stream.fetch({
                    method: 'GET',
                    type: 'json',
                    url: 'https://didi.360che.com/nearby-api/' + repo
                }, callback)
            },
            //没有获取到位置权限，去设置
            goSettingLocation(){
                thaw.goSettingLocation();
            },
            //获取地理位置
            getLocationData(wxLocation){
                let _this = this;

                //缓存获取附近商家列表的经纬度
//                storage.setItem('nowLocation',JSON.stringify(wxLocation));
//
//                //缓存商家入驻需要的经纬度
//                storage.setItem('location',JSON.stringify({'longitude': wxLocation.longitude,'latitude':wxLocation.latitude}));

                //请求附近商家
                _this.getStarCount('shopout/shoplist.aspx?lng=' + wxLocation.longitude + '&lat=' + wxLocation.latitude, res => {
//                    _this.Loading = false;
                    if(res.ok){
                        _this.lists =  res.data;
//                        storage.setItem('StoreList',JSON.stringify(res.data))
                    }else{
                        _this.lists =  [];
                    }

                    if(!_this.lists.length){
                        _this.emptyList = true;
                    }

                    thaw.onHideLoading();

                })
            }
        },
        created () {
            let _this = this;

            storage.getItem('StoreList', res => {
                if(res.result == 'success'){
//                    _this.Loading = false;
                    _this.lists =  JSON.parse(res.data);
                    if(!_this.lists.length){
                        _this.emptyList = true;
                    }
                    thaw.onHideLoading();
                }else{
                    storage.getItem('nowLocation', ele => {
                        if(ele.result == 'success'){
                            _this.getLocationData(JSON.parse(ele.data))
                        }else{
                            thaw.getLocation(function(data) {
                            });
                        }
                    });
                }
            });

            globalEvent.addEventListener('onSendLocation', function (locationData) {
                if(locationData.state == 'success'){
                    //显示设置获取地理位置权限
                    _this.settingLocationShow = false;
                    let o = {};
                    o.longitude = locationData.longitude;
                    o.latitude =    locationData.latitude;
                    storage.setItem('nowLocation',JSON.stringify(o));
                    storage.setItem('location',JSON.stringify(o));
                    //请求列表数据
                    _this.getLocationData(o)
                }else{
                    //隐藏loading
                    thaw.onHideLoading();
                    //显示设置获取地理位置权限
                    _this.settingLocationShow = true;
                }
            });

//            thaw.getLocation(function(data) {
//                if(data.state == 'success'){
//
//                }
//            });

//
//            //清除商家入驻页面缓存
//            try{
////            Tools.postGa();
//                storage.removeItem('DataAll');
//                storage.removeItem('City');
//            }catch(err) {
//                console.log(err)
//            }

//            let StoreList = sessionStorage.getItem('StoreList');
//            if(StoreList && StoreList != null){
//                _this.Loading= false;
//                _this.lists = JSON.parse(StoreList);
//                if(!_this.lists.length){
//                    _this.emptyList = true;
//                }
//                _this.StoreListData = true;
//            }
        },
        mounted(){

//            let ScrollTop = sessionStorage.getItem('ScrollTop');
//            if(ScrollTop){
//                ScrollTop = JSON.parse(ScrollTop);
//                if(ScrollTop[window.location.href]){
//                    let storeList = document.querySelector('#storeList');
//                    storeList.scrollTop = ScrollTop[window.location.href];
//                }
//            }
        }
    }
</script>


<style scoped>
    /*.home{*/
        /*flex: 1;*/
        /*height: 100%;*/
        /*background-color: #f5f5f5;*/
        /*overflow: hidden;*/
    /*}*/
    .store-list{
        flex: 1;
    }
    .header-wrapper{
    }
    .title-wrapper{
        margin-bottom: -1px;
        padding-top: 20px;
        background-color: #f5f5f5;
    }
    .title{
        height: 74px;
        justify-content: flex-end;
        background-color: #fff;
    }
    .title-text{
        font-size: 36px;
        text-align: center;
    }
    .loading{
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        z-index: 1000;
        justify-content: center;
        align-items: center;
    }

    .weui-toast {
        margin-top:50px;
        padding-top: 40px;
        padding-left: 30px;
        padding-right: 30px;
        padding-bottom: 40px;
        align-items: center;
        z-index: 5000;
        min-height: 7.6em;

        background-color: rgba(17, 17, 17, 0.7);

        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
    }

    .weui-loading {
        width: 100px;
        height: 100px;
        vertical-align: baseline;
        display: inline-block;
        -webkit-animation: weuiLoading 1s steps(12, end) infinite;
        animation: weuiLoading 1s steps(12, end) infinite;
        background: transparent url(https://s.kcimg.cn/wap/images/detail/o2oImg/loading.svg) no-repeat;
        background-size: 100%;
    }

    .weui-icon_toast {
        padding: 22px 0 0;
        display: block;
    }

    .weui-toast__content {
        font-size: 30px;
        color: #fff;
    }

    @-webkit-keyframes weuiLoading {
        0% {
            transform: rotate3d(0, 0, 1, 0deg);
        }
        100% {
            transform: rotate3d(0, 0, 1, 360deg);
        }
    }

    @keyframes weuiLoading {
        0% {
            transform: rotate3d(0, 0, 1, 0deg);
        }
        100% {
            transform: rotate3d(0, 0, 1, 360deg);
        }
    }

    .tip{
        position: fixed;
        z-index: 1000;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        justify-content: center;
        align-items: center;
        background-color: rgba(0,0,0,0.6);
    }
    .toast{
        width:560px;
        background-color:#fff;
        border-bottom-left-radius:6px;
        border-bottom-right-radius:6px;
        border-top-left-radius:6px;
        border-top-right-radius:6px;
    }
    .text-tip{
        padding-top: 50px;
        padding-right: 50px;
        padding-bottom: 50px;
        padding-left: 50px;
        font-size: 32px;
        color: #333;
        border-bottom-width: 1px;
        border-bottom-color:#e5e5e5;
        border-bottom-style:solid;
    }
</style>
<style>
    .weex-list-wrapper{
        position: relative;
        z-index: 1;
        -webkit-overflow-scrolling:touch;
    }
    .weex-scroller-wrapper{
        position: relative;
        z-index: 1;
        -webkit-overflow-scrolling:touch;
    }

</style>