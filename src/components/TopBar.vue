<template>
    <div class="top-bar">
        <div class="back" @click="goBack">
            <text class="back-text" :style="{fontFamily: 'store'}">&#x56de;</text>
        </div>
        <text class="title-name">{{title}}</text>
    </div>
</template>

<script type="text/babel">
    import router from '../router/router'
    let thaw = weex.requireModule('THAW');
    export default {
        props:['title'],
        methods:{
            goBack(){
                if(this.title == '附近商家'){
                    thaw.onGoBack();
                }else{
                    router.go(-1);
                }
            }
        }
    }
</script>

<style scoped>
    .top-bar{
        position:relative;
        height:90px;
        justify-content: center;
        align-items: center;
        padding-left:70px;
        padding-right:70px;
        background-color:#fff;
        border-bottom-width: 1px;
        border-bottom-style:solid;
        border-bottom-color: #eee;
    }
    .back{
        position:absolute;
        left:0;
        top:0;
        width:108px;
        height: 90px;
        justify-content: center;
        align-items:center;
    }
    .back-text{
        color:#999;
        font-size:24px;
    }
    .title-name{
        color:#333;
        font-size:36px;
    }
</style>