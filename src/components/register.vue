<template>
	<div id="register">
		<div style="height:30px;"></div>
		<h1 style="text-align: center;font-size: 24px;margin:0;">Recording</h1>
		<h1 style="text-align: center;font-size: 20px;margin:10px;">注册</h1>

		<div style="height:30px;"></div>

		<form style="width:250px;margin:auto;">
			<div style="height:30px;line-height:30px;position:relative;">
				<span style="width:50px;display: inline-block;font-size: 14px;">手机</span>
				<input v-model="phone" @keyup.enter="register()" type="text"
					style="width:183px;height:28px;border-width: 1px;padding:0;padding-right:15px;" />
				<span v-if="phone" style="font-size: 14px;position:absolute;right:6px;cursor: pointer;color: #8f8f8f;"
					@click="phone=null">x</span>
			</div>

			<div style="height:30px;line-height:30px;position:relative;">
				<span style="width:50px;display: inline-block;font-size: 14px;">昵称</span>
				<input v-model="nickname" @keyup.enter="register()" type="text"
					style="width:183px;height:28px;border-width: 1px;padding:0;padding-right:15px;" />
				<span v-if="nickname" style="font-size: 14px;position:absolute;right:6px;cursor: pointer;color: #8f8f8f;"
					@click="nickname=null">x</span>
			</div>

			<div style="height:10px;"></div>
			<div style="height:30px;line-height:30px;position:relative;">
				<span style="width:50px;display: inline-block;font-size: 14px;">密码</span>
				<input v-model="password"  @keyup.enter="register()" type="password"
					style="width:183px;height:28px;border-width: 1px;padding:0;padding-right:15px;" />
				<span v-if="password"
					style="font-size: 14px;position:absolute;right:6px;cursor: pointer;color: #8f8f8f;"
					@click="password=null">x</span>
			</div>

			<div style="height:10px;"></div>
			<div style="height:30px;line-height:30px;position:relative;">
				<span style="width:50px;display: inline-block; font-size: 14px;">验证码</span>
				<input v-model="smsvcode"  @keyup.enter="register()" type="text"
					style="width:138px;height:28px;border-width: 1px;padding:0;padding-right:15px;" />
				<span v-if="smsvcode"
					style="font-size: 14px;position:absolute;right:50px;cursor: pointer;color: #8f8f8f;"
					@click="smsvcode=null">x</span>
				<span style="width:10px;display:inline-block;"></span>
				<button style="width:35px;height:30px;padding:0;vertical-align: top;">获取</button>
			</div>

			<div style="height:50px;"></div>
			<div style="text-align: center;">
				<button style="width:200px;height:30px;" @click="register()">注册</button>
				<div style="height:50px;"></div>
				<button style="width:200px;height:30px;"
					@click="$router.push({path:'/login',query:{time:new Date().getTime()+''}})">去登录</button>
			</div>
		</form>
	</div>
</template>
<script>

	export default {
		name: 'register',
		data() {
			return {
				phone: null,
				nickname:null,
				password: null,
				smsvcode: null,
			}
		},
		activated() {
			debugger
			let thisVue = this;
			if (thisVue.query != JSON.stringify(thisVue.$route.query)) {
				thisVue.reload();

				thisVue.query = JSON.stringify(thisVue.$route.query);
			}
		},
		methods: {
			reload() {
				debugger
				let thisVue = this;
				Object.assign(thisVue.$data, thisVue.$options.data());
			},
			register() {
				debugger
				let thisVue = this;
				thisVue.$axios.post('/register',thisVue.$qs.stringify({ nickname:thisVue.nickname,phone:thisVue.phone, password:thisVue.password, smsvcode:thisVue.smsvcode }) ).then(res => {
					debugger
					if (res.data.codeMsg)
						alert(res.data.codeMsg)
					if (res.data.code == 0) {
						thisVue.$axios.post('/login-by-login-id', thisVue.$qs.stringify({ loginId: res.data.data.loginId })).then(res => {
							debugger
							if (res.data.codeMsg)
								alert(res.data.codeMsg)
							if (res.data.code == 0) {
								thisVue.$router.push({ path: '/index', query: { time: new Date().getTime()+"" } })
							}
						})
					}
				})
			}
		}
	}
</script>

<style scoped>

</style>