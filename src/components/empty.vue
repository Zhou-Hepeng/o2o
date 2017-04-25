<template lang="html">
    <div class="empty">
        <image style="width: 310px;height: 212px;" src="https://s.kcimg.cn/wap/images/detail/o2oImg/settled_no@2x.png"></image>
        <text class="tip">您附近还没有店铺哦</text>
        <text class="guide">上传店铺可获取卡路里哦，快来参与吧</text>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
    .empty{
        /*flex: 1;*/
        padding-top: 90px;
        justify-content: center;
        align-items: center;
        background-color: #fff;
    }
    .tip{
        margin-top: 60px;
        font-size: 36px;
        color: #666;
    }
    .guide{
        margin-bottom: 80px;
        font-size: 28px;
        color: #999;
    }
</style>
