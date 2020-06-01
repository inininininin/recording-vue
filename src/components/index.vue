<template>
	<div id="index" style="height:100%;position:relative;">
			<div  style="position: relative;border-bottom:1px solid #8f8f8f;">
				<span  @click="sortMap.name++;sortMap.name=sortMap.name==3?0:sortMap.name;sortMap1.name=sortMap.name;pn=1;taskList=[];loadTaskList();" :style="{color:sortMap.name?'red':'#000000'}" style="line-height: 30px;padding:0 5px;font-size: 14px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;">
					名称<span v-if="sortMap.name==1">&nbsp;&and;</span><span v-if="sortMap.name==2">&nbsp;&or;</span><span v-if="sortMap.name==0" style="visibility: hidden;">&nbsp;&or;</span>
				</span>
				<span @click="sortMap.createTime++;sortMap.createTime=sortMap.createTime==3?0:sortMap.createTime;sortMap1.createTime=sortMap.createTime;pn=1;taskList=[];loadTaskList();" :style="{color:sortMap.createTime?'red':'#000000'}" style="line-height: 30px;padding:0 5px;font-size: 14px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;">
					时间<span v-if="sortMap.createTime==1">&nbsp;&and;</span><span v-if="sortMap.createTime==2">&nbsp;&or;</span><span v-if="sortMap.createTime==0" style="visibility: hidden;">&nbsp;&or;</span>
				</span>
				<span @click="sortMap.updateTime++;sortMap.updateTime=sortMap.updateTime==3?0:sortMap.updateTime;sortMap1.updateTime=sortMap.updateTime;pn=1;taskList=[];loadTaskList();" :style="{color:sortMap.updateTime?'red':'#000000'}"  style="line-height: 30px;padding:0 5px;font-size: 14px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;;">
					更新<span v-if="sortMap.updateTime==1">&nbsp;&and;</span><span v-if="sortMap.updateTime==2">&nbsp;&or;</span><span v-if="sortMap.updateTime==0" style="visibility: hidden;">&nbsp;&or;</span>
				</span>
				<span @click="sortMap.finalTime++;sortMap.finalTime=sortMap.finalTime==3?0:sortMap.finalTime;sortMap1.finalTime=sortMap.finalTime;pn=1;taskList=[];loadTaskList();" :style="{color:sortMap.finalTime?'red':'#000000'}"  style="line-height: 30px;padding:0 5px;font-size: 14px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;;">
					限期<span v-if="sortMap.finalTime==1">&nbsp;&and;</span><span v-if="sortMap.finalTime==2">&nbsp;&or;</span><span v-if="sortMap.finalTime==0" style="visibility: hidden;">&nbsp;&or;</span>
				</span>
				<span  @click="sortMap.orderNo++;sortMap.orderNo=sortMap.orderNo==3?0:sortMap.orderNo;sortMap1.orderNo=sortMap.orderNo;pn=1;taskList=[];loadTaskList();" :style="{color:sortMap.orderNo?'red':'#000000'}"  style="line-height: 30px;padding:0 5px;font-size: 14px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;">
					序号<span v-if="sortMap.orderNo==1">&nbsp;&and;</span><span v-if="sortMap.orderNo==2">&nbsp;&or;</span><span v-if="sortMap.orderNo==0" style="visibility: hidden;">&nbsp;&or;</span>
				</span>
			
				<span style="line-height: 30px;font-size: 14px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;">
					<select v-model="status" :style="{color:status?'red':'#000000'}" @change="pn=1;taskList=[];loadTaskList()" style="height:30px;border:none;cursor: pointer;padding: 0px 5px;">
						<option value="">状态</option>
						<option value="1">进行中</option>
						<option value="2">已完成</option>
						<option value="3">已撤销</option>
					</select>
				</span>

				
				<!-- <span style="line-height: 30px;padding:0 5px;font-size: 14px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;">
					<select v-model="completeIs" :style="{color:completeIs?'red':'#000000'}" @change="pn=1;taskList=[];loadTaskList()" style="height:30px;border:none;cursor: pointer;">
						<option value="">全部</option>
						<option value="0">未完成</option>
						<option value="1">已完成</option>
					</select>
				</span>

				<span style="line-height: 30px;padding:0 5px;font-size: 14px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;">
					<select v-model="cancelIs" :style="{color:cancelIs?'red':'#000000'}" @change="pn=1;taskList=[];loadTaskList()" style="height:30px;border:none;cursor: pointer;">
						<option value="">全部</option>
						<option value="0">未撤销</option>
						<option value="1">已撤销</option>
					</select>
				</span> -->

				<span style="line-height: 30px;font-size: 14px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;">
					<select v-model="type" :style="{color:type?'red':'#000000'}" @change="pn=1;taskList=[];loadTaskList()" style="height:30px;border:none;cursor: pointer;padding:0 5px;">
						<option value="">类型</option>
						<option value="1">推进</option>
						<option value="2">缺陷</option>
					</select>
				</span>
				
					<span style="line-height: 30px;font-size: 14px;display:inline-block;border-right:1px solid #8f8f8f;position: relative;">
						<span v-show="!kw" style="font-size: 14px;color: #8f8f8f;position: absolute;left:6px;top:0px;" >Q</span>
						<input v-model="kw" @keyup.enter="pn=1;taskList=[];loadTaskList();" type="text" style="line-height: 30px;width:50px;padding:0 15px 0 5px;border:none;"/>
						<span v-if="kw" style="font-size: 14px;cursor: pointer;color: #8f8f8f;position: absolute;right:6px;top:0px;" @click="kw=null;pn=1;taskList=[];loadTaskList();">x</span>
					</span>
					<span @click="pn=1;taskList=[];loadTaskList()" style="line-height: 30px;padding:0 5px;font-size: 14px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;">
						搜索
					</span>
					<span @click="status='',cancelIs='',completeIs='',sortMap.name=0,sortMap.finalTime=0,sortMap.orderNo=0,sortMap.createTime=0,sortMap.updateTime=0,sortMap1={},kw=null;type='',pn=1;taskList=[];loadTaskList()" style="line-height: 30px;padding:0 5px;font-size: 14px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;">
						重置
					</span>
					<span @click="" style="line-height: 30px;padding:0 5px;font-size: 14px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;">
						···
					</span>
			</div>
			
			<div style="
			height:30px;
			line-height:30px;
			border-bottom:1px solid #8f8f8f;
			position: relative;">

				<span 
				@click="
				debugger;
				faBuRenUserId=null;
				taskList=[],pn=1;
				loadTaskList();
				" 
				style="
				padding:0 5px;
				font-size: 14px;
				cursor: pointer;
				display:inline-block;
				border-right:1px solid #8f8f8f;
				background-color: #d8d5d5;
				"
				>发布人</span>
				
				<span @click="
				debugger;
				faBuRenUserId=faBuRenUserId?null:$attr($store.state.login,'userId');
				taskList=[],pn=1;
				loadTaskList();
				" 
				style="
				padding:0 5px;
				font-size: 14px;
				cursor: pointer;
				display:inline-block;
				border-right:1px solid #8f8f8f;
				"
				:style="{'background-color':(faBuRenUserId==($store.state.login?$attr($store.state.login,'userId'):-1)?'#8f8f8f':'#ffffff')}" 
				>我</span>
				
				<span v-for="(item,i) in faBuRenList" 
				@click="
				debugger;
				faBuRenUserId=faBuRenUserId?null:item.faBuRenUserId;
				taskList=[],pn=1;
				loadTaskList();" :style="{'background-color':(faBuRenUserId==item.faBuRenUserId?'#8f8f8f':'#ffffff')}" style="padding:0 5px;font-size: 14px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;">{{item.nickname}}</span>
				
				<span style="padding:0 5px;font-size: 14px;cursor: pointer;display:inline-block;border-left:1px solid #8f8f8f;position: absolute;right:0px;top:0px;">···</span>

			</div>
			<div style="width:100%;height:30px;line-height:30px;border-bottom:1px solid #8f8f8f;position: relative;overflow: hidden;;text-overflow:ellipsis;">
				<span  
				@click="
				fuZeRenUserId=null;
				taskList=[],pn=1;
				loadTaskList();
				"  
				style="padding:0 5px;font-size: 14px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;background-color: #d8d5d5;">负责人</span>
				
				<span 
				@click="
				fuZeRenUserId=fuZeRenUserId?null:$attr($store.state.login,'userId');
				taskList=[],pn=1;
				loadTaskList();
				" 
				:style="{'background-color':(fuZeRenUserId==($store.state.login?$attr($store.state.login,'userId'):-1)?'#8f8f8f':'#ffffff')}" style="padding:0 5px;font-size: 14px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;">我</span>
				<span v-for="(item,i) in fuZeRenList" 
				@click="
				fuZeRenUserId=fuZeRenUserId?null:item.fuZeRenUserId;
				taskList=[],pn=1;
				loadTaskList();
				" 
				:style="{'background-color':(fuZeRenUserId==item.fuZeRenUserId?'#8f8f8f':'#ffffff')}" style="padding:0 5px;font-size: 14px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;">{{item.nickname}}</span>
				
				<span style="padding:0 5px;font-size: 14px;cursor: pointer;display:inline-block;border-left:1px solid #8f8f8f;position: absolute;right:0px;top:0px;">···</span>
			</div>

		<div class="scrollbar" @scroll="taskListScroll($event)" ref="taskList" style="overflow: auto;position: absolute;top:94px;bottom:88px;width:100%;background-color: rgb(252, 250, 250);">
		<div style="margin:5px 7px 0px 7px;">
			<span style="font-size: 14px;color: #8f8f8f;">已找到 {{itemCount}} 条记录</span>
		</div>
		
		<div v-for="(item, i) in taskList" @click="$router.push({path:'/task',query:{time:new Date().getTime()+'',taskId:item.taskId}})" style="padding:5px;border:1px solid #8F8F8F;margin:8px 7px 5px 7px;cursor:pointer;" 
		:style="{'background-color':(item.completeIs?'#219e154d':item.cancelIs?'#ffff006e':'#FFFFFF')}">
			<div style="font-size:16px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;">{{item.name}}</div>
			<div style="position:relative;margin-top:3px;">
				<span style="font-size:12px;color:#8F8F8F;">{{$moment(item.createTime).format('MM-DD HH:mm, d, YYYY')}}</span>
				<span style="font-size:12px;color:#8F8F8F;margin-left:50px;">{{item.faBuRenUserId==$attr($store.state.login,"userId")?'我':item.faBuRenUserNickname}} > {{item.fuZeRenUserId==$attr($store.state.login,"userId")?'我':item.fuZeRenUserNickname }}</span>
				<span style="font-size:12px;color:#8F8F8F;position:absolute;right:0px;">{{item.orderNo==9999?'':item.orderNo}}</span>
				<span style="font-size:12px;color:#8F8F8F;margin-left:50px;">{{item.finalTime?('限: '+$moment(item.finalTime).format('MM-DD HH:mm, d, YYYY')):null}}</span>

			</div>
		</div>
		
		<div v-show="loading"  style="font-size:14px;text-align: center;color:#8F8F8F;margin-bottom:5px;margin-top: 10px;">加载中</div>

		<div v-show="!loading && taskList.length<itemCount" @click="pn++;loadTaskList();" style="font-size:14px;text-align: center;color:#8F8F8F;margin-bottom:5px;margin-top: 10px;">点击加载更多</div>
		<div v-show="!loading && !(taskList.length<itemCount)" style="font-size:14px;text-align: center;color:#8F8F8F;margin-bottom:5px;margin-top: 10px;">已全部加载</div>

	</div>
		










		<div style="position:absolute;bottom:0;left:0;right:0;background-color: #FFFFFF;">
			<div style="border-top:1px solid #8F8F8F;"></div>

			<div style="height:35px;line-height: 35px;">
				<span @click="$router.push({path:'/create-task',query:{time:new Date().getTime()+''}})" style="font-size:14px;width:50%;display:inline-block;text-align: center;cursor:pointer;">发任务
					+</span>
				<span style="border-left:1px solid #8F8F8F;position: absolute;display:inline-block;"><span
						style="visibility: hidden;">1</span></span>
				<span style="font-size:14px;width:50%;display:inline-block;text-align: center;cursor:pointer;">去记录
					+</span>
			</div>
			<div style="border-top:1px solid #8F8F8F;"></div>
			<div style="height:50px;line-height: 50px;position: relative;">
				<span  @click="$router.push({path:'/index',query:{time:new Date().getTime()+''}})" style="font-size:14px;width:20%;display:inline-block;text-align: center;cursor:pointer;background-color: #8F8F8F;">任务</span>
				<span style="border-left:1px solid #8F8F8F;position: absolute;display:inline-block;"><span
						style="visibility: hidden;">1</span></span>
				<span style="font-size:14px;width:20%;display:inline-block;text-align: center;cursor:pointer;">记录</span>
				<span style="border-left:1px solid #8F8F8F;position: absolute;display:inline-block;"><span
						style="visibility: hidden;">1</span></span>
				<span @click="$router.push({path:'/friend-list',query:{time:new Date().getTime()+''}})" style="font-size:14px;width:20%;display:inline-block;text-align: center;cursor:pointer;">好友</span>
				<span style="border-left:1px solid #8F8F8F;position: absolute;display:inline-block;"><span
						style="visibility: hidden;">1</span></span>
				<span style="font-size:14px;width:20%;display:inline-block;text-align: center;cursor:pointer;">消息</span>
				<span style="border-left:1px solid #8F8F8F;position: absolute;display:inline-block;"><span
						style="visibility: hidden;">1</span></span>
				<span @click="$router.push({path:'/me',query:{time:new Date().getTime()+''}})" style="font-size:14px;width:20%;display:inline-block;text-align: center;cursor:pointer;">我</span>
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
				completeIs:'',
				cancelIs:'',
				status:1,
				query: '',
				fuZeRenUserId:null,
				faBuRenUserId:null,
				taskList:[],
				faBuRenList:[],
				fuZeRenList:[],
				pn:1,
				ps:15,
				itemCount:null,
				loading:null,
				scrollTop:null,
				sortMap:{
					orderNo:0,
					finalTime:0,
					updateTime:0,
					createTime:0,
					name:0,
				},
				
				sortMap1:{
					
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
				thisVue.$refs.taskList.scrollTop=thisVue.scrollTop
			}
		},
		methods: {
			reload() {
				debugger
				let thisVue = this
				Object.assign(thisVue.$data, thisVue.$options.data());

				if(!thisVue.$store.state.login){
					thisVue.$axios.post('/logout').then(res => {
							thisVue.$store.state.login=null;
							thisVue.$router.push({path:'/login',query:{time:new Date().getTime()+""}})
						})
				}

				thisVue.loadTaskList()


				thisVue.$axios.get('/my-task/my-faburen-list?'+thisVue.$qs.stringify({})).then(res => {
					debugger
					if (res.data.code == 0) {
						if(res.data.data.itemList.length>0)
							thisVue.faBuRenList=thisVue.faBuRenList.concat(res.data.data.itemList)
					}
				})

				thisVue.$axios.get('/my-task/my-fuzeren-list?'+thisVue.$qs.stringify({})).then(res => {
					debugger
					if (res.data.code == 0) {
						if(res.data.data.itemList.length>0)
							thisVue.fuZeRenList=thisVue.fuZeRenList.concat(res.data.data.itemList)
					}
				})
			},
			taskListScroll(event){
				debugger
				let thisVue = this
				thisVue.scrollTop=event.target.scrollTop;
				if((event.target.scrollTop+thisVue.$(event.target).height())>=event.target.scrollHeight) {
					thisVue.pn++;
					thisVue.loadTaskList()
				}
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

				if(!sorts || sorts.length==0){
					sorts=['orderNo','finalTime','updateTime','createTime','name']
					orders=['asc','desc','desc','desc','asc']
				}

				thisVue.itemCount =null;
				if(thisVue.status==1){
					thisVue.completeIs=thisVue.cancelIs=0
				}else if(thisVue.status==2){
					thisVue.completeIs=1
					thisVue.cancelIs=null
				}else if(thisVue.status==3){
					thisVue.completeIs=null
					thisVue.cancelIs=1
				}else{
					thisVue.completeIs=null
					thisVue.cancelIs=null
				}

				
				thisVue.$axios.get('/my-task/task-list?'+thisVue.$qs.stringify({fuZeRenUserId:thisVue.fuZeRenUserId,faBuRenUserId:thisVue.faBuRenUserId,kw:thisVue.kw,cancelIs:thisVue.cancelIs,completeIs:thisVue.completeIs,type:thisVue.type,sort:sorts.join(),order:orders.join(),pn:thisVue.pn,ps:thisVue.ps})).then(res => {
					debugger
					if (res.data.code == 0) {
						if(res.data.data.itemList.length>0){
							if(thisVue.pn==1)
								thisVue.taskList=[]
							thisVue.taskList=thisVue.taskList.concat(res.data.data.itemList)
						}else
							thisVue.pn--;
					}
					thisVue.loading=0
				})
				thisVue.$axios.get('/my-task/task-list-sum?'+thisVue.$qs.stringify({fuZeRenUserId:thisVue.fuZeRenUserId,faBuRenUserId:thisVue.faBuRenUserId,kw:thisVue.kw,cancelIs:thisVue.cancelIs,completeIs:thisVue.completeIs,type:thisVue.type,pn:thisVue.pn,ps:thisVue.ps})).then(res => {
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