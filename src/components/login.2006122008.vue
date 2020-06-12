<template>
    <div  id="login">
		<div style="height:30px;"></div>
		<h1 style="text-align: center;font-size: 24px;margin:0;">Recording</h1>
		<h1 style="text-align: center;font-size: 20px;margin:10px;">登录</h1>
		
		<div style="height:30px;"></div>

		<form style="width:250px;margin:auto;">
			<div style="height:30px;line-height:30px;position:relative;">
				<span style="width:50px;display: inline-block;font-size: 14px;">手机</span>
				<input v-model="phone" @keyup.enter="login()" type="text" style="width:183px;height:28px;border-width: 1px;padding:0;padding-right:15px;" />
				<span v-if="phone" style="font-size: 14px;position:absolute;right:6px;cursor: pointer;color: #8f8f8f;" @click="phone=null">x</span>
			</div>

			<div style="height:10px;" v-if="byPasswordIs"></div>
			<div style="height:30px;line-height:30px;position:relative;" v-if="byPasswordIs">
				<span style="width:50px;display: inline-block;font-size: 14px;">密码</span>
				<input v-model="password"  @keyup.enter="login()" type="password" style="width:183px;height:28px;border-width: 1px;padding:0;padding-right:15px;"/>
				<span v-if="password" style="font-size: 14px;position:absolute;right:6px;cursor: pointer;color: #8f8f8f;" @click="password=null">x</span>
			</div>

			<div v-if="bySmsvcodeIs" style="height:10px;" ></div>
			<div v-if="bySmsvcodeIs" style="height:30px;line-height:30px;position:relative;" >
				<span style="width:50px;display: inline-block; font-size: 14px;">验证码</span>
				<input v-model="smsvcode"  @keyup.enter="login()" type="text" style="width:138px;height:28px;border-width: 1px;padding:0;padding-right:15px;"/>
				<span v-if="smsvcode"  @click="smsvcode=null" style="font-size: 14px;position:absolute;right:50px;cursor: pointer;color: #8f8f8f;">x</span>
				<span style="width:10px;display:inline-block;"></span>
				<button type="button" style="cursor: pointer;width:35px;height:30px;padding:0;vertical-align: top;">获取</button>
			</div>

			<div style="height:50px;"></div>
			<div style="text-align: center;">
				<button style="width:200px;height:30px;" @click="login()" type="button">确认</button>
				<div style="height:50px;"></div>
				<button v-if="byPasswordIs" @click="bySmsvcodeIs=1;byPasswordIs=0" type="button" style="cursor: pointer;width:200px;height:30px;margin-top:5px;" >验证码登录</button>
				<button  v-if="bySmsvcodeIs" @click="bySmsvcodeIs=0;byPasswordIs=1" type="button" style="cursor: pointer;width:200px;height:30px;margin-top:5px;">密码登录</button>
				<button @click="$router.push({path:'/register',query:{time:new Date().getTime()+''}})" type="button" style="cursor: pointer;width:200px;height:30px;margin-top:5px;">去注册</button>
				<button @click="$router.push({path:'/forget-password',query:{time:new Date().getTime()+''}})" type="button" style="cursor: pointer;width:200px;height:30px;margin-top:5px;">找回密码</button>
			</div>
		</form>
    </div>
</template>     
<script>

export default {
	name: 'login',
	data () {
		return {
			byPasswordIs:0,
			bySmsvcodeIs:1,
			phone:null,
			password:null,
			smsvcode:null,
		}
    },
	activated(){
       debugger
        let thisVue = this;
		if(thisVue.query != JSON.stringify(thisVue.$route.query)){
			thisVue.reload();

			thisVue.query = JSON.stringify(thisVue.$route.query);
		}
	},
	methods:{
		reload(){
			let thisVue = this;
			Object.assign(thisVue.$data, thisVue.$options.data());
         },
		 login(){
			debugger
			let thisVue = this;

			 if(thisVue.byPasswordIs){
				thisVue.$axios.post('/login-by-phone-password',thisVue.$qs.stringify({phone:thisVue.phone,password:thisVue.password})).then(res => {
					debugger
					if(res.data.codeMsg)
						alert(res.data.codeMsg)
					if(res.data.code == 0){
						thisVue.$axios.post('/login-refresh').then(res => {
							debugger
							if (res.data.code == 0) {
								thisVue.$store.state.login=res.data.data;
								thisVue.$router.push({path:'/index',query:{time:new Date().getTime()+""}})
							}
						})
					}
  				})
			 }
			 if(thisVue.bySmsvcodeIs){
				thisVue.$axios.post('/login-by-smsvcode',thisVue.$qs.stringify({phone:thisVue.phone,smsvcode:thisVue.smsvcode})).then(res => {
					debugger
					if(res.data.codeMsg)
						alert(res.data.codeMsg)
					if(res.data.code == 0){
						thisVue.$axios.post('/login-refresh').then(res => {
							debugger
							if (res.data.code == 0) {
								thisVue.$store.state.login=res.data.data;
								thisVue.$router.push({path:'/index',query:{time:new Date().getTime()+""}})
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