<template>
	<div id="me" style="height:100%;position:relative;">
		<div @click="logout()" style="font-size:14px;cursor: pointer;">退出登录</div>

		<div style="position:absolute;bottom:0;left:0;right:0;background-color: #FFFFFF;">

		<div style="border-top:1px solid #8F8F8F;"></div>
			<div style="height:50px;line-height: 50px;position: relative;">
				<span  @click="$router.push({path:'/index',query:{time:new Date().getTime()+''}})" style="font-size:14px;width:20%;display:inline-block;text-align: center;cursor:pointer;">任务</span>
				<span style="border-left:1px solid #8F8F8F;position: absolute;display:inline-block;"><span
						style="visibility: hidden;">1</span></span>
				<span style="font-size:14px;width:20%;display:inline-block;text-align: center;cursor:pointer;">记录</span>
				<span style="border-left:1px solid #8F8F8F;position: absolute;display:inline-block;"><span
						style="visibility: hidden;">1</span></span>
				<span style="font-size:14px;width:20%;display:inline-block;text-align: center;cursor:pointer;">好友</span>
				<span style="border-left:1px solid #8F8F8F;position: absolute;display:inline-block;"><span
						style="visibility: hidden;">1</span></span>
				<span style="font-size:14px;width:20%;display:inline-block;text-align: center;cursor:pointer;">消息</span>
				<span style="border-left:1px solid #8F8F8F;position: absolute;display:inline-block;"><span
						style="visibility: hidden;">1</span></span>
				<span @click="$router.push({path:'/me',query:{time:new Date().getTime()+''}})" style="font-size:14px;width:20%;display:inline-block;text-align: center;cursor:pointer;background-color: #8F8F8F;">我</span>
			</div>
			</div>
	</div>
</template>
<script>
	export default {
		name: 'index',
		data() {
			return {
				kw:null,
				query: '',
			}
		},
		activated() {
			let thisVue = this

			if (thisVue.query != JSON.stringify(thisVue.$route.query)) {
				Object.assign(thisVue.$data, thisVue.$options.data());
				thisVue.query = JSON.stringify(thisVue.$route.query);
				thisVue.reload();

			}
		},
		methods: {
			reload() {

			},
			logout(){
				debugger
			let thisVue = this;
				thisVue.$axios.post('/logout').then(res => {
					debugger
					if(res.data.codeMsg)
						alert(res.data.codeMsg)
					if(res.data.code == 0){
						thisVue.$store.state.login=null;
						if(!res.data.codeMsg)
							alert("成功")
						thisVue.$router.push({path:'/login',query:{time:new Date().getTime()+""}})
					}
  				})
			}
		}
	}
</script>
<style scoped>

.scrollbar::-webkit-scrollbar {
  display: none;
}
</style>