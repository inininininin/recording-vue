<template>
	<div id="login">
		<div style="visibility: hidden;">1</div>
		<h1 style="text-align: center;font-size: 24px;margin:30px 0 0 0;">Recording</h1>
		<h1 v-if="byAccountIs" style="text-align: center;font-size: 20px;margin:10px 0 0 0;">账号登录</h1>
		<h1 v-if="byPhoneIs" style="text-align: center;font-size: 20px;margin:10px 0 0 0;">手机登录</h1>
		<h1 v-if="byEmailIs" style="text-align: center;font-size: 20px;margin:10px 0 0 0;">邮箱登录</h1>

		<form style="width:250px;margin:30px auto 0 auto;">
			<div v-if="byAccountIs">
				<div style="font-size: 14px;">账号</div>
				<input v-model="account" @keyup.enter="login()" placeholder="账号/手机/邮箱" type="text"
					style="width:242px;height:28px;border-width: 1px;padding:0 3px;margin:5px 0 0 0;" />
			</div>
			<div  v-if="byPhoneIs">
				<div style="font-size: 14px;">手机</div>
				<input v-model="phone" @keyup.enter="login()" type="text"
					style="width:242px;height:28px;border-width: 1px;padding:0 3px;margin:5px 0 0 0;" />
			</div>
			<div v-if="byEmailIs">
				<div style="font-size: 14px;">邮箱</div>
				<input v-model="email" @keyup.enter="login()" type="text"
					style="width:242px;height:28px;border-width: 1px;padding:0 3px;margin:5px 0 0 0;" />
			</div>

			<div v-if="byAccountIs">
				<div style="font-size: 14px;margin:10px 0 0 0;">密码</div>
				<input v-model="password" @keyup.enter="login()" type="password"
					style="width:242px;height:28px;border-width: 1px;padding:0 3px;margin:5px 0 0 0;" />
			</div>

			<div v-if="byPhoneIs">
				<div style="font-size: 14px;margin:10px 0 0 0;">验证码</div>
				<div style="margin:5px 0 0 0;">
					<input v-model="phoneVcode" @keyup.enter="login()" type="text"
						style="width:192px;height:28px;border-width: 1px;padding:0 3px;" />
					<button type="button" @click="
						$axios.post('/send-phone-vcode',$qs.stringify({phone:phone})).then(res => {
							debugger
							if (res.data.codeMsg)
								window.alert(res.data.codeMsg)
							if (res.data.code == 0) {
								if (!res.data.codeMsg)
									window.alert('已发送')
							}
						})
					"
					style="padding:1px 6px;height:30px;width:50px;vertical-align: bottom;cursor: pointer;">
						发送</button>
				</div>
			</div>

			<div v-if="byEmailIs">
				<div style="font-size: 14px;margin:10px 0 0 0;">验证码</div>
				<div style="margin:5px 0 0 0;">
					<input v-model="emailVcode" @keyup.enter="login()" type="text"
						style="width:192px;height:28px;border-width: 1px;padding:0 3px;" />

					<button type="button" 
					@click="
						$axios.post('/send-email-vcode',$qs.stringify({email:email})).then(res => {
							debugger
							if (res.data.codeMsg)
								window.alert(res.data.codeMsg)
							if (res.data.code == 0) {
								if (!res.data.codeMsg)
									window.alert('已发送')
							}
						})
					" 
					style="padding:1px 6px;height:30px;width:50px;vertical-align: bottom;cursor: pointer;">
						发送</button>

				</div>
			</div>

			<button type="button" @click="login()"
				style="display: block;margin:50px auto 40px auto;width:200px;height:35px;cursor: pointer;">确认</button>
			<button type="button" v-if="!byAccountIs"
				style="display: block;margin:10px auto 0 auto;width:200px;height:35px;cursor: pointer;"
				@click="byAccountIs=1;byPhoneIs=0;byEmailIs=0;">账号登录</button>
			<button type="button" v-if="!byPhoneIs"
				style="display: block;margin:10px auto 0 auto;width:200px;height:35px;cursor: pointer;"
				@click="byAccountIs=0;byPhoneIs=1;byEmailIs=0;">手机登录</button>
			<button type="button" v-if="!byEmailIs"
				style="display: block;margin:10px auto 0 auto;width:200px;height:35px;cursor: pointer;"
				@click="byAccountIs=0;byPhoneIs=0;byEmailIs=1;">邮箱登录</button>
			<button type="button"  @click="$router.push({path:'/retrieve-password',query:{time:new Date().getTime()}})"
				style="display: block;margin:10px auto 0 auto;width:200px;height:35px;cursor: pointer;">找回密码</button>
			<button type="button" @click="$router.push({path:'/register',query:{time:new Date().getTime()}})"
				style="display: block;margin:10px auto 0 auto;width:200px;height:35px;cursor: pointer;color:#0000ff;">去注册</button>
			
		</form>
	</div>
</template>
<script>

	export default {
		name: 'login',
		data() {
			return {
				byAccountIs: 1,
				byPhoneIs: 0,
				byEmailIs: 0,
				phone: null,
				email: null,
				account: null,
				password: null,
				phoneVcode: null,
				emailVcode: null,
			}
		},
		activated() {
			debugger
			let thisVue = this;
			window.thisVue=thisVue;
			if (thisVue.query != JSON.stringify(thisVue.$route.query)) {
				thisVue.reload();

				thisVue.query = JSON.stringify(thisVue.$route.query);
			}else{
				thisVue.refresh()
			}
		},
		methods: {
			refresh() {
				let thisVue = this;
			},
			reload() {
				let thisVue = this;
				Object.assign(thisVue.$data, thisVue.$options.data());
			},
			login() {
				debugger
				let thisVue = this;

				if (thisVue.byAccountIs) {
					thisVue.$axios.post('/login', thisVue.$qs.stringify({ account: thisVue.account, password: thisVue.password })).then(res => {
						debugger
						if (res.data.codeMsg)
							alert(res.data.codeMsg)
						if (res.data.code == 0) {
							thisVue.$axios.post('/login-refresh').then(res => {
								debugger
								if (res.data.code == 0) {
									thisVue.$store.state.login = res.data.data;
									thisVue.$router.replace({ path: '/index', query: { time: new Date().getTime() + "" } })
								}
							})
						}
					})
				}
				if (thisVue.byPhoneIs) {
					thisVue.$axios.post('/login-by-phone', thisVue.$qs.stringify({ phone: thisVue.phone, vcode: thisVue.phoneVcode })).then(res => {
						debugger
						if (res.data.codeMsg)
							alert(res.data.codeMsg)
						if (res.data.code == 0) {
							thisVue.$axios.post('/login-refresh').then(res => {
								debugger
								if (res.data.code == 0) {
									thisVue.$store.state.login = res.data.data;
									thisVue.$router.replace({ path: '/index', query: { time: new Date().getTime() + "" } })
								}
							})
						}
					})
				}
				if (thisVue.byEmailIs) {
					thisVue.$axios.post('/login-by-email', thisVue.$qs.stringify({ email: thisVue.email, vcode: thisVue.emailVcode })).then(res => {
						debugger
						if (res.data.codeMsg)
							alert(res.data.codeMsg)
						if (res.data.code == 0) {
							thisVue.$axios.post('/login-refresh').then(res => {
								debugger
								if (res.data.code == 0) {
									thisVue.$store.state.login = res.data.data;
									thisVue.$router.replace({ path: '/index', query: { time: new Date().getTime() + "" } })
								}
							})
						}
					})
				}
			}
		}
	}
</script>

<style scoped>

</style>