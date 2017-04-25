<template>
    <!-- 店铺信息 -->
    <div class="store-info">
        <div class="info-list"><text class="title">商铺名称</text><input ref="input" type="text" maxlength="20" placeholder="请输入商铺名称" :value="shopName"  class="info-content" @input="pieceData($event,'name')" />
        </div>
        <div class="info-list"><text class="title">商铺类型</text><div class="select-location" @click="StoreTypeShow"><text :class="['select-text',shopType?'':'not-select-text']">{{shopType?shopType:'请选择商铺类型'}}</text><image class="more" src="https://s.kcimg.cn/wap/images/detail/o2oImg/settled_into@2x.png"></image></div>
        </div>
        <div class="info-list"><text class="title">商铺位置</text><div class="select-location" @click="locationPop"><text :class="['select-text',locationSelected?'':'not-select-text']">{{shopCity?shopCity:'请选择城市'}}</text><image class="more" src="https://s.kcimg.cn/wap/images/detail/o2oImg/settled_into@2x.png"></image></div>
        </div>
        <div class="info-list"><text class="title">详细地址</text><input type="text" maxlength="30" placeholder="请输入详细位置" name="" :value="shopCityDetail" class="info-content cityInfo" @input="pieceData($event,'address')"/><div class="location" @click="goMap"><image class="location-icon" src="https://s.kcimg.cn/wap/images/detail/o2oImg/settled_location@2x.png"></image><text class="location-text">定位</text></div>
        </div>
    </div>
</template>

<script>
    import router from '../router/router'
    export default {
        props:['shopName','shopType','shopCity','shopCityDetail','locationSelected'],
        data(){
            return {

            }
        },
        methods: {
            locationPop(event){
                this.$emit('locationPop');
            },
            //展开选择商铺类型的弹层
            StoreTypeShow(event){
                this.$emit('StoreTypeShow')
            },
            //拼接对象
            pieceData(event,type){
                this.$emit('pieceData',event.value,type)
            },
            //定位
            goMap(){
                this.$emit('goMap')
            }
        }
    }
</script>

<style scoped>
    .store-info {
        padding-left: 30px;
        border-top-width: 20px;
        border-top-style: solid;
        border-top-color:#f5f5f5 ;
        background-color: #fff;
    }

    .info-list {
        height: 88px;
        flex-direction: row;
        align-items: center;
        border-bottom-style: solid;
        border-bottom-width: 1px;
        border-bottom-color: #e5e5e5;
    }

    .title {
        width:145px;
        font-size: 32px;
        color: #666;
    }

    .select-location {
        width:575px;
        padding-left: 30px;
        padding-right: 30px;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }

    .info-content {
        width:590px;
        padding-left: 30px;
        padding-right: 20px;
        height: 48px;
        flex: 1;
    }
    .cityInfo{
        width:437px;
    }
    .more {
        width: 16px;
        height: 26px;
    }

    .location {
        width: 138px;
        border-left-width: 1px;
        border-left-style: solid;
        border-left-color: #e5e5e5;
        flex-direction: row;
        align-items: center;
    }

    .location-icon {
        width: 20px;
        height: 26px;
        margin-right: 10px;
        margin-left: 28px;
    }

    .location-text {
        color: #09BB07;
        font-size: 28px;
    }

    .select-text {
        flex: 1;
        font-size: 32px;
    }

    .not-select-text {
        color: #999;
    }
</style>
