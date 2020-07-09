<template>
	<div id="index" style="height:100%;position:relative;">
		<div  class="scrollbar"
		style="
		position: relative;border-bottom:1px solid #8f8f8f;
		white-space: nowrap;overflow-x: auto;
		">
				<span  @click="sortMap.nickname++;sortMap.nickname=sortMap.nickname==3?0:sortMap.nickname;sortMap1.nickname=sortMap.nickname;pn=1;friendList=[];loadFriendList();" :style="{color:sortMap.nickname?'red':'#000000'}" style="line-height: 30px;padding:0 5px;font-size: 14px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;">
					名称<span v-if="sortMap.nickname==1">&nbsp;&and;</span><span v-if="sortMap.nickname==2">&nbsp;&or;</span><span v-if="sortMap.nickname==0" style="visibility: hidden;">&nbsp;&or;</span>
				</span>
				<span @click="sortMap.insertTime++;sortMap.insertTime=sortMap.insertTime==3?0:sortMap.insertTime;sortMap1.insertTime=sortMap.insertTime;pn=1;friendList=[];loadFriendList();" :style="{color:sortMap.insertTime?'red':'#000000'}" style="line-height: 30px;padding:0 5px;font-size: 14px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;">
					时间<span v-if="sortMap.insertTime==1">&nbsp;&and;</span><span v-if="sortMap.insertTime==2">&nbsp;&or;</span><span v-if="sortMap.insertTime==0" style="visibility: hidden;">&nbsp;&or;</span>
				</span>
				<span @click="sortMap.updateTime++;sortMap.updateTime=sortMap.updateTime==3?0:sortMap.updateTime;sortMap1.updateTime=sortMap.updateTime;pn=1;friendList=[];loadFriendList();" :style="{color:sortMap.updateTime?'red':'#000000'}"  style="line-height: 30px;padding:0 5px;font-size: 14px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;;">
					更新<span v-if="sortMap.updateTime==1">&nbsp;&and;</span><span v-if="sortMap.updateTime==2">&nbsp;&or;</span><span v-if="sortMap.updateTime==0" style="visibility: hidden;">&nbsp;&or;</span>
				</span>
				<span  @click="sortMap.orderNo++;sortMap.orderNo=sortMap.orderNo==3?0:sortMap.orderNo;sortMap1.orderNo=sortMap.orderNo;pn=1;friendList=[];loadFriendList();" :style="{color:sortMap.orderNo?'red':'#000000'}"  style="line-height: 30px;padding:0 5px;font-size: 14px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;">
					序号<span v-if="sortMap.orderNo==1">&nbsp;&and;</span><span v-if="sortMap.orderNo==2">&nbsp;&or;</span><span v-if="sortMap.orderNo==0" style="visibility: hidden;">&nbsp;&or;</span>
				</span>

					<span style="line-height: 30px;font-size: 14px;display:inline-block;border-right:1px solid #8f8f8f;position: relative;">
						<span v-show="!kw" style="font-size: 14px;color: #8f8f8f;position: absolute;left:6px;top:0px;" >Q</span>
						<input v-model="kw" @keyup.enter="pn=1;friendList=[];loadFriendList();" type="text" style="line-height: 30px;width:50px;padding:0 15px 0 5px;border:none;"/>
						<span v-if="kw" style="font-size: 14px;cursor: pointer;color: #8f8f8f;position: absolute;right:6px;top:0px;" @click="kw=null;pn=1;friendList=[];loadFriendList();">x</span>
					</span>
					<span @click="pn=1;friendList=[];loadFriendList()" style="line-height: 30px;padding:0 5px;font-size: 14px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;">
						搜索
					</span>
					<span @click="sortMap.nickname=0,sortMap.orderNo=0,sortMap.insertTime=0,sortMap.updateTime=0,sortMap1={},kw=null,pn=1;friendList=[];loadFriendList()" style="line-height: 30px;padding:0 5px;font-size: 14px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;">
						重置
					</span>
				
			</div>
			
			
		<div class="scrollbar" @scroll="friendListScroll($event)" ref="friendList" style="overflow: auto;position: absolute;top:31px;bottom:52px;width:100%;background-color: rgb(252, 250, 250);">
		<div style="margin:5px 7px 0px 7px;">
			<span style="font-size: 14px;color: #8f8f8f;">共 {{itemCount}} 条记录</span>
		</div>
		
		<div v-for="(item, i) in friendList" @click="lookFriend=item" style="padding:5px;border:1px solid #8F8F8F;margin:8px 7px 5px 7px;cursor:pointer;background-color: #FFFFFF;">
			<span><img :src="item.logo" /></span>
			<span style="font-size:16px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;">{{$attr(item,'alias')?$attr(item,'alias'):item.nickname}}
				{{$attr(item,'alias')?(`(${$attr(item,'nickname')})`):''}}</span>
		</div>
		
		<div v-show="loading"  style="font-size:14px;text-align: center;color:#8F8F8F;margin-bottom:5px;margin-top: 10px;">加载中</div>

		<div v-show="!loading && friendList.length<itemCount" @click="pn++;loadFriendList();" style="font-size:14px;text-align: center;color:#8F8F8F;margin-bottom:5px;margin-top: 10px;">点击加载更多</div>
		<div v-show="!loading && !(friendList.length<itemCount)" style="font-size:14px;text-align: center;color:#8F8F8F;margin-bottom:5px;margin-top: 10px;">已全部加载</div>

	</div>
		





		<div 
			style="position: absolute;bottom: 0;left: 0px;right: 0px;
			background-color: rgb(255, 255, 255);box-shadow: rgb(136, 136, 136) 0px 0px 1px 0px;border-top: 1px solid #afaeae;">
			<div style="height:35px;line-height: 35px;border-bottom:1px solid #8F8F8F;">
				<span @click="addFriendIs=1;addFriend.users=[];" style="font-size:14px;width:100%;font-weight: 900;display:inline-block;text-align: center;cursor:pointer;">
					加好友 +
				</span>
			</div>
			<div style="height: 50px;line-height: 50px;position: relative;">
				<span 
					style="display: inline-block;font-size: 14px;width: 20%;text-align: center;
					cursor: pointer;"
					@click="$router.replace({path:'/index',query:{time:new Date().getTime()+''}})">
					任务
				</span>
				<span style="position: absolute;font-size:14px;height: 50px;line-height: 50px;display: inline-block;border-left:1px solid #8F8F8F;">
					&#8207;
				</span>
				<span 
					style="display: inline-block;user-select: none;font-size: 14px;width: 20%;text-align: center;cursor: pointer;"
					@click="$router.replace({path:'/record-list',query:{time:new Date().getTime()+''}})">
					记录
				</span>
				<span style="position: absolute;font-size:14px;height: 50px;line-height: 50px;display: inline-block;border-left:1px solid #8F8F8F;">
					&#8207;
				</span>
				<span 
					style="display: inline-block;font-size: 14px;width: 20%;text-align: center;
					cursor: pointer;background-color: rgb(255, 127, 8);"
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

		<!-- 看好友 -->
		<div v-show="lookFriend" style="height:100%;width:100%;background-color: rgba(0,0,0,0.6);position: absolute; top:0;" >
			<div style="padding:10px;background-color: #ffffff;margin-top:150px;">
				<div style="font-size: 16px;padding-left:30px;color:#8F8F8F;">查看好友</div>
				<div style="margin-top:10px;padding-left:30px;"><span style="font-size:16px;">昵称 : </span><span style="font-size:16px;">{{$attr(lookFriend,'nickname')}}</span></div>
				<div style="margin-top:10px;padding-left:30px;"><span style="font-size:16px;">别名 : </span><span style="font-size:16px;">{{$attr(lookFriend,'alias')}}</span></div>
				<div style="margin-top:10px;padding-left:30px;"><span style="font-size:16px;">手机 : </span><span><a :href="'tel:'+$attr(lookFriend,'phone')" style="font-size:16px;">{{$attr(lookFriend,'phone')}}</a></span></div>
				<div style="margin-top:10px;padding-left:30px;">
					<button @click="lookFriend=null;" style="cursor: pointer;width:150px;height:30px;">关闭</button>
				</div>
			</div>
		</div>


		<!-- 加好友 -->
		<div v-show="addFriendIs" style="height:100%;width:100%;background-color: rgba(0,0,0,0.6);position: absolute; top:0;" >
			<div v-show="addFriend.addIs" style="padding:10px;background-color: #ffffff;margin-top:150px;">
				<div style="font-size: 16px;padding-left:30px;color:#8F8F8F;">添加好友</div>
				<div style="font-size: 16px;margin-top:10px;padding-left:30px;"><span>关键字 : </span><span><input v-model="addFriend.kw"  @keyup.enter="addFriend.pn=1;addFriend.users=[];findMoreFriendUserList()" v-focus="addFriendIs" type="text"/></span></div>
				<div style="margin-top:10px;padding-left:30px;"><button @click="addFriend.pn=1;addFriend.users=[];findMoreFriendUserList()" style="cursor: pointer;width:150px;height:30px;">查找</button></div>
				<div style="margin-top:10px;padding-left:30px;"><button @click="addFriendIs=0;addFriend.kw=null;addFriend.users=[];" style="cursor: pointer;width:150px;height:30px;">关闭</button></div>
			</div>


			<div v-show="addFriend.users && addFriend.users.length" style="padding:10px;background-color: #ffffff;margin-top:150px;">
				<div style="font-size: 16px;padding-left:30px;color:#8F8F8F;">找到的用户</div>
				<div class="scrollbar" @scroll="addFriendUserListScroll($event)" style="padding-left:30px;margin-top:5px;height: 100px;overflow: auto;">

				<div style="margin:5px 0 0 0;">
					<span style="font-size: 14px;color: #8f8f8f;">共 {{addFriend.userCount}} 条记录</span>
				</div>
					<div @click="addFriendDo(item)" v-for="(item,i) in addFriend.users" style="margin-top:5px;cursor: pointer;" >
						<span style="font-size: 16px;">{{item.nickname}}</span>
						<span  style="font-size: 16px;margin:0 0 0 10px">{{item.phone}}</span>
					</div>
				

				<div v-show="addFriend.loading"  style="font-size:14px;color:#8F8F8F;margin-bottom:5px;margin-top: 10px;">加载中</div>

				<div v-show="!addFriend.loading && addFriend.users.length<addFriend.userCount" @click="addFriend.pn++;findMoreFriendUserList()" style="font-size:14px;color:#8F8F8F;margin-bottom:5px;margin-top: 10px;">点击加载更多</div>
				<div v-show="!addFriend.loading && !(addFriend.users.length<addFriend.userCount)" style="font-size:14px;color:#8F8F8F;margin-bottom:5px;margin-top: 10px;">已全部加载</div>
			</div>

				<div style="margin-top:10px;padding-left:30px;"><button @click="addFriend.users=[];addFriend.addIs=1" style="cursor: pointer;width:150px;height:30px;">关闭</button></div>
			</div>
		</div>



	</div>
