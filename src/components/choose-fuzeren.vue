<template>
	<div id="index" style="height:100%;position:relative;">
		<div
			style="font-size: 16px;text-align: center;height:40px;line-height: 40px;position: relative;border-bottom:1px solid #8F8F8f">
			<span @click="$router.back()" style="position: absolute;left:0;width:40px;cursor: pointer;font-weight: 900;">&lt;</span>
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
			
			
		<div class="scrollbar" @scroll="friendListScroll($event)" ref="friendList" style="overflow: auto;position: absolute;top:72px;;bottom:52px;width:100%;background-color: rgb(252, 250, 250);">
		<div style="margin:5px 7px 0px 7px;">
			<span style="font-size: 14px;color: #8f8f8f;">已找到 {{itemCount}} 条记录</span>
		</div>
		
		<div v-for="(item, i) in friendList" @click="$store.state.chooseFuZeRenUserId=item.userId;$store.state.chooseFuZeRenUserNickname=item.nickname;$router.back();" style="padding:5px;border:1px solid #8F8F8F;margin:8px 7px 5px 7px;cursor:pointer;background-color: #FFFFFF;">
			<span><img :src="item.logo" /></span>
			<span style="font-size:16px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;">{{item.nickname}}</span>
		</div>
		
		<div v-show="loading"  style="font-size:14px;text-align: center;color:#8F8F8F;margin-bottom:5px;margin-top: 10px;">加载中</div>

		<div v-show="!loading && friendList.length<itemCount" @click="pn++;loadFriendList();" style="font-size:14px;text-align: center;color:#8F8F8F;margin-bottom:5px;margin-top: 10px;">点击加载更多</div>
		<div v-show="!loading && !(friendList.length<itemCount)" style="font-size:14px;text-align: center;color:#8F8F8F;margin-bottom:5px;margin-top: 10px;">已全部加载</div>

	</div>
		

	</div>
</template>
<script>
	export default {
		name: 'index',
		data() {
			return {
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
					orderNo:1,
					nickname:1,
					createTime:2,
					updateTime:0,
				},
				sortMap1:{
					orderNo:1,
					nickname:1,
					createTime:2,
					updateTime:0,
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

				thisVue.$axios.post('/login-refresh').then(res => {
					debugger
					if(res.data.codeMsg)
						alert(res.data.codeMsg)
					if (res.data.code == 0) {
						thisVue.$store.state.login=res.data.data;
					}else{
						thisVue.$axios.post('/logout').then(res => {
							thisVue.$store.state.login=null;
							thisVue.$router.push({path:'/login',query:{time:new Date().getTime()}})
						})
					}
				})

				thisVue.loadFriendList()
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
				thisVue.itemCount =null;
				

				thisVue.$axios.get('/my-friend/friend-list?'+thisVue.$qs.stringify({kw:thisVue.kw,sort:sorts.join(),order:orders.join(),pn:thisVue.pn,ps:thisVue.ps})).then(res => {
					debugger
					if (res.data.code == 0) {
						if(res.data.data.itemList.length>0)
							thisVue.friendList=thisVue.friendList.concat(res.data.data.itemList)
						else
						thisVue.pn--;
					}
					thisVue.loading=0
				})
				thisVue.$axios.get('/my-friend/friend-list-sum?'+thisVue.$qs.stringify({kw:thisVue.kw,pn:thisVue.pn,ps:thisVue.ps})).then(res => {
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

.scrollbar::-webkit-scrollbar {
  display: none;
}
</style>