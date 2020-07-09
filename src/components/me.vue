<template>
	<div id="me" style="height:100%;position:relative;">
		<div @click="logout()" style="font-size:14px;cursor: pointer;">退出登录</div>

		<div 
			style="position: absolute;bottom: 0;left: 0px;right: 0px;
			background-color: rgb(255, 255, 255);box-shadow: rgb(136, 136, 136) 0px 0px 1px 0px;border-top: 1px solid #afaeae;">
			<div style="height: 50px;line-height: 50px;position: relative;">
				<span 
					style="display: inline-block;font-size: 14px;width: 20%;text-align: center;
					cursor: pointer;"
					@click="$router.replace({path:'/index',query:{time:new Date().getTime()+''}})">
					任务
				</span>
				<span style="position: absolute;font-size:14px;height: 50px;line-height: 50px;display: inline-block;border-left:1px solid #8F8F8F;">
					&#8207;
				</span>
				<span 
					style="display: inline-block;user-select: none;font-size: 14px;width: 20%;text-align: center;cursor: pointer;"
					@click="$router.replace({path:'/record-list',query:{time:new Date().getTime()+''}})">
					记录
				</span>
				<span style="position: absolute;font-size:14px;height: 50px;line-height: 50px;display: inline-block;border-left:1px solid #8F8F8F;">
					&#8207;
				</span>
				<span 
					style="display: inline-block;font-size: 14px;width: 20%;text-align: center;
					cursor: pointer;"
					@click="$router.replace({path:'/friend-list',query:{time:new Date().getTime()+''}})">
					好友
				</span>
				<span style="position: absolute;font-size:14px;height: 50px;line-height: 50px;display: inline-block;border-left:1px solid #8F8F8F;">
					&#8207;
				</span>
				<span 
					style="display: inline-block;font-size: 14px;width: 20%;text-align: center;
					cursor: pointer;">
					消息
				</span>
				<span style="position: absolute;font-size:14px;height: 50px;line-height: 50px;display: inline-block;border-left:1px solid #8F8F8F;">
					&#8207;
				</span>
				<span 
					style="display: inline-block;font-size: 14px;width: 20%;text-align: center;
					cursor: pointer;background-color: rgb(255, 127, 8);"
					@click="$router.replace({path:'/me',query:{time:new Date().getTime()+''}})">
					我
				</span>
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