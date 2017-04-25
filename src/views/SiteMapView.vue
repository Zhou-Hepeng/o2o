<template>
    <div class="allmap" id="allmap">

    </div>
</template>

<script>
    import Tools from '../common/js/Tools'
export default {
     created(){
//         Tools.postGa();
     },
    mounted(){

        let lng = this.$route.params.longitude;
        let lat = this.$route.params.latitude;

        // 百度地图API功能
        let map = new BMap.Map("allmap");
        let point = new BMap.Point(lng,lat);
        map.centerAndZoom(point,19);
        let geoc = new BMap.Geocoder();

        geoc.getLocation(point, function(rs){
            map.addOverlay(new BMap.Marker(point));
		});
    }
}
</script>

<style scoped>
    .allmap{
        height: 100%;
        transform: scale(2);
    }
</style>
