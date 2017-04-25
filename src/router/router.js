import Router from 'vue-router'
import HomeView from "../views/HomeView.vue"
import ChooseMapView from "../views/ChooseMapView.vue"
import StoreDetailView from "../views/StoreDetailView.vue"
import StoreListView from "../views/StoreListView.vue"
import SiteMapView from "../views/SiteMapView.vue"
import AddStore from "../views/AddStore.vue"
import SearchArea from "../views/SearchArea.vue"
import DealerView from "../views/DealerView.vue"


Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/home',
            name:'home',
            component: HomeView
        },
        {
            path: '/chooseMap',
            name:'chooseMap',
            component: ChooseMapView
        },
        {
            path: '/detail/:shopid',
            name: 'detail',
            component: StoreDetailView
        },
        {
            path: '/storeList/:typeId',
            name: 'storeList',
            component: StoreListView
        },
        {
            path: '/siteMap/:longitude/:latitude',
            name: 'siteMap',
            component: SiteMapView
        },
        {
            path: '/addStore',
            name:'addStore',
            component: AddStore
        },
        {
            path: '/searchArea',
            name:'searchArea',
            component: SearchArea
        },
        {
            path: '/dealerView',
            name:'dealerView',
            component: DealerView
        },
        {
            path: '/',
            redirect: '/home'
        }
    ]
})