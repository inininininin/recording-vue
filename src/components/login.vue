<template>
    <div id="login" style="font-size: 0;padding:30px 0 0 0;position:absolute;top:0;bottom:0;right:0;left:0;">
		<h1 style="text-align: center;font-size: 30px;margin:0;">板板</h1>
		<h1 v-if="byAccount" style="text-align: center;font-size: 20px;margin:10px 0 0 0;">密码登录</h1>
		<h1 v-if="bySms" style="text-align: center;font-size: 20px;margin:10px 0 0 0;">手机登录</h1>

		<form v-if="byAccount" class="byAccount" style="width:270px;margin:auto;margin-top:30px;">
			<div style="height:30px;line-height:30px;position:relative;">
				<span style="width:70px;display: inline-block;font-size: 16px;">账号</span>
				<input v-model="account" @keyup.enter="login()" type="text" placeholder="账号/手机/邮箱"
					style="width:180px;height:26px;padding:0;padding-right:15px;font-size: 16px;" 
				/>
				<span v-if="account" style="width:15px;text-align: center;font-size: 14px;position:absolute;right:2px;cursor: pointer;color: #6b6b6b;height:30px;line-height:30px;"
					@click="account=null">
					x
				</span>
			</div>

			<div style="height:30px;line-height:30px;position:relative;margin-top:10px;" >
				<span style="width:70px;display: inline-block;font-size: 16px;">密码</span>
				<input v-model="password"  @keyup.enter="login()" type="password" style="width:180px;height:26px;padding:0;padding-right:15px;font-size: 16px;"/>
				<span v-if="password" style="font-size: 14px;position:absolute;right:6px;cursor: pointer;color: #6b6b6b;" @click="password=null">x</span>
			</div>
			
			<div style="text-align: center;margin-top:50px;">
				<button style="width:270px;height:35px;font-size: 16px;" @click="login()" type="button">登录</button>
			</div>
		</form>

		<form v-if="bySms" class="bySms" style="width:270px;margin:auto;margin-top:30px;">
			<div style="height:30px;line-height:30px;position:relative;margin-top:10px;">
				<span style="width:70px;display: inline-block;font-size: 16px;">手机</span>
				<input v-model="phone" @keyup.enter="loginBySms()" type="text" style="width:180px;height:26px;padding:0;padding-right:15px;font-size: 16px;" />
				<span v-if="phone" style="font-size: 14px;position:absolute;right:6px;cursor: pointer;color: #6b6b6b;" @click="phone=null">x</span>
			</div>

			<div  style="height:30px;line-height:30px;position:relative;margin-top:10px;" >
				<span style="width:70px;display: inline-block; font-size: 16px;font-size: 16px;">验证码</span>
				<input v-model="code"  @keyup.enter="loginBySms()" type="text" style="width:130px;height:26px;padding:0;padding-right:15px;font-size: 16px;"/>
				<span v-if="code"  @click="code=null" style="font-size: 14px;position:absolute;right:56px;cursor: pointer;color: #6b6b6b;">x</span>
				<button type="button" style="padding:0px 6px;vertical-align: top;cursor:pointer;font-size: 14px;line-height: 26px;margin-left:5px;"
					@click="
						$axios.post('/recording/send-sms-code?'+$qs.stringify({phone:phone})).then(data => {
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

			<div style="text-align: center;margin-top:50px;">
				<button style="width:270px;height:35px;font-size: 16px;" @click="loginBySms()" type="button">登录</button>
			</div>
		</form>

		<div style="width:270px;margin:auto;">
			<button v-if="bySms" @click="byAccount=1;bySms=0;" type="button" 
				style="width:270px;height:35px;margin-top:5px;font-size: 16px;display:block;" >
				通过密码登录
			</button>
			<button v-if="byAccount" @click="byAccount=0;bySms=1;" type="button" 
				style="width:270px;height:35px;margin-top:5px;font-size: 16px;display:block;" >
				通过手机登录
			</button>
			<span v-if="byAccount" @click="$router.replace({path:'/forget-password'})" 
				style="height:35px;font-size: 16px;line-height: 35px;text-align: left;cursor: pointer;float: left;text-decoration: underline;">
				忘记密码
			</span>
			<span @click="$router.replace({path:'/register'})"  
				style="height:35px;font-size: 16px;line-height: 35px;text-align: right;cursor: pointer;float: right;text-decoration: underline;">
				去注册
			</span>
		</div>
    </div>
</template>
<script>
	export default {
		name: 'login',
		data () {
			return {
				byAccount:0,
				bySms:1,
				account:null,
				phone:null,
				password:null,
				code:null,
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
				vue.$axios.post('/recording/login',vue.$qs.stringify({account:vue.account,password:vue.password})).then(res => {
					debugger;
					if(res.data.codeMsg)
						vue.$dialog.alert({message:res.data.codeMsg});
					if(res.data.code == 0){
						vue.$axios.post('/recording/login-refresh').then(res => {
							debugger;
							if(res.data.codeMsg) {
								debugger;
								vue.$dialog.alert({message:res.data.codeMsg});
							}
							if (res.data.code == 0) {
								if(!res.data.codeMsg)
									vue.$notify({type:'success',message:'登录成功'});
								vue.$store.state.login=res.data.data;
								vue.$router.push({path:'/index',query:{time:new Date().getTime()+""}})
							}
						})
					}
				})
			 },
			 loginBySms(){
				debugger
				let vue = this;
				vue.$axios.post('/recording/login-by-sms',vue.$qs.stringify({phone:vue.phone,code:vue.code})).then(res => {
					debugger
					if(res.data.codeMsg)
						vue.$dialog.alert({message:res.data.codeMsg});
					if(res.data.code == 0){
						vue.$axios.post('/recording/login-refresh').then(data => {
							debugger
							if(res.data.codeMsg)
								vue.$dialog.alert({message:res.data.codeMsg});
							if (res.data.code == 0) {
								if(!res.data.codeMsg)
									vue.$notify({type:'success',message:'登录成功'});
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