</template>
<script>
	export default {
		name: 'index',
		data() {
			return {
				addFriendIs:0,
				addFriend:{
					kw:null,
					users:[],
					addIs:1,
					userCount:null,
					loading:null,
					pn:1,
				},
				lookFriend:null,
				kw:null,
				type:'',
				completeIs:'',
				cancelIs:'',
				status:1,
				query: '',
				friendList:[],
				pn:1,
				ps:15,
				itemCount:null,
				loading:null,
				scrollTop:null,
				sortInsertTime:1,
				sortMap:{
					orderNo:0,
					nickname:0,
					insertTime:0,
					updateTime:0,
				},
				sortMap1:{
				}
			}
		},
		activated() {
			debugger
			let thisVue = this
			window.thisVue=thisVue;
			if (thisVue.query != JSON.stringify(thisVue.$route.query)) {
				thisVue.reload();

				thisVue.query = JSON.stringify(thisVue.$route.query);
			}else{
				thisVue.$refs.friendList.scrollTop=thisVue.scrollTop
			}
		},
		methods: {
			reload() {
				debugger
				let thisVue = this
				Object.assign(thisVue.$data, thisVue.$options.data());

				if(!thisVue.$store.state.login){
					thisVue.$axios.post('/logout').then(res => {
							thisVue.$store.state.login=null;
							thisVue.$router.push({path:'/login',query:{time:new Date().getTime()+""}})
						})
				}
					

				thisVue.loadFriendList()
			},
			addFriendDo(item){
				if(!item.followId){
					var r=window.prompt(`确认添加 ${item.nickname} 为好友吗 , 你可以输入别名`)
					if (r!=null)
						{
							thisVue.$axios.post(`/my-follow/insert-follow`,thisVue.$qs.stringify({toUserId:item.userId,alias:r})).then(res => {
								debugger
								if(res.data.codeMsg)
									alert(res.data.codeMsg)
								if (res.data.code == 0) {
									if(!res.data.codeMsg)
										alert('成功')
								}
							})
						}
				}else{
					var r=window.prompt(`你和 ${item.nickname} 已经是好友 , 你可以修改别名`,item.followAlias||'')
					if (r!=null)
						{
							thisVue.$axios.post(`/my-follow/update-follow`,thisVue.$qs.stringify({followId:item.followId,alias:r})).then(res => {
								debugger
								if(res.data.codeMsg)
									alert(res.data.codeMsg)
								if (res.data.code == 0) {
									if(!res.data.codeMsg)
										alert('成功')
								}
							})
						}
				}
			},
			findMoreFriendUserList(){
				debugger
				let thisVue = this
				thisVue.addFriend.loading=1
				thisVue.addFriend.userCount=null;
				thisVue.$axios.get(`/user/user-list?kw=${thisVue.addFriend.kw||''}&pn=${thisVue.addFriend.pn}`).then(res => {
					debugger
					if(res.data.codeMsg)
						alert(res.data.codeMsg)
					if (res.data.code == 0) {
						if(!res.data.data.itemList || res.data.data.itemList.length==0){
							if(thisVue.addFriend.pn==1){
								alert('未找到用户')
							}
							thisVue.addFriend.pn--;
						}
						else{
							if(thisVue.addFriend.pn==1){
								thisVue.addFriend.users=[]
							}
							thisVue.addFriend.addIs=0
							thisVue.addFriend.users=thisVue.addFriend.users.concat(res.data.data.itemList)
						}
					}
					thisVue.addFriend.loading=0
				})

				thisVue.$axios.get(`/user/user-list-sum?kw=${thisVue.addFriend.kw||''}&pn=${thisVue.addFriend.pn}`).then(res => {
					debugger
					if (res.data.code == 0) {
							thisVue.addFriend.userCount=res.data.data.itemCount
					}
				})
			},
			addFriendUserListScroll(event){
				debugger
				let thisVue = this
				if((event.target.scrollTop+thisVue.$(event.target).height())>=event.target.scrollHeight) {
					thisVue.addFriend.pn++;
					thisVue.findMoreFriendUserList ()
				}
			},
			friendListScroll(event){
				debugger
				let thisVue = this
				thisVue.scrollTop=event.target.scrollTop;
				if((event.target.scrollTop+thisVue.$(event.target).height())>=event.target.scrollHeight) {
					thisVue.pn++;
					thisVue.loadFriendList ()
				}
			},
			loadFriendList (){
				debugger
				let thisVue = this
				thisVue.loading=1
				let sorts=[]
				let orders=[]
				for(var c in thisVue.sortMap1) {
					if(thisVue.sortMap1[c]){
						sorts.push(c)
						orders.push(thisVue.sortMap1[c]==1?'asc':thisVue.sortMap1[c]==2?'desc':'c')
					}
				}
				if(!sorts || sorts.length==0){
					sorts=['orderNo','nickname','insertTime','updateTime']
					orders=['asc','asc','desc','desc']
				}

				thisVue.itemCount =null;
				

				thisVue.$axios.get('/my-follow/follow-list?'+thisVue.$qs.stringify({kw:thisVue.kw,sort:sorts.join(),order:orders.join(),pn:thisVue.pn,ps:thisVue.ps})).then(res => {
					debugger
					if (res.data.code == 0) {
						if(res.data.data.itemList.length>0)
							thisVue.friendList=thisVue.friendList.concat(res.data.data.itemList)
						else
						thisVue.pn--;
					}
					thisVue.loading=0
				})
				thisVue.$axios.get('/my-follow/follow-list-sum?'+thisVue.$qs.stringify({kw:thisVue.kw,pn:thisVue.pn,ps:thisVue.ps})).then(res => {
					debugger
					if (res.data.code == 0) {
						thisVue.itemCount=res.data.data.itemCount
					}
				})
			},
		}
	}
</script>
<style scoped>



.scrollbar::-webkit-scrollbar{
	width:4px;
	/* border-radius: 5px; */
}
.scrollbar::-webkit-scrollbar-track{
	background-color:#2b2b2e;
	/* border-radius: 5px; */
}
.scrollbar::-webkit-scrollbar-thumb{
	background-color:#66666d;
	/* border-radius: 5px; */
}
.scrollbar::-webkit-scrollbar-thumb:hover {
	background-color:#66666d;
	/* border-radius: 5px; */
}
.scrollbar::-webkit-scrollbar-thumb:active {
	background-color:#2b2b2e;
	/* border-radius: 5px; */
}

</style>