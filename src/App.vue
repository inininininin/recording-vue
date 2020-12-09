<template>
  <div id="app" class="unselectable" >
    <div v-show="$store.state.requestingCount>0" style="width:100%;height:10px;position: absolute;top:0;z-index: 999999;overflow: hidden;">
      <img draggable="false"  src="./assets/img/loading.gif" style="height:100%;width:100%;vertical-align: top;"/>
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
    
    let vue=this
    window.vue=vue;
    
    vue.$store.state.now=vue.$moment();
    if(vue.$store.state.nowTimer)
        clearInterval(vue.$store.state.nowTimer)
				vue.$store.state.nowTimer = setInterval(function(){
					vue.$store.state.now=vue.$moment();
        },1000)
    vue.$store.state.requestingCount--;
    vue.$axios.post('/recording/login-refresh').then(res=>{
      vue.$store.state.requestingCount++;
      if(res.data.code == 0){
        vue.$store.state.login=res.data.data;
      }
    }).catch(res=>{
      vue.$store.state.requestingCount++;
    })
    setInterval(function(){
      vue.$store.state.requestingCount--;
      vue.$axios.post('/recording/login-refresh').then(res=>{
        vue.$store.state.requestingCount++;
        if(res.data.code == 0){
          vue.$store.state.login=res.data.data;
        }
      }).catch(res=>{
        vue.$store.state.requestingCount++;
      })
    },5000)
  }
}
</script>


<style scoped>
  #app {
    z-index:0;
    height: 100%;
    position:relative;
    background-color: #FFFFFF;
  }

  @media screen and (max-width:768px){
    #app {
      width: 100%;
    }
  }

  @media screen and (min-width:768px){
    #app {
      margin:auto;
      width: 80%;
    }
  }

  @media screen and (min-width:1200px){
    #app {
      margin:unset;
      margin-left:250px;
      width: 50%;
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
    background-color:#8f8f8f;
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
    opacity: 0.7!important;
  }
  .hover:hover {
    opacity: 0.9;
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


