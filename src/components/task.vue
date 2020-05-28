<template>
	<div id="task" class="scrollbar" style="height:100%;overflow:auto;">
		<div
			style="font-size: 16px;text-align: center;height:40px;line-height: 40px;position: relative;border-bottom:1px solid #8F8F8f">
			<span @click="$router.back()" style="position: absolute;left:0;width:40px;cursor: pointer;font-weight: 900;">&lt;</span>
			<span>任务详情</span>
		</div>
		<div style="padding:0 5px;margin-top:20px;">
			<div style="margin-left:5px;">
				<span style="font-size: 16px;color: #8f8f8f;">任务名</span>
				<span v-if="!nameEditIs" @click="nameEditIs=1" style="font-size: 12px;margin-left:10px;cursor: pointer;;color: #8f8f8f;">Edit</span>
				<span v-if="nameEditIs" @click="nameEditIs=0;taskUpdate.name=task.name;" style="font-size: 12px;margin-left:10px;cursor: pointer;;color: #8f8f8f;">Cancel</span>
				<span v-if="nameEditIs" @click="nameEditIs=0;updateTask('name');" style="font-size: 12px;margin-left:10px;cursor: pointer;;color: #8f8f8f;">Done</span>
			</div>
			<div v-if="nameEditIs" style="position: relative;height:30px;line-height: 30px;border:1px solid #8f8f8f;margin:5px 0 0 5px;">
				<input v-model="taskUpdate.name" type="text" style="width:97%;padding:0;border:none;height:30px;line-height: 30px;padding-left: 3px;" />
				<span v-if="taskUpdate.name" style="font-size: 14px;position:absolute;padding: 0 1%;cursor: pointer;color: #8f8f8f;" @click="taskUpdate.name=null">x</span>
			</div>

			<div v-if="!nameEditIs" style="font-size:14px;line-height: 32px;margin:5px 0 0 5px;word-wrap: break-word;word-break: break-all;">
				{{task.name}}
			</div>

			<div style="margin:10px 0 0 5px;">
				<span style="font-size: 16px;color: #8f8f8f;">类型</span>
				<span v-if="!typeEditIs" @click="typeEditIs=1" style="font-size: 12px;margin-left:10px;cursor: pointer;;color: #8f8f8f;">Edit</span>
				<span v-if="typeEditIs" @click="typeEditIs=0;taskUpdate.type=task.type;" style="font-size: 12px;margin-left:10px;cursor: pointer;;color: #8f8f8f;">Cancel</span>
				<span v-if="typeEditIs" @click="typeEditIs=0;updateTask('type');" style="font-size: 12px;margin-left:10px;cursor: pointer;;color: #8f8f8f;">Done</span>
			</div>
			<div v-if="typeEditIs" style="margin:5px 0 0 5px;line-height: 25px;">
				<label for="developIs" style="font-size:14px;cursor: pointer;">开发</label>
				<input id="developIs" name="type" type="radio" value="1" v-model="taskUpdate.type" style="cursor: pointer;" />
				<span style="margin:0 5px;"></span>
				<label for="bugIs" style="font-size:14px;cursor: pointer;">缺陷</label>
				<input id="bugIs" name="type" type="radio"  value="2" v-model="taskUpdate.type" style="cursor: pointer;"/>
			</div>
			<div v-if="!typeEditIs" style="font-size:14px;line-height: 25px;margin:5px 0 0 5px;word-wrap: break-word;word-break: break-all;">
				{{task.type==1?'开发':task.type==2?'缺陷':''}}
			</div>


			<div style="margin:10px 0 0 5px;">
				<span style="font-size: 16px;color: #8f8f8f;">图片</span>
				<span v-if="!imageListEditIs" @click="imageListEditIs=1" style="font-size: 12px;margin-left:10px;cursor: pointer;;color: #8f8f8f;">Edit</span>
				<span v-if="imageListEditIs" @click="imageListEditIs=0;taskUpdate.imageList=task.imageList;" style="font-size: 12px;margin-left:10px;cursor: pointer;;color: #8f8f8f;">Cancel</span>
				<span v-if="imageListEditIs" @click="imageListEditIs=0;updateTask('imageList');" style="font-size: 12px;margin-left:10px;cursor: pointer;;color: #8f8f8f;">Done</span>
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
				<span style="font-size: 16px;color: #8f8f8f;">内容</span>
				<span v-if="!contentEditIs" @click="contentEditIs=1" style="font-size: 12px;margin-left:10px;cursor: pointer;;color: #8f8f8f;">Edit</span>
				<span v-if="contentEditIs" @click="contentEditIs=0;taskUpdate.content=task.content;" style="font-size: 12px;margin-left:10px;cursor: pointer;;color: #8f8f8f;">Cancel</span>
				<span v-if="contentEditIs" @click="contentEditIs=0;updateTask('content');" style="font-size: 12px;margin-left:10px;cursor: pointer;;color: #8f8f8f;">Done</span>
			</div>
			<div v-if="contentEditIs">
				<textarea v-model="taskUpdate.content"  type="text" style="width:95%;margin:5px 0 0 5px;padding:3px;border:1px solid #8f8f8f;height:300px;resize:none;" ></textarea>
			</div>
			<div v-if="!contentEditIs" style="font-size:14px;margin:5px 0 0 5px;word-wrap: break-word;word-break: break-all;white-space: pre-wrap;">{{task.content}}</div>

			
			<div style="margin:10px 0 0 5px;">
				<span style="font-size: 16px;color: #8f8f8f;">序号</span>
				<span v-if="!orderNoEditIs" @click="orderNoEditIs=1" style="font-size: 12px;margin-left:10px;cursor: pointer;;color: #8f8f8f;">Edit</span>
				<span v-if="orderNoEditIs" @click="orderNoEditIs=0;taskUpdate.orderNo=task.orderNo;" style="font-size: 12px;margin-left:10px;cursor: pointer;;color: #8f8f8f;">Cancel</span>
				<span v-if="orderNoEditIs" @click="orderNoEditIs=0;updateTask('orderNo');" style="font-size: 12px;margin-left:10px;cursor: pointer;;color: #8f8f8f;">Done</span>
			</div>
			<div v-if="orderNoEditIs" style="position: relative;height:30px;line-height: 30px;border:1px solid #8f8f8f;margin:5px 0 0 5px;">
				<input v-model="taskUpdate.orderNo" type="number" style="width:97%;padding:0;border:none;height:30px;line-height: 30px;padding-left: 3px;" />
				<span v-if="taskUpdate.orderNo" style="font-size: 14px;position:absolute;padding: 0 1%;cursor: pointer;color: #8f8f8f;" @click="taskUpdate.orderNo=9999">x</span>
			</div>
			<div v-if="!orderNoEditIs" style="font-size:14px;margin:5px 0 0 5px;word-wrap: break-word;word-break: break-all;white-space: pre-wrap;">{{task.orderNo}}</div>

			<button @click="
			let r=window.confirm('确认删除吗');
			if(r){
			$axios.post('/my-task/delete-task-list',$qs.stringify({taskId:taskId,expectCount:1}))
				.then(res=>{ 
					if(res.data.codeMsg) 
						window.alert(res.data.codeMsg)
					if(res.data.code ==0) 
						if(!res.data.codeMsg) 
							window.alert('成功')
							$router.back()
						})
					}
			 " style="font-size: 14px;width:50px;height:30px;margin:20px 0 0 5px;cursor: pointer; ">删除</button>

			 <button @click="
			 let r=window.confirm('确认完成吗');
			 if(r){
			 $axios.post('/my-task/complete-task',$qs.stringify({taskId:taskId}))
				 .then(res=>{ 
					 if(res.data.codeMsg) 
						 window.alert(res.data.codeMsg)
					 if(res.data.code ==0) 
						 if(!res.data.codeMsg) 
							 window.alert('成功')
							 $router.back()
						 })
					 }
			 " style="font-size: 14px;width:50px;height:30px;margin:20px 0 0 10px;cursor: pointer; ">完成</button>

			 <button @click="
			 let r=window.confirm('确认关闭吗');
			 if(r){
			 $axios.post('/my-task/close-task',$qs.stringify({taskId:taskId}))
				 .then(res=>{ 
					 if(res.data.codeMsg) 
						 window.alert(res.data.codeMsg)
					 if(res.data.code ==0) 
						 if(!res.data.codeMsg) 
							 window.alert('成功')
							 $router.back()
						 })
					 }
			 " style="font-size: 14px;width:50px;height:30px;margin:20px 0 0 10px;cursor: pointer; ">关闭</button>

			 <button @click="
			 let r=window.confirm('确认重启吗');
			 if(r){
			 $axios.post('/my-task/restart-task',$qs.stringify({taskId:taskId}))
				 .then(res=>{ 
					 if(res.data.codeMsg) 
						 window.alert(res.data.codeMsg)
					 if(res.data.code ==0) 
						 if(!res.data.codeMsg) 
							 window.alert('成功')
							 $router.back()
						 })
					 }
			 " style="font-size: 14px;width:50px;height:30px;margin:20px 0 0 10px;cursor: pointer; ">重启</button>
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
					name:null,
					type:null,
					content:null,
					orderNo:null,
					imageList:[],
				},
				taskUpdate:{
					name:null,
					type:null,
					content:null,
					orderNo:null,
					imageList:[],
				},
				nameEditIs:0,
				orderNoEditIs:0,
				typeEditIs:0,
				contentEditIs:0,
				imageListEditIs:0,
				query: '',
			}
		},
		activated() {
			let thisVue = this

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
				thisVue.$axios.post('/my-task/update-task',thisVue.$qs.stringify(param)).then(res=>{
					debugger
					if(res.data.codeMsg)
						alert(res.data.codeMsg)
					if (res.data.code == 0) {
						if(!res.data.codeMsg)
							alert('成功')
						thisVue.task[name]=JSON.parse(JSON.stringify(thisVue.taskUpdate[name])) 
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
			}
		}
	}
</script>
<style scoped>
	.scrollbar::-webkit-scrollbar {
		display: none;
	}
</style>