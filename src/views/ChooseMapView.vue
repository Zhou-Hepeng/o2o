<template lang="html">
    <div class="map">
        <!-- 地图 -->
        <div class="allmap" id="allmap" style="transform: scale(2)">

        </div>

        <!-- 中间位置icon -->
        <image class="icon" style="width: 38px;height: 50px;" src="https://s.kcimg.cn/wap/images/detail/o2oImg/settled_position@2x.png"></image>

        <!-- 提示信息 -->
        <div class="tip" v-if="tip">
            <text class="tip-text">拖动地图到正确位置，并点击提交</text>
            <div class="triangle">

            </div>
        </div>

        <!-- footer -->
        <div class="footer" id="footer">
            <div class="location">
                <text class="text-location">{{locationText}}</text>
            </div>
            <div class="submit-wrapper">
                <text class="submit" @click="submit">提交</text>
            </div>
        </div>
    </div>
</template>

<script>
    const storage = weex.requireModule('storage')
    import Tools from '../common/js/Tools'

    export default {
        data(){
            return{
                longitude:'',
                latitude:'',
                locationText:'',
                tip: true
            }
        },
        created(){

//            Tools.postGa();

            let _this = this;
            storage.getItem('nowLocation',ele => {
                if(ele.result == "success"){
                    let data = JSON.parse(ele.data);
                    _this.longitude = data.longitude;
                    _this.latitude = data.latitude;
                }
            })

        },
        methods:{
            submit(){
                storage.setItem('location',JSON.stringify({'address':this.locationText,'longitude': this.longitude,'latitude':this.latitude}));
                location.href='javascript:history.go(-1)';
            }
        },
        mounted(){

            document.querySelector('#footer').addEventListener('touchmove', function(event) {
                event.preventDefault();
            });

            let _this = this;
            // 百度地图API功能
        	let map = new BMap.Map("allmap");
        	let point = new BMap.Point(_this.longitude,_this.latitude);

        	map.centerAndZoom(point,19);
        	// 创建地址解析器实例
        	let myGeo = new BMap.Geocoder();

        	// 将地址解析结果显示在地图上,并调整地图视野
        	myGeo.getLocation(point, function(rs) {
                    _this.locationText = rs.address;
                    storage.setItem('location',JSON.stringify({'address':_this.locationText,'longitude': _this.longitude,'latitude': _this.latitude}));
                });

                // 地图拖拽事件
            map.addEventListener("dragend", function() {
                // 获取中心坐标
                let center = map.getCenter();
                _this.longitude = center.lng;
                _this.latitude = center.lat;

                // 获取中心地点名字
                myGeo.getLocation(center, function(rs) {
                    _this.locationText = rs.address;
                });
                // 存储本地
            });

            // 3s后隐藏提示
            setTimeout(function(){
                _this.tip = false;
            },3000)
        }
    }
</script>

<style scoped>
    .map{
        position: relative;
        height: 100%;
        overflow: hidden;
    }
    .allmap{
        position: relative;
        flex: 1;
        transform: scale(2);
    }
    .tip{
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -250px;
        margin-top: -170px;
        padding-left: 40px;
        padding-right: 40px;
        width: 500px;
        height: 90px;
        opacity: 0.89;
        align-items: center;
        justify-content: center;
        background: rgba(51,51,51,0.90);
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
    }
    .tip-text{
        text-align: center;
        font-size: 28px;
        color: #fff;
    }
    .triangle{
        position: absolute;
        bottom: -9px;
        width: 0;
        height: 0;
        border-width:10px 10px 0;
        border-style:solid;
        border-color:rgba(51,51,51,0.90) transparent transparent;/*灰 透明 透明 */
    }
    .icon{
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -19px;
        margin-top: -70px;
    }
    .footer{
        width: 750px;
        flex-direction: row;
        align-items: center;
        height: 90px;
        background-color:#f8f8f8;
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
