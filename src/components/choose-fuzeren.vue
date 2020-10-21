<template>
	<div id="choose-fuzeren" style="height:100%;position:relative;">
		<div
			style="font-size: 16px;text-align: center;height:40px;line-height: 40px;position: relative;border-bottom:1px solid #8F8F8f">
			<span @click="window.history.length<=1?$router.push({path:'/index',query:{time:new Date().getTime+''}}):$router.back()" style="position: absolute;left:0;width:40px;cursor: pointer;font-weight: 900;">&lt;</span>
			<span>选择负责人</span>
		</div>

			<div style="position: relative;border-bottom:1px solid #8f8f8f;">
				<span  @click="sortMap.nickname++;sortMap.nickname=sortMap.nickname==3?0:sortMap.nickname;sortMap1.nickname=sortMap.nickname;pn=1;friendList=[];loadFriendList();" :style="{color:sortMap.nickname?'red':'#000000'}" style="line-height: 30px;padding:0 5px;font-size: 14px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;">
					名称<span v-if="sortMap.nickname==1">&nbsp;&and;</span><span v-if="sortMap.nickname==2">&nbsp;&or;</span><span v-if="sortMap.nickname==0" style="visibility: hidden;">&nbsp;&or;</span>
				</span>
				<span @click="sortMap.createTime++;sortMap.createTime=sortMap.createTime==3?0:sortMap.createTime;sortMap1.createTime=sortMap.createTime;pn=1;friendList=[];loadFriendList();" :style="{color:sortMap.createTime?'red':'#000000'}" style="line-height: 30px;padding:0 5px;font-size: 14px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;">
					时间<span v-if="sortMap.createTime==1">&nbsp;&and;</span><span v-if="sortMap.createTime==2">&nbsp;&or;</span><span v-if="sortMap.createTime==0" style="visibility: hidden;">&nbsp;&or;</span>
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
					<span @click="sortMap.nickname=0,sortMap.orderNo=0,sortMap.createTime=0,sortMap.updateTime=0,sortMap1={},kw=null,pn=1;friendList=[];loadFriendList()" style="line-height: 30px;padding:0 5px;font-size: 14px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;">
						重置
					</span>
				
			</div>
			
			
		<div class="scrollbar" @scroll="friendListScroll($event)" ref="friendList" style="overflow: auto;position: absolute;top: 72px;bottom:37px;width:100%;background-color: rgb(252, 250, 250);">
		<div style="margin:5px 7px 0px 7px;">
			<span style="font-size: 14px;color: #8f8f8f;">共 {{itemCount}} 条记录</span>
		</div>
		
		<div v-for="item in friendList" :key="item.userId" @click="$store.state.chooseFuZeRenUserId=item.userId;$store.state.chooseFuZeRenUserNickname=item.nickname;$router.back();" style="padding:5px;border:1px solid #8F8F8F;margin:8px 7px 5px 7px;cursor:pointer;background-color: #FFFFFF;">
			<span><img :src="item.logo" /></span>
			<span style="font-size:16px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;">{{$attr(item,'alias')?$attr(item,'alias'):item.nickname}}
				{{$attr(item,'alias')?(`(${$attr(item,'nickname')})`):''}}</span>
		</div>
		
		<div v-show="loading"  style="font-size:14px;text-align: center;color:#8F8F8F;margin-bottom:5px;margin-top: 10px;">加载中</div>

		<div class="activeText unselectable" v-show="!loading && friendList.length<itemCount" @click="pn++;loadFriendList();" style="font-size:14px;text-align: center;color:#8F8F8F;margin-bottom:5px;margin-top: 10px;">点击加载更多</div>
		<div class="unselectable" v-show="!loading && !(friendList.length<itemCount)" style="font-size:14px;text-align: center;color:#8F8F8F;margin-bottom:5px;margin-top: 10px;">已全部加载</div>

	</div>
		
	<div style="position:absolute;bottom:0;left:0;right:0;background-color: #FFFFFF;">
		<div style="border-top:1px solid #8F8F8F;"></div>

		<div style="height:35px;line-height: 35px;">
			<span @click="addFriendIs=1;addFriend.users=[];" style="font-size:14px;width:100%;display:inline-block;text-align: center;cursor:pointer;">
				加好友 +</span>
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
				<div style="font-size: 16px;margin-top:10px;padding-left:30px;"><span>关键字 : </span><span><input v-model="addFriend.kw"  v-focus="addFriendIs" type="text"/></span></div>
				<div style="margin-top:10px;padding-left:30px;"><button @click="addFriend.pn=1;addFriend.users=[];findMoreFriendUserList()" style="cursor: pointer;width:150px;height:30px;">查找</button></div>
				<div style="margin-top:10px;padding-left:30px;"><button @click="addFriendIs=0;addFriend.kw=null;addFriend.users=[];" style="cursor: pointer;width:150px;height:30px;">关闭</button></div>
			</div>


			<div v-show="addFriend.users && addFriend.users.length" style="padding:10px;background-color: #ffffff;margin-top:150px;">
				<div style="font-size: 16px;padding-left:30px;color:#8F8F8F;">找到的用户</div>
				<div class="scrollbar" @scroll="addFriendUserListScroll($event)" style="padding-left:30px;margin-top:5px;height: 100px;overflow: auto;">

				<div style="margin:5px 0 0 0;">
					<span style="font-size: 14px;color: #8f8f8f;">共 {{addFriend.userCount}} 条记录</span>
				</div>
					<div @click="addFriendDo(item)" v-for="item in addFriend.users" :key="item.userId" style="margin-top:5px;cursor: pointer;" >
						<span style="font-size: 16px;">{{item.nickname}}</span>
						<span  style="font-size: 16px;margin:0 0 0 10px">{{item.phone}}</span>
					</div>
				

				<div v-show="addFriend.loading"  style="font-size:14px;color:#8F8F8F;margin-bottom:5px;margin-top: 10px;">加载中</div>

				<div class="activeText unselectable" v-show="!addFriend.loading && addFriend.users.length<addFriend.userCount" @click="addFriend.pn++;findMoreFriendUserList()" style="font-size:14px;color:#8F8F8F;margin-bottom:5px;margin-top: 10px;">点击加载更多</div>
				<div class="unselectable" v-show="!addFriend.loading && !(addFriend.users.length<addFriend.userCount)" style="font-size:14px;color:#8F8F8F;margin-bottom:5px;margin-top: 10px;">已全部加载</div>
			</div>

				<div style="margin-top:10px;padding-left:30px;"><button @click="addFriend.users=[];addFriend.addIs=1" style="cursor: pointer;width:150px;height:30px;">关闭</button></div>
			</div>
		</div>



	</div>
