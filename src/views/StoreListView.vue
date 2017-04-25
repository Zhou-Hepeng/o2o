<template lang="html">
    <div class="store-list">
        <top-bar :title="titleName"></top-bar>

        <!-- 商家列表 -->
        <list v-if="lists.length" class="list" id="storeList">
            <cell class="list-wrapper" v-for="item in lists">
                <store-list :store="item" :id="item.id"></store-list>
            </cell>
        </list>

        <!-- 没有商家 -->
        <div v-if="emptyList" class="empty">
            <empty></empty>
            <check-in-footer class="check-in" :isRadius="true"></check-in-footer>
        </div>


        <!-- 加载中 -->
        <div v-if="Loading"  class="loading">
            <div class="weui-mask_transparent"></div>
            <div class="weui-toast">
                <div class="weui-loading weui-icon_toast"></div>
                <text class="weui-toast__content">数据加载中</text>
            </div>
        </div>

    </div>
</template>

<script type="text/babel">
    import TopBar from '../components/TopBar.vue'
import StoreList from '../components/StoreList.vue'
import empty from '../components/empty.vue'
import CheckInFooter from '../components/CheckInFooter.vue'
const storage = weex.requireModule('storage')

let stream = weex.requireModule('stream')
let modal = weex.requireModule('modal')
import Tools from '../common/js/Tools';
let thaw = weex.requireModule('THAW');

export default {
    data(){
        return{
            lists:[],
            Loading:false,
            emptyList:false,
            titleName:['维修','配件','停车站','住宿','服务区','物流配货','加油站','服务站','经销商','敬请期待']
        }
    },
    components:{
        TopBar,
        StoreList,
        empty,
        CheckInFooter
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
        getData(){
            let _this = this;
            storage.getItem('nowLocation',ele => {
                if(ele.result == "success"){
                    let data = JSON.parse(ele.data);
                    this.getStarCount('shopout/shoplist.aspx?lng=' + data.longitude + '&lat=' + data.latitude + '&shoptypeid=' + _this.$route.params.typeId, res => {
                        _this.lists = res.ok ? res.data: '(network error)';

                        storage.getItem('ShopType',result => {
                            if(result.result == 'success'){
                                let ShopType = JSON.parse(result.data);
                                ShopType[_this.$route.params.typeId] = _this.lists;
                                storage.setItem('ShopType',JSON.stringify(ShopType))
                            }else{
                                let ShopType = {};
                                ShopType[_this.$route.params.typeId] = _this.lists;
                                storage.setItem('ShopType',JSON.stringify(ShopType))
                            }
                        });
//                        _this.Loading = false;
                        if(!_this.lists.length){
                            _this.emptyList = true;
                        }
                        thaw.onHideLoading();

                    })
                }else{
//                    _this.Loading = false;
                    this.emptyList = true;
                    thaw.onHideLoading();
                }
            })
        }
    },
    created () {
        let _this = this;

        //标题名称
        this.titleName = this.titleName[this.$route.params.typeId]

        storage.getItem('ShopType', ele => {
            if(ele.result == 'success'){
                let ShopType = JSON.parse(ele.data);

                if(ShopType[this.$route.params.typeId]){
//                    this.Loading= false;
                    this.lists = ShopType[this.$route.params.typeId];
                    if(!this.lists.length){
                        this.emptyList = true;
                    }
                    thaw.onHideLoading();
                }else{
                    _this.getData()
                }
            }else{
                _this.getData()
            }
        });

//        try{
//            //清除商家入驻页面缓存
//            storage.removeItem('DataAll')
//            storage.removeItem('City')
//            storage.removeItem('location')
//        }catch (err){
//            console.log(err)
//        }
  },
    mounted(){
//        let ScrollTop = sessionStorage.getItem('ScrollTop');
//        if(ScrollTop){
//            ScrollTop = JSON.parse(ScrollTop);
//            if(ScrollTop[window.location.href]){
//                let storeList = document.querySelector('#storeList');
//                storeList.scrollTop = ScrollTop[window.location.href];
//            }
//
//        }
    }
}
</script>

<style lang="css" scoped>
    .store-list{
        flex: 1;
        height: 100%;
        background-color: #fff;
        justify-content: flex-start;

    }
    .list{
        flex: 1;
        justify-content: center;
    }
    .cell{
        align-items: center;
    }
    .empty{
        /*flex: 1;*/
        align-items: center;
        /*justify-content: flex-start;*/
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
</style>
