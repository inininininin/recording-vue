<template>
	<div id="create-task" class="scrollbar" style="font-size: 0;position:absolute;top:0;bottom:0;right:0;left:0;" >
		<div  style="text-align: center;height:40px;line-height: 40px;border-bottom:1px solid #8F8F8f;position: absolute;
				width: 100%;top:0;background-color: #FFFFFF;">
			<span class="active"
				@click="window.history.length<=1 ? $router.push({path:'/index'}) : $router.back();"
				style="position: absolute;left:0;width:40px;cursor: pointer;font-weight: 900;font-size:16px;">
				<
			</span>
			<span style="font-weight: 900;font-size:16px;">
				创建任务
			</span>
		</div>
		<div class="scrollbar" style="top:41px;bottom:51px;position: absolute;overflow:auto;width:100%;">
			<div style="font-size: 0px;width:100%;height:40px;border-bottom:1px solid #8F8F8F;position: relative;">
				<span style="font-size: 16px;height: 40px;width:80px;display: inline-block;line-height:40px;padding:0 5px;
					overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: top;">
					任务名
				</span>
				<span style="font-size: 16px;display: inline-block;line-height: 60px;vertical-align: text-top;height: 40px;">
					<span style="display: inline-block;height:30px;border-left:1px solid #8F8F8F;"></span>
				</span>
				
				<span  style="display: inline-block;line-height:40px;position: absolute;left:91px;right:0;height: 40px;">
					<span style="display: inline-block;line-height:40px;position: absolute;left:5px;right:15px;text-align: center;height: 40px;">
						<input ref="nameRef" v-model="name" style="font-size: 16px;line-height:38px;border: none;width:100%;padding:0;" />
					</span>
					<span v-if="name" @click="name=null" 
						style="font-size: 16px;cursor: pointer;line-height:40px;position: absolute;display:inline-block;right: 0px;width: 15px;text-align: center;">
						x
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
				
				<span  style="display: inline-block;line-height:40px;position: absolute;left:91px;right:0;height: 40px;">
					<span class="active"
						@click="
							kindId=null;
						" 
						style="width: 20px;padding:0px 8px;font-size: 16px;cursor: pointer;display:inline-block;
							border-right:1px solid #8f8f8f;min-width: 20px;text-align: center;vertical-align: top;"
						:style="{
							'background-color':(!kindId ? '#d8d5d5' : '#ffffff')}" >
						无
					</span>
					<!-- <span v-if="unitKinds.chosenKind" class="active"
						@click="
							kindId=unitKinds.chosenKind.kindId;
						" 
						style="max-width: 60px;min-width: 20px;padding:0px 8px;font-size: 16px;cursor: pointer;display:inline-block;
							border-right:1px solid #8f8f8f;min-width: 20px;text-align: center;vertical-align: top;"
						:style="{
							'background-color':(kindId==unitKinds.chosenKind.kindId ? '#d8d5d5' : '#ffffff')}" >
						{{unitKinds.chosenKind.name}}
					</span> -->
					<span class="active" v-for="item in kinds" :key="item.kindId" 
						v-if="kinds"
						@click="
							kindId=item.kindId
						" 
						:style="{'background-color':(kindId==item.kindId ? '#d8d5d5' : '#ffffff')}" 
						style="padding:0 8px;font-size: 16px;cursor: pointer;display:inline-block;
							border-right:1px solid #8f8f8f;min-width: 20px;text-align: left;overflow: hidden;
							text-overflow:ellipsis;max-width:60px;vertical-align: baseline;">
						{{item.name}}
					</span>
					<span class="active" 
						style="background-color: #fff;font-weight: 900;padding:0 8px;font-size: 16px;cursor: pointer;
							display:inline-block;border-left:1px solid #8f8f8f;position: absolute;right:0px;top:0px;">
						···
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
					<span v-if="!chosenFaQiRen" class="active" 
						style="text-align: center;cursor: pointer;font-size: 14px;display:inline-block;width:100%"
						@click="
							chooseFaQiRen.start=1;
							if(chooseFaQiRen.currItems == null){
								chooseFaQiRen.pn=1;
								chooseFaQiRen_loadItems();
							}
						">
						点击选择
					</span>
					<span v-if="chosenFaQiRen"  
						style="display:inline-block;position: absolute; left:5px; right:5px;line-height:40px;height:40px;">
						<span  
							style="line-height:40px;height:40px;font-size: 16px;display:inline-block;max-width: 100px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: top;">
							{{ chosenFaQiRen.alias || chosenFaQiRen.nickname }}
						</span>
						<span class="active" 
							style="margin-left:5px;width:20x;line-height:40px;height:40px;font-size: 16px;display:inline-block;width: 20px;text-align: center;cursor: pointer;"
							@click="
								chooseFaQiRen.start=1;
								if(chooseFaQiRen.currItems == null){
									chooseFaQiRen.pn=1;
									chooseFaQiRen_loadItems();
								}
							">
							<img draggable="false"  src="../assets/img/refresh.png" style="width: 18px;vertical-align: sub;"/>
						</span>
						<span class="active" 
							style="line-height:40px;width:20x;height:40px;font-size: 16px;display:inline-block;width: 20px;text-align: center;cursor: pointer;"
							@click="chosenFaQiRen=null">
							X
						</span>
					</span>
				</span>
			</div>
			<div style="font-size: 0px;width:100%;height:40px;border-bottom:1px solid #8F8F8F;position: relative;">
				<span  style="font-size: 16px;height: 40px;width:80px;display: inline-block;line-height:40px;padding:0 5px;
					overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: top;">
					负责人
				</span>
				<span style="font-size: 16px;display: inline-block;line-height: 60px;vertical-align: text-top;height: 40px;">
					<span style="display: inline-block;height:30px;border-left:1px solid #8F8F8F;"></span>
				</span>
				
				<span  style="display: inline-block;line-height:40px;position: absolute;left:91px;right:0;height: 40px;">
					<span v-if="!chosenFuZeRen" class="active" 
						style="text-align: center;cursor: pointer;font-size: 14px;display:inline-block;width:100%"
						@click="
							chooseFuZeRen.start=1;
							if(chooseFuZeRen.currItems == null){
								chooseFuZeRen.pn=1;
								chooseFuZeRen_loadItems();
							}
						">
						点击选择
					</span>
					<span v-if="chosenFuZeRen"  
						style="display:inline-block;position: absolute; left:5px; right:5px;line-height:40px;height:40px;">
						<span  
							style="line-height:40px;height:40px;font-size: 16px;display:inline-block;max-width: 100px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: top;">
							{{ chosenFuZeRen.alias || chosenFuZeRen.nickname }}
						</span>
						<span class="active" 
							style="margin-left:5px;line-height:40px;height:40px;font-size: 16px;display:inline-block;width: 20px;text-align: center;cursor: pointer;"
							@click="
								chooseFuZeRen.start=1;
								if(chooseFuZeRen.currItems == null){
									chooseFuZeRen.pn=1;
									chooseFuZeRen_loadItems();
								}
							">
							<img draggable="false"  src="../assets/img/refresh.png" style="width: 18px;vertical-align: sub;"/>
						</span>
						<span class="active" 
							style="line-height:40px;height:40px;font-size: 16px;display:inline-block;width: 20px;text-align: center;cursor: pointer;"
							@click="chosenFuZeRen=null">
							X
						</span>
					</span>
				</span>
			</div>
			<div style="font-size: 0px;width:100%;height:200px;border-bottom:1px solid #8F8F8F;position: relative;">
				<span  style="font-size: 16px;height: 186px;width:80px;display: inline-block;line-height:20px;padding:7px 5px 7px 5px;
					overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: top;">
					内容
				</span>
				<span style="font-size: 16px;display: inline-block;line-height: 200px;vertical-align: text-top;height: 200px;">
					<span style="display: inline-block;height:190px;border-left:1px solid #8F8F8F;vertical-align: middle;"></span>
				</span>
				<span style="display: inline-block;position: absolute;left:96px;right:5px;height: 200px;">
					<textarea class="scrollbar1" v-model="content" 
						style="resize:none;font-size: 16px;height:188px;border: none;width:100%;margin-top: 7px;padding:0;"></textarea>
				</span>
			</div>
			<div style="font-size: 0px;width:100%;height:40px;border-bottom:1px solid #8F8F8F;position: relative;">
				<span  style="font-size: 16px;height: 40px;width:80px;display: inline-block;line-height:40px;padding:0 5px;
					overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: top;"
					:style="{color:errParam=='type'?'red':null}">
					类型
				</span>
				<span style="font-size: 16px;display: inline-block;line-height: 60px;vertical-align: text-top;height: 40px;">
					<span style="display: inline-block;height:30px;border-left:1px solid #8F8F8F;"></span>
				</span>
				
				<span  style="display: inline-block;line-height:40px;position: absolute;left:91px;right:0px;height: 40px;">
					<input v-model="type" value="1" id="type1" name="type" style="cursor: pointer;margin-left:5px;" type="radio"/>
					<label for="type1" style="font-size: 16px;cursor: pointer;">推进</label>
					<input v-model="type" value="2" id="type2" name="type" style="margin-left:20px;cursor: pointer;" type="radio"/>
					<label for="type2" style="font-size: 16px;cursor: pointer;">缺陷</label>
					<span v-if="type" @click="type=null" 
						style="font-size: 16px;cursor: pointer;line-height:40px;position: absolute;display:inline-block;right: 0px;width: 15px;text-align: center;">
						x
					</span>
				</span>
			</div>
			<div style="font-size: 0px;width:100%;height:40px;border-bottom:1px solid #8F8F8F;position: relative;">
				<span  style="font-size: 16px;height: 40px;width:80px;display: inline-block;line-height:40px;padding:0 5px;
					overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: top;">
					截止时间
				</span>
				<span style="font-size: 16px;display: inline-block;line-height: 60px;vertical-align: text-top;height: 40px;">
					<span style="display: inline-block;height:30px;border-left:1px solid #8F8F8F;"></span>
				</span>
				
				<span style="display: inline-block;line-height:40px;position: absolute;left:91px;right:0;height: 40px;">
					<span style="display: inline-block;line-height:40px;position: absolute;left:5px;right:15px;height: 40px;">
						<input v-model="finalTimeDate" type="date" style="font-size: 14px;height:30px;line-height:30px;border:none;width: 140px;vertical-align: middle;" />
					</span>
					<span v-show="finalTime || finalTimeDate" @click="finalTime=finalTimeDate=null" 
						style="font-size: 16px;cursor: pointer;line-height:40px;position: absolute;display:inline-block;right: 0px;width: 15px;text-align: center;">
						x
					</span>
				</span>
			</div>
			<div style="font-size: 0px;width:100%;height:40px;border-bottom:1px solid #8F8F8F;position: relative;">
				<span  style="font-size: 16px;height: 40px;width:80px;display: inline-block;line-height:40px;padding:0 5px;
					overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: top;">
					排序
				</span>
				<span style="font-size: 16px;display: inline-block;line-height: 60px;vertical-align: text-top;height: 40px;">
					<span style="display: inline-block;height:30px;border-left:1px solid #8F8F8F;"></span>
				</span>
				
				<span  style="display: inline-block;line-height:40px;position: absolute;left:91px;right:0;height: 40px;">
					<span style="display: inline-block;line-height:40px;position: absolute;left:5px;right:15px;text-align: center;height: 40px;">
						<input v-model="orderNo" style="font-size: 16px;line-height:38px;border: none;width:100%;padding:0;" type="number"/>
					</span>
					<span v-if="orderNo" @click="orderNo=null" 
						style="font-size: 16px;cursor: pointer;line-height:40px;position: absolute;display:inline-block;right: 0px;width: 15px;text-align: center;">
						x
					</span>
				</span>
			</div>
		</div>
		<div class="unselectable active"
			style="height:50px;position:absolute;bottom:0px;width:100%;text-align: center;
				line-height: 50px;font-size: 18px;cursor: pointer;background-color:#366cb3;color:#ffffff;"
			@click="createTask()">
			创&nbsp;&nbsp;&nbsp;&nbsp;建
		</div>


		<!-- 选择发起人 -->
		<div v-if="chooseFaQiRen.start" style="height:100%;width:100%;background-color: rgba(0,0,0,0.6);position: absolute; top:0;" >
			<div style="padding:10px 10px 10px 40px;background-color: #ffffff;margin-top:100px;max-height: 500px;overflow: auto;">
				<div style="font-size: 16px;color:#6b6b6b;">
					选择发起人
				</div>
				<div style="margin-top:5px;">
					<span style="height:28px;display: inline-block;position: relative;width:198px;border: 1px solid #8f8f8f;">
						<input v-model="chooseFaQiRen.kw" style="font-size:16px;line-height: 26px;border: none;width: 175px;margin-left: 5px;padding:0;" 
							@keyup.enter="chooseFaQiRen.pn=1;chooseFaQiRen.items=[];chooseFaQiRen_loadItems();"/>
						<span v-if="chooseFaQiRen.kw" 
							style="font-size:16px;line-height: 28px;display:inline-block;position: absolute;width:20px;right:0;text-align: center;cursor: pointer;"
							@click="chooseFaQiRen.kw=null">
							X
						</span>
					</span>
					<span class="active" 
						style="font-size:16px;height:28px;line-height:28px;width:48px;vertical-align: bottom;cursor: pointer;margin-left: -1px;
							text-align: center;border:1px solid #8f8f8f;display:inline-block;"
						@click="chooseFaQiRen.pn=1;chooseFaQiRen.items=[];chooseFaQiRen_loadItems();">
						搜索
					</span>
				</div>
				<div class="scrollbar1" style="overflow: auto;max-height: 350px;margin-top: 5px;">
					<div class="active" v-for="item in chooseFaQiRen.items" :key="item.userId" @click=""
						style="padding:5px;border:1px solid #8F8F8F;margin:5px 0;cursor:pointer;background-color: #FFFFFF;position: relative;height: 20px;line-height: 20px;"
						@click="
							chosenFaQiRen=item
							chooseFaQiRen.start=0
						">
						<span><img draggable="false"  :src="item.headimg" /></span>
						<span style="display:inline-block;max-width: 100px;height: 20px;line-height: 20px;font-size:16px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;">
							{{ item.alias?item.alias:item.nickname }}
						</span>
						<span v-if="item.nickname != item.alias">
							<span v-if="item.alias" style="font-size: 16px;height: 20px;line-height: 20px;display: inline-block;vertical-align: top;color:#6b6b6b;">(</span>
							<span v-if="item.alias" 
								style="display:inline-block;max-width: 100px;height: 20px;line-height: 20px;font-size:16px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;color:#6b6b6b;">
								{{ item.nickname }}
							</span>
							<span v-if="item.alias" style="font-size: 16px;height: 20px;line-height: 20px;display: inline-block;vertical-align: top;color:#6b6b6b;">)</span>
							<span v-if="item.orderNo" 
								style="font-size:12px;color:#ff0000;position:absolute;right:5px;bottom: 5px;width:14px;text-align: right;
									overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
								{{item.orderNo}}
							</span>
						</span>
					</div>
					<div  v-if="chooseFaQiRen.loading"  style="font-size:14px;text-align: center;color:#6b6b6b;margin-bottom:10px;margin-top: 10px;">
						加载中
					</div>
					<div class="active unselectable" v-if="chooseFaQiRen.currItems && !chooseFaQiRen.loading && chooseFaQiRen.currItems.length == chooseFaQiRen.ps" 
						@click="chooseFaQiRen.pn++;chooseFaQiRen_loadItems()" 
						style="font-size:14px;text-align: center;color:#6b6b6b;margin-bottom:10px;margin-top: 10px;cursor: pointer;">
						点击加载更多
					</div>
					<div  v-if="chooseFaQiRen.currItems && !chooseFaQiRen.loading && chooseFaQiRen.items.length>0 && chooseFaQiRen.currItems.length < chooseFaQiRen.ps" 
						style="font-size:14px;text-align: center;color:#6b6b6b;margin-bottom:10px;margin-top: 10px;">
						已全部加载
					</div>
					<div v-if="!chooseFaQiRen.loading && (!chooseFaQiRen.items || chooseFaQiRen.items.length==0)" 
						style="font-size:14px;text-align: center;color:#6b6b6b;margin-bottom:10px;margin-top: 10px;">
						暂无数据
					</div>
				</div>
				<div style="margin-top:10px;">
					<button @click="chooseFaQiRen.start=null;" style="font-size:16px;cursor: pointer;width:100px;height:30px;margin-right:5px;margin-bottom:5px;">
						关 闭
					</button>
				</div>
			</div>
		</div>

		<!-- 选择负责人 -->
		<div v-if="chooseFuZeRen.start" style="height:100%;width:100%;background-color: rgba(0,0,0,0.6);position: absolute; top:0;" >
			<div style="padding:10px 10px 10px 40px;background-color: #ffffff;margin-top:100px;max-height: 500px;overflow: auto;">
				<div style="font-size: 16px;color:#6b6b6b;">
					选择负责人
				</div>
				<div style="margin-top:5px;">
					<span style="height:28px;display: inline-block;position: relative;width:198px;border: 1px solid #8f8f8f;">
						<input v-model="chooseFuZeRen.kw" style="font-size:16px;line-height: 26px;border: none;width: 175px;margin-left: 5px;padding:0;" />
						<span v-if="chooseFuZeRen.kw" 
							style="font-size:16px;line-height: 28px;display:inline-block;position: absolute;width:20px;right:0;text-align: center;cursor: pointer;"
							@click="chooseFuZeRen.kw=null">
							X
						</span>
					</span>
					<span class="active" 
						style="font-size:16px;height:28px;line-height:28px;width:48px;vertical-align: bottom;cursor: pointer;margin-left: -1px;
							text-align: center;border:1px solid #8f8f8f;display:inline-block;"
						@click="chooseFuZeRen.pn=1;chooseFuZeRen.items=[];chooseFuZeRen_loadItems();">
						搜索
					</span>
				</div>
				<div class="scrollbar1" style="overflow: auto;max-height: 350px;margin-top: 5px;">
					<div class="active" v-for="item in chooseFuZeRen.items" :key="item.userId" @click=""
						style="padding:5px;border:1px solid #8F8F8F;margin:5px 0;cursor:pointer;background-color: #FFFFFF;position: relative;height: 20px;line-height: 20px;"
						@click="
							chosenFuZeRen=item
							chooseFuZeRen.start=null
						">
						<span><img draggable="false"  :src="item.headimg" /></span>
						<span style="display:inline-block;max-width: 100px;height: 20px;line-height: 20px;font-size:16px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;">
							{{ item.alias?item.alias:item.nickname }}
						</span>
						<span v-if="item.nickname != item.alias">
							<span v-if="item.alias" style="font-size: 16px;height: 20px;line-height: 20px;display: inline-block;vertical-align: top;color:#6b6b6b;">(</span>
							<span v-if="item.alias" 
								style="display:inline-block;max-width: 100px;height: 20px;line-height: 20px;font-size:16px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;color:#6b6b6b;">
								{{ item.nickname }}
							</span>
							<span v-if="item.alias" style="font-size: 16px;height: 20px;line-height: 20px;display: inline-block;vertical-align: top;color:#6b6b6b;">)</span>
						</span>
						<span v-if="item.orderNo" 
							style="font-size:12px;color:#ff0000;position:absolute;right:5px;bottom: 5px;width:14px;text-align: right;
								overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
							{{item.orderNo}}
						</span>
					</div>
					<div v-if="chooseFuZeRen.loading"  style="font-size:14px;text-align: center;color:#6b6b6b;margin-bottom:10px;margin-top: 10px;">
						加载中
					</div>
					<div class="active unselectable" v-if="chooseFuZeRen.currItems && !chooseFuZeRen.loading && chooseFuZeRen.currItems.length == chooseFuZeRen.ps" 
						@click="chooseFuZeRen.pn++;chooseFuZeRen_loadItems()" 
						style="font-size:14px;text-align: center;color:#6b6b6b;margin-bottom:10px;margin-top: 10px;cursor: pointer;">
						点击加载更多
					</div>
					<div  v-if="chooseFuZeRen.currItems && !chooseFuZeRen.loading && chooseFuZeRen.items.length>0 && chooseFuZeRen.currItems.length < chooseFuZeRen.ps" 
						style="font-size:14px;text-align: center;color:#6b6b6b;margin-bottom:10px;margin-top: 10px;">
						已全部加载
					</div>
					<div v-if="!chooseFuZeRen.loading && (!chooseFuZeRen.items || chooseFuZeRen.items.length==0)" 
						style="font-size:14px;text-align: center;color:#6b6b6b;margin-bottom:10px;margin-top: 10px;">
						暂无数据
					</div>
				</div>
				<div style="margin-top:10px;">
					<button @click="chooseFuZeRen.start=null;" style="font-size:16px;cursor: pointer;width:100px;height:30px;margin-right:5px;margin-bottom:5px;">关 闭</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'create-task',
		data() {
			return {
				query:null,
				type:1,
				name:null,
				kindId:null,
				kindName:null,
				content:null,
				orderNo:null,
				finalTime:null,
				finalTimeDate:null,
				imageList:[],
				query: '',
				chosenFaQiRen: null,
				chosenFuZeRen: null,
				autoRedoTomorrowIs:0,
				errParam:null,
				chooseFaQiRen: {
					start: null,
					loading:null,
					kw: null,
					pn: null,
					ps: 15,
					items : null,
					currItems : null
				},
				chooseFuZeRen: {
					start: null,
					loading:null,
					kw: null,
					pn: null,
					ps: 15,
					items : null,
					currItems : null
				},
				kinds:null,
			}
		},
		activated() {
			
			let vue = this
			window.vue=vue;
			if (JSON.stringify(vue.query) != JSON.stringify(vue.$route.query)) {
				if(vue.query)
					Object.assign(vue.$data, vue.$options.data());
				vue.query = vue.$route.query;
				vue.load();
			}else{
			
			}
		},
		methods: {
			load() {
				
				let vue = this;
				vue.$refs.nameRef.focus()

				vue.$axios.get('/banban/my-task/kinds?'
				+vue.$qs.stringify({sort:'orderNo',order:'asc'}))
				.then(res => {
					if (res.data.code == 0) {
						if(!vue.kinds) vue.kinds = []
						if(res.data.data.kinds.list.length>0)
							vue.kinds=vue.kinds.concat(res.data.data.kinds.list)
					}
				})
			},
			createTask() {
				let vue = this
				
				vue.$dialog.confirm({message:'确认创建吗?'}).then(param=>{
					if(vue.finalTimeDate){
						vue.finalTime = vue.$moment(vue.finalTimeDate+' 23:59:59.999').format('YYYY-MM-DD HH:mm:ss.SSS Z');
					}
					
					var task = {
						finalTime:vue.finalTime,
						faQiRenUserId:vue.$o(vue.chosenFaQiRen).attr('toUserId'),
						faQiRenNickname:vue.$o(vue.chosenFaQiRen).attr('nickname'),
						faQiRenAlias:vue.$o(vue.chosenFaQiRen).attr('alias'),
						fuZeRenUserId:vue.$o(vue.chosenFuZeRen).attr('toUserId'),
						fuZeRenNickname:vue.$o(vue.chosenFuZeRen).attr('nickname'),
						fuZeRenAlias:vue.$o(vue.chosenFuZeRen).attr('alias'),
						type:vue.type,
						name:vue.name,
						content:vue.content,
						orderNo:vue.orderNo,
						kindId:vue.kindId,
						kindName:vue.kindName
					}
					vue.$axios.post('/banban/my-task/create-task',vue.$qs.stringify(task)).then(res=>{
						
						vue.errParam=res.data.errParam
						if(res.data.codeMsg)
							vue.$dialog.alert({ type:'primary', message:res.data.codeMsg})
						if (res.data.code == 0) {
							if(!res.data.codeMsg) {
								task.taskId=res.data.data.taskId;
								task.createTime=vue.$moment().format('YYYY-MM-DD HH:mm:ss.SSS Z')
								vue.$store.state.createdTask=task
								vue.$notify({type:'success',message:'创建成功'})
								vue.$router.back()
							}
						}
					})
				})
				
				
			},
			chooseFaQiRen_loadItems(){
				
				let vue = this
				vue.chooseFaQiRen.loading=1
				var obj = {
					kw:vue.chooseFaQiRen.kw,
					pn:vue.chooseFaQiRen.pn,
					ps:vue.chooseFaQiRen.ps
				}
				vue.$axios.get('/banban/my-friend/friends?' + vue.$qs.stringify(obj)).then(data => {
					
					if (data.data.code == 0) {
						if(data.data.data.items.length>0){
							if(vue.chooseFaQiRen.pn==1)
								vue.chooseFaQiRen.items=[]
							vue.chooseFaQiRen.currItems = data.data.data.items
							vue.chooseFaQiRen.items=vue.chooseFaQiRen.items.concat(data.data.data.items)
						}else
							vue.chooseFaQiRen.pn--;
					} else {
						if(data.data.codeMsg)
							vue.$dialog.alert({  message: data.data.codeMsg });
					}
					vue.chooseFaQiRen.loading=0
				})
			},
			chooseFuZeRen_loadItems(){
				
				let vue = this
				vue.chooseFuZeRen.loading=1
				var obj = {
					kw:vue.chooseFuZeRen.kw,
					pn:vue.chooseFuZeRen.pn,
					ps:vue.chooseFuZeRen.ps
				}
				vue.$axios.get('/banban/my-friend/friends?' + vue.$qs.stringify(obj)).then(data => {
					
					if (data.data.code == 0) {
						if(data.data.data.items.length>0){
							if(vue.chooseFuZeRen.pn==1)
								vue.chooseFuZeRen.items=[]
							vue.chooseFuZeRen.currItems = data.data.data.items
							vue.chooseFuZeRen.items=vue.chooseFuZeRen.items.concat(data.data.data.items)
						}else
							vue.chooseFuZeRen.pn--;
					} else {
						if(data.data.codeMsg)
							vue.$dialog.alert({  message: data.data.codeMsg });
					}
					vue.chooseFuZeRen.loading=0
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