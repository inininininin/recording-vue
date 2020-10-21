<template>
	<div id="create-task" class="scrollbar" style="height:100%;overflow:auto;position: relative;" >
		<div style="text-align: center;height:40px;line-height: 40px;border-bottom:1px solid #8F8F8f;position: absolute;
				width: 100%;top:0;background-color: #FFFFFF;">
			<span class="active unselectable"
				@click="window.history.length<=1 ? $router.push({path:'/index',query:{time:new Date().getTime+''}}) : $router.back();"
				style="position: absolute;left:0;width:40px;cursor: pointer;font-weight: 900;">
				<
			</span>
			<span style="font-weight: 900;">创建任务</span>
		</div>
		<div class="scrollbar" style="top:41px;bottom:51px;position: absolute;overflow:auto;width:100%;">
			<div style="font-size: 0px;width:100%;height:40px;border-bottom:1px solid #8F8F8F;position: relative;">
				<span style="font-size: 16px;height: 40px;width:80px;display: inline-block;line-height:40px;padding:0 5px;
					overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: top;">
					发起人
				</span>
				<span style="font-size: 16px;display: inline-block;line-height: 60px;vertical-align: text-top;height: 40px;">
					<span style="display: inline-block;height:30px;border-left:1px solid #8F8F8F;"></span>
				</span>
				
				<span  style="display: inline-block;line-height:40px;position: absolute;left:91px;right:0;height: 40px;">
					<span v-if="!chosenFaBuRen" class="active unselectable" 
						style="text-align: center;cursor: pointer;font-size: 14px;display:inline-block;width:100%"
						@click="
							chooseFaBuRen.todo=1;
							chooseFaBuRen.pn=1;
							chooseFaBuRen_loadItems();
						">
						点击选择
					</span>
					<span v-if="chosenFaBuRen" class="unselectable" 
						style="display:inline-block;position: absolute; left:5px; right:5px;line-height:40px;height:40px;">
						<span class="unselectable" 
							style="line-height:40px;height:40px;font-size: 16px;display:inline-block;">
							{{ chosenFaBuRen.alias || chosenFaBuRen.nickname }}
						</span>
						<span class="active unselectable" 
							style="margin-left:5px;line-height:40px;height:40px;font-size: 16px;display:inline-block;width: 20px;text-align: center;cursor: pointer;"
							@click="chooseFaBuRen.todo=1;chooseFaBuRen.pn=1;chooseFaBuRen_loadItems();">
							O
						</span>
						<span class="active unselectable" 
							style="line-height:40px;height:40px;font-size: 16px;display:inline-block;width: 20px;text-align: center;cursor: pointer;"
							@click="chosenFaBuRen=null">
							X
						</span>
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
				
				<span  style="display: inline-block;line-height:40px;position: absolute;left:91px;right:0;height: 40px;">
					<span v-if="!chosenFuZeRen" class="active unselectable" 
						style="text-align: center;cursor: pointer;font-size: 14px;display:inline-block;width:100%"
						@click="
							chooseFuZeRen.todo=1;
							chooseFuZeRen.pn=1;
							chooseFuZeRen_loadItems();
						">
						点击选择
					</span>
					<span v-if="chosenFuZeRen" class="unselectable" 
						style="display:inline-block;position: absolute; left:5px; right:5px;line-height:40px;height:40px;">
						<span class="unselectable" 
							style="line-height:40px;height:40px;font-size: 16px;display:inline-block;">
							{{ chosenFuZeRen.alias || chosenFuZeRen.nickname }}
						</span>
						<span class="active unselectable" 
							style="margin-left:5px;line-height:40px;height:40px;font-size: 16px;display:inline-block;width: 20px;text-align: center;cursor: pointer;"
							@click="chooseFuZeRen.todo=1;chooseFuZeRen.pn=1;chooseFuZeRen_loadItems();">
							O
						</span>
						<span class="active unselectable" 
							style="line-height:40px;height:40px;font-size: 16px;display:inline-block;width: 20px;text-align: center;cursor: pointer;"
							@click="chosenFuZeRen=null">
							X
						</span>
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
					<textarea class="scrollbar1" v-model="content" style="resize:none;font-size: 16px;height:188px;border: none;width:100%;margin-top: 7px;padding:0;"></textarea>
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
				
				<span  style="display: inline-block;line-height:40px;position: absolute;left:91px;right:0px;height: 40px;">
					<input v-model="type" value="1" id="type1" name="type" style="cursor: pointer;" type="radio"/>
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
				<span style="font-size: 16px;height: 40px;width:80px;display: inline-block;line-height:40px;padding:0 5px;
					overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: top;">
					截止时间
				</span>
				<span style="font-size: 16px;display: inline-block;line-height: 60px;vertical-align: text-top;height: 40px;">
					<span style="display: inline-block;height:30px;border-left:1px solid #8F8F8F;"></span>
				</span>
				
				<span  style="display: inline-block;line-height:40px;position: absolute;left:91px;right:0;height: 40px;">
					<span style="display: inline-block;line-height:48px;position: absolute;left:5px;right:15px;height: 40px;">
						<input v-model="endTimeDate" type="date" style="font-size: 14px;height:30px;border:none;width: 140px;" />
					</span>
					<span v-show="endTime || endTimeDate" @click="endTime=endTimeDate=null" 
						style="font-size: 16px;cursor: pointer;line-height:40px;position: absolute;display:inline-block;right: 0px;width: 15px;text-align: center;">
						x
					</span>
				</span>
			</div>
			<div style="font-size: 0px;width:100%;height:40px;border-bottom:1px solid #8F8F8F;position: relative;">
				<span style="font-size: 16px;height: 40px;width:80px;display: inline-block;line-height:40px;padding:0 5px;
					overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: top;">
					排序
				</span>
				<span style="font-size: 16px;display: inline-block;line-height: 60px;vertical-align: text-top;height: 40px;">
					<span style="display: inline-block;height:30px;border-left:1px solid #8F8F8F;"></span>
				</span>
				
				<span  style="display: inline-block;line-height:40px;position: absolute;left:91px;right:0;height: 40px;">
					<span style="display: inline-block;line-height:40px;position: absolute;left:5px;right:15px;text-align: center;height: 40px;">
						<input v-model="orderNo" style="font-size: 16px;line-height:38px;border: none;width:100%;" type="number"/>
					</span>
					<span v-if="orderNo" @click="orderNo=null" 
						style="font-size: 16px;cursor: pointer;line-height:40px;position: absolute;display:inline-block;right: 0px;width: 15px;text-align: center;">
						x
					</span>
				</span>
			</div>
		</div>
		<div class="unselectable active"
			style="height:50px;border-top:1px solid #8F8F8f;position:absolute;bottom:0px;width:100%;text-align: center;line-height: 50px;font-size: 18px;cursor: pointer;">
			创&nbsp;&nbsp;&nbsp;&nbsp;建
		</div>


		<!-- 选择发起人 -->
		<div v-if="chooseFaBuRen.todo" style="height:100%;width:100%;background-color: rgba(0,0,0,0.6);position: absolute; top:0;" >
			<div style="padding:10px 10px 10px 40px;background-color: #ffffff;margin-top:100px;max-height: 500px;overflow: auto;">
				<div style="font-size: 16px;color:#8F8F8F;">选择发起人</div>
				<div style="margin-top:5px;">
					<span style="height:28px;display: inline-block;position: relative;width:198px;border: 1px solid #8f8f8f;">
						<input v-model="chooseFaBuRen.kw" style="font-size:16px;line-height: 26px;border: none;width: 175px;margin-left: 5px;" />
						<span v-if="chooseFaBuRen.kw" 
							style="font-size:16px;line-height: 28px;display:inline-block;position: absolute;width:20px;right:0;text-align: center;cursor: pointer;"
							@click="chooseFaBuRen.kw=null">
							X
						</span>
					</span>
					<button style="font-size:16px;height:30px;width:48px;vertical-align: bottom;cursor: pointer;"
						@click="chooseFaBuRen.pn=1;chooseFaBuRen.items=[];chooseFaBuRen_loadItems();">搜索</button>
				</div>
				<div class="scrollbar1" style="overflow: auto;max-height: 350px;margin-top: 5px;">
					<div class="active unselectable" v-for="item in chooseFaBuRen.items" :key="item.userId" @click=""
						style="padding:5px;border:1px solid #8F8F8F;margin:5px 0;cursor:pointer;background-color: #FFFFFF;position: relative;height: 20px;line-height: 20px;"
						@click="
							chosenFaBuRen=item
							chooseFaBuRen.todo=null
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
					<div v-if="chooseFaBuRen.pItems && chooseFaBuRen.loading"  style="font-size:12px;text-align: center;color:#8F8F8F;margin-bottom:10px;margin-top: 10px;">
						加载中
					</div>
					<div class="activeText unselectable" v-if="chooseFaBuRen.pItems && !chooseFaBuRen.loading && chooseFaBuRen.pItems.length == chooseFaBuRen.ps" 
						@click="chooseFaBuRen.pn++;chooseFaBuRen_loadItems()" 
						style="font-size:12px;text-align: center;color:#8F8F8F;margin-bottom:10px;margin-top: 10px;cursor: pointer;">
						点击加载更多
					</div>
					<div class="unselectable" v-if="chooseFaBuRen.pItems && !chooseFaBuRen.loading && chooseFaBuRen.pItems.length < chooseFaBuRen.ps" 
						style="font-size:12px;text-align: center;color:#8F8F8F;margin-bottom:10px;margin-top: 10px;">
						已全部加载
					</div>
				</div>
				<div style="margin-top:10px;">
					<button @click="chooseFaBuRen.todo=null;" style="font-size:16px;cursor: pointer;width:100px;height:30px;margin-right:5px;margin-bottom:5px;">关闭</button>
				</div>
			</div>
		</div>

		<!-- 选择负责人 -->
		<div v-if="chooseFuZeRen.todo" style="height:100%;width:100%;background-color: rgba(0,0,0,0.6);position: absolute; top:0;" >
			<div style="padding:10px 10px 10px 40px;background-color: #ffffff;margin-top:100px;max-height: 500px;overflow: auto;">
				<div style="font-size: 16px;color:#8F8F8F;">选择负责人</div>
				<div style="margin-top:5px;">
					<span style="height:28px;display: inline-block;position: relative;width:198px;border: 1px solid #8f8f8f;">
						<input v-model="chooseFuZeRen.kw" style="font-size:16px;line-height: 26px;border: none;width: 175px;margin-left: 5px;" />
						<span v-if="chooseFuZeRen.kw" 
							style="font-size:16px;line-height: 28px;display:inline-block;position: absolute;width:20px;right:0;text-align: center;cursor: pointer;"
							@click="chooseFuZeRen.kw=null">
							X
						</span>
					</span>
					<button style="font-size:16px;height:30px;width:48px;vertical-align: bottom;cursor: pointer;"
						@click="chooseFuZeRen.pn=1;chooseFuZeRen.items=[];chooseFuZeRen_loadItems();">搜索</button>
				</div>
				<div class="scrollbar1" style="overflow: auto;max-height: 350px;margin-top: 5px;">
					<div class="active unselectable" v-for="item in chooseFuZeRen.items" :key="item.userId" @click=""
						style="padding:5px;border:1px solid #8F8F8F;margin:5px 0;cursor:pointer;background-color: #FFFFFF;position: relative;height: 20px;line-height: 20px;"
						@click="
							chosenFuZeRen=item
							chooseFuZeRen.todo=null
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
					<div v-if="chooseFuZeRen.pItems && chooseFuZeRen.loading"  style="font-size:12px;text-align: center;color:#8F8F8F;margin-bottom:10px;margin-top: 10px;">
						加载中
					</div>
					<div class="activeText unselectable" v-if="chooseFuZeRen.pItems && !chooseFuZeRen.loading && chooseFuZeRen.pItems.length == chooseFuZeRen.ps" 
						@click="chooseFuZeRen.pn++;chooseFuZeRen_loadItems()" 
						style="font-size:12px;text-align: center;color:#8F8F8F;margin-bottom:10px;margin-top: 10px;cursor: pointer;">
						点击加载更多
					</div>
					<div class="unselectable" v-if="chooseFuZeRen.pItems && !chooseFuZeRen.loading && chooseFuZeRen.pItems.length < chooseFuZeRen.ps" 
						style="font-size:12px;text-align: center;color:#8F8F8F;margin-bottom:10px;margin-top: 10px;">
						已全部加载
					</div>
				</div>
				<div style="margin-top:10px;">
					<button @click="chooseFuZeRen.todo=null;" style="font-size:16px;cursor: pointer;width:100px;height:30px;margin-right:5px;margin-bottom:5px;">关闭</button>
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
				taskName:null,
				nameIf:0,
				type:null,
				content:null,
				orderNo:null,
				endTime:null,
				endTimeDate:null,
				imageList:[],
				query: '',
				chosenFaBuRen: null,
				chosenFuZeRen: null,
				autoRedoTomorrowIs:0,
				chooseFaBuRen: {
					todo: null,
					kw: null,
					pn: null,
					ps: 15,
					items : null,
					pItems : null
				},
				chooseFuZeRen: {
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
			if (thisV.query != JSON.stringify(thisV.$route.query)) {
				thisV.reload();

				thisV.query = JSON.stringify(thisV.$route.query);

			}else{
				if(thisV.$store.state.chooseFaBuRenUserId)
					thisV.faBuRenUserId=thisV.$store.state.chooseFaBuRenUserId
				if(thisV.$store.state.chooseFaBuRenUserNickname)
					thisV.faBuRenUserNickname=thisV.$store.state.chooseFaBuRenUserNickname
				if(thisV.$store.state.chooseFuZeRenUserId)
					thisV.fuZeRenUserId=thisV.$store.state.chooseFuZeRenUserId
				if(thisV.$store.state.chooseFuZeRenUserNickname)
					thisV.fuZeRenUserNickname=thisV.$store.state.chooseFuZeRenUserNickname


				thisV.$store.state.chooseFaBuRenUserId = null
				thisV.$store.state.chooseFaBuRenUserNickname = null
				thisV.$store.state.chooseFuZeRenUserId = null
				thisV.$store.state.chooseFuZeRenUserNickname = null
			}
		},
		methods: {
			reload() {
				debugger
				let thisV = this
				Object.assign(thisV.$data, thisV.$options.data());
				thisV.nameIf = 1
				if(thisV.$store.state.cloneTask){
					thisV.name=thisV.$store.state.cloneTask.name
					thisV.type=thisV.$store.state.cloneTask.type
					thisV.content=thisV.$store.state.cloneTask.content
					thisV.imageList=thisV.$store.state.cloneTask.imageList

					thisV.faBuRenUserId = thisV.$store.state.cloneTask.faBuRenUserId
					thisV.faBuRenUserNickname = thisV.$store.state.cloneTask.faBuRenUserNickname
					thisV.fuZeRenUserId = thisV.$store.state.cloneTask.fuZeRenUserId
					thisV.fuZeRenUserNickname = thisV.$store.state.cloneTask.fuZeRenUserNickname

					thisV.$store.state.cloneTask=null;
				}
			},
			createTask() {
				let thisV = this
				
				if(!window.confirm('确认发布吗 ?')){
					return ;
				}
				
				let finalTime = null;
				if(thisV.finalTimeDate){
					finalTime = thisV.$moment(thisV.finalTimeDate+" "+(thisV.finalTimeTime?(thisV.finalTimeTime+":59"):'23:59:59')).toDate().getTime();
				}
				
				thisV.$axios.post('/recording/my-task/create-task',thisV.$qs.stringify({autoRedoTomorrowIs:thisV.autoRedoTomorrowIs,finalTime:finalTime,faBuRenUserId:thisV.faBuRenUserId,fuZeRenUserId:thisV.fuZeRenUserId,name:thisV.name,type:thisV.type,content:thisV.content,
				orderNo:thisV.orderNo,
				image:thisV.imageList[0]?thisV.imageList[0]:null,
				image1:thisV.imageList[1]?thisV.imageList[1]:null,
				image2:thisV.imageList[2]?thisV.imageList[2]:null,
				image3:thisV.imageList[3]?thisV.imageList[3]:null,
				image4:thisV.imageList[4]?thisV.imageList[4]:null,
				image5:thisV.imageList[5]?thisV.imageList[5]:null,})).then(res=>{
						debugger
						if(res.data.codeMsg)
							alert(res.data.codeMsg)
						if (res.data.code == 0) {
							if(window.confirm('成功 , 是否返回 ?')){
								thisV.$router.back();
							}else{
								thisV.$router.replace({path:'/create-task',query:{time:new Date().getTime()+""}})
							}
						}
					})

			},
			addImage(){
				debugger
				let thisV = this
				if(!(thisV.imageList.length<6)){
					alert("最多添加 6 张图片")
					return;
				}
				thisV.$(`<input type="file" />`).change(function(){
					debugger
					let file= this.files[0];
					let fd = new FormData()
                    fd.append('file', file);
					thisV.$axios.post('/recording/upload-file',fd,{headers: { "Content-Type": "multipart/form-data" },}).then(res=>{
						debugger
						thisV.imageList.push(res.data.data.url)
					})
				}).click()
			},
			chooseFaBuRen_loadItems(){
				debugger
				let thisV = this
				thisV.chooseFaBuRen.loading=1
				var obj = {
					kw:thisV.chooseFaBuRen.kw,
					pn:thisV.chooseFaBuRen.pn,
					ps:thisV.chooseFaBuRen.ps
				}
				thisV.$axios.get('/recording/my-friends?' + thisV.$qs.stringify(obj)).then(data => {
					debugger
					if (data.data.code == 0) {
						if(data.data.data.items.length>0){
							if(thisV.chooseFaBuRen.pn==1)
								thisV.chooseFaBuRen.items=[]
							thisV.chooseFaBuRen.pItems = data.data.data.items
							thisV.chooseFaBuRen.items=thisV.chooseFaBuRen.items.concat(data.data.data.items)
						}else
							thisV.chooseFaBuRen.pn--;
					} else {
						if(data.data.codeMsg)
							thisV.$notify({ type: 'danger', message: data.data.codeMsg });
					}
					thisV.chooseFaBuRen.loading=0
				})
			},
			chooseFuZeRen_loadItems(){
				debugger
				let thisV = this
				thisV.chooseFuZeRen.loading=1
				var obj = {
					kw:thisV.chooseFuZeRen.kw,
					pn:thisV.chooseFuZeRen.pn,
					ps:thisV.chooseFuZeRen.ps
				}
				thisV.$axios.get('/recording/my-friends?' + thisV.$qs.stringify(obj)).then(data => {
					debugger
					if (data.data.code == 0) {
						if(data.data.data.items.length>0){
							if(thisV.chooseFuZeRen.pn==1)
								thisV.chooseFuZeRen.items=[]
							thisV.chooseFuZeRen.pItems = data.data.data.items
							thisV.chooseFuZeRen.items=thisV.chooseFuZeRen.items.concat(data.data.data.items)
						}else
							thisV.chooseFuZeRen.pn--;
					} else {
						if(data.data.codeMsg)
							thisV.$notify({ type: 'danger', message: data.data.codeMsg });
					}
					thisV.chooseFuZeRen.loading=0
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