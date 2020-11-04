<template>
	<div id="me" style="font-size: 0;position:absolute;top:0;bottom:0;right:0;left:0;">
		<div v-if="!$store.state.login || !$store.state.login.userId"  
			style="height:120px;border-bottom: 1px solid #8f8f8f;border-top:1px solid #ffffff;">
			<div class="active"
				style="margin: 50px 0 0 20px;font-size:20px;font-weight:900;display: inline-block;cursor: pointer;text-decoration-line: underline;"
				@click="
					$router.replace({path:'/login'})
				">
				去登录 / 注册
			</div>
		</div>

		<div class="active" v-if="$store.state.login && $store.state.login.userId"  
			style="height:120px;border-bottom: 1px solid #8f8f8f;border-top:1px solid #ffffff;">
			<div v-if="$store.state.login && $store.state.login.userId" style="margin: 30px 0 0 20px;">
				<img style="width:50px;height:50px;border: 1px solid #8f8f8f;display: inline-block;vertical-align: bottom;cursor: pointer;"/>
				<span style="font-size:16px;display: inline-block;margin:0 0 0 20px;">
					{{$o($store.state.login).attr('nickname')}}
				</span>
			</div>
		</div>

		<div class="active" 
			style="height:45px;line-height:45px;font-size:16px;cursor: pointer;padding:0 20px;border-bottom: 1px solid #8f8f8f;">
			设置
		</div>
		<div class="active" 
			style="height:45px;line-height:45px;font-size:16px;cursor: pointer;padding:0 20px;border-bottom: 1px solid #8f8f8f;"
			@click="
				if(!window.vConsole){
					window.vConsole = new window.VConsole();
				}else{
					if(window.vConsole.$dom.style.display == 'none'){
						window.vConsole.$dom.style.display='block'
					}else{
						window.vConsole.$dom.style.display='none'
					}
				}
			">
			调试模式
		</div>
		<div class="active" 
			style="height:45px;line-height:45px;font-size:16px;cursor: pointer;padding:0 20px;border-bottom: 1px solid #8f8f8f;"
			@click="
				if($store.state.noSleep){
					window.noSleep.disable()
					$store.state.noSleep=0
					window.noSleep.isEnable=0
				}else{
					window.noSleep.enable()
					$store.state.noSleep=1
					window.noSleep.isEnable=1
				}
			">
			{{$store.state.noSleep?'恢复息屏':'阻止息屏'}}
		</div>
		<div class="active" @click="logout()" v-if="$store.state.login && $store.state.login.userId" 
			style="height:45px;line-height:45px;font-size:16px;cursor: pointer;padding:0 20px;border-bottom: 1px solid #8f8f8f;">
			退出登录
		</div>
		<div class="active" style="text-align: center;font-size: 14px;color:#757575;position:absolute;bottom:60px;width:100%;cursor: pointer;"
			@click="
				$dialog.alert({message:$versionIntro})
			">
			ver: {{$version}}
		</div>
		<div style="height:50px;position:absolute;bottom:0;left:0;right:0;box-shadow: 0px -1px 4px 0px #8f8f8f;overflow: hidden;background-color: #FFFFFF;">
			<div class="n1-line scrollbar1" style="height:50px;position: relative;overflow-x: auto;">
				<span @click="$router.push({path:'/index'})"
					style="line-height:50px;font-size:16px;width:16.7%;display:inline-block;text-align: center;cursor:pointer;vertical-align: middle;margin-left:-1px;">
					任 务
				</span>
				<span style="border-left:1px solid #808080;display:inline-block;line-height:15px;font-size: 16px;height:15px;vertical-align: middle;margin-left:-1px;"></span>
				<span style="line-height:50px;font-size:16px;width:16.7%;display:inline-block;text-align: center;cursor:pointer;vertical-align: middle;margin-left:-1px;">
					日 常
				</span>
				<span style="border-left:1px solid #808080;display:inline-block;line-height:15px;font-size: 16px;height:15px;vertical-align: middle;margin-left:-1px;"></span>
				<span style="line-height:50px;font-size:16px;width:16.7%;display:inline-block;text-align: center;cursor:pointer;vertical-align: middle;margin-left:-1px;">
					记 录
				</span>
				<span style="border-left:1px solid #808080;display:inline-block;line-height:15px;font-size: 16px;height:15px;vertical-align: middle;margin-left:-1px;"></span>
				<span @click="$router.push({path:'/friends'})"
					style="line-height:50px;font-size:16px;width:16.7%;display:inline-block;text-align: center;cursor:pointer;vertical-align: middle;margin-left:-1px;">
					好 友
				</span>
				<span style="border-left:1px solid #808080;display:inline-block;line-height:15px;font-size: 16px;height:15px;vertical-align: middle;margin-left:-1px;"></span>
				<span style="line-height:50px;font-size:16px;width:16.7%;display:inline-block;text-align: center;cursor:pointer;vertical-align: middle;margin-left:-1px;">
					消 息
				</span>
				<span style="border-left:1px solid #366CB3;display:inline-block;line-height:15px;font-size: 16px;height:15px;vertical-align: middle;margin-left:-1px;"></span>
				<span style="background-color: #366CB3;width:16.7%;display:inline-block;line-height:50px;font-size: 16px;vertical-align: middle;margin-left:-1px;">
					&nbsp;
				</span>
				<span @click="$router.push({path:'/me'})"
					style="line-height:50px;font-size:16px;width:16.7%;display:inline-block;text-align: center;cursor:pointer;position:absolute;right:0;
						vertical-align: middle;background-color: #366CB3;color:#ffffff;">
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