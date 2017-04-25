<template>
    <div>
        <div class="upload-img">
            <div class="img-type">
                <text class="userInfoTitle">营业执照</text>
            </div>
            <div class="upload-img-button">
                <div class="img-wrapper">
                    <image @click="upLoadImg" style="width:572px;height:320px;" :src="loadImgSrc?loadImgSrc:'https://s.kcimg.cn/wap/images/detail/o2oImg/settled_upload_bg@2x.jpg'"></image>
                    <div v-if="loadImgSrc" class="amend-img" @click="upLoadImg">
                        <text class="amend-text">修改</text>
                    </div>
                </div>
            </div>
        </div>
        <div class="user-info-list">
            <text class="userInfoTitle">联系人</text>
            <input type="text" placeholder="请输入联系人姓名" name="shopUserName" :value="UContactsName" maxlength="15"  class="user-info-content" @input="writeUserInfo($event.value,'2','name')"/>
        </div>
        <div class="user-info-list">
            <text class="userInfoTitle">手机号</text>
            <input type="tel" placeholder="请输入您的手机号码" name="shopUserPhone" :value="UContactsPhone" maxlength="11"  class="user-info-content user-phone" @input="writeUserInfo($event.value,'2','phone')"/>
            <div class="" :class="['code-button',!codeDisabled?'disabled':'']">
                <text class="code-text" @click="getCode">{{codeText}}</text>
            </div>

        </div>
        <div class="user-info-list">
            <text class="userInfoTitle">验证码</text>
            <input type="tel" placeholder="请输入收到的验证码" name="shopUserCode" :value="shopUserCode" maxlength="4"  class="user-info-content" @input="writeUserInfo($event.value,'2','code')"/>
        </div>
    </div>
</template>

<script>
    var stream = weex.requireModule('stream');
    var modal = weex.requireModule('modal')
    export default {
        props:['identity','loadImgSrc','UContactsName','UContactsPhone','shopUserCode','codeDisabled','second','codeText'],
        data(){
            return {
            }
        },
        methods:{
            AlertTo(name){
                modal.alert({
                    message: name,
                    duration: 0.3
                })
            },
            //选择身份
            SelectThe(number){
                if(this.identity == number){
                    return ;
                }

                this.$emit('selectThe',number)
            },
            //上传图片
            upLoadImg(){
                this.$emit('upLoadImg')
            },
            writeUserInfo(value,type,name){
                this.$emit('writeUserInfo',value,type,name)
            },
            //获取验证码
            getCode(){
                this.$emit('getCode')
            }
        }

    }
</script>

<style scoped>

    .user-info-list {
        position:relative;
        height: 88px;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: #e5e5e5;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
    }
    .userInfoTitle{
        width: 135px;
    }
    .upload-img{
        flex-direction: column;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: #e5e5e5;
    }

    .title {
        width:130px;
        color: #666;
        font-size: 32px;
    }

    .option {
        width: 32px;
        height: 32px;
        margin-right: 10px;
    }

    .recommend {
        margin-left: 30px;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    .shopkeeper {
        margin-left: 30px;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    .option-content {
        font-size: 32px;
        color: #999;
    }

    .selected {
        color: #666;
    }

    .user-info-content {
        width:560px;
        padding-left: 30px;
        padding-right:30px;
        height: 48px;
    }
    .user-phone{
        width:345px;
        padding-left:30px;
        padding-right:20px;
    }

    .img-type{
        height:88px;
        justify-content:center;
    }

    .upload-img-button{
        margin-top:10px;
        margin-bottom:30px;
        justify-content:center;
        align-items:center;
    }
    .img-wrapper{
        position:relative;
    }
    .amend-img{
        position:absolute;
        top:20px;
        right:20px;
        width:100px;
        height:44px;
        justify-content: center;
        align-items:center;
        border-bottom-left-radius:22px;
        border-bottom-right-radius :22px;
        border-top-left-radius :22px;
        border-top-right-radius :22px;
        background-color:rgba(0,0,0,0.8)
    }
    .amend-text{
        color:#fff;
        font-size:28px;
    }
    .code-button {
        position:absolute;
        padding-left:10px;
        padding-right:10px;
        top: 14px;
        right:30px;
        height: 60px;
        background-color: rgba(9,187,7,1);
        flex-direction: row;
        align-items: center;
        justify-content: center;
        border-bottom-left-radius:6px;
        border-bottom-right-radius:6px;
        border-top-left-radius:6px;
        border-top-right-radius:6px;
    }

    .code-text {
        color: #fff;
        font-size: 28px;
        flex:1;
        text-align: center;
    }
    .disabled {
        background-color: rgba(9,187,7,.4);
    }
</style>