<template>
	<div id="forget-password" style="font-size: 0;height:100%;padding:1px 0 0 0;margin-top: -1px;">
		<h1 style="text-align: center;font-size: 24px;margin:0;margin-top:30px;">Recording</h1>
		<h1 style="text-align: center;font-size: 20px;margin:10px;">忘记密码</h1>

		<form id="byEmailPad" v-if="byEmailPad" style="width:270px;margin:auto;margin-top:30px;">
			<div style="height:30px;line-height:30px;position:relative;">
				<span style="width:70px;display: inline-block;font-size: 16px;">Email</span>
				<input v-model="email" @keyup.enter="register()" type="text"
					style="width:178px;height:28px;padding-right:18px;font-size: 16px;" />
				<span v-if="email" style="line-height: 34px;font-size: 16px;position: absolute;right: 0px;cursor: pointer;color: rgb(143, 143, 143);width: 20px;text-align: center;" @click="email=null">
					x
				</span>
			</div>

			<div  style="height:30px;line-height:30px;position:relative;margin-top:10px;" >
				<span class="n1-line" style="width:70px;display: inline-block; font-size: 16px;font-size: 16px;">验证码</span>
				<input v-model="emailVcode"  @keyup.enter="loginBySms()" type="text" style="width:125px;height:28px;padding-right:15px;font-size: 16px;"/>
				<span v-if="emailVcode"  @click="emailVcode=null" style="line-height: 34px;font-size: 16px;position: absolute;right: 55px;cursor: pointer;color: rgb(143, 143, 143);width: 20px;text-align: center;">x</span>
				<button type="button" style="padding:0px 6px;vertical-align: top;cursor:pointer;font-size: 16px;line-height: 30px;margin-left:5px;	">获取</button>
			</div>

			<div style="height:30px;line-height:30px;position:relative;margin-top:10px;">
				<span style="width:70px;display: inline-block;font-size: 16px;">新密码</span>
				<input v-model="newPassword"  @keyup.enter="register()" type="password"
					style="width:178px;height:28px;padding-right:18px;font-size: 16px;" />
				<span v-if="newPassword"
					style="line-height: 34px;font-size: 16px;position: absolute;right: 0px;cursor: pointer;color: rgb(143, 143, 143);width: 20px;text-align: center;"
					@click="newPassword=null">x</span>
			</div>

			<div style="height:30px;line-height:30px;position:relative;margin-top:10px;">
				<span style="width:70px;display: inline-block;font-size: 16px;">密码确认</span>
				<input v-model="confirmNewPassword"  @keyup.enter="register()" type="password"
					style="width:178px;height:28px;padding-right:18px;font-size: 16px;" />
				<span v-if="confirmNewPassword"
					style="line-height: 34px;font-size: 16px;position: absolute;right: 0px;cursor: pointer;color: rgb(143, 143, 143);width: 20px;text-align: center;" @click="confirmNewPassword=null">
					x
				</span>
			</div>
			<div style="text-align: center;margin-top:50px;">
				<button style="width:270px;height:35px;font-size:16px;" @click="forgetByEmail()">确认</button>
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

			<div style="height:30px;line-height:30px;position:relative;margin-top:10px;">
				<span style="width:70px;display: inline-block;font-size: 16px;">新密码</span>
				<input v-model="newPassword"  @keyup.enter="register()" type="password"
					style="width:178px;height:28px;padding-right:18px;font-size: 16px;" />
				<span v-if="newPassword"
					style="line-height: 34px;font-size: 16px;position: absolute;right: 0px;cursor: pointer;color: rgb(143, 143, 143);width: 20px;text-align: center;"
					@click="newPassword=null">x</span>
			</div>

			<div style="height:30px;line-height:30px;position:relative;margin-top:10px;">
				<span style="width:70px;display: inline-block;font-size: 16px;">密码确认</span>
				<input v-model="confirmNewPassword"  @keyup.enter="register()" type="password"
					style="width:178px;height:28px;padding-right:18px;font-size: 16px;" />
				<span v-if="confirmNewPassword"
					style="line-height: 34px;font-size: 16px;position: absolute;right: 0px;cursor: pointer;color: rgb(143, 143, 143);width: 20px;text-align: center;" @click="confirmNewPassword=null">
					x
				</span>
			</div>

			<div style="text-align: center;margin-top:50px;">
				<button style="width:270px;height:35px;font-size:16px;" @click="forgetBySms()">确认</button>
			</div>
		</form>

		<div style="text-align:center;margin-top:50px;">
			<button v-if="bySmsPad" @click="bySmsPad=0;byEmailPad=1;" type="button" style="width:270px;height:35px;margin-top:5px;font-size: 16px;" >通过过邮找回</button>
			<br/>
			<button v-if="byEmailPad" @click="bySmsPad=1;byEmailPad=0;" type="button" style="width:270px;height:35px;margin-top:5px;font-size: 16px;" >通过手机找回</button>
			<br/>
			<button style="width:270px;height:35px;margin-top:5px;font-size:16px;" @click="$router.replace({path:'/login',query:{time:new Date().getTime()+''}})">去登录</button>
		</div>
	</div>
</template>
<script>

	export default {
		name: 'forget-password',
		data() {
			return {
				email: null,
				newPassword: null,
				confirmNewPassword: null,
				smsVcode: null,
				emailVcode: null,
				bySmsPad: 0,
				byEmailPad: 1
			}
		},
		activated() {
			debugger
			let thisV = this;
			if (thisV.query != JSON.stringify(thisV.$route.query)) {
				thisV.reload();

				thisV.query = JSON.stringify(thisV.$route.query);
			}
		},
		methods: {
			reload() {
				debugger
				let thisV = this;
				Object.assign(thisV.$data, thisV.$options.data());
			},
			forgetByEmail() {
				debugger
				let thisV = this;
				thisV.$axios.post('/recording/update-password-by-email',thisV.$qs.stringify({email:thisV.email, vcode: thisV.emailVcode, newPassword:thisV.newPassword}) ).then(res => {
					debugger
					if (res.data.codeMsg)
						thisV.$dialog.alert(data.data.codeMsg);
					if (res.data.code == 0) {
						if (!res.data.codeMsg)
							thisV.$dialog.alert('修改成功');
					}
				})
			},
			forgetBySms() {
				debugger
				let thisV = this;
				thisV.$axios.post('/recording/update-password-by-sms',thisV.$qs.stringify({phone:thisV.phone, vcode: thisV.emailVcode, newPassword:thisV.newPassword}) ).then(res => {
					debugger
					if (res.data.codeMsg)
						thisV.$dialog.alert(data.data.codeMsg);
					if (res.data.code == 0) {
						if (!res.data.codeMsg)
							thisV.$dialog.alert('修改成功');
					}
				})
			}
		}
	}
</script>

<style scoped>

</style>