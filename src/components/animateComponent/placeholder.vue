<template>
  <div class="placeholder">
      <div class="notes-placeholder ">
        <div class="img"></div>
        <div class="content">
            <div class="title"></div>
            <div class="text"></div>
            <div class="text animation-delay"></div>
            <div class="meta">
                <div class="read"></div><i class="iconfont ic-list-comments"></i>
                <div class="small"></div><i class="iconfont ic-list-like"></i>
                <div class="small"></div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'placeholder',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.placeholder{
    /* margin-top: 60px; */
    width: 100%;
    height: 100px;
}
    .notes-placeholder {
        position: relative;
        padding: 15px 2px 0 0;
        margin-bottom: 50px
    } 
    .notes-placeholder .img {
        position: absolute;
        bottom: 2px;
        right: 0;
        width: 125px;
        height: 100px;
        border-radius: 4px;
        background-color: #eaeaea
    }
    
     .notes-placeholder .img {
        background-color: #eaeaea
    }
    
    .notes-placeholder .content {
        padding-right: 160px
    }
    
    .notes-placeholder .title {
        float: none!important;
        width: 50%;
        height: 20px;
        margin: 0 0 15px!important;
        background-color: #eaeaea
    }
     .notes-placeholder .title {
        background-color: #eaeaea
    }
    
    .notes-placeholder .title:before {
        content: ""!important
    }
    
    .notes-placeholder .sub-title {
        display: none;
        width: 70%;
        height: 16px;
        margin: 0 0 15px!important;
        background-color: #eaeaea
    }
    
    .notes-placeholder .sub-title {
        background-color: #eaeaea
    } 
    
    .notes-placeholder .text {
        background-color: #eaeaea
    }
    
    .notes-placeholder .text {
        width: 100%;
        height: 16px;
        margin: 0 0 10px;
        background-color: #eaeaea;
        -webkit-animation: loading 1s ease-in-out infinite;
        animation: loading 1s ease-in-out infinite
    }
    
    .notes-placeholder .animation-delay {
        -webkit-animation: loading 1s ease-in-out -.5s infinite;
        animation: loading 1s ease-in-out -.5s infinite
    }
    
    @keyframes loading {
        0% {
            width: 60%
        }
        50% {
            width: 100%
        }
        to {
            width: 60%
        }
    }
        
    .notes-placeholder .meta {
        margin: 0;
        color: #eaeaea;
        font-size: 12px
    }
    
     .notes-placeholder .meta {
        color: #eaeaea
    }
    
    .notes-placeholder .meta div {
        display: inline-block;
        vertical-align: middle;
        background-color: #eaeaea
    }
    
     .notes-placeholder .meta div {
        background-color: #eaeaea
    }
    
    .notes-placeholder .meta i {
        margin: 0 5px;
        vertical-align: middle
    }
    
    .notes-placeholder .meta .read {
        height: 16px;
        width: 50px
    }
    
    .notes-placeholder .meta .small {
        height: 16px;
        width: 30px
    }
    
    .notes-placeholder .index .meta {
        margin-left: 0
    }
    
    .notes-placeholder .timeline .sub-title {
        display: block
    } 
</style>
