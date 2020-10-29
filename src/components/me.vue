<template>
	<div id="me" style="font-size: 0;height:100%;padding:1px 0 0 0;margin-top: -1px;position: relative;">
		<div style="height:150px;border-bottom: 1px solid #888888;">
			<img style="width:80px;height:80px;border: 1px solid #888888;display: inline-block;margin:30px 0 0 20px;"/>
			<span style="font-size:16px;display: inline-block;margin:0 0 0 20px;vertical-align: baseline;">{{$attr($store.state.login,'nickname')}}</span>
			
		</div>
		<div @click="logout()" style="height:45px;line-height:45px;font-size:16px;cursor: pointer;padding:0 20px;border-bottom: 1px solid #888888;">退出登录</div>

		<div style="height:51px;position:absolute;bottom:0;left:0;right:0;background-color: #FFFFFF;box-shadow: 0px 0 4px 0px #888888;">
			<div class="n1-line scrollbar1" style="height:50px;position: relative;border-top:1px solid #8F8F8F;overflow-x: auto;">
				<span @click="$router.push({path:'/index'})"
					style="line-height:50px;font-size:16px;width:14%;display:inline-block;text-align: center;cursor:pointer;vertical-align: middle;">
					生 活
				</span>
				<span style="border-left:1px solid #808080;display:inline-block;line-height:15px;font-size: 16px;height:15px;vertical-align: middle;"></span>
				<span style="line-height:50px;font-size:16px;width:14%;display:inline-block;text-align: center;cursor:pointer;vertical-align: middle;">
					工 作
				</span>
				<span style="border-left:1px solid #808080;display:inline-block;line-height:15px;font-size: 16px;height:15px;vertical-align: middle;"></span>
				<span style="line-height:50px;font-size:16px;width:14%;display:inline-block;text-align: center;cursor:pointer;vertical-align: middle;">
					日 常
				</span>
				<span style="border-left:1px solid #808080;display:inline-block;line-height:15px;font-size: 16px;height:15px;vertical-align: middle;"></span>
				<span style="line-height:50px;font-size:16px;width:14%;display:inline-block;text-align: center;cursor:pointer;vertical-align: middle;">
					记 录
				</span>
				<span style="border-left:1px solid #808080;display:inline-block;line-height:15px;font-size: 16px;height:15px;vertical-align: middle;"></span>
				<span @click="$router.push({path:'/friend'})"
					style="line-height:50px;font-size:14px;width:14%;display:inline-block;text-align: center;cursor:pointer;vertical-align: middle;">
					好 友
				</span>
				<span style="border-left:1px solid #808080;display:inline-block;line-height:15px;font-size: 16px;height:15px;vertical-align: middle;"></span>
				<span style="line-height:50px;font-size:16px;width:14%;display:inline-block;text-align: center;cursor:pointer;vertical-align: middle;">
					消 息
				</span>
				<span style="border-left:1px solid #808080;display:inline-block;line-height:15px;font-size: 16px;height:15px;vertical-align: middle;"></span>
				<span @click="$router.push({path:'/me'})"
					style="line-height:50px;font-size:16px;width:14%;display:inline-block;text-align: center;cursor:pointer;vertical-align: middle;background-color: #ff7f08;color:#ffffff;">
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
			let thisV = this
			if (thisV.query != JSON.stringify(thisV.$route.query)) {
				Object.assign(thisV.$data, thisV.$options.data());
				thisV.query = JSON.stringify(thisV.$route.query);
				thisV.reload();

			}
		},
		methods: {
			reload() {

			},
			logout(){
				debugger
				let thisV = this;
				thisV.$dialog.confirm({
					message: '确认退出吗?'
				}).then(()=> {
					debugger
					thisV.$axios.post('/recording/logout').then(res => {
						debugger
						if(res.data.codeMsg)
							alert(res.data.codeMsg)
						if(res.data.code == 0){
							thisV.$store.state.login=null;
							thisV.$router.push({path:'/login'})
						}
					})
				}).catch(() => {
					console.log("点击了取消按钮噢")
				});
			}
		}
	}
</script>
<style scoped>

.scrollbar::-webkit-scrollbar {
  display: none;
}
</style>