<template>
	<div id="task" class="scrollbar" style="height:100%;overflow:auto;position: relative;">
		<div
			style="font-size: 16px;text-align: center;height:40px;line-height: 40px;border-bottom:1px solid #8F8F8f;position: absolute;
			width: 100%;top:0;background-color: #FFFFFF;z-index: 9999;">
			<span @click="$router.back()" style="position: absolute;left:0;width:40px;cursor: pointer;font-weight: 900;">&lt;</span>
			<span>发布任务</span>
		</div>
		<div style="padding:0 5px;margin:40px 0 0 0;">
			<div style="height:10px"></div>
			<div style="margin:0 0 0 5px;">
				<span style="font-size: 14px;color: #8f8f8f;">任务名</span>
				<span v-if="!nameEditIs && !task.completeIs && !task.cancelIs" @click="nameEditIs=1" style="font-size: 12px;margin-left:10px;cursor: pointer;;color: #8f8f8f;">Edit</span>
				<span v-if="nameEditIs && !task.completeIs && !task.cancelIs" @click="nameEditIs=0;taskUpdate.name=task.name;" style="font-size: 12px;margin-left:10px;cursor: pointer;;color: #8f8f8f;">Cancel</span>
				<span v-if="nameEditIs && !task.completeIs && !task.cancelIs" @click="nameEditIs=0;updateTask('name');" style="font-size: 12px;margin-left:10px;cursor: pointer;;color: #8f8f8f;">Done</span>
			</div>
			<div v-if="nameEditIs" style="position: relative;height:30px;line-height: 30px;border:1px solid #8f8f8f;margin:5px 0 0 5px;">
				<input v-model="taskUpdate.name" v-focus="nameEditIs" type="text" style="width:97%;padding:0;border:none;height:30px;line-height: 30px;padding-left: 3px;" />
				<span v-if="taskUpdate.name" style="font-size: 14px;position:absolute;padding: 0 1%;cursor: pointer;color: #8f8f8f;" @click="taskUpdate.name=null">x</span>
			</div>

			<div v-if="!nameEditIs"  style="font-size:16px;line-height: 25px;margin:5px 0 0 5px;word-wrap: break-word;word-break: break-all;">
				{{task.name}}
			</div>

			<div style="margin:10px 0 0 5px;">
				<span style="font-size: 14px;color: #8f8f8f;">类型</span>
				<span v-if="!typeEditIs && !task.completeIs && !task.cancelIs" @click="typeEditIs=1" style="font-size: 12px;margin-left:10px;cursor: pointer;;color: #8f8f8f;">Edit</span>
				<span v-if="typeEditIs && !task.completeIs && !task.cancelIs" @click="typeEditIs=0;taskUpdate.type=task.type;" style="font-size: 12px;margin-left:10px;cursor: pointer;;color: #8f8f8f;">Cancel</span>
				<span v-if="typeEditIs && !task.completeIs && !task.cancelIs" @click="typeEditIs=0;updateTask('type');" style="font-size: 12px;margin-left:10px;cursor: pointer;;color: #8f8f8f;">Done</span>
			</div>
			<div v-if="typeEditIs" style="margin:5px 0 0 5px;line-height: 25px;">
				<label for="developIs" style="font-size:14px;cursor: pointer;">推进</label>
				<input id="developIs" name="type" type="radio" value="1" v-model="taskUpdate.type" style="cursor: pointer;" />
				<span style="margin:0 5px;"></span>
				<label for="bugIs" style="font-size:14px;cursor: pointer;">缺陷</label>
				<input id="bugIs" name="type" type="radio"  value="2" v-model="taskUpdate.type" style="cursor: pointer;"/>
			</div>
			<div v-if="!typeEditIs" style="font-size:16px;line-height: 25px;margin:5px 0 0 5px;word-wrap: break-word;word-break: break-all;">
				{{task.type==1?'推进':task.type==2?'缺陷':''}}
			</div>

			<div style="margin:10px 0 0 5px;">
				<span style="font-size: 14px;color: #8f8f8f;">每天自动重发</span>
				<span v-if="!autoRedoTomorrowIsEditIs && !task.completeIs && !task.cancelIs" @click="autoRedoTomorrowIsEditIs=1" style="font-size: 12px;margin-left:10px;cursor: pointer;;color: #8f8f8f;">Edit</span>
				<span v-if="autoRedoTomorrowIsEditIs && !task.completeIs && !task.cancelIs" @click="autoRedoTomorrowIsEditIs=0;taskUpdate.autoRedoTomorrowIs=task.autoRedoTomorrowIs;" style="font-size: 12px;margin-left:10px;cursor: pointer;;color: #8f8f8f;">Cancel</span>
				<span v-if="autoRedoTomorrowIsEditIs && !task.completeIs && !task.cancelIs" @click="autoRedoTomorrowIsEditIs=0;updateTask('autoRedoTomorrowIs');" style="font-size: 12px;margin-left:10px;cursor: pointer;;color: #8f8f8f;">Done</span>
			</div>
			<div v-if="autoRedoTomorrowIsEditIs" style="margin:5px 0 0 5px;line-height: 25px;">
				<label for="autoRedoTomorrowIsNo" style="font-size:14px;cursor: pointer;">否</label>
				<input id="autoRedoTomorrowIsNo" name="autoRedoTomorrowIs" type="radio" value="0" v-model="taskUpdate.autoRedoTomorrowIs" style="cursor: pointer;" />
				<span style="margin:0 5px;"></span>
				<label for="autoRedoTomorrowIsYes" style="font-size:14px;cursor: pointer;">是</label>
				<input id="autoRedoTomorrowIsYes" name="autoRedoTomorrowIs" type="radio"  value="1" v-model="taskUpdate.autoRedoTomorrowIs" style="cursor: pointer;"/>
			</div>
			<div v-if="!autoRedoTomorrowIsEditIs" style="font-size:16px;line-height: 25px;margin:5px 0 0 5px;word-wrap: break-word;word-break: break-all;">
				{{task.autoRedoTomorrowIs==0?'否':task.autoRedoTomorrowIs==1?'是':''}}
			</div>

			<div style="margin:10px 0 0 5px;">
				<span style="font-size: 14px;color: #8f8f8f;">状态</span>
			</div>
			<div style="font-size:16px;line-height: 25px;margin:5px 0 0 5px;word-wrap: break-word;word-break: break-all;">
				{{(task.completeIs?'已完成':task.cancelIs?'已撤销':'') + ' '+ ((!task.cancelIs && !task.completeIs)?'进行中':'')}}
			</div>

			<div style="margin:10px 0 0 5px;">
				<span style="font-size: 14px;color: #8f8f8f;">责任关系</span>
			</div>
			<div style="font-size:16px;line-height: 25px;margin:5px 0 0 5px;word-wrap: break-word;word-break: break-all;">
				{{$attr($store.state.login,"userId")==task.faBuRenUserId?'我':task.faBuRenUserNickname}} {{ task.taskId?'>':'' }} {{$attr($store.state.login,"userId")==task.fuZeRenUserId?'我':task.fuZeRenUserNickname}}
			</div>

			<div style="margin:10px 0 0 5px;">
				<span style="font-size: 14px;color: #8f8f8f;">最终期限</span>
				<span v-if="!finalTimeEditIs && !task.completeIs && !task.cancelIs" @click="finalTimeEditIs=1" style="font-size: 12px;margin-left:10px;cursor: pointer;;color: #8f8f8f;">Edit</span>
				<span v-if="finalTimeEditIs && !task.completeIs && !task.cancelIs" @click="finalTimeEditIs=0;taskUpdate.finalTime=task.finalTime;taskUpdate.finalTimeDate=task.finalTimeDate;taskUpdate.finalTimeTime=task.finalTimeTime;" style="font-size: 12px;margin-left:10px;cursor: pointer;;color: #8f8f8f;">Cancel</span>
				<span v-if="finalTimeEditIs && !task.completeIs && !task.cancelIs" @click="finalTimeEditIs=0;updateTask('finalTime');" style="font-size: 12px;margin-left:10px;cursor: pointer;;color: #8f8f8f;">Done</span>
			</div>
			<div v-if="finalTimeEditIs" style="position: relative;height:30px;line-height: 30px;border:1px solid #8f8f8f;margin:5px 0 0 5px;">
				<input v-model="taskUpdate.finalTimeDate" @change="taskUpdate.finalTime++" type="date"  style="padding:0;border:none;height:30px;line-height: 30px;padding-left: 3px;" />
				<input v-model="taskUpdate.finalTimeTime" @change="taskUpdate.finalTime++" type="time"  style="padding:0;border:none;height:30px;line-height: 30px;padding-left: 3px;" />
				<span v-if="taskUpdate.finalTimeDate || taskUpdate.finalTimeTime" style="font-size: 14px;position:absolute;padding: 0 1%;cursor: pointer;color: #8f8f8f;" @click="taskUpdate.finalTime=taskUpdate.finalTimeDate=taskUpdate.finalTimeTime=null">x</span>
			</div>
			<div v-if="!finalTimeEditIs" style="font-size:16px;line-height: 25px;margin:5px 0 0 5px;word-wrap: break-word;word-break: break-all;">
				{{task.finalTime?$moment(task.finalTime).format('MM-DD HH:mm, d, YYYY'):''}}
			</div>

			<div style="margin:10px 0 0 5px;">
				<span style="font-size: 14px;color: #8f8f8f;">图片</span>
				<span v-if="!imageListEditIs && !task.completeIs && !task.cancelIs" @click="imageListEditIs=1" style="font-size: 12px;margin-left:10px;cursor: pointer;;color: #8f8f8f;">Edit</span>
				<span v-if="imageListEditIs && !task.completeIs && !task.cancelIs" @click="imageListEditIs=0;taskUpdate.imageList=task.imageList;" style="font-size: 12px;margin-left:10px;cursor: pointer;;color: #8f8f8f;">Cancel</span>
				<span v-if="imageListEditIs && !task.completeIs && !task.cancelIs" @click="imageListEditIs=0;updateTask('imageList');" style="font-size: 12px;margin-left:10px;cursor: pointer;;color: #8f8f8f;">Done</span>
			</div>		
			<div v-viewer="{navbar:true,title:false,toolbar:true}" >
				<span v-for="(item, i) in taskUpdate.imageList" style="position: relative;padding-right:15px;">
				<span style="width:50px;height:50px;border:1px solid #8f8f8f;display:inline-block;margin:5px 0 0 5px;font-size: 14px;vertical-align: bottom;">
					<img :src="item" style="cursor: pointer;width:100%;height:100%;object-fit: cover;" />
				</span>
				
				<span v-if="imageListEditIs" @click="taskUpdate.imageList.splice(i,1)" style="font-size: 14px;cursor:pointer;padding:3px;position: absolute;top:-50px;">x</span>
				<span v-if="imageListEditIs && !(i==(taskUpdate.imageList.length-1))" @click="[taskUpdate.imageList[i],taskUpdate.imageList[i+1]] = [taskUpdate.imageList[i+1],taskUpdate.imageList[i]];$forceUpdate()"  style="font-size: 14px;cursor:pointer;padding:3px;position: absolute;top:-25px;">~</span>
				
				</span>
				<span v-if="imageListEditIs && taskUpdate.imageList.length<6"  @click="addImage()" style="width:50px;height:50px;border:1px solid #8f8f8f;display:inline-block;margin:5px 0 0 5px;font-size: 14px;vertical-align: bottom;cursor: pointer;text-align: center;line-height: 50px;">+</span>
			</div>	

			<div style="margin:10px 0 0 5px;">
				<span style="font-size: 14px;color: #8f8f8f;">内容</span>
				<span v-if="!contentEditIs && !task.completeIs && !task.cancelIs" @click="contentEditIs=1" style="font-size: 12px;margin-left:10px;cursor: pointer;;color: #8f8f8f;">Edit</span>
				<span v-if="contentEditIs && !task.completeIs && !task.cancelIs" @click="contentEditIs=0;taskUpdate.content=task.content;" style="font-size: 12px;margin-left:10px;cursor: pointer;;color: #8f8f8f;">Cancel</span>
				<span v-if="contentEditIs && !task.completeIs && !task.cancelIs" @click="contentEditIs=0;updateTask('content');" style="font-size: 12px;margin-left:10px;cursor: pointer;;color: #8f8f8f;">Done</span>
			</div>
			<div v-if="contentEditIs">
				<textarea v-model="taskUpdate.content"  v-focus="contentEditIs" type="text" style="width:95%;margin:5px 0 0 5px;padding:3px;border:1px solid #8f8f8f;height:300px;resize:none;" ></textarea>
			</div>
			<div v-if="!contentEditIs" style="font-size:16px;margin:5px 0 0 5px;word-wrap: break-word;word-break: break-all;white-space: pre-wrap;">{{task.content}}</div>

			
			<div style="margin:10px 0 0 5px;">
				<span style="font-size: 14px;color: #8f8f8f;">序号</span>
				<span v-if="!orderNoEditIs && !task.completeIs && !task.cancelIs" @click="orderNoEditIs=1" style="font-size: 12px;margin-left:10px;cursor: pointer;;color: #8f8f8f;">Edit</span>
				<span v-if="orderNoEditIs && !task.completeIs && !task.cancelIs" @click="orderNoEditIs=0;taskUpdate.orderNo=task.orderNo;" style="font-size: 12px;margin-left:10px;cursor: pointer;;color: #8f8f8f;">Cancel</span>
				<span v-if="orderNoEditIs && !task.completeIs && !task.cancelIs" @click="orderNoEditIs=0;updateTask('orderNo');" style="font-size: 12px;margin-left:10px;cursor: pointer;;color: #8f8f8f;">Done</span>
			</div>
			<div v-if="orderNoEditIs" style="position: relative;height:30px;line-height: 30px;border:1px solid #8f8f8f;margin:5px 0 0 5px;">
				<input v-model="taskUpdate.orderNo" v-focus="orderNoEditIs"  type="number" style="padding:0;border:none;height:30px;line-height: 30px;padding-left: 3px;" />
				<span v-if="taskUpdate.orderNo" style="font-size: 14px;position:absolute;padding: 0 1%;cursor: pointer;color: #8f8f8f;" @click="taskUpdate.orderNo=9999">x</span>
			</div>
			<div v-if="!orderNoEditIs" style="font-size:16px;margin:5px 0 0 5px;word-wrap: break-word;word-break: break-all;white-space: pre-wrap;">{{task.orderNo}}</div>


			<div style="margin:10px 0 0 5px;">
				<span style="font-size: 14px;color: #8f8f8f;">追踪</span>
			</div>
			<div style="border:1px solid #8F8F8F;height:400px;margin:10px 0 0 5px;">
				<div @scroll="taskTrackListScroll($event)" ref="taskTrackList" style="height:350px;border-bottom:1px solid #8F8F8F;overflow: auto;">
					

					<div style="margin: 5px;">
						<span style="font-size: 14px;color: #8f8f8f;">已找到 {{taskTrack_count}} 条记录</span>
					</div>
					
						<div v-for="(item, i) in taskTrack_list" style="margin:5px 5px 5px 5px;">
							<div style="font-size: 14px;word-wrap: break-word;word-break: break-all;">{{item.content}}</div>
							<div style="font-size: 12px;color:#8f8f8f;">{{$moment(item.createTime).format('MM-DD hh:mm, d, YYYY')}}</div>
						</div>
					
					<div v-show="taskTrack_loading"  style="font-size:14px;text-align: center;color:#8F8F8F;margin-bottom:5px;margin-top: 10px;">加载中</div>
			
					<div v-show="!taskTrack_loading && taskTrack_list.length<taskTrack_count" @click="pn++;loadTaskTrackList();" style="font-size:14px;text-align: center;color:#8F8F8F;margin-bottom:5px;margin-top: 10px;">点击加载更多</div>
					<div v-show="!taskTrack_loading && !(taskTrack_list.length<taskTrack_count)" style="font-size:14px;text-align: center;color:#8F8F8F;margin-bottom:5px;margin-top: 10px;">已全部加载</div>
				</div>

				<div style="height:49px;position: relative;">
					<span  style="height:100%;position: absolute;right:50px;left:0px;margin:0;border:none;">
						<input v-model="trackContent" placeholder="输入追踪内容" type="text"  style="height:100%;position: absolute;width: 98%;padding:0 3px;margin:0;border:none;"/>
					</span>
					<button @click="createTrack()" style="font-size: 14px;height:100%;width:50px;position: absolute;right:0px;cursor: pointer;">发送</button> 
				</div>
			</div>



			<button @click="
							$router.replace({path:'/task',query:{time:new Date().getTime()+'',taskId:taskId}})

			" style="font-size: 14px;width:50px;height:30px;margin:20px 5px 0 5px;cursor: pointer; ">刷新</button>

			

			 <button v-if="task.taskId && !task.cancelIs && !task.completeIs" @click="
			 let r=window.confirm('确认撤销吗');
			 if(r){
			 $axios.post('/my-task/cancel-task',$qs.stringify({taskId:taskId}))
				 .then(res=>{ 
					 if(res.data.codeMsg) 
						 window.alert(res.data.codeMsg)
					 if(res.data.code ==0) 
						 if(!res.data.codeMsg) 
							 $router.replace({path:'/task',query:{time:new Date().getTime()+'',taskId:taskId}})

						 })
					 }
			 " style="font-size: 14px;width:50px;height:30px;margin:20px 5px 0 5px;cursor: pointer; ">撤销</button>

			 <button v-if="task.taskId && !task.cancelIs && !task.completeIs" @click="
			 let r=window.confirm('确认完成吗');
			 if(r){
			 $axios.post('/my-task/complete-task',$qs.stringify({taskId:taskId}))
				 .then(res=>{ 
					 if(res.data.codeMsg) 
						 window.alert(res.data.codeMsg)
					 if(res.data.code ==0) 
						 if(!res.data.codeMsg) 
							 $router.replace({path:'/task',query:{time:new Date().getTime()+'',taskId:taskId}})

						 })
					 }
			 " style="font-size: 14px;width:50px;height:30px;margin:20px 5px 0 5px;cursor: pointer; ">完成</button>


			 <button  v-if="task.taskId && (task.cancelIs || task.completeIs)" @click="
			 let r=window.confirm('确认重启吗');
			 if(r){
			 $axios.post('/my-task/restart-task',$qs.stringify({taskId:taskId}))
				 .then(res=>{ 
					 if(res.data.codeMsg) 
						 window.alert(res.data.codeMsg)
					 if(res.data.code ==0) 
						 if(!res.data.codeMsg) 
							$router.replace({path:'/task',query:{time:new Date().getTime()+'',taskId:taskId}})
						 })
					 }
			 " style="font-size: 14px;width:50px;height:30px;margin:20px 5px 0 5px;cursor: pointer; ">重启</button>

			 <button  
			 v-if="task.taskId" 
			 @click="
			 let r=window.confirm('确认克隆吗');
			 if(r){
				$store.state.cloneTask=task;
				$router.push({path:'/create-task',query:{time:new Date().getTime()+''}})
			 }
			 " 
			 style="font-size: 14px;width:50px;height:30px;margin:20px 5px 0 5px;cursor: pointer; "
			 >克隆</button>

			 <button v-if="task.taskId && (task.cancelIs  || task.completeIs)" @click="
			let r=window.confirm('确认删除吗');
			if(r){
			$axios.post('/my-task/delete-task-list',$qs.stringify({taskId:taskId,expectCount:1}))
				.then(res=>{ 
					if(res.data.codeMsg) 
						window.alert(res.data.codeMsg)
					if(res.data.code ==0) 
						if(!res.data.codeMsg) 
							$router.back()
						})
					}
			 " style="font-size: 14px;width:50px;height:30px;margin:20px 0 0 5px;cursor: pointer; ">删除</button>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'task',
		data() {
			return {
				taskId:null,
				task:{
					taskId:null,
					fuZeRenUserId:null,
					faBuRenUserId:null,
					finalTime:null,
					finalTimeDate:null,
					finalTimeTime:null,
					name:null,
					type:null,
					content:null,
					orderNo:null,
					imageList:[],
					autoRedoTomorrowIs:null,
				},
				taskUpdate:{
					taskId:null,
					fuZeRenUserId:null,
					faBuRenUserId:null,
					finalTime:null,
					finalTimeDate:null,
					finalTimeTime:null,
					name:null,
					type:null,
					content:null,
					orderNo:null,
					imageList:[],
					autoRedoTomorrowIs:null,
				},
				nameEditIs:0,
				orderNoEditIs:0,
				typeEditIs:0,
				contentEditIs:0,
				imageListEditIs:0,
				finalTimeEditIs:0,
				fuZeRenEditIs:0,
				autoRedoTomorrowIsEditIs:0,
				query: '',
				trackContent:null,
				taskTrack_loading:null,
				taskTrack_count:null,
				taskTrack_list:[],
				taskTrack_kw:null,
				taskTrack_pn:1,
				taskTrack_ps:15,
				taskTrack_scrollTop:null,
			}
		},
		beforeRouteLeave(to, from,next){
			debugger
			next()
		},
		activated() {
			let thisVue = this
			window.thisVue=thisVue;
			if (thisVue.query != JSON.stringify(thisVue.$route.query)) {
				thisVue.reload();

				thisVue.query = JSON.stringify(thisVue.$route.query);
			}
		},
		methods: {
			reload() {
				let thisVue = this
				Object.assign(thisVue.$data, thisVue.$options.data());
				thisVue.taskId=thisVue.$route.query.taskId;

				thisVue.$axios.get('/my-task/task?taskId='+thisVue.taskId).then(res=>{
					if(res.data.codeMsg)
						alert(res.data.codeMsg)
					if (res.data.code == 0) {
						thisVue.task=res.data.data;
						thisVue.task.imageList=[]
						if(thisVue.task.image)
							thisVue.task.imageList.push(thisVue.task.image)
						if(thisVue.task.image1)
							thisVue.task.imageList.push(thisVue.task.image1)
						if(thisVue.task.image2)
							thisVue.task.imageList.push(thisVue.task.image2)
						if(thisVue.task.image3)
							thisVue.task.imageList.push(thisVue.task.image3)
						if(thisVue.task.image4)
							thisVue.task.imageList.push(thisVue.task.image4)
						if(thisVue.task.image5)
							thisVue.task.imageList.push(thisVue.task.image5)
						
						let finalTimeM = thisVue.task.finalTime?thisVue.$moment(thisVue.task.finalTime):null;
						thisVue.task.finalTimeDate=finalTimeM?finalTimeM.format("YYYY-MM-DD"):null;
						thisVue.task.finalTimeTime=finalTimeM?finalTimeM.format("HH:mm:ss")	:null;

						Object.assign(thisVue.taskUpdate,thisVue.task)
						thisVue.taskUpdate.imageList=[]
						if(thisVue.task.image)
							thisVue.taskUpdate.imageList.push(thisVue.task.image)
						if(thisVue.task.image1)
							thisVue.taskUpdate.imageList.push(thisVue.task.image1)
						if(thisVue.task.image2)
							thisVue.taskUpdate.imageList.push(thisVue.task.image2)
						if(thisVue.task.image3)
							thisVue.taskUpdate.imageList.push(thisVue.task.image3)
						if(thisVue.task.image4)
							thisVue.taskUpdate.imageList.push(thisVue.task.image4)
						if(thisVue.task.image5)
							thisVue.taskUpdate.imageList.push(thisVue.task.image5)
					}
				})

				thisVue.loadTaskTrackList()
			},
			updateTask(name) {
				debugger
				let thisVue = this
				if(JSON.stringify(thisVue.task[name])==JSON.stringify(thisVue.taskUpdate[name]))
					return;

				var param={}
				param.taskId=thisVue.taskId
				param[name]=thisVue.taskUpdate[name]
				if(name=='imageList'){
					param.image=thisVue.taskUpdate.imageList[0]?thisVue.taskUpdate.imageList[0]:null,
					param.image1=thisVue.taskUpdate.imageList[1]?thisVue.taskUpdate.imageList[1]:null,
					param.image2=thisVue.taskUpdate.imageList[2]?thisVue.taskUpdate.imageList[2]:null,
					param.image3=thisVue.taskUpdate.imageList[3]?thisVue.taskUpdate.imageList[3]:null,
					param.image4=thisVue.taskUpdate.imageList[4]?thisVue.taskUpdate.imageList[4]:null,
					param.image5=thisVue.taskUpdate.imageList[5]?thisVue.taskUpdate.imageList[5]:null
				}
				if(name=='finalTime'){
					if(!thisVue.taskUpdate.finalTimeTime)
						thisVue.taskUpdate.finalTimeTime="00:00"
					if(thisVue.taskUpdate.finalTimeDate && thisVue.taskUpdate.finalTimeTime)
						param.finalTime = thisVue.$moment(thisVue.taskUpdate.finalTimeDate+" "+thisVue.taskUpdate.finalTimeTime).toDate().getTime();
					else if(!thisVue.taskUpdate.finalTimeDate && !thisVue.taskUpdate.finalTimeTime)
						param.finalTime = ""
					else
						param.finalTime = null;
					thisVue.taskUpdate.finalTime=param.finalTime
				}

				thisVue.$axios.post('/my-task/update-task',thisVue.$qs.stringify(param)).then(res=>{
					debugger
					if(res.data.codeMsg)
						alert(res.data.codeMsg)
					if (res.data.code == 0) {
						thisVue.task[name]=JSON.parse(JSON.stringify(thisVue.taskUpdate[name])) 
						if(name=='finalTime'){
							let finalTimeM = thisVue.task.finalTime?thisVue.$moment(thisVue.task.finalTime):null;
							thisVue.task.finalTimeDate=finalTimeM?finalTimeM.format("YYYY-MM-DD"):null;
							thisVue.task.finalTimeTime=finalTimeM?finalTimeM.format("HH:mm:ss")	:null;
						}
					}
				})
			},
			addImage(){
				debugger
				let thisVue = this
				if(!(thisVue.taskUpdate.imageList.length<6)){
					alert("最多添加 6 张图片")
					return;
				}
				thisVue.$(`<input type="file" />`).change(function(){
					debugger
					let file= this.files[0];
					let fd = new FormData()
                    fd.append('file', file);
					thisVue.$axios.post('/upload-file',fd,{headers: { "Content-Type": "multipart/form-data" },}).then(res=>{
						debugger
						thisVue.taskUpdate.imageList.push(res.data.data.url)
					})
				}).click()
			},
			createTrack(){
				debugger
				let thisVue = this
				thisVue.$axios.post('/my-task/create-task-track',thisVue.$qs.stringify({taskId:thisVue.taskId,content:thisVue.trackContent})).then(res=>{
					debugger
					if(res.data.codeMsg)
						alert(res.data.codeMsg)
					if (res.data.code == 0) {
						thisVue.taskTrack_list.unshift({content:thisVue.trackContent,createTime:new Date().getTime()+""})
						thisVue.taskTrack_count++;
						thisVue.trackContent=null;
						thisVue.$refs.taskTrackList.scrollTop=0
					}
					
				})
			},
			taskTrackListScroll(event){
				debugger
				let thisVue = this
				thisVue.taskTrack_scrollTop=event.target.scrollTop;
				if((event.target.scrollTop+thisVue.$(event.target).height())>=event.target.scrollHeight) {
					thisVue.taskTrack_pn++;thisVue.loadTaskTrackList()
				}
			},
			loadTaskTrackList(){
				debugger
				let thisVue = this
				thisVue.taskTrack_loading=1

				thisVue.taskTrack_count =null;
				thisVue.$axios.get('/my-task/task-track-list?'+thisVue.$qs.stringify({taskId:thisVue.taskId,kw:thisVue.taskTrack_kw,pn:thisVue.taskTrack_pn,ps:thisVue.taskTrack_ps})).then(res => {
					debugger
					if (res.data.code == 0) {
						if(res.data.data.itemList.length>0)
							thisVue.taskTrack_list=thisVue.taskTrack_list.concat(res.data.data.itemList)
						else
							thisVue.taskTrack_pn--;
					}
					thisVue.taskTrack_loading=0
				})
				thisVue.$axios.get('/my-task/task-track-list-sum?'+thisVue.$qs.stringify({taskId:thisVue.taskId,kw:thisVue.taskTrack_kw,pn:thisVue.taskTrack_pn,ps:thisVue.taskTrack_ps})).then(res => {
					debugger
					if (res.data.code == 0) {
						thisVue.taskTrack_count=res.data.data.itemCount
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