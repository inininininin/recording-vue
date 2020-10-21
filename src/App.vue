<template>
  <div id="app">
    <div v-show="$store.state.requestStateBar>0" style="width:100%;height:3px;position: absolute;top:0;z-index: 999999;">
      <img src="./assets/img/doing.gif" style="height:100%;width:100%;vertical-align: top;"/>
    </div>
      <keep-alive>
          <router-view/>
      </keep-alive>


  </div>
</template>
<script>

export default {
  name: 'App',
  created(){
    debugger
    let thisV=this
    window.thisV=thisV;

    if(thisV.$store.state.nowTimer)
					clearInterval(thisV.$store.state.nowTimer)
				thisV.$store.state.nowTimer = setInterval(function(){
					thisV.$store.state.now=new Date();
        },1000)
        

    thisV.$.ajax(
      {
        url:'/recording/login-refresh',
        type:'post',
        dataType:'json',
        async:false,
        success(data){
          debugger
					if (data.code == 0) {
						thisV.$store.state.login=data.data;
					}
        }
      }
    )
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

  .n2-line{
    word-break: break-all;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .n5-line{
    word-break: break-all;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
  }

  button {
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
  .activeText:active {
    color: #cccccc!important;
  }
  .visited:visited {
    background-color: #cccccc!important;
  }


  .unselectable {
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
  }
</style>


