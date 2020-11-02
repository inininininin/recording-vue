<template>
  <div id="app" class="unselectable">
    <div v-show="$store.state.requestingCount>0" style="width:100%;height:6px;position: absolute;top:0;z-index: 999999;overflow: hidden;">
      <img src="./assets/img/loading.gif" style="height:100%;width:110%;vertical-align: top;margin-left: -20px;"/>
    </div>
    <keep-alive>
        <router-view/>
    </keep-alive>
  </div>
</template>
<script>

export default {
  name: 'App',
  async created(){
    debugger
    let vue=this
    window.vue=vue;

    if(vue.$store.state.nowTimer)
        clearInterval(vue.$store.state.nowTimer)
				vue.$store.state.nowTimer = setInterval(function(){
					vue.$store.state.now=new Date();
        },1000)
        
    vue.$axios.post('/recording/login-refresh').then(res=>{
      if(res.data.code == 0){
        vue.$store.state.login=res.data.data;
      }
    })
    setInterval(function(){
      vue.$axios.post('/recording/login-refresh').then(res=>{
        if(res.data.code == 0){
          vue.$store.state.login=res.data.data;
        }
      })
    },5 * 60* 1000)
  }
}
</script>


<style scoped>
  #app {
    height: 100%;
    margin:auto;
    position:relative;
    
  }

  @media screen and (max-width:768px){
    #app {
      width: 100%;
    }
  }

  @media screen and (min-width:768px){
    #app {
      width: 80%;
      border-left:1px solid #8f8f8f;
      border-right:1px solid #8f8f8f;
    }
  }

  @media screen and (min-width:1200px){
    #app {
      width: 50%;
      border-left:1px solid #8f8f8f;
      border-right:1px solid #8f8f8f;
    }
  }
  
</style>
<style>
  .n1-line {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .n2-lines{
    word-break: break-all;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .n5-lines{
    word-break: break-all;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
  }

  button,a {
    cursor: pointer;
  }

  input[type=button] {
    cursor: pointer;
  }

  .scrollbar::-webkit-scrollbar {
    display: none;
  }
  
  .scrollbar1::-webkit-scrollbar{
    height:4px;
    width:6px;
  }
  .scrollbar1::-webkit-scrollbar-track{
    background-color:#8F8F8F;
  }
  .scrollbar1::-webkit-scrollbar-thumb{
    background-color:#000000;
  }
  .scrollbar1::-webkit-scrollbar-thumb:hover {
    background-color:#000000;
    cursor: pointer;
  }
  .scrollbar1::-webkit-scrollbar-thumb:active {
    background-color:#000000;
  }

  .active:active {
    background-color: #cccccc!important;
  }
  .active-text:active {
    color: #8F8F8F!important;
  }
 

  .unselectable {
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    -khtml-user-select: none; 
    user-select:none;
  }

  .selectable {
    -webkit-user-select:text;
    -moz-user-select:text;
    -ms-user-select:text;
    -khtml-user-select: text; 
    user-select:text;
  }
</style>


