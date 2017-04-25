<template>
    <div class="pop">
        <div class="content">
            <div class="header">
                <text class="title">其他商铺类型</text>
            </div>
            <textarea class="textarea" placeholder="输入商铺类型（如个人修理工）" @input="writeType" maxlength="8"></textarea>
            <div class="footer">
                <div class="cancel" @click="popHide">
                    <text class="cancel-text">取消</text>
                </div>
                <div class="ok" @click="submitPop">
                    <text class="ok-text">确定</text>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                TypeName:''     //输入自定义分类信息的内容
            }
        },
        methods:{
//            取消弹层
            popHide(){
                this.$emit('popHide')
            },
//            填写分类信息
            writeType(event){
                this.TypeName = event.value.trim();
            },
//            提交自定义分类信息
            submitPop(){
                this.$emit('submitPop',this.TypeName)
            }
        }
    }
</script>

<style scoped>
    .pop{
        position: fixed;
        top:0;
        right:0;
        bottom:0;
        left:0;
        justify-content: center;
        align-items: center;
        background-color:rgba(0,0,0,0.6);
        z-index:2;
    }
    .content{
        width:560px;
        height:392px;
        background-color:#fff;
        border-bottom-left-radius:6px;
        border-bottom-right-radius:6px;
        border-top-left-radius:6px;
        border-top-right-radius:6px;
    }
    .header{
        height:88px;
        border-bottom-width:1px;
        border-bottom-style:solid;
        border-bottom-color:#e5e5e5;
        justify-content: center;
        align-items: center;
        background-color:#fff;
    }
    .title{
        color:#333;
        font-size:32px;
    }
    .textarea{
        height:204px;
        border-bottom-width:1px;
        border-bottom-style:solid;
        border-bottom-color:#e5e5e5;
        border-left-color:#fff;
        border-top-width:0;
        border-left-width:0;
        border-right-width:0;
        border-top-color:#fff;
        border-right-color:#fff;
        margin-left:30px;
        margin-right:30px;
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
        color: #333333;
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