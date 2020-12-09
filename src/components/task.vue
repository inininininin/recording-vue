<template>
	<div id="create-task" class="scrollbar" style="font-size: 0;position:absolute;top:0;bottom:0;right:0;left:0;" >
		<div style="text-align: center;height:40px;line-height: 40px;border-bottom:1px solid #8F8F8f;position: absolute;
				width: 100%;top:0;background-color: #FFFFFF;">
			<span class="active"
				@click="window.history.length<=1 ? $router.push({path:'/index'}) : $router.back();"
				style="position: absolute;left:0;width:40px;cursor: pointer;font-weight: 900;font-size: 16px;">
				<
			</span>
			<span style="font-weight: 900;font-size: 16px;">任务详情</span>
		</div>
		<div class="scrollbar" style="top:41px;bottom: 302px;position: absolute;overflow:auto;width:100%;">
			<div style="font-size: 0px;width:100%;height:40px;position: relative;border-bottom: 1px solid rgb(143, 143, 143);">
				<span style="font-size: 16px;height: 40px;width:80px;display: inline-block;line-height:40px;padding:0 5px;
					overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: top;">
					任务名
				</span>
				<span style="font-size: 16px;display: inline-block;line-height: 60px;vertical-align: text-top;height: 40px;">
					<span style="display: inline-block;height:30px;border-left:1px solid #8F8F8F;"></span>
				</span>
				
				<span style="display: inline-block;line-height:40px;position: absolute;left:91px;right:0;height: 40px;">
					<span class="selectable" v-if="$o(task).attr('name')" 
						style="font-size: 16px;height: 40px;line-height: 40px;display: inline-block;margin-left: 5px;
							overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: top;">
						{{ task.name }}
					</span>
					<span class="active" 
						style="width:25px;height: 40px;line-height: 40px;display: inline-block;font-size: 16px;cursor: pointer;text-align: center;right: 0px;position: absolute;
							background-color: #e4e4e4;color: #6b6b6b;"
						@click="editName.start=1;editName.value=$o(task).attr('name');">
						<img draggable="false"  src="../assets/img/edit.png" style="width:22px;height:22px;vertical-align: middle;"/>
					</span>
				</span>
			</div>
			<div style="font-size: 0px;width:100%;height:40px;border-bottom:1px solid #8F8F8F;position: relative;">
				<span style="font-size: 16px;height: 40px;width:80px;display: inline-block;line-height:40px;padding:0 5px;
					overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: top;">
					分类
				</span>
				<span style="font-size: 16px;display: inline-block;line-height: 60px;vertical-align: text-top;height: 40px;">
					<span style="display: inline-block;height:30px;border-left:1px solid #8F8F8F;"></span>
				</span>
				
				<span style="display: inline-block;line-height:40px;position: absolute;left:91px;right:0;height: 40px;">
					<span class="selectable" v-if="$o(task).attr('name')" 
						style="font-size: 16px;height: 40px;line-height: 40px;display: inline-block;margin-left: 5px;
							overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: top;">
						{{ task.kindName }}
					</span>
					<span class="active" 
						style="width:25px;height: 40px;line-height: 40px;display: inline-block;font-size: 16px;cursor: pointer;text-align: center;right: 0px;position: absolute;
							background-color: #e4e4e4;color: #6b6b6b;"
						@click="unitEditKind_open()">
						<img draggable="false"  src="../assets/img/edit.png" style="width:22px;height:22px;vertical-align: middle;"/>
					</span>
				</span>
			</div>
			<div style="font-size: 0px;width:100%;height:40px;border-bottom:1px solid #8F8F8F;position: relative;">
				<span style="font-size: 16px;height: 40px;width:80px;display: inline-block;line-height:40px;padding:0 5px;
					overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: top;">
					发起人
				</span>
				<span style="font-size: 16px;display: inline-block;line-height: 60px;vertical-align: text-top;height: 40px;">
					<span style="display: inline-block;height:30px;border-left:1px solid #8F8F8F;"></span>
				</span>
				<span style="display: inline-block;line-height:40px;position: absolute;left:91px;right:0;height: 40px;">
					<span class="selectable" v-if="task && task.faQiRenUserId" 
						style="max-width: 100px;font-size: 16px;height: 40px;line-height: 40px;display: inline-block;margin-left: 5px;
							overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: top;">
						{{ task.faQiRenUserId==$o($store.state.login).attr('userId')?'': task.faQiRenAlias || task.faQiRenNickname }}
					</span>
					<span class="active" 
						style="width:25px;height: 40px;line-height: 40px;display: inline-block;font-size: 16px;cursor: pointer;text-align: center;right: 0px;position: absolute;
							background-color: #e4e4e4;color: #6b6b6b;"
						@click="
							editFaQiRen.start=1;
							if(editFaQiRen.currItems == null){
								editFaQiRen.pn=1;
								chooseFaQiRen_loadItems();
							}">
						<img draggable="false"  src="../assets/img/edit.png" style="width:22px;height:22px;vertical-align: middle;"/>
					</span>
				</span>
			</div>
			<div style="font-size: 0px;width:100%;height:40px;border-bottom:1px solid #8F8F8F;position: relative;">
				<span style="font-size: 16px;height: 40px;width:80px;display: inline-block;line-height:40px;padding:0 5px;
					overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: top;">
					负责人
				</span>
				<span style="font-size: 16px;display: inline-block;line-height: 60px;vertical-align: text-top;height: 40px;">
					<span style="display: inline-block;height:30px;border-left:1px solid #8F8F8F;"></span>
				</span>
				
				<span style="display: inline-block;line-height:40px;position: absolute;left:91px;right:0;height: 40px;">
					<span class="selectable" v-if="task && task.fuZeRenUserId" 
						style="max-width: 100px;font-size: 16px;height: 40px;line-height: 40px;display: inline-block;margin-left: 5px;
							overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: top;">
						{{ task.fuZeRenUserId==$o($store.state.login).attr('userId')?'':task.fuZeRenAlias || task.fuZeRenNickname }}
					</span>
					<span class="active" 
						style="width:25px;height: 40px;line-height: 40px;display: inline-block;font-size: 16px;cursor: pointer;text-align: center;right: 0px;position: absolute;
							background-color: #e4e4e4;color: #6b6b6b;"
						@click="
							editFuZeRen.start=1;
							if(editFuZeRen.currItems == null){
								editFuZeRen.pn=1;
								chooseFuZeRen_loadItems();
							}">
						<img draggable="false"  src="../assets/img/edit.png" style="width:22px;height:22px;vertical-align: middle;"/>
					</span>
				</span>
			</div>
			<div style="font-size: 0px;width:100%;height:200px;border-bottom:1px solid #8F8F8F;position: relative;">
				<span style="font-size: 16px;height: 186px;width:80px;display: inline-block;line-height:20px;padding:7px 5px 7px 5px;
					overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: top;">
					内容
				</span>
				<span style="font-size: 16px;display: inline-block;line-height: 200px;vertical-align: text-top;height: 200px;">
					<span style="display: inline-block;height:190px;border-left:1px solid #8F8F8F;vertical-align: middle;">
					</span>
				</span>
				<span style="display: inline-block;position: absolute;left:96px;right:0px;height: 200px;">
					<span style="display: inline-block;position: absolute;left:0;right:25px;height: 200px;">
						<textarea readonly="true" v-if="$o(task).attr('content')" class="scrollbar1" v-model="task.content" 
						style="resize:none;font-size: 16px;height:188px;border: none;width:100%;margin-top: 7px;padding:0;">
						</textarea>
					</span>
					<span class="active" 
						style="width:25px;height: 200px;line-height: 200px;display: inline-block;font-size: 16px;cursor: pointer;text-align: center;
							top:0;right: 0px;bottom:0;position: absolute;background-color: #e4e4e4;color: #6b6b6b;"
						@click="
							editContent.start=1;
							editContent.value=task.content;">
						<img draggable="false"  src="../assets/img/edit.png" style="width:22px;height:22px;vertical-align: middle;"/>
					</span>
				</span>
			</div>
			<div style="font-size: 0px;width:100%;height:40px;border-bottom:1px solid #8F8F8F;position: relative;">
				<span style="font-size: 16px;height: 40px;width:80px;display: inline-block;line-height:40px;padding:0 5px;
					overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: top;">
					类型
				</span>
				<span style="font-size: 16px;display: inline-block;line-height: 60px;vertical-align: text-top;height: 40px;">
					<span style="display: inline-block;height:30px;border-left:1px solid #8F8F8F;">
					</span>
				</span>
				
				<span style="display: inline-block;line-height:40px;position: absolute;left:91px;right:0;height: 40px;">
					<span class="selectable" v-if="$o(task).attr('type')" 
						style="font-size: 16px;height: 40px;line-height: 40px;display: inline-block;margin-left: 5px;
							overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: top;">
						{{ task.type==1?'推进':task.type==2?'缺陷':'' }}
					</span>
					<span class="active" 
						style="width:25px;height: 40px;line-height: 40px;display: inline-block;font-size: 16px;cursor: pointer;text-align: center;right: 0px;position: absolute;
							background-color: #e4e4e4;color: #6b6b6b;"
						@click="
							editType.start=1;
							editType.value=task.type;">
						<img draggable="false"  src="../assets/img/edit.png" style="width:22px;height:22px;vertical-align: middle;"/>
					</span>
				</span>
			</div>
			<div style="font-size: 0px;width:100%;height:40px;border-bottom:1px solid #8F8F8F;position: relative;">
				<span style="font-size: 16px;height: 40px;width:80px;display: inline-block;line-height:40px;padding:0 5px;
					overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: top;">
					截止时间
				</span>
				<span style="font-size: 16px;display: inline-block;line-height: 60px;vertical-align: text-top;height: 40px;">
					<span style="display: inline-block;height:30px;border-left:1px solid #8F8F8F;"></span>
				</span>
				
				<span style="display: inline-block;line-height:40px;position: absolute;left:91px;right:0;height: 40px;">
					<span class="selectable" v-if="$o(task).attr('finalTime')" 
						style="font-size: 16px;height: 40px;line-height: 40px;display: inline-block;margin-left: 5px;
							overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: top;">
						{{
							$moment(task.finalTime,'YYYY-MM-DD HH:mm:ss.SSS Z').format(
								($moment().year()==$moment(task.finalTime,'YYYY-MM-DD HH:mm:ss.SSS Z').year()? 'M-D': 'YY. M-D') +
								(
									$moment().isoWeekday(7).hour(23).minute(59).second(59).millisecond(999).unix() >= $moment(task.finalTime,'YYYY-MM-DD HH:mm:ss.SSS Z').unix() &&
									$moment().isoWeekday(7).hour(23).minute(59).second(59).millisecond(999).unix()-$moment(task.finalTime,'YYYY-MM-DD HH:mm:ss.SSS Z').unix()  < 7 * 24 * 60 * 60 ? '. E':''
								)
							)
						}}
					</span>
					<span class="active" 
						style="width:25px;height: 40px;line-height: 40px;display: inline-block;font-size: 16px;cursor: pointer;text-align: center;right: 0px;position: absolute;
							background-color: #e4e4e4;color: #6b6b6b;"
						@click="
							editFinalTime.start=1;
							editFinalTime.value=task.finalTime;
							editFinalTime.date=task.finalTime?$moment(task.finalTime).format('YYYY-MM-DD'):null;">
						<img draggable="false"  src="../assets/img/edit.png" style="width:22px;height:22px;vertical-align: middle;"/>
					</span>
				</span>
			</div>
			<div style="font-size: 0px;width:100%;height:40px;position: relative;border-bottom: 1px solid rgb(143, 143, 143);">
				<span style="font-size: 16px;height: 40px;width:80px;display: inline-block;line-height:40px;padding:0 5px;
					overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: top;">
					排序
				</span>
				<span style="font-size: 16px;display: inline-block;line-height: 60px;vertical-align: text-top;height: 40px;">
					<span style="display: inline-block;height:30px;border-left:1px solid #8F8F8F;"></span>
				</span>
				
				<span style="display: inline-block;line-height:40px;position: absolute;left:91px;right:0;height: 40px;">
					<span class="selectable" v-if="$o(task).attr('orderNo')" 
						style="font-size: 16px;height: 40px;line-height: 40px;display: inline-block;margin-left: 5px;
							overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: top;">
						{{ task.orderNo }}
					</span>
					<span class="active" 
						style="width:25px;height: 40px;line-height: 40px;display: inline-block;font-size: 16px;cursor: pointer;text-align: center;right: 0px;position: absolute;
							background-color: #e4e4e4;color: #6b6b6b;"
						@click="editOrderNo.start=1;editOrderNo.value=$o(task).attr('orderNo');">
						<img draggable="false"  src="../assets/img/edit.png" style="width:22px;height:22px;vertical-align: middle;"/>
					</span>
				</span>
			</div>
		</div>
		<div style="position:absolute;bottom:40px;left:0;right:0;border-style: solid;border-color: #8F8F8F;border-width: 1px 0 1px 0;
				box-shadow: rgb(136, 136, 136) 0px -1px 4px 0px;background-color: #ffffff;"
			:style="{top:(lookAllTracks?'40px':null),height:(lookAllTracks?null:'251px')}">
			<div class="active" style="height:20px;cursor: pointer;padding:5px;" @click="lookAllTracks=lookAllTracks?0:1;">
				<span style="font-size: 16px;color:#6b6b6b;height:30px;height: 20px;line-height: 20px;display:inline-block;height: 20px;line-height: 20px;">
					跟踪记录
				</span>
				<span style="margin-left:10px;font-size: 16px;color:#6b6b6b;height:30px;height: 20px;line-height: 20px;display:inline-block;height: 20px;line-height: 20px;">
					总数: {{$o(tracks).attr('sum.count')}}
				</span>
			</div>
			<div v-if="lookAllTracks" style="height: 30px;border-style:solid;border-color: #8F8F8F;border-width:1px 0;">
				<span style="width:180px;line-height: 30px;font-size: 16px;display:inline-block;border-right:1px solid #8f8f8f;position: relative;">
					<svg t="1591346902986" style="position: absolute;left:5px;top:8px;width:15px;height:15px;" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2627" width="15" height="15"><path d="M830.486464 796.124515 672.790943 638.42797c44.959904-52.799318 72.109099-121.232412 72.109099-196.016087 0-167.084182-135.448007-302.533214-302.53219-302.533214s-302.533214 135.449031-302.533214 302.533214 135.449031 302.53219 302.533214 302.53219c74.782651 0 143.215745-27.149196 196.017111-72.109099L796.101988 830.531518c9.499249 9.499249 24.885227 9.499249 34.384476 0S839.986737 805.623764 830.486464 796.124515zM442.366829 698.401131c-141.380814 0-255.989248-114.631985-255.989248-255.989248 0-141.403341 114.608434-255.989248 255.989248-255.989248 141.37979 0 255.989248 114.585907 255.989248 255.989248C698.356077 583.769146 583.747643 698.401131 442.366829 698.401131z" p-id="2628" fill="#8a8a8a"></path></svg>
					<input v-model="tracks.kw" type="text" style="line-height: 28px;height:28px;width:145px;border:none;margin-left:20px;padding:0;"
						@keyup.enter="tracks.pn=1;tracks.items=[];loadTracks();" 
					/>
					<span v-if="tracks.kw" style="font-size: 16px;cursor: pointer;color: #6b6b6b;position: absolute;right:0px;top:0px;width: 20px;text-align: center;" 
						@click="tracks.kw=null;">
						X
					</span>
				</span>
				<span class="active" @click="tracks.pn=1;tracks.items=[];loadTracks();"
					style="width: 33px;line-height: 30px;padding:0 5px;font-size: 16px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;">
					搜索
				</span>
				<span class="active" 
					@click="
						tracks.kw=null;tracks.pn=1;tracks.items=[];loadTracks()" 
					style="width: 33px;line-height: 30px;padding:0 5px;font-size: 16px;cursor: pointer;display:inline-block;
						border-right:1px solid #8f8f8f;">
					重置
				</span>
			</div>
			<div class="scrollbar1" style="position:absolute;bottom:51px;left:0;right:0;padding:0 5px;overflow: auto;"
				:style="{top:(lookAllTracks?'65px':'30px')}">
				<div v-for="item in tracks.items" :key="item.trackId" style="margin-bottom:5px;">
					<div class="selectable" style="font-size: 16px;white-space: pre-wrap;word-break: break-all;">{{item.content}}</div>
					<div class="selectable" style="font-size: 14px;color: #6b6b6b;">
						{{
							$moment(item.createTime,'YYYY-MM-DD HH:mm:ss.SSS Z').format(
								($moment().year()==$moment(item.createTime,'YYYY-MM-DD HH:mm:ss.SSS Z').year()? 'M-D': 'YY. M-D') +
								(
									$moment().isoWeekday(7).hour(23).minute(59).second(59).millisecond(999).unix() >= $moment(item.createTime,'YYYY-MM-DD HH:mm:ss.SSS Z').unix() &&
									$moment().isoWeekday(7).hour(23).minute(59).second(59).millisecond(999).unix()-$moment(item.createTime,'YYYY-MM-DD HH:mm:ss.SSS Z').unix()  < 7 * 24 * 60 * 60 ? '.E':''
								)
							)
						}}
					</div>
				</div>
			</div>
			<div style="height:50px;border-style: solid;border-color: #8F8F8F;border-width: 1px 0 0 0;position: absolute;bottom:0;left:0;right:0;">
				<span style="height:50px;display:inline-block;line-height: 50px;position: absolute;left:5px;right:58px;">
					<textarea v-model="trackContent" class="scrollbar1" placeholder="填写跟踪记录" style="resize: none;height:44px;border:none;width:100%;line-height:16px;vertical-align: middle;padding:0;font-size: 16px;"
						@keydown.enter.prevent="createTrack();">
					</textarea>
				</span>
				<span class="active"
					style="cursor:pointer;font-size: 16px;height:50px;padding:0 10px;display:inline-block;
						border-style: solid;border-color: #8F8F8F;border-width: 0 0 0 1px;line-height: 50px;position:absolute;right:0;"
					@click="createTrack()">
					确 认
				</span>
			</div>
		</div>
		<div style="height:30px;position:absolute;bottom:0px;left:0;right:0;padding:5px;">
			<span class="active" v-if="task && task.status==1" 
				style="font-size:16px;width:60px;line-height:28px;height: 28px;display:inline-block;margin-right:10px;
					text-align: center;background-color:#bebebe;cursor: pointer;"
				@click="
					$axios.post('/recording/my-task/complete-task',$qs.stringify({taskId:query.taskId})).then(res=>{
						if(res.data.codeMsg)
							$notify({message:res.data.codeMsg})
						if(res.data.code == 0){
							if(!res.data.codeMsg)
								$notify({type:'success',message:'已完成',color:'#000000',background:'#ffe063'})
							task.status=2;
							task.running=0;
							task.completeTime=new Date()
							$store.state.chosenTask.status=2;
							$store.state.chosenTask.running=0;
						}
					})
				">
				完&nbsp;成
			</span>
			<span class="active" v-if="task && task.status==1"
				style="font-size:16px;width:60px;line-height:28px;height: 28px;display:inline-block;margin-right:10px;
					text-align: center;background-color:#bebebe;cursor: pointer;"
				@click="
					$axios.post('/recording/my-task/cancel-task',$qs.stringify({taskId:query.taskId})).then(res=>{
						if(res.data.codeMsg)
							$notify({message:res.data.codeMsg})
						if(res.data.code == 0){
							if(!res.data.codeMsg)
								$notify({type:'success',message:'已放弃',color:'#000000',background:'#d5d5d5'})
							task.status=3;
							task.running=0;
							task.cancelTime=new Date()
							$store.state.chosenTask.status=3;
							$store.state.chosenTask.running=0;
						}
					})
				">
				放&nbsp;弃
			</span>
			<span class="active" v-if="task && task.status!=1"
				style="font-size:16px;width:60px;line-height:28px;height: 28px;display:inline-block;margin-right:10px;
					text-align: center;background-color:#bebebe;cursor: pointer;"
				@click="
					$dialog.confirm({
						message:'确认开启吗?'
					}).then(res=>{
						$axios.post('/recording/my-task/start-task',$qs.stringify({taskId:query.taskId})).then(res=>{
							if(res.data.codeMsg)
								$notify({message:res.data.codeMsg})
							if(res.data.code == 0){
								if(!res.data.codeMsg)
									$notify({type:'success',message:'已开启'})
								task.status=1;
								task.running=1;
								$store.state.chosenTask.status=1;
								$store.state.chosenTask.running=1;
							}
						})
					})
				">
				开&nbsp;启
			</span>
			<span class="active" style="font-size:16px;width:60px;line-height:28px;height: 28px;display:inline-block;margin-right:10px;
					text-align: center;background-color:#bebebe;cursor: pointer;">
				延&nbsp;续
			</span>
			<span class="active" style="font-size:16px;width:60px;line-height:33px;height: 33px;display:inline-block;margin-right:10px;
					text-align: center;background-color:#bebebe;cursor: pointer;"
				@click="
					$dialog.confirm({
						message:'确认删除吗?'
					}).then(res=>{
						$axios.post('/recording/my-task/delete-task',$qs.stringify({taskId:query.taskId})).then(res=>{
							if(res.data.codeMsg)
								$notify({message:res.data.codeMsg})
							if(res.data.code == 0){
								if(!res.data.codeMsg)
									$notify({type:'success',message:'已删除'})
								$store.state.chosenTaskDel=1;
								$router.back();
							}
						})
					})
				">
				删&nbsp;除
			</span>
		</div>

		<!-- 选择发起人 -->
		<div v-if="editFaQiRen.start" style="height:100%;width:100%;background-color: rgba(0,0,0,0.6);position: absolute; top:0;" >
			<div style="padding:10px 10px 10px 40px;background-color: #ffffff;margin-top:100px;max-height: 500px;overflow: auto;">
				<div style="font-size: 16px;color:#6b6b6b;">选择发起人</div>
				<div style="margin-top:5px;">
					<span style="height:28px;display: inline-block;position: relative;width:198px;border: 1px solid #8f8f8f;">
						<input v-model="editFaQiRen.kw" style="font-size:16px;line-height: 26px;border: none;width: 175px;margin-left: 5px;padding:0;" />
						<span v-if="editFaQiRen.kw" 
							style="font-size:16px;line-height: 28px;display:inline-block;position: absolute;width:20px;right:0;text-align: center;cursor: pointer;"
							@click="editFaQiRen.kw=null">
							X
						</span>
					</span>
					<span class="active" 
						style="font-size:16px;height:28px;line-height:28px;width:48px;vertical-align: bottom;cursor: pointer;margin-left: -1px;
							text-align: center;border:1px solid #8f8f8f;display:inline-block;"
						@click="editFaQiRen.pn=1;editFaQiRen.items=[];chooseFaQiRen_loadItems();">
						搜索
					</span>
				</div>
				<div class="scrollbar1" style="overflow: auto;max-height: 350px;margin-top: 5px;">
					<div class="active" v-for="item in editFaQiRen.items" :key="item.userId"
						:style="{'background-color':editFaQiRen.chosen == item?'#cccccc':'#ffffff'}"
						style="padding:5px;border:1px solid #8F8F8F;margin:5px 0;cursor:pointer;background-color: #FFFFFF;position: relative;height: 20px;line-height: 20px;"
						@click="
							$axios.post('/recording/my-task/update-task',$qs.stringify({taskId:query.taskId,faQiRenUserId:item.toUserId})).then(res=>{
								if(res.data.codeMsg)
									$dialog.alert({message:res.data.codeMsg})
								if(res.data.code == 0){
									if(!res.data.codeMsg)
										$notify({type:'success', message:'修改成功'})
									editFaQiRen.start=0;
									task.faQiRenUserId=item.toUserId
									task.faQiRenNickname=item.nickname
									task.faQiRenAlias=item.alias
									if($store.state.chosenTask){
										$store.state.chosenTask.faQiRenUserId=item.toUserId
										$store.state.chosenTask.faQiRenNickname=item.nickname
										$store.state.chosenTask.faQiRenAlias=item.alias
									}
								}
							})
						">
						<span><img draggable="false"  :src="item.headimg" /></span>
						<span style="display:inline-block;max-width: 100px;height: 20px;line-height: 20px;font-size:16px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;">
							{{ item.alias?item.alias:item.nickname }}
						</span>
						<span v-if="item.nickname != item.alias">
							<span v-if="item.alias" style="font-size: 16px;height: 20px;line-height: 20px;display: inline-block;vertical-align: top;color: #6b6b6b;">(</span>
							<span v-if="item.alias" 
								style="display:inline-block;max-width: 100px;height: 20px;line-height: 20px;font-size:16px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;color: #6b6b6b;">
								{{ item.nickname }}
							</span>
							<span v-if="item.alias" style="font-size: 16px;height: 20px;line-height: 20px;display: inline-block;vertical-align: top;color: #6b6b6b;">)</span>
						</span>
						<span v-if="item.orderNo" 
							style="font-size:12px;color:#ff0000;position:absolute;right:5px;bottom: 5px;width:14px;text-align: right;
								overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
							{{item.orderNo}}
						</span>
					</div>
					<div v-if="editFaQiRen.loading"  style="font-size:14px;text-align: center;color:#6b6b6b;margin-bottom:10px;margin-top: 10px;">
						加载中
					</div>
					<div class="active unselectable" v-if="editFaQiRen.currItems && !editFaQiRen.loading && editFaQiRen.currItems.length == editFaQiRen.ps" 
						@click="editFaQiRen.pn++;chooseFaQiRen_loadItems()" 
						style="font-size:14px;text-align: center;color:#6b6b6b;margin-bottom:10px;margin-top: 10px;cursor: pointer;">
						点击加载更多
					</div>
					<div  v-if="editFaQiRen.currItems && !editFaQiRen.loading && editFaQiRen.items.length>0 && editFaQiRen.currItems.length < editFaQiRen.ps" 
						style="font-size:14px;text-align: center;color:#6b6b6b;margin-bottom:10px;margin-top: 10px;">
						已全部加载
					</div>
					<div v-if="!editFaQiRen.loading && (!editFaQiRen.items || editFaQiRen.items.length==0)" 
						style="font-size:14px;text-align: center;color:#6b6b6b;margin-bottom:10px;margin-top: 10px;">
						暂无数据
					</div>
				</div>
				<div style="margin-top:10px;">
					<button @click="editFaQiRen.start=0;editFaQiRen.chosen = null;" style="font-size:16px;cursor: pointer;width:100px;height:30px;margin-right:15px;margin-bottom:5px;">取 消</button>
					<button style="font-size:16px;cursor: pointer;width:100px;height:30px;margin-right:5px;margin-bottom:5px;"
						@click="
							$axios.post('/recording/my-task/update-task',$qs.stringify({taskId:query.taskId,faQiRenUserId:null})).then(res=>{
								if(res.data.codeMsg)
									$dialog.alert({message:res.data.codeMsg})
								if(res.data.code == 0){
									if(!res.data.codeMsg)
										$notify({type:'success', message:'修改成功'})
									editFaQiRen.start=0;
									task.faQiRenUserId=null
									task.faQiRenNickname=null
									task.faQiRenAlias=null
									if($store.state.chosenTask){
										$store.state.chosenTask.faQiRenUserId=null
										$store.state.chosenTask.faQiRenNickname=null
										$store.state.chosenTask.faQiRenAlias=null
									}
								}
							})
						">
						清 除
					</button>
				</div>
			</div>
		</div>

		<!-- 选择负责人 -->
		<div v-if="editFuZeRen.start" style="height:100%;width:100%;background-color: rgba(0,0,0,0.6);position: absolute; top:0;" >
			<div style="padding:10px 10px 10px 40px;background-color: #ffffff;margin-top:100px;max-height: 500px;overflow: auto;">
				<div style="font-size: 16px;color:#6b6b6b;">选择负责人</div>
				<div style="margin-top:5px;">
					<span style="height:28px;display: inline-block;position: relative;width:198px;border: 1px solid #8f8f8f;">
						<input v-model="editFuZeRen.kw" style="font-size:16px;line-height: 26px;border: none;width: 175px;margin-left: 5px;padding:0;" />
						<span v-if="editFuZeRen.kw" 
							style="font-size:16px;line-height: 28px;display:inline-block;position: absolute;width:20px;right:0;text-align: center;cursor: pointer;"
							@click="editFuZeRen.kw=null">
							X
						</span>
					</span>
					<span class="active" 
						style="font-size:16px;height:28px;line-height:28px;width:48px;vertical-align: bottom;cursor: pointer;margin-left: -1px;
							text-align: center;border:1px solid #8f8f8f;display:inline-block;"
						@click="editFuZeRen.pn=1;editFuZeRen.items=[];chooseFuZeRen_loadItems();">
						搜索
					</span>
				</div>
				<div class="scrollbar1" style="overflow: auto;max-height: 350px;margin-top: 5px;">
					<div class="active" v-for="item in editFuZeRen.items" :key="item.userId"
						:style="{'background-color':editFuZeRen.chosen == item?'#cccccc':'#ffffff'}"
						style="padding:5px;border:1px solid #8F8F8F;margin:5px 0;cursor:pointer;background-color: #FFFFFF;position: relative;height: 20px;line-height: 20px;"
						@click="
							$axios.post('/recording/my-task/update-task',$qs.stringify({taskId:query.taskId,fuZeRenUserId:item.toUserId})).then(res=>{
								if(res.data.codeMsg)
									$dialog.alert({message:res.data.codeMsg})
								if(res.data.code == 0){
									if(!res.data.codeMsg)
										$notify({type:'success', message:'修改成功'})
									editFuZeRen.start=0;
									task.fuZeRenUserId=item.toUserId
									task.fuZeRenNickname=item.nickname
									task.fuZeRenAlias=item.alias
									if($store.state.chosenTask){
										$store.state.chosenTask.fuZeRenUserId=item.toUserId
										$store.state.chosenTask.fuZeRenNickname=item.nickname
										$store.state.chosenTask.fuZeRenAlias=item.alias
									}
								}
							})
						">
						<span><img draggable="false"  :src="item.headimg" /></span>
						<span style="display:inline-block;max-width: 100px;height: 20px;line-height: 20px;font-size:16px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;">
							{{ item.alias?item.alias:item.nickname }}
						</span>
						<span v-if="item.nickname != item.alias">
							<span v-if="item.alias" style="font-size: 16px;height: 20px;line-height: 20px;display: inline-block;vertical-align: top;color: #6b6b6b;">(</span>
							<span v-if="item.alias" 
								style="display:inline-block;max-width: 100px;height: 20px;line-height: 20px;font-size:16px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;color: #6b6b6b;">
								{{ item.nickname }}
							</span>
							<span v-if="item.alias" style="font-size: 16px;height: 20px;line-height: 20px;display: inline-block;vertical-align: top;color: #6b6b6b;">)</span>
						</span>
						<span v-if="item.orderNo" 
							style="font-size:12px;color:#ff0000;position:absolute;right:5px;bottom: 5px;width:14px;text-align: right;
								overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
							{{item.orderNo}}
						</span>
					</div>
					<div v-if="editFuZeRen.currItems && editFuZeRen.loading"  style="font-size:14px;text-align: center;color:#6b6b6b;margin-bottom:10px;margin-top: 10px;">
						加载中
					</div>
					<div class="active unselectable" v-if="editFuZeRen.currItems && !editFuZeRen.loading && editFuZeRen.currItems.length == editFuZeRen.ps" 
						@click="editFuZeRen.pn++;chooseFuZeRen_loadItems()" 
						style="font-size:14px;text-align: center;color:#6b6b6b;margin-bottom:10px;margin-top: 10px;cursor: pointer;">
						点击加载更多
					</div>
					<div  v-if="editFuZeRen.currItems && !editFuZeRen.loading && editFuZeRen.items.length>0 && editFuZeRen.currItems.length < editFuZeRen.ps" 
						style="font-size:14px;text-align: center;color:#6b6b6b;margin-bottom:10px;margin-top: 10px;">
						已全部加载
					</div>
					<div v-if="!editFuZeRen.loading && (!editFuZeRen.items || editFuZeRen.items.length==0)" 
						style="font-size:14px;text-align: center;color:#6b6b6b;margin-bottom:10px;margin-top: 10px;">
						暂无数据
					</div>
				</div>
				<div style="margin-top:10px;">
					<button @click="editFuZeRen.start=0;editFuZeRen.chosen = null;" style="font-size:16px;cursor: pointer;width:100px;height:30px;margin-right:15px;margin-bottom:5px;">取 消</button>
					<button style="font-size:16px;cursor: pointer;width:100px;height:30px;margin-right:5px;margin-bottom:5px;"
						@click="
							$axios.post('/recording/my-task/update-task',$qs.stringify({taskId:query.taskId,fuZeRenUserId:null})).then(res=>{
								if(res.data.codeMsg)
									$dialog.alert({message:res.data.codeMsg})
								if(res.data.code == 0){
									if(!res.data.codeMsg)
										$notify({type:'success', message:'修改成功'})
									editFuZeRen.start=0;
									task.fuZeRenUserId=null
									task.fuZeRenNickname=null
									task.fuZeRenAlias=null
									if($store.state.chosenTask){
										$store.state.chosenTask.fuZeRenUserId=null
										$store.state.chosenTask.fuZeRenNickname=null
										$store.state.chosenTask.fuZeRenAlias=null
									}
								}
							})
						">
						清 除
					</button>
				</div>
			</div>
		</div>

		<div v-if="editType.start" style="height:100%;width:100%;background-color: rgba(0,0,0,0.6);position: absolute; top:0;" >
			<div style="padding:10px 10px 10px 40px;background-color: #ffffff;margin-top:100px;max-height: 500px;overflow: auto;">
				<div style="font-size: 16px;color:#6b6b6b;">修改类型</div>
				<div style="line-height:30px;position: relative;height: 30px;border:none;margin-top:5px;">
					<input v-model="editType.value" value="1" id="type1" name="type" style="cursor: pointer;margin-left:0" type="radio"/>
					<label for="type1" style="font-size: 16px;cursor: pointer;">推进</label>
					<input v-model="editType.value" value="2" id="type2" name="type" style="margin-left:20px;cursor: pointer;" type="radio"/>
					<label for="type2" style="font-size: 16px;cursor: pointer;">缺陷</label>
					<span v-if="editType.value" @click="editType.value=null" 
						style="font-size: 16px;cursor: pointer;line-height:30px;position: absolute;display:inline-block;right: 0px;width: 15px;text-align: center;">
						x
					</span>
				</div>
				<div style="margin-top:10px;">
					<button @click="editType.start=0;" style="font-size:16px;cursor: pointer;width:100px;height:30px;margin-right:15px;margin-bottom:5px;">取 消</button>
					<button style="color:#ff0000;font-size:16px;cursor: pointer;width:100px;height:30px;margin-right:5px;margin-bottom:5px;"
						@click="
							if(task.type != editType.value){
								$axios.post('/recording/my-task/update-task',$qs.stringify({taskId:query.taskId,type:editType.value})).then(res=>{
									if(res.data.codeMsg)
										$dialog.alert({message:res.data.codeMsg})
									if(res.data.code == 0){
										if(!res.data.codeMsg)
											$notify({type:'success', message:'修改成功'})
										editType.start=0;
										task.type=editType.value;
										$store.state.chosenTask.type=editType.value
									}
								})
							}else{
								editType.start=0;
							}
						" >
						确 认
					</button>
				</div>
			</div>
		</div>
		<div v-if="editName.start" style="height:100%;width:100%;background-color: rgba(0,0,0,0.6);position: absolute; top:0;" >
			<div style="padding:10px 10px 10px 40px;background-color: #ffffff;margin-top:100px;max-height: 500px;overflow: auto;">
				<div style="font-size: 16px;color:#6b6b6b;">修改任务名</div>
				<div style="line-height:30px;position: relative;height: 30px;border-style: solid;border-color: #8F8F8F;border-width: 1px;margin-top:5px;">
					<span style="display: inline-block;line-height:30px;position: absolute;left:5px;right:15px;text-align: center;height: 30px;">
						<input v-model="editName.value" style="font-size: 16px;line-height:28px;border: none;width:100%;"/>
					</span>
					<span v-if="editName.value" @click="editName.value=null" 
						style="font-size: 16px;cursor: pointer;line-height:30px;position: absolute;display:inline-block;right: 0px;width: 15px;text-align: center;">
						x
					</span>
				</div>
				<div style="margin-top:10px;">
					<button @click="editName.start=0;" style="font-size:16px;cursor: pointer;width:100px;height:30px;margin-right:15px;margin-bottom:5px;">取 消</button>
					<button style="color:#ff0000;font-size:16px;cursor: pointer;width:100px;height:30px;margin-right:5px;margin-bottom:5px;"
						@click="
							if(task.name != editName.value){
								$axios.post('/recording/my-task/update-task',$qs.stringify({taskId:query.taskId,name:editName.value})).then(res=>{
									if(res.data.codeMsg)
										$dialog.alert({message:res.data.codeMsg})
									if(res.data.code == 0){
										if(!res.data.codeMsg)
											$notify({type:'success', message:'修改成功'})
										editName.start=0;
										task.name=editName.value;
										$store.state.chosenTask.name=editName.value
									}
								})
							}else{
								editName.start=0;
							}
						" >
						确 认
					</button>
				</div>
			</div>
		</div>
		<div v-if="editContent.start" style="height:100%;width:100%;background-color: rgba(0,0,0,0.6);position: absolute; top:0;" >
			<div style="padding:10px 10px 10px 40px;background-color: #ffffff;margin-top:100px;max-height: 500px;overflow: auto;">
				<div style="font-size: 16px;color:#6b6b6b;">修改内容</div>
				<div style="position: relative;height: 200px;border:none;margin-top:5px;">
					<div style="border-width:1px;border-style: solid;height: 198px;border-color: #8f8f8f;padding:1px;">
						<textarea v-model="editContent.value" class="scrollbar1" style="font-size:16px;width:100%;height:100%;resize: none;border:none;padding:0px;display:inline-block;">
						</textarea>
					</div>
				</div>
				<div style="margin-top:10px;">
					<button @click="editContent.start=0;" style="font-size:16px;cursor: pointer;width:100px;height:30px;margin-right:15px;margin-bottom:5px;">取 消</button>
					<button style="color:#ff0000;font-size:16px;cursor: pointer;width:100px;height:30px;margin-right:5px;margin-bottom:5px;"
						@click="
							if(task.content != editContent.value){
								$axios.post('/recording/my-task/update-task',$qs.stringify({taskId:query.taskId,content:editContent.value})).then(res=>{
									if(res.data.codeMsg)
										$dialog.alert({message:res.data.codeMsg})
									if(res.data.code == 0){
										if(!res.data.codeMsg)
											$notify({type:'success', message:'修改成功'})
										editContent.start=0;
										task.content=editContent.value;
										$store.state.chosenTask.content=editContent.value
									}
								})
							}else{
								editContent.start=0;
							}
						" >
						确 认
					</button>
				</div>
			</div>
		</div>
		
		<div v-if="editFinalTime.start" style="height:100%;width:100%;background-color: rgba(0,0,0,0.6);position: absolute; top:0;" >
			<div style="padding:10px 10px 10px 40px;background-color: #ffffff;margin-top:100px;max-height: 500px;overflow: auto;">
				<div style="font-size: 16px;color:#6b6b6b;">修改截止时间</div>
				<div style="line-height:30px;position: relative;height: 30px;border-style: solid;border-color: #8F8F8F;border-width: 1px;margin-top:5px;">
					<input v-model="editFinalTime.date" style="font-size: 16px;line-height:28px;border: none;width:160px;" type="date"/>
					<span v-if="editFinalTime.date"
						@click="editFinalTime.value=editFinalTime.date=null;" 
						style="font-size: 16px;cursor: pointer;line-height:30px;position: absolute;display:inline-block;right: 0px;width: 15px;text-align: center;">
						x
					</span>
				</div>
				<div style="margin-top:10px;">
					<button @click="editFinalTime.start=0;" style="font-size:16px;cursor: pointer;width:100px;height:30px;margin-right:15px;margin-bottom:5px;">取 消</button>
					<button
						style="color:#ff0000;font-size:16px;cursor: pointer;width:100px;height:30px;margin-right:5px;margin-bottom:5px;"
						@click="
							editFinalTime.value=editFinalTime.date?$moment(editFinalTime.date+' 23:59:59.999').format('YYYY-MM-DD HH:mm:ss.SSS Z'):null;
							if(task.finalTime != editFinalTime.value){
								$axios.post('/recording/my-task/update-task',$qs.stringify({taskId:query.taskId,finalTime:editFinalTime.value})).then(res=>{
									if(res.data.codeMsg)
										$dialog.alert({message:res.data.codeMsg})
									if(res.data.code == 0){
										if(!res.data.codeMsg)
											$notify({type:'success', message:'修改成功'})
										editFinalTime.start=0;
										task.finalTime=editFinalTime.value;
										$store.state.chosenTask.finalTime=editFinalTime.value
									}
								})
							}else{
								editFinalTime.start=0;
							}
						">
						确 认
					</button>
				</div>
			</div>
		</div>
		
		<div v-if="editOrderNo.start" style="height:100%;width:100%;background-color: rgba(0,0,0,0.6);position: absolute; top:0;" >
			<div style="padding:10px 10px 10px 40px;background-color: #ffffff;margin-top:100px;max-height: 500px;overflow: auto;">
				<div style="font-size: 16px;color:#6b6b6b;">修改排序</div>
				<div style="line-height:30px;position: relative;height: 30px;border-style: solid;border-color: #8F8F8F;border-width: 1px;margin-top:5px;">
					<span style="display: inline-block;line-height:30px;position: absolute;left:5px;right:15px;text-align: center;height: 30px;">
						<input v-model="editOrderNo.value" style="font-size: 16px;line-height:28px;border: none;width:100%;" type="number"/>
					</span>
					<span v-if="editOrderNo.value" @click="editOrderNo.value=null" 
						style="font-size: 16px;cursor: pointer;line-height:30px;position: absolute;display:inline-block;right: 0px;width: 15px;text-align: center;">
						x
					</span>
				</div>
				<div style="margin-top:10px;">
					<button @click="editOrderNo.start=0;" style="font-size:16px;cursor: pointer;width:100px;height:30px;margin-right:15px;margin-bottom:5px;">取 消</button>
					<button style="color:#ff0000;font-size:16px;cursor: pointer;width:100px;height:30px;margin-right:5px;margin-bottom:5px;"
						@click="
							if(task.orderNo != editOrderNo.value){
								$axios.post('/recording/my-task/update-task',$qs.stringify({taskId:query.taskId,orderNo:editOrderNo.value})).then(res=>{
									if(res.data.codeMsg)
										$dialog.alert({message:res.data.codeMsg})
									if(res.data.code == 0){
										if(!res.data.codeMsg)
											$notify({type:'success', message:'修改成功'})
										editOrderNo.start=0;
										task.orderNo=editOrderNo.value;
										$store.state.chosenTask.orderNo=editOrderNo.value
									}
								})
							}else{
								editOrderNo.start=0;
							}
						" >
						确 认
					</button>
				</div>
			</div>
		</div>


		<div name="kinds" v-if="unitEditKind.open"
			style="position: absolute;top:0;bottom:0;width:100%;z-index: 100;background-color: rgba(0, 0, 0, 0.6);">
			<div 
				style="background-color: #ffffff;min-height:200px;position:absolute;top:100px;right:0;left:0;padding:0 0 10px 0;">
				<div style="height:35px;padding:0 0 0 10px;">
					<span style="font-size:16px;display: inline-block;height:35px;line-height:35px;">
						分类列表
					</span>
				</div>
				<div class="scrollbar1" style="max-height:600px;overflow: auto;">
					<div v-for="item in unitEditKind.kinds" v-if="unitEditKind.kinds" 
						style="height:35px;padding:0 0 0 10px;cursor: pointer;position: relative;"
						@click="
							$dialog.confirm({message:'确认修改吗?'}).then(res=>{
								if(item.kindId!=task.kindId){
									$axios.post('/recording/my-task/update-task',$qs.stringify({
										taskId:query.taskId,
										kindId:item.kindId,
										kindName:item.name
									})).then(res => {
										if(res.data.code == 0){
											task.kindId=item.kindId
											task.kindName=item.name
											$notify({type:'success', message:'修改成功'})
											unitEditKind_close();
										}
									})
								}else{
									$notify({type:'success', message:'修改成功'})
									unitEditKind_close();
								}
							})
							
						">
						<span style="font-size:14px;display: inline-block;height:35px;line-height:35px;">
							{{item.name}}
						</span>
						<span style="font-size:14px;display: inline-block;height:35px;line-height:35px;float:right;font-weight: 900;padding:0 5px;"
							@click.stop="
								unitEditKind.kind=item
								unitEditKind_unitKind_open(item)
							">
							···
						</span>
					</div>
				</div>
				<div style="padding:0 5px 0 10px;margin:10px 0 0 0;">
					<span style="display: inline-block;height:35px;line-height:35px;font-size: 14px;border-style: solid;border-color:#808080;
							border-width: 1px;cursor: pointer;width:80px;text-align: center;"
						@click="unitEditKind_close()">
						关 闭
					</span>
					<span style="display: inline-block;height:35px;line-height:35px;font-size: 14px;border-style: solid;border-color:#808080;
							border-width: 1px;cursor: pointer;width:80px;text-align: center;margin:0 0 0 10px;"
						@click="
							$dialog.confirm({message:'确认清除吗?'}).then(res=>{
								$axios.post('/recording/my-task/update-task',
								$qs.stringify({
									taskId:query.taskId,
									kindId:'',
									kindName:'',
								})).then(res => {
									if(res.data.code==0){
										$notify({type:'success',message:'清除成功'})
										task.kindId=null
										task.kindName=null
										unitEditKind_close()
									}
								})
							})
						">
						清 除
					</span>
					<span style="display: inline-block;height:35px;line-height:35px;font-size: 14px;border-style: solid;border-color:#808080;
							border-width: 1px;cursor: pointer;width:80px;text-align: center;margin:0 0 0 10px;"
						@click="unitEditKind_unitCreateKind_open()">
						新 增
					</span>
				</div>
			</div>

			<div name="kind" v-if="unitEditKind.unitKind.open"
				style="position: absolute;top:0;bottom:0;width:100%;z-index: 100;background-color: rgba(0, 0, 0, 0.6);">
				<div 
					style="background-color: #ffffff;min-height:200px;position:absolute;top:100px;right:0;left:0;padding:0 0 10px 0;">
					<div style="height:35px;padding:0 0 0 10px;">
						<span style="font-size:16px;display: inline-block;height:35px;line-height:35px;">
							分类详情
						</span>
					</div>
					<div>
						<span style="font-size: 16px;display:inline-block;">
							分类名
						</span>
						<span style="font-size: 16px;">
							{{unitEditKind.unitKind.kind.name}}
						</span>
						<span style="cursor: pointer;"
							@click="
								var kind=unitEditKind.unitKind.kind
								var r = window.prompt('修改分类名',kind.name)
								if(r && r!=kind.name){
									$axios.post('/recording/my-task/update-kind',
									$qs.stringify({
										kindId:kind.kindId,
										name:r
									})).then(res => {
										if(res.data.code==0){
											$notify({type:'success',message:'修改成功'})
											kind.name=r
											unitEditKind.kind.name=r
										}
									})
								}
							">
							<img src="../assets/img/edit.png" style="width:25px;height:25px;"/>
						</span>
					</div>
					<div>
						<span style="font-size: 16px;display:inline-block;">
							排序
						</span>
						<span style="font-size: 16px;display:inline-block;">
							{{unitEditKind.unitKind.kind.orderNo}}
						</span>
						<span style="cursor: pointer;"
							@click="
								var kind=unitEditKind.unitKind.kind
								var r = window.prompt('修改排序',kind.orderNo)
								if(r && r!=kind.orderNo){
									$axios.post('/recording/my-task/update-kind',
									$qs.stringify({
										kindId:kind.kindId,
										orderNo:r
									})).then(res => {
										if(res.data.code==0){
											$notify({type:'success',message:'修改成功'})
											kind.orderNo=r
											unitEditKind.kind.orderNo=r
										}
									})
								}
							">
							<img src="../assets/img/edit.png" style="width:25px;height:25px;"/>
						</span>
					</div>
					<div style="padding:0 5px 0 10px;margin:10px 0 0 0;">
						<span style="display: inline-block;height:35px;line-height:35px;font-size: 14px;border-style: solid;border-color:#808080;
								border-width: 1px;cursor: pointer;width:80px;text-align: center;"
							@click="unitEditKind_unitKind_close()">
							关 闭
						</span>
						<span style="display: inline-block;height:35px;line-height:35px;font-size: 14px;border-style: solid;border-color:#808080;
								border-width: 1px;cursor: pointer;width:80px;text-align: center;margin-left:15px;"
							@click="
								var kind=unitEditKind.unitKind.kind
								$dialog.confirm({message:'确认删除吗?'}).then(res=>{
									$axios.post('/recording/my-task/delete-kind',
									$qs.stringify({
										kindId:kind.kindId
									})).then(res => {
										if(res.data.code==0){
											$notify({type:'success',message:'删除成功'})
											unitEditKind_unitKind_close();
										}
									})
								})
							">
							删 除
						</span>
					</div>
				</div>
			</div>

			<div name="createKind" v-if="unitEditKind.unitCreateKind.open"
				style="position: absolute;top:0;bottom:0;width:100%;z-index: 100;background-color: rgba(0, 0, 0, 0.6);">
				<div 
					style="background-color: #ffffff;min-height:200px;position:absolute;top:100px;right:0;left:0;padding:0 0 10px 0;">
					<div style="height:35px;padding:0 0 0 10px;">
						<span style="font-size:16px;display: inline-block;height:35px;line-height:35px;">
							创建分类
						</span>
					</div>
					<div>
						<span style="font-size: 16px;display:inline-block;">
							分类名
						</span>
						<span style="font-size: 16px;">
							<input v-model="unitEditKind.unitCreateKind.kind.name" />
						</span>
					</div>
					<div>
						<span style="font-size: 16px;display:inline-block;">
							排序
						</span>
						<span style="font-size: 16px;display:inline-block;">
							<input v-model="unitEditKind.unitCreateKind.kind.orderNo"/>
						</span>
					</div>
					<div style="padding:0 5px 0 10px;margin:10px 0 0 0;">
						<span style="display: inline-block;height:35px;line-height:35px;font-size: 14px;border-style: solid;border-color:#808080;
								border-width: 1px;cursor: pointer;width:80px;text-align: center;"
							@click="unitEditKind_unitCreateKind_close()">
							关 闭
						</span>

						<span style="display: inline-block;height:35px;line-height:35px;font-size: 14px;border-style: solid;border-color:#808080;
								border-width: 1px;cursor: pointer;width:80px;text-align: center;margin:0 0 0 10px;"
							@click="
								var kind = unitEditKind.unitCreateKind.kind;
								if(kind){
									$axios.post('/recording/my-task/create-kind',$qs.stringify({
										name:kind.name,
										orderNo:kind.orderNo
									})).then(res => {
										if(res.data.code==0){
											$notify({type:'success',message:'创建成功'})
											unitEditKind.kinds.push(kind)
											unitEditKind_unitCreateKind_close()
										}
									})
								}
							">
							确 认
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'task',
		data() {
			return {
				query: {
					taskId : null
				},
				lookAllTracks:null,
				task: null,
				trackContent:null,
				tracks:{
					kw:null,
					items:null,
					sum: null,
					pn:null,
					ps:15,
					loading:null,
				},
				editType:{
					start: null,
					value: null,
				},
				editName:{
					start: null,
					value: null,
				},
				editContent:{
					start: null,
					value: null,
				},
				editFinalTime:{
					start: null,
					date: null,
					value: null,
				},
				editOrderNo:{
					start: null,
					value: null,
				},
				editFaQiRen: {
					start: null,
					loading:null,
					kw: null,
					pn: null,
					ps: 15,
					items : null,
					currItems : null
				},
				editFuZeRen: {
					start: null,
					loading:null,
					kw: null,
					pn: null,
					ps: 15,
					items : null,
					currItems : null
				},
				kindId:'',
				kindName:null,
				kinds:null,
				unitEditKind:{
					open:null,
					kinds:null,
					kind:null,
					unitKind:{
						open:null,
						kind:null,
					},
					unitCreateKind:{
						open:null,
						kind:null,
					}
				}
			}
		},
		activated() {
			
			let vue = this
			
			if (JSON.stringify(vue.query) != JSON.stringify(vue.$route.query)) {
				Object.assign(vue.$data, vue.$options.data());
				vue.query = vue.$route.query;
				vue.load();
			}else{
				
			}
		},
		methods: {
			load() {
				
				let vue = this

				vue.$axios.get('/recording/my-task/kinds?'
				+vue.$qs.stringify({sort:'orderNo',order:'asc'}))
				.then(res => {
					if (res.data.code == 0) {
						if(!vue.kinds) vue.kinds = []
						if(res.data.data.kinds.list.length>0)
							vue.kinds=vue.kinds.concat(res.data.data.kinds.list)
					}
				})

				vue.$axios.get('/recording/task?' + vue.$qs.stringify({taskId:vue.query.taskId})).then(res => {
					if (res.data.code == 0) {
							vue.task = res.data.data;
					} else {
						if(res.data.codeMsg)
							vue.$dialog.alert({ message: res.data.codeMsg });
					}
				})
				vue.loadTracks();
			},
			loadTracks(){
				let vue = this
				vue.$axios.get('/recording/my-task/tracks?' + vue.$qs.stringify({taskId:vue.query.taskId})).then(res => {
					
					if (res.data.code == 0) {
							vue.tracks.items = res.data.data.items;
					} else {
						if(res.data.codeMsg)
							vue.$dialog.alert({ message: res.data.codeMsg });
					}
				})

				vue.$axios.get('/recording/my-task/tracks-sum?' + vue.$qs.stringify({taskId:vue.query.taskId})).then(res => {
					
					if (res.data.code == 0) {
							vue.tracks.sum = res.data.data;
					} else {
						if(res.data.codeMsg)
							vue.$dialog.alert({ message: res.data.codeMsg });
					}
				})
			},
			chooseFaQiRen_loadItems(){
				
				let vue = this
				vue.editFaQiRen.loading=1
				var obj = {
					kw:vue.editFaQiRen.kw,
					pn:vue.editFaQiRen.pn,
					ps:vue.editFaQiRen.ps
				}
				vue.$axios.get('/recording/my-friend/friends?' + vue.$qs.stringify(obj)).then(data => {
					
					if (data.data.code == 0) {
						if(data.data.data.items.length>0){
							if(vue.editFaQiRen.pn==1)
								vue.editFaQiRen.items=[]
							vue.editFaQiRen.currItems = data.data.data.items
							vue.editFaQiRen.items=vue.editFaQiRen.items.concat(data.data.data.items)
						}else
							vue.editFaQiRen.pn--;
					} else {
						if(data.data.codeMsg)
							vue.$dialog.alert({ type:'primary', message: data.data.codeMsg });
					}
					vue.editFaQiRen.loading=0
				})
			},
			chooseFuZeRen_loadItems(){
				
				let vue = this
				vue.editFuZeRen.loading=1
				var obj = {
					kw:vue.editFuZeRen.kw,
					pn:vue.editFuZeRen.pn,
					ps:vue.editFuZeRen.ps
				}
				vue.$axios.get('/recording/my-friend/friends?' + vue.$qs.stringify(obj)).then(data => {
					
					if (data.data.code == 0) {
						if(data.data.data.items.length>0){
							if(vue.editFuZeRen.pn==1)
								vue.editFuZeRen.items=[]
							vue.editFuZeRen.currItems = data.data.data.items
							vue.editFuZeRen.items=vue.editFuZeRen.items.concat(data.data.data.items)
						}else
							vue.editFuZeRen.pn--;
					} else {
						if(data.data.codeMsg)
							vue.$dialog.alert({ message: data.data.codeMsg });
					}
					vue.editFuZeRen.loading=0
				})
			},
			createTrack(){
				
				let vue = this
				if(!vue.trackContent){
					vue.$notify({message:'内容不可空'})
				}else{
					vue.$axios.post('/recording/my-task/create-track',vue.$qs.stringify({
						taskId:vue.query.taskId,
						content:vue.trackContent
					})).then(res=>{
						if(res.data.codeMsg)
							vue.$notify({message:res.data.codeMsg})
						if(res.data.code == 0){
							vue.tracks.items=vue.tracks.items==null?[]:vue.tracks.items;
							var createdTrack = {
								trackId:res.data.data.trackId,
								content:vue.trackContent,
								createTime:vue.$moment().format('YYYY-MM-DD HH:mm:ss.SSS Z')
							}
							vue.tracks.items.unshift(createdTrack)
							vue.$store.state.chosenTask.lastTrackId=createdTrack.trackId
							vue.$store.state.chosenTask.lastTrackContent=createdTrack.content
							vue.$store.state.chosenTask.lastTrackCreateTime=createdTrack.createTime
							vue.trackContent=null;
						}
					})
				}
			},
			unitEditKind_open:function(){
				let vue = this
				vue.unitEditKind.open=1
				if(!vue.unitEditKind.kinds){
					vue.$axios.get('/recording/my-task/kinds?'+vue.$qs.stringify({sort:'orderNo',order:'asc'}))
					.then(res => {
						if(res.data.code==0){
							vue.unitEditKind.kinds=res.data.data.kinds.list
						}
					})
				}
			},
			unitEditKind_close:function(){
				let vue = this
				vue.unitEditKind.open=0
			},
			unitEditKind_unitKind_open:function(kind){
				let vue = this
				vue.unitEditKind.unitKind.open=1
				vue.unitEditKind.unitKind.kind=kind
			},
			unitEditKind_unitKind_close:function(){
				let vue = this
				vue.unitEditKind.unitKind.open=0
			},
			unitEditKind_unitCreateKind_open:function(){
				let vue = this
				if(!vue.unitEditKind.unitCreateKind.kind)
					vue.unitEditKind.unitCreateKind.kind={}
				vue.unitEditKind.unitCreateKind.open=1

			},
			unitEditKind_unitCreateKind_close:function(){
				let vue = this
				vue.unitEditKind.unitCreateKind.kind=null
				vue.unitEditKind.unitCreateKind.open=0
			}
		}
	}
</script>
<style scoped>
	.scrollbar::-webkit-scrollbar {
		display: none;
	}
</style>