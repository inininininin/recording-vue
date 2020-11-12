<template>
	<div id="memory-book" class="scrollbar" style="font-size: 0;position:absolute;top:0;bottom:0;right:0;left:0;" >
		<div style="text-align: center;height:40px;line-height: 40px;border-bottom:1px solid #8F8F8f;
				width: 100%;background-color: #FFFFFF;">
			<span class="active"
				@click="window.history.length<=1 ? $router.push({path:'/index'}) : $router.back();"
				style="position: absolute;left:0;width:40px;cursor: pointer;font-weight: 900;font-size: 16px;">
				<
			</span>
			<span style="font-weight: 900;font-size: 16px;position: absolute;left:40px;">
				记忆单
			</span>
			<span v-if="book" style="font-weight: 900;font-size: 16px;display: inline-block;width:45%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
				{{book.name}}
			</span>
			<span style="width:40x;height:40px;position: absolute;right:0;" @click="bookDetail=1">
				<img src='../assets/img/info.png' style="width:25px;height:25px;vertical-align: middle;cursor: pointer;"/>
			</span>
		</div>

		<div v-if="bookDetail" style="position: absolute;top:0;bottom:0;left:0;right:0;background-color: rgba(0,0,0,0.6);z-index: 1000;">
			<div style="margin-top:200px;background-color: #FFFFFF;padding:5px 5px 5px 35px;max-height:80%;">
				<div style="font-size: 16px;width:100px;padding:5px 0;color:#6b6b6b;">记忆单详情</div>
				<div style="padding: 5px 0;position:relative;">
					<span style="font-size: 16px;color:#6b6b6b;display: inline-block;">
						名称
					</span>
					<span class="selectable" style="font-size: 16px;display: inline-block;margin-left:20px;">
						{{book.name}}
					</span>

					<span style="display: inline-block;position: absolute;right:0;"
						@click='editName.start=1;editName.value=book.name;'>
						<img src="../assets/img/edit.png" draggable="false" style="width:21px;height:21px;"/>
					</span>
				</div>
				<div style="padding: 5px 0;position:relative;">
					<span style="font-size: 16px;color:#6b6b6b;display: inline-block;">
						排序
					</span>
					<span class="selectable" style="font-size: 16px;display: inline-block;margin-left:20px;">
						{{book.orderNo}}
					</span>
					<span style="display: inline-block;position: absolute;right:0;"
						@click='editOrderNo.start=1;editOrderNo.value=book.orderNo;'>
						<img src="../assets/img/edit.png" draggable="false" style="width:21px;height:21px;"/>
					</span>
				</div>
			</div>
			<div style="background-color: #FFFFFF;padding:5px 5px 15px 35px;">
				<span class="active" @click="bookDetail=0"
					style="font-size: 16px;display: inline-block;width:100px;padding: 5px 0;
						text-align: center;border:1px solid #808080;cursor: pointer;">
					关闭
				</span>
				<span class="active" 
					@click="
						$dialog.confirm({message:'确认删除吗?'}).then(res=>{
							$axios.post('/recording/my-memory/delete-book',$qs.stringify({bookId:query.bookId})).then(res=>{
								if(res.data.code==0){
									if(res.data.codeMsg)
										$notify({message:'删除成功'})
									$store.state.chosenMemoryBookDel=1
									bookDetail=0
									$router.back();
								}else{
									if(res.data.codeMsg)
										$dialog.alert({message:res.data.codeMsg})
								}
							})
						})
						
					"
					style="font-size: 16px;display: inline-block;width:100px;padding: 5px 0;
						text-align: center;border:1px solid #808080;cursor: pointer;margin-left:20px;">
					删除
				</span>
			</div>

			<div v-if="editName.start" style="height:100%;width:100%;background-color: rgba(0,0,0,0.6);position: absolute; top:0;" >
				<div style="padding:10px 10px 10px 40px;background-color: #ffffff;margin-top:100px;max-height: 500px;overflow: auto;">
					<div style="font-size: 16px;color:#6b6b6b;">修改名称</div>
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
								if(book.name != editName.value){
									$axios.post('/recording/my-memory/update-book',$qs.stringify({bookId:query.bookId,name:editName.value})).then(res=>{
										if(res.data.codeMsg)
											$dialog.alert({message:res.data.codeMsg})
										if(res.data.code == 0){
											if(!res.data.codeMsg)
												$notify({type:'success', message:'修改成功'})
											editName.start=0;
											book.name=editName.value;
											$store.state.chosenMemoryBook.name=editName.value
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
								if(book.orderNo != editOrderNo.value){
									$axios.post('/recording/my-memory/update-book',$qs.stringify({bookId:query.bookId,orderNo:editOrderNo.value})).then(res=>{
										if(res.data.codeMsg)
											$dialog.alert({message:res.data.codeMsg})
										if(res.data.code == 0){
											if(!res.data.codeMsg)
												$notify({type:'success', message:'修改成功'})
											editOrderNo.start=0;
											book.orderNo=editOrderNo.value;
											$store.state.chosenMemoryBook.orderNo=editOrderNo.value
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
		</div>

	
	</div>
</template>
<script>
	export default {
		name: 'memory-book',
		data() {
			return {
				query: {
					bookId : null
				},
				book:null,
				bookDetail:0,
				editName:{
					start: null,
					value: null,
				},
				editOrderNo:{
					start: null,
					value: null,
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
				
			}
		},
		methods: {
			load() {
				debugger
				let vue = this

				vue.$axios.get('/recording/my-memory/book?' + vue.$qs.stringify({bookId:vue.query.bookId})).then(res => {
					debugger
					if (res.data.code == 0) {
							vue.book = res.data.data;
					} else {
						if(res.data.codeMsg)
							vue.$dialog.alert({ message: res.data.codeMsg });
					}
				})
				vue.loadItems();
			},
			loadItems(){
				let vue = this
				vue.$axios.get('/recording/my-memory/items?' + vue.$qs.stringify({bookId:vue.query.bookId})).then(res => {
					debugger
					if (res.data.code == 0) {
							vue.items = res.data.data.items;
					} else {
						if(res.data.codeMsg)
							vue.$dialog.alert({ message: res.data.codeMsg });
					}
				})

				vue.$axios.get('/recording/my-memory/items-sum?' + vue.$qs.stringify({bookId:vue.query.bookId})).then(res => {
					debugger
					if (res.data.code == 0) {
							vue.itemsSum = res.data.data;
					} else {
						if(res.data.codeMsg)
							vue.$dialog.alert({ message: res.data.codeMsg });
					}
				})
			},
			createTrack(){
				debugger
				let vue = this
				if(!vue.trackContent){
					vue.$notify({message:'内容不可空'})
				}else{
					vue.$axios.post('/recording/my-task/create-track',vue.$qs.stringify({
						bookId:vue.query.bookId,
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
							vue.$store.state.chosenMemoryBook.lastTrackId=createdTrack.trackId
							vue.$store.state.chosenMemoryBook.lastTrackContent=createdTrack.content
							vue.$store.state.chosenMemoryBook.lastTrackCreateTime=createdTrack.createTime
							vue.trackContent=null;
						}
					})
				}
			},
		}
	}
</script>
<style scoped>
	.scrollbar::-webkit-scrollbar {
		display: none;
	}
</style>