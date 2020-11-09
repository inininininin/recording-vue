<template>
	<div id="forget-password" style="font-size: 0;padding:30px 0 0 0;position:absolute;top:0;bottom:0;right:0;left:0;">
		<h1 style="text-align: center;font-size: 30px;margin:0;">板板</h1>
		<h1 style="text-align: center;font-size: 20px;margin:10px;">忘记密码</h1>

		<div id="byEmail" v-if="byEmail" style="width:270px;margin:auto;margin-top:30px;">
			<div style="height:30px;line-height:30px;position:relative;">
				<span style="width:70px;display: inline-block;font-size: 16px;">Email</span>
				<input v-model="email" @keyup.enter="forgetByEmail()" type="text"
					style="width:178px;height:26px;padding:0;padding-right:18px;font-size: 16px;" />
				<span v-if="email" style="line-height: 34px;font-size: 16px;position: absolute;right: 0px;cursor: pointer;color: rgb(143, 143, 143);width: 20px;text-align: center;" @click="email=null">
					x
				</span>
			</div>

			<div  style="height:30px;line-height:30px;position:relative;margin-top:10px;" >
				<span style="width:70px;display: inline-block; font-size: 16px;font-size: 16px;">验证码</span>
				<input v-model="emailCode"  @keyup.enter="loginBySms()" type="text" style="width:125px;height:26px;padding:0;padding-right:15px;font-size: 16px;"/>
				<span v-if="emailCode"  @click="emailCode=null" style="line-height: 34px;font-size: 16px;position: absolute;right: 55px;cursor: pointer;color: rgb(143, 143, 143);width: 20px;text-align: center;">x</span>
				<button type="button" style="padding:0px 6px;vertical-align: top;cursor:pointer;font-size: 16px;line-height: 26px;margin-left:5px;	">获取</button>
			</div>

			<div style="height:30px;line-height:30px;position:relative;margin-top:10px;">
				<span style="width:70px;display: inline-block;font-size: 16px;">新密码</span>
				<input v-model="newPassword"  @keyup.enter="forgetByEmail()" type="password"
					style="width:178px;height:26px;padding:0;padding-right:18px;font-size: 16px;" />
				<span v-if="newPassword"
					style="line-height: 34px;font-size: 16px;position: absolute;right: 0px;cursor: pointer;color: rgb(143, 143, 143);width: 20px;text-align: center;"
					@click="newPassword=null">x</span>
			</div>

			<div style="height:30px;line-height:30px;position:relative;margin-top:10px;">
				<span style="width:70px;display: inline-block;font-size: 16px;">密码确认</span>
				<input v-model="confirmNewPassword"  @keyup.enter="forgetByEmail()" type="password"
					style="width:178px;height:26px;padding:0;padding-right:18px;font-size: 16px;" />
				<span v-if="confirmNewPassword"
					style="line-height: 34px;font-size: 16px;position: absolute;right: 0px;cursor: pointer;color: rgb(143, 143, 143);width: 20px;text-align: center;" @click="confirmNewPassword=null">
					x
				</span>
			</div>
			<div style="text-align: center;margin-top:50px;">
				<button style="width:270px;height:35px;font-size:16px;" @click="forgetByEmail()">确认</button>
			</div>
		</div>

		<div id="bySms" v-if="bySms" style="width:270px;margin:auto;margin-top:30px;">
			<div style="height:30px;line-height:30px;position:relative;">
				<span style="width:70px;display: inline-block;font-size: 16px;">手机</span>
				<input v-model="phone" @keyup.enter="forgetBySms()" type="text"
					style="width:178px;height:26px;padding:0;padding-right:18px;font-size: 16px;" />
				<span v-if="phone" style="line-height: 34px;font-size: 16px;position: absolute;right: 0px;cursor: pointer;color: rgb(143, 143, 143);width: 20px;text-align: center;" @click="phone=null">
					x
				</span>
			</div>

			<div  style="height:30px;line-height:30px;position:relative;margin-top:10px;" >
				<span style="width:70px;display: inline-block; font-size: 16px;font-size: 16px;">验证码</span>
				<input v-model="smsCode"  @keyup.enter="forgetBySms()" type="text" style="width:125px;height:26px;padding:0;padding-right:15px;font-size: 16px;"/>
				<span v-if="smsCode"  @click="smsCode=null" style="line-height: 34px;font-size: 16px;position: absolute;right: 55px;cursor: pointer;color: rgb(143, 143, 143);width: 20px;text-align: center;">x</span>
				<button type="button" style="padding:0px 6px;vertical-align: top;cursor:pointer;font-size: 16px;line-height: 26px;margin-left:5px;	"
					@click="
						$axios.post('/recording/send-sms-code?'+$qs.stringify({phone:phone})).then(data => {
							if(data.data.codeMsg)
								$dialog.alert({message:data.data.codeMsg});
							if(data.data.code == 0){
								if(!data.data.codeMsg)
									$notify({message:'已发送'});
							}
						})
					">
					获取
				</button>			
			</div>

			<div style="height:30px;line-height:30px;position:relative;margin-top:10px;">
				<span style="width:70px;display: inline-block;font-size: 16px;">新密码</span>
				<input v-model="newPassword"  @keyup.enter="forgetBySms()" type="password"
					style="width:178px;height:26px;padding:0;padding-right:18px;font-size: 16px;" />
				<span v-if="newPassword"
					style="line-height: 34px;font-size: 16px;position: absolute;right: 0px;cursor: pointer;color: rgb(143, 143, 143);width: 20px;text-align: center;"
					@click="newPassword=null">x</span>
			</div>

			<div style="height:30px;line-height:30px;position:relative;margin-top:10px;">
				<span style="width:70px;display: inline-block;font-size: 16px;">密码确认</span>
				<input v-model="confirmNewPassword"  @keyup.enter="forgetBySms()" type="password"
					style="width:178px;height:26px;padding:0;padding-right:18px;font-size: 16px;" />
				<span v-if="confirmNewPassword"
					style="line-height: 34px;font-size: 16px;position: absolute;right: 0px;cursor: pointer;color: rgb(143, 143, 143);width: 20px;text-align: center;" @click="confirmNewPassword=null">
					x
				</span>
			</div>

			<div style="text-align: center;margin-top:50px;">
				<button style="width:270px;height:35px;font-size:16px;" @click="forgetBySms()">确认</button>
			</div>
		</div>

		<div style="width:270px;margin:auto;">
			<button v-if="bySms" @click="bySms=0;byEmail=1;" type="button" style="width:270px;height:35px;margin-top:5px;font-size: 16px;display:block;" >
				通过邮箱找回
			</button>
			<br/>
			<button v-if="byEmail" @click="bySms=1;byEmail=0;" type="button" style="width:270px;height:35px;margin-top:5px;font-size: 16px;display:block;" >
				通过手机找回
			</button>
			<br/>
			<span @click="$router.replace({path:'/login'})"  
				style="height:35px;font-size: 16px;line-height: 35px;text-align: right;cursor: pointer;float: right;text-decoration: underline;">
				去登录
			</span>
		</div>
	</div>
