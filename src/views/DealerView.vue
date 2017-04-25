<template>
    <web ref="webview" :src="url" class="webview"></web>
</template>

<script>
// const webview = weex.requireModule('webview')

export default {
    data () {
     return {
       url : 'https://dealerm.360che.com/'
     }
   }
}
</script>

<style scoped>
    .webview{
        width: 100%;
    }
</style>
