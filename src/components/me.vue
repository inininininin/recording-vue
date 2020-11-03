<template>
	<div id="me" style="font-size: 0;height:100%;padding:1px 0 0 0;margin-top: -1px;position: relative;">
		<div class="active" style="height:148px;border-bottom: 1px solid #888888;border-top:1px solid #ffffff;cursor: pointer;">
			<div  v-if="$store.state.login && $store.state.login.userId" style="margin: 30px 0 0 20px;">
				<img style="width:80px;height:80px;border: 1px solid #888888;display: inline-block;vertical-align: bottom;cursor: pointer;"/>
				<span style="font-size:16px;display: inline-block;margin:0 0 0 20px;">
					{{$o($store.state.login).attr('nickname')}}
				</span>
			</div>
			<div class="active-text" v-if="!$store.state.login || !$store.state.login.userId" 
				style="margin: 50px 0 0 20px;font-size:20px;font-weight:900;display: inline-block;cursor: pointer;"
				@click="$router.replace({path:'/login'})">
				去登录 / 注册
			</div>
		</div>
		<div class="active" 
			style="height:45px;line-height:45px;font-size:16px;cursor: pointer;padding:0 20px;border-bottom: 1px solid #888888;">
			功能1
		</div>
		<div class="active" @click="logout()" v-if="$store.state.login && $store.state.login.userId" 
			style="height:45px;line-height:45px;font-size:16px;cursor: pointer;padding:0 20px;border-bottom: 1px solid #888888;">
			退出登录
		</div>

		<div style="height:51px;position:absolute;bottom:0;left:0;right:0;box-shadow: 0px 0 4px 0px #888888;overflow: hidden;">
			<div class="n1-line scrollbar1" style="height:50px;position: relative;border-top:1px solid #8F8F8F;overflow-x: auto;">
				<span @click="$router.push({path:'/index'})"
					style="line-height:50px;font-size:16px;width:14.4%;display:inline-block;text-align: center;cursor:pointer;vertical-align: middle;margin-left:-1px;">
					任 务
				</span>
				<span style="border-left:1px solid #808080;display:inline-block;line-height:15px;font-size: 16px;height:15px;vertical-align: middle;margin-left:-1px;"></span>
				<span style="line-height:50px;font-size:16px;width:14.4%;display:inline-block;text-align: center;cursor:pointer;vertical-align: middle;margin-left:-1px;">
					工 作
				</span>
				<span style="border-left:1px solid #808080;display:inline-block;line-height:15px;font-size: 16px;height:15px;vertical-align: middle;margin-left:-1px;"></span>
				<span style="line-height:50px;font-size:16px;width:14.4%;display:inline-block;text-align: center;cursor:pointer;vertical-align: middle;margin-left:-1px;">
					日 常
				</span>
				<span style="border-left:1px solid #808080;display:inline-block;line-height:15px;font-size: 16px;height:15px;vertical-align: middle;margin-left:-1px;"></span>
				<span style="line-height:50px;font-size:16px;width:14.4%;display:inline-block;text-align: center;cursor:pointer;vertical-align: middle;margin-left:-1px;">
					记 录
				</span>
				<span style="border-left:1px solid #808080;display:inline-block;line-height:15px;font-size: 16px;height:15px;vertical-align: middle;margin-left:-1px;"></span>
				<span @click="$router.push({path:'/friends'})"
					style="line-height:50px;font-size:16px;width:14.4%;display:inline-block;text-align: center;cursor:pointer;vertical-align: middle;margin-left:-1px;">
					好 友
				</span>
				<span style="border-left:1px solid #808080;display:inline-block;line-height:15px;font-size: 16px;height:15px;vertical-align: middle;margin-left:-1px;"></span>
				<span style="line-height:50px;font-size:16px;width:14.4%;display:inline-block;text-align: center;cursor:pointer;vertical-align: middle;margin-left:-1px;">
					消 息
				</span>
				<span style="border-left:1px solid #366CB3;display:inline-block;line-height:15px;font-size: 16px;height:15px;vertical-align: middle;margin-left:-1px;"></span>
				<span @click="$router.push({path:'/me'})"
					style="line-height:50px;font-size:16px;width:14.4%;display:inline-block;text-align: center;cursor:pointer;
						vertical-align: middle;background-color: #366CB3;color:#ffffff;margin-left:-1px;">
					我
				</span>
				<span style="z-index:-100;background-color: #366CB3;width:14.4%;display:inline-block;line-height:50px;font-size: 16px;vertical-align: middle;position:absolute;right:0;">
					&nbsp;
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
				query: null
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