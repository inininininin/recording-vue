<template>
	<div id="index" style="font-size: 0;position:absolute;top:0;bottom:0;right:0;left:0;">
		<div style="height: 30px;border-bottom:1px solid #8f8f8f;overflow: hidden;box-shadow: rgb(107, 107, 107) 0px 0px 4px 0px;">
			<span style="width:211px;line-height: 30px;height: 30px;font-size: 16px;display:inline-block;border-right:1px solid #8f8f8f;position: relative;">
				<svg t="1591346902986" style="position: absolute;left:5px;top:8px;width:15px;height:15px;" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2627" width="15" height="15"><path d="M830.486464 796.124515 672.790943 638.42797c44.959904-52.799318 72.109099-121.232412 72.109099-196.016087 0-167.084182-135.448007-302.533214-302.53219-302.533214s-302.533214 135.449031-302.533214 302.533214 135.449031 302.53219 302.533214 302.53219c74.782651 0 143.215745-27.149196 196.017111-72.109099L796.101988 830.531518c9.499249 9.499249 24.885227 9.499249 34.384476 0S839.986737 805.623764 830.486464 796.124515zM442.366829 698.401131c-141.380814 0-255.989248-114.631985-255.989248-255.989248 0-141.403341 114.608434-255.989248 255.989248-255.989248 141.37979 0 255.989248 114.585907 255.989248 255.989248C698.356077 583.769146 583.747643 698.401131 442.366829 698.401131z" p-id="2628" fill="#8a8a8a"></path></svg>
				<input v-model="kw" type="text" 
					style="border-radius: 0px;line-height: 30px;height:30px;width:159px;display:inline-block;border:none;margin-left:20px;padding:0;"
					@focus="
						if(queryHistory.kws)
							return;
						queryHistory.kws=[];
						queryHistory.start=1;
						if($store.state.login){
							$axios.get(`/recording/cache/get?name=${'memory-queryHistory-kws-'+$store.state.login.userId}`)
								.then(res=>{
									if(res.data.code == 0)
										if(res.data.data.value)
											queryHistory.kws=res.data.data.value.split(',');
								})
						}
					" 
					@click="queryHistory.start=1;"
					@keyup.enter="pn=1;books=[];queryHistory.start=0;loadBooks();" 
				/>
				<span v-if="kw" style="font-size: 16px;cursor: pointer;color: #6b6b6b;position: absolute;right:0px;top:0px;width: 20px;text-align: center;" 
					@click="kw=null;">
					X
				</span>
			</span>
			 <span class="active" @click="pn=1;books=[];queryHistory.start=0;loadBooks();"
				style="width: 33px;line-height: 30px;padding:0 5px;font-size: 16px;cursor: pointer;display:inline-block;border-right:1px solid #8f8f8f;">
				搜索
			</span>
			<span class="active"  
				@click="sort=order=status=kw=null,type=status='',pn=1;books=[];queryHistory.start=0;loadBooks()" 
				style="width: 33px;line-height: 30px;padding:0 5px;font-size: 16px;cursor: pointer;display:inline-block;
					border-right:1px solid #8f8f8f;">
				重置
			</span> 
		</div>
		<div class="scrollbar" @scroll="scroll($event)" ref="books" 
			style="overflow: auto;width:100%;position: absolute;top: 33px;bottom: 91px;-webkit-overflow-scrolling: touch;">
			<div :key="item.bookId" v-for="item in books" class="active visited hover"
				@click="
					debugger;
					//$($event.currentTarget).css('background-color','#e6e4e4');
					$store.state.chosenMemoryBook=item;
					$router.push({path:'/memory-book',query:{bookId:item.bookId}})
				" 
				style="padding: 5px 20px 5px 5px;cursor:pointer;position: relative;" 
				:style="{'background-color':(item.status==2?'#ffe063':item.status==3?'#d5d5d5':'#FFFFFF')}">
				<div style="font-size:16px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;" 
					v-html="item.name?$highlight(item.name,kw).split('\n')[0]:null">
				</div>    
				<span v-if="item.orderNo" 
					style="font-size:12px;color:#ff0000;position:absolute;right:5px;bottom: 3px;width:14px;text-align: right;
						overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
					{{item.orderNo}}
				</span>
			</div>
			<div v-if="loading"  style="font-size:14px;text-align: center;color:#6b6b6b;margin-bottom:10px;margin-top: 10px;">
				加载中
			</div>
			<div class="active unselectable" v-if="!loading && books && books.length<$o(booksSum).attr('count')" @click="pn++;queryHistory.start=0;loadBooks();" 
				style="font-size:14px;text-align: center;color:#6b6b6b;margin-bottom:10px;margin-top: 10px;cursor: pointer;">
				点击加载更多
			</div>
			<div  v-if="!loading && books && books.length>0 && !(books.length<$o(booksSum).attr('count'))" style="font-size:14px;text-align: center;color:#6b6b6b;margin-bottom:10px;margin-top: 10px;">
				已全部加载
			</div>
			<div  v-if="!loading && (!books || books.length==0)" style="font-size:14px;text-align: center;color:#6b6b6b;margin-bottom:10px;margin-top: 10px;">
				暂无数据
			</div>
		</div>
		<div style="height:91px;position: absolute;bottom:0;left:0;right:0;background-color: #FFFFFF;box-shadow: 0px -1px 4px 0px #6b6b6b;">
			<div class="active" style="font-size:16px;height:40px;line-height: 40px;text-align: center;cursor:pointer;font-weight: 900;"
				@click="
					var r = window.prompt('请输入名称')
					if(r){
						$axios.post('/recording/my-memory/create-book',$qs.stringify({name:r})).then(res=>{
							if(res.data.code == 0){
								if(!res.data.codeMsg)
									$notify({type:'success',message:'创建成功'})
								var bookId=res.data.data.bookId
								books=books?books:[];
								var book={
									bookId:bookId,
									name:r
								}
								$store.state.chosenMemoryBook=book;
								books.unshift(book)
								booksSum.count++
							}else{
								if(res.data.codeMsg)
									$dialog.alert({message:res.data.codeMsg})
							}
						})
					}
				">
				记 忆 单 +
			</div>
			<div class="n1-line scrollbar1" style="height:50px;position: relative;border-top:1px solid #8F8F8F;overflow-x: auto;overflow: hidden;">
				<span @click="$router.replace({path:'/index'})"
					style="line-height:50px;font-size:16px;width:16.7%;display:inline-block;text-align: center;cursor:pointer;
						vertical-align: middle;margin-left:-1px;">
					日 常
				</span>
				<span style="border-left:1px solid #808080;display:inline-block;line-height:15px;font-size: 16px;height:15px;vertical-align: middle;margin-left:-1px;">
				</span>
				<span @click="$router.replace({path:'/tasks'})"
					style="line-height:50px;font-size:16px;width:16.7%;display:inline-block;text-align: center;cursor:pointer;
						vertical-align: middle;margin-left:-1px;">
					任 务
				</span>
				<span style="border-left:1px solid #366CB3;display:inline-block;line-height:15px;font-size: 16px;height:15px;vertical-align: middle;margin-left:-1px;">
				</span>
				<span @click="$router.replace({path:'/memory'})"
					style="line-height:50px;font-size:16px;width:16.7%;display:inline-block;text-align: center;cursor:pointer;
						background-color: #366CB3;color:#ffffff;vertical-align: middle;margin-left:-1px;">
					记 忆
				</span>
				<span style="border-left:1px solid #366CB3;display:inline-block;line-height:15px;font-size: 16px;height:15px;vertical-align: middle;margin-left:-1px;"></span>
				<span @click="$router.replace({path:'/friends'})"
					style="line-height:50px;font-size:16px;width:16.7%;display:inline-block;text-align: center;cursor:pointer;vertical-align: middle;margin-left:-1px;">
					好 友
				</span>
				<span style="border-left:1px solid #808080;display:inline-block;line-height:15px;font-size: 16px;height:15px;vertical-align: middle;margin-left:-1px;"></span>
				<span style="line-height:50px;font-size:16px;width:16.7%;display:inline-block;text-align: center;cursor:pointer;vertical-align: middle;margin-left:-1px;">
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

		<!-- 搜索历史 -->
		<div v-if="queryHistory.start" 
			@click="
				if($event.currentTarget==$event.target) {
					queryHistory.start=0;
				}
			" 
			style="position: absolute;top:31px;bottom:0;width:100%;background-color: rgba(0, 0, 0, 0.6);z-index: 100;">
			<div style="background-color: #ffffff;padding:0 10px 10px 10px;min-height:100px;">
				<span v-for="(item,index) in queryHistory.kws" :key="index"
					style="margin:10px 15px 0 0;display: inline-block;background-color: #e5e5e5;cursor: pointer;">
					<span 
						@click="
							kw=item;
							pn=1;books=[];queryHistory.start=0;loadBooks();
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
								$axios.post('/recording/cache/set',$qs.stringify({name:'queryHistory.kws-'+$store.state.login.userId,value:queryHistory.kws.join()}))
							}
						"
						style="
							font-size: 16px;display: inline-block;padding:5px;padding: 5px 0px;
							vertical-align: bottom;background-color: #ffffff;color: #6b6b6b;border: 1px solid #e5e5e5;
						">
						X
					</span>
				</span>
				<div style="font-size: 16px;visibility: hidden;">1</div>
				<div v-if="queryHistory.kws && queryHistory.kws.length>0" 
					@click="
						queryHistory.kws=[];
						if($store.state.login){
							$axios.post('/recording/cache/set',$qs.stringify({name:'queryHistory.kws-'+$store.state.login.userId,value:queryHistory.kws.join()}))
						}
					"
					style="
						font-size: 16px;cursor: pointer;text-align: center;margin-top:10px;color:#6b6b6b;border:1px dashed #8f8f8f;
						padding: 5px;width: 120px;margin: auto;
					">
					清空历史记录
				</div>
				<div v-if="!queryHistory.kws || queryHistory.kws.length==0" 
					style="font-size: 16px;text-align: center;margin-top:10px;color:#6b6b6b;">暂无历史记录</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'index',
		data() {
			return {
				query: null,
				kw:null,
				books:null,
				currBooks:null,
				booksSum:null,
				pn:null,
				ps:null,
				loading:null,
				scrollTop:null,
				sort:null,
				order:null,
				queryHistory:{
					start:null,
					kws:null
				}
			}
		},
		activated() {
			debugger
			let vue = this
			window.vue=vue;
			if (JSON.stringify(vue.query) != JSON.stringify(vue.$route.query)) {
				Object.assign(vue.$data, vue.$options.data());
				vue.query = vue.$route.query;
				vue.load();
			}else{
				debugger
				vue.$refs.books.scrollTop=vue.scrollTop
				if(vue.$store.state.chosenMemoryBookDel){
					vue.booksSum.count--;
					if(vue.$store.state.chosenMemoryBook)
						vue.books.splice(vue.books.indexOf(vue.$store.state.chosenMemoryBook),1)
				}
			}
			vue.$store.state.chosenMemoryBook=null
			vue.$store.state.chosenMemoryBookDel=null
		},
		methods: {
			load() {
				debugger
				let vue = this

				vue.queryHistory.start=0;
				vue.loadBooks()

			},
			scroll(event){
				debugger
				let vue = this
				vue.scrollTop=event.target.scrollTop;
				console.log(event.target.scrollTop + ' ' +vue.$(event.target).height()+' '+event.target.scrollHeight)
				if((event.target.scrollTop+vue.$(event.target).height())>=event.target.scrollHeight) {
					console.log('scroll at bottom')
					if(vue.currBooks && vue.currBooks.length < vue.ps){
						console.log('return')
						return;
					}
					vue.pn++;
					vue.queryHistory.start=0;
					vue.loadBooks()
				}
			},
			loadBooks(){
				debugger
				let vue = this
				vue.loading=1
				vue.pn=vue.pn?vue.pn:1;
				vue.ps=vue.ps?vue.ps:15;

				vue.booksSum = null;

				if(vue.kw && vue.queryHistory.kws.indexOf(vue.kw)==-1){
					vue.queryHistory.kws.splice(0,0,vue.kw)
					if(vue.$store.state.login){
						vue.$axios.post('/recording/cache/set',vue.$qs.stringify({name:'memory-queryHistory-kws-'+vue.$store.state.login.userId,value:vue.queryHistory.kws.join()}))
					}
				}

				var param = {
					kw:vue.kw,
					pn:vue.pn,
					ps:vue.ps
				}
				vue.$axios.get('/recording/my-memory/books?' + vue.$qs.stringify(param)).then(res => {
					debugger
					if (res.data.code == 0) {
						if(res.data.data.items.length>0){
							if(vue.pn==1)
								vue.books=[]
							vue.books=vue.books.concat(res.data.data.items)
							vue.currBooks=res.data.data.items
						}else
							vue.pn--;
					} else {
						if(res.data.codeMsg)
							vue.$dialog.alert({ message: res.data.codeMsg });
					}
					vue.loading=0
				})
				vue.$axios.get('/recording/my-memory/books-sum?' + vue.$qs.stringify(param)).then(res => {
					debugger
					if (res.data.code == 0) {
						vue.booksSum=res.data.data
					} else {
						if(res.data.codeMsg)
							vue.$dialog.alert({ message: res.data.codeMsg });
					}
				})
			},
		}
	}
</script>

<style scoped>
</style>