</template>
<script>

	export default {
		name: 'forget-password',
		data() {
			return {
				phone: null,
				email: null,
				newPassword: null,
				confirmNewPassword: null,
				smsCode: null,
				emailCode: null,
				bySms: 1,
				byEmail: 0
			}
		},
		activated() {
			debugger
			let vue = this;
			if (vue.query != JSON.stringify(vue.$route.query)) {
				vue.reload();

				vue.query = JSON.stringify(vue.$route.query);
			}
		},
		methods: {
			reload() {
				debugger
				let vue = this;
				Object.assign(vue.$data, vue.$options.data());
			},
			forgetByEmail() {
				debugger
				let vue = this;
				if(vue.newPassword != vue.confirmNewPassword)
					vue.$dialog.alert({message:'两次密码不一致'});
				else {
					vue.$axios.post('/recording/update-password-by-email',vue.$qs.stringify({email:vue.email, code: vue.emailCode, newPassword:vue.newPassword}) ).then(res => {
						debugger
						if (res.data.codeMsg)
							vue.$dialog.alert({message:res.data.codeMsg});
						if (res.data.code == 0) {
							if (!res.data.codeMsg)
								vue.$dialog.alert({message:'修改成功'});
						}
					})
				}
			},
			forgetBySms() {
				debugger
				let vue = this;
				if(vue.newPassword != vue.confirmNewPassword)
					vue.$dialog.alert({message:'两次密码不一致'});
				else {
					vue.$axios.post('/recording/update-password-by-sms',vue.$qs.stringify({phone:vue.phone, code: vue.smsCode, newPassword:vue.newPassword}) ).then(res => {
						debugger
						if (res.data.codeMsg)
							vue.$dialog.alert({message:res.data.codeMsg});
						if (res.data.code == 0) {
							if (!res.data.codeMsg)
								vue.$dialog.alert({message:'修改成功'});
						}
					})
				}
			}
		}
	}
</script>

<style scoped>

</style>