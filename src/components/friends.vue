<template>
	<div id="index" style="font-size: 0;height:100%;padding:1px 0 0 0;margin-top: -1px;position: relative;">
		<div style="height: 30px;border-bottom:1px solid #8f8f8f;">
			<span style="width:50%;line-height: 30px;font-size: 16px;display:inline-block;border-right:1px solid #8f8f8f;position: relative;">
				<svg t="1591346902986" style="position: absolute;left:1%;top:8px;" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2627" width="15" height="15"><path d="M830.486464 796.124515 672.790943 638.42797c44.959904-52.799318 72.109099-121.232412 72.109099-196.016087 0-167.084182-135.448007-302.533214-302.53219-302.533214s-302.533214 135.449031-302.533214 302.533214 135.449031 302.53219 302.533214 302.53219c74.782651 0 143.215745-27.149196 196.017111-72.109099L796.101988 830.531518c9.499249 9.499249 24.885227 9.499249 34.384476 0S839.986737 805.623764 830.486464 796.124515zM442.366829 698.401131c-141.380814 0-255.989248-114.631985-255.989248-255.989248 0-141.403341 114.608434-255.989248 255.989248-255.989248 141.37979 0 255.989248 114.585907 255.989248 255.989248C698.356077 583.769146 583.747643 698.401131 442.366829 698.401131z" p-id="2628" fill="#8a8a8a"></path></svg>
				<input v-model="kw" type="text" style="line-height: 28px;width:83%;border:none;margin-left:8%;"
					@focus="
						queryHistoryPad=1;
						if($store.state.login){
							axios.get(`/recording/cache/get?name=${'queryHistoryKws-'+$store.state.login.userId}`)
								.then(res=>{
									if(res.data.code==0)
										if(res.data.data.value)
											queryHistoryKws=res.data.data.value.split(',');
								})
						}
					" 
					@click="queryHistoryPad=1;"
					@keyup.enter="pn=1;friends=[];queryHistoryPad=0;loadFriends();" 
				/>
				<span v-if="kw" style="font-size: 16px;cursor: pointer;color: #8f8f8f;position: absolute;right:0px;top:0px;width: 20px;text-align: center;" 
					@click="kw=null;">
					X
				</span>
			</span>
			<span class="active unselectable" @click="pn=1;friends=[];queryHistoryPad=0;loadFriends();"
				style="width: 32px;line-height: 30px;padding:0 5px;font-size: 16px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;">
				搜索
			</span>
			<span class="active unselectable" @click="status=1;cancelIs='',completeIs='',sortMap.name=0,sortMap.finalHas=0,sortMap.finalTime=0,sortMap.orderNo=0,
					sortMap.createTime=0,sortMap.updateTime=0,sortMap1={},kw=null;type='',pn=1;friends=[];queryHistoryPad=0;loadFriends()" 
				style="width: 32px;line-height: 30px;padding:0 5px;font-size: 16px;cursor: pointer;display:inline-block;
					border-right:1px solid #8f8f8f;">
				重置
			</span>
		</div>
		<div style="padding:5px 5px 5px 5px;box-shadow: 0px 1px 1px 0px #888888;height: 15px;">
			<span style="font-size: 16px;color: #8f8f8f;line-height:16px;" >
				总数:{{friendsCount}}
			</span>
		</div>
		<div class="scrollbar" @scroll="friendsScroll($event)" ref="friends" style="overflow: auto;width:100%;position: absolute;top: 58px;bottom: 88px;">
			<div v-for="item in friends" :key="item.userId" @click="lookFriend=item"
				style="padding:5px;border:1px solid #8F8F8F;margin:  5px ;cursor:pointer;background-color: #FFFFFF;position: relative;">
				<span><img :src="item.headimg" /></span>
				<span style="display:inline-block;width: 60px;font-size:16px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;">
					{{ item.alias?item.alias:item.nickname }}
				</span>
				<span style="vertical-align: text-bottom;font-size:16px;">(</span>
				<span style="display:inline-block;width: 60px;font-size:16px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;">
					{{ item.alias?`${item.nickname}`:'' }}
				</span>
				<span style="vertical-align: text-bottom;font-size:16px;">)</span>
				<span v-if="item.orderNo" 
					style="font-size:12px;color:#ff0000;position:absolute;right:5px;bottom: 5px;width:14px;text-align: right;
						overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
					{{item.orderNo}}
				</span>
			</div>
			<div v-if="friends && loading"  style="font-size:12px;text-align: center;color:#8F8F8F;margin-bottom:10px;margin-top: 10px;">
				加载中
			</div>
			<div class="activeText unselectable" v-if="friends && !loading && friends.length<friendsCount" @click="pn++;queryHistoryPad=0;loadFriends();"
				style="font-size:12px;text-align: center;color:#8F8F8F;margin-bottom:10px;margin-top: 10px;cursor: pointer;">
				点击加载更多
			</div>
			<div class="unselectable" v-if="friends && !loading && !(friends.length<friendsCount)" style="font-size:12px;text-align: center;color:#8F8F8F;margin-bottom:10px;margin-top: 10px;">
				已全部加载
			</div>
		</div>



		<!-- 看好友 -->
		<div v-if="lookFriend" style="height:100%;width:100%;background-color: rgba(0,0,0,0.6);position: absolute; top:0;" >
			<div class="scrollbar1" style="padding:10px 10px 10px 40px;background-color: #ffffff;margin-top:100px;max-height: 500px;overflow: auto;">
				<div style="font-size: 16px;color:#8F8F8F;">查看好友</div>
				<div style="margin-top:10px;">
					<span style="font-size:16px;">昵称 : </span><span style="font-size:16px;">{{lookFriend.nickname}}</span>
				</div>
				<div style="margin-top:10px;">
					<span style="font-size:16px;">别名 : </span><span style="font-size:16px;">{{lookFriend.alias}}</span>
				</div>
				<div style="margin-top:10px;">
					<span style="font-size:16px;">手机 : </span>
					<span><a :href="'tel:'+lookFriend.phone" style="font-size:16px;">{{lookFriend.phone}}</a></span>
				</div>
				<div style="margin-top:10px;">
					<span style="font-size:16px;">排序 : </span><span style="font-size:16px;">{{lookFriend.orderNo}}</span>
				</div>
				<div style="margin-top:10px;">
					<button @click="lookFriend=null;" style="font-size:16px;cursor: pointer;width:100px;height:30px;margin-right:5px;margin-bottom:5px;">关闭</button>
					<button style="font-size:16px;cursor: pointer;width:100px;height:30px;margin-right:5px;margin-bottom:5px;"
						@click="
							$dialog.confirm({
								message: '确认删除吗?'
							}).then(() => {
								lookFriend=null;
							}).catch(() => {
							});
						">
						删除
					</button>
				</div>
			</div>
		</div>
	
		<!-- 加好友 -->
		<div v-if="addFriend.todo" style="height:100%;width:100%;background-color: rgba(0,0,0,0.6);position: absolute; top:0;" >
			<div style="padding:10px 10px 10px 40px;background-color: #ffffff;margin-top:100px;max-height: 500px;overflow: auto;">
				<div style="font-size: 16px;color:#8F8F8F;">添加好友</div>
				<div style="margin-top:5px;">
					<span style="height:28px;display: inline-block;position: relative;width:198px;border: 1px solid #8f8f8f;">
						<input v-model="addFriend.kw" style="font-size:16px;line-height: 26px;border: none;width: 175px;margin-left: 5px;" />
						<span v-if="addFriend.kw" 
							style="font-size:16px;line-height: 28px;display:inline-block;position: absolute;width:20px;right:0;text-align: center;cursor: pointer;"
							@click="addFriend.kw=null">
							X
						</span>
					</span>
					<button style="font-size:16px;height:30px;width:48px;vertical-align: bottom;cursor: pointer;"
						@click="addFriend.pn=1;addFriend_loadUsers();">搜索</button>
				</div>
				<div class="scrollbar1" style="overflow: auto;max-height: 350px;margin-top: 5px;">
					<div class="active unselectable" v-for="item in addFriend.users" :key="item.userId" @click=""
						style="padding:5px;border:1px solid #8F8F8F;margin:5px 0;cursor:pointer;background-color: #FFFFFF;position: relative;"
						@click="
							$dialog.confirm({
								message: `确认添加 ${item.nickname} 为好友吗?`
							}).then(() => {
								
							}).catch(() => {
							});
						">
						<span><img :src="item.headimg" /></span>
						<span style="display:inline-block;width: 60px;font-size:16px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;">
							{{ item.nickname }}
						</span>
						<span v-if="item.phone" style="display:inline-block;width: 98px;font-size:16px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;">
							({{ item.phone.replace(/(?<=^.{3}).{4}/,'****') }})
						</span>
					</div>
					<div v-if="addFriend.pUsers && addFriend.loading"  style="font-size:12px;text-align: center;color:#8F8F8F;margin-bottom:10px;margin-top: 10px;">
						加载中
					</div>
					<div class="activeText unselectable" v-if="addFriend.pUsers && !addFriend.loading && addFriend.pUsers.length == addFriend.ps" @click="addFriend.pn++;addFriend_loadUsers()" 
						style="font-size:12px;text-align: center;color:#8F8F8F;margin-bottom:10px;margin-top: 10px;cursor: pointer;">
						点击加载更多
					</div>
					<div class="unselectable" v-if="addFriend.pUsers && !addFriend.loading && addFriend.pUsers.length < addFriend.ps" style="font-size:12px;text-align: center;color:#8F8F8F;margin-bottom:10px;margin-top: 10px;">
						已全部加载
					</div>
				</div>
				<div style="margin-top:10px;">
					<button @click="addFriend.todo=null;" style="font-size:16px;cursor: pointer;width:100px;height:30px;margin-right:5px;margin-bottom:5px;">关闭</button>
				</div>
			</div>
		</div>

		<div style="height:91px;position:absolute;bottom:0;left:0;right:0;background-color: #FFFFFF;box-shadow: 0px 0 4px 0px #888888;">
			<div class="active unselectable" style="font-size:16px;height:40px;line-height: 40px;text-align: center;cursor:pointer;font-weight: 900;"
				@click="addFriend.todo=1">
				找 朋 友 +
			</div>
			<div class="n1-line scrollbar1" style="height:50px;position: relative;border-top:1px solid #8F8F8F;overflow-x: auto;">
				<span class="unselectable" @click="$router.push({path:'/index',query:{time:new Date().getTime()+''}})"
					style="line-height:50px;font-size:16px;width:14%;display:inline-block;text-align: center;cursor:pointer;vertical-align: middle;">
					任 务
				</span>
				<span style="border-left:1px solid #808080;display:inline-block;line-height:15px;font-size: 16px;height:15px;vertical-align: middle;"></span>
				<span class="unselectable" style="line-height:50px;font-size:16px;width:14%;display:inline-block;text-align: center;cursor:pointer;vertical-align: middle;">
					工 作
				</span>
				<span style="border-left:1px solid #808080;display:inline-block;line-height:15px;font-size: 16px;height:15px;vertical-align: middle;"></span>
				<span class="unselectable" style="line-height:50px;font-size:16px;width:14%;display:inline-block;text-align: center;cursor:pointer;vertical-align: middle;">
					日 常
				</span>
				<span style="border-left:1px solid #808080;display:inline-block;line-height:15px;font-size: 16px;height:15px;vertical-align: middle;"></span>
				<span class="unselectable" style="line-height:50px;font-size:16px;width:14%;display:inline-block;text-align: center;cursor:pointer;vertical-align: middle;">
					记 录
				</span>
				<span style="border-left:1px solid #808080;display:inline-block;line-height:15px;font-size: 16px;height:15px;vertical-align: middle;"></span>
				<span class="unselectable" @click="$router.push({path:'/friends',query:{time:new Date().getTime()+''}})"
					style="line-height:50px;font-size:14px;width:14%;display:inline-block;text-align: center;cursor:pointer;vertical-align: middle;
						background-color: #ff7f08;color:#ffffff;">
					好 友
				</span>
				<span style="border-left:1px solid #808080;display:inline-block;line-height:15px;font-size: 16px;height:15px;vertical-align: middle;"></span>
				<span class="unselectable" style="line-height:50px;font-size:16px;width:14%;display:inline-block;text-align: center;cursor:pointer;vertical-align: middle;">
					消 息
				</span>
				<span style="border-left:1px solid #808080;display:inline-block;line-height:15px;font-size: 16px;height:15px;vertical-align: middle;"></span>
				<span class="unselectable" @click="$router.push({path:'/me',query:{time:new Date().getTime()+''}})"
					style="line-height:50px;font-size:16px;width:14%;display:inline-block;text-align: center;cursor:pointer;vertical-align: middle;">
					我
				</span>
			</div>
		</div>

		<!-- 搜索历史 -->
		<div v-if="queryHistoryPad" 
			@click="
				if($event.currentTarget==$event.target) {
					queryHistoryPad=0;
				}
			" 
			style="position: absolute;top:32px;bottom:0;width:100%;background-color: #00000087;">
			<div style="background-color: #ffffff;padding:0 10px 10px 10px;min-height:100px;">
				<span v-for="(item,index) in queryHistoryKws" :key="index"
					style="margin:10px 15px 0 0;display: inline-block;background-color: #e5e5e5;cursor: pointer;">
					<span 
						@click="
							kw=item;
							pn=1;friends=[];queryHistoryPad=0;loadFriends();
						"
					style="
						font-size: 16px;display: inline-block;background-color: #e5e5e5;max-width: 200px;
						overflow:hidden;text-overflow:ellipsis;white-space: nowrap;padding:5px 10px 5px 5px;
					">
						{{item}}
					</span>

					<span 
						@click="
							queryHistoryKws.splice(queryHistoryKws.indexOf(item),1)
							if($store.state.login){
								$axios.post('/recording/cache/set',$qs.stringify({name:'queryHistoryKws-'+$store.state.login.userId,value:queryHistoryKws.join()}))
							}
						"
						style="
							font-size: 16px;display: inline-block;padding:5px;padding: 5px 0px;
							vertical-align: bottom;background-color: #ffffff;color: #8f8f8f;border: 1px solid #e5e5e5;
						">
						X
					</span>
				</span>
				<div style="font-size: 16px;visibility: hidden;">1</div>
				<div v-if="queryHistoryKws && queryHistoryKws.length>0" 
					@click="
						queryHistoryKws=[];
						if($store.state.login){
							$axios.post('/recording/cache/set',$qs.stringify({name:'queryHistoryKws-'+$store.state.login.userId,value:queryHistoryKws.join()}))
						}
					"
					style="
						font-size: 16px;cursor: pointer;text-align: center;margin-top:10px;color:#8F8F8F;border:1px dashed #8f8f8f;
						padding: 5px;width: 120px;margin: auto;
					">
					清空历史记录
				</div>
				<div v-if="!queryHistoryKws || queryHistoryKws.length==0" 
					style="font-size: 16px;text-align: center;margin-top:10px;color:#8F8F8F;">暂无历史记录</div>
			</div>
		</div>
	</div>
