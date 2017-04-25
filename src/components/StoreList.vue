<template lang="html">
    <div class="list-item" @click="goDetail(id)">
        <div class="list-item-wrapper">
            <div class="pic">
                <image style="width:200px;height:140px" :src="imgSrc"></image>
            </div>
            <div class="content">
                <div v-if="store.certified==1" class="pass">
                    <image style="width:100px;height:48px" src="https://s.kcimg.cn/wap/images/detail/o2oImg/settled_certified@2x.png"></image>
                </div>
                <div class="name-wrapper">
                    <text class="name">{{store.name}}</text>
                </div>
                <div class="type-wrapper">
                    <text class="type">{{store.typeshow}}</text>
                </div>
                <div class="location">
                    <image class="site-tag" style="width:20px;height:26px" src="https://s.kcimg.cn/wap/images/detail/o2oImg/settled_location@2x.png"></image>
                    <text class="site-text">{{store.address}}</text>
                    <text class="distance">{{store.distanceKM>1000?(store.distanceKM%1000==0?store.distanceKM/1000:(store.distanceKM/1000).toFixed(2)):store.distanceKM}}</text>
                    <text class="unit">{{store.distanceKM>1000?'km':'m'}}</text>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import router from "../router/router"
var storage = weex.requireModule('storage')
const modal = weex.requireModule('modal')
let thaw = weex.requireModule('THAW');
const LOADMORE_COUNT = 4


export default {
    props:['store','id'],
    data(){
        return {
            imgSrc:''
        }
    },
    methods:{
        goDetail(id){
            let data = {};

//            let ScrollTop =  sessionStorage.getItem('ScrollTop');
//            if(ScrollTop){
//                data = JSON.parse(ScrollTop);
//            }
//            data[window.location.href] = this.$el.parentNode.parentNode.parentNode.scrollTop;
//            sessionStorage.setItem('ScrollTop',JSON.stringify(data));
            thaw.onShowLoading();
            router.push({name: 'detail', params: { shopid: this.id}});
        }
    },
    created(){
        if(this.store.photo){
            this.imgSrc = 'https://img1.kcimg.cn/' + this.store.photo + '!200'
        }
        else{
            this.imgSrc = 'https://s.kcimg.cn/wap/images/detail/o2oImg/settled_none@2x.png'
        }
    }
}
</script>

<style lang="css" scoped>
    .list-item{
        padding-left: 30px;
        padding-right:30px;
        padding-top: 30px;
        background-color: #fff;
    }
    .list-item-wrapper{
        flex-direction: row;
        border-bottom-style: solid;
        border-bottom-width: 1px;
        border-bottom-color: #e5e5e5;
        padding-bottom: 30px;
    }
    .pic{
        width: 200px;
    }
    .content{
        position: relative;
        flex: 1;
        margin-left: 20px;
        overflow: hidden;
    }
    .pass{
        position: absolute;
        right: 0;
        top: 0;
    }
    .name-wrapper{
        flex: 1;
        justify-content: center;
        margin-right: 116px;
        margin-bottom: 8px;
        height: 48px;
        overflow: hidden;
    }
    .name{
        font-size: 32px;
        color: #333;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        lines:1;
        display: block;
        font-weight: bold;
    }
    .type-wrapper{
        justify-content: center;
        margin-bottom: 4px;
        height: 44px;
    }
    .type{
        height: 44px;
        font-size: 28px;
        color: #666;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        lines:1;
        display: block;
    }
    .location{
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        height: 34px;
    }
    .site-tag{
        margin-right: 10px;
    }
    .site-text-wrapper{
        flex: 1;
        overflow: hidden;
    }
    .site-text{
        flex: 1;
        margin-right: 50px;
        font-size: 28px;
        color: #666;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        lines:1;
        display: block;
    }
    .distance{
        margin-right: 4px;
        font-size: 32px;
        color: #333;
    }
    .unit{
        font-size: 28px;
        color: #333;
    }
</style>
