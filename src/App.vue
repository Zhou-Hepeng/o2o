<template>
  <div>
    <router-view style="flex:1"></router-view>
    <div class=""></div>
  </div>
</template>

<style>
  @import "./common/css/reset.css";
</style>

<script type="text/babel">
  import router from './router/router';
  const storage = weex.requireModule('storage');
  var modal = weex.requireModule('modal');
  let thaw = weex.requireModule('THAW');
  var domModule = weex.requireModule('dom');
  var globalEvent = weex.requireModule('globalEvent')
  export default {
    name:'app',
    router,
    created(){

      domModule.addRule('fontFace',{
        'fontFamily':'store',
        'src':"url(\'http://at.alicdn.com/t/font_1467964616_7432158.ttf\')"
      });

      let _this = this;

      try{
        //进入页面清空所有的缓存
          storage.getItem('nowLocation',ele => {
            if(ele.result == 'success'){
              storage.removeItem('nowLocation');
            }
          });
          storage.getItem('location',ele => {
            if(ele.result == 'success'){
              storage.removeItem('location');
            }
          });
          storage.getItem('DataAll',ele => {
            if(ele.result == 'success'){
              storage.removeItem('DataAll');
            }
          });
          storage.getItem('City',ele => {
            if(ele.result == 'success'){
              storage.removeItem('City');
            }
          });
          storage.getItem('StoreList',ele => {
            if(ele.result == 'success'){
              storage.removeItem('StoreList');
            }
          });
          storage.getItem('ShopType',ele => {
            if(ele.result == 'success'){
              storage.removeItem('ShopType');
            }
          });
      }catch (err){

      }

//      //请求地址经纬度
//      thaw.getLocation(function(data) {
//        let res = JSON.parse(data);
//        if(res.state == 'success'){
//          this.alert('调取位置成功')
//            storage.setItem('nowLocation',JSON.stringify(res.data));
//            storage.setItem('location',JSON.stringify(res.data));
//        }else{
//          this.alert('shiubai')
//        }
//      });

//      globalEvent.addEventListener('onSendLocation',function(data){
//        _this.alert('成功')
//      });
      this.$nextTick(function(){
        router.push('/home')
      })
    },
    methods:{
      alert(name){
        modal.alert({
          message: name,
          duration: 0.3
        })
      }
    },
    mounted(){

    }
  }
</script>