</template>
<script>
	export default {
		name: 'choose-fuzeren',
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
				sortCreateTime:1,
				sortMap:{
					orderNo:0,
					nickname:0,
					createTime:0,
					updateTime:0,
				},
				sortMap1:{
				}
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
				thisV.$refs.friendList.scrollTop=thisV.scrollTop
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
					

				thisV.loadFriendList()
			},
			addFriendDo(item){
				if(!item.followId){
					var r=window.prompt(`确认添加 ${item.nickname} 为好友吗 , 你可以输入别名`)
					if (r!=null)
						{
							thisV.$axios.post(`/recording/my-follow/create-follow`,thisV.$qs.stringify({toUserId:item.userId,alias:r})).then(res => {
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
							thisV.$axios.post(`/recording/my-follow/update-follow`,thisV.$qs.stringify({followId:item.followId,alias:r})).then(res => {
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
				let thisV = this
				thisV.addFriend.loading=1
				thisV.addFriend.userCount=null;
				thisV.$axios.get(`/recording/user/user-list?kw=${thisV.addFriend.kw||''}&pn=${thisV.addFriend.pn}`).then(res => {
					debugger
					if(res.data.codeMsg)
						alert(res.data.codeMsg)
					if (res.data.code == 0) {
						if(!res.data.data.itemList || res.data.data.itemList.length==0){
							if(thisV.addFriend.pn==1){
								alert('未找到用户')
							}
							thisV.addFriend.pn--;
						}
						else{
							if(thisV.addFriend.pn==1){
								thisV.addFriend.users=[]
							}
							thisV.addFriend.addIs=0
							thisV.addFriend.users=thisV.addFriend.users.concat(res.data.data.itemList)
						}
					}
					thisV.addFriend.loading=0
				})

				thisV.$axios.get(`/recording/user/user-list-sum?kw=${thisV.addFriend.kw||''}&pn=${thisV.addFriend.pn}`).then(res => {
					debugger
					if (res.data.code == 0) {
							thisV.addFriend.userCount=res.data.data.itemCount
					}
				})
			},
			addFriendUserListScroll(event){
				debugger
				let thisV = this
				if((event.target.scrollTop+thisV.$(event.target).height())>=event.target.scrollHeight) {
					thisV.addFriend.pn++;
					thisV.findMoreFriendUserList ()
				}
			},
			friendListScroll(event){
				debugger
				let thisV = this
				thisV.scrollTop=event.target.scrollTop;
				if((event.target.scrollTop+thisV.$(event.target).height())>=event.target.scrollHeight) {
					thisV.pn++;
					thisV.loadFriendList ()
				}
			},
			loadFriendList (){
				debugger
				let thisV = this
				thisV.loading=1
				let sorts=[]
				let orders=[]
				for(var c in thisV.sortMap1) {
					if(thisV.sortMap1[c]){
						sorts.push(c)
						orders.push(thisV.sortMap1[c]==1?'asc':thisV.sortMap1[c]==2?'desc':'c')
					}
				}
				if(!sorts || sorts.length==0){
					sorts=['orderNo','nickname','createTime','updateTime']
					orders=['asc','asc','desc','desc']
				}

				thisV.itemCount =null;
				

				thisV.$axios.get('/recording/my-follow/follow-list?'+thisV.$qs.stringify({kw:thisV.kw,sort:sorts.join(),order:orders.join(),pn:thisV.pn,ps:thisV.ps})).then(res => {
					debugger
					if (res.data.code == 0) {
						if(res.data.data.itemList.length>0)
							thisV.friendList=thisV.friendList.concat(res.data.data.itemList)
						else
						thisV.pn--;
					}
					thisV.loading=0
				})
				thisV.$axios.get('/recording/my-follow/follow-list-sum?'+thisV.$qs.stringify({kw:thisV.kw,pn:thisV.pn,ps:thisV.ps})).then(res => {
					debugger
					if (res.data.code == 0) {
						thisV.itemCount=res.data.data.itemCount
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