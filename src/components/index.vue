<template>
	<div id="index" style="height:100%;position:relative;">
			<div  style="position: relative;">
				<span  @click="sortMap.name++;sortMap.name=sortMap.name==3?0:sortMap.name;sortMap1.name=sortMap.name;pn=1;taskList=[];loadTaskList();" :style="{color:sortMap.name?'red':'#000000'}" style="line-height: 30px;padding:0 5px;font-size: 14px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;border-bottom:1px solid #8f8f8f;">
					名称^^
				</span>
				<span @click="sortMap.createTime++;sortMap.createTime=sortMap.createTime==3?0:sortMap.createTime;sortMap1.createTime=sortMap.createTime;pn=1;taskList=[];loadTaskList();" :style="{color:sortMap.createTime?'red':'#000000'}" style="line-height: 30px;padding:0 5px;font-size: 14px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;border-bottom:1px solid #8f8f8f;">
					时间^^
				</span>
				<span @click="sortMap.updateTime++;sortMap.updateTime=sortMap.updateTime==3?0:sortMap.updateTime;sortMap1.updateTime=sortMap.updateTime;pn=1;taskList=[];loadTaskList();" :style="{color:sortMap.updateTime?'red':'#000000'}"  style="line-height: 30px;padding:0 5px;font-size: 14px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;border-bottom:1px solid #8f8f8f;">
					更新^^
				</span>
				<span  @click="sortMap.orderNo++;sortMap.orderNo=sortMap.orderNo==3?0:sortMap.orderNo;sortMap1.orderNo=sortMap.orderNo;pn=1;taskList=[];loadTaskList();" :style="{color:sortMap.orderNo?'red':'#000000'}"  style="line-height: 30px;padding:0 5px;font-size: 14px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;border-bottom:1px solid #8f8f8f;">
					序号^^
				</span>
				<span @click="sortMap.completeIs++;sortMap.completeIs=sortMap.completeIs==3?0:sortMap.completeIs;sortMap1.completeIs=sortMap.completeIs;pn=1;taskList=[];loadTaskList();"  :style="{color:sortMap.completeIs?'red':'#000000'}" style="line-height: 30px;padding:0 5px;font-size: 14px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;border-bottom:1px solid #8f8f8f;">
					完成^^
				</span>
				<span style="line-height: 30px;padding:0 5px;font-size: 14px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;border-bottom:1px solid #8f8f8f;">
					<select v-model="type" :style="{color:type?'red':'#000000'}" @change="pn=1;taskList=[];loadTaskList()" style="height:30px;border:none;cursor: pointer;">
						<option value="">类型</option>
						<option value="1">开发</option>
						<option value="2">缺陷</option>
					</select>
				</span>
				<span style="position: absolute;right:0px">
					<span style="line-height: 30px;font-size: 14px;display:inline-block;border-left:1px solid #8f8f8f;border-right:1px solid #8f8f8f;border-bottom:1px solid #8f8f8f;position: relative;">
						<span v-show="!kw" style="font-size: 14px;color: #8f8f8f;position: absolute;left:6px;top:0px;" >Q</span>
						<input v-model="kw" type="text" style="line-height: 30px;width:50px;padding:0 15px 0 5px;border:none;"/>
						<span v-if="kw" style="font-size: 14px;cursor: pointer;color: #8f8f8f;position: absolute;right:6px;top:0px;" @click="kw=null">x</span>
					</span>
					<span @click="pn=1;taskList=[];loadTaskList()" style="line-height: 30px;padding:0 5px;font-size: 14px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;border-bottom:1px solid #8f8f8f;">
						搜索
					</span>
					<span @click="sortMap.name=0,sortMap.completeIs=0,sortMap.orderNo=0,sortMap.createTime=0,sortMap.updateTime=0,sortMap1={},kw=null;type='',pn=1;taskList=[];loadTaskList()" style="line-height: 30px;padding:0 5px;font-size: 14px;cursor: pointer;display:inline-block;border-bottom:1px solid #8f8f8f;">
						重置
					</span>
				</span>
			</div>
			
			<div style="height:30px;line-height:30px;border-bottom:1px solid #8f8f8f;position: relative;">
				<span style="padding:0 5px;font-size: 14px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;background-color: #d8d5d5;">发</span>
				<span style="padding:0 5px;font-size: 14px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;">我</span>
				<span style="padding:0 5px;font-size: 14px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;">赵总</span>
				<span style="padding:0 5px;font-size: 14px;cursor: pointer;display:inline-block;border-left:1px solid #8f8f8f;position: absolute;right:0px;top:0px;">···</span>

			</div>
			<div style="width:100%;height:30px;line-height:30px;border-bottom:1px solid #8f8f8f;position: relative;overflow: hidden;;text-overflow:ellipsis;">
				<span style="padding:0 5px;font-size: 14px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;background-color: #d8d5d5;">接</span>
				<span style="padding:0 5px;font-size: 14px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;">我</span>
				<span style="padding:0 5px;font-size: 14px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;">小吴</span>
				<span style="padding:0 5px;font-size: 14px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;">小刘</span>
				<span style="padding:0 5px;font-size: 14px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;">小刘</span>
				<span style="padding:0 5px;font-size: 14px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;">小刘</span>
				<span style="padding:0 5px;font-size: 14px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;">小刘</span>
				<span style="padding:0 5px;font-size: 14px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;">小刘</span>
				<span style="padding:0 5px;font-size: 14px;cursor: pointer;display:inline-block;border-left:1px solid #8f8f8f;position: absolute;right:0px;top:0px;">···</span>
			</div>

		<div class="scrollbar" @scroll="scrollTop=$event.target.scrollTop;if(($event.target.scrollTop+$($event.target).height())>=$event.target.scrollHeight) {pn++;loadTaskList()}" :scroll-top.prop="scrollTop1" style="overflow: auto;position: absolute;top:94px;bottom:88px;width:100%;background-color: rgb(252, 250, 250);">
		<div style="margin:5px 7px 0px 7px;">
			<span style="font-size: 14px;color: #8f8f8f;">已找到 {{itemCount}} 条记录</span>
		</div>
		
		<div v-for="(item, i) in taskList" @click="$router.push({path:'/task',query:{time:new Date().getTime(),taskId:item.taskId}})" style="padding:5px;border:1px solid #8F8F8F;margin:8px 7px 5px 7px;cursor:pointer;background-color: #FFFFFF;">
			<div style="font-size:16px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;">{{item.name}}</div>
			<div style="position:relative;margin-top:3px;">
				<span style="font-size:12px;color:#8F8F8F;">{{$moment(item.createTime).format('MM-DD hh:mm, d, YYYY')}}</span>
				<span style="font-size:12px;color:#8F8F8F;margin-left:50px;">{{item.completeIs==1?'完成':''}}</span>
				<span style="font-size:12px;color:#8F8F8F;position:absolute;right:0px;">{{item.orderNo==9999?'':item.orderNo}}</span>
			</div>
		</div>
		
		<div v-show="loading"  style="font-size:14px;text-align: center;color:#8F8F8F;margin-bottom:5px;">加载中</div>

		<div v-show="!loading && taskList.length<itemCount" @click="pn++;loadTaskList();" style="font-size:14px;text-align: center;color:#8F8F8F;margin-bottom:5px;">点击加载更多</div>
		<div v-show="!loading && !(taskList.length<itemCount)" style="font-size:14px;text-align: center;color:#8F8F8F;margin-bottom:5px;">已全部加载</div>

	</div>
		










		<div style="position:absolute;bottom:0;left:0;right:0;background-color: #FFFFFF;">
			<div style="border-top:1px solid #8F8F8F;"></div>

			<div style="height:35px;line-height: 35px;">
				<span @click="$router.push({path:'/create-task',query:{time:new Date().getTime()}})" style="font-size:14px;width:50%;display:inline-block;text-align: center;cursor:pointer;">发任务
					+</span>
				<span style="border-left:1px solid #8F8F8F;position: absolute;display:inline-block;"><span
						style="visibility: hidden;">1</span></span>
				<span style="font-size:14px;width:50%;display:inline-block;text-align: center;cursor:pointer;">去记录
					+</span>
			</div>
			<div style="border-top:1px solid #8F8F8F;"></div>
			<div style="height:50px;line-height: 50px;position: relative;">
				<span  @click="$router.push({path:'/index',query:{time:new Date().getTime()}})" style="font-size:14px;width:20%;display:inline-block;text-align: center;cursor:pointer;background-color: #8F8F8F;">任务</span>
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
				<span @click="$router.push({path:'/me',query:{time:new Date().getTime()}})" style="font-size:14px;width:20%;display:inline-block;text-align: center;cursor:pointer;">我</span>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'index',
		data() {
			return {
				kw:null,
				type:'',
				query: '',
				taskList:[],
				pn:1,
				ps:15,
				itemCount:null,
				loading:null,
				scrollTop:null,
				scrollTop1:null,
				sortCreateTime:1,
				sortMap:{
					name:0,
					createTime:1,
					orderNo:1,
					completeIs:1,
					updateTime:0,
				},
				sortMap1:{
					completeIs:1,
					orderNo:1,
					createTime:1,
				}
			}
		},
		activated() {
			debugger
			let thisVue = this
			window.thisVue=thisVue;
			if (thisVue.query != JSON.stringify(thisVue.$route.query)) {
				thisVue.reload();

				thisVue.query = JSON.stringify(thisVue.$route.query);
			}else{
				thisVue.scrollTop1=thisVue.scrollTop;
			}
		},
		methods: {
			reload() {
				debugger
				let thisVue = this
				Object.assign(thisVue.$data, thisVue.$options.data());

				thisVue.$axios.post('/login-refresh').then(res => {
					debugger
					if(res.data.codeMsg)
						alert(res.data.codeMsg)
					if (res.data.code == 0) {
						thisVue.$store.state.login=res.data.data;
					}else{
						thisVue.$axios.post('/logout').then(res => {
							thisVue.$store.state.login=null;
							thisVue.$router.push({path:'/login',query:{time:new Date().getTime()}})
						})
					}
				})

				thisVue.loadTaskList()
			},
			loadTaskList(){
				debugger
				let thisVue = this
				thisVue.loading=1
				let sorts=[]
				let orders=[]
				for(var c in thisVue.sortMap1) {
					if(thisVue.sortMap1[c]){
						sorts.push(c)
						orders.push(thisVue.sortMap1[c]==1?'asc':thisVue.sortMap1[c]==2?'desc':'c')
					}
				}

				thisVue.$axios.get('/my-task/task-list?'+thisVue.$qs.stringify({kw:thisVue.kw,type:thisVue.type,sorts:sorts.join(),order:orders.join(),pn:thisVue.pn,ps:thisVue.ps})).then(res => {
					debugger
					if (res.data.code == 0) {
						if(res.data.data.itemList.length>0)
							thisVue.taskList=thisVue.taskList.concat(res.data.data.itemList)
						else
						thisVue.pn--;
					}
					thisVue.loading=0
				})
				thisVue.$axios.get('/my-task/task-list-sum?'+thisVue.$qs.stringify({kw:thisVue.kw,type:thisVue.type,pn:thisVue.pn,ps:thisVue.ps})).then(res => {
					debugger
					if (res.data.code == 0) {
						thisVue.itemCount=res.data.data.itemCount
					}
				})
			},
		}
	}
</script>
<style scoped>

.scrollbar::-webkit-scrollbar {
  display: none;
}
</style>