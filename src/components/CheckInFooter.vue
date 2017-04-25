<template lang="html">
    <div :class="['check-in',isRadius ? 'radius':'']" @click="goAddStore" id="footer">
        <image style="width: 28px;height: 28px;" src="https://s.kcimg.cn/wap/images/detail/o2oImg/settled_add@2x.png"></image>
        <text class="text">商家入驻</text>

        <div class="tip" v-if="show">
            <div class="toast">
                <text class="text-tip">登录卡车之家账号上传商家数据可获得一定数量的卡路里，不登录上传数据将没有卡路里奖励哦</text>
                <div class="footer">
                    <div class="cancel" @click="checkIn">
                        <text class="cancel-text">直接上传</text>
                    </div>
                    <div class="ok">
                        <text class="ok-text" @click="goLogin">去登录</text>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import router from "../router/router"
import Tools from "../common/js/Tools"
let modal = weex.requireModule('modal');

var storage = weex.requireModule('storage');
var thaw = weex.requireModule('THAW');
let globalEvent = weex.requireModule('globalEvent');

export default {
    props:['isRadius'],
    data(){
        return{
            show: false,
            data:{
                ajaxuid:[],
                nameid:[]
            }
        }
    },
    created(){


        //被动监听返回的经纬度和地区名称
        let _this = this;
        globalEvent.addEventListener('onGoLoginCallBack',function(res){
            _this.show = false;
            _this.$getConfig().userId = res.userId;

            _this.$nextTick(function(){
                router.push('/addStore')
            })
        });

    },
    methods:{
        AlertTo(name){
            modal.alert({
                message: name,
                duration: 0.3
            })
        },
        goAddStore(){
            if(this.$getConfig().userId != 0){
                router.push('/addStore')
            } else{
                this.show = true
            }
        },
        checkIn(){
            this.show = false;
            this.$nextTick(function(){
                router.push('/addStore')
            });
        },
        goLogin(){
            thaw.onGoLogin()
        }
    },
    mounted(){
//        document.querySelector('#footer').addEventListener('touchmove', function(event) {
//            event.preventDefault();
//        });
    }
}
</script>

<style lang="css" scoped>
    .check-in{
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 750px;
        height: 90px;
        background-color: #09BB07;
    }
    .radius{
        width: 520px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
    }
    .text{
        margin-left:10px;
        font-size: 32px;
        color: #fff;
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
    .footer{
        flex-direction: row;
        justify-content: flex-start;
        align-items:center;
    }
    .cancel{
        flex: 1;
        height:100px;
        border-right-width:1px;
        border-right-style:solid;
        border-right-color:#e5e5e5;
        justify-content: center;
        align-items: center;
    }
    .cancel-text{
        font-size: 32px;
        color: #333;
    }
    .ok{
        flex: 1;
        height:100px;
        justify-content: center;
        align-items: center;
    }
    .ok-text{
        font-size: 32px;
        color: #02BB00;
    }
</style>
<style>
    .weui_cells_title{
        font-size:28px!important;
        padding-left:30px!important;
        padding-right:30px!important;
        margin-top:30px!important;
        margin-bottom:10px!important;
    }
    .weui_cell{
        padding-top:20px!important;
        padding-bottom:20px!important;
        padding-left:30px!important;
        padding-right:30px!important;
    }
    .weui_label{
        font-size:32px!important;
    }
    .weui_input{
        height:48px!important;
        font-size:32px!important;
    }
    .weui_btn_area{
        margin-top:30px!important;
        margin-bottom:30px!important;
        margin-left:30px!important;
        margin-right:30px!important;
    }
    .weui_btn{
        height:90px!important;
        line-height:90px!important;
        font-size:32px!important;
    }
    .account_switch{
        flex:1!important;
        text-align: center!important;
        font-size:28px!important;
    }
    .weui_cell_hd{
        width:130px!important;
    }
    .weui_label{
        width:130px!important;
    }
    .weui_vcode .weui_cell_ft .vcode{
        width:214px!important;
        font-size:28px!important;
        height:88px!important;
        line-height:88px!important;
    }
    .weui_extra_area{
        align-items: center!important;
        justify-content: center!important;
    }
    .weui_toptips{
        height:100px!important;
        font-size:28px!important;
    }
</style>
