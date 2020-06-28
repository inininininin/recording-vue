<template>
	<div id="index" style="height:100%;position:relative;">
		<div class="scrollbar" style="height:38px;line-height: 35px;white-space: nowrap;overflow-x: scroll;overflow-y: hidden;">
			<span style="cursor: pointer;height: 35px;line-height: 35px;display: inline-block;padding:0 5px;">
				<span style="font-size:14px;">时间</span>
				<span style="font-size:14px;">&nbsp;&and;</span>
			</span>
			<span style="font-size:14px;height: 35px;line-height: 35px;display: inline-block;border-left:1px solid #8F8F8F;">
				&#8207;
			</span>
			<span style="cursor: pointer;height: 35px;line-height: 35px;display: inline-block;padding:0 5px;">
				<span style="font-size:14px;">期限</span>
				<span style="font-size:14px;">&nbsp;&or;</span>
			</span>
			<span style="font-size:14px;height: 35px;line-height: 35px;display: inline-block;border-left:1px solid #8F8F8F;">
				&#8207;
			</span>
			<span style="font-size:14px;height: 35px;line-height: 35px;display: inline-block;cursor: pointer;vertical-align: top;">
				<select style="border:none;height: 35px;cursor: pointer;padding:0 5px;">
					<option>状态</option>
					<option>进行中</option>
					<option>已完成</option>
					<option>已撤销</option>
				</select>
			</span>
			<span style="font-size:14px;height: 35px;line-height: 35px;display: inline-block;border-left:1px solid #8F8F8F;">
				&#8207;
			</span>
			<span style="font-size:14px;height: 35px;line-height: 35px;display: inline-block;cursor: pointer;vertical-align: top;">
				<select style="border:none;height: 35px;cursor: pointer;padding:0 5px;">
					<option>类型</option>
					<option>推进</option>
					<option>缺陷</option>
				</select>
			</span>
			<span style="font-size:14px;height: 35px;line-height: 35px;display: inline-block;border-left:1px solid #8F8F8F;">
				&#8207;
			</span>
			<span style="font-size:14px;height: 35px;line-height: 35px;display: inline-block;position: relative;">
				<svg t="1591346902986" style="position: absolute;left:3px;top:10px;" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2627" width="15" height="15"><path d="M830.486464 796.124515 672.790943 638.42797c44.959904-52.799318 72.109099-121.232412 72.109099-196.016087 0-167.084182-135.448007-302.533214-302.53219-302.533214s-302.533214 135.449031-302.533214 302.533214 135.449031 302.53219 302.533214 302.53219c74.782651 0 143.215745-27.149196 196.017111-72.109099L796.101988 830.531518c9.499249 9.499249 24.885227 9.499249 34.384476 0S839.986737 805.623764 830.486464 796.124515zM442.366829 698.401131c-141.380814 0-255.989248-114.631985-255.989248-255.989248 0-141.403341 114.608434-255.989248 255.989248-255.989248 141.37979 0 255.989248 114.585907 255.989248 255.989248C698.356077 583.769146 583.747643 698.401131 442.366829 698.401131z" p-id="2628" fill="#8a8a8a"></path></svg>
				<input type="text" style="line-height: 35px;border:none;padding:0 3px 0 18px;width:80px;"/>
			</span>
			<span style="font-size:14px;height: 35px;line-height: 35px;display: inline-block;border-left:1px solid #8F8F8F;">
				&#8207;
			</span>
			<span style="font-size:14px;cursor: pointer;height: 35px;line-height: 35px;display: inline-block;padding:0 5px;">
				搜索
			</span>
			<span style="font-size:14px;height: 35px;line-height: 35px;display: inline-block;border-left:1px solid #8F8F8F;">&#8207;</span>
			<span style="font-size:14px;cursor: pointer;height: 35px;line-height: 35px;display: inline-block;padding:0 5px;">
				重置
			</span>
			<span style="font-size:14px;height: 35px;line-height: 35px;display: inline-block;border-left:1px solid #8F8F8F;">
				&#8207;
			</span>

			<span style="position: absolute;right:0px;height: 35px;">
				<span style="font-size:14px;height: 35px;line-height: 35px;display: inline-block;border-left:1px solid #8F8F8F;">
					&#8207;
				</span>
				<span style="text-align: center;font-weight: 900;font-size:14px;cursor: pointer;height: 35px;line-height: 35px;display: inline-block;padding:0 5px;">
					· · ·
				</span>
			</span>
		</div>

		<div class="scrollbar" style="height:38px;line-height: 35px;white-space: nowrap;overflow-x: scroll;overflow-y: hidden;">
			<span style="font-size:14px;cursor: pointer;height: 35px;line-height: 35px;display: inline-block;padding:0 5px;background-color: #d8d5d5;">
				发布人
			</span>
			<span style="font-size:14px;height: 35px;line-height: 35px;display: inline-block;border-left:1px solid #8F8F8F;">
				&#8207;
			</span>
			<span>
				<span style="font-size:14px;cursor: pointer;height: 35px;line-height: 35px;display: inline-block;padding:0 5px;min-width:25px;text-align: center;">
					我
				</span>
				<span style="font-size:14px;height: 35px;line-height: 35px;display: inline-block;border-left:1px solid #8F8F8F;">
					&#8207;
				</span>
			</span>
		</div>

		<div class="scrollbar" style="height:38px;height: 35px;line-height: 35px;white-space: nowrap;overflow-x: scroll;overflow-y: hidden;">
			<span style="font-size:14px;cursor: pointer;height: 35px;line-height: 35px;display: inline-block;padding:0 5px;background-color: #d8d5d5;">
				负责人
			</span>
			<span style="font-size:14px;height: 35px;line-height: 35px;display: inline-block;border-left:1px solid #8F8F8F;">
				&#8207;
			</span>
			<span>
				<span style="font-size:14px;cursor: pointer;height: 35px;line-height: 35px;display: inline-block;padding:0 5px;min-width:25px;text-align: center;">
					我
				</span>
				<span style="font-size:14px;height: 35px;line-height: 35px;display: inline-block;border-left:1px solid #8F8F8F;">
					&#8207;
				</span>
			</span>
		</div>

		<div style="padding:3px 0px 3px 5px;box-shadow: 0px 1px 1px 0px #888888;">
			<span style="font-size: 14px;color: #008000;font-weight: 600;">{{$moment($store.state.now).format('MM-DD, d, HH:mm:ss')}}</span>
			<span style="font-size: 14px;color: #8f8f8f;margin-left:15px;" >共 {{itemCount}} 条记录</span>
		</div>
		<div class="scrollbarNone"
			style="overflow: auto;width:100%;position: absolute;
			top: 138px;bottom: 88px;">
			<div style="border:1px solid #8f8f8f;height:50px;margin:5px;padding:5px;">

			</div>
			<div style="border:1px solid #8f8f8f;height:50px;margin:5px;padding:5px;">

			</div>
			<div style="border:1px solid #8f8f8f;height:50px;margin:5px;padding:5px;">

			</div>
			<div style="border:1px solid #8f8f8f;height:50px;margin:5px;padding:5px;">

			</div>
			<div style="border:1px solid #8f8f8f;height:50px;margin:5px;padding:5px;">

			</div>
			<div style="border:1px solid #8f8f8f;height:50px;margin:5px;padding:5px;">

			</div>
			<div style="border:1px solid #8f8f8f;height:50px;margin:5px;padding:5px;">

			</div>
			<div style="border:1px solid #8f8f8f;height:50px;margin:5px;padding:5px;">

			</div>
			<div style="border:1px solid #8f8f8f;height:50px;margin:5px;padding:5px;">

			</div>
			<div style="border:1px solid #8f8f8f;height:50px;margin:5px;padding:5px;">

			</div>
			<div style="border:1px solid #8f8f8f;height:50px;margin:5px;padding:5px;">

			</div>
		</div>

		<div 
			style="position: absolute;bottom: 0;left: 0px;right: 0px;
			background-color: rgb(255, 255, 255);box-shadow: rgb(136, 136, 136) 0px 0px 1px 0px;border-top: 1px solid #afaeae;">
			<div style="height:35px;">
				<span style="line-height:35px;height:35px;text-align: center;cursor: pointer;font-weight: 900;font-size: 14px;width:50%;display: inline-block;">
					发任务 +
				</span>
				<span style="position: absolute;font-size:14px;height: 35px;line-height: 35px;display: inline-block;border-left:1px solid #8F8F8F;">
					&#8207;
				</span>
				<span style="line-height:35px;height:35px;text-align: center;cursor: pointer;font-weight: 900;font-size: 14px;width:50%;display: inline-block;">
					去记录 +
				</span>
			</div>
			<div style="height: 50px;line-height: 50px;position: relative;border-top:1px solid #8F8F8F;">
				<span 
					style="display: inline-block;font-size: 14px;width: 20%;text-align: center;
					cursor: pointer;background-color: rgb(255, 127, 8);">
					任务
				</span>
				<span style="position: absolute;font-size:14px;height: 50px;line-height: 50px;display: inline-block;border-left:1px solid #8F8F8F;">
					&#8207;
				</span>
				<span 
					style="display: inline-block;font-size: 14px;width: 20%;text-align: center;
					cursor: pointer;">
					记录
				</span>
				<span style="position: absolute;font-size:14px;height: 50px;line-height: 50px;display: inline-block;border-left:1px solid #8F8F8F;">
					&#8207;
				</span>
				<span 
					style="display: inline-block;font-size: 14px;width: 20%;text-align: center;
					cursor: pointer;">
					好友
				</span>
				<span style="position: absolute;font-size:14px;height: 50px;line-height: 50px;display: inline-block;border-left:1px solid #8F8F8F;">
					&#8207;
				</span>
				<span 
					style="display: inline-block;font-size: 14px;width: 20%;text-align: center;
					cursor: pointer;">
					消息
				</span>
				<span style="position: absolute;font-size:14px;height: 50px;line-height: 50px;display: inline-block;border-left:1px solid #8F8F8F;">
					&#8207;
				</span>
				<span 
					style="display: inline-block;font-size: 14px;width: 20%;text-align: center;
					cursor: pointer;">
					我
				</span>
			</div>
		</div>
		
	</div>
