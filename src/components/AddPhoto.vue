<template>
    <!-- 添加商铺照片 -->
    <div class="add-photo">
        <image class="bj" :src="shootSrc?shootSrc:'https://s.kcimg.cn/wap/images/detail/o2oImg/settled_photo_bg@2x.png'"></image>
        <div v-if="!shootSrc" class="shoot" @click="shoot">
            <div class="icon">
                <image style="width:181px;height:181px;" src="https://s.kcimg.cn/wap/images/detail/o2oImg/settled_photo@2x.png"></image>
            </div>
            <text class="text">拍摄店铺照片</text>
        </div>
        <div v-else="!shootSrc" class="amend-img" @click="shoot">
            <text class="amend-text">修改</text>
        </div>
    </div>
</template>

<script>
    export default {
        props:['shootSrc'],
        methods: {
            shoot(){
                this.$emit('shoot')
            }
        }
    }
</script>

<style scoped>
    .add-photo {
        position: relative;
        height: 420px;
        justify-content: center;
        align-items: center;
    }

    .bj {
        position: absolute;
        left: 0;
        top: 0;
        width: 750px;
        height: 420px;
    }

    .shoot {
        align-items: center;
    }

    .icon {
        width: 180px;
        height: 180px;
    }

    .text {
        color: #fff;
        font-size: 28px;
        margin-top: 20px;
    }
    .amend-img{
        position:absolute;
        top:30px;
        right:30px;
        width:138px;
        height:60px;
        justify-content: center;
        align-items:center;
        border-bottom-left-radius:30px;
        border-bottom-right-radius :30px;
        border-top-left-radius :30px;
        border-top-right-radius :30px;
        background-color:rgba(0,0,0,0.8)
    }
    .amend-text{
        color:#fff;
        font-size:32px;
    }
</style>
