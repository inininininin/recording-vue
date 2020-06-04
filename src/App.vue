<template>
  <div id="app">
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
    let thisVue=this
    window.thisVue=thisVue;


    if(thisVue.$store.state.nowTimer)
					clearInterval(thisVue.$store.state.nowTimer)
				thisVue.$store.state.nowTimer = setInterval(function(){
					thisVue.$store.state.now=new Date();
        },2000)
        

    thisVue.$.ajax(
      {
        url:'/login-refresh',
        type:'post',
        async:false,
        success(res){
          debugger
					if (res.code == 0) {
						thisVue.$store.state.login=res.data;
					}
        }
      }
    )
    
    
  }
}
</script>


<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 0;
  height: 100%;
  width: 50%;
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
    width: 50%;
    border-left:1px solid #8f8f8f;
    border-right:1px solid #8f8f8f;
  }
}
</style>



<style>
html{
  height: 100%;
  width: 100%;
}
body{
  height: 100%;
  width: 100%;
  padding:0;
  margin:0;
}


</style>