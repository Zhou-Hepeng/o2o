<template>
    <div class="success-pop">
        <div class="success-content">
            <div class="content-wrapper">
                <image style="width:120px;height:120px;" src="https://s.kcimg.cn/wap/images/detail/o2oImg/settled_success@2x.png"></image>
                <text class="add-success">添加成功</text>
            </div>
            <div class="button">
                <text class="button-text" @click="clickSuccess">我知道了</text>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        methods:{
            clickSuccess(){
                this.$emit('clickSuccess')
            }
        }
    }
</script>

<style scoped>
    .success-pop{
        position:fixed;
        top:0;
        left:0;
        bottom:0;
        right:0;
        justify-content: center;
        align-items: center;
        background-color: rgba(0,0,0,0.6);
        z-index:2
    }
    .success-content{
        width:560px;
        height:400px;
        background-color:#fff;
        justify-content: flex-end;
    }
    .content-wrapper{
        align-items: center;
    }
    .add-success{
        margin-top:20px;
        margin-bottom:50px;
        font-size:32px;
        color:#333;
    }
    .button{
        height:100px;
        justify-content: center;
        align-items:center;
        border-top-width: 1px;
        border-top-style: solid;
        border-top-color:#D2D3D5;
    }
    .button-text{
        color:#02BB00;
        font-size:36px;
    }
</style>