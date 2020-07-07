<template>
	<div id="index" style="height:100%;position:relative;">
		<div class="scrollbar" style="height:38px;line-height: 35px;white-space: nowrap;overflow-x: scroll;overflow-y: hidden;">
			<span style="cursor: pointer;height: 35px;line-height: 35px;display: inline-block;padding:0 5px;"
				@click="
					if(defaultSort){
						sort = {}
					}
					if(!sort.insertTime )
						sort.insertTime='desc'
					else if(sort.insertTime=='desc')
						sort.insertTime='asc'
					else if(sort.insertTime=='asc')
						sort.insertTime=null
					pn=1;loadTaskList();
					defaultSort=0;
					">
				<span style="font-size:14px;">时间</span>
				<span v-if="!defaultSort && sort.insertTime=='asc'" style="font-size:14px;color:#ff0000;">&nbsp;&and;</span>
				<span v-if="!defaultSort && sort.insertTime=='desc'" style="font-size:14px;color:#ff0000;">&nbsp;&or;</span>
				<span v-if="defaultSort || !sort.insertTime" style="font-size:14px;color:#ff0000;visibility: hidden;">&nbsp;&or;</span>
			</span>
			<span style="font-size:14px;height: 35px;line-height: 35px;display: inline-block;border-left:1px solid #8F8F8F;">
				&#8207;
			</span>
			<span style="cursor: pointer;height: 35px;line-height: 35px;display: inline-block;padding:0 5px;"
				@click="
					if(defaultSort){
						sort = {}
					}
					if(!sort.finalTime)
						sort.finalTime='asc'
					else if(sort.finalTime=='asc')
						sort.finalTime='desc'
					else if(sort.finalTime=='desc')
						sort.finalTime=null
					pn=1;loadTaskList()
					defaultSort=0;
					">
				<span style="font-size:14px;">期限</span>
				<span v-if="!defaultSort && sort.finalTime=='asc'" style="font-size:14px;color:#ff0000;">&nbsp;&and;</span>
				<span v-if="!defaultSort && sort.finalTime=='desc'" style="font-size:14px;color:#ff0000;">&nbsp;&or;</span>
				<span v-if="defaultSort || !sort.finalTime" style="font-size:14px;color:#ff0000;visibility: hidden;">&nbsp;&or;</span>
			</span>
			<span style="font-size:14px;height: 35px;line-height: 35px;display: inline-block;border-left:1px solid #8F8F8F;">
				&#8207;
			</span>
			<span style="font-size:14px;height: 35px;line-height: 35px;display: inline-block;cursor: pointer;vertical-align: top;">
				<select v-model="status" style="border:none;height: 35px;cursor: pointer;padding:0 5px;"
					:style="{'color':status==''?'#000000':'#ff0000'}"
					@change="
						pn=1;loadTaskList();
						">
					<option value="">状态</option>
					<option value="1">进行中</option>
					<option value="2">已完成</option>
					<option value="3">已撤销</option>
				</select>
			</span>
			<span style="font-size:14px;height: 35px;line-height: 35px;display: inline-block;border-left:1px solid #8F8F8F;">
				&#8207;
			</span>
			<span style="font-size:14px;height: 35px;line-height: 35px;display: inline-block;cursor: pointer;vertical-align: top;">
				<select v-model="type" style="border:none;height: 35px;cursor: pointer;padding:0 5px;"
					:style="{'color':type==''?'#000000':'#ff0000'}"
					@change="
						pn=1;loadTaskList();
						">
					<option value="">类型</option>
					<option value="1">推进</option>
					<option value="2">缺陷</option>
				</select>
			</span>
			<span style="font-size:14px;height: 35px;line-height: 35px;display: inline-block;border-left:1px solid #8F8F8F;">
				&#8207;
			</span>
			<span style="font-size:14px;height: 35px;line-height: 35px;display: inline-block;position: relative;">
				<svg t="1591346902986" style="position: absolute;left:3px;top:10px;" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2627" width="16" height="16"><path d="M830.486464 796.124515 672.790943 638.42797c44.959904-52.799318 72.109099-121.232412 72.109099-196.016087 0-167.084182-135.448007-302.533214-302.53219-302.533214s-302.533214 135.449031-302.533214 302.533214 135.449031 302.53219 302.533214 302.53219c74.782651 0 143.215745-27.149196 196.017111-72.109099L796.101988 830.531518c9.499249 9.499249 24.885227 9.499249 34.384476 0S839.986737 805.623764 830.486464 796.124515zM442.366829 698.401131c-141.380814 0-255.989248-114.631985-255.989248-255.989248 0-141.403341 114.608434-255.989248 255.989248-255.989248 141.37979 0 255.989248 114.585907 255.989248 255.989248C698.356077 583.769146 583.747643 698.401131 442.366829 698.401131z" p-id="2628" fill="#8a8a8a"></path></svg>
				<input v-model="kw" type="text" style="line-height: 35px;border:none;padding:0 14px 0 18px;width:80px;"
					@keyup.enter="historyKwListTagShow=0;pn=1;loadTaskList();"
					@click="historyKwListTagShow=1;"
					@focus="
						historyKwListTagShow=1;
						if($store.state.login){
							$axios.get(`/cache/get?name=${'historyKwList-'+$store.state.login.userId}`)
								.then(res=>{
									if(res.data.code==0)
										if(res.data.data.value)
										historyKwList=res.data.data.value.split(',');
								})
							}
						" />
				<span v-if="kw" style="padding:0 4px 0 4px;position: absolute;right:0;line-height:35px;height:35px;display:inline-block;font-size: 12px;cursor: pointer;color:#8f8f8f;"
					@click="kw=null;">
					X
				</span>
			</span>
			<span style="font-size:14px;height: 35px;line-height: 35px;display: inline-block;border-left:1px solid #8F8F8F;">
				&#8207;
			</span>
			<span style="font-size:14px;cursor: pointer;height: 35px;line-height: 35px;display: inline-block;padding:0 5px;"
				@click="pn=1;loadTaskList()">
				搜索
			</span>
			<span style="font-size:14px;height: 35px;line-height: 35px;display: inline-block;border-left:1px solid #8F8F8F;">&#8207;</span>
			<span style="font-size:14px;cursor: pointer;height: 35px;line-height: 35px;display: inline-block;padding:0 5px;"
				@click="
					defaultSort=1;
					kw=null;status='1';type='';
					sort={
						orderNo:'asc',
						autoRedoTomorrowIs:'desc',
						finalTime:'asc',
						insertTime:'desc',
					};
					pn=1;loadTaskList()
					">
				重置
			</span>
			<span style="font-size:14px;height: 35px;line-height: 35px;display: inline-block;border-left:1px solid #8F8F8F;">
				&#8207;
			</span>

			<span style="margin-right:50px;font-size:14px;"></span>
			<span style="position: absolute;right:0px;height: 35px;background-color: #ffffff;">
				<span style="font-size:14px;height: 35px;line-height: 35px;display: inline-block;border-left:1px solid #8F8F8F;">
					&#8207;
				</span>
				<span style="text-align: center;font-weight: 900;font-size:14px;cursor: pointer;height: 35px;line-height: 35px;display: inline-block;padding:0 5px;">
					· · ·
				</span>
			</span>
		</div>

		<div class="scrollbar" style="height:38px;line-height: 35px;white-space: nowrap;overflow-x: scroll;overflow-y: hidden;">
			<span style="font-size:14px;cursor: pointer;height: 35px;line-height: 35px;display: inline-block;padding:0 5px;background-color: #d8d5d5;"
				@click="faBuRenUserId=null;pn=1;loadTaskList();">
				发布人
			</span>
			<span style="font-size:14px;height: 35px;line-height: 35px;display: inline-block;border-left:1px solid #8F8F8F;">
				&#8207;
			</span>
			<span>
				<span style="font-size:14px;cursor: pointer;height: 35px;line-height: 35px;display: inline-block;padding:0 5px;min-width:25px;text-align: center;"
					:style="{'background-color':faBuRenUserId==$store.state.login.userId?'#d8d5d5':'#ffffff'}"
					@click="
						if(faBuRenUserId==$store.state.login.userId)
							faBuRenUserId=null;
						else
							faBuRenUserId=$store.state.login.userId;
						pn=1;loadTaskList();
						">
					我
				</span>
				<span style="font-size:14px;height: 35px;line-height: 35px;display: inline-block;border-left:1px solid #8F8F8F;">
					&#8207;
				</span>
			</span>
			<span v-for="(item,i) in faBuRenList" >
				<span style="font-size:14px;cursor: pointer;height: 35px;line-height: 35px;display: inline-block;padding:0 5px;min-width:25px;max-width:100px;text-align: center;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;    vertical-align: top;"
					:style="{'background-color':faBuRenUserId==item.faBuRenUserId?'#d8d5d5':'#ffffff'}"
					@click="
						if(faBuRenUserId==item.faBuRenUserId)
							faBuRenUserId=null;
						else
							faBuRenUserId=item.faBuRenUserId;
						pn=1;loadTaskList();
						">
					{{item.followAlias||item.nickname}}
				</span>
				<span style="font-size:14px;height: 35px;line-height: 35px;display: inline-block;border-left:1px solid #8F8F8F;">
					&#8207;
				</span>
			</span>
			<span style="margin-right:50px;font-size:14px;"></span>
			<span style="position: absolute;right:0px;height: 35px;background-color: #ffffff;">
				<span style="font-size:14px;height: 35px;line-height: 35px;display: inline-block;border-left:1px solid #8F8F8F;">
					&#8207;
				</span>
				<span style="text-align: center;font-weight: 900;font-size:14px;cursor: pointer;height: 35px;line-height: 35px;display: inline-block;padding:0 5px;">
					· · ·
				</span>
			</span>
		</div>

		<div class="scrollbar" style="height:38px;line-height: 35px;white-space: nowrap;overflow-x: scroll;overflow-y: hidden;">
			<span style="font-size:14px;cursor: pointer;height: 35px;line-height: 35px;display: inline-block;padding:0 5px;background-color: #d8d5d5;"
				@click="fuZeRenUserId=null;pn=1;loadTaskList();">
				负责人
			</span>
			<span style="font-size:14px;height: 35px;line-height: 35px;display: inline-block;border-left:1px solid #8F8F8F;">
				&#8207;
			</span>
			<span>
				<span style="font-size:14px;cursor: pointer;height: 35px;line-height: 35px;display: inline-block;padding:0 5px;min-width:25px;text-align: center;"
					:style="{'background-color':fuZeRenUserId==$store.state.login.userId?'#d8d5d5':'#ffffff'}"
					@click="
						if(fuZeRenUserId==$store.state.login.userId)
							fuZeRenUserId=null;
						else
							fuZeRenUserId=$store.state.login.userId;
						pn=1;loadTaskList();
						">
					我
				</span>
				<span style="font-size:14px;height: 35px;line-height: 35px;display: inline-block;border-left:1px solid #8F8F8F;">
					&#8207;
				</span>
			</span>

			<span v-for="(item,i) in fuZeRenList" >
				<span style="font-size:14px;cursor: pointer;height: 35px;line-height: 35px;display: inline-block;padding:0 5px;min-width:25px;max-width:100px;text-align: center;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;    vertical-align: top;"
					:style="{'background-color':fuZeRenUserId==item.fuZeRenUserId?'#d8d5d5':'#ffffff'}"
					@click="
						if(fuZeRenUserId==item.fuZeRenUserId)
							fuZeRenUserId=null;
						else
							fuZeRenUserId=item.fuZeRenUserId;
						pn=1;loadTaskList();
						">
					{{item.followAlias||item.nickname}}
				</span>
				<span style="font-size:14px;height: 35px;line-height: 35px;display: inline-block;border-left:1px solid #8F8F8F;">
					&#8207;
				</span>
			</span>

			<span style="margin-right:50px;font-size:14px;"></span>
			<span style="position: absolute;right:0px;height: 35px;background-color: #ffffff;">
				<span style="font-size:14px;height: 35px;line-height: 35px;display: inline-block;border-left:1px solid #8F8F8F;">
					&#8207;
				</span>
				<span style="text-align: center;font-weight: 900;font-size:14px;cursor: pointer;height: 35px;line-height: 35px;display: inline-block;padding:0 5px;">
					· · ·
				</span>
			</span>
		</div>

		<div class="scrollbar" style="padding:3px 0px 3px 5px;box-shadow: 0px 1px 1px 0px #888888;white-space: nowrap;overflow: auto;">
			<span style="font-size: 14px;color: #008000;font-weight: 600;">{{$moment($store.state.now).format('周d, MM-DD, HH:mm:ss').replace('周0','周7').replace('周','')}}</span>
			<span style="font-size: 14px;color: #8f8f8f;margin-left:15px;" >共 {{$attr(taskListSum,'itemCount')}} 条记录</span>
		</div>
		<div class="scrollbarNone" ref="taskListTag" @scroll="taskListTagScroll($event)"
			style="overflow: auto;width:100%;position: absolute;
			top: 144px;bottom: 89px;">
			<div v-for="(item,i) in taskList" style="border:1px solid #8f8f8f;margin:5px;padding:5px;cursor: pointer;" class="active"
				@click="
					debugger;
					$($event.currentTarget).css('background-color','#e6e4e4');
					lookedTask=item;
					$router.push({path:'/task',query:{time:new Date().getTime()+'',taskId:item.taskId}})
					" >
				<div style="font-size: 16px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;" v-html="$kwMark(item.name,kw)"></div>
				<div v-if="item.lastTaskTrackContent" style="margin-top:3px;color:#8f8f8f;font-size: 14px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{item.lastTaskTrackContent}}</div>
				<div style="position: relative;margin-top:3px;color:#8f8f8f;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
					<span style="font-size: 14px;">
						{{$moment(item.insertTime).format(new Date().getFullYear()==new Date(item.insertTime).getFullYear()? '周d, MM-DD, HH:mm': '周d, MM-DD, HH:mm, YYYY').replace('周0','周7').replace('周','')}}
					</span>
					<span v-if="!(item.fuZeRenUserId==item.faBuRenUserId && item.faBuRenUserId==$attr($store.state.login,'userId'))" style="margin-left:15px;">
						<span style="font-size: 14px;display:inline-block;max-width:50px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: bottom;">
							{{item.faBuRenUserId==$attr($store.state.login,"userId")?'我':(item.faBuRenUserAlias||item.faBuRenUserNickname)}}
						</span>
						<span style="font-size: 14px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: bottom;">&nbsp;>&nbsp;</span>
						<span style="font-size: 14px;display:inline-block;max-width:50px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: bottom;">
							{{item.fuZeRenUserId==$attr($store.state.login,"userId")?'我':(item.fuZeRenUserAlias||item.fuZeRenUserNickname)}}
						</span>
					</span>
					<span v-if="item.autoRedoTomorrowIs" style="margin-left:15px;font-size: 14px;">日常</span>
					<span v-if="item.finalTime" style="margin-left:15px;font-size: 14px;"
					 :style="{color:new Date(item.finalTime).getTime()>=new Date().getTime()?'#ff6700':'#ff0000'}">
						{{item.finalTime?('限: '+$moment(item.finalTime).format(new Date().getFullYear()==new Date(item.finalTime).getFullYear()? "周d, MM-DD, HH:mm": "周d, MM-DD, HH:mm, YYYY").replace(/周0/g,'周7').replace(/周/g,'')):''}}
					</span>
					<span style="right:0;position: absolute;;font-size: 14px;">{{item.orderNo}}</span>
				</div>
			</div>

			<div style="margin:5px 0;">
				<div v-if="loading" style="font-size:12px;text-align: center;color:#6d6a6a;">加载中</div>
				<div v-if="!loading && maxPn && pn<maxPn" style="font-size:12px;text-align: center;color:#6d6a6a;"
				@click="pn++;loadTaskList();">
					点击加载更多
				</div>
				<div v-if="!loading && maxPn && pn==maxPn" style="font-size:12px;text-align: center;color:#6d6a6a;">全部加载完成</div>
				<div v-if="!loading && pn==1 && (!taskList || taskList.length==0)" style="font-size:12px;text-align: center;color:#6d6a6a;">暂无数据</div>
			</div>
		</div>

		<div 
			style="position: absolute;bottom: 0;left: 0px;right: 0px;
			background-color: rgb(255, 255, 255);box-shadow: rgb(136, 136, 136) 0px 0px 1px 0px;border-top: 1px solid #afaeae;">
			<div style="height:35px;line-height:35px;border-bottom:1px solid #8F8F8F;">
				<span style="line-height:35px;height:35px;text-align: center;cursor: pointer;font-weight: 900;font-size: 14px;width:50%;display: inline-block;"
					@click="$router.push({path:'/insert-task',query:{time:new Date().getTime()+''}})">
					发任务 +
				</span>
				<span style="position: absolute;font-size:14px;height: 35px;line-height: 35px;display: inline-block;border-left:1px solid #8F8F8F;">
					&#8207;
				</span>
				<span style="line-height:35px;height:35px;text-align: center;cursor: pointer;font-weight: 900;font-size: 14px;width:50%;display: inline-block;">
					去记录 +
				</span>
			</div>
			<div style="height: 50px;line-height: 50px;position: relative;">
				<span 
					style="display: inline-block;font-size: 14px;width: 20%;text-align: center;
					cursor: pointer;background-color: rgb(255, 127, 8);"
					@click="$router.replace({path:'/index',query:{time:new Date().getTime()+''}})">
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
					cursor: pointer;"
					@click="$router.replace({path:'/friend-list',query:{time:new Date().getTime()+''}})">
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
					cursor: pointer;"
					@click="$router.replace({path:'/me',query:{time:new Date().getTime()+''}})">
					我
				</span>
			</div>
		</div>
		

		<div v-if="historyKwListTagShow" 
			@click="
			if($event.currentTarget==$event.target) {
				historyKwListTagShow=0;
			}"
			style="width: 100%;position: absolute;top: 35px;bottom: 0px;background-color: rgba(0, 0, 0, 0.53);">
			<div style="min-height: 80px;padding:0 10px 10px 10px;background-color:#ffffff;border-top:1px solid #8f8f8f;">
				<span v-for="(item,i) in historyKwList" style="margin: 10px 15px 0px 0px;height:30px;display: inline-block;background-color: rgb(229, 229, 229);cursor: pointer;">
					<span style="max-width:100px;height:30px;line-height:30px;font-size: 14px;display: inline-block;background-color: rgb(229, 229, 229);overflow: hidden;text-overflow: ellipsis;white-space: nowrap;padding: 0 10px 0 5px;"
						@click="kw=item;historyKwListTagShow=0;loadTaskList();">
						{{item}}
					</span>
					<span style="font-size: 14px;height:28px;line-height:28px;display: inline-block; padding: 0 2px; vertical-align: bottom; background-color: rgb(255, 255, 255); color: rgb(143, 143, 143); border: 1px solid rgb(229, 229, 229);"
						@click="
						historyKwList.splice(historyKwList.indexOf(item),1)
						if($store.state.login){
							$axios.post('/cache/set',$qs.stringify({name:'historyKwList-'+$store.state.login.userId,value:historyKwList.join()}))
						}">
						X
					</span>
				</span>
				<div style="text-align: center;margin-top: 20px;">
					<span style="padding:0 10px;height:26px;line-height:26px;display:inline-block;font-size: 14px;cursor: pointer;text-align: center;color: #8f8f8f;border: 1px dashed #8f8f8f;"
						v-if="historyKwList && historyKwList.length>0" 
						@click="
						historyKwList=[];
						if($store.state.login){
							$axios.post('/cache/set',$qs.stringify({name:'historyKwList-'+$store.state.login.userId,value:historyKwList.join()}))
						}
						">
					清空历史记录 X
					</span>
					<span v-if="!historyKwList || historyKwList.length<=0" style="padding:0 10px;height:26px;line-height:26px;font-size: 14px;cursor: pointer;text-align: center;color: #8f8f8f;">
						暂无历史记录
					</span>
				</div>
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
				fuZeRenUserId:null,
				faBuRenUserId:null,
				type:"",
				status:1,
				sort:{
					orderNo:'asc',
					autoRedoTomorrowIs:'desc',
					finalTime:'asc',
					insertTime:'desc',
				},
				defaultSort:1,
				maxPn:null,
				pn:1,
				ps:15,
				faBuRenList:[],
				fuZeRenList:[],
				taskList:[],
				taskListSum:null,
				loading:0,
				lookedTask:null,
				historyKwList:[],
				historyKwListTagShow:0,
				taskListTagScrollTop:null,
			}
		},//data
		activated() {
			debugger
			let thisV = this
			window.thisV=thisV;
			if (thisV.query != JSON.stringify(thisV.$route.query)) {
				thisV.reload();

				thisV.query = JSON.stringify(thisV.$route.query);
			}else{
				thisV.$refs.taskListTag.scrollTop=thisV.taskListTagScrollTop

				if(thisV.lookedTask){
					thisV.$axios.get(`/my-task/task?taskId=${thisV.lookedTask.taskId}`).then(res => {
							if(res.data.code==0){
								let o =res.data.data;
								thisV.lookedTask.name=o.name;
								thisV.lookedTask.finalTime=o.finalTime;
								thisV.lookedTask.autoRedoTomorrowIs=o.autoRedoTomorrowIs;
								thisV.lookedTask.faBuRenUserId=o.faBuRenUserId;
								thisV.lookedTask.faBuRenUserNickname=o.faBuRenUserNickname;
								thisV.lookedTask.fuZeRenUserId=o.fuZeRenUserId;
								thisV.lookedTask.fuZeRenUserNickname=o.fuZeRenUserNickname;
								thisV.lookedTask.lastTaskTrackId=o.lastTaskTrackId;
								thisV.lookedTask.lastTaskTrackContent=o.lastTaskTrackContent;
								thisV.lookedTask.lastTaskTrackinsertTime=o.lastTaskTrackinsertTime;
								thisV.lookedTask.completeIs=o.completeIs;
								thisV.lookedTask.cancelIs=o.cancelIs;
								thisV.lookedTask.orderNo=o.orderNo;
							}else if (res.data.code==1404){
								thisV.itemCount--;
								thisV.taskList.splice(thisV.taskList.indexOf(thisV.lookedTask),1)
							}
						})
				}
			}
		},//activated
		methods: {
			reload() {
				debugger
				let thisV = this
				Object.assign(thisV.$data, thisV.$options.data());

				if(!thisV.$store.state.login){
					thisV.$axios.post('/logout').then(res => {
							thisV.$store.state.login=null;
							thisV.$router.push({path:'/login',query:{time:new Date().getTime()+""}})
						})
				}

				

				thisV.$axios.get('/my-task/my-faburen-list').then(res => {
					debugger
					if (res.data.code == 0) {
						if(res.data.data.itemList.length>0)
							thisV.faBuRenList=thisV.faBuRenList.concat(res.data.data.itemList)
					}
				})

				thisV.$axios.get('/my-task/my-fuzeren-list').then(res => {
					debugger
					if (res.data.code == 0) {
						if(res.data.data.itemList.length>0)
							thisV.fuZeRenList=thisV.fuZeRenList.concat(res.data.data.itemList)
					}
				})

				thisV.loadTaskList();
			},//reload
			taskListTagScroll(event){
				debugger
				let thisV = this
				thisV.taskListTagScrollTop=event.target.scrollTop;
				if((event.target.scrollTop+thisV.$(event.target).height())>=event.target.scrollHeight) {
					thisV.pn++;
					thisV.queryHistoryPad=0;thisV.loadTaskList()
				}
			},//taskListTagScroll
			loadTaskList(){
				debugger
				let thisV = this
				thisV.kw=thisV.kw?thisV.kw.trim():thisV.kw;
				if(thisV.kw && thisV.historyKwList.indexOf(thisV.kw)==-1){
					thisV.historyKwList.splice(0,0,thisV.kw)
					if(thisV.$store.state.login){
						thisV.$axios.post('/cache/set',thisV.$qs.stringify({name:'historyKwList-'+thisV.$store.state.login.userId,value:thisV.historyKwList.join()}))
					}
				}

				

				let v ={
					kw:thisV.kw,
					pn:thisV.pn,
					ps:thisV.ps,
					fuZeRenUserId:thisV.fuZeRenUserId,
					faBuRenUserId:thisV.faBuRenUserId,
					type:thisV.type,
					completeIs:thisV.status==''?null:thisV.status==2?1:0,
					cancelIs:thisV.status==''?null:thisV.status==3?1:0,
				}

			 	v.sort = ''
				v.order = ''
				for(let t in thisV.sort){
					if(!thisV.sort[t])
						continue;
					v.sort=v.sort+','+t
					v.order=v.order+','+thisV.sort[t]
				}
				v.sort=v.sort.substring(1)
				v.order=v.order.substring(1)



				thisV.loading=1
				if(thisV.pn==1)
					thisV.taskList=[]
				thisV.$axios.get('/my-task/task-list?'+thisV.$qs.stringify(v)).then(res => {
					debugger
					if (res.data.code == 0) {
						if(res.data.data.itemList.length>0){
							thisV.taskList=thisV.taskList.concat(res.data.data.itemList)
						}else {
							thisV.pn=thisV.pn>1?--thisV.pn:thisV.pn;
						}
					}else{
						thisV.pn=thisV.pn>1?--thisV.pn:thisV.pn;
					}
					thisV.loading=0
				})
				thisV.$axios.get('/my-task/task-list-sum?'+thisV.$qs.stringify(v)).then(res => {
					debugger
					if (res.data.code == 0) {
						thisV.taskListSum=res.data.data
						thisV.maxPn=parseInt(thisV.taskListSum.itemCount/thisV.ps)+(thisV.taskListSum.itemCount%thisV.ps==0?0:1)
					}
				})
			}//loadTaskList
		}//methods
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

</style>