</template>
<script>
	import Vue from 'vue'
	import _ from 'lodash'
	export default {
		name: 'index',
		data() {
			return {
				queryString: '',
				kw: null,
				friends: [],
				pn: 1,
				ps: 15,
				friendsCount: null,
				lookFriend: null,
				loading: null,
				addFriend: {
					todo: null,
					kw: null,
					pn: null,
					ps: 15,
					users : null,
					pUsers : null
				},
				scrollTop: null,
				sortMap: {
					orderNo: 0,
					createTime: 0,
					nickname: 0
				},
				sortMap1: {
				},
				chooseFriend: null,
				queryHistoryKws: [],
				queryHistoryPad: 0
			}
		},
		activated() {
			debugger
			let thisV = this
			window.thisV=thisV;
			if (thisV.queryString != JSON.stringify(thisV.$route.query)) {
				thisV.reload();
				thisV.queryString = JSON.stringify(thisV.$route.query);
			}else{
				thisV.$refs.friends.scrollTop=thisV.scrollTop
				if(thisV.chooseFriend){
					thisV.$axios.get(`/recording/my-friends?friendId=${thisV.chooseFriend.friendId}`).then(res => {
						if(res.data.code==0){
							let o =res.data.data.items[0];
							thisV.chooseFriend.nickname=o.nickname;
							thisV.chooseFriend.alias=o.alias;
							thisV.chooseFriend.userId=o.userId;
							thisV.chooseFriend.friendId=o.friendId;
							thisV.chooseFriend.headimg=o.headimg;
							thisV.chooseFriend.orderNo=o.orderNo;
						}else if (res.data.code==1404){
							thisV.friendsCount--;
							thisV.friends.splice(thisV.friends.indexOf(thisV.chooseFriend),1)
						}
					})
				}
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

				thisV.queryHistoryPad=0;
				thisV.loadFriends()
			},
			friendsScroll(event){
				debugger
				let thisV = this
				thisV.scrollTop=event.target.scrollTop;
				if((event.target.scrollTop+thisV.$(event.target).height())>=event.target.scrollHeight) {
					thisV.pn++;
					thisV.queryHistoryPad=0;thisV.loadFriends()
				}
			},
			loadFriends(){
				debugger
				let thisV = this
				thisV.loading=1
				let sorts=[]
				let orders=[]

				for(var c in thisV.sortMap1) {
					if(thisV.sortMap1[c]){
						sorts.push(c)
						orders.push(thisV.sortMap1[c]==1?'asc':thisV.sortMap1[c]==2?'desc':'asc')
					}
				}

				if(!sorts || sorts.length==0){
					sorts=['orderNo','createTime','nickname']
					orders=['asc','desc','asc']
				}

				thisV.friendsCount =null;

				if(thisV.kw && thisV.queryHistoryKws.indexOf(thisV.kw)==-1){
					thisV.queryHistoryKws.splice(0,0,thisV.kw)
					if(thisV.$store.state.login){
						thisV.$axios.post('/recording/cache/set',thisV.$qs.stringify({name:'queryHistoryKws-'+thisV.$store.state.login.userId,value:thisV.queryHistoryKws.join()}))
					}
				}

				var obj = {
					kw:thisV.kw,
					sort:sorts.join(),
					order:orders.join(),
					pn:thisV.pn,
					ps:thisV.ps
				}
				thisV.$axios.get('/recording/my-friends?' + thisV.$qs.stringify(obj)).then(data => {
					debugger
					if (data.data.code == 0) {
						if(data.data.data.items.length>0){
							if(thisV.pn==1)
								thisV.friends=[]
							thisV.friends=thisV.friends.concat(data.data.data.items)
						}else
							thisV.pn--;
					} else {
						if(data.data.codeMsg)
							thisV.$notify({ type: 'danger', message: data.data.codeMsg });
					}
					thisV.loading=0
				})
				thisV.$axios.get('/recording/my-friends-sum?' + thisV.$qs.stringify(obj)).then(data => {
					debugger
					if (data.data.code == 0) {
						thisV.friendsCount=data.data.data.itemsCount
					} else {
						if(data.data.codeMsg)
							thisV.$notify({ type: 'danger', message: data.data.codeMsg });
					}
				})
			},
			addFriend_loadUsers(){
				debugger
				let thisV = this
				thisV.addFriend.loading=1
				var obj = {
					kw:thisV.addFriend.kw,
					pn:thisV.addFriend.pn,
					ps:thisV.addFriend.ps
				}
				thisV.$axios.get('/recording/users?' + thisV.$qs.stringify(obj)).then(data => {
					debugger
					if (data.data.code == 0) {
						if(data.data.data.items.length>0){
							if(thisV.addFriend.pn==1)
								thisV.addFriend.users=[]
							thisV.addFriend.pUsers = data.data.data.items
							thisV.addFriend.users=thisV.addFriend.users.concat(data.data.data.items)
						}else
							thisV.addFriend.pn--;
					} else {
						if(data.data.codeMsg)
							thisV.$notify({ type: 'danger', message: data.data.codeMsg });
					}
					thisV.addFriend.loading=0
				})
			}
			
		}
	}
</script>

<style scoped>
</style>