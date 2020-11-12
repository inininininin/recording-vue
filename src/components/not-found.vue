<template>
	<div id="notFound" style="font-size: 0;position:absolute;top:0;bottom:0;right:0;left:0;">
		
		<div style="font-size:26px;text-align: center;margin-top:100px;">未找到页面</div>
		<div style="font-size:16px;text-align: center;margin-top:30px;height:35px;">
			<button style="font-size:16px;width:100px;height:35px;" 
				@click="
					if(!$store.state.routes || $store.state.routes.length<=1){
						$router.push({path:'/index'}) 
					}else{
						$router.back()
					}
				">
				返回
			</button>
		</div>
		
	</div>
</template>
<script>
	export default {
		name: 'index',
		data() {
			return {
				query: null,
				myInfo:0
			}
		},
		activated() {
			let vue = this
			if (JSON.stringify(vue.query) != JSON.stringify(vue.$route.query)) {
				Object.assign(vue.$data, vue.$options.data());
				vue.query = vue.$route.query;
				vue.load();
			}
		},
		methods: {
			load() {

			},
			logout(){
				debugger
				let vue = this;
				vue.$dialog.confirm({
					message: '确认退出吗?'
				}).then(()=> {
					debugger
					vue.$axios.post('/recording/logout').then(res => {
						debugger
						if(res.data.codeMsg)
							vue.$notify({message:res.data.codeMsg})
						if(res.data.code == 0){
							vue.$store.state.login=null;
							vue.$router.replace({path:'/login'})
							location.reload()
						}
					})
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