<template>
    <div class="defeated-pop">
        <div class="defeated-content">
            <text class="defeated-text">{{errorText}}</text>
        </div>
    </div>
</template>

<script>
    export default {
        props:['errorText']
    }
</script>

<style scoped>
    .defeated-pop{
        position:fixed;
        top:0;
        right:0;
        bottom:0;
        left:0;
        background-color: rgba(0,0,0,0.2);
        justify-content: center;
        align-items: center;
        z-index:2;
    }
    .defeated-content{
        padding-left:10px;
        padding-right:10px;
        height:64px;
        justify-content: center;
        align-items: center;
        border-bottom-left-radius:10px;
        border-bottom-right-radius :10px;
        border-top-left-radius :10px;
        border-top-right-radius :10px;
        background-color: rgba(0,0,0,0.7);
    }
    .defeated-text{
        font-size:32px;
        color:#fff;
    }
</style>