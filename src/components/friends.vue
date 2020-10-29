<template>
	<div id="index" style="font-size: 0;height:100%;padding:1px 0 0 0;margin-top: -1px;position: relative;">
		<div style="height: 30px;border-bottom:1px solid #8f8f8f;">
			<span style="width:50%;line-height: 30px;font-size: 16px;display:inline-block;border-right:1px solid #8f8f8f;position: relative;">
				<svg t="1591346902986" style="position: absolute;left:1%;top:8px;" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2627" width="15" height="15"><path d="M830.486464 796.124515 672.790943 638.42797c44.959904-52.799318 72.109099-121.232412 72.109099-196.016087 0-167.084182-135.448007-302.533214-302.53219-302.533214s-302.533214 135.449031-302.533214 302.533214 135.449031 302.53219 302.533214 302.53219c74.782651 0 143.215745-27.149196 196.017111-72.109099L796.101988 830.531518c9.499249 9.499249 24.885227 9.499249 34.384476 0S839.986737 805.623764 830.486464 796.124515zM442.366829 698.401131c-141.380814 0-255.989248-114.631985-255.989248-255.989248 0-141.403341 114.608434-255.989248 255.989248-255.989248 141.37979 0 255.989248 114.585907 255.989248 255.989248C698.356077 583.769146 583.747643 698.401131 442.366829 698.401131z" p-id="2628" fill="#8a8a8a"></path></svg>
				<input v-model="kw" type="text" style="line-height: 28px;width:83%;border:none;margin-left:8%;"
					@focus="
						if(queryHistory.kws)
								return;
						queryHistory.kws=[];
						queryHistory.run=1;
						if($store.state.login){
							$axios.get(`/recording/cache/get?name=${'queryHistory.friends.kws-'+$store.state.login.userId}`)
								.then(res=>{
									if(res.data.code==0)
										if(res.data.data.value)
											queryHistory.kws=res.data.data.value.split(',');
								})
						}
					" 
					@click="queryHistory.run=1;"
					@keyup.enter="pn=1;friends=[];queryHistory.run=0;loadFriends();" 
				/>
				<span v-if="kw" style="font-size: 16px;cursor: pointer;color: #8f8f8f;position: absolute;right:0px;top:0px;width: 20px;text-align: center;" 
					@click="kw=null;">
					X
				</span>
			</span>
			<span class="active" @click="pn=1;friends=[];queryHistory.run=0;loadFriends();"
				style="width: 32px;line-height: 30px;padding:0 5px;font-size: 16px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;">
				搜索
			</span>
			<span class="active" @click="kw=null;pn=1;friends=[];queryHistory.run=0;loadFriends()" 
				style="width: 32px;line-height: 30px;padding:0 5px;font-size: 16px;cursor: pointer;display:inline-block;
					border-right:1px solid #8f8f8f;">
				重置
			</span>
		</div>
		<div style="padding:5px 5px 5px 5px;box-shadow: 0px 1px 1px 0px #888888;height: 15px;">
			<span style="font-size: 16px;color: #8f8f8f;line-height:16px;" >
				总数:{{$o(friendsSum).attr('count')}}
			</span>
		</div>
		<div class="scrollbar" @scroll="friendsScroll($event)" ref="friends" style="overflow: auto;width:100%;position: absolute;top: 58px;bottom: 88px;">
			<div v-for="item in friends" :key="item.userId" @click="chosenFriend=item;friendInfo.run=1;"
				style="padding:5px;border:1px solid #8F8F8F;margin:  5px ;cursor:pointer;background-color: #FFFFFF;position: relative;">
				<span><img :src="item.headimg" /></span>
				<span style="display:inline-block;font-size:16px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;max-width:120px;">
					{{ item.alias?item.alias:item.nickname }}
				</span>
				<span style="vertical-align: text-bottom;font-size:16px;color:#767676;margin-left:5px;">(</span>
				<span style="display:inline-block;font-size:16px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;color:#767676;max-width:120px;">
					{{ item.alias?`${item.nickname}`:'' }}
				</span>
				<span style="vertical-align: text-bottom;font-size:16px;color:#767676;">)</span>
				<span v-if="item.orderNo" 
					style="font-size:12px;color:#ff0000;position:absolute;right:5px;bottom: 5px;width:14px;text-align: right;
						overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
					{{item.orderNo}}
				</span>
			</div>
			<div v-if="loading"  style="font-size:12px;text-align: center;color:#8F8F8F;margin-bottom:10px;margin-top: 10px;">
				加载中
			</div>
			<div class="active-text unselectable" v-if="!loading && friends.length<$o(friendsSum).attr('count')" @click="pn++;queryHistory.run=0;loadFriends();"
				style="font-size:12px;text-align: center;color:#8F8F8F;margin-bottom:10px;margin-top: 10px;cursor: pointer;">
				点击加载更多
			</div>
			<div  v-if="!loading && !(friends.length<$o(friendsSum).attr('count'))" style="font-size:12px;text-align: center;color:#8F8F8F;margin-bottom:10px;margin-top: 10px;">
				已全部加载
			</div>
		</div>



		<!-- 好友详情 -->
		<div v-if="friendInfo.run" style="height:100%;width:100%;background-color: rgba(0,0,0,0.6);position: absolute; top:0;z-index: 1000;" >
			<div class="scrollbar1" style="padding:10px 10px 10px 40px;background-color: #ffffff;margin-top:100px;max-height: 500px;overflow: auto;">
				<div style="font-size: 16px;color:#8F8F8F;">好友详情</div>
				<div style="margin-top:10px;">
					<span style="font-size:16px;">昵称 : </span><span style="font-size:16px;">{{chosenFriend.nickname}}</span>
				</div>
				<div style="margin-top:10px;position: relative;">
					<span style="font-size:16px;">别名 : </span>
					<span style="font-size:16px;">{{chosenFriend.alias}}</span>
					<span  style="position: absolute;right:0;font-size:16px;padding:0 3px;background-color: #cccccc;cursor: pointer;color:#767676;"
						@click="friendInfo.editAlias.run=1;friendInfo.editAlias.value=chosenFriend.alias">
						改
					</span>
				</div>
				<div style="margin-top:10px;">
					<span style="font-size:16px;">手机 : </span>
					<span><a :href="'tel:'+chosenFriend.phone" style="font-size:16px;">{{chosenFriend.phone}}</a></span>
				</div>
				<div style="margin-top:10px;">
					<span style="font-size:16px;">排序 : </span><span style="font-size:16px;">{{chosenFriend.orderNo}}</span>
				</div>
				<div style="margin-top:10px;">
					<button @click="chosenFriend=null;friendInfo.run=0;" style="font-size:16px;cursor: pointer;width:100px;height:30px;margin-right:5px;margin-bottom:5px;">关闭</button>
					<button style="font-size:16px;cursor: pointer;width:100px;height:30px;margin-right:5px;margin-bottom:5px;"
						@click="
							$dialog.confirm({
								message: '确认删除吗?'
							}).then(() => {
								$axios.post('/recording/my-friend/delete-friend',$qs.stringify({friendId:chosenFriend.friendId})).then(res=>{
									if(res.data.codeMsg)
										$notify({type:'primary',message:res.data.codeMsg})
									if(res.data.code == 0){
										if(!res.data.codeMsg)
											$notify({type:'success',message:'删除成功'})
										friends.splice(chosenFriend)
										chosenFriend=null;
										friendInfo.run=0
									}
								})
							}).catch(() => {
							});
						">
						删除
					</button>
				</div>
			</div>

			<!-- 修改别名 -->
			<div v-if="friendInfo.editAlias.run" style="height:100%;width:100%;background-color: rgba(0,0,0,0.6);position: absolute; top:0;" >
				<div class="scrollbar1" style="padding:10px 10px 10px 40px;background-color: #ffffff;margin-top:100px;max-height: 500px;overflow: auto;">
					<div style="font-size: 16px;color:#767676;">修改别名</div>
					<div style="margin-top:10px;">
						<input v-model="friendInfo.editAlias.value" style="font-size: 16px;"/>
					</div>
					<div style="margin-top:10px;">
						<button style="font-size: 16px;width:100px;height:30px;"
							@click="
								if(chosenFriend.alias==friendInfo.editAlias.value)
									return;
								$dialog.confirm({message:'确认修改吗?'}).then(res=>{
									$axios.post('/recording/my-friend/update-friend',$qs.stringify({
										friendId:chosenFriend.friendId,
										alias:friendInfo.editAlias.value
									})).then(res=>{
										if(res.data.codeMsg)
											$notify({type:'primary',message:res.data.codeMsg})
										if(res.data.code == 0){
											if(!res.data.codeMsg)
												$notify({type:'success',message:'修改成功'})
											friendInfo.editAlias.run=0;
											chosenFriend.alias=friendInfo.editAlias.value
										}
									})
								})
							">
							确认
						</button>
						<button style="font-size: 16px;width:100px;height:30px;margin-left:5px;" @click="friendInfo.editAlias.run=0;">取消</button>
					</div>
				</div>
			</div>
		</div>
	

		<div style="height:91px;position:absolute;bottom:0;left:0;right:0;background-color: #FFFFFF;box-shadow: 0px 0 4px 0px #888888;">
			<div class="active" style="font-size:16px;height:40px;line-height: 40px;text-align: center;cursor:pointer;font-weight: 900;"
				@click="
					addFriend.run=addFriend.queryUsersRun=1;
					addFriend.setFriendRun=0;
					if(!addFriend.users || addFriend.users.length==0)
						addFriend_loadUsers();">
				找 朋 友 +
			</div>
			<div class="n1-line scrollbar1" style="height:50px;position: relative;border-top:1px solid #8F8F8F;overflow-x: auto;">
				<span  @click="$router.replace({path:'/index'})"
					style="line-height:50px;font-size:16px;width:14%;display:inline-block;text-align: center;cursor:pointer;vertical-align: middle;">
					任 务
				</span>
				<span style="border-left:1px solid #808080;display:inline-block;line-height:15px;font-size: 16px;height:15px;vertical-align: middle;"></span>
				<span  style="line-height:50px;font-size:16px;width:14%;display:inline-block;text-align: center;cursor:pointer;vertical-align: middle;">
					工 作
				</span>
				<span style="border-left:1px solid #808080;display:inline-block;line-height:15px;font-size: 16px;height:15px;vertical-align: middle;"></span>
				<span  style="line-height:50px;font-size:16px;width:14%;display:inline-block;text-align: center;cursor:pointer;vertical-align: middle;">
					日 常
				</span>
				<span style="border-left:1px solid #808080;display:inline-block;line-height:15px;font-size: 16px;height:15px;vertical-align: middle;"></span>
				<span  style="line-height:50px;font-size:16px;width:14%;display:inline-block;text-align: center;cursor:pointer;vertical-align: middle;">
					记 录
				</span>
				<span style="border-left:1px solid #808080;display:inline-block;line-height:15px;font-size: 16px;height:15px;vertical-align: middle;"></span>
				<span  @click="$router.replace({path:'/friends'})"
					style="line-height:50px;font-size:14px;width:14%;display:inline-block;text-align: center;cursor:pointer;vertical-align: middle;
						background-color: #ff7f08;color:#ffffff;">
					好 友
				</span>
				<span style="border-left:1px solid #808080;display:inline-block;line-height:15px;font-size: 16px;height:15px;vertical-align: middle;"></span>
				<span  style="line-height:50px;font-size:16px;width:14%;display:inline-block;text-align: center;cursor:pointer;vertical-align: middle;">
					消 息
				</span>
				<span style="border-left:1px solid #808080;display:inline-block;line-height:15px;font-size: 16px;height:15px;vertical-align: middle;"></span>
				<span  @click="$router.replace({path:'/me'})"
					style="line-height:50px;font-size:16px;width:14%;display:inline-block;text-align: center;cursor:pointer;vertical-align: middle;">
					我
				</span>
			</div>
		</div>

		<!-- 加好友 -->
		<div v-if="addFriend.run" style="height:100%;width:100%;background-color: rgba(0,0,0,0.6);position: absolute; top:0;z-index: 1000;" >
			<div v-if="addFriend.queryUsersRun" style="padding:10px 10px 10px 40px;background-color: #ffffff;margin-top:100px;max-height: 500px;overflow: auto;">
				<div style="font-size: 16px;color:#8F8F8F;">添加好友</div>
				<div style="margin-top:5px;">
					<span style="height:28px;display: inline-block;position: relative;width:198px;border: 1px solid #8f8f8f;">
						<input v-model="addFriend.kw" style="font-size:16px;line-height: 26px;border: none;width: 175px;margin-left: 5px;" 
							@keyup.enter="addFriend.pn=1;addFriend.users=null,addFriend_loadUsers();" />
						<span v-if="addFriend.kw" 
							style="font-size:16px;line-height: 28px;display:inline-block;position: absolute;width:20px;right:0;text-align: center;cursor: pointer;"
							@click="addFriend.kw=null;addFriend.pn=1;addFriend.users=null,addFriend_loadUsers();">
							X
						</span>
					</span>
					<button style="font-size:16px;height:30px;width:48px;vertical-align: bottom;cursor: pointer;margin-left: -1px;"
						@click="addFriend.pn=1;addFriend.users=null,addFriend_loadUsers();">搜索</button>
				</div>
				<div class="scrollbar1" @scroll="addFriend_usersScroll($event)" style="overflow: auto;max-height: 350px;margin-top: 5px;">
					<div class="active" v-for="item in addFriend.users" :key="item.userId" @click=""
						style="padding:5px;border:1px solid #8F8F8F;margin:5px 0;cursor:pointer;background-color: #FFFFFF;position: relative;"
						@click="
							$dialog.confirm({
								message: `确认添加 ${item.nickname} 为好友吗?`
							}).then(() => {
								addFriend.setFriendRun=1;
								addFriend.chosenUser=item;
							}).catch(() => {
							});
						">
						<span><img :src="item.headimg" /></span>
						<span style="display:inline-block;width:120px;font-size:16px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;vertical-align: bottom;">
							{{ item.nickname }}
						</span>
						<span v-if="item.phone" style="margin-left:10px;width:100px;display:inline-block;font-size:16px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;vertical-align: bottom;">
							{{ item.phone.replace(/(?<=^.{3}).{4}/,'****') }}
						</span>
						<span style="margin-left:10px;display:inline-block;width: 21px;font-size:16px;color:#ff0000;">
							{{ item.friendId?'友':'' }}
						</span>
					</div>
					<div v-if="addFriend.loading"  style="font-size:12px;text-align: center;color:#8F8F8F;margin-bottom:10px;margin-top: 10px;">
						加载中
					</div>
					<div class="active-text unselectable" v-if="!addFriend.loading && addFriend.currUsers.length == addFriend.ps" @click="addFriend.pn++;addFriend_loadUsers()" 
						style="font-size:12px;text-align: center;color:#8F8F8F;margin-bottom:10px;margin-top: 10px;cursor: pointer;">
						点击加载更多
					</div>
					<div  v-if="!addFriend.loading && addFriend.currUsers.length < addFriend.ps" style="font-size:12px;text-align: center;color:#8F8F8F;margin-bottom:10px;margin-top: 10px;">
						已全部加载
					</div>
				</div>
				<div style="margin-top:10px;">
					<button @click="addFriend.run=0;" style="font-size:16px;cursor: pointer;width:100px;height:30px;margin-right:5px;margin-bottom:5px;">关闭</button>
				</div>
			</div>

			<div v-if="addFriend.setFriendRun" style="height:100%;width:100%;background-color: rgba(0,0,0,0.6);position: absolute; top:0;" >
				<div style="padding:10px 10px 10px 40px;background-color: #ffffff;margin-top:100px;max-height: 500px;overflow: auto;">
					<div style="font-size: 16px;color:#8F8F8F;">设置好友</div>
					<div style="height:30px;margin-top:10px;position: relative;">
						<span style="font-size: 16px;display:inline-block;height:30px;line-height:30px;width:50px;">别名</span>
						<span style="font-size: 16px;display:inline-block;height:30px;line-height:30px;margin-left:5px;position: absolute;left:50px;right:0;">
							<span style="border-width:1px;border-style: solid;border-color: #cccccc;height:28px;line-height:28px;position: absolute;left:5px;right:5px;padding:0 5px;">
								<input v-model="addFriend.chosenUser.friendAlias" style="line-height:24px;padding:0px;border:none;width:100%;"
									@keyup.enter="addFriend_addFriend();"/>
							</span>
						</span>
					</div>
					<div style="margin-top:10px;">
						<button style="font-size:16px;cursor: pointer;width:100px;height:30px;margin-right:5px;margin-bottom:5px;"
							@click="addFriend_addFriend();">
							确认
						</button>
						<button @click="addFriend.setFriendRun=addFriend.chosenUser=null;" 
							style="font-size:16px;cursor: pointer;width:100px;height:30px;margin-right:5px;margin-bottom:5px;">
							取消
						</button>
					</div>
				</div>
			</div>
		</div>

		<!-- 搜索历史 -->
		<div v-if="queryHistory.run" 
			@click="
				if($event.currentTarget==$event.target) {
					queryHistory.run=0;
				}
			" 
			style="position: absolute;top:32px;bottom:0;width:100%;background-color: #00000087;">
			<div style="background-color: #ffffff;padding:0 10px 10px 10px;min-height:100px;">
				<span v-for="(item,index) in queryHistory.kws" :key="index"
					style="margin:10px 15px 0 0;display: inline-block;background-color: #e5e5e5;cursor: pointer;">
					<span 
						@click="
							kw=item;
							pn=1;friends=[];queryHistory.run=0;loadFriends();
						"
					style="
						font-size: 16px;display: inline-block;background-color: #e5e5e5;max-width: 200px;
						overflow:hidden;text-overflow:ellipsis;white-space: nowrap;padding:5px 10px 5px 5px;
					">
						{{item}}
					</span>

					<span 
						@click="
							queryHistory.kws.splice(queryHistory.kws.indexOf(item),1)
							if($store.state.login){
								$axios.post('/recording/cache/set',$qs.stringify({name:'queryHistory.friends.kws-'+$store.state.login.userId,value:queryHistory.kws.join()}))
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
				<div v-if="queryHistory.kws && queryHistory.kws.length>0" 
					@click="
						queryHistory.kws=[];
						if($store.state.login){
							$axios.post('/recording/cache/set',$qs.stringify({name:'queryHistory.friends.kws-'+$store.state.login.userId,value:queryHistory.kws.join()}))
						}
					"
					style="
						font-size: 16px;cursor: pointer;text-align: center;margin-top:10px;color:#8F8F8F;border:1px dashed #8f8f8f;
						padding: 5px;width: 120px;margin: auto;
					">
					清空历史记录
				</div>
				<div v-if="!queryHistory.kws || queryHistory.kws.length==0" 
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
				query: null,
				kw: null,
				friends: null,
				friendsSum: null,
				pn: 1,
				ps: 15,
				sort:'nickname',
				order:'asc',
				loading: null,
				scrollTop: null,
				chosenFriend: null,
				friendInfo:{
					run:null,
					editAlias:{
						run:null,
						value:null,
					}
				},
				queryHistory: {
					run:null,
					kws:null,
				},
				addFriend: {
					run: null,
					kw: null,
					pn: 1,
					ps: 15,
					loading:null,
					users : null,
					usersScrollTop:null,
					currUsers : null,
					chosenUser:null,
					queryUsersRun:null,
					setFriendRun:null,
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
				vue.$refs.friends.scrollTop=vue.scrollTop
			}
		},
		methods: {
			load() {
				debugger
				let vue = this

				if(!vue.$store.state.login){
					vue.$axios.post('/recording/logout').then(res => {
							vue.$store.state.login=null;
							vue.$router.push({path:'/login'})
						})
				}

				vue.queryHistory.run=0;
				vue.loadFriends()
			},
			friendsScroll(event){
				debugger
				let vue = this
				vue.scrollTop=event.target.scrollTop;
				if((event.target.scrollTop+vue.$(event.target).height())>=event.target.scrollHeight) {
					if(vue.friends && vue.friends.length < vue.ps)
						return;
					vue.pn++;
					vue.queryHistory.run=0;
					vue.loadFriends()
				}
			},
			loadFriends(){
				debugger
				let vue = this
				vue.loading=1
				vue.pn=vue.pn?vue.pn:1;

				vue.friendsSum=null;

				if(vue.kw && vue.queryHistory.kws.indexOf(vue.kw)==-1){
					vue.queryHistory.kws.splice(0,0,vue.kw)
					if(vue.$store.state.login){
						vue.$axios.post('/recording/cache/set',vue.$qs.stringify({name:'queryHistory.friends.kws-'+vue.$store.state.login.userId,value:vue.queryHistory.kws.join()}))
					}
				}

				var obj = {
					kw:vue.kw,
					sort:vue.sort,
					order:vue.order,
					pn:vue.pn,
					ps:vue.ps
				}
				vue.$axios.get('/recording/my-friend/friends?' + vue.$qs.stringify(obj)).then(res => {
					debugger
					if (res.data.code == 0) {
						if(res.data.data.items.length>0){
							if(vue.pn==1)
								vue.friends=[]
							vue.friends=vue.friends.concat(res.data.data.items)
						}else
							vue.pn--;
					} else {
						if(res.data.codeMsg)
							vue.$notify({ type:'primary',message: res.data.codeMsg });
					}
					vue.loading=0
				})
				vue.$axios.get('/recording/my-friend/friends-sum?' + vue.$qs.stringify(obj)).then(res => {
					debugger
					if (res.data.code == 0) {
						vue.friendsSum=res.data.data
					} else {
						if(res.data.codeMsg)
							vue.$notify({ type:'primary',message: res.data.codeMsg });
					}
				})
			},
			addFriend_loadUsers(){
				debugger
				let vue = this
				vue.addFriend.loading=1
				vue.addFriend.pn=vue.addFriend.pn?vue.addFriend.pn:1;

				var obj = {
					kw:vue.addFriend.kw,
					pn:vue.addFriend.pn,
					ps:vue.addFriend.ps
				}
				vue.$axios.get('/recording/user/users?' + vue.$qs.stringify(obj)).then(res => {
					debugger
					if (res.data.code == 0) {
						if(res.data.data.items.length>0){
							if(vue.addFriend.pn==1)
								vue.addFriend.users=[]
							vue.addFriend.currUsers = res.data.data.items
							vue.addFriend.users=vue.addFriend.users.concat(res.data.data.items)
						}else
							vue.addFriend.pn--;
					} else {
						if(res.data.codeMsg)
							vue.$notify({ type:'primary',message: res.data.codeMsg });
					}
					vue.addFriend.loading=0
				})
			},
			addFriend_usersScroll(event){
				debugger
				let vue = this
				vue.addFriend.usersScrollTop=event.target.scrollTop;
				if((event.target.scrollTop+vue.$(event.target).height())>=event.target.scrollHeight) {
					vue.addFriend.pn++;
					vue.addFriend_loadUsers()
				}
			},
			addFriend_addFriend(){
				let vue = this
				vue.$axios.post('/recording/my-friend/create-friend?',vue.$qs.stringify({
					toUserId:vue.addFriend.chosenUser.userId,
					alias:vue.addFriend.chosenUser.friendAlias
				})).then(res=>{
					if(res.data.codeMsg)
						vue.$notify({type:'primary',message:res.data.codeMsg})
					if(res.data.code==0) {
						if(!res.data.codeMsg)
							vue.$notify({type:'success',message:'添加成功'})
						vue.addFriend.setFriendRun=0;
						vue.addFriend.chosenUser=null;
					}
				})
			}
			
		}
	}
</script>

<style scoped>
</style>