<template>
	<div id="register" style="font-size: 0;height:100%;padding:1px 0 0 0;margin-top: -1px;">
		<h1 style="text-align: center;font-size: 24px;margin:0;margin-top:30px;">Recording</h1>
		<h1 style="text-align: center;font-size: 20px;margin:10px;">注册</h1>

		<form id="byAccountPad" v-if="byAccountPad" style="width:270px;margin:auto;margin-top:30px;">
			<div style="height:30px;line-height:30px;position:relative;">
				<span style="width:70px;display: inline-block;font-size: 16px;">账号</span>
				<input v-model="account" @keyup.enter="register()" type="text"
					style="width:178px;height:28px;padding-right:18px;font-size: 16px;" />
				<span v-if="account" style="line-height: 34px;font-size: 16px;position: absolute;right: 0px;cursor: pointer;color: rgb(143, 143, 143);width: 20px;text-align: center;" @click="account=null">
					x
				</span>
			</div>

			<div style="height:30px;line-height:30px;position:relative;margin-top:10px;">
				<span style="width:70px;display: inline-block;font-size: 16px;">密码</span>
				<input v-model="password"  @keyup.enter="register()" type="password"
					style="width:178px;height:28px;padding-right:18px;font-size: 16px;" />
				<span v-if="password"
					style="line-height: 34px;font-size: 16px;position: absolute;right: 0px;cursor: pointer;color: rgb(143, 143, 143);width: 20px;text-align: center;"
					@click="password=null">x</span>
			</div>

			<div style="height:30px;line-height:30px;position:relative;margin-top:10px;">
				<span style="width:70px;display: inline-block;font-size: 16px;">密码确认</span>
				<input v-model="confirmPassword"  @keyup.enter="register()" type="password"
					style="width:178px;height:28px;padding-right:18px;font-size: 16px;" />
				<span v-if="confirmPassword"
					style="line-height: 34px;font-size: 16px;position: absolute;right: 0px;cursor: pointer;color: rgb(143, 143, 143);width: 20px;text-align: center;" @click="confirmPassword=null">
					x
				</span>
			</div>
			<div style="text-align: center;margin-top:50px;">
				<button style="width:270px;height:35px;font-size:16px;" @click="register()">注册</button>
			</div>
		</form>

		<form id="bySmsPad" v-if="bySmsPad" style="width:270px;margin:auto;margin-top:30px;">
			<div style="height:30px;line-height:30px;position:relative;">
				<span style="width:70px;display: inline-block;font-size: 16px;">手机</span>
				<input v-model="account" @keyup.enter="register()" type="text"
					style="width:178px;height:28px;padding-right:18px;font-size: 16px;" />
				<span v-if="account" style="line-height: 34px;font-size: 16px;position: absolute;right: 0px;cursor: pointer;color: rgb(143, 143, 143);width: 20px;text-align: center;" @click="account=null">
					x
				</span>
			</div>

			<div  style="height:30px;line-height:30px;position:relative;margin-top:10px;" >
				<span class="n1-line" style="width:70px;display: inline-block; font-size: 16px;font-size: 16px;">验证码</span>
				<input v-model="smsVcode"  @keyup.enter="loginBySms()" type="text" style="width:125px;height:28px;padding-right:15px;font-size: 16px;"/>
				<span v-if="smsVcode"  @click="smsVcode=null" style="line-height: 34px;font-size: 16px;position: absolute;right: 55px;cursor: pointer;color: rgb(143, 143, 143);width: 20px;text-align: center;">x</span>
				<button type="button" style="padding:0px 6px;vertical-align: top;cursor:pointer;font-size: 16px;line-height: 30px;margin-left:5px;	">获取</button>
			</div>

			<div style="text-align: center;margin-top:50px;">
				<button style="width:270px;height:35px;font-size:16px;" @click="registerBySms()">注册</button>
			</div>
		</form>

		<div style="text-align:center;margin-top:50px;">
			<button v-if="bySmsPad" @click="byAccountPad=1;bySmsPad=0;" type="button" style="width:270px;height:35px;margin-top:5px;font-size: 16px;" >账号注册</button>
			<br/>
			<button v-if="byAccountPad" @click="byAccountPad=0;bySmsPad=1;" type="button" style="width:270px;height:35px;margin-top:5px;font-size: 16px;" >手机注册</button>
			<br/>
			<button style="width:270px;height:35px;margin-top:5px;font-size:16px;" @click="$router.replace({path:'/login'})">去登录</button>
		</div>
	</div>
</template>
<script>

	export default {
		name: 'register',
		data() {
			return {
				account: null,
				nickname:null,
				password: null,
				confirmPassword: null,
				smsVcode: null,
				bySmsPad: 0,
				byAccountPad: 1
			}
		},
		activated() {
			debugger
			let vue = this;
			if (JSON.stringify(vue.query) != JSON.stringify(vue.$route.query)) {
				Object.assign(vue.$data, vue.$options.data());
				vue.query = vue.$route.query;
				vue.load();
			}else{
				
			}
		},
		methods: {
			load() {
				debugger
				let vue = this;
			},
			register() {
				debugger
				let vue = this;
				vue.$axios.post('/recording/register',vue.$qs.stringify({nickname:vue.nickname,account:vue.account, password:vue.password}) ).then(res => {
					debugger
					if (res.data.codeMsg)
						vue.$dialog.alert(res.data.codeMsg);
					if (res.data.code == 0) {
						vue.$axios.post('/recording/login-by-login-code', vue.$qs.stringify({loginCode: res.data.data.loginCode})).then(res => {
							debugger
							if (res.data.codeMsg)
								vue.$dialog.alert(res.data.codeMsg);
							if (res.data.code == 0) {
								vue.$router.push({path:'/index',query:{time:new Date().getTime()+""}})
							}
						})
					}
				})
			},
			registerBySms() {
				debugger
				let vue = this;
				vue.$axios.post('/recording/register-by-sms',vue.$qs.stringify({nickname:vue.nickname,phone:vue.phone, smsVcode:vue.smsVcode}) ).then(res => {
					debugger
					if (res.data.codeMsg)
						vue.$dialog.alert(res.data.codeMsg);
					if (res.data.code == 0) {
						vue.$axios.post('/recording/login-by-login-code', vue.$qs.stringify({loginCode: res.data.data.loginCode})).then(res => {
							debugger
							if (res.data.codeMsg)
								vue.$dialog.alert(res.data.codeMsg);
							if (res.data.code == 0) {
								vue.$router.push({path:'/index',query:{time:new Date().getTime()+""}})
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