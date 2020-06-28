<template>
  <div id="app">
    <div v-if="$store.state.requestingCount>0" style="width:100%;height:3px;position: absolute;top:0;z-index: 999999;">
      <img src="./assets/img/doing.gif" style="height:100%;width:100%" />
    </div>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
  export default {
    name: 'App',
    created() {
      debugger
      let thisVue = this
      window.thisVue = thisVue;

      if (!thisVue.$store.state.nowTimer)
        thisVue.$store.state.nowTimer = setInterval(function () {
          thisVue.$store.state.now = new Date();
        }, 1000)

      thisVue.$.ajax(
        {
          url: '/login-refresh',
          type: 'post',
          async: false,
          success(res) {
            debugger
            if (res.code == 0) {
              thisVue.$store.state.login = res.data;
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
    margin: auto;
    position: relative;

  }

  @media screen and (max-width:800px) {
    #app {
      width: 100%;
    }
  }

  @media screen and (min-width:800px) {
    #app {
      width: 800px;
      border-left: 1px solid #8f8f8f;
      border-right: 1px solid #8f8f8f;
    }
  }
</style>

<style>
  html {
    height: 100%;
    width: 100%;
  }

  body {
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
  }
</style>