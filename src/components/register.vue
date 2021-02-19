<template>
	<div id="register" style="font-size: 0;padding:30px 0 0 0;position:absolute;top:0;bottom:0;right:0;left:0;">
		<h1 style="text-align: center;font-size: 30px;margin:0;">板板</h1>
		<h1 v-if="byAccount" style="text-align: center;font-size: 20px;margin:10px;">账号注册</h1>
		<h1 v-if="bySms" style="text-align: center;font-size: 20px;margin:10px;">手机注册</h1>

		<div id="byAccount" v-if="byAccount" style="width:270px;margin:auto;margin-top:30px;">
			<div style="height:30px;line-height:30px;position:relative;">
				<span style="width:70px;display: inline-block;font-size: 16px;">账号</span>
				<input v-model="account" @keyup.enter="register()" type="text"
					style="width:178px;height:26px;padding:0;padding-right:18px;font-size: 16px;" />
				<span v-if="account" style="line-height: 30px;font-size: 16px;position: absolute;right: 0px;cursor: pointer;color: rgb(143, 143, 143);width: 20px;text-align: center;" @click="account=null">
					x
				</span>
			</div>

			<div style="height:30px;line-height:30px;position:relative;margin-top:10px;">
				<span style="width:70px;display: inline-block;font-size: 16px;">密码</span>
				<input v-model="password"  @keyup.enter="register()" type="password"
					style="width:178px;height:26px;padding:0;padding-right:18px;font-size: 16px;" />
				<span v-if="password"
					style="line-height: 30px;font-size: 16px;position: absolute;right: 0px;cursor: pointer;color: rgb(143, 143, 143);width: 20px;text-align: center;"
					@click="password=null">x</span>
			</div>

			<div style="height:30px;line-height:30px;position:relative;margin-top:10px;">
				<span style="width:70px;display: inline-block;font-size: 16px;">密码确认</span>
				<input v-model="confirmPassword"  @keyup.enter="register()" type="password"
					style="width:178px;height:26px;padding:0;padding-right:18px;font-size: 16px;" />
				<span v-if="confirmPassword"
					style="line-height: 30px;font-size: 16px;position: absolute;right: 0px;cursor: pointer;color: rgb(143, 143, 143);width: 20px;text-align: center;" @click="confirmPassword=null">
					x
				</span>
			</div>
			<div style="height:30px;line-height:30px;position:relative;">
				<span style="width:70px;display: inline-block;font-size: 16px;margin-top:10px;">昵称</span>
				<input v-model="nickname" @keyup.enter="register()" type="text"
					style="width:178px;height:26px;padding:0;padding-right:18px;font-size: 16px;" />
				<span v-if="nickname" style="line-height: 30px;font-size: 16px;position: absolute;right: 0px;cursor: pointer;color: rgb(143, 143, 143);width: 20px;text-align: center;" @click="nickname=null">
					x
				</span>
			</div>
			<div style="text-align: center;margin-top:50px;">
				<button style="width:270px;height:35px;font-size:16px;" @click="register()">注册</button>
			</div>
		</div>

		<div id="bySms" @keyup.enter.prevent v-if="bySms" style="width:270px;margin:auto;margin-top:30px;">
			<div style="height:30px;line-height:30px;position:relative;">
				<span style="width:70px;display: inline-block;font-size: 16px;">手机</span>
				<input v-model="phone" @keyup.enter="registerBySms()" type="text"
					style="width:178px;height:26px;padding:0;padding-right:18px;font-size: 16px;" />
				<span v-if="phone" style="line-height: 30px;font-size: 16px;position: absolute;right: 0px;cursor: pointer;color: rgb(143, 143, 143);width: 20px;text-align: center;" @click="phone=null">
					x
				</span>
			</div>

			<div  style="height:30px;line-height:30px;position:relative;margin-top:10px;" >
				<span style="width:70px;display: inline-block; font-size: 16px;font-size: 16px;">验证码</span>
				<input v-model="code"  @keyup.enter="registerBySms()" type="text" style="width:125px;height:26px;padding:0;padding-right:15px;font-size: 16px;"/>
				<span v-if="code"  @click="code=null" style="line-height: 30px;font-size: 16px;position: absolute;right: 55px;cursor: pointer;color: rgb(143, 143, 143);width: 20px;text-align: center;">x</span>
				<button type="button" style="padding:0px 6px;vertical-align: top;cursor:pointer;font-size: 16px;line-height: 26px;margin-left:5px;	"
					@click="
						$axios.post('/banban/send-sms-code?'+$qs.stringify({phone:phone})).then(data => {
							if(data.data.codeMsg)
								$dialog.alert({message:data.data.codeMsg});
							if(data.data.code == 0){
								if(!data.data.codeMsg)
									$notify({type:'success',message:'已发送'});
							}
						})
					">
					获取
				</button>
			</div>
			<div style="height:30px;line-height:30px;position:relative;margin-top:10px;">
				<span style="width:70px;display: inline-block;font-size: 16px;">昵称</span>
				<input v-model="nickname" @keyup.enter="registerBySms()" type="text"
					style="width:178px;height:26px;padding:0;padding-right:18px;font-size: 16px;" />
				<span v-if="nickname" style="line-height: 30px;font-size: 16px;position: absolute;right: 0px;cursor: pointer;color: rgb(143, 143, 143);width: 20px;text-align: center;" @click="nickname=null">
					x
				</span>
			</div>
			<div style="text-align: center;margin-top:50px;">
				<button style="width:270px;height:35px;font-size:16px;" @click="registerBySms()">注册</button>
			</div>
		</div>

		<div style="width:270px;margin:auto;">
			<button v-if="bySms" @click="byAccount=1;bySms=0;" type="button" 
				style="width:270px;height:35px;margin-top:5px;font-size: 16px;display:block;" >
				通过账号注册
			</button>
			<button v-if="byAccount" @click="byAccount=0;bySms=1;" type="button" 
				style="width:270px;height:35px;margin-top:5px;font-size: 16px;display:block;" >
				通过用手机注册
			</button>
			<span @click="$router.replace({path:'/login'})"  
				style="height:35px;font-size: 16px;line-height: 35px;text-align: right;cursor: pointer;float: right;text-decoration: underline;">
				去登录
			</span>
		</div>
	</div>
