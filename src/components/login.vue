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
				<button type="button" style="padding:0px 6px;vertical-align: top;cursor:pointer;font-size: 14px;line-height: 28px;margin-left:5px;	">获取</button>
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
			<button @click="$router.replace({path:'/register',query:{time:new Date().getTime()+''}})" type="button" style="width:250px;height:35px;font-size: 16px;margin-top:5px;">去注册</button>
			<br/>
			<button @click="$router.replace({path:'/forget-password',query:{time:new Date().getTime()+''}})" type="button" style="width:250px;height:35px;margin-top:5px;font-size: 16px;">忘记密码</button>
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
			let thisV = this;
			if(thisV.query != JSON.stringify(thisV.$route.query)){
				thisV.reload();
				thisV.query = JSON.stringify(thisV.$route.query);
			}
		},
		methods:{
			reload(){
				let thisV = this;
				Object.assign(thisV.$data, thisV.$options.data());
			 },
			 login(){
				debugger
				let thisV = this;
				thisV.$axios.post('/recording/login',thisV.$qs.stringify({account:thisV.account,password:thisV.password})).then(data => {
					debugger;
					if(data.data.codeMsg)
						thisV.$dialog.alert(data.data.codeMsg);
					if(data.data.code == 0){
						thisV.$axios.post('/recording/login-refresh').then(data => {
							debugger;
							if(data.data.codeMsg) {
								debugger;
								thisV.$dialog.alert({message:data.data.codeMsg});
							}
							if (data.data.code == 0) {
								thisV.$store.state.login=data.data.data;
								thisV.$router.push({path:'/index',query:{time:new Date().getTime()+""}})
							}
						})
					}
				})
			 },
			 loginBySms(){
				debugger
				let thisV = this;
				thisV.$axios.post('/recording/login-by-sms',thisV.$qs.stringify({phone:thisV.phone,smsVcode:thisV.smsVcode})).then(data => {
					debugger
					if(data.data.codeMsg)
						thisV.$dialog.alert(data.data.codeMsg);
					if(data.data.code == 0){
						thisV.$axios.post('/recording/login-refresh').then(data => {
							debugger
							if(data.data.codeMsg)
								thisV.$dialog.alert(data.data.codeMsg);
							if (data.data.code == 0) {
								thisV.$store.state.login=data.data.data;
								thisV.$router.push({path:'/index',query:{time:new Date().getTime()+""}})
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