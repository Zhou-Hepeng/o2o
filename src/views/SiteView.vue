<template lang="html">
    <div :style="{height: screenH}" id="allmap" ref="allmap" class="allmap-wrapper">\

    </div>
</template>

<script>
const modal = weex.requireModule('modal');
 const dom = weex.requireModule('dom');
import Tools from '../common/js/Tools'

export default {
    data(){
        return{
            screenH: '',
            screenW:''
        }
    },
    created(){
//        Tools.postGa();
        this.screenH = window.screen.height + 'px';
        this.screenW = window.screen.width + 'px';
    },
    mounted() {

        // 百度地图API功能
        let mapWrapper = this.$refs.allmap;
        let map = new BMap.Map(mapWrapper);
        let point = new BMap.Point(116.331398, 39.897445);
        map.centerAndZoom(point, 12);
        // 创建地址解析器实例
        let myGeo = new BMap.Geocoder();
        // 将地址解析结果显示在地图上,并调整地图视野
        myGeo.getPoint("北京市海淀区上地10街", function(point) {
            if (point) {
                map.centerAndZoom(point, 50);
                map.addOverlay(new BMap.Marker(point));
            } else {
                modal.alert({
                    message: '\u60a8\u9009\u62e9\u5730\u5740\u6ca1\u6709\u89e3\u6790\u5230\u7ed3\u679c!'
                }, function(value) {})
            }
        }, "北京市");
    }
}
</script>

<style lang="css" scoped>
    .allmap-wrapper{
        height: 500px;
    }
</style>
