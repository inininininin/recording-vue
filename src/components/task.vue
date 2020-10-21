<template>
	<div id="create-task" class="scrollbar" style="height:100%;overflow:auto;position: relative;font-size:0px" >
		<div style="text-align: center;height:40px;line-height: 40px;border-bottom:1px solid #8F8F8f;position: absolute;
				width: 100%;top:0;background-color: #FFFFFF;">
			<span class="active unselectable"
				@click="window.history.length<=1 ? $router.push({path:'/index',query:{time:new Date().getTime+''}}) : $router.back();"
				style="position: absolute;left:0;width:40px;cursor: pointer;font-weight: 900;font-size: 16px;">
				<
			</span>
			<span style="font-weight: 900;font-size: 16px;">任务详情</span>
		</div>
		<div class="scrollbar" style="top:41px;bottom: 302px;position: absolute;overflow:auto;width:100%;">
			<div style="font-size: 0px;width:100%;height:40px;border-bottom:1px solid #8F8F8F;position: relative;">
				<span style="font-size: 16px;height: 40px;width:80px;display: inline-block;line-height:40px;padding:0 5px;
					overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: top;">
					发起人
				</span>
				<span style="font-size: 16px;display: inline-block;line-height: 60px;vertical-align: text-top;height: 40px;">
					<span style="display: inline-block;height:30px;border-left:1px solid #8F8F8F;"></span>
				</span>
				<span style="display: inline-block;line-height:40px;position: absolute;left:91px;right:0;height: 40px;">
					<span v-if="task && task.faBuRenUserId" 
						style="width: 73px;font-size: 16px;height: 40px;line-height: 40px;display: inline-block;margin-left: 5px;
							overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: top;">
						{{ task.faBuRenUserAlias || task.faBuRenUserNickname }}
					</span>
					<span class="active unselectable" 
						style="width:25px;height: 40px;line-height: 40px;display: inline-block;font-size: 16px;cursor: pointer;text-align: center;right: 0px;position: absolute;
							background-color: #e4e4e4;color: #8f8f8f;"
						@click="editFaBuRen.todo=1;editFaBuRen.pn=1;chooseFaBuRen_loadItems();">
						改
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
					<span v-if="task && task.fuZeRenUserId" 
						style="width: 73px;font-size: 16px;height: 40px;line-height: 40px;display: inline-block;margin-left: 5px;
							overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: top;">
						{{ task.fuZeRenUserAlias || task.fuZeRenUserNickname }}
					</span>
					<span class="active unselectable" 
						style="width:25px;height: 40px;line-height: 40px;display: inline-block;font-size: 16px;cursor: pointer;text-align: center;right: 0px;position: absolute;
							background-color: #e4e4e4;color: #8f8f8f;"
						@click="editFuZeRen.todo=1;editFuZeRen.pn=1;chooseFuZeRen_loadItems();">
						改
					</span>
				</span>
					
					
			</div>
			<div style="font-size: 0px;width:100%;height:200px;border-bottom:1px solid #8F8F8F;position: relative;">
				<span style="font-size: 16px;height: 186px;width:80px;display: inline-block;line-height:20px;padding:7px 5px 7px 5px;
					overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: top;">
					内容
				</span>
				<span style="font-size: 16px;display: inline-block;line-height: 200px;vertical-align: text-top;height: 200px;">
					<span style="display: inline-block;height:190px;border-left:1px solid #8F8F8F;vertical-align: middle;"></span>
				</span>
				<span style="display: inline-block;position: absolute;left:96px;right:5px;height: 200px;">
					<textarea class="scrollbar1" v-model="task.content" style="resize:none;font-size: 16px;height:188px;border: none;width:100%;margin-top: 7px;padding:0;"></textarea>
				</span>
			</div>
			<div style="font-size: 0px;width:100%;height:40px;border-bottom:1px solid #8F8F8F;position: relative;">
				<span style="font-size: 16px;height: 40px;width:80px;display: inline-block;line-height:40px;padding:0 5px;
					overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: top;">
					类型
				</span>
				<span style="font-size: 16px;display: inline-block;line-height: 60px;vertical-align: text-top;height: 40px;">
					<span style="display: inline-block;height:30px;border-left:1px solid #8F8F8F;"></span>
				</span>
				
				<span style="display: inline-block;line-height:40px;position: absolute;left:91px;right:0;height: 40px;">
					<span v-if="task.finalTime" 
						style="font-size: 16px;height: 40px;line-height: 40px;display: inline-block;margin-left: 5px;
							overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: top;">
						{{ task.type==1?'推进':task.type==2?'缺陷':'' }}
					</span>
					<span class="active unselectable" 
						style="width:25px;height: 40px;line-height: 40px;display: inline-block;font-size: 16px;cursor: pointer;text-align: center;right: 0px;position: absolute;
							background-color: #e4e4e4;color: #8f8f8f;"
						@click="editType.todo=1;editType.value=task.type;">
						改
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
					<span v-if="task.finalTime" 
						style="font-size: 16px;height: 40px;line-height: 40px;display: inline-block;margin-left: 5px;
							overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: top;">
						{{
							$moment(task.finalTime).format(
								($moment().year()==$moment(task.finalTime).year()? 'M-D': 'YY. M-D') +
								(
									$moment().isoWeekday(7).hour(23).minute(59).second(59).millisecond(999).unix() >= $moment(task.finalTime).unix() &&
									$moment().isoWeekday(7).hour(23).minute(59).second(59).millisecond(999).unix()-$moment(task.finalTime).unix()  < 7 * 24 * 60 * 60 ? '. E':''
								)
							)
						}}
					</span>
					<span class="active unselectable" 
						style="width:25px;height: 40px;line-height: 40px;display: inline-block;font-size: 16px;cursor: pointer;text-align: center;right: 0px;position: absolute;
							background-color: #e4e4e4;color: #8f8f8f;"
						@click="editFinalTime.todo=1;editFinalTime.value=task.finalTime;editFinalTime.date=$moment(task.finalTime).format('YYYY-MM-DD');">
						改
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
					<span v-if="task.orderNo" 
						style="font-size: 16px;height: 40px;line-height: 40px;display: inline-block;margin-left: 5px;
							overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: top;">
						{{ task.orderNo }}
					</span>
					<span class="active unselectable" 
						style="width:25px;height: 40px;line-height: 40px;display: inline-block;font-size: 16px;cursor: pointer;text-align: center;right: 0px;position: absolute;
							background-color: #e4e4e4;color: #8f8f8f;"
						@click="editOrderNo.todo=1;editOrderNo.value=task.orderNo;">
						改
					</span>
				</span>
			</div>
		</div>
		<div style="position:absolute;bottom:40px;left:0;right:0;border-style: solid;border-color: #8F8F8F;border-width: 1px 0 1px 0;
				box-shadow: rgb(136, 136, 136) 0px 0px 4px 0px;background-color: #ffffff;"
			:style="{top:(lookAllTracks?'40px':null),height:(lookAllTracks?null:'251px')}">
			<div class="active" style="height:20px;cursor: pointer;padding:5px;" @click="lookAllTracks=lookAllTracks?0:1;">
				<span style="font-size: 16px;color:#8F8F8F;height:30px;height: 20px;line-height: 20px;display:inline-block;height: 20px;line-height: 20px;">
					追踪记录
				</span>
				<span style="margin-left:10px;font-size: 16px;color:#8F8F8F;height:30px;height: 20px;line-height: 20px;display:inline-block;height: 20px;line-height: 20px;">
					总数: 20
				</span>
			</div>
			<div v-if="lookAllTracks" style="height: 30px;border-style:solid;border-color: #8F8F8F;border-width:1px 0;">
				<span style="width:50%;line-height: 30px;font-size: 16px;display:inline-block;border-right:1px solid #8f8f8f;position: relative;">
					<svg t="1591346902986" style="position: absolute;left:1%;top:8px;" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2627" width="15" height="15"><path d="M830.486464 796.124515 672.790943 638.42797c44.959904-52.799318 72.109099-121.232412 72.109099-196.016087 0-167.084182-135.448007-302.533214-302.53219-302.533214s-302.533214 135.449031-302.533214 302.533214 135.449031 302.53219 302.533214 302.53219c74.782651 0 143.215745-27.149196 196.017111-72.109099L796.101988 830.531518c9.499249 9.499249 24.885227 9.499249 34.384476 0S839.986737 805.623764 830.486464 796.124515zM442.366829 698.401131c-141.380814 0-255.989248-114.631985-255.989248-255.989248 0-141.403341 114.608434-255.989248 255.989248-255.989248 141.37979 0 255.989248 114.585907 255.989248 255.989248C698.356077 583.769146 583.747643 698.401131 442.366829 698.401131z" p-id="2628" fill="#8a8a8a"></path></svg>
					<input v-model="tracks.kw" type="text" style="line-height: 28px;width:83%;border:none;margin-left:8%;"
						@keyup.enter="tracks.pn=1;tracks.items=[];loadTracks();" 
					/>
					<span v-if="tracks.kw" style="font-size: 16px;cursor: pointer;color: #8f8f8f;position: absolute;right:0px;top:0px;width: 20px;text-align: center;" 
						@click="tracks.kw=null;">
						X
					</span>
				</span>
				<span class="active unselectable" @click="tracks.pn=1;tracks.items=[];loadTracks();"
					style="width: 32px;line-height: 30px;padding:0 5px;font-size: 16px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;">
					搜索
				</span>
				<span class="active unselectable" 
					@click="
						tracks.kw=null;tracks.pn=1;tracks.items=[];loadTracks()" 
					style="width: 32px;line-height: 30px;padding:0 5px;font-size: 16px;cursor: pointer;display:inline-block;
						border-right:1px solid #8f8f8f;">
					重置
				</span>
			</div>
			<div class="scrollbar1" style="position:absolute;bottom:53px;left:0;right:0;padding:0 5px;overflow: auto;"
				:style="{top:(lookAllTracks?'65px':'30px')}">
				<div v-for="item in tracks.items" :key="item.trackId" style="margin-bottom:5px;">
					<div style="font-size: 16px;white-space: pre-wrap;">{{item.content}}</div>
					<div style="font-size: 14px;color: #8F8F8F;">
						{{
							$moment(item.createTime).format(
								($moment().year()==$moment(item.createTime).year()? 'M-D': 'YY. M-D') +
								(
									$moment().isoWeekday(7).hour(23).minute(59).second(59).millisecond(999).unix() >= $moment(item.createTime).unix() &&
									$moment().isoWeekday(7).hour(23).minute(59).second(59).millisecond(999).unix()-$moment(item.createTime).unix()  < 7 * 24 * 60 * 60 ? '. E':''
								)
							)
						}}
					</div>
				</div>
			</div>
			<div style="height:50px;border-style: solid;border-color: #8F8F8F;border-width: 1px 0 0 0;position: absolute;bottom:0;left:0;right:0;">
				<span style="height:50px;display:inline-block;line-height: 50px;position: absolute;left:3px;right:53px;">
					<textarea class="scrollbar1" style="resize: none;height:48px;border:none;width:100%;line-height:16px;vertical-align: middle;padding:0;font-size: 16px;"></textarea>
				</span>
				<span class="active unselectable"
					style="cursor:pointer;font-size: 16px;height:50px;padding:0 10px;display:inline-block;
						border-style: solid;border-color: #8F8F8F;border-width: 0 0 0 1px;line-height: 50px;position:absolute;right:0;">
					追踪
				</span>
			</div>
		</div>
		<div
			style="height:30px;position:absolute;bottom:0px;left:0;right:0;padding:5px;">
			<button style="font-size:16px;width:50px;height: 30px;display:inline-block;margin-right:5px;">完&nbsp;成</button>
			<button style="font-size:16px;width:50px;height: 30px;display:inline-block;margin-right:5px;">放&nbsp;弃</button>
			<button style="font-size:16px;width:50px;height: 30px;display:inline-block;margin-right:5px;">重&nbsp;启</button>
			<button style="font-size:16px;width:50px;height: 30px;display:inline-block;margin-right:5px;">延&nbsp;续</button>
			<button style="font-size:16px;width:50px;height: 30px;display:inline-block;margin-right:5px;">删&nbsp;除</button>
		</div>


	




		<!-- 选择发起人 -->
		<div v-if="editFaBuRen.todo" style="height:100%;width:100%;background-color: rgba(0,0,0,0.6);position: absolute; top:0;" >
			<div style="padding:10px 10px 10px 40px;background-color: #ffffff;margin-top:100px;max-height: 500px;overflow: auto;">
				<div style="font-size: 16px;color:#8F8F8F;">选择发起人</div>
				<div style="margin-top:5px;">
					<span style="height:28px;display: inline-block;position: relative;width:198px;border: 1px solid #8f8f8f;">
						<input v-model="editFaBuRen.kw" style="font-size:16px;line-height: 26px;border: none;width: 175px;margin-left: 5px;" />
						<span v-if="editFaBuRen.kw" 
							style="font-size:16px;line-height: 28px;display:inline-block;position: absolute;width:20px;right:0;text-align: center;cursor: pointer;"
							@click="editFaBuRen.kw=null">
							X
						</span>
					</span>
					<button style="font-size:16px;height:30px;width:48px;vertical-align: bottom;cursor: pointer;"
						@click="editFaBuRen.pn=1;editFaBuRen.items=[];chooseFaBuRen_loadItems();">搜索</button>
				</div>
				<div class="scrollbar1" style="overflow: auto;max-height: 350px;margin-top: 5px;">
					<div class="active unselectable" v-for="item in editFaBuRen.items" :key="item.userId"
						:style="{'background-color':editFaBuRen.chosen == item?'#cccccc':'#ffffff'}"
						style="padding:5px;border:1px solid #8F8F8F;margin:5px 0;cursor:pointer;background-color: #FFFFFF;position: relative;height: 20px;line-height: 20px;"
						@click="
							editFaBuRen.chosen = item
							editFaBuRen.todo=null;
							editFaBuRen.chosen = null;
							task.faBuRenUserId=item.userId
							task.faBuRenUserNickname=item.nickname
							task.faBuRenUserAlias=item.alias
						">
						<span><img :src="item.headimg" /></span>
						<span style="display:inline-block;width: 60px;height: 20px;line-height: 20px;font-size:16px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;">
							{{ item.alias?item.alias:item.nickname }}
						</span>
						<span v-if="item.alias" style="font-size: 16px;height: 20px;line-height: 20px;display: inline-block;vertical-align: top;">(</span>
						<span v-if="item.alias" 
							style="display:inline-block;width: 60px;height: 20px;line-height: 20px;font-size:16px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;">
							{{ item.nickname }}
						</span>
						<span v-if="item.alias" style="font-size: 16px;height: 20px;line-height: 20px;display: inline-block;vertical-align: top;">)</span>
						<span v-if="item.orderNo" 
							style="font-size:12px;color:#ff0000;position:absolute;right:5px;bottom: 5px;width:14px;text-align: right;
								overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
							{{item.orderNo}}
						</span>
					</div>
					<div v-if="editFaBuRen.pItems && editFaBuRen.loading"  style="font-size:12px;text-align: center;color:#8F8F8F;margin-bottom:10px;margin-top: 10px;">
						加载中
					</div>
					<div class="activeText unselectable" v-if="editFaBuRen.pItems && !editFaBuRen.loading && editFaBuRen.pItems.length == editFaBuRen.ps" 
						@click="editFaBuRen.pn++;chooseFaBuRen_loadItems()" 
						style="font-size:12px;text-align: center;color:#8F8F8F;margin-bottom:10px;margin-top: 10px;cursor: pointer;">
						点击加载更多
					</div>
					<div class="unselectable" v-if="editFaBuRen.pItems && !editFaBuRen.loading && editFaBuRen.pItems.length < editFaBuRen.ps" 
						style="font-size:12px;text-align: center;color:#8F8F8F;margin-bottom:10px;margin-top: 10px;">
						已全部加载
					</div>
				</div>
				<div style="margin-top:10px;">
					<button @click="editFaBuRen.todo=0;editFaBuRen.chosen = null;" style="font-size:16px;cursor: pointer;width:100px;height:30px;margin-right:5px;margin-bottom:5px;">取消</button>
					<button style="font-size:16px;cursor: pointer;width:100px;height:30px;margin-right:5px;margin-bottom:5px;"
						@click="
							editFaBuRen.todo=0;
							editFaBuRen.chosen = null;
							task.faBuRenUserId=null
							task.faBuRenUserNickname=null
							task.faBuRenUserAlias=null
						">
						清除
					</button>
				</div>
			</div>
		</div>

		<!-- 选择负责人 -->
		<div v-if="editFuZeRen.todo" style="height:100%;width:100%;background-color: rgba(0,0,0,0.6);position: absolute; top:0;" >
			<div style="padding:10px 10px 10px 40px;background-color: #ffffff;margin-top:100px;max-height: 500px;overflow: auto;">
				<div style="font-size: 16px;color:#8F8F8F;">选择负责人</div>
				<div style="margin-top:5px;">
					<span style="height:28px;display: inline-block;position: relative;width:198px;border: 1px solid #8f8f8f;">
						<input v-model="editFuZeRen.kw" style="font-size:16px;line-height: 26px;border: none;width: 175px;margin-left: 5px;" />
						<span v-if="editFuZeRen.kw" 
							style="font-size:16px;line-height: 28px;display:inline-block;position: absolute;width:20px;right:0;text-align: center;cursor: pointer;"
							@click="editFuZeRen.kw=null">
							X
						</span>
					</span>
					<button style="font-size:16px;height:30px;width:48px;vertical-align: bottom;cursor: pointer;"
						@click="editFuZeRen.pn=1;editFuZeRen.items=[];chooseFuZeRen_loadItems();">搜索</button>
				</div>
				<div class="scrollbar1" style="overflow: auto;max-height: 350px;margin-top: 5px;">
					<div class="active unselectable" v-for="item in editFuZeRen.items" :key="item.userId"
						:style="{'background-color':editFuZeRen.chosen == item?'#cccccc':'#ffffff'}"
						style="padding:5px;border:1px solid #8F8F8F;margin:5px 0;cursor:pointer;background-color: #FFFFFF;position: relative;height: 20px;line-height: 20px;"
						@click="
							editFuZeRen.chosen = item
							editFuZeRen.todo=null;
							editFuZeRen.chosen = null;
							task.fuZeRenUserId=item.userId
							task.fuZeRenUserNickname=item.nickname
							task.fuZeRenUserAlias=item.alias
						">
						<span><img :src="item.headimg" /></span>
						<span style="display:inline-block;width: 60px;height: 20px;line-height: 20px;font-size:16px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;">
							{{ item.alias?item.alias:item.nickname }}
						</span>
						<span v-if="item.alias" style="font-size: 16px;height: 20px;line-height: 20px;display: inline-block;vertical-align: top;">(</span>
						<span v-if="item.alias" 
							style="display:inline-block;width: 60px;height: 20px;line-height: 20px;font-size:16px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;">
							{{ item.nickname }}
						</span>
						<span v-if="item.alias" style="font-size: 16px;height: 20px;line-height: 20px;display: inline-block;vertical-align: top;">)</span>
						<span v-if="item.orderNo" 
							style="font-size:12px;color:#ff0000;position:absolute;right:5px;bottom: 5px;width:14px;text-align: right;
								overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
							{{item.orderNo}}
						</span>
					</div>
					<div v-if="editFuZeRen.pItems && editFuZeRen.loading"  style="font-size:12px;text-align: center;color:#8F8F8F;margin-bottom:10px;margin-top: 10px;">
						加载中
					</div>
					<div class="activeText unselectable" v-if="editFuZeRen.pItems && !editFuZeRen.loading && editFuZeRen.pItems.length == editFuZeRen.ps" 
						@click="editFuZeRen.pn++;chooseFuZeRen_loadItems()" 
						style="font-size:12px;text-align: center;color:#8F8F8F;margin-bottom:10px;margin-top: 10px;cursor: pointer;">
						点击加载更多
					</div>
					<div class="unselectable" v-if="editFuZeRen.pItems && !editFuZeRen.loading && editFuZeRen.pItems.length < editFuZeRen.ps" 
						style="font-size:12px;text-align: center;color:#8F8F8F;margin-bottom:10px;margin-top: 10px;">
						已全部加载
					</div>
				</div>
				<div style="margin-top:10px;">
					<button @click="editFuZeRen.todo=0;editFuZeRen.chosen = null;" style="font-size:16px;cursor: pointer;width:100px;height:30px;margin-right:5px;margin-bottom:5px;">取消</button>
					<button style="font-size:16px;cursor: pointer;width:100px;height:30px;margin-right:5px;margin-bottom:5px;"
						@click="
							editFuZeRen.todo=0;
							editFuZeRen.chosen = null;
							task.fuZeRenUserId=null
							task.fuZeRenUserNickname=null
							task.fuZeRenUserAlias=null
						">
						清除
					</button>
				</div>
			</div>
		</div>

		<div v-if="editType.todo" style="height:100%;width:100%;background-color: rgba(0,0,0,0.6);position: absolute; top:0;" >
			<div style="padding:10px 10px 10px 40px;background-color: #ffffff;margin-top:100px;max-height: 500px;overflow: auto;">
				<div style="font-size: 16px;color:#8F8F8F;">修改类型</div>
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
					<button @click="editType.todo=0;task.type=editType.value;" style="font-size:16px;cursor: pointer;width:100px;height:30px;margin-right:5px;margin-bottom:5px;">
						确定
					</button>
					<button @click="editType.todo=0;" style="font-size:16px;cursor: pointer;width:100px;height:30px;margin-right:5px;margin-bottom:5px;">取消</button>
				</div>
			</div>
		</div>

		<div v-if="editFinalTime.todo" style="height:100%;width:100%;background-color: rgba(0,0,0,0.6);position: absolute; top:0;" >
			<div style="padding:10px 10px 10px 40px;background-color: #ffffff;margin-top:100px;max-height: 500px;overflow: auto;">
				<div style="font-size: 16px;color:#8F8F8F;">修改截止时间</div>
				<div style="line-height:30px;position: relative;height: 30px;border-style: solid;border-color: #8F8F8F;border-width: 1px;margin-top:5px;">
						<input v-model="editFinalTime.date" style="font-size: 16px;line-height:28px;border: none;width:160px;" type="date"/>
					<span v-if="editFinalTime.date"
						@click="editFinalTime.value=editFinalTime.date=null;" 
						style="font-size: 16px;cursor: pointer;line-height:30px;position: absolute;display:inline-block;right: 0px;width: 15px;text-align: center;">
						x
					</span>
				</div>
				<div style="margin-top:10px;">
					<button
						style="font-size:16px;cursor: pointer;width:100px;height:30px;margin-right:5px;margin-bottom:5px;"
						@click="
							task.finalTime=$moment(editFinalTime.date+' 23:59:59.999').format('YYYY-MM-DD HH:mm:ss.SSS Z');
							editFinalTime.todo=0;
						">
						确定
					</button>
					<button @click="editFinalTime.todo=0;" style="font-size:16px;cursor: pointer;width:100px;height:30px;margin-right:5px;margin-bottom:5px;">取消</button>
				</div>
			</div>
		</div>
		
		<div v-if="editOrderNo.todo" style="height:100%;width:100%;background-color: rgba(0,0,0,0.6);position: absolute; top:0;" >
			<div style="padding:10px 10px 10px 40px;background-color: #ffffff;margin-top:100px;max-height: 500px;overflow: auto;">
				<div style="font-size: 16px;color:#8F8F8F;">修改排序</div>
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
					<button @click="editOrderNo.todo=0;task.orderNo=editOrderNo.value;"
						style="font-size:16px;cursor: pointer;width:100px;height:30px;margin-right:5px;margin-bottom:5px;">
						确定
					</button>
					<button @click="editOrderNo.todo=0;" style="font-size:16px;cursor: pointer;width:100px;height:30px;margin-right:5px;margin-bottom:5px;">取消</button>
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
				queryString : null,
				query: {
					taskId : null
				},
				lookAllTracks:null,
				task: null,
				tracks:{
					kw:null,
					items:null,
					sum: null,
					pn:null,
					ps:15,
					loading:null,
				},
				editType:{
					todo: null,
					value: null,
				},
				editFinalTime:{
					todo: null,
					date: null,
					value: null,
				},
				editOrderNo:{
					todo: null,
					value: null,
				},
				editFaBuRen: {
					chosen:null,
					todo: null,
					kw: null,
					pn: null,
					ps: 15,
					items : null,
					pItems : null
				},
				editFuZeRen: {
					chosen:null,
					todo: null,
					kw: null,
					pn: null,
					ps: 15,
					items : null,
					pItems : null
				},
			}
		},
		activated() {
			debugger
			let thisV = this
			window.thisV=thisV;
			if (thisV.queryString != JSON.stringify(thisV.$route.query)) {
				thisV.reload();

				thisV.queryString = JSON.stringify(thisV.$route.queryString);
				thisV.query = thisV.$route.query;
			}else{
				
			}
		},
		methods: {
			reload() {
				debugger
				let thisV = this
				Object.assign(thisV.$data, thisV.$options.data());

				thisV.$axios.get('/recording/task?' + thisV.$qs.stringify({taskId:thisV.query.taskId})).then(data => {
					debugger
					if (data.data.code == 0) {
							thisV.task = data.data.data;
					} else {
						if(data.data.codeMsg)
							thisV.$notify({ type: 'danger', message: data.data.codeMsg });
					}
				})
				thisV.loadTracks();
			},
			loadTracks(){
				thisV.$axios.get('/recording/task-tracks?' + thisV.$qs.stringify({taskId:thisV.query.taskId})).then(data => {
					debugger
					if (data.data.code == 0) {
							thisV.tracks.items = data.data.data.items;
					} else {
						if(data.data.codeMsg)
							thisV.$notify({ type: 'danger', message: data.data.codeMsg });
					}
				})
			},
			chooseFaBuRen_loadItems(){
				debugger
				let thisV = this
				thisV.editFaBuRen.loading=1
				var obj = {
					kw:thisV.editFaBuRen.kw,
					pn:thisV.editFaBuRen.pn,
					ps:thisV.editFaBuRen.ps
				}
				thisV.$axios.get('/recording/my-friends?' + thisV.$qs.stringify(obj)).then(data => {
					debugger
					if (data.data.code == 0) {
						if(data.data.data.items.length>0){
							if(thisV.editFaBuRen.pn==1)
								thisV.editFaBuRen.items=[]
							thisV.editFaBuRen.pItems = data.data.data.items
							thisV.editFaBuRen.items=thisV.editFaBuRen.items.concat(data.data.data.items)
						}else
							thisV.editFaBuRen.pn--;
					} else {
						if(data.data.codeMsg)
							thisV.$notify({ type: 'danger', message: data.data.codeMsg });
					}
					thisV.editFaBuRen.loading=0
				})
			},
			chooseFuZeRen_loadItems(){
				debugger
				let thisV = this
				thisV.editFuZeRen.loading=1
				var obj = {
					kw:thisV.editFuZeRen.kw,
					pn:thisV.editFuZeRen.pn,
					ps:thisV.editFuZeRen.ps
				}
				thisV.$axios.get('/recording/my-friends?' + thisV.$qs.stringify(obj)).then(data => {
					debugger
					if (data.data.code == 0) {
						if(data.data.data.items.length>0){
							if(thisV.editFuZeRen.pn==1)
								thisV.editFuZeRen.items=[]
							thisV.editFuZeRen.pItems = data.data.data.items
							thisV.editFuZeRen.items=thisV.editFuZeRen.items.concat(data.data.data.items)
						}else
							thisV.editFuZeRen.pn--;
					} else {
						if(data.data.codeMsg)
							thisV.$notify({ type: 'danger', message: data.data.codeMsg });
					}
					thisV.editFuZeRen.loading=0
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