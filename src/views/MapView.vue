<template lang="html">
    <div class="map">
        <div class="footer">
            <div class="location">
                <text class="text-location">朝阳区朝阳区建国路兴隆家园朝阳区朝阳区建国路兴隆家园朝阳区朝阳区建国路兴隆家园</text>
            </div>
            <div class="submit-wrapper">
                <text class="submit">提交</text>
            </div>
        </div>
    </div>
</template>

<script>

    var modal = weex.requireModule('modal')
    import Tools from '../common/js/Tools'

    export default {
        created(){
//            Tools.postGa();

            modal.toast({
                message: '\u62d6\u52a8\u5730\u56fe\u5230\u6b63\u786e\u4f4d\u7f6e\uff0c\u5e76\u70b9\u51fb\u63d0\u4ea4',
                duration: 0.3
            })
        }
    }
</script>

<style lang="css" scoped>
    .footer{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 750px;
        flex-direction: row;
        align-items: center;
        height: 90px;
    }
    .location{
        flex: 1;
        padding-left: 30px;
        padding-right: 30px;
        height: 90px;
        justify-content: center;
        border-top-style: solid;
        border-top-width: 1px;
        border-top-color: #B2B2B2;
        overflow: hidden;
    }
    .text-location{
        font-size: 28px;
        color: #666;
        text-overflow: ellipsis;
        overflow: hidden;
        display: block;
        white-space: nowrap;
        lines: 1;
    }
    .submit-wrapper{
        justify-content: center;
        align-items: center;
        width: 200px;
        height: 90px;
        background-color: #09BB07;
    }
    .submit{
        font-size: 32px;
        color: #fff;
    }
</style>
