<template>
    <div class="setting-location">
        <div class="content">
            <text class="header">定位未打开</text>
            <div class="wrapper">
                <text class="wrapper-text">您需要在系统设置中打开 GPS</text>
                <text class="wrapper-text">定位才可获取附近商家信息</text></div>
            <div class="buttons">
                <div class="cancel" @click="goBack">
                    <text class="cancel-text">取消</text>
                </div>
                <div class="ok" @click="goSettingLocation">
                    <text class="ok-text">去设置</text>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
    let thaw = weex.requireModule('THAW');
    export default {
        methods:{
            //没有获取到位置权限，去设置
            goSettingLocation(){
                this.$emit('goSettingLocation');
            },
            goBack(){
                thaw.onGoBack();
            }
        }
    }
</script>

<style scoped>
    .setting-location{
        position:fixed;
        left:0;
        top:0;
        bottom:0;
        right:0;
        background-color:rgba(0,0,0,.6);
        z-index:100;
        justify-content: center;
        align-items: center;
    }
    .content{
        width:660px;
        height:400px;
        background-color:#fff;
        justify-content: flex-start;
        align-items: center;
    }
    .header{
        height:60px;
        margin-top:40px;
        margin-bottom:25px;
        font-size: 40px;
        color: #333333;
    }
    .wrapper{
        margin-left:70px;
        margin-right:70px;
        justify-content: center;
        align-items: center;
    }
    .wrapper-text{
        font-size:36px;
        color:#333;
        margin-top:5px;
        margin-bottom:5px;
    }
    .buttons{
        width:660px;
        height:100px;
        margin-top:60px;
        flex-direction: row;
        border-top-width:1px;
        border-top-color:#eee;
        border-top-style: solid;
    }
    .cancel{
        flex: 1;
        justify-content: center;
        align-items: center;
        border-right-width:1px;
        border-right-color:#eee;
        border-right-style: solid;
    }
    .cancel-text{
        color:#666;
        font-size:36px;
    }
    .ok{
        flex: 1;
        justify-content: center;
        align-items: center;
    }
    .ok-text{
        color:#09BB07;
        font-size:36px;
    }
</style>