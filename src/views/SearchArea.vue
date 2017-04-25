<template>
    <div class="search-wrapper">
        <top-bar title="选择城市"></top-bar>
        <!-- 搜索框 -->
        <div class="search-content">
            <div :class="['search-bar',searching?'begin-search':'']">
                <image class="search-icon" src="https://s.kcimg.cn/wap/images/detail/o2oImg/settled_search@2x.png"></image>
                <input id="searchText"  class="search-text" :blur="onFocus" :value="searchContent" type="text" placeholder="输入城市名或拼音查询"  name=""  @input="oninput" @focus="startSearch"  ref="searchText"/>
                <image v-if="searching" style="width:44px;height:44px;margin-right:16px" src="https://s.kcimg.cn/wap/images/detail/o2oImg/settled_off@2x.png" @click="clearSearchContent"></image>
            </div>
            <div v-if="searching" class="cancel-search" @click="endSearch">
                <text class="cancel-text">取消</text>
            </div>
        </div>

        <!-- 搜索结果 -->
        <div v-if="searching && searchResult" class="search-result">
            <list style="flex: 1">
                <cell v-for="value in searchResult">
                    <div v-for="ele in value" class="result-cell" @click="setItem(ele.name,ele.sn)">
                        <text class="result-text">{{ele.name}}</text>
                    </div>
                </cell>
            </list>
        </div>
        <!-- 选择城市 -->
        <div v-if="!searching" class="search-area">
            <list style="flex: 1">
                <cell  v-for="(value,key) in locationContent" :ref="key">
                    <div class="header">
                        <text class="title">{{key}}</text>
                    </div>
                    <div v-for="ele in value" class="location-content" @click="setItem(ele.name,ele.sn)">
                        <div class="location-list">
                            <text class="location-name">{{ele.name}}</text>
                        </div>
                    </div>
                </cell>
            </list>
        </div>


        <!-- 右侧索引 -->
        <div v-if="!searching" class="nav-list">
          <div class="nav-index" v-for="(value, key) in locationContent" @click="anchor(key)">
            <text class="nav-info">{{key}}</text>
          </div>
        </div>


    </div>
</template>

<script type="text/babel">
    import router from '../router/router'
    let stream = weex.requireModule('stream');
    const dom = weex.requireModule('dom');
    const storage = weex.requireModule('storage');
    import TopBar from '../components/TopBar.vue'
    import Tools from '../common/js/Tools'

    export default {
        data(){
            return {
                searching:false,
                onFocus:false,
                searchContent:'',   //搜索框内容
                locationContent:{},//选择城市列表
                searchResult:{}//搜索结果

            }
        },
        components:{
            TopBar
        },
        created () {

//            Tools.postGa();

            let _this = this;
            storage.getItem('Location',function(e){
                if(e.result == "success"){
                    _this.locationContent = JSON.parse(e.data);
                }else{
                    _this.getStarCount('cm/citys.aspx', res => {
                        if(res.ok){
                            _this.locationContent = res.data;
                            storage.setItem('Location', JSON.stringify(res.data), event => {

                            })
                        }
                    })
                }
            });

        },
        methods:{
            clearSearchContent(){
                var searchText = document.querySelector('#searchText');
                searchText.value = '';
            },
            setItem (cityName,cityId) {
                let city = {};
                city.name = cityName;
                city.id = cityId;
                storage.setItem('City', JSON.stringify(city), event => {
                    this.searching = true;
                    this.$nextTick(function(){
                        router.push('/addStore')
                    })
                })
            },
            getStarCount (repo, callback) {
                return stream.fetch({
                    method: 'GET',
                    type: 'json',
                    url: 'https://nearby-api.360che.com/' + repo
                    }, callback)
            },
            oninput (event) {
                let _this = this;
                this.searchContent = event.value;
                storage.getItem('searchLocation',function(e){
                    if(e.result == "success"){
                        let data = JSON.parse(e.data)
                        if(data[event.value]){
                            _this.searchResult = data[event.value]
                        }else{
                            stream.fetch({method: 'GET', type: 'json', url: 'https://nearby-api.360che.com/cm/citys.aspx?keyword=' + event.value},res => {
                                if(res.data){
                                    _this.searchResult = res.data;
                                    data[event.value] =  res.data;
                                }else{
                                    _this.searchResult = {};
                                    data[event.value] =  res.data;
                                }
                                storage.setItem('searchLocation',JSON.stringify(data),function(db){
                                })
                            })
                        }
                    }else{
                        stream.fetch({method: 'GET', type: 'json', url: 'https://nearby-api.360che.com/cm/citys.aspx?keyword=' + event.value},res => {
                            if(res.ok){
                                if(res.data){
                                    _this.searchResult = res.data
                                }else{
                                    _this.searchResult = {}
                                }
                                storage.getItem('searchLocation',function(result){
                                    if(result.result == "success"){
                                        let data = JSON.parse(result.data);
                                        data[event.value] = result.data;
                                        storage.setItem('searchLocation',JSON.stringify(data),function(db){
                                        })
                                    }else{
                                        let data = {};
                                        data[event.value] = _this.searchResult;
                                        storage.setItem('searchLocation',JSON.stringify(data),function(db){
                                        })
                                    }
                                })

                            }
                        })
                    }
                });
            },
            startSearch(){
                this.searching = true;
                this.onFocus = false;
            },
            endSearch(){
                this.searching = false;
                this.$refs.searchText.blur();
            },
            anchor(key){
                dom.scrollToElement(this.$refs[key][0], { offset: '138px' })
            }
        }
    }
</script>

<style scoped>
    .search-wrapper{
        flex: 1;
        height:100%;
    }
    .search-area{
        flex:1;
    }
    .search-content{
        flex-direction:row;
        justify-content: center;
        align-items: center;
        height: 130px;
        padding-left:30px;
        background-color:#fff;
    }
    .search-bar{
        height:70px;
        margin-right:30px;
        padding-left:184px;
        border-top-width:1px;
        border-right-width:1px;
        border-bottom-width:1px;
        border-left-width:1px;
        border-top-style:solid;
        border-right-style:solid;
        border-bottom-style:solid;
        border-left-style:solid;
        border-top-color:#e5e5e5;
        border-right-color:#e5e5e5;
        border-bottom-color:#e5e5e5;
        border-left-color:#e5e5e5;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        flex: 1;
        flex-direction:row;
        justify-content:center;
        align-items:center;
        background-color: #fafafa;
    }
    .begin-search{
        padding-left:20px;
        padding-right:0;
        margin-right:0;
    }
    .cancel-search{
        padding-left:30px;
        padding-right:30px;
        justify-content: center;
        align-items: center;
    }
    .cancel-text{
        color:#09BB07;
        font-size:32px;
    }
    .search-icon{
        width:28px;
        height:28px;
        margin-right:16px;
    }
    .search-text{
        height:68px;
        font-size:28px;
        flex:1;
        background-color:#fafafa;
    }
    .header{
        height:60px;
        padding-left:30px;
        background-color:#f5f5f5;
        flex-direction:row;
        justify-content: flex-start;
        align-items:center;
    }
    .title{
        font-size:28px;
        color:#999;
    }
    .location-content{
        padding-left:30px;
        background-color:#fff;
    }
    .location-list{
        height:88px;
        border-bottom-width:1px;
        border-bottom-color:#e5e5e5;
        border-bottom-style:solid;
        flex-direction:row;
        justify-content:flex-start;
        align-items:center;
    }
    .location-name{
        color:#333;
        font-size:32px;
    }
    .nav-list{
        position:fixed;
        top:216px;
        right:0;
        width:65px;
        z-index:2;
    }
    .nav-index{
        height:24px;
        margin-bottom:10px;
        align-items: center;
    }
    .nav-info{
        color:#999;
        font-size:24px;
    }
    .search-result{
        flex: 1;
        margin-top: 20px;
        padding-left: 30px;
        background-color: #fff;
    }
    .result-cell{
        justify-content: center;
        height: 90px;
        border-bottom-style: solid;
        border-bottom-color: #e5e5e5;
        border-bottom-width: 1px;
    }
</style>
