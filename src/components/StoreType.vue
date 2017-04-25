<template>
    <div class="store-type">
        <div class="content" v-if="!isMaintain">
            <div v-for="(item,index) in storeList" v-if="item.Id!=9" class="list" @click="selectType(item.Id,item.IsExtend,item.Typedescription)">
                <text class="list-text">{{item.Typedescription}}</text>
            </div>
            <div class="list" @click="selectType('','','write')">
                <text class="list-text">其他（填写）</text>
            </div>
            <div class="cancel" @click="selectType('','','cancel')">
                <text class="list-text">取消</text>
            </div>
        </div>
        <div class="content" v-else="!isMaintain">
            <div class="list">
                <text class="list-text">维修类（可多选）</text>
            </div>
            <div v-for="(item,index) in maintainList" class="list" @click="selectMaintainType(index,item.Id,item.Typedescription)">
                <text class="list-text">{{item.Typedescription}}</text>
                <image v-if="isSelected[index]" style="width:40px;height:30px;margin-left:58px;" src="https://s.kcimg.cn/wap/images/detail/o2oImg/settled_choice@2x.png"></image>
            </div>
            <div class="list">
                <text class="list-text" @click="selectType('','','write','isMaintain')">其他（填写）</text>
            </div>
            <div class="cancel" @click="maintainSelected">
                <text class="list-text">确定</text>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['storeList','maintainList'],
    data(){
        return {
            isMaintain:false,          //是否是维修
            isSelected:[]              //判断选项是否被选中
        }
    },
    created(){
        if(this.storeList[0] && this.storeList[0].Typedescription != '维修'){
            this.storeList = this.storeList.reverse();
        }
    },
    methods:{
        clickMaintain(event){
            this.isMaintain = true;
        },
        maintainSelected(event){
            this.$emit('maintainSelected',this.isSelected)
        },

//      选择商铺类型一级分类
        selectType(id,IsExtend,name,isMaintain){
            this.$emit('selectType',id,IsExtend,name,isMaintain)
            if(IsExtend == 1){
                this.isMaintain = true
            }
        },
//        选择维修类型
        selectMaintainType(index,id,name){

            if(this.isSelected[index]){
                this.isSelected[index] = '';
            }else{
                this.isSelected[index] = name;
            }
            this.isMaintain = false;
            this.isMaintain = true;
        }
    }
}
</script>

<style scoped>
    .store-type{
        position:fixed;
        top:0;
        left:0;
        right:0;
        bottom:0;
        background-color:rgba(0,0,0,0.6);
        z-index:2;
    }
    .content{
        position:absolute;
        left:0;
        right:0;
        bottom:0;
    }
    .list{
        height:100px;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        border-bottom-width:1px;
        border-bottom-style:solid;
        border-bottom-color:#e5e5e5;
        background-color:#fff;
    }
    .list-text{
        color:#666;
        font-size:36px;
    }
    .cancel{
        margin-top:20px;
        height:80px;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        border-bottom-width:1px;
        border-bottom-style:solid;
        border-bottom-color:#e5e5e5;
        background-color:#fff;
    }
</style>
