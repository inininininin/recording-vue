<template>
	<div id="index" style="height:100%;position:relative;">

		<div style="height:50px;">
			<div>
				<span style="font-size: 14px;">名称</span>
				<span style="font-size: 14px;">时间</span>
				<span style="font-size: 14px;">更新</span>
				<span style="font-size: 14px;">序号</span>
				<span style="font-size: 14px;">完成</span>
				<span style="font-size: 14px;">类型</span>
				<span style="font-size: 14px;">重置</span>
				<span style="font-size: 14px;"><input type="text"/></span>
				<span style="font-size: 14px;">搜索</span>
			</div>
		
		</div>
		<div class="scrollbar" style="overflow: auto;position: absolute;top:50px;bottom:88px;width:100%">

		<div @click="$router.push({path:'/task',query:{time:new Date().getTime()}})" style="padding:5px;border:1px solid #8F8F8F;margin:5px;cursor:pointer;">
			<div style="font-size:16px;overflow:hidden;text-overflow:ellipsis;">123123123123123123123123123123123123123123123123123123123123123123123123</div>
			<div style="position:relative;margin-top:3px;">
				<span style="font-size:12px;color:#8F8F8F;">1, 05-22, 2020</span>
				<span style="font-size:12px;color:#8F8F8F;margin-left:50px;">完成</span>
				<span style="font-size:12px;color:#8F8F8F;position:absolute;right:0px;">9999</span>
			</div>
		</div>
		<div style="padding:5px;border:1px solid #8F8F8F;margin:5px;cursor:pointer;">
			<div style="font-size:16px;overflow:hidden;text-overflow:ellipsis;">123123123123123123123123123123123123123123123123123123123123123123123123</div>
			<div style="position:relative;margin-top:3px;">
				<span style="font-size:12px;color:#8F8F8F;">1, 05-22, 2020</span>
				<span style="font-size:12px;color:#8F8F8F;margin-left:50px;">完成</span>
				<span style="font-size:12px;color:#8F8F8F;position:absolute;right:0px;">9999</span>
			</div>
		</div>
		<div style="padding:5px;border:1px solid #8F8F8F;margin:5px;cursor:pointer;">
			<div style="font-size:16px;overflow:hidden;text-overflow:ellipsis;">123123123123123123123123123123123123123123123123123123123123123123123123</div>
			<div style="position:relative;margin-top:3px;">
				<span style="font-size:12px;color:#8F8F8F;">1, 05-22, 2020</span>
				<span style="font-size:12px;color:#8F8F8F;margin-left:50px;">完成</span>
				<span style="font-size:12px;color:#8F8F8F;position:absolute;right:0px;">9999</span>
			</div>
		</div>
		<div style="padding:5px;border:1px solid #8F8F8F;margin:5px;cursor:pointer;">
			<div style="font-size:16px;overflow:hidden;text-overflow:ellipsis;">123123123123123123123123123123123123123123123123123123123123123123123123</div>
			<div style="position:relative;margin-top:3px;">
				<span style="font-size:12px;color:#8F8F8F;">1, 05-22, 2020</span>
				<span style="font-size:12px;color:#8F8F8F;margin-left:50px;">完成</span>
				<span style="font-size:12px;color:#8F8F8F;position:absolute;right:0px;">9999</span>
			</div>
		</div>
		<div style="padding:5px;border:1px solid #8F8F8F;margin:5px;cursor:pointer;">
			<div style="font-size:16px;overflow:hidden;text-overflow:ellipsis;">123123123123123123123123123123123123123123123123123123123123123123123123</div>
			<div style="position:relative;margin-top:3px;">
				<span style="font-size:12px;color:#8F8F8F;">1, 05-22, 2020</span>
				<span style="font-size:12px;color:#8F8F8F;margin-left:50px;">完成</span>
				<span style="font-size:12px;color:#8F8F8F;position:absolute;right:0px;">9999</span>
			</div>
		</div>
		<div style="padding:5px;border:1px solid #8F8F8F;margin:5px;cursor:pointer;">
			<div style="font-size:16px;overflow:hidden;text-overflow:ellipsis;">123123123123123123123123123123123123123123123123123123123123123123123123</div>
			<div style="position:relative;margin-top:3px;">
				<span style="font-size:12px;color:#8F8F8F;">1, 05-22, 2020</span>
				<span style="font-size:12px;color:#8F8F8F;margin-left:50px;">完成</span>
				<span style="font-size:12px;color:#8F8F8F;position:absolute;right:0px;">9999</span>
			</div>
		</div>
		<div style="padding:5px;border:1px solid #8F8F8F;margin:5px;cursor:pointer;">
			<div style="font-size:16px;overflow:hidden;text-overflow:ellipsis;">123123123123123123123123123123123123123123123123123123123123123123123123</div>
			<div style="position:relative;margin-top:3px;">
				<span style="font-size:12px;color:#8F8F8F;">1, 05-22, 2020</span>
				<span style="font-size:12px;color:#8F8F8F;margin-left:50px;">完成</span>
				<span style="font-size:12px;color:#8F8F8F;position:absolute;right:0px;">9999</span>
			</div>
		</div>
		<div style="padding:5px;border:1px solid #8F8F8F;margin:5px;cursor:pointer;">
			<div style="font-size:16px;overflow:hidden;text-overflow:ellipsis;">123123123123123123123123123123123123123123123123123123123123123123123123</div>
			<div style="position:relative;margin-top:3px;">
				<span style="font-size:12px;color:#8F8F8F;">1, 05-22, 2020</span>
				<span style="font-size:12px;color:#8F8F8F;margin-left:50px;">完成</span>
				<span style="font-size:12px;color:#8F8F8F;position:absolute;right:0px;">9999</span>
			</div>
		</div>
		<div style="padding:5px;border:1px solid #8F8F8F;margin:5px;cursor:pointer;">
			<div style="font-size:16px;overflow:hidden;text-overflow:ellipsis;">123123123123123123123123123123123123123123123123123123123123123123123123</div>
			<div style="position:relative;margin-top:3px;">
				<span style="font-size:12px;color:#8F8F8F;">1, 05-22, 2020</span>
				<span style="font-size:12px;color:#8F8F8F;margin-left:50px;">完成</span>
				<span style="font-size:12px;color:#8F8F8F;position:absolute;right:0px;">9999</span>
			</div>
		</div>
		<div style="padding:5px;border:1px solid #8F8F8F;margin:5px;cursor:pointer;">
			<div style="font-size:16px;overflow:hidden;text-overflow:ellipsis;">123123123123123123123123123123123123123123123123123123123123123123123123</div>
			<div style="position:relative;margin-top:3px;">
				<span style="font-size:12px;color:#8F8F8F;">1, 05-22, 2020</span>
				<span style="font-size:12px;color:#8F8F8F;margin-left:50px;">完成</span>
				<span style="font-size:12px;color:#8F8F8F;position:absolute;right:0px;">9999</span>
			</div>
		</div>
		<div style="padding:5px;border:1px solid #8F8F8F;margin:5px;cursor:pointer;">
			<div style="font-size:16px;overflow:hidden;text-overflow:ellipsis;">123123123123123123123123123123123123123123123123123123123123123123123123</div>
			<div style="position:relative;margin-top:3px;">
				<span style="font-size:12px;color:#8F8F8F;">1, 05-22, 2020</span>
				<span style="font-size:12px;color:#8F8F8F;margin-left:50px;">完成</span>
				<span style="font-size:12px;color:#8F8F8F;position:absolute;right:0px;">9999</span>
			</div>
		</div>
		<div style="padding:5px;border:1px solid #8F8F8F;margin:5px;cursor:pointer;">
			<div style="font-size:16px;overflow:hidden;text-overflow:ellipsis;">123123123123123123123123123123123123123123123123123123123123123123123123</div>
			<div style="position:relative;margin-top:3px;">
				<span style="font-size:12px;color:#8F8F8F;">1, 05-22, 2020</span>
				<span style="font-size:12px;color:#8F8F8F;margin-left:50px;">完成</span>
				<span style="font-size:12px;color:#8F8F8F;position:absolute;right:0px;">9999</span>
			</div>
		</div>
		<div style="padding:5px;border:1px solid #8F8F8F;margin:5px;cursor:pointer;">
			<div style="font-size:16px;overflow:hidden;text-overflow:ellipsis;">123123123123123123123123123123123123123123123123123123123123123123123123</div>
			<div style="position:relative;margin-top:3px;">
				<span style="font-size:12px;color:#8F8F8F;">1, 05-22, 2020</span>
				<span style="font-size:12px;color:#8F8F8F;margin-left:50px;">完成</span>
				<span style="font-size:12px;color:#8F8F8F;position:absolute;right:0px;">9999</span>
			</div>
		</div>
		<div style="padding:5px;border:1px solid #8F8F8F;margin:5px;cursor:pointer;">
			<div style="font-size:16px;overflow:hidden;text-overflow:ellipsis;">123123123123123123123123123123123123123123123123123123123123123123123123</div>
			<div style="position:relative;margin-top:3px;">
				<span style="font-size:12px;color:#8F8F8F;">1, 05-22, 2020</span>
				<span style="font-size:12px;color:#8F8F8F;margin-left:50px;">完成</span>
				<span style="font-size:12px;color:#8F8F8F;position:absolute;right:0px;">9999</span>
			</div>
		</div>
		<div style="padding:5px;border:1px solid #8F8F8F;margin:5px;cursor:pointer;">
			<div style="font-size:16px;overflow:hidden;text-overflow:ellipsis;">123123123123123123123123123123123123123123123123123123123123123123123123</div>
			<div style="position:relative;margin-top:3px;">
				<span style="font-size:12px;color:#8F8F8F;">1, 05-22, 2020</span>
				<span style="font-size:12px;color:#8F8F8F;margin-left:50px;">完成</span>
				<span style="font-size:12px;color:#8F8F8F;position:absolute;right:0px;">9999</span>
			</div>
		</div>
		<div style="padding:5px;border:1px solid #8F8F8F;margin:5px;cursor:pointer;">
			<div style="font-size:16px;overflow:hidden;text-overflow:ellipsis;">123123123123123123123123123123123123123123123123123123123123123123123123</div>
			<div style="position:relative;margin-top:3px;">
				<span style="font-size:12px;color:#8F8F8F;">1, 05-22, 2020</span>
				<span style="font-size:12px;color:#8F8F8F;margin-left:50px;">完成</span>
				<span style="font-size:12px;color:#8F8F8F;position:absolute;right:0px;">9999</span>
			</div>
		</div>
		<div style="padding:5px;border:1px solid #8F8F8F;margin:5px;cursor:pointer;">
			<div style="font-size:16px;overflow:hidden;text-overflow:ellipsis;">123123123123123123123123123123123123123123123123123123123123123123123123</div>
			<div style="position:relative;margin-top:3px;">
				<span style="font-size:12px;color:#8F8F8F;">1, 05-22, 2020</span>
				<span style="font-size:12px;color:#8F8F8F;margin-left:50px;">完成</span>
				<span style="font-size:12px;color:#8F8F8F;position:absolute;right:0px;">9999</span>
			</div>
		</div>
		<div style="padding:5px;border:1px solid #8F8F8F;margin:5px;cursor:pointer;">
			<div style="font-size:16px;overflow:hidden;text-overflow:ellipsis;">123123123123123123123123123123123123123123123123123123123123123123123123</div>
			<div style="position:relative;margin-top:3px;">
				<span style="font-size:12px;color:#8F8F8F;">1, 05-22, 2020</span>
				<span style="font-size:12px;color:#8F8F8F;margin-left:50px;">完成</span>
				<span style="font-size:12px;color:#8F8F8F;position:absolute;right:0px;">9999</span>
			</div>
		</div>
		
		<div style="padding:5px;border:1px solid #8F8F8F;margin:5px;cursor:pointer;background-color: rgb(228, 224, 224);">
			<div style="font-size:16px;overflow:hidden;text-overflow:ellipsis;">123123123123123123123123123123123123123123123123123123123123123123123123</div>
			<div style="position:relative;margin-top:3px;">
				<span style="font-size:12px;color:#8F8F8F;">1, 05-22, 2020</span>
				<span style="font-size:12px;color:#8F8F8F;margin-left:50px;">完成</span>
				  <span style="font-size:12px;color:#8F8F8F;position:absolute;right:0px;">9999</span>
			</div>
		</div>
		<div style="font-size:14px;text-align: center;color:#8F8F8F;margin-bottom:5px;">上划加载更多</div>

	</div>
		










		<div style="position:absolute;bottom:0;left:0;right:0;background-color: #FFFFFF;">
			<div style="border-top:1px solid #8F8F8F;"></div>

			<div style="height:35px;line-height: 35px;">
				<span @click="$router.push({path:'/new-task',query:{time:new Date().getTime()}})" style="font-size:14px;width:50%;display:inline-block;text-align: center;cursor:pointer;">发任务
					+</span>
				<span style="border-left:1px solid #8F8F8F;position: absolute;display:inline-block;"><span
						style="visibility: hidden;">1</span></span>
				<span style="font-size:14px;width:50%;display:inline-block;text-align: center;cursor:pointer;">去记录
					+</span>
			</div>
			<div style="border-top:1px solid #8F8F8F;"></div>
			<div style="height:50px;line-height: 50px;position: relative;">
				<span style="font-size:14px;width:20%;display:inline-block;text-align: center;cursor:pointer;background-color: #8F8F8F;">任务</span>
				<span style="border-left:1px solid #8F8F8F;position: absolute;display:inline-block;"><span
						style="visibility: hidden;">1</span></span>
				<span style="font-size:14px;width:20%;display:inline-block;text-align: center;cursor:pointer;">记录</span>
				<span style="border-left:1px solid #8F8F8F;position: absolute;display:inline-block;"><span
						style="visibility: hidden;">1</span></span>
				<span style="font-size:14px;width:20%;display:inline-block;text-align: center;cursor:pointer;">好友</span>
				<span style="border-left:1px solid #8F8F8F;position: absolute;display:inline-block;"><span
						style="visibility: hidden;">1</span></span>
				<span style="font-size:14px;width:20%;display:inline-block;text-align: center;cursor:pointer;">消息</span>
				<span style="border-left:1px solid #8F8F8F;position: absolute;display:inline-block;"><span
						style="visibility: hidden;">1</span></span>
				<span style="font-size:14px;width:20%;display:inline-block;text-align: center;cursor:pointer;">我</span>
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
		}
	}
</script>
<style scoped>

.scrollbar::-webkit-scrollbar {
  display: none;
}
</style>