</template>
<script>
	import Vue from 'vue'
	import _ from 'lodash'
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
				autoRedoTomorrowIs:1,
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
					finalHas:1,
					finalTime:0,
					updateTime:0,
					createTime:0,
					name:0,
				},
				
				sortMap1:{
					
				},
				chooseTask:null,
				queryHistoryKwList:[],
				queryHistoryPad:0,
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

				if(thisVue.chooseTask){
					thisVue.$axios.get(`/my-task/task?taskId=${thisVue.chooseTask.taskId}`).then(res => {
							if(res.data.code==0){
								let o =res.data.data;
								thisVue.chooseTask.name=o.name;
								thisVue.chooseTask.finalTime=o.finalTime;
								thisVue.chooseTask.autoRedoTomorrowIs=o.autoRedoTomorrowIs;
								thisVue.chooseTask.faBuRenUserId=o.faBuRenUserId;
								thisVue.chooseTask.faBuRenUserNickname=o.faBuRenUserNickname;
								thisVue.chooseTask.fuZeRenUserId=o.fuZeRenUserId;
								thisVue.chooseTask.fuZeRenUserNickname=o.fuZeRenUserNickname;
								thisVue.chooseTask.lastTaskTrackId=o.lastTaskTrackId;
								thisVue.chooseTask.lastTaskTrackContent=o.lastTaskTrackContent;
								thisVue.chooseTask.lastTaskTrackCreateTime=o.lastTaskTrackCreateTime;
								thisVue.chooseTask.completeIs=o.completeIs;
								thisVue.chooseTask.cancelIs=o.cancelIs;
								thisVue.chooseTask.orderNo=o.orderNo;
							}else if (res.data.code==1404){
								thisVue.itemCount--;
								thisVue.taskList.splice(thisVue.taskList.indexOf(thisVue.chooseTask),1)
							}
						})
				}
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

				thisVue.queryHistoryPad=0;thisVue.loadTaskList()


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
					thisVue.queryHistoryPad=0;thisVue.loadTaskList()
				}
			},
			loadTaskList:_.debounce(function(){
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
					sorts=['orderNoHas','orderNo','autoRedoTomorrowIs','createTime','name']
					orders=['desc','asc','desc','desc','asc']
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
				
				let autoRedoTomorrowIs=thisVue.autoRedoTomorrowIs==1?'':thisVue.autoRedoTomorrowIs==2?1:thisVue.autoRedoTomorrowIs==3?0:'';

				if(thisVue.kw && thisVue.queryHistoryKwList.indexOf(thisVue.kw)==-1){
					thisVue.queryHistoryKwList.splice(0,0,thisVue.kw)
					if(thisVue.$store.state.login){
						thisVue.$axios.post('/cache/set',thisVue.$qs.stringify({name:'queryHistoryKwList-'+thisVue.$store.state.login.userId,value:thisVue.queryHistoryKwList.join()}))
					}
				}

				thisVue.$axios.get('/my-task/task-list?'+thisVue.$qs.stringify({autoRedoTomorrowIs:autoRedoTomorrowIs,fuZeRenUserId:thisVue.fuZeRenUserId,faBuRenUserId:thisVue.faBuRenUserId,kw:thisVue.kw,cancelIs:thisVue.cancelIs,completeIs:thisVue.completeIs,type:thisVue.type,sort:sorts.join(),order:orders.join(),pn:thisVue.pn,ps:thisVue.ps})).then(res => {
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
				thisVue.$axios.get('/my-task/task-list-sum?'+thisVue.$qs.stringify({autoRedoTomorrowIs:autoRedoTomorrowIs,fuZeRenUserId:thisVue.fuZeRenUserId,faBuRenUserId:thisVue.faBuRenUserId,kw:thisVue.kw,cancelIs:thisVue.cancelIs,completeIs:thisVue.completeIs,type:thisVue.type,pn:thisVue.pn,ps:thisVue.ps})).then(res => {
					debugger
					if (res.data.code == 0) {
						thisVue.itemCount=res.data.data.itemCount
					}
				})
			},300),
		}
	}
</script>
<style scoped>

.scrollbarNone::-webkit-scrollbar {
  display: none;
}


.scrollbar::-webkit-scrollbar{
	height:3px;
	/* border-radius: 5px; */
}
.scrollbar::-webkit-scrollbar-track{
	background-color:#8F8F8F;
	/* border-radius: 5px; */
}
.scrollbar::-webkit-scrollbar-thumb{
	background-color:#000000;
	/* border-radius: 5px; */
}
.scrollbar::-webkit-scrollbar-thumb:hover {
	background-color:#000000;
	/* border-radius: 5px; */
}
.scrollbar::-webkit-scrollbar-thumb:active {
	background-color:#000000;
	/* border-radius: 5px; */
}

.active:active {
	background-color: #cccccc!important;
}
.visited:visited {
	background-color: #cccccc!important;
}
</style>