</template>
<script>

	export default {
		name: 'register',
		data() {
			return {
				account: null,
				phone: null,
				nickname:null,
				password: null,
				confirmPassword: null,
				code: null,
				bySms: 1,
				byAccount: 0
			}
		},
		activated() {
			
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
				
				let vue = this;
			},
			register() {
				
				let vue = this;
				if(vue.password != vue.confirmPassword)
					vue.$dialog.alert({message:'两次密码不一致'});
				else {
					vue.$axios.post('/banban/register',vue.$qs.stringify({nickname:vue.nickname,account:vue.account, password:vue.password}) ).then(res => {
						
						if (res.data.codeMsg)
							vue.$dialog.alert({message:res.data.codeMsg});
						if (res.data.code == 0) {
							vue.$axios.post('/banban/login-by-ticket', vue.$qs.stringify({ticket: res.data.data.ticket})).then(res => {
								
								if (res.data.codeMsg)
									vue.$dialog.alert({message:res.data.codeMsg});
								if (res.data.code == 0) {
									vue.$axios.post('/banban/login-refresh').then(data => {
										
										if(data.data.codeMsg)
											vue.$dialog.alert({message:data.data.codeMsg});
										if (data.data.code == 0) {
											if(!res.data.codeMsg)
												vue.$notify({type:'success',message:'注册成功'});
											vue.$store.state.login=data.data.data;
											vue.$router.push({path:'/index',query:{time:new Date().getTime()+""}})
										}
									})
								}
							})
						}
					})
				}
			},
			registerBySms() {
				
				let vue = this;
				if(vue.password != vue.confirmPassword)
					vue.$dialog.alert({message:'两次密码不一致'});
				else {
					vue.$axios.post('/banban/register-by-sms',vue.$qs.stringify({nickname:vue.nickname,phone:vue.phone, code:vue.code}) ).then(res => {
						
						if (res.data.codeMsg)
							vue.$dialog.alert({message:res.data.codeMsg});
						if (res.data.code == 0) {
							vue.$axios.post('/banban/login-by-ticket', vue.$qs.stringify({ticket: res.data.data.ticket})).then(res => {
								
								if (res.data.codeMsg)
									vue.$dialog.alert({message:res.data.codeMsg});
								if (res.data.code == 0) {
									vue.$axios.post('/banban/login-refresh').then(data => {
										
										if(data.data.codeMsg)
											vue.$dialog.alert({message:data.data.codeMsg});
										if (data.data.code == 0) {
											if(!res.data.codeMsg)
												vue.$notify({type:'success',message:'注册成功'});
											vue.$store.state.login=data.data.data;
											vue.$router.push({path:'/index',query:{time:new Date().getTime()+""}})
										}
									})
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