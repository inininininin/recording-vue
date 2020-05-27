<template>
	<div id="index" class="scrollbar" style="height:100%;overflow:auto;">
		<div
			style="font-size: 16px;text-align: center;height:40px;line-height: 40px;position: relative;border-bottom:1px solid #8F8F8f">
			<span @click="$router.back()" style="position: absolute;left:0;width:40px;cursor: pointer;">&lt;</span>
			<span>任务详情</span>
		</div>
		<div style="padding:0 10px;margin-top:20px;">
			<div style="font-size: 16px;">名称</div>
			<div><input type="text" style="width:100%;margin:0;padding:3px;border:1px solid #8f8f8f;" /></div>

			<div style="font-size: 16px;">图片</div>
			<div><input type="text" style="width:100%;margin:0;padding:3px;border:1px solid #8f8f8f;" /></div>

			<div style="font-size: 16px;">内容</div>
			<div><input type="text" style="width:100%;margin:0;padding:3px;border:1px solid #8f8f8f;" /></div>

			<div style="text-align: center;margin-top:30px;">
				<button @click="newTask()" style="width:250px;height:35px;">发布</button>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'index',
		data() {
			return {
				query: '',
			}
		},
		activated() {
			let thisVue = this

			if (thisVue.query != JSON.stringify(thisVue.$route.query)) {
				Object.assign(thisVue.$data, thisVue.$options.data());
				thisVue.query = JSON.stringify(thisVue.$route.query);
				thisVue.reload();

			}
		},
		methods: {
			reload() {

			},
			newTask() {
				let thisVue = this
				thisVue.$router.back()
			},
		}
	}
</script>
<style scoped>
	.scrollbar::-webkit-scrollbar {
		display: none;
	}
</style>