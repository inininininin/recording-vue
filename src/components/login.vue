<template>
    <div id="login" style="font-size: 0;height:100%;padding:1px 0 0 0;margin-top: -1px;">
		<h1 style="text-align: center;font-size: 24px;margin:30px 0 0 0;">Recording</h1>
		<h1 style="text-align: center;font-size: 20px;margin:10px 0 0 0;">登录</h1>

		<form v-if="loginByAccountPad" class="loginByAccountPad" style="width:250px;margin:auto;margin-top:30px;">
			<div style="height:30px;line-height:30px;position:relative;">
				<span class="n1-line" style="width:50px;display: inline-block;font-size: 16px;">账号</span>
				<input v-model="account" @keyup.enter="login()" type="text" style="width:180px;height:26px;padding-right:15px;font-size: 16px;" />
				<span v-if="account" style="font-size: 14px;position:absolute;right:6px;cursor: pointer;color: #8f8f8f;" @click="account=null">x</span>
			</div>

			<div style="height:30px;line-height:30px;position:relative;margin-top:10px;" >
				<span style="width:50px;display: inline-block;font-size: 16px;">密码</span>
				<input v-model="password"  @keyup.enter="login()" type="password" style="width:180px;height:26px;padding-right:15px;	font-size: 16px;"/>
				<span v-if="password" style="font-size: 14px;position:absolute;right:6px;cursor: pointer;color: #8f8f8f;" @click="password=null">x</span>
			</div>
			
			<div style="text-align: center;margin-top:50px;">
				<button style="width:250px;height:35px;font-size: 16px;" @click="login()" type="button">登录</button>
			</div>
		</form>

		<form v-if="loginBySmsPad" class="loginBySmsPad" style="width:250px;margin:auto;margin-top:30px;">
			<div style="height:30px;line-height:30px;position:relative;margin-top:10px;">
				<span class="n1-line" style="width:50px;display: inline-block;font-size: 16px;">手机</span>
				<input v-model="phone" @keyup.enter="loginBySms()" type="text" style="width:180px;height:26px;padding-right:15px;font-size: 16px;" />
				<span v-if="phone" style="font-size: 14px;position:absolute;right:6px;cursor: pointer;color: #8f8f8f;" @click="phone=null">x</span>
			</div>

			<div  style="height:30px;line-height:30px;position:relative;margin-top:10px;" >
				<span class="n1-line" style="width:50px;display: inline-block; font-size: 16px;font-size: 16px;">验证码</span>
				<input v-model="smsVcode"  @keyup.enter="loginBySms()" type="text" style="width:130px;height:26px;padding-right:15px;font-size: 16px;"/>
				<span v-if="smsVcode"  @click="smsVcode=null" style="font-size: 14px;position:absolute;right:56px;cursor: pointer;color: #8f8f8f;">x</span>
				<button type="button" style="padding:0px 6px;vertical-align: top;cursor:pointer;font-size: 14px;line-height: 28px;margin-left:5px;"
					@click="
						$axios.post('/recording/send-sms-vcode?'+$qs.stringify({phone:smsVcode})).then(data => {
							if(data.data.codeMsg)
								$dialog.alert({message:data.data.codeMsg});
							if(data.data.code == 0){
								if(!data.data.codeMsg)
									$dialog.alert({message:'已发送'});
							}
						})
					">
					获取
				</button>
			</div>

			<div style="text-align: center;margin-top:50px;">
				<button style="width:250px;height:35px;font-size: 16px;" @click="loginBySms()" type="button">登录</button>
			</div>
		</form>

		<div style="text-align:center;margin-top:50px;">
			<button v-if="loginBySmsPad" @click="loginByAccountPad=1;loginBySmsPad=0;" type="button" style="width:250px;height:35px;margin-top:5px;font-size: 16px;" >账号登录</button>
			<br/>
			<button v-if="loginByAccountPad" @click="loginByAccountPad=0;loginBySmsPad=1;" type="button" style="width:250px;height:35px;margin-top:5px;font-size: 16px;" >手机登录</button>
			<br/>
			<button @click="$router.replace({path:'/register'})" type="button" style="width:250px;height:35px;font-size: 16px;margin-top:5px;">去注册</button>
			<br/>
			<button @click="$router.replace({path:'/forget-password'})" type="button" style="width:250px;height:35px;margin-top:5px;font-size: 16px;">忘记密码</button>
		</div>
    </div>
</template>
<script>
	export default {
		name: 'login',
		data () {
			return {
				loginByAccountPad:1,
				loginBySmsPad:0,
				account:null,
				phone:null,
				password:null,
				smsVcode:null,
			}
		},
		activated(){
		   debugger
			let vue = this;
			if(vue.query != JSON.stringify(vue.$route.query)){
				vue.reload();
				vue.query = JSON.stringify(vue.$route.query);
			}
		},
		methods:{
			reload(){
				let vue = this;
				Object.assign(vue.$data, vue.$options.data());
			 },
			 login(){
				debugger
				let vue = this;
				vue.$axios.post('/recording/login',vue.$qs.stringify({account:vue.account,password:vue.password})).then(data => {
					debugger;
					if(data.data.codeMsg)
						vue.$dialog.alert({message:data.data.codeMsg});
					if(data.data.code == 0){
						vue.$axios.post('/recording/login-refresh').then(data => {
							debugger;
							if(data.data.codeMsg) {
								debugger;
								vue.$dialog.alert({message:data.data.codeMsg});
							}
							if (data.data.code == 0) {
								vue.$store.state.login=data.data.data;
								vue.$router.push({path:'/index',query:{time:new Date().getTime()+""}})
							}
						})
					}
				})
			 },
			 loginBySms(){
				debugger
				let vue = this;
				vue.$axios.post('/recording/login-by-sms',vue.$qs.stringify({phone:vue.phone,smsVcode:vue.smsVcode})).then(res => {
					debugger
					if(res.data.codeMsg)
						vue.$dialog.alert(res.data.codeMsg);
					if(res.data.code == 0){
						vue.$axios.post('/recording/login-refresh').then(data => {
							debugger
							if(res.data.codeMsg)
								vue.$dialog.alert(res.data.codeMsg);
							if (res.data.code == 0) {
								vue.$store.state.login=res.data.data;
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