const storage = weex.requireModule('storage')
let stream = weex.requireModule('stream')

//判断url入口，发送ga
export default{
    postGa(){
        storage.getItem('GAUrl', ele => {
            if(ele.result == 'success'){
                if(ele.data != window.location.href){
                    //GA 跳转页面
                    ga('set', 'page', window.location.href.substring(window.location.href.indexOf('#')-1));
                    ga('send', 'pageview');
                    storage.setItem('GAUrl',window.location.href);
                }
            }else{
                storage.setItem('GAUrl',window.location.href);
            }
        });
    },
    postGaPage(){
        let openId = this.getCookie('udstatistics');
        let url = window.location.href;
        storage.getItem('GAUrl', ele => {
            if(ele.result == 'success'){
                if(ele.data != url){
                    stream.fetch({
                        method: 'post',
                        type: 'json',
                        data:'{v:1,tid:UA-64002767-18,cid:'+ openId +'t:pageview,dp:'+ url.substring(url.indexOf('#')-1) + '}',
                        url:'https://www.google-analytics.com/collect'
                    })

                    storage.setItem('GAUrl',url);
                }
            }else{
                storage.setItem('GAUrl',url);
            }
        });
    },
    postGaEvent(ec,ea,el){
        let openId = this.getCookie('udstatistics');
        stream.fetch({
            method: 'post',
            type: 'json',
            data:'{v:1,tid:UA-64002767-18,cid:'+ openId +'t:event,ec:'+ ec + 'ea:'+ ea + 'el:'+ el +'}',
            url:'https://www.google-analytics.com/collect'
        })
    },
    getCookie(key){
        let allcookies = document.cookie;

        if(allcookies){
            let cookie_pos = allcookies.indexOf(key);   //索引的长度

            if (cookie_pos != -1) {
                cookie_pos += key.length + 1;
                let cookie_end = allcookies.indexOf(';', cookie_pos);
                if (cookie_end == -1) {
                    cookie_end = allcookies.length;
                }
                return allcookies.substring(cookie_pos, cookie_end);
            }
        }
    },
    scrollTop(){
        let storeList = document.querySelector('#storeList');
        let start = '';
        let move = '';
        let starX = '';
        let moveX = '';

        if(storeList){
            storeList.addEventListener('touchstart',function(event){
                start = event.targetTouches[0].clientY;
                starX = event.targetTouches[0].clientX;
            });

            storeList.addEventListener('touchmove', function(event) {
                move = event.targetTouches[0].clientY;
                moveX = event.targetTouches[0].clientX;
                if(Math.abs(starX-moveX) > 100){
                    event.preventDefault();
                }
                if(storeList.scrollTop == 0 &&  start - move < 0){
                    event.preventDefault();
                }
            });
        }else{
            document.body.firstElementChild.addEventListener('touchstart',function(event){
                start = event.targetTouches[0].clientY;
                starX = event.targetTouches[0].clientX;
            });

            document.body.firstElementChild.addEventListener('touchmove', function(event) {
                move = event.targetTouches[0].clientY;
                moveX = event.targetTouches[0].clientX;
                if(Math.abs(starX-moveX) > 100){
                    event.preventDefault();
                }
                if(start - move < 0){
                    event.preventDefault();
                }
            });
        }
    }
}

