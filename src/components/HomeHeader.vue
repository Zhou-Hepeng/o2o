<template>
    <div class="header">
        <div class="serve" v-for="item in data">
            <div class="serve-item" v-for="value in item" @click="goStoreList(value.typeid)">
                <div class="icon-wrapper">
                    <image class="icon" :style="{width: picW,height: picH}" :src="value.src"></image>
                </div>
                <text class="text">{{value.text}}</text>
            </div>
        </div>
    </div>
</template>

<script>
import router from "../router/router"

var modal = weex.requireModule('modal');
let thaw = weex.requireModule('THAW');

export default {
    data(){
        return{
            picW: '80px',//图片高度
            picH: '80px',//图片高度
            data:[
                [
                    {src:'https://s.kcimg.cn/wap/images/detail/o2oImg/settled_repair@2x.png',text:'维修',typeid:'1'},
                    {src:'https://s.kcimg.cn/wap/images/detail/o2oImg/settled_parts@2x.png',text:'配件',typeid:'2'},
                    {src:'https://s.kcimg.cn/wap/images/detail/o2oImg/settled_parking@2x.png',text:'停车站',typeid:'3'},
                    {src:'https://s.kcimg.cn/wap/images/detail/o2oImg/settled_hotel@2x.png',text:'住宿',typeid:'4'},
                    {src:'https://s.kcimg.cn/wap/images/detail/o2oImg/settled_service@2x.png',text:'服务区',typeid:'5'}
                ],
                [
                    {src:'https://s.kcimg.cn/wap/images/detail/o2oImg/settled_logistics@2x.png',text:'物流配货',typeid:'6'},
                    {src:'https://s.kcimg.cn/wap/images/detail/o2oImg/settled_gasstation@2x.png',text:'加油站',typeid:'7'},
                    {src:'https://s.kcimg.cn/wap/images/detail/o2oImg/settled_servicestation@2x.png',text:'服务站',typeid:'8'},
                    {src:'https://s.kcimg.cn/wap/images/detail/o2oImg/settled_distributor@2x.png',text:'经销商',typeid:'9'},
                    {src:'https://s.kcimg.cn/wap/images/detail/o2oImg/settled_more@2x.png',text:'敬请期待',typeid:'10'}
                ]
            ]
        }
    },
    methods:{
        AlertTo(name){
            modal.alert({
                message: name,
                duration: 0.3
            })
        },
        goStoreList(typeid){
//            this.AlertTo(typeid)
//            let ScrollTop = sessionStorage.getItem('ScrollTop');
//            if(ScrollTop){
//                ScrollTop = JSON.parse(ScrollTop);
//                ScrollTop[window.location.href] = 0;
//                sessionStorage.setItem('ScrollTop',JSON.stringify(ScrollTop))
//            }

            if(typeid != 10 && typeid != 9){
                thaw.onShowLoading();
                router.push({name:'storeList', params: { typeId: typeid}});
            }
            if(typeid == 9){
                location.href='https://dealerm.360che.com/';
            }
        }
    }
}
</script>

<style scoped>
    .header{
        padding-top: 30px;
        background-color: #fff;
    }
    .serve{
        flex-direction: row;
        justify-content: space-around;
        margin-bottom: 24px;
    }
    .serve-item{
        flex: 1;
        text-align: center;
    }

    .icon-wrapper{
        justify-content: center;
        align-items: center;
    }
    .icon{
    }
    .text{
        padding-top: 12px;
        padding-bottom: 6px;
        font-size: 24px;
        text-align: center;
        color:#333;
    }

</style>
