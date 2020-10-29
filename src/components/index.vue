<template>
	<div id="index" style="font-size: 0;height:100%;padding:1px 0 0 0;margin-top: -1px;position: relative;">
		<div style="height: 30px;border-bottom:1px solid #8f8f8f;">
			<span style="width:50%;line-height: 30px;font-size: 16px;display:inline-block;border-right:1px solid #8f8f8f;position: relative;">
				<svg t="1591346902986" style="position: absolute;left:1%;top:8px;" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2627" width="15" height="15"><path d="M830.486464 796.124515 672.790943 638.42797c44.959904-52.799318 72.109099-121.232412 72.109099-196.016087 0-167.084182-135.448007-302.533214-302.53219-302.533214s-302.533214 135.449031-302.533214 302.533214 135.449031 302.53219 302.533214 302.53219c74.782651 0 143.215745-27.149196 196.017111-72.109099L796.101988 830.531518c9.499249 9.499249 24.885227 9.499249 34.384476 0S839.986737 805.623764 830.486464 796.124515zM442.366829 698.401131c-141.380814 0-255.989248-114.631985-255.989248-255.989248 0-141.403341 114.608434-255.989248 255.989248-255.989248 141.37979 0 255.989248 114.585907 255.989248 255.989248C698.356077 583.769146 583.747643 698.401131 442.366829 698.401131z" p-id="2628" fill="#8a8a8a"></path></svg>
				<input v-model="kw" type="text" style="line-height: 28px;width:83%;border:none;margin-left:8%;"
					@focus="
						if(queryHistory.kws)
							return;
						queryHistory.kws=[];
						queryHistory.run=1;
						if($store.state.login){
							$axios.get(`/recording/cache/get?name=${'queryHistory.kws-'+$store.state.login.userId}`)
								.then(res=>{
									if(res.data.code==0)
										if(res.data.data.value)
											queryHistory.kws=res.data.data.value.split(',');
								})
						}
					" 
					@click="queryHistory.run=1;"
					@keyup.enter="pn=1;tasks=[];queryHistory.run=0;loadTasks();" 
				/>
				<span v-if="kw" style="font-size: 16px;cursor: pointer;color: #8f8f8f;position: absolute;right:0px;top:0px;width: 20px;text-align: center;" 
					@click="kw=null;">
					X
				</span>
			</span>
			<span class="active" @click="pn=1;tasks=[];queryHistory.run=0;loadTasks();"
				style="width: 32px;line-height: 30px;padding:0 5px;font-size: 16px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;">
				搜索
			</span>
			<span class="active" 
				@click="sort=order=cancelIs=completeIs=kw=null,type=status='',pn=1;tasks=[];queryHistory.run=0;loadTasks()" 
				style="width: 32px;line-height: 30px;padding:0 5px;font-size: 16px;cursor: pointer;display:inline-block;
					border-right:1px solid #8f8f8f;">
				重置
			</span>
		</div>
		<div class="scrollbar1" style="position: relative;white-space: nowrap;overflow-x: scroll;overflow-y: hidden;height: 30px;padding-right: 50px;">
			<!-- <span class="active"
				@click="
					order=sort=='createTime'?order:null;
					sort='createTime';
					order=!order?'desc':order=='desc'?'asc':order=='asc'?'':null;
					sort=order?sort:null;
					pn=1;tasks=[];queryHistory.run=0;loadTasks();
				"
				:style="{color:sort=='createTime'?'red':'#000000'}"
				style="width: 52px;line-height: 26px;padding:0 5px;font-size: 16px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;">
				时间
				<span v-if="sort=='createTime' && order=='asc'">&nbsp;&and;</span>
				<span v-if="sort=='createTime' && order=='desc'">&nbsp;&or;</span>
				<span v-if="sort!='createTime' || !order">&nbsp;&nbsp;</span>
			</span> -->
			<span class="active"
				@click="
					order=sort=='finalTime'?order:null;
					sort='finalTime';
					order=!order?'desc':order=='desc'?'asc':order=='asc'?'':null;
					sort=order?sort:null;
					pn=1;tasks=[];queryHistory.run=0;loadTasks();
				"
				:style="{color:sort=='finalTime'?'red':'#000000'}"
				style="width: 52px;line-height: 26px;padding:0 5px;font-size: 16px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;;">
				限期
				<span v-if="sort=='finalTime' && order=='asc'">&nbsp;&and;</span>
				<span v-if="sort=='finalTime' && order=='desc'">&nbsp;&or;</span>
				<span v-if="sort!='finalTime' || !order">&nbsp;&nbsp;</span>
			</span>
		
			<span style="width: 81px;vertical-align: top;line-height: 26px;height: 26px;font-size: 16px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;">
				<select class="active" v-model="status" :style="{color:status?'red':'#000000'}" @change="pn=1;tasks=[];queryHistory.run=0;loadTasks()" 
					style="background-color: #ffffff;font-size: 16px;height:26px;border:none;cursor: pointer;padding: 0px 5px;">
					<option value=''>状态</option>
					<option value="1">进行中</option>
					<option value="2">已完成</option>
					<option value="3">已撤销</option>
				</select>
			</span>

			<span style="width: 64px;vertical-align: top;line-height: 26px;height: 26px;font-size: 16px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;">
				<select class="active" v-model="type" :style="{color:type?'red':'#000000'}" @change="pn=1;tasks=[];queryHistory.run=0;loadTasks()" 
					style="background-color: #ffffff;font-size: 16px;height:26px;border:none;cursor: pointer;padding:0 5px;">
					<option value=''>类型</option>
					<option value="1">推进</option>
					<option value="2">缺陷</option>
				</select>
			</span>
			<span class="active" style="font-weight: 900;background-color:#fff;line-height: 26px;padding:0px 8px;font-size: 16px;cursor: pointer;display:inline-block;
				position: absolute;right:0px;top:0px;border-left:1px solid #8f8f8f;">
				···
			</span>
		</div>
		
		<div class="n1-line" style="height:30px;line-height:30px;border-bottom:1px solid #8f8f8f;position: relative;">
			<span class="active" @click="faQiRenUserId=null;tasks=[],pn=1;queryHistory.run=0;loadTasks();" 
				style="width: 48px;padding:0 5px;font-size: 16px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;background-color: #d8d5d5;vertical-align: top;">
				发起人
			</span>
			<span class="active"
				@click="
					debugger;
					faQiRenUserId=faQiRenUserId == $o($store.state.login).attr('userId') ?null : $o($store.state.login).attr('userId');
					tasks=[],pn=1;
					queryHistory.run=0;loadTasks();
				" 
				style="width: 20px;padding:0px 8px;font-size: 16px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;min-width: 20px;text-align: center;
					vertical-align: top;"
				:style="{'background-color':(faQiRenUserId==$o($store.state.login).attr('userId')?'#d8d5d5':'#ffffff')}" >
				我
			</span>
			<span class="active" v-for="item in faQiRens" :key="item.userId" v-if="item.userId != $o($store.state.login).attr('userId')"
				@click="
					debugger;
					faQiRenUserId=faQiRenUserId == item.userId ? null:item.userId;
					tasks=[],pn=1;
					queryHistory.run=0;loadTasks();" 
				:style="{'background-color':(faQiRenUserId==item.userId?'#d8d5d5':'#ffffff')}" 
				style="padding:0 8px;font-size: 16px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;min-width: 20px;text-align: left;
					overflow: hidden;text-overflow:ellipsis;max-width:60px;vertical-align: baseline;">
				{{item.alias||item.nickname}}
			</span>
			<span class="active" style="background-color: #fff;font-weight: 900;padding:0 8px;font-size: 16px;cursor: pointer;display:inline-block;
					border-left:1px solid #8f8f8f;position: absolute;right:0px;top:0px;">
				···
			</span>
		</div>
		<div class="n1-line" style="width:100%;height:30px;line-height:30px;border-bottom:1px solid #8f8f8f;position: relative;overflow: hidden;text-overflow:ellipsis;">
			<span  class="active" @click="fuZeRenUserId=null;tasks=[],pn=1;queryHistory.run=0;loadTasks();"  
				style="width: 48px;padding:0 5px;font-size: 16px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;background-color: #d8d5d5;vertical-align: top;">
				负责人
			</span>
			<span class="active"
				@click="
					fuZeRenUserId=fuZeRenUserId == $o($store.state.login).attr('userId') ?null : $o($store.state.login).attr('userId');
					tasks=[],pn=1;
					queryHistory.run=0;loadTasks();
				" 
				style="width: 20px;padding:0px 8px;font-size: 16px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;min-width: 20px;text-align: center;
					vertical-align: top;"
				:style="{'background-color':(fuZeRenUserId==$o($store.state.login).attr('userId')?'#d8d5d5':'#ffffff')}" >
				我
			</span>
			<span class="active" v-for="item in fuZeRens" :key="item.userId" v-if="item.userId != $o($store.state.login).attr('userId')"
				@click="
					fuZeRenUserId=fuZeRenUserId == item.userId ? null:item.userId;
					tasks=[],pn=1;
					queryHistory.run=0;loadTasks();
				" 
				style="padding:0 8px;font-size: 16px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;min-width: 20px;text-align: left;
					overflow: hidden;text-overflow:ellipsis;max-width:60px;vertical-align: baseline;"
				:style="{'background-color':(fuZeRenUserId==item.userId?'#d8d5d5':'#ffffff')}" >
				{{item.alias||item.nickname}}
			</span>
			<span class="active" style="background-color: #fff;font-weight: 900;padding:0 8px;font-size: 16px;cursor: pointer;display:inline-block;border-left:1px solid #8f8f8f;position: absolute;right:0px;top:0px;">
				···
			</span>
		</div>
		<div style="padding:5px 5px 5px 5px;box-shadow: 0px 1px 1px 0px #888888;height: 15px;">
			<span style="font-size: 16px;color: #008000;font-weight: 600;line-height:16px;">
				{{$moment($store.state.now).format('M-D. E')}}
			</span>
			<span style="font-size: 16px;color: #8f8f8f;margin-left:15px;line-height:16px;" >
				总数:{{ $o(tasksSum).attr('count')}}
			</span>
		</div>
		<div class="scrollbar" @scroll="tasksScroll($event)" ref="tasks" style="overflow: auto;width:100%;position: absolute;top: 150px;bottom: 88px;">
			<div :key="item.taskId" v-for="item in tasks" class="active visited"
				@click="
					debugger;
					//$($event.currentTarget).css('background-color','#e6e4e4');
					$store.state.chosenTask=item;
					$router.push({path:'/task',query:{taskId:item.taskId,reload:1}})
				" 
				style="padding:3px 5px;;border:1px solid #8F8F8F;margin:5px;cursor:pointer;position: relative;" 
				:style="{'background-color':(item.completeIs?'#ffe063':item.cancelIs?'#d5d5d5':'#FFFFFF')}">
				<div style="font-size:16px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;height:21px;line-height: 21px;" v-html="$highlight(item.content,kw)">
				</div>
				<div v-if='item.lastTrackContent' style="font-size:15px;line-height: 15px;color:#8F8F8F;margin-top:3px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;">
					{{item.lastTrackContent}}
				</div>
				<div style="position:relative;margin-top:5px;height:15px;line-height: 15px;">
					<span style="font-size:12px;color:#8F8F8F;max-width:45px;display:inline-block;vertical-align: top;">
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
					<span style="margin-left:15px;"
						v-if="
							item.faQiRenUserId && 
							item.fuZeRenUserId && 
							(
								item.faQiRenUserId != $o($store.state.login).attr('userId') ||
								item.fuZeRenUserId != $o($store.state.login).attr('userId')
							)
						">
						<span class="n1-line" v-if="item.faQiRenUserId && item.faQiRenUserId != $o($store.state.login).attr('userId')"
							style="font-size:12px;color:#8F8F8F;display:inline-block;max-width:48px;vertical-align: top;margin-right: 5px;">
							{{item.faQiRenAlias || item.faQiRenNickname}}
						</span>
						<span
							style="font-size:12px;color:#8F8F8F;display: inline-block;vertical-align: top;">
							>
						</span>
						<span class="n1-line" v-if="item.fuZeRenUserId && item.fuZeRenUserId != $o($store.state.login).attr('userId')" 
							style="font-size:12px;color:#8F8F8F;display:inline-block;max-width:48px;margin-left:5px;vertical-align: top;">
							{{item.fuZeRenAlias || item.fuZeRenNickname}}
						</span>
					</span>
					<span v-if="item.finalTime" style="font-size:12px;margin-left:15px;max-width:105px;display:inline-block;vertical-align: top;" 
						:style="{color: (item.completeIs||item.cancelIs)?'#8F8F8F':item.finalTime>$store.state.now.getTime()?'#ff5500':'#ff0000'}">
						{{
							item.finalTime?(
								'终:' + $moment(item.finalTime).format(
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
			<div v-if="loading"  style="font-size:12px;text-align: center;color:#8F8F8F;margin-bottom:10px;margin-top: 10px;">
				加载中
			</div>
			<div class="active-text unselectable" v-if="!loading && tasks.length<$o(tasksSum).attr('count')" @click="pn++;queryHistory.run=0;loadTasks();" 
				style="font-size:12px;text-align: center;color:#8F8F8F;margin-bottom:10px;margin-top: 10px;cursor: pointer;">
				点击加载更多
			</div>
			<div  v-if="!loading && !(tasks.length<$o(tasksSum).attr('count'))" style="font-size:12px;text-align: center;color:#8F8F8F;margin-bottom:10px;margin-top: 10px;">
				已全部加载
			</div>
		</div>
		<div style="height:91px;position:absolute;bottom:0;left:0;right:0;background-color: #FFFFFF;box-shadow: 0px 0 4px 0px #888888;">
			<div class="active" style="font-size:16px;height:40px;line-height: 40px;text-align: center;cursor:pointer;font-weight: 900;"
				@click="$router.push({path:'/create-task',query:{reload:1}})">
				新 任 务 +
			</div>
			<div class="n1-line scrollbar1" style="height:50px;position: relative;border-top:1px solid #8F8F8F;overflow-x: auto;">
				<span @click="$router.replace({path:'/index'})"
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
				<span @click="$router.replace({path:'/friends'})"
					style="line-height:50px;font-size:14px;width:14%;display:inline-block;text-align: center;cursor:pointer;vertical-align: middle;">
					好 友
				</span>
				<span style="border-left:1px solid #808080;display:inline-block;line-height:15px;font-size: 16px;height:15px;vertical-align: middle;"></span>
				<span style="line-height:50px;font-size:16px;width:14%;display:inline-block;text-align: center;cursor:pointer;vertical-align: middle;">
					消 息
				</span>
				<span style="border-left:1px solid #808080;display:inline-block;line-height:15px;font-size: 16px;height:15px;vertical-align: middle;"></span>
				<span @click="$router.replace({path:'/me'})"
					style="line-height:50px;font-size:16px;width:14%;display:inline-block;text-align: center;cursor:pointer;vertical-align: middle;">
					我
				</span>
			</div>
		</div>

		<!-- 搜索历史 -->
		<div v-if="queryHistory.run" 
			@click="
				if($event.currentTarget==$event.target) {
					queryHistory.run=0;
				}
			" 
			style="position: absolute;top:32px;bottom:0;width:100%;background-color: #00000087;">
			<div style="background-color: #ffffff;padding:0 10px 10px 10px;min-height:100px;">
				<span v-for="(item,index) in queryHistory.kws" :key="index"
					style="margin:10px 15px 0 0;display: inline-block;background-color: #e5e5e5;cursor: pointer;">
					<span 
						@click="
							kw=item;
							pn=1;tasks=[];queryHistory.run=0;loadTasks();
						"
						style="
							font-size: 16px;display: inline-block;background-color: #e5e5e5;max-width: 200px;
							overflow:hidden;text-overflow:ellipsis;white-space: nowrap;padding:5px 10px 5px 5px;
						">
						{{item}}
					</span>

					<span 
						@click="
							queryHistory.kws.splice(queryHistory.kws.indexOf(item),1)
							if($store.state.login){
								$axios.post('/recording/cache/set',$qs.stringify({name:'queryHistory.kws-'+$store.state.login.userId,value:queryHistory.kws.join()}))
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
				<div v-if="queryHistory.kws && queryHistory.kws.length>0" 
					@click="
						queryHistory.kws=[];
						if($store.state.login){
							$axios.post('/recording/cache/set',$qs.stringify({name:'queryHistory.kws-'+$store.state.login.userId,value:queryHistory.kws.join()}))
						}
					"
					style="
						font-size: 16px;cursor: pointer;text-align: center;margin-top:10px;color:#8F8F8F;border:1px dashed #8f8f8f;
						padding: 5px;width: 120px;margin: auto;
					">
					清空历史记录
				</div>
				<div v-if="!queryHistory.kws || queryHistory.kws.length==0" 
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
				query: null,
				kw:null,
				type:'',
				completeIs:null,
				cancelIs:null,
				status:'',
				fuZeRenUserId:null,
				faQiRenUserId:null,
				tasks:null,
				tasksSum:null,
				faQiRens:null,
				fuZeRens:null,
				pn:null,
				ps:null,
				loading:null,
				scrollTop:null,
				sort:null,
				order:null,
				queryHistory:{
					run:null,
					kws:null
				}
			}
		},
		activated() {
			debugger
			let vue = this
			
			if (JSON.stringify(vue.query) != JSON.stringify(vue.$route.query)) {
				Object.assign(vue.$data, vue.$options.data());
				vue.query = vue.$route.query;
				vue.load();
			}else{
				debugger
				vue.$refs.tasks.scrollTop=vue.scrollTop
				if(vue.$store.state.chosenTask && vue.$store.state.chosenTaskDel){
					vue.tasksSum.count--;
					vue.tasks.splice(vue.tasks.indexOf(vue.$store.state.chosenTask),1)
				}
				if(vue.$store.state.createdTask){
					vue.tasksSum.count++;
					vue.tasks.unshift(vue.$store.state.createdTask)
				}
			}
			vue.$store.state.createdTask=null
			vue.$store.state.chosenTask=null
			vue.$store.state.chosenTaskDel=null
		},
		methods: {
			load() {
				debugger
				let vue = this
				
				if(!vue.$store.state.login){
					vue.$axios.post('/recording/logout').then(res => {
							vue.$store.state.login=null;
							vue.$router.push({path:'/login'})
						})
				}

				vue.queryHistory.run=0;
				vue.loadTasks()

				vue.$axios.get('/recording/my-task/my-fa-qi-rens?'+vue.$qs.stringify({sort:'orderNo',order:'asc'})).then(res => {
					debugger
					if (res.data.code == 0) {
						if(vue.faQiRens == null)
							vue.faQiRens = []
						if(res.data.data.items.length>0)
							vue.faQiRens=vue.faQiRens.concat(res.data.data.items)
					}
				})

				vue.$axios.get('/recording/my-task/my-fu-ze-rens?'+vue.$qs.stringify({sort:'orderNo',order:'asc'})).then(res => {
					debugger
					if (res.data.code == 0) {
						if(vue.fuZeRens == null)
							vue.fuZeRens = []
						if(res.data.data.items.length>0)
							vue.fuZeRens=vue.fuZeRens.concat(res.data.data.items)
					}
				})

			},
			tasksScroll(event){
				debugger
				let vue = this
				vue.scrollTop=event.target.scrollTop;
				if((event.target.scrollTop+vue.$(event.target).height())>=event.target.scrollHeight) {
					if(vue.tasks && vue.tasks.length < vue.ps)
						return;
					vue.pn++;
					vue.queryHistory.run=0;
					vue.loadTasks()
				}
			},
			loadTasks(){
				debugger
				let vue = this
				vue.loading=1
				vue.pn=vue.pn?vue.pn:1;
				vue.ps=vue.ps?vue.ps:15;

				vue.tasksSum = null;
				if(vue.status==1){
					vue.completeIs=vue.cancelIs=0
				}else if(vue.status==2){
					vue.completeIs=1
					vue.cancelIs=null
				}else if(vue.status==3){
					vue.completeIs=null
					vue.cancelIs=1
				}else{
					vue.completeIs=null
					vue.cancelIs=null
				}
				

				if(vue.kw && vue.queryHistory.kws.indexOf(vue.kw)==-1){
					vue.queryHistory.kws.splice(0,0,vue.kw)
					if(vue.$store.state.login){
						vue.$axios.post('/recording/cache/set',vue.$qs.stringify({name:'queryHistory.kws-'+vue.$store.state.login.userId,value:vue.queryHistory.kws.join()}))
					}
				}

				var param = {
					fuZeRenUserId:vue.fuZeRenUserId,
					faQiRenUserId:vue.faQiRenUserId,
					kw:vue.kw,
					cancelIs:vue.cancelIs,
					completeIs:vue.completeIs,
					type:vue.type,
					sort:vue.sort?('doing,'+vue.sort):'doing,orderNo',
					order:vue.order?('desc,'+vue.order):'desc,asc',
					pn:vue.pn,
					ps:vue.ps
				}
				vue.$axios.get('/recording/my-task/tasks?' + vue.$qs.stringify(param)).then(res => {
					debugger
					if (res.data.code == 0) {
						if(res.data.data.items.length>0){
							if(vue.pn==1)
								vue.tasks=[]
							vue.tasks=vue.tasks.concat(res.data.data.items)
						}else
							vue.pn--;
					} else {
						if(res.data.codeMsg)
							vue.$dialog.alert({ message: res.data.codeMsg });
					}
					vue.loading=0
				})
				vue.$axios.get('/recording/my-task/tasks-sum?' + vue.$qs.stringify(param)).then(res => {
					debugger
					if (res.data.code == 0) {
						vue.tasksSum=res.data.data
					} else {
						if(res.data.codeMsg)
							vue.$dialog.alert({ message: res.data.codeMsg });
					}
				})
			},
		}
	}
</script>

<style scoped>
</style>