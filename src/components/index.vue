<template>
	<div id="daily" style="font-size: 0;position:absolute;top:0;bottom:0;right:0;left:0;">
		<div v-if="dailies && dailies.length>0" class="scrollbar1" ref="scroll" style="overflow: auto;position:absolute;top:0;right:0;left:0;bottom:91px;-webkit-overflow-scrolling: touch;" 
			@scroll="
				scrollLeft=$event.target.scrollLeft
				scrollTop=$event.target.scrollTop
			">
			<div style="height:30px;border-style:solid;border-color:#a1a1a1;border-width:0 0 1px 0;white-space: nowrap;
					white-space: nowrap;display: inline-block;position: relative;">
				<span class="hover active" 
					style="cursor: pointer;padding:0 5px;line-height: 30px;border-style:solid;border-color:#a1a1a1;
						border-width:0 1px 0 0;background-color: #FFFFFF;position:absolute;width:90px;height:30px;display:inline-block;font-size:16px;" 
						:style="{left:(scrollLeft+'px')}">
				</span>
				
				<span style="vertical-align: bottom;width:101px;height:30px;display:inline-block;">
				</span>

				<template v-for="i in days">
					<span :key="'a'+i" class="hover active" 
						style="cursor: pointer;line-height: 30px;border-style:solid;border-color:#a1a1a1;
							border-width:0 1px 0 0;background-color: #FFFFFF;width:41px;padding:0 5px;height:30px;display:inline-block;font-size:16px;"
						:style="{width:(i==0?'55px':'41px'),'font-weight': (i==0?'600':null)}">
						{{
							$moment().set('date',$moment().get('date')-i).format(
								'M-D'+(i==0?'.E':'')
							)
						}}
					</span>
				</template>
			</div>
			<br/>
			<template v-for="item in dailies" >
				<div style="height:30px;border-style:solid;border-color:#a1a1a1;border-width:0 0 1px 0;white-space: nowrap;
						white-space: nowrap;display: inline-block;position: relative;">
					<span class="hover active n1-line" 
						style="cursor: pointer;padding:0 5px;line-height: 30px;border-style:solid;border-color:#a1a1a1;
							border-width:0 1px 0 0;background-color: #FFFFFF;position:absolute;width:90px;height:30px;display:inline-block;font-size:16px;" 
						:style="{left:(scrollLeft+'px')}"
						@click="chosenDaily=item;dailyInfo=1;">
						{{item.name}}
					</span>
					<span style="vertical-align: bottom;line-height: 30px;width:101px;height:30px;display:inline-block;">
					</span>
					<span v-for="day in days" :key="item.dailyId+'-day'+day" class="hover active" 
						style="cursor: pointer;line-height: 30px;border-style:solid;border-color:#a1a1a1;border-width:0 1px 0 0;
							background-color: #FFFFFF;width:41px;padding:0 5px;height:30px;display:inline-block;font-size:16px;"
						:style="{'background-color':foo(item,day)?'#008000':null,width:(day==0?'55px':'41px')}"
						@click="
							var done=0;
							if(item.does && item.does.length>0){
								for (let i = 0; i < item.does.length; i++) {
									const itemDo = item.does[i];
									if(itemDo.done &&
										$moment(itemDo.doneTime,'YYYY-MM-DD HH:mm:ss.SSS Z').format('M-D') 
										== 
										$moment().set('date',$moment().get('date')-day).format('M-D')
									){
										done = 1
									}
								}
							}
							window.console.log(done)
							if(done){
								var doneDate = $moment(fromDate).subtract(day,'day')
								$axios.post('/recording/daily/undone',$qs.stringify({
									dailyId:item.dailyId,
									date:doneDate.format('YYYY-MM-DD')
								})).then(res=>{
									if(res.data.codeMsg)
										$dialog.alert({message:res.data.codeMsg})
									if(res.data.code == 0){
										for (let i = 0; i < item.does.length; i++) {
											const itemDo = item.does[i];
											if(itemDo.done &&
												$moment(itemDo.doneTime,'YYYY-MM-DD HH:mm:ss.SSS Z').format('M-D') 
												== 
												$moment().set('date',$moment().get('date')-day).format('M-D')
											){
												item.does.splice(i,1)
											}
										}
									}
								})
							}else{
								var doneDate = $moment(fromDate).subtract(day,'day')
								$axios.post('/recording/daily/done',$qs.stringify({
									dailyId:item.dailyId,
									date:doneDate.format('YYYY-MM-DD')
								})).then(res=>{
									if(res.data.codeMsg)
										$dialog.alert({message:res.data.codeMsg})
									if(res.data.code == 0){
										item.does=item.does?item.does:[];
										item.does.push({doId:res.data.data.doId,done:1,doneTime:doneDate.format('YYYY-MM-DD')})
									}
								})
							}
						">
					</span>
				</div>
				<br/>
			</template>
			<!-- <div
				style="height:30px;border-style:solid;border-color:#a1a1a1;border-width:0 0 1px 0;white-space: nowrap;
					white-space: nowrap;display: inline-block;position: relative;">
				<span class="hover active"
					style="text-align: center;cursor: pointer;padding:0 5px;line-height: 30px;border-style:dashed;border-color:#a1a1a1;border-width:0 1px 1px 0;background-color: #FFFFFF;position:absolute;width:90px;height:30px;display:inline-block;font-size:16px;"
					:style="{left:(scrollLeft+'px')}"
					>
					+
				</span>
			</div> -->
		</div>
		<div v-if="dailies && dailies.length==0" style="text-align: center;font-size: 20px;margin-top:100px;">
			你还没有日常<br/>快去创建一个吧
		</div>
		<div v-if="dailyInfo" style="position: absolute;left:0;right:0;top:0;bottom:0;background-color: rgba(0, 0, 0, 0.7);z-index: 10000;">
			<div style="margin-top:10%;max-height:80%;padding:10px 10px 10px 40px;background-color: #FFFFFF;">
				<div style="font-size: 16px;color: #808080;height:30px;line-height: 30px;">日常详情</div>
				<div style="margin-top:10px;height:30px;position: relative;">
					<span style="font-size:16px;display: inline-block;width:80px;height:30px;line-height:30px;">
						日常名
					</span>
					<span style="font-size:16px;display: inline-block;height:30px;line-height:30px;">
						{{chosenDaily.name}}
					</span>
					<span style="display:inline-block;width:30px;line-height: 30px;position: absolute;right:0;text-align: center;cursor: pointer;"
						@click="
							var r = window.prompt('修改日常名',chosenDaily.name)
							if(r){
								if(r != chosenDaily.name){
									$axios.post('/recording/daily/update-daily',$qs.stringify({
										dailyId:chosenDaily.dailyId,
										name:r
									})).then(res => {
										if(res.data.codeMsg)
											$dialog.alert({message:res.data.codeMsg})
										if(res.data.code == 0){
											if(!res.data.codeMsg)
												$notify({type:'success',message:'修改成功'})
											chosenDaily.name=r;
										}
									})
								}else{
									$notify({type:'success',message:'无修改'})
								}
							}
						">
						<img draggable="false"  style="width:25px;line-height: 25px;vertical-align: middle;" src="../assets/img/edit.png"/>
					</span>
				</div>
				<div style="height:37px;margin-top:20px;">
					<span class="active" 
						style="font-size: 16px;height:33px;line-height: 33px;display: inline-block;
							text-align: center;min-width:85px;border: 1px solid #000000;cursor: pointer;"
						@click="dailyInfo=0;chosenDaily=null"	>
						关闭
					</span>
					<span class="active" 
						style="font-size: 16px;height:33px;line-height: 33px;display: inline-block;
							text-align: center;min-width:85px;border: 1px solid #000000;cursor: pointer;margin-left:20px;"
						@click="
							$dialog.confirm({message:'确认删除吗?'}).then(()=>{
								$axios.post('/recording/daily/delete-daily',$qs.stringify({dailyId:chosenDaily.dailyId})).then(res=>{
									if(res.data.codeMsg)
										$dialog.alert({message:res.data.codeMsg})
									if(res.data.code == 0){
										if(!res.data.codeMsg)
											$notify({type:'success',message:'删除成功'})
										dailies.splice(dailies.indexOf(chosenDaily),1)
										chosenDaily=null;
										dailyInfo=0;
									}
	
								})
							})
						">
						删除
					</span>
				</div>
			</div>
		</div>

		<div style="height:91px;position: absolute;bottom:0;left:0;right:0;background-color: #FFFFFF;box-shadow: 0px -1px 4px 0px #6b6b6b;">
			<div class="active" style="height:40px;text-align: center;cursor:pointer;position: relative;"
				@click="
					var r = window.prompt('请输入日常名称')
					if(r){
						$axios.post('/recording/daily/create-daily',$qs.stringify({name:r})).then(res=>{
							if(res.data.codeMsg)
								$dialog.alert({message:res.data.codeMsg})
							if(res.data.code == 0){
								if(!res.data.codeMsg)
									$notify({type:'success',message:'创建成功'})
								dailies.push({
									dailyId:res.data.data.dailyId,
									name:r,
									does:[],
								})
							}
						})
					}
				">
				<span style="font-size:16px;height:40px;line-height: 40px;font-weight: 900;display: inline-block;">
					新 日 常 +
				</span>
				<span  style="font-size:16px;height:40px;line-height: 40px;font-weight: 900;display: inline-block;position:absolute;left:5px;">
					{{ (23 - $store.state.now.hour() - 2) + ':' + (59 - $store.state.now.minute()) }}
				</span>
			</div>
			<div class="n1-line scrollbar1" style="height:50px;position: relative;border-top:1px solid #8F8F8F;overflow-x: auto;overflow: hidden;">
				<span  @click="$router.replace({path:'/index'})"
					style="line-height:50px;font-size:16px;width:16.7%;display:inline-block;text-align: center;
						background-color: #366CB3;color:#ffffff;cursor:pointer;vertical-align: middle;margin-left:-1px;">
					日 常
				</span>
				<span style="border-left:1px solid #366CB3;display:inline-block;line-height:15px;font-size: 16px;height:15px;vertical-align: middle;margin-left:-1px;">
				</span>
				<span  @click="$router.replace({path:'/tasks'})"
					style="line-height:50px;font-size:16px;width:16.7%;display:inline-block;text-align: center;cursor:pointer;vertical-align: middle;margin-left:-1px;">
					任 务
				</span>
				<span style="border-left:1px solid #808080;display:inline-block;line-height:15px;font-size: 16px;height:15px;vertical-align: middle;margin-left:-1px;">
				</span>
				<span   @click="$router.replace({path:'/memory'})"
					style="line-height:50px;font-size:16px;width:16.7%;display:inline-block;text-align: center;cursor:pointer;vertical-align: middle;margin-left:-1px;">
					记 忆
				</span>
				<span style="border-left:1px solid #808080;display:inline-block;line-height:15px;font-size: 16px;height:15px;vertical-align: middle;margin-left:-1px;"></span>
				<span  @click="$router.replace({path:'/friends'})"
					style="line-height:50px;font-size:16px;width:16.7%;display:inline-block;text-align: center;cursor:pointer;vertical-align: middle;margin-left:-1px;">
					好 友
				</span>
				<span style="border-left:1px solid #808080;display:inline-block;line-height:15px;font-size: 16px;height:15px;vertical-align: middle;margin-left:-1px;"></span>
				<span  style="line-height:50px;font-size:16px;width:16.7%;display:inline-block;text-align: center;cursor:pointer;vertical-align: middle;margin-left:-1px;">
					消 息
				</span>
				<span style="border-left:1px solid #808080;display:inline-block;line-height:15px;font-size: 16px;height:15px;vertical-align: middle;margin-left:-1px;"></span>
				<span style="width:16.7%;display:inline-block;line-height:50px;font-size: 16px;vertical-align: middle;margin-left:-1px;">
					&nbsp;
				</span>
				<span @click="$router.replace({path:'/me'})"
					style="line-height:50px;font-size:16px;width:16.7%;display:inline-block;text-align: center;cursor:pointer;position:absolute;right:0;
						vertical-align: middle;">
					我
				</span>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'daily',
		data() {
			return {
				query: null,
				fromDate:vue.$moment(),
				toDate:vue.$moment(),
				firstDate:null,
				days:[],
				dailies: null,
				scrollTop:null,
				scrollLeft:null,
				dailyInfo:0,
				chosenDaily:null,
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
				vue.$refs.scroll.scrollTop=vue.scrollTop
				vue.$refs.scroll.scrollLeft=vue.scrollLeft
			}
		},
		methods: {
			load() {
				
				let vue = this

				vue.$axios.get(
					'/recording/daily/first-date'
				).then(res=>{
					if(res.data.codeMsg)
						vue.$dialog.alert({message:res.data.codeMsg})
					if(res.data.code == 0){
						vue.firstDate=res.data.data.date?vue.$moment(res.data.data.date):null;

						var lastMonthDay = vue.$moment().subtract(1, 'month').set('date',1).subtract(1,'day');
						if(!vue.firstDate){
							vue.toDate = vue.fromDate;
						} else {
							if (vue.firstDate.valueOf() < lastMonthDay.valueOf()){
								vue.toDate = lastMonthDay;
							}else if (vue.firstDate.valueOf() > lastMonthDay.valueOf()){
								vue.toDate = vue.firstDate;
							}
						}
						vue.loadDailies()
					}
				})

				
			},
			loadDailies() {
				
				let vue = this
				vue.$axios.get(
					'/recording/daily/dailies?'+
					vue.$qs.stringify({
						fromDate:vue.fromDate.format('YYYY-MM-DD'),
						toDate:vue.toDate.format('YYYY-MM-DD')
					})
				).then(res=>{
					if(res.data.codeMsg)
						vue.$dialog.alert({message:res.data.codeMsg})
					if(res.data.code == 0){
						vue.dailies=vue.dailies?vue.dailies:[];
						vue.dailies.push(...res.data.data.items);
						var c =(vue.fromDate.valueOf() - vue.toDate.valueOf())/1000/60/60/24
						if(c == 0)
							vue.days.push(0)
						for (let i = 0; i < c; i++) {
							vue.days.push(vue.days.length)					
						}
					}
				})
			},
			scroll(event){
				
				let vue = this
				vue.scrollTop=event.target.scrollTop;
				vue.scrollLeft=event.target.scrollLeft;
				if((event.target.scrollTop+vue.$(event.target).height())>=event.target.scrollHeight) {
					
				}
				if((event.target.scrollLeft+vue.$(event.target).width())>=event.target.scrollWidth) {
					
				}
			},
			foo(daily,day){
				
				let vue = this
				if(daily.does && daily.does.length>0){
					for (let i = 0; i < daily.does.length; i++) {
						const item = daily.does[i];
						if(item.done &&
							vue.$moment(item.doneTime,'YYYY-MM-DD HH:mm:ss.SSS Z').format('M-D') 
							== 
							vue.$moment().set('date',vue.$moment().get('date')-day).format('M-D')
						){
							return 1
						}
					}
				}
				return 0
			}
		}
	}
</script>

<style scoped>
</style>