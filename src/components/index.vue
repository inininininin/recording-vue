<template>
	<div id="index" style="height:100%;position:relative;">
		<div class="scrollbar" style="height:38px;line-height: 35px;white-space: nowrap;overflow-x: scroll;overflow-y: hidden;">
			<span style="cursor: pointer;height: 35px;line-height: 35px;display: inline-block;padding:0 5px;">
				<span style="font-size:14px;">时间</span>
				<span style="font-size:14px;">&nbsp;&and;</span>
			</span>
			<span style="font-size:14px;height: 35px;line-height: 35px;display: inline-block;border-left:1px solid #8F8F8F;">
				&#8207;
			</span>
			<span style="cursor: pointer;height: 35px;line-height: 35px;display: inline-block;padding:0 5px;">
				<span style="font-size:14px;">期限</span>
				<span style="font-size:14px;">&nbsp;&or;</span>
			</span>
			<span style="font-size:14px;height: 35px;line-height: 35px;display: inline-block;border-left:1px solid #8F8F8F;">
				&#8207;
			</span>
			<span style="font-size:14px;height: 35px;line-height: 35px;display: inline-block;cursor: pointer;vertical-align: top;">
				<select style="border:none;height: 35px;cursor: pointer;padding:0 5px;">
					<option>状态</option>
					<option>进行中</option>
					<option>已完成</option>
					<option>已撤销</option>
				</select>
			</span>
			<span style="font-size:14px;height: 35px;line-height: 35px;display: inline-block;border-left:1px solid #8F8F8F;">
				&#8207;
			</span>
			<span style="font-size:14px;height: 35px;line-height: 35px;display: inline-block;cursor: pointer;vertical-align: top;">
				<select style="border:none;height: 35px;cursor: pointer;padding:0 5px;">
					<option>类型</option>
					<option>推进</option>
					<option>缺陷</option>
				</select>
			</span>
			<span style="font-size:14px;height: 35px;line-height: 35px;display: inline-block;border-left:1px solid #8F8F8F;">
				&#8207;
			</span>
			<span style="font-size:14px;height: 35px;line-height: 35px;display: inline-block;position: relative;">
				<svg t="1591346902986" style="position: absolute;left:3px;top:10px;" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2627" width="15" height="15"><path d="M830.486464 796.124515 672.790943 638.42797c44.959904-52.799318 72.109099-121.232412 72.109099-196.016087 0-167.084182-135.448007-302.533214-302.53219-302.533214s-302.533214 135.449031-302.533214 302.533214 135.449031 302.53219 302.533214 302.53219c74.782651 0 143.215745-27.149196 196.017111-72.109099L796.101988 830.531518c9.499249 9.499249 24.885227 9.499249 34.384476 0S839.986737 805.623764 830.486464 796.124515zM442.366829 698.401131c-141.380814 0-255.989248-114.631985-255.989248-255.989248 0-141.403341 114.608434-255.989248 255.989248-255.989248 141.37979 0 255.989248 114.585907 255.989248 255.989248C698.356077 583.769146 583.747643 698.401131 442.366829 698.401131z" p-id="2628" fill="#8a8a8a"></path></svg>
				<input type="text" style="line-height: 35px;border:none;padding:0 3px 0 18px;width:80px;"
					@click="historyKwListPadShow=1"/>
			</span>
			<span style="font-size:14px;height: 35px;line-height: 35px;display: inline-block;border-left:1px solid #8F8F8F;">
				&#8207;
			</span>
			<span style="font-size:14px;cursor: pointer;height: 35px;line-height: 35px;display: inline-block;padding:0 5px;">
				搜索
			</span>
			<span style="font-size:14px;height: 35px;line-height: 35px;display: inline-block;border-left:1px solid #8F8F8F;">&#8207;</span>
			<span style="font-size:14px;cursor: pointer;height: 35px;line-height: 35px;display: inline-block;padding:0 5px;">
				重置
			</span>
			<span style="font-size:14px;height: 35px;line-height: 35px;display: inline-block;border-left:1px solid #8F8F8F;">
				&#8207;
			</span>

			<span style="margin-right:50px;font-size:14px;"></span>
			<span style="position: absolute;right:0px;height: 35px;background-color: #ffffff;">
				<span style="font-size:14px;height: 35px;line-height: 35px;display: inline-block;border-left:1px solid #8F8F8F;">
					&#8207;
				</span>
				<span style="text-align: center;font-weight: 900;font-size:14px;cursor: pointer;height: 35px;line-height: 35px;display: inline-block;padding:0 5px;">
					· · ·
				</span>
			</span>
		</div>

		<div class="scrollbar" style="height:38px;line-height: 35px;white-space: nowrap;overflow-x: scroll;overflow-y: hidden;">
			<span style="font-size:14px;cursor: pointer;height: 35px;line-height: 35px;display: inline-block;padding:0 5px;background-color: #d8d5d5;">
				发布人
			</span>
			<span style="font-size:14px;height: 35px;line-height: 35px;display: inline-block;border-left:1px solid #8F8F8F;">
				&#8207;
			</span>
			<span>
				<span style="font-size:14px;cursor: pointer;height: 35px;line-height: 35px;display: inline-block;padding:0 5px;min-width:25px;text-align: center;">
					我
				</span>
				<span style="font-size:14px;height: 35px;line-height: 35px;display: inline-block;border-left:1px solid #8F8F8F;">
					&#8207;
				</span>
			</span>
			<span style="margin-right:50px;font-size:14px;"></span>
			<span style="position: absolute;right:0px;height: 35px;background-color: #ffffff;">
				<span style="font-size:14px;height: 35px;line-height: 35px;display: inline-block;border-left:1px solid #8F8F8F;">
					&#8207;
				</span>
				<span style="text-align: center;font-weight: 900;font-size:14px;cursor: pointer;height: 35px;line-height: 35px;display: inline-block;padding:0 5px;">
					· · ·
				</span>
			</span>
		</div>

		<div class="scrollbar" style="height:38px;line-height: 35px;white-space: nowrap;overflow-x: scroll;overflow-y: hidden;">
			<span style="font-size:14px;cursor: pointer;height: 35px;line-height: 35px;display: inline-block;padding:0 5px;background-color: #d8d5d5;">
				负责人
			</span>
			<span style="font-size:14px;height: 35px;line-height: 35px;display: inline-block;border-left:1px solid #8F8F8F;">
				&#8207;
			</span>
			<span>
				<span style="font-size:14px;cursor: pointer;height: 35px;line-height: 35px;display: inline-block;padding:0 5px;min-width:25px;text-align: center;">
					我
				</span>
				<span style="font-size:14px;height: 35px;line-height: 35px;display: inline-block;border-left:1px solid #8F8F8F;">
					&#8207;
				</span>
			</span>
			<span style="margin-right:50px;font-size:14px;"></span>
			<span style="position: absolute;right:0px;height: 35px;background-color: #ffffff;">
				<span style="font-size:14px;height: 35px;line-height: 35px;display: inline-block;border-left:1px solid #8F8F8F;">
					&#8207;
				</span>
				<span style="text-align: center;font-weight: 900;font-size:14px;cursor: pointer;height: 35px;line-height: 35px;display: inline-block;padding:0 5px;">
					· · ·
				</span>
			</span>
		</div>

		<div class="scrollbar" style="padding:3px 0px 3px 5px;box-shadow: 0px 1px 1px 0px #888888;white-space: nowrap;overflow: auto;">
			<span style="font-size: 14px;color: #008000;font-weight: 600;">{{$moment($store.state.now).format('d, MM-DD, HH:mm:ss')}}</span>
			<span style="font-size: 14px;color: #8f8f8f;margin-left:15px;" >共 {{itemCount}} 条记录</span>
		</div>
		<div class="scrollbarNone"
			style="overflow: auto;width:100%;position: absolute;
			top: 144px;bottom: 89px;">
			<div style="border:1px solid #8f8f8f;margin:5px;padding:5px;cursor: pointer;">
				<div style="font-size: 16px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫</div>
				<div style="margin-top:3px;color:#8f8f8f;font-size: 14px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫</div>
				<div style="margin-top:3px;color:#8f8f8f;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
					<span style="font-size: 14px;">3, 06-10, 17:05</span>
					<span style="margin-left:15px;">
						<span style="font-size: 14px;display:inline-block;max-width:50px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: bottom;">我</span>
						<span style="font-size: 14px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: bottom;">&nbsp;>&nbsp;</span>
						<span style="font-size: 14px;display:inline-block;max-width:50px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: bottom;">查凌峰</span>
					</span>
					<span style="margin-left:15px;font-size: 14px;">日常</span>
					<span style="margin-left:15px;font-size: 14px;">限: 4, 06-11, 20, 23:59</span>
				</div>
			</div>
			
			<div style="border:1px solid #8f8f8f;margin:5px;padding:5px;cursor: pointer;">
				<div style="font-size: 16px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫</div>
				<div style="margin-top:3px;color:#8f8f8f;font-size: 14px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫</div>
				<div style="margin-top:3px;color:#8f8f8f;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
					<span style="font-size: 14px;">3, 06-10, 17:05</span>
					<span style="margin-left:15px;">
						<span style="font-size: 14px;display:inline-block;max-width:50px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: bottom;">我</span>
						<span style="font-size: 14px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: bottom;">&nbsp;>&nbsp;</span>
						<span style="font-size: 14px;display:inline-block;max-width:50px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: bottom;">查凌峰</span>
					</span>
					<span style="margin-left:15px;font-size: 14px;">日常</span>
					<span style="margin-left:15px;font-size: 14px;">限: 4, 06-11, 20, 23:59</span>
				</div>
			</div>

			<div style="border:1px solid #8f8f8f;margin:5px;padding:5px;cursor: pointer;">
				<div style="font-size: 16px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫</div>
				<div style="margin-top:3px;color:#8f8f8f;font-size: 14px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫</div>
				<div style="margin-top:3px;color:#8f8f8f;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
					<span style="font-size: 14px;">3, 06-10, 17:05</span>
					<span style="margin-left:15px;">
						<span style="font-size: 14px;display:inline-block;max-width:50px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: bottom;">我</span>
						<span style="font-size: 14px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: bottom;">&nbsp;>&nbsp;</span>
						<span style="font-size: 14px;display:inline-block;max-width:50px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: bottom;">查凌峰</span>
					</span>
					<span style="margin-left:15px;font-size: 14px;">日常</span>
					<span style="margin-left:15px;font-size: 14px;">限: 4, 06-11, 20, 23:59</span>
				</div>
			</div>

			<div style="border:1px solid #8f8f8f;margin:5px;padding:5px;cursor: pointer;">
				<div style="font-size: 16px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫</div>
				<div style="margin-top:3px;color:#8f8f8f;font-size: 14px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫</div>
				<div style="margin-top:3px;color:#8f8f8f;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
					<span style="font-size: 14px;">3, 06-10, 17:05</span>
					<span style="margin-left:15px;">
						<span style="font-size: 14px;display:inline-block;max-width:50px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: bottom;">我</span>
						<span style="font-size: 14px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: bottom;">&nbsp;>&nbsp;</span>
						<span style="font-size: 14px;display:inline-block;max-width:50px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: bottom;">查凌峰</span>
					</span>
					<span style="margin-left:15px;font-size: 14px;">日常</span>
					<span style="margin-left:15px;font-size: 14px;">限: 4, 06-11, 20, 23:59</span>
				</div>
			</div>

			<div style="border:1px solid #8f8f8f;margin:5px;padding:5px;cursor: pointer;">
				<div style="font-size: 16px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫</div>
				<div style="margin-top:3px;color:#8f8f8f;font-size: 14px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫</div>
				<div style="margin-top:3px;color:#8f8f8f;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
					<span style="font-size: 14px;">3, 06-10, 17:05</span>
					<span style="margin-left:15px;">
						<span style="font-size: 14px;display:inline-block;max-width:50px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: bottom;">我</span>
						<span style="font-size: 14px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: bottom;">&nbsp;>&nbsp;</span>
						<span style="font-size: 14px;display:inline-block;max-width:50px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: bottom;">查凌峰</span>
					</span>
					<span style="margin-left:15px;font-size: 14px;">日常</span>
					<span style="margin-left:15px;font-size: 14px;">限: 4, 06-11, 20, 23:59</span>
				</div>
			</div>

			<div style="border:1px solid #8f8f8f;margin:5px;padding:5px;cursor: pointer;">
				<div style="font-size: 16px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫</div>
				<div style="margin-top:3px;color:#8f8f8f;font-size: 14px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫</div>
				<div style="margin-top:3px;color:#8f8f8f;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
					<span style="font-size: 14px;">3, 06-10, 17:05</span>
					<span style="margin-left:15px;">
						<span style="font-size: 14px;display:inline-block;max-width:50px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: bottom;">我</span>
						<span style="font-size: 14px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: bottom;">&nbsp;>&nbsp;</span>
						<span style="font-size: 14px;display:inline-block;max-width:50px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: bottom;">查凌峰</span>
					</span>
					<span style="margin-left:15px;font-size: 14px;">日常</span>
					<span style="margin-left:15px;font-size: 14px;">限: 4, 06-11, 20, 23:59</span>
				</div>
			</div>

			<div style="border:1px solid #8f8f8f;margin:5px;padding:5px;cursor: pointer;">
				<div style="font-size: 16px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫</div>
				<div style="margin-top:3px;color:#8f8f8f;font-size: 14px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫</div>
				<div style="margin-top:3px;color:#8f8f8f;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
					<span style="font-size: 14px;">3, 06-10, 17:05</span>
					<span style="margin-left:15px;">
						<span style="font-size: 14px;display:inline-block;max-width:50px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: bottom;">我</span>
						<span style="font-size: 14px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: bottom;">&nbsp;>&nbsp;</span>
						<span style="font-size: 14px;display:inline-block;max-width:50px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: bottom;">查凌峰</span>
					</span>
					<span style="margin-left:15px;font-size: 14px;">日常</span>
					<span style="margin-left:15px;font-size: 14px;">限: 4, 06-11, 20, 23:59</span>
				</div>
			</div>

			<div style="border:1px solid #8f8f8f;margin:5px;padding:5px;cursor: pointer;">
				<div style="font-size: 16px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫</div>
				<div style="margin-top:3px;color:#8f8f8f;font-size: 14px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫</div>
				<div style="margin-top:3px;color:#8f8f8f;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
					<span style="font-size: 14px;">3, 06-10, 17:05</span>
					<span style="margin-left:15px;">
						<span style="font-size: 14px;display:inline-block;max-width:50px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: bottom;">我</span>
						<span style="font-size: 14px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: bottom;">&nbsp;>&nbsp;</span>
						<span style="font-size: 14px;display:inline-block;max-width:50px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: bottom;">查凌峰</span>
					</span>
					<span style="margin-left:15px;font-size: 14px;">日常</span>
					<span style="margin-left:15px;font-size: 14px;">限: 4, 06-11, 20, 23:59</span>
				</div>
			</div>

			<div style="border:1px solid #8f8f8f;margin:5px;padding:5px;cursor: pointer;">
				<div style="font-size: 16px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫</div>
				<div style="margin-top:3px;color:#8f8f8f;font-size: 14px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫</div>
				<div style="margin-top:3px;color:#8f8f8f;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
					<span style="font-size: 14px;">3, 06-10, 17:05</span>
					<span style="margin-left:15px;">
						<span style="font-size: 14px;display:inline-block;max-width:50px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: bottom;">我</span>
						<span style="font-size: 14px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: bottom;">&nbsp;>&nbsp;</span>
						<span style="font-size: 14px;display:inline-block;max-width:50px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: bottom;">查凌峰</span>
					</span>
					<span style="margin-left:15px;font-size: 14px;">日常</span>
					<span style="margin-left:15px;font-size: 14px;">限: 4, 06-11, 20, 23:59</span>
				</div>
			</div>

			<div style="border:1px solid #8f8f8f;margin:5px;padding:5px;cursor: pointer;">
				<div style="font-size: 16px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫</div>
				<div style="margin-top:3px;color:#8f8f8f;font-size: 14px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫阿斯蒂芬士大夫</div>
				<div style="margin-top:3px;color:#8f8f8f;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
					<span style="font-size: 14px;">3, 06-10, 17:05</span>
					<span style="margin-left:15px;">
						<span style="font-size: 14px;display:inline-block;max-width:50px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: bottom;">我</span>
						<span style="font-size: 14px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: bottom;">&nbsp;>&nbsp;</span>
						<span style="font-size: 14px;display:inline-block;max-width:50px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: bottom;">查凌峰</span>
					</span>
					<span style="margin-left:15px;font-size: 14px;">日常</span>
					<span style="margin-left:15px;font-size: 14px;">限: 4, 06-11, 20, 23:59</span>
				</div>
			</div>
		</div>

		<div 
			style="position: absolute;bottom: 0;left: 0px;right: 0px;
			background-color: rgb(255, 255, 255);box-shadow: rgb(136, 136, 136) 0px 0px 1px 0px;border-top: 1px solid #afaeae;">
			<div style="height:35px;">
				<span style="line-height:35px;height:35px;text-align: center;cursor: pointer;font-weight: 900;font-size: 14px;width:50%;display: inline-block;"
					@click="$router.push({path:'/create-task',query:{time:new Date().getTime()+''}})">
					发任务 +
				</span>
				<span style="position: absolute;font-size:14px;height: 35px;line-height: 35px;display: inline-block;border-left:1px solid #8F8F8F;">
					&#8207;
				</span>
				<span style="line-height:35px;height:35px;text-align: center;cursor: pointer;font-weight: 900;font-size: 14px;width:50%;display: inline-block;">
					去记录 +
				</span>
			</div>
			<div style="height: 50px;line-height: 50px;position: relative;border-top:1px solid #8F8F8F;">
				<span 
					style="display: inline-block;font-size: 14px;width: 20%;text-align: center;
					cursor: pointer;background-color: rgb(255, 127, 8);"
					@click="$router.replace({path:'/index',query:{time:new Date().getTime()+''}})">
					任务
				</span>
				<span style="position: absolute;font-size:14px;height: 50px;line-height: 50px;display: inline-block;border-left:1px solid #8F8F8F;">
					&#8207;
				</span>
				<span 
					style="display: inline-block;font-size: 14px;width: 20%;text-align: center;
					cursor: pointer;">
					记录
				</span>
				<span style="position: absolute;font-size:14px;height: 50px;line-height: 50px;display: inline-block;border-left:1px solid #8F8F8F;">
					&#8207;
				</span>
				<span 
					style="display: inline-block;font-size: 14px;width: 20%;text-align: center;
					cursor: pointer;"
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
		

		<div v-if="historyKwListPadShow" 
			@click="
			if($event.currentTarget==$event.target) {
				historyKwListPadShow=0;
			}"
			style="width: 100%;position: absolute;top: 35px;bottom: 0px;background-color: rgba(0, 0, 0, 0.53);">
			<div style="min-height: 100px;padding:0 10px 10px 10px;background-color:#ffffff;border-top:1px solid #8f8f8f;">
				<span style="margin: 10px 15px 0px 0px;height:30px;display: inline-block;background-color: rgb(229, 229, 229);cursor: pointer;">
					<span style="max-width:100px;height:30px;line-height:30px;font-size: 14px;display: inline-block;background-color: rgb(229, 229, 229);overflow: hidden;text-overflow: ellipsis;white-space: nowrap;padding: 0 10px 0 5px;">
						撒地方沙发
					</span>
					<span style="font-size: 14px;height:28px;line-height:28px;display: inline-block; padding: 0 2px; vertical-align: bottom; background-color: rgb(255, 255, 255); color: rgb(143, 143, 143); border: 1px solid rgb(229, 229, 229);">
						X
					</span>
				</span>
				<span style="margin: 10px 15px 0px 0px;height:30px;display: inline-block;background-color: rgb(229, 229, 229);cursor: pointer;">
					<span style="max-width:100px;height:30px;line-height:30px;font-size: 14px;display: inline-block;background-color: rgb(229, 229, 229);overflow: hidden;text-overflow: ellipsis;white-space: nowrap;padding: 0 10px 0 5px;">
						撒地方沙发
					</span>
					<span style="font-size: 14px;height:28px;line-height:28px;display: inline-block; padding: 0 2px; vertical-align: bottom; background-color: rgb(255, 255, 255); color: rgb(143, 143, 143); border: 1px solid rgb(229, 229, 229);">
						X
					</span>
				</span>
				<span style="margin: 10px 15px 0px 0px;height:30px;display: inline-block;background-color: rgb(229, 229, 229);cursor: pointer;">
					<span style="max-width:100px;height:30px;line-height:30px;font-size: 14px;display: inline-block;background-color: rgb(229, 229, 229);overflow: hidden;text-overflow: ellipsis;white-space: nowrap;padding: 0 10px 0 5px;">
						撒地方沙发
					</span>
					<span style="font-size: 14px;height:28px;line-height:28px;display: inline-block; padding: 0 2px; vertical-align: bottom; background-color: rgb(255, 255, 255); color: rgb(143, 143, 143); border: 1px solid rgb(229, 229, 229);">
						X
					</span>
				</span>
				<span style="margin: 10px 15px 0px 0px;height:30px;display: inline-block;background-color: rgb(229, 229, 229);cursor: pointer;">
					<span style="max-width:100px;height:30px;line-height:30px;font-size: 14px;display: inline-block;background-color: rgb(229, 229, 229);overflow: hidden;text-overflow: ellipsis;white-space: nowrap;padding: 0 10px 0 5px;">
						撒地方沙发
					</span>
					<span style="font-size: 14px;height:28px;line-height:28px;display: inline-block; padding: 0 2px; vertical-align: bottom; background-color: rgb(255, 255, 255); color: rgb(143, 143, 143); border: 1px solid rgb(229, 229, 229);">
						X
					</span>
				</span>
				<span style="margin: 10px 15px 0px 0px;height:30px;display: inline-block;background-color: rgb(229, 229, 229);cursor: pointer;">
					<span style="max-width:100px;height:30px;line-height:30px;font-size: 14px;display: inline-block;background-color: rgb(229, 229, 229);overflow: hidden;text-overflow: ellipsis;white-space: nowrap;padding: 0 10px 0 5px;">
						撒地方沙发
					</span>
					<span style="font-size: 14px;height:28px;line-height:28px;display: inline-block; padding: 0 2px; vertical-align: bottom; background-color: rgb(255, 255, 255); color: rgb(143, 143, 143); border: 1px solid rgb(229, 229, 229);">
						X
					</span>
				</span>
				<span style="margin: 10px 15px 0px 0px;height:30px;display: inline-block;background-color: rgb(229, 229, 229);cursor: pointer;">
					<span style="max-width:100px;height:30px;line-height:30px;font-size: 14px;display: inline-block;background-color: rgb(229, 229, 229);overflow: hidden;text-overflow: ellipsis;white-space: nowrap;padding: 0 10px 0 5px;">
						撒地方沙发
					</span>
					<span style="font-size: 14px;height:28px;line-height:28px;display: inline-block; padding: 0 2px; vertical-align: bottom; background-color: rgb(255, 255, 255); color: rgb(143, 143, 143); border: 1px solid rgb(229, 229, 229);">
						X
					</span>
				</span>
				<span style="margin: 10px 15px 0px 0px;height:30px;display: inline-block;background-color: rgb(229, 229, 229);cursor: pointer;">
					<span style="max-width:100px;height:30px;line-height:30px;font-size: 14px;display: inline-block;background-color: rgb(229, 229, 229);overflow: hidden;text-overflow: ellipsis;white-space: nowrap;padding: 0 10px 0 5px;">
						撒地方沙发
					</span>
					<span style="font-size: 14px;height:28px;line-height:28px;display: inline-block; padding: 0 2px; vertical-align: bottom; background-color: rgb(255, 255, 255); color: rgb(143, 143, 143); border: 1px solid rgb(229, 229, 229);">
						X
					</span>
				</span>
				<div style="text-align: center;margin-top: 10px;">
					<span style="padding:0 10px;height:26px;line-height:26px;display:inline-block;font-size: 14px;cursor: pointer;text-align: center;color: #8f8f8f;border: 1px dashed #8f8f8f;">清空历史记录 X</span>
				</div>
				<div style="display:none;margin-top: 10px;text-align: center;">
					<span style="padding:0 10px;height:26px;line-height:26px;font-size: 14px;cursor: pointer;text-align: center;color: #8f8f8f;">暂无历史记录</span>
				</div>
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
				lookedTask:null,
				historyKwListPadShow:0,
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
				thisVue.$refs.taskList.scrollTop=thisVue.scrollTop

				if(thisVue.lookedTask){
					thisVue.$axios.get(`/my-task/task?taskId=${thisVue.lookedTask.taskId}`).then(res => {
							if(res.data.code==0){
								let o =res.data.data;
								thisVue.lookedTask.name=o.name;
								thisVue.lookedTask.finalTime=o.finalTime;
								thisVue.lookedTask.autoRedoTomorrowIs=o.autoRedoTomorrowIs;
								thisVue.lookedTask.faBuRenUserId=o.faBuRenUserId;
								thisVue.lookedTask.faBuRenUserNickname=o.faBuRenUserNickname;
								thisVue.lookedTask.fuZeRenUserId=o.fuZeRenUserId;
								thisVue.lookedTask.fuZeRenUserNickname=o.fuZeRenUserNickname;
								thisVue.lookedTask.lastTaskTrackId=o.lastTaskTrackId;
								thisVue.lookedTask.lastTaskTrackContent=o.lastTaskTrackContent;
								thisVue.lookedTask.lastTaskTrackCreateTime=o.lastTaskTrackCreateTime;
								thisVue.lookedTask.completeIs=o.completeIs;
								thisVue.lookedTask.cancelIs=o.cancelIs;
								thisVue.lookedTask.orderNo=o.orderNo;
							}else if (res.data.code==1404){
								thisVue.itemCount--;
								thisVue.taskList.splice(thisVue.taskList.indexOf(thisVue.lookedTask),1)
							}
						})
				}
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

				thisVue.queryHistoryPad=0;thisVue.loadTaskList()


				thisVue.$axios.get('/my-task/my-faburen-list?'+thisVue.$qs.stringify({})).then(res => {
					debugger
					if (res.data.code == 0) {
						if(res.data.data.itemList.length>0)
							thisVue.faBuRenList=thisVue.faBuRenList.concat(res.data.data.itemList)
					}
				})

				thisVue.$axios.get('/my-task/my-fuzeren-list?'+thisVue.$qs.stringify({})).then(res => {
					debugger
					if (res.data.code == 0) {
						if(res.data.data.itemList.length>0)
							thisVue.fuZeRenList=thisVue.fuZeRenList.concat(res.data.data.itemList)
					}
				})

				

			},
			taskListScroll(event){
				debugger
				let thisVue = this
				thisVue.scrollTop=event.target.scrollTop;
				if((event.target.scrollTop+thisVue.$(event.target).height())>=event.target.scrollHeight) {
					thisVue.pn++;
					thisVue.queryHistoryPad=0;thisVue.loadTaskList()
				}
			},
			loadTaskList:_.debounce(function(){
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
					sorts=['orderNoHas','orderNo','autoRedoTomorrowIs','createTime','name']
					orders=['desc','asc','desc','desc','asc']
				}

				thisVue.itemCount =null;
				if(thisVue.status==1){
					thisVue.completeIs=thisVue.cancelIs=0
				}else if(thisVue.status==2){
					thisVue.completeIs=1
					thisVue.cancelIs=null
				}else if(thisVue.status==3){
					thisVue.completeIs=null
					thisVue.cancelIs=1
				}else{
					thisVue.completeIs=null
					thisVue.cancelIs=null
				}
				
				let autoRedoTomorrowIs=thisVue.autoRedoTomorrowIs==1?'':thisVue.autoRedoTomorrowIs==2?1:thisVue.autoRedoTomorrowIs==3?0:'';

				if(thisVue.kw && thisVue.queryHistoryKwList.indexOf(thisVue.kw)==-1){
					thisVue.queryHistoryKwList.splice(0,0,thisVue.kw)
					if(thisVue.$store.state.login){
						thisVue.$axios.post('/cache/set',thisVue.$qs.stringify({name:'queryHistoryKwList-'+thisVue.$store.state.login.userId,value:thisVue.queryHistoryKwList.join()}))
					}
				}

				thisVue.$axios.get('/my-task/task-list?'+thisVue.$qs.stringify({autoRedoTomorrowIs:autoRedoTomorrowIs,fuZeRenUserId:thisVue.fuZeRenUserId,faBuRenUserId:thisVue.faBuRenUserId,kw:thisVue.kw,cancelIs:thisVue.cancelIs,completeIs:thisVue.completeIs,type:thisVue.type,sort:sorts.join(),order:orders.join(),pn:thisVue.pn,ps:thisVue.ps})).then(res => {
					debugger
					if (res.data.code == 0) {
						if(res.data.data.itemList.length>0){
							if(thisVue.pn==1)
								thisVue.taskList=[]
							thisVue.taskList=thisVue.taskList.concat(res.data.data.itemList)
						}else
							thisVue.pn--;
					}
					thisVue.loading=0
				})
				thisVue.$axios.get('/my-task/task-list-sum?'+thisVue.$qs.stringify({autoRedoTomorrowIs:autoRedoTomorrowIs,fuZeRenUserId:thisVue.fuZeRenUserId,faBuRenUserId:thisVue.faBuRenUserId,kw:thisVue.kw,cancelIs:thisVue.cancelIs,completeIs:thisVue.completeIs,type:thisVue.type,pn:thisVue.pn,ps:thisVue.ps})).then(res => {
					debugger
					if (res.data.code == 0) {
						thisVue.itemCount=res.data.data.itemCount
					}
				})
			},300),
		}
	}
</script>
<style scoped>

.scrollbarNone::-webkit-scrollbar {
  display: none;
}

.scrollbar::-webkit-scrollbar{
	height:3px;
	/* border-radius: 5px; */
}
.scrollbar::-webkit-scrollbar-track{
	background-color:#8F8F8F;
	/* border-radius: 5px; */
}
.scrollbar::-webkit-scrollbar-thumb{
	background-color:#000000;
	/* border-radius: 5px; */
}
.scrollbar::-webkit-scrollbar-thumb:hover {
	background-color:#000000;
	/* border-radius: 5px; */
}
.scrollbar::-webkit-scrollbar-thumb:active {
	background-color:#000000;
	/* border-radius: 5px; */
}

.active:active {
	background-color: #cccccc!important;
}
.visited:visited {
	background-color: #cccccc!important;
}
</style>