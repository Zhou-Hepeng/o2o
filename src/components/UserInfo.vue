<template>
    <div>
        <div class="user-info-list">
            <text class="title">选择身份</text>
            <div class="recommend" @click="SelectThe(2)">
                <image class="option" :src="identity==2?'https://s.kcimg.cn/wap/images/detail/o2oImg/settled_success@2x.png':'https://s.kcimg.cn/wap/images/detail/o2oImg/settled_check_no@2x.png'"></image>
                <text :class="['option-content',identity==2?'checked':'']">卡友推荐</text>
            </div>
            <div class="shopkeeper" @click="SelectThe(1)">
                <image class="option" :src="identity==2?'https://s.kcimg.cn/wap/images/detail/o2oImg/settled_check_no@2x.png':'https://s.kcimg.cn/wap/images/detail/o2oImg/settled_success@2x.png'"></image>
                <text :class="['option-content',identity==2?'':'checked']">店主</text>
            </div>
        </div>
        <div v-if="identity==2">
            <div class="user-info-list">
                <text class="title">联系人</text>
                <input type="text" placeholder="请输入店主姓名" name="UContactsName" :value="UContactsName" maxlength="15" class="user-info-content" @input="writeUserInfo($event.value,'1','name')" />
            </div>
            <div class="user-info-list">
                <text class="title">手机号</text>
                <input type="tel" placeholder="请输入店主的手机号码" name="UContactsPhone" :value="UContactsPhone" maxlength="11" class="user-info-content" @input="writeUserInfo($event.value,'1','phone')" />
            </div>
        </div>
    </div>
</template>

<script>
    var stream = weex.requireModule('stream');
    export default {
        props:['identity','UContactsName','UContactsPhone'],
        data(){
            return {
                phoneNumber:''
            }
        },
        methods:{
            //选择身份
            SelectThe(number){
                if(this.identity == number){
                    return ;
                }

                this.$emit('selectThe',number)
            },
            writeUserInfo(value,type,name){
                this.$emit('writeUserInfo',value,type,name)
            }
        },

    }
</script>

<style scoped>
    .user-info {
        border-top-width: 20px;
        border-top-style: solid;
        border-top-color:#f5f5f5 ;
        padding-left: 30px;
        background-color: #fff;
    }

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

    .upload-img{
        flex-direction: column;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: #e5e5e5;
    }

    .title {
        width:145px;
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

    .user-info-content {
        width:590px;
        padding-left: 30px;
        padding-right:30px;
        height: 48px;
    }
    .checked{
        color:#666;
    }
</style>
