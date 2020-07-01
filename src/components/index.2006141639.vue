<template>
	<div id="index" style="height:100%;position:relative;">
			

			<div  class="scrollbar1"
			style="
			position: relative;border-bottom:1px solid #8f8f8f;
			white-space: nowrap;overflow-x: scroll;
			">
				<span @click="sortMap.createTime++;sortMap.createTime=sortMap.createTime==3?0:sortMap.createTime;sortMap1.createTime=sortMap.createTime;pn=1;taskList=[];queryHistoryPad=0;loadTaskList();" :style="{color:sortMap.createTime?'red':'#000000'}" style="line-height: 30px;padding:0 5px;font-size: 14px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;">
					时间<span v-if="sortMap.createTime==1">&nbsp;&and;</span><span v-if="sortMap.createTime==2">&nbsp;&or;</span><span v-if="sortMap.createTime==0" style="visibility: hidden;">&nbsp;&or;</span>
				</span>
				<span 
				@click="
				sortMap.finalHas++;
				sortMap.finalHas=sortMap.finalHas==3?0:sortMap.finalHas;
				sortMap1.finalHas=sortMap.finalHas;
				sortMap.finalTime++;
				sortMap.finalTime=sortMap.finalTime==3?0:sortMap.finalTime;
				sortMap1.finalTime=sortMap.finalTime;
				pn=1;taskList=[];
				queryHistoryPad=0;loadTaskList();" 
				
				:style="{color:sortMap.finalTime?'red':'#000000'}"  
				style="line-height: 30px;padding:0 5px;font-size: 14px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;">
					限期<span v-if="sortMap.finalTime==1">&nbsp;&and;</span><span v-if="sortMap.finalTime==2">&nbsp;&or;</span><span v-if="sortMap.finalTime==0" style="visibility: hidden;">&nbsp;&or;</span>
				</span>
			
				<span style="line-height: 30px;font-size: 14px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;">
					<select v-model="status" :style="{color:status?'red':'#000000'}" @change="pn=1;taskList=[];queryHistoryPad=0;loadTaskList()" style="height:30px;border:none;cursor: pointer;padding: 0px 5px;">
						<option value="">状态</option>
						<option value="1">进行中</option>
						<option value="2">已完成</option>
						<option value="3">已撤销</option>
					</select>
				</span>

				
			

				<span style="line-height: 30px;font-size: 14px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;">
					<select v-model="type" :style="{color:type?'red':'#000000'}" @change="pn=1;taskList=[];queryHistoryPad=0;loadTaskList()" style="height:30px;border:none;cursor: pointer;padding:0 5px;">
						<option value="">类型</option>
						<option value="1">推进</option>
						<option value="2">缺陷</option>
					</select>
				</span>
				
				
				<span style="line-height:20px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;padding: 0 5px;display:none;" >
					<label for="autoRedoTomorrowIs" style="cursor: pointer;font-size: 14px; padding: 0 5px 0 0;" :style="{color:autoRedoTomorrowIs!=1?'red':'#000000'}">日常</label>
					<input id="autoRedoTomorrowIs" type="checkbox" 
					@click="
					if(++autoRedoTomorrowIs > 3){
						autoRedoTomorrowIs=1
					}
					if(autoRedoTomorrowIs == 1){
						$event.target.checked=false
						$event.target.indeterminate=false
					}else if(autoRedoTomorrowIs == 2){
						$event.target.checked=true
						$event.target.indeterminate=false
					}else if(autoRedoTomorrowIs == 3){
						$event.target.checked=false
						$event.target.indeterminate=true
					}
					pn=1;taskList=[];queryHistoryPad=0;loadTaskList();
					" 
					:indeterminate.prop="autoRedoTomorrowIs==3?true:false"
					:checked="autoRedoTomorrowIs==2?true:false"
					style="height:30px;border:none;cursor: pointer;padding:0 5px;
					margin: 0;vertical-align: bottom;" />
				</span>

					<span style="line-height: 30px;font-size: 14px;display:inline-block;border-right:1px solid #8f8f8f;position: relative;">
							<svg t="1591346902986" style="position: absolute;left:3px;top:8px;" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2627" width="15" height="15"><path d="M830.486464 796.124515 672.790943 638.42797c44.959904-52.799318 72.109099-121.232412 72.109099-196.016087 0-167.084182-135.448007-302.533214-302.53219-302.533214s-302.533214 135.449031-302.533214 302.533214 135.449031 302.53219 302.533214 302.53219c74.782651 0 143.215745-27.149196 196.017111-72.109099L796.101988 830.531518c9.499249 9.499249 24.885227 9.499249 34.384476 0S839.986737 805.623764 830.486464 796.124515zM442.366829 698.401131c-141.380814 0-255.989248-114.631985-255.989248-255.989248 0-141.403341 114.608434-255.989248 255.989248-255.989248 141.37979 0 255.989248 114.585907 255.989248 255.989248C698.356077 583.769146 583.747643 698.401131 442.366829 698.401131z" p-id="2628" fill="#8a8a8a"></path></svg>
						
						<input v-model="kw" 
						@focus="
						queryHistoryPad=1;
						if($store.state.login){
							$axios.get(`/cache/get?name=${'queryHistoryKwList-'+$store.state.login.userId}`)
								.then(res=>{
									if(res.data.code==0)
										if(res.data.data.value)
											queryHistoryKwList=res.data.data.value.split(',');
								})
							}
						" 
						
						@click="
						queryHistoryPad=1;
						"
						@keyup.enter="pn=1;taskList=[];queryHistoryPad=0;loadTaskList();" 
						type="text" style="line-height: 30px;width:50px;padding:0 15px 0 20px;border:none;"/>
						
						<span v-if="kw" style="font-size: 14px;cursor: pointer;color: #8f8f8f;position: absolute;right:6px;top:0px;" 
						@click="kw=null;pn=1;taskList=[];queryHistoryPad=0;loadTaskList();">
						x</span>
					</span>

					<span @click="
						debugger
						pn=1;
						taskList=[];
						queryHistoryPad=0;loadTaskList();
						
						" 
					style="line-height: 30px;padding:0 5px;font-size: 14px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;">
						搜索
					</span>
					<span @click="status=1;autoRedoTomorrowIs=1,cancelIs='',completeIs='',sortMap.name=0,sortMap.finalHas=0,sortMap.finalTime=0,sortMap.orderNo=0,sortMap.createTime=0,sortMap.updateTime=0,sortMap1={},kw=null;type='',pn=1;taskList=[];queryHistoryPad=0;loadTaskList()" 
					style="line-height: 30px;padding:0 5px;font-size: 14px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;margin-right:25px;">
						重置
					</span>
					
			</div>
			<span @click="" style="line-height: 30px;padding:0 5px;font-size: 14px;background-color: #ffffff;cursor: pointer;display:inline-block;position: absolute;right:0;top:1px;border-left:1px solid #8f8f8f;">
				···
			</span>
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
				queryHistoryPad=0;loadTaskList();
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
				queryHistoryPad=0;loadTaskList();
				" 
				style="
				padding:0 5px;
				font-size: 14px;
				cursor: pointer;
				display:inline-block;
				border-right:1px solid #8f8f8f;
				min-width: 20px;text-align: center;
				"
				:style="{'background-color':(faBuRenUserId==($store.state.login?$attr($store.state.login,'userId'):-1)?'#d8d5d5':'#ffffff')}" 
				>我</span>
				
				<span v-for="(item,i) in faBuRenList" 
				@click="
				debugger;
				faBuRenUserId=faBuRenUserId?null:item.faBuRenUserId;
				taskList=[],pn=1;
				queryHistoryPad=0;loadTaskList();" :style="{'background-color':(faBuRenUserId==item.faBuRenUserId?'#d8d5d5':'#ffffff')}" 
				style="padding:0 5px;font-size: 14px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;
				min-width: 20px;text-align: center;">{{item.followAlias||item.nickname}}</span>
				
				<span style="padding:0 5px;font-size: 14px;cursor: pointer;display:inline-block;border-left:1px solid #8f8f8f;position: absolute;right:0px;top:0px;">···</span>

			</div>
			<div style="width:100%;height:30px;line-height:30px;border-bottom:1px solid #8f8f8f;position: relative;overflow: hidden;;text-overflow:ellipsis;">
				<span  
				@click="
				fuZeRenUserId=null;
				taskList=[],pn=1;
				queryHistoryPad=0;loadTaskList();
				"  
				style="padding:0 5px;font-size: 14px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;background-color: #d8d5d5;">负责人</span>
				
				<span 
				@click="
				fuZeRenUserId=fuZeRenUserId?null:$attr($store.state.login,'userId');
				taskList=[],pn=1;
				queryHistoryPad=0;loadTaskList();
				" 
				:style="{'background-color':(fuZeRenUserId==($store.state.login?$attr($store.state.login,'userId'):-1)?'#d8d5d5':'#ffffff')}" 

				style="padding:0 5px;font-size: 14px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;
				min-width: 20px;text-align: center;"
				>我</span>

				<span v-for="(item,i) in fuZeRenList" 
				@click="
				fuZeRenUserId=fuZeRenUserId?null:item.fuZeRenUserId;
				taskList=[],pn=1;
				queryHistoryPad=0;loadTaskList();
				" 
				:style="{'background-color':(fuZeRenUserId==item.fuZeRenUserId?'#d8d5d5':'#ffffff')}" 
				style="padding:0 5px;font-size: 14px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;
				min-width: 20px;text-align: center;">{{item.followAlias||item.nickname}}</span>
				
				<span style="padding:0 5px;font-size: 14px;cursor: pointer;display:inline-block;border-left:1px solid #8f8f8f;position: absolute;right:0px;top:0px;">···</span>
			</div>


			<div style="padding:3px 0px 3px 12px;box-shadow: 0px 1px 1px 0px #888888;">
				<span style="font-size: 14px;color: #008000;font-weight: 600;">{{$moment($store.state.now).format('MM-DD, d, HH:mm:ss')}}</span>
				<span  style="font-size: 14px;color: #8f8f8f;margin-left:15px;" >共 {{itemCount}} 条记录</span>
			</div>

		<div class="scrollbar" @scroll="taskListScroll($event)" ref="taskList" 
		style="
		overflow: auto;width:100%;position: absolute;
		top: 125px;bottom: 88px;
		">
		

		<div :key="item.taskId" v-for="(item, i) in taskList" class="active visited" 
		@click="
		debugger;
		$($event.currentTarget).css('background-color','#e6e4e4');
		chooseTask=item;
		$router.push({path:'/task',query:{time:new Date().getTime()+'',taskId:item.taskId}})" 

		style="padding:5px;border:1px solid #8F8F8F;margin:5px;cursor:pointer;position: relative;" 
		:style="{'background-color':(item.completeIs?'#219e154d':item.cancelIs?'#ffb60085':'#FFFFFF')}">
		
			<div style="font-size:16px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;" v-html="$queryMark(item.name,kw)"></div>
			<div style="font-size:14px;color:#8F8F8F;margin-top:3px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;">
				{{item.lastTaskTrackContent}}
			</div>
			<div style="position:relative;margin-top:3px;">
				<span style="font-size:12px;color:#8F8F8F;"
				>{{$moment(item.createTime).format(new Date().getFullYear()==new Date(item.createTime).getFullYear()? 'MM-DD, 周d, HH:mm': 'MM-DD, 周d, HH:mm, YYYY').replace('周0','周7').replace('周','')}}</span>
				<span v-if="!(item.fuZeRenUserId==item.faBuRenUserId && item.faBuRenUserId==$attr($store.state.login,'userId'))" style="font-size:12px;color:#8F8F8F;margin-left:15px;"
				>{{item.faBuRenUserId==$attr($store.state.login,"userId")?'我':item.faBuRenUserNickname}} > {{item.fuZeRenUserId==$attr($store.state.login,"userId")?'我':item.fuZeRenUserNickname }}</span>
				<span v-if="item.finalTime" style="font-size:12px;margin-left:15px;" :style="{color: (item.completeIs||item.cancelIs)?'#8F8F8F':item.finalTime>$store.state.now.getTime()?'#ff5500':'#ff0000'}">{{item.finalTime?('限: '+$moment(item.finalTime).format(new Date().getFullYear()==new Date(item.finalTime).getFullYear()? "MM-DD, 周d, HH:mm": "MM-DD, 周d, HH:mm, YYYY").replace(/周0/g,'周7').replace(/周/g,'')):''}}</span>
				<span v-if="item.autoRedoTomorrowIs" style="font-size:12px;color:#8F8F8F;margin-left:15px;">{{item.autoRedoTomorrowIs?'日常':''}}</span>
				<span v-if="item.orderNo" style="font-size:12px;color:#8F8F8F;position:absolute;right:0px;">{{item.orderNo}}</span>
			</div>
		</div>

		<div v-show="loading"  style="font-size:12px;text-align: center;color:#8F8F8F;margin-bottom:10px;margin-top: 10px;">加载中</div>

		<div v-show="!loading && taskList.length<itemCount" @click="pn++;queryHistoryPad=0;loadTaskList();" style="font-size:12px;text-align: center;color:#8F8F8F;margin-bottom:10px;margin-top: 10px;">点击加载更多</div>
		<div v-show="!loading && !(taskList.length<itemCount)" style="font-size:12px;text-align: center;color:#8F8F8F;margin-bottom:10px;margin-top: 10px;">已全部加载</div>

	</div>
		










		<div style="position:absolute;bottom:0;left:0;right:0;background-color: #FFFFFF;box-shadow: 0px 0 1px 0px #888888;">
			<div style="border-top:1px solid #8F8F8F;"></div>

			<div style="height:35px;line-height: 35px;">
				<span @click="$router.push({path:'/insert-task',query:{time:new Date().getTime()+''}})" style="font-weight: 900;font-size:14px;width:50%;display:inline-block;text-align: center;cursor:pointer;">发任务
					+</span>
				<span style="border-left:1px solid #8F8F8F;position: absolute;display:inline-block;"><span
						style="visibility: hidden;">1</span></span>
				<span style="font-weight: 900;font-size:14px;width:50%;display:inline-block;text-align: center;cursor:pointer;">去记录
					+</span>
			</div>
			<div style="border-top:1px solid #8F8F8F;"></div>
			<div style="height:50px;line-height: 50px;position: relative;">
				<span  @click="$router.replace({path:'/index',query:{time:new Date().getTime()+''}})" style="font-size:14px;width:20%;display:inline-block;text-align: center;cursor:pointer;background-color: #ff7f08;">任务</span>
				
				<span style="font-size:14px;width:20%;display:inline-block;text-align: center;cursor:pointer;">记录</span>
				
				<span @click="$router.replace({path:'/friend-list',query:{time:new Date().getTime()+''}})" style="font-size:14px;width:20%;display:inline-block;text-align: center;cursor:pointer;">好友</span>
				
				<span style="font-size:14px;width:20%;display:inline-block;text-align: center;cursor:pointer;">消息</span>
				
				<span @click="$router.replace({path:'/me',query:{time:new Date().getTime()+''}})" style="font-size:14px;width:20%;display:inline-block;text-align: center;cursor:pointer;">我</span>
			</div>
		</div>


		<!-- 搜索历史 -->
		<div v-if="queryHistoryPad" 
		@click="
		if($event.currentTarget==$event.target) 
		{
			queryHistoryPad=0;
		}" 
		style="position: absolute;top:32px;bottom:0;width:100%;background-color: #00000087;">
			<div style="background-color: #ffffff;padding:0 10px 10px 10px;min-height:100px;">
				<span v-for="(item,index) in queryHistoryKwList" :key="index"
				style="
				margin:10px 15px 0 0;display: inline-block;background-color: #e5e5e5;
				cursor: pointer;"
				>
					<span 
					@click="
					kw=item;
					pn=1;taskList=[];queryHistoryPad=0;loadTaskList();
					"
					style="
					font-size: 14px;display: inline-block;background-color: #e5e5e5;max-width: 200px;
					overflow:hidden;text-overflow:ellipsis;white-space: nowrap;padding:5px 10px 5px 5px;">
					{{item}}
					</span>

					<span 
					@click="
					queryHistoryKwList.splice(queryHistoryKwList.indexOf(item),1)
					if($store.state.login){
						$axios.post('/cache/set',$qs.stringify({name:'queryHistoryKwList-'+$store.state.login.userId,value:queryHistoryKwList.join()}))
					}
					"
					style="
					font-size: 14px;display: inline-block;padding:5px;padding: 5px 0px;
					vertical-align: bottom;background-color: #ffffff;color: #8f8f8f;border: 1px solid #e5e5e5;">
					X
					</span>
				</span>
				<div style="font-size: 14px;visibility: hidden;">1</div>
				<div v-if="queryHistoryKwList && queryHistoryKwList.length>0" 
					@click="
					queryHistoryKwList=[];
					if($store.state.login){
						$axios.post('/cache/set',$qs.stringify({name:'queryHistoryKwList-'+$store.state.login.userId,value:queryHistoryKwList.join()}))
					}
					"
				style="font-size: 14px;cursor: pointer;text-align: center;margin-top:10px;color:#8F8F8F;border:1px dashed #8f8f8f;">清空历史记录</div>
				<div v-if="!queryHistoryKwList || queryHistoryKwList.length==0" 
					style="font-size: 14px;text-align: center;margin-top:10px;color:#8F8F8F;">暂无历史记录</div>
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
					thisVue.$axios.get(`/my-task/task-list?taskId=${thisVue.chooseTask.taskId}`).then(res => {
							if(res.data.code==0){
								let o =res.data.data.itemList[0];
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

.scrollbar::-webkit-scrollbar {
  display: none;
}


.scrollbar1::-webkit-scrollbar{
	height:3px;
	/* border-radius: 5px; */
}
.scrollbar1::-webkit-scrollbar-track{
	background-color:#8F8F8F;
	/* border-radius: 5px; */
}
.scrollbar1::-webkit-scrollbar-thumb{
	background-color:#000000;
	/* border-radius: 5px; */
}
.scrollbar1::-webkit-scrollbar-thumb:hover {
	background-color:#000000;
	/* border-radius: 5px; */
}
.scrollbar1::-webkit-scrollbar-thumb:active {
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