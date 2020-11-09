<template>
	<div id="daily" style="font-size: 0;position:absolute;top:0;bottom:0;right:0;left:0;">
		<div ref="scroll" style="overflow: auto;position:absolute;top:0;right:0;left:0;bottom:50px;" 
			@scroll="
				scrollLeft=$event.target.scrollLeft
				scrollTop=$event.target.scrollTop
			">
			<div
				style="height:30px;border-style:solid;border-color:#a1a1a1;border-width:0 0 1px 0;white-space: nowrap;
					white-space: nowrap;display: inline-block;position: relative;">
				<span class="hover active" 
					style="cursor: pointer;padding:0 5px;line-height: 30px;border-style:solid;border-color:#a1a1a1;
						border-width:0 1px 0 0;background-color: #FFFFFF;position:absolute;width:90px;height:30px;display:inline-block;font-size:16px;" 
						:style="{left:(scrollLeft+'px')}">
				</span>
				
				<span style="vertical-align: bottom;width:101px;height:30px;display:inline-block;">
				</span>

				<template v-for="i in days">
					<span :key="'a'+i" class="hover active" style="cursor: pointer;line-height: 30px;border-style:solid;border-color:#a1a1a1;border-width:0 1px 0 0;background-color: #FFFFFF;width:41px;padding:0 5px;height:30px;display:inline-block;font-size:16px;">
						{{$moment().set('date',$moment().get('date')-i).format('M-D')}}
					</span>
				</template>
			</div>
			<br/>
			<template v-for="(item,index) in dailies" >
				<div
					style="height:30px;border-style:solid;border-color:#a1a1a1;border-width:0 0 1px 0;white-space: nowrap;
						white-space: nowrap;display: inline-block;position: relative;">
					<span class="hover active" style="cursor: pointer;padding:0 5px;line-height: 30px;border-style:solid;border-color:#a1a1a1;border-width:0 1px 0 0;background-color: #FFFFFF;position:absolute;width:90px;height:30px;display:inline-block;font-size:16px;" :style="{left:(scrollLeft+'px')}">
						{{item.name}}
					</span>
					<span style="vertical-align: bottom;line-height: 30px;width:101px;height:30px;display:inline-block;">
						
					</span>
					<span v-for="(i,cindex) in days" :key="item.dailyId+'b'+i" class="hover active" style="cursor: pointer;line-height: 30px;border-style:solid;border-color:#a1a1a1;border-width:0 1px 0 0;background-color: #FFFFFF;width:41px;padding:0 5px;height:30px;display:inline-block;font-size:16px;"
						:style="{'background-color':foo(item,i)?'#008000':null}">
						
					</span>
				</div>
				<br/>
			</template>
			<div
				style="height:30px;border-style:solid;border-color:#a1a1a1;border-width:0 0 1px 0;white-space: nowrap;
					white-space: nowrap;display: inline-block;position: relative;">
				<span class="hover active" style="text-align: center;cursor: pointer;padding:0 5px;line-height: 30px;border-style:dashed;border-color:#a1a1a1;border-width:0 1px 1px 0;background-color: #FFFFFF;position:absolute;width:90px;height:30px;display:inline-block;font-size:16px;" :style="{left:(scrollLeft+'px')}">
					+
				</span>
			</div>
		</div>
		
		<div style="height:50px;position:absolute;bottom:0;left:0;right:0;background-color: #FFFFFF;box-shadow: 0px -1px 4px 0px #6b6b6b;">
			<div class="n1-line scrollbar1" style="height:50px;position: relative;overflow-x: auto;overflow: hidden;">
				<span  @click="$router.replace({path:'/index'})"
					style="line-height:50px;font-size:16px;width:16.7%;display:inline-block;text-align: center;cursor:pointer;vertical-align: middle;margin-left:-1px;">
					任 务
				</span>
				<span style="border-left:1px solid #366CB3;display:inline-block;line-height:15px;font-size: 16px;height:15px;vertical-align: middle;margin-left:-1px;"></span>
				<span  @click="$router.replace({path:'/daily'})"
					style="line-height:50px;font-size:16px;width:16.7%;display:inline-block;text-align: center;
						background-color: #366CB3;color:#ffffff;cursor:pointer;vertical-align: middle;margin-left:-1px;">
					日 常
				</span>
				<span style="border-left:1px solid #366CB3;display:inline-block;line-height:15px;font-size: 16px;height:15px;vertical-align: middle;margin-left:-1px;"></span>
				<span  style="line-height:50px;font-size:16px;width:16.7%;display:inline-block;text-align: center;cursor:pointer;vertical-align: middle;margin-left:-1px;">
					记 录
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
				days:[0,1,2,3],
				dailies: null,
				scrollTop:null,
				scrollLeft:null,
			}
		},
		activated() {
			debugger
			let vue = this
			window.vue=vue;
			// if (JSON.stringify(vue.query) != JSON.stringify(vue.$route.query)) {
			// 	if(vue.query)
			// 		Object.assign(vue.$data, vue.$options.data());
			// 	vue.query = vue.$route.query;
			// 	vue.load();
			// }else{
			// 	vue.$refs.scroll.scrollTop=vue.scrollTop
			// 	vue.$refs.scroll.scrollLeft=vue.scrollLeft
			// }
		},
		methods: {
			load() {
				debugger
				let vue = this

			},
			scroll(event){
				debugger
				let vue = this
				vue.scrollTop=event.target.scrollTop;
				if((event.target.scrollTop+vue.$(event.target).height())>=event.target.scrollHeight) {
					
				}
			},
			loadFriends(){
				debugger
				let vue = this
				vue.loading=1
				
			},
			foo(daily,i){
				debugger
				let vue = this
				daily.cc=daily.cc==null || daily.cc==undefined?0:daily.cc;
				if(daily.does && daily.does.length>daily.cc){
					if(daily.does[daily.cc].done){
						if(vue.$moment(daily.does[daily.cc].doneTime,'YYYY-MM-DD HH:mm:ss.SSS Z').format('M-D') == vue.$moment().set('date',vue.$moment().get('date')-i).format('M-D')){
							daily.cc++;
							return 1
						}
					}
					else {
						daily.cc++;
						return 0
					}
				}
				return 0
			}
		}
	}
</script>

<style scoped>
</style>