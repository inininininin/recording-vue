<template>
	<div id="index" style="font-size: 0;height:100%;padding:1px 0 0 0;margin-top: -1px;position: relative;">
		<div style="height: 30px;border-bottom:1px solid #8f8f8f;">
			<span style="width:50%;line-height: 30px;font-size: 16px;display:inline-block;border-right:1px solid #8f8f8f;position: relative;">
				<svg t="1591346902986" style="position: absolute;left:1%;top:8px;" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2627" width="15" height="15"><path d="M830.486464 796.124515 672.790943 638.42797c44.959904-52.799318 72.109099-121.232412 72.109099-196.016087 0-167.084182-135.448007-302.533214-302.53219-302.533214s-302.533214 135.449031-302.533214 302.533214 135.449031 302.53219 302.533214 302.53219c74.782651 0 143.215745-27.149196 196.017111-72.109099L796.101988 830.531518c9.499249 9.499249 24.885227 9.499249 34.384476 0S839.986737 805.623764 830.486464 796.124515zM442.366829 698.401131c-141.380814 0-255.989248-114.631985-255.989248-255.989248 0-141.403341 114.608434-255.989248 255.989248-255.989248 141.37979 0 255.989248 114.585907 255.989248 255.989248C698.356077 583.769146 583.747643 698.401131 442.366829 698.401131z" p-id="2628" fill="#8a8a8a"></path></svg>
				<input v-model="kw" type="text" style="line-height: 28px;width:83%;border:none;margin-left:8%;"
					@focus="
						queryHistoryPad=1;
						if($store.state.login){
							axios.get(`/recording/cache/get?name=${'queryHistoryKws-'+$store.state.login.userId}`)
								.then(res=>{
									if(res.data.code==0)
										if(res.data.data.value)
											queryHistoryKws=res.data.data.value.split(',');
								})
						}
					" 
					@click="queryHistoryPad=1;"
					@keyup.enter="pn=1;tasks=[];queryHistoryPad=0;loadTasks();" 
				/>
				<span v-if="kw" style="font-size: 16px;cursor: pointer;color: #8f8f8f;position: absolute;right:0px;top:0px;width: 20px;text-align: center;" 
					@click="kw=null;">
					X
				</span>
			</span>
			<span class="active unselectable" @click="pn=1;tasks=[];queryHistoryPad=0;loadTasks();"
				style="width: 32px;line-height: 30px;padding:0 5px;font-size: 16px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;">
				搜索
			</span>
			<span class="active unselectable" @click="status=1;cancelIs='',completeIs='',sortMap.name=0,sortMap.finalHas=0,sortMap.finalTime=0,sortMap.orderNo=0,
					sortMap.createTime=0,sortMap.updateTime=0,sortMap1={},kw=null;type='',pn=1;tasks=[];queryHistoryPad=0;loadTasks()" 
				style="width: 32px;line-height: 30px;padding:0 5px;font-size: 16px;cursor: pointer;display:inline-block;
					border-right:1px solid #8f8f8f;">
				重置
			</span>
		</div>
		<div class="scrollbar1" style="position: relative;white-space: nowrap;overflow-x: scroll;overflow-y: hidden;height: 30px;padding-right: 50px;">
			<span class="active unselectable"
				@click="
					sortMap.createTime++;
					sortMap.createTime=sortMap.createTime==3?0:sortMap.createTime;
					sortMap1.createTime=sortMap.createTime;
					pn=1;tasks=[];queryHistoryPad=0;loadTasks();
				"
				:style="{color:sortMap.createTime?'red':'#000000'}"
				style="width: 52px;line-height: 26px;padding:0 5px;font-size: 16px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;">
				时间
				<span v-if="sortMap.createTime==1">&nbsp;&and;</span>
				<span v-if="sortMap.createTime==2">&nbsp;&or;</span>
				<span v-if="sortMap.createTime==0" style="visibility: hidden;">&nbsp;&or;</span>
			</span>
			<span class="active unselectable"
				@click="
					sortMap.finalTime++;
					sortMap.finalTime=sortMap.finalTime==3?0:sortMap.finalTime;
					sortMap1.finalTime=sortMap.finalTime;
					pn=1;tasks=[];queryHistoryPad=0;loadTasks();
				"
				:style="{color:sortMap.finalTime?'red':'#000000'}"
				style="width: 52px;line-height: 26px;padding:0 5px;font-size: 16px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;;">
				限期
				<span v-if="sortMap.finalTime==1">&nbsp;&and;</span>
				<span v-if="sortMap.finalTime==2">&nbsp;&or;</span>
				<span v-if="sortMap.finalTime==0" style="visibility: hidden;">&nbsp;&or;</span>
			</span>
		
			<span style="width: 81px;vertical-align: top;line-height: 26px;height: 26px;font-size: 16px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;">
				<select class="active unselectable" v-model="status" :style="{color:status?'red':'#000000'}" @change="pn=1;tasks=[];queryHistoryPad=0;loadTasks()" 
					style="background-color: #ffffff;font-size: 16px;height:26px;border:none;cursor: pointer;padding: 0px 5px;">
					<option value="">状态</option>
					<option value="1">进行中</option>
					<option value="2">已完成</option>
					<option value="3">已撤销</option>
				</select>
			</span>

			<span style="width: 64px;vertical-align: top;line-height: 26px;height: 26px;font-size: 16px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;">
				<select class="active unselectable" v-model="type" :style="{color:type?'red':'#000000'}" @change="pn=1;tasks=[];queryHistoryPad=0;loadTasks()" 
					style="background-color: #ffffff;font-size: 16px;height:26px;border:none;cursor: pointer;padding:0 5px;">
					<option value="">类型</option>
					<option value="1">推进</option>
					<option value="2">缺陷</option>
				</select>
			</span>
			<span class="active unselectable" style="font-weight: 900;background-color:#fff;line-height: 26px;padding:0px 8px;font-size: 16px;cursor: pointer;display:inline-block;
				position: absolute;right:0px;top:0px;border-left:1px solid #8f8f8f;">
				···
			</span>
		</div>
		
		<div class="n1-line" style="height:30px;line-height:30px;border-bottom:1px solid #8f8f8f;position: relative;">
			<span class="active unselectable" @click="faBuRenUserId=null;tasks=[],pn=1;queryHistoryPad=0;loadTasks();" 
				style="width: 48px;padding:0 5px;font-size: 16px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;background-color: #d8d5d5;vertical-align: top;">
				发起人
			</span>
			<span class="active unselectable"
				@click="
					debugger;
					faBuRenUserId=faBuRenUserId == $o($store.state.login).attr('userId').v ?null : $o($store.state.login).attr('userId').v;
					tasks=[],pn=1;
					queryHistoryPad=0;loadTasks();
				" 
				style="width: 20px;padding:0px 8px;font-size: 16px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;min-width: 20px;text-align: center;
					vertical-align: top;"
				:style="{'background-color':(faBuRenUserId==$o($store.state.login).attr('userId').v?'#d8d5d5':'#ffffff')}" >
				我
			</span>
			<span class="active unselectable" v-for="item in faBuRens" :key="item.userId" v-if="item.userId != $o($store.state.login).attr('userId').v"
				@click="
					debugger;
					faBuRenUserId=faBuRenUserId == item.userId ? null:item.userId;
					tasks=[],pn=1;
					queryHistoryPad=0;loadTasks();" 
				:style="{'background-color':(faBuRenUserId==item.userId?'#d8d5d5':'#ffffff')}" 
				style="padding:0 8px;font-size: 16px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;min-width: 20px;text-align: left;
					overflow: hidden;text-overflow:ellipsis;max-width:60px;vertical-align: baseline;">
				{{item.alias||item.nickname}}
			</span>
			<span class="active unselectable" style="background-color: #fff;font-weight: 900;padding:0 8px;font-size: 16px;cursor: pointer;display:inline-block;
					border-left:1px solid #8f8f8f;position: absolute;right:0px;top:0px;">
				···
			</span>
		</div>
		<div class="n1-line" style="width:100%;height:30px;line-height:30px;border-bottom:1px solid #8f8f8f;position: relative;overflow: hidden;text-overflow:ellipsis;">
			<span  class="active unselectable" @click="fuZeRenUserId=null;tasks=[],pn=1;queryHistoryPad=0;loadTasks();"  
				style="width: 48px;padding:0 5px;font-size: 16px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;background-color: #d8d5d5;vertical-align: top;">
				负责人
			</span>
			<span class="active unselectable"
				@click="
					fuZeRenUserId=fuZeRenUserId == $o($store.state.login).attr('userId').v ?null : $o($store.state.login).attr('userId').v;
					tasks=[],pn=1;
					queryHistoryPad=0;loadTasks();
				" 
				style="width: 20px;padding:0px 8px;font-size: 16px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;min-width: 20px;text-align: center;
					vertical-align: top;"
				:style="{'background-color':(fuZeRenUserId==$o($store.state.login).attr('userId').v?'#d8d5d5':'#ffffff')}" >
				我
			</span>
			<span class="active unselectable" v-for="item in fuZeRens" :key="item.userId" v-if="item.userId != $o($store.state.login).attr('userId').v"
				@click="
					fuZeRenUserId=fuZeRenUserId == item.userId ? null:item.userId;
					tasks=[],pn=1;
					queryHistoryPad=0;loadTasks();
				" 
				style="padding:0 8px;font-size: 16px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;min-width: 20px;text-align: left;
					overflow: hidden;text-overflow:ellipsis;max-width:60px;vertical-align: baseline;"
				:style="{'background-color':(fuZeRenUserId==item.userId?'#d8d5d5':'#ffffff')}" >
				{{item.alias||item.nickname}}
			</span>
			<span class="active unselectable" style="background-color: #fff;font-weight: 900;padding:0 8px;font-size: 16px;cursor: pointer;display:inline-block;border-left:1px solid #8f8f8f;position: absolute;right:0px;top:0px;">
				···
			</span>
		</div>
		<div style="padding:5px 5px 5px 5px;box-shadow: 0px 1px 1px 0px #888888;height: 15px;">
			<span style="font-size: 16px;color: #008000;font-weight: 600;line-height:16px;">
				{{$moment($store.state.now).format('M-D. E')}}
			</span>
			<span style="font-size: 16px;color: #8f8f8f;margin-left:15px;line-height:16px;" >
				总数:{{tasksCount}}
			</span>
		</div>
		<div class="scrollbar" @scroll="tasksScroll($event)" ref="tasks" style="overflow: auto;width:100%;position: absolute;top: 150px;bottom: 88px;">
			<div :key="item.taskId" v-for="item in tasks" class="active visited"
				@click="
					debugger;
					$($event.currentTarget).css('background-color','#e6e4e4');
					chooseTask=item;
					$router.push({path:'/task',query:{time:new Date().getTime()+'',taskId:item.taskId}})
				" 
				style="padding:5px;border:1px solid #8F8F8F;margin:5px;cursor:pointer;position: relative;" 
				:style="{'background-color':(item.completeIs?'#219e154d':item.cancelIs?'#ffb60085':'#FFFFFF')}">
				<div style="font-size:16px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;" v-html="$highlight(item.content,kw)">
				</div>
				<div style="font-size:15px;color:#8F8F8F;margin-top:3px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;">
					{{$o(item).attr('lastTrace.content').trim()}}
				</div>
				<div style="position:relative;margin-top:3px;">
					<span style="font-size:12px;color:#8F8F8F;max-width:45px;display:inline-block;">
						{{
							$moment(item.createTime).format(
								($moment().year()==$moment(item.createTime).year()? 'M-D': 'YY. M-D') +
								(
									$moment().isoWeekday(7).hour(23).minute(59).second(59).millisecond(999).unix() >= $moment(item.createTime).unix() &&
									$moment().isoWeekday(7).hour(23).minute(59).second(59).millisecond(999).unix()-$moment(item.createTime).unix()  < 7 * 24 * 60 * 60 ? '. E':''
								)
							)
						}}
					</span>
					<span class="n1-line" v-if="item.faBuRenUserId && item.faBuRenUserId != $o($store.state.login).attr('userId').trim()"
						style="font-size:12px;color:#8F8F8F;display:inline-block;max-width:48px;margin-left:15px;vertical-align: bottom;">
						{{item.faBuRenUserNickname}}
					</span>
					<span 
						v-if="
							item.faBuRenUserId && 
							item.fuZeRenUserId && 
							(
								item.faBuRenUserId != $o($store.state.login).attr('userId').trim() ||
								item.fuZeRenUserId != $o($store.state.login).attr('userId').trim()
							)
						"
						style="font-size:12px;color:#8F8F8F;margin-left: 5px;">
						>
					</span>
					<span class="n1-line" v-if="item.fuZeRenUserId && item.fuZeRenUserId != $o($store.state.login).attr('userId').trim()" 
						style="font-size:12px;color:#8F8F8F;display:inline-block;max-width:48px;margin-left:5px;vertical-align: bottom;">
						{{item.fuZeRenUserNickname}}
					</span>
					<span v-if="item.finalTime" style="font-size:12px;margin-left:15px;max-width:105px;display:inline-block;" 
						:style="{color: (item.completeIs||item.cancelIs)?'#8F8F8F':item.finalTime>$store.state.now.getTime()?'#ff5500':'#ff0000'}">
						{{
							item.finalTime?(
								'终: ' + $moment(item.finalTime).format(
									($moment().year()==$moment(item.finalTime).year()? 'M-D': 'YY. M-D') +
									(
										$moment().isoWeekday(7).hour(23).minute(59).second(59).millisecond(999).unix() >= $moment(item.finalTime).unix() &&
										$moment().isoWeekday(7).hour(23).minute(59).second(59).millisecond(999).unix()-$moment(item.finalTime).unix()  < 7 * 24 * 60 * 60 ? '. E':''
									)
								)
							) : ''
						}}
					</span>
					<span v-if="item.orderNo" 
						style="font-size:12px;color:#ff0000;position:absolute;right:0px;bottom: 0;width:14px;text-align: right;
							overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
						{{item.orderNo}}
					</span>
				</div>
			</div>
			<div v-if="tasks && loading"  style="font-size:12px;text-align: center;color:#8F8F8F;margin-bottom:10px;margin-top: 10px;">
				加载中
			</div>
			<div class="activeText unselectable" v-if="tasks && !loading && tasks.length<tasksCount" @click="pn++;queryHistoryPad=0;loadTasks();" 
				style="font-size:12px;text-align: center;color:#8F8F8F;margin-bottom:10px;margin-top: 10px;cursor: pointer;">
				点击加载更多
			</div>
			<div class="unselectable" v-if="tasks && !loading && !(tasks.length<tasksCount)" style="font-size:12px;text-align: center;color:#8F8F8F;margin-bottom:10px;margin-top: 10px;">
				已全部加载
			</div>
		</div>
		<div style="height:91px;position:absolute;bottom:0;left:0;right:0;background-color: #FFFFFF;box-shadow: 0px 0 4px 0px #888888;">
			<div class="active unselectable" style="font-size:16px;height:40px;line-height: 40px;text-align: center;cursor:pointer;font-weight: 900;"
				@click="$router.push({path:'/create-task',query:{time:new Date().getTime()+''}})">
				新 任 务 +
			</div>
			<div class="n1-line scrollbar1" style="height:50px;position: relative;border-top:1px solid #8F8F8F;overflow-x: auto;">
				<span @click="$router.push({path:'/index',query:{time:new Date().getTime()+''}})"
					style="line-height:50px;font-size:16px;width:14%;display:inline-block;text-align: center;cursor:pointer;
						background-color: #ff7f08;color:#ffffff;vertical-align: middle;">
					任 务
				</span>
				<span style="border-left:1px solid #808080;display:inline-block;line-height:15px;font-size: 16px;height:15px;vertical-align: middle;"></span>
				<span style="line-height:50px;font-size:16px;width:14%;display:inline-block;text-align: center;cursor:pointer;vertical-align: middle;">
					工 作
				</span>
				<span style="border-left:1px solid #808080;display:inline-block;line-height:15px;font-size: 16px;height:15px;vertical-align: middle;"></span>
				<span style="line-height:50px;font-size:16px;width:14%;display:inline-block;text-align: center;cursor:pointer;vertical-align: middle;">
					日 常
				</span>
				<span style="border-left:1px solid #808080;display:inline-block;line-height:15px;font-size: 16px;height:15px;vertical-align: middle;"></span>
				<span style="line-height:50px;font-size:16px;width:14%;display:inline-block;text-align: center;cursor:pointer;vertical-align: middle;">
					记 录
				</span>
				<span style="border-left:1px solid #808080;display:inline-block;line-height:15px;font-size: 16px;height:15px;vertical-align: middle;"></span>
				<span @click="$router.push({path:'/friends',query:{time:new Date().getTime()+''}})"
					style="line-height:50px;font-size:14px;width:14%;display:inline-block;text-align: center;cursor:pointer;vertical-align: middle;">
					好 友
				</span>
				<span style="border-left:1px solid #808080;display:inline-block;line-height:15px;font-size: 16px;height:15px;vertical-align: middle;"></span>
				<span style="line-height:50px;font-size:16px;width:14%;display:inline-block;text-align: center;cursor:pointer;vertical-align: middle;">
					消 息
				</span>
				<span style="border-left:1px solid #808080;display:inline-block;line-height:15px;font-size: 16px;height:15px;vertical-align: middle;"></span>
				<span @click="$router.push({path:'/me',query:{time:new Date().getTime()+''}})"
					style="line-height:50px;font-size:16px;width:14%;display:inline-block;text-align: center;cursor:pointer;vertical-align: middle;">
					我
				</span>
			</div>
		</div>

		<!-- 搜索历史 -->
		<div v-if="queryHistoryPad" 
			@click="
				if($event.currentTarget==$event.target) {
					queryHistoryPad=0;
				}
			" 
			style="position: absolute;top:32px;bottom:0;width:100%;background-color: #00000087;">
			<div style="background-color: #ffffff;padding:0 10px 10px 10px;min-height:100px;">
				<span v-for="(item,index) in queryHistoryKws" :key="index"
					style="margin:10px 15px 0 0;display: inline-block;background-color: #e5e5e5;cursor: pointer;">
					<span 
						@click="
							kw=item;
							pn=1;tasks=[];queryHistoryPad=0;loadTasks();
						"
					style="
						font-size: 16px;display: inline-block;background-color: #e5e5e5;max-width: 200px;
						overflow:hidden;text-overflow:ellipsis;white-space: nowrap;padding:5px 10px 5px 5px;
					">
						{{item}}
					</span>

					<span 
						@click="
							queryHistoryKws.splice(queryHistoryKws.indexOf(item),1)
							if($store.state.login){
								$axios.post('/recording/cache/set',$qs.stringify({name:'queryHistoryKws-'+$store.state.login.userId,value:queryHistoryKws.join()}))
							}
						"
						style="
							font-size: 16px;display: inline-block;padding:5px;padding: 5px 0px;
							vertical-align: bottom;background-color: #ffffff;color: #8f8f8f;border: 1px solid #e5e5e5;
						">
						X
					</span>
				</span>
				<div style="font-size: 16px;visibility: hidden;">1</div>
				<div v-if="queryHistoryKws && queryHistoryKws.length>0" 
					@click="
						queryHistoryKws=[];
						if($store.state.login){
							$axios.post('/recording/cache/set',$qs.stringify({name:'queryHistoryKws-'+$store.state.login.userId,value:queryHistoryKws.join()}))
						}
					"
					style="
						font-size: 16px;cursor: pointer;text-align: center;margin-top:10px;color:#8F8F8F;border:1px dashed #8f8f8f;
						padding: 5px;width: 120px;margin: auto;
					">
					清空历史记录
				</div>
				<div v-if="!queryHistoryKws || queryHistoryKws.length==0" 
					style="font-size: 16px;text-align: center;margin-top:10px;color:#8F8F8F;">暂无历史记录</div>
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
				queryString: '',
				kw:null,
				type:'',
				completeIs:'',
				cancelIs:'',
				status:1,
				fuZeRenUserId:null,
				faBuRenUserId:null,
				tasks:null,
				faBuRens:null,
				fuZeRens:null,
				pn:1,
				ps:15,
				tasksCount:null,
				loading:null,
				scrollTop:null,
				sortMap:{
					orderNo:0,
					finalTime:0,
					createTime:0,
					name:0
				},
				sortMap1:{
				},
				chooseTask:null,
				queryHistoryKws:[],
				queryHistoryPad:0
			}
		},
		activated() {
			debugger
			let thisV = this
			window.thisV=thisV;
			if (thisV.queryString != JSON.stringify(thisV.$route.query)) {
				thisV.reload();
				thisV.queryString = JSON.stringify(thisV.$route.query);
			}else{
				thisV.$refs.tasks.scrollTop=thisV.scrollTop
				if(thisV.chooseTask){
					thisV.$axios.get(`/recording/my-tasks?taskId=${thisV.chooseTask.taskId}`).then(res => {
						if(res.data.code==0){
							let o =res.data.data.items[0];
							thisV.chooseTask.name=o.name;
							thisV.chooseTask.finalTime=o.finalTime;
							thisV.chooseTask.faBuRenUserId=o.faBuRenUserId;
							thisV.chooseTask.faBuRenUserNickname=o.faBuRenUserNickname;
							thisV.chooseTask.fuZeRenUserId=o.fuZeRenUserId;
							thisV.chooseTask.fuZeRenUserNickname=o.fuZeRenUserNickname;
							thisV.chooseTask.vTaskTrackId=o.vTaskTrackId;
							thisV.chooseTask.vTaskTrackContent=o.vTaskTrackContent;
							thisV.chooseTask.vTaskTrackCreateTime=o.vTaskTrackCreateTime;
							thisV.chooseTask.completeIs=o.completeIs;
							thisV.chooseTask.cancelIs=o.cancelIs;
							thisV.chooseTask.orderNo=o.orderNo;
						}else if (res.data.code==1404){
							thisV.tasksCount--;
							thisV.tasks.splice(thisV.tasks.indexOf(thisV.chooseTask),1)
						}
					})
				}
			}
		},
		methods: {
			reload() {
				debugger
				let thisV = this
				Object.assign(thisV.$data, thisV.$options.data());
				if(!thisV.$store.state.login){
					thisV.$axios.post('/recording/logout').then(res => {
							thisV.$store.state.login=null;
							thisV.$router.push({path:'/login',query:{time:new Date().getTime()+""}})
						})
				}

				thisV.queryHistoryPad=0;
				thisV.loadTasks()

				thisV.$axios.get('/recording/my-tasks-fa-bu-rens?'+thisV.$qs.stringify({})).then(res => {
					debugger
					if (res.data.code == 0) {
						if(thisV.faBuRens == null)
							thisV.faBuRens = []
						if(res.data.data.items.length>0)
							thisV.faBuRens=thisV.faBuRens.concat(res.data.data.items)
					}
				})

				thisV.$axios.get('/recording/my-tasks-fu-ze-rens?'+thisV.$qs.stringify({})).then(res => {
					debugger
					if (res.data.code == 0) {
						if(thisV.fuZeRens == null)
							thisV.fuZeRens = []
						if(res.data.data.items.length>0)
							thisV.fuZeRens=thisV.fuZeRens.concat(res.data.data.items)
					}
				})

			},
			tasksScroll(event){
				debugger
				let thisV = this
				thisV.scrollTop=event.target.scrollTop;
				if((event.target.scrollTop+thisV.$(event.target).height())>=event.target.scrollHeight) {
					thisV.pn++;
					thisV.queryHistoryPad=0;thisV.loadTasks()
				}
			},
			loadTasks(){
				debugger
				let thisV = this
				thisV.loading=1
				let sorts=[]
				let orders=[]

				for(var c in thisV.sortMap1) {
					if(thisV.sortMap1[c]){
						sorts.push(c)
						orders.push(thisV.sortMap1[c]==1?'asc':thisV.sortMap1[c]==2?'desc':'asc')
					}
				}

				if(!sorts || sorts.length==0){
					sorts=['orderNo','createTime','name']
					orders=['asc','desc','asc']
				}

				thisV.tasksCount =null;
				if(thisV.status==1){
					thisV.completeIs=thisV.cancelIs=0
				}else if(thisV.status==2){
					thisV.completeIs=1
					thisV.cancelIs=null
				}else if(thisV.status==3){
					thisV.completeIs=null
					thisV.cancelIs=1
				}else{
					thisV.completeIs=null
					thisV.cancelIs=null
				}
				

				if(thisV.kw && thisV.queryHistoryKws.indexOf(thisV.kw)==-1){
					thisV.queryHistoryKws.splice(0,0,thisV.kw)
					if(thisV.$store.state.login){
						thisV.$axios.post('/recording/cache/set',thisV.$qs.stringify({name:'queryHistoryKws-'+thisV.$store.state.login.userId,value:thisV.queryHistoryKws.join()}))
					}
				}

				var obj = {
					fuZeRenUserId:thisV.fuZeRenUserId,
					faBuRenUserId:thisV.faBuRenUserId,
					kw:thisV.kw,
					cancelIs:thisV.cancelIs,
					completeIs:thisV.completeIs,
					type:thisV.type,
					sort:sorts.join(),
					order:orders.join(),
					pn:thisV.pn,
					ps:thisV.ps
				}
				thisV.$axios.get('/recording/my-tasks?' + thisV.$qs.stringify(obj)).then(data => {
					debugger
					if (data.data.code == 0) {
						if(data.data.data.items.length>0){
							if(thisV.pn==1)
								thisV.tasks=[]
							thisV.tasks=thisV.tasks.concat(data.data.data.items)
						}else
							thisV.pn--;
					} else {
						if(data.data.codeMsg)
							thisV.$notify({ type: 'danger', message: data.data.codeMsg });
					}
					thisV.loading=0
				})
				thisV.$axios.get('/recording/my-tasks-sum?' + thisV.$qs.stringify(obj)).then(data => {
					debugger
					if (data.data.code == 0) {
						thisV.tasksCount=data.data.data.itemsCount
					} else {
						if(data.data.codeMsg)
							thisV.$notify({ type: 'danger', message: data.data.codeMsg });
					}
				})
			},
		}
	}
</script>

<style scoped>
</style>