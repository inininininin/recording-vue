<template>
	<div id="create-task" class="scrollbar" style="height:100%;overflow:auto;">
		<div
			style="font-size: 16px;text-align: center;height:40px;line-height: 40px;position: relative;border-bottom:1px solid #8F8F8f">
			<span @click="$router.back()" style="position: absolute;left:0;width:40px;cursor: pointer;font-weight: 900;">&lt;</span>
			<span>发布任务</span>
		</div>
		<div style="padding:0 5px;margin-top:20px;">
			<div style="font-size: 16px;margin-left:5px;color: #8f8f8f;">任务名</div>
			<div style="position: relative;height:30px;line-height: 30px;border:1px solid #8f8f8f;margin:5px 0 0 5px;">
				<input v-model="name" type="text" style="width:97%;padding:0;border:none;height:30px;line-height: 30px;padding-left: 3px;" />
				<span v-if="name" style="font-size: 14px;position:absolute;padding: 0 1%;cursor: pointer;color: #8f8f8f;" @click="name=null">x</span>
			</div>

			<div style="font-size: 16px;margin:10px 0 0 5px;color: #8f8f8f;">类型</div>
			<div style="margin:5px 0 0 5px;">
				<label for="developIs" style="font-size:14px;cursor: pointer;">开发</label>
				<input id="developIs" name="type" type="radio"  style="cursor: pointer;" value="1" v-model="type"/>
				<span style="margin:0 5px;"></span>
				<label for="bugIs" style="font-size:14px;cursor: pointer;">缺陷</label>
				<input id="bugIs" name="type" type="radio"  style="cursor: pointer;"  value="2" v-model="type"/>
			</div>

			<div style="font-size: 16px;margin:10px 0 0 5px;color: #8f8f8f;">图片</div>
			<div v-viewer="{navbar:true,title:false,toolbar:true}" >
				<span v-for="(item, i) in imageList" style="position: relative;padding-right:15px;">
				<span style="width:50px;height:50px;border:1px solid #8f8f8f;display:inline-block;margin:5px 0 0 5px;font-size: 14px;vertical-align: bottom;">
					<img :src="item" style="cursor: pointer;width:100%;height:100%;object-fit: cover;" />
				</span>
				
				<span  @click="imageList.splice(i,1)" style="font-size: 14px;cursor:pointer;padding:3px;position: absolute;top:-50px;">x</span>
				<span v-if="!(i==(imageList.length-1))" @click="[imageList[i],imageList[i+1]] = [imageList[i+1],imageList[i]];$forceUpdate()"  style="font-size: 14px;cursor:pointer;padding:3px;position: absolute;top:-25px;">~</span>
				
				</span>
				<span v-if="imageList.length<6" @click="addImage()" style="width:50px;height:50px;border:1px solid #8f8f8f;display:inline-block;margin:5px 0 0 5px;font-size: 14px;vertical-align: bottom;cursor: pointer;text-align: center;line-height: 50px;">+</span>
			</div>

			<div style="font-size: 16px;margin:10px 0 0 5px;color: #8f8f8f;">内容</div>
			<div><textarea v-model="content" type="text" style="width:95%;margin:5px 0 0 5px;padding:3px;border:1px solid #8f8f8f;height:300px;resize:none;" ></textarea></div>

			<div style="margin:10px 0 0 5px;">
				<span style="font-size: 16px;color: #8f8f8f;">序号</span>
			</div>
			<div style="position: relative;height:30px;line-height: 30px;border:1px solid #8f8f8f;margin:5px 0 0 5px;">
				<input v-model="orderNo" type="number" style="width:97%;padding:0;border:none;height:30px;line-height: 30px;padding-left: 3px;" />
				<span v-if="orderNo" style="font-size: 14px;position:absolute;padding: 0 1%;cursor: pointer;color: #8f8f8f;" @click="orderNo=9999">x</span>
			</div>



			<div style="text-align: center;margin-top:30px;">
				<button @click="createTask()" style="width:250px;height:35px;">发布</button>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'create-task',
		data() {
			return {
				name:null,
				type:null,
				content:null,
				orderNo:'9999',
				imageList:[],
				query: '',
			}
		},
		activated() {
			let thisVue = this

			if (thisVue.query != JSON.stringify(thisVue.$route.query)) {
				Object.assign(thisVue.$data, thisVue.$options.data());
				thisVue.query = JSON.stringify(thisVue.$route.query);
				thisVue.reload();

			}
		},
		methods: {
			reload() {

			},
			createTask() {
				let thisVue = this
				thisVue.$axios.post('/my-task/create-task',thisVue.$qs.stringify({name:thisVue.name,type:thisVue.type,content:thisVue.content,
				orderNo:thisVue.orderNo,
				image:thisVue.imageList[0]?thisVue.imageList[0]:null,
				image1:thisVue.imageList[1]?thisVue.imageList[1]:null,
				image2:thisVue.imageList[2]?thisVue.imageList[2]:null,
				image3:thisVue.imageList[3]?thisVue.imageList[3]:null,
				image4:thisVue.imageList[4]?thisVue.imageList[4]:null,
				image5:thisVue.imageList[5]?thisVue.imageList[5]:null,})).then(res=>{
						debugger
						if(res.data.codeMsg)
							alert(res.data.codeMsg)
						if (res.data.code == 0) {
							alert("成功");
							thisVue.$router.back();
						}
					})

			},
			addImage(){
				debugger
				let thisVue = this
				if(!(thisVue.imageList.length<6)){
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
						thisVue.imageList.push(res.data.data.url)
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