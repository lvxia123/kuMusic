<template>
	<view>
		<view class="view2">
			<view class="view1">
				<ul class='ul1'>
					<li>首页</li>
					<li>榜单</li>
					<li>下载客户端</li>
					<li>更多</li>
				</ul>
			</view> 
			<view>
				
			</view>
		</view>
		<view style="background-color:whitesmoke;height:40px;" class="view1"></view>
		<view class="view1 view3">
			<view class="def">
				<input class="inp3" placeholder="海底椰" type="text" v-model="a">
				<image @click="sub" style="width:30px; height:30px;" src="../../assets/search.png" mode=""></image>
			</view>
		</view>
		<view style="background-color:whitesmoke;height:25px;" class="view1"></view>
		<view class="singer">
			<ul>
				<li @click='song' :class="{click:clk==1}">单曲</li>
				<li @click="List" :class="{click:clk==2}">歌单</li>
				<li @click="MV" :class="{click:clk==3}">MV</li>
			</ul>
		</view>
		<view v-if="clk==1">
			<view style="width:100%;height:20px">
				
			</view>
			<text class="tx">
				随机搜索推荐歌曲
			</text>
			<view class="flx1">
				<view>歌曲名</view>
				<view class="flex2">
					<view>专辑</view>
					<view>时长</view>
				</view>
			</view>
			<view class="flx1" v-for="(item,key) in list" style="border-bottom:1px solid lightgray;">
				<view style="font-size:14px; padding:10px 10px; display:flex;" >
					<view style="width:10px; height:10px; border:1px solid gray; margin:4px; border-radius:2px;"></view>
					<view>
						{{item.songname}}
					</view>
				</view>
				<view class="flex2">
					<view style="font-size:4px; padding:10px 10px;">{{item.album_name}}</view>
					<view style="font-size:14px; padding:10px 10px;">{{item.duration|formaData}}</view>
				</view>
			</view>
		</view>
		<view v-if="clk==2">
			<view class="fflx">
				<view>歌单名</view>
				<view>创建人</view>
				<view>收藏</view>
			</view>
		
				<view>
					<view v-for="(item,index) in list" :key="index" class="it" style="border-bottom: 1px solid gray;">
						<view style="display:flex; justify-content: space-between; width:270px;">
							 <view style="font-size: 14px; padding:10px 10px;">
							 	{{item.songname}}
							 </view>
							 <view style="display:flex; justify-content:space-between; width:100px;font-size:14px;">
								 <view style="padding:10px 10px;">
									 {{item.singername}}
								 </view>
							 </view>
						</view>
						<view style="padding:10px 10px; font-size: 14px;">
							{{item.duration}}
						</view>
					</view>
				</view>
			
			
		</view>
		<view v-if="clk==3">
			3
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				clk:1,
				list:[],
				list1:[],
				a:''
			}
		},
		onLoad() {
			let b=[]
			let url='http://mobilecdn.kugou.com/api/v3/search/song?format=json&keyword=单曲'
			let url1='http://m.kugou.com/rank/info/?rankid=8888&page=1&json=true'
			uni.request({
				url:url,
				success:(res)=>{
					//console.log(res.data.data.info)
					this.list=res.data.data.info 
				}
			})
			uni.request({
				url:url1,
				success:res=> {
					// this.list1.push(res.data)
					b.push(res.data)
					this.list1=b
					
					console.log(this.list1)
				}
			})
		},
		filters:{
			formaData(data){
				const minute=Math.floor(data/60)
				const second=data%60
				
				return minute+":"+second
			}
		},
		methods:{ 
			song(){
				this.clk=1
			},
			List(){
				this.clk=2
			},
			MV(){
				this.clk=3
			},
			sub(){
				let b=[]
				let url='http://mobilecdn.kugou.com/api/v3/search/song?format=json&keyword='+this.a
				let url1='http://m.kugou.com/rank/info/?rankid=8888&page=1&json=true'
				uni.request({
					url:url,
					success:(res)=>{
						//console.log(res.data.data.info)
						this.list=res.data.data.info 
					}
				})
				uni.request({
					url:url1,
					success:res=> {
						// this.list1.push(res.data)
						b.push(res.data)
						this.list1=b
						
						console.log(this.list1.info)
					}
				})
			}
		}
	}
	
</script>

<style>
	.it{
		display:flex;
		justify-content:space-between;
	}
	.items{
		background-color: red;
		width: 750rpx;
		height: 100rpx;
	}
	.fflx{
		display:flex;
		flex-direction:row;
		justify-content: space-between;
		
		background-color:whitesmoke;
	}
	.fflx view{
		padding:10px 10px;
		font-size:15px;
	}
	.flex2{
		width:30%;
		display:flex;
		justify-content:space-between;
	}
	
	.flx1{
		
		display:flex;
		justify-content:space-between;
	}
	.tx{
		margin-top:10px;
		padding-bottom:10px;
		font-size:16px;
		color:gray;
	}
	.click{
		color:deepskyblue;
		border-bottom:2px solid deepskyblue;
	}
	.singer ul {
		list-style:none;
		display:flex;
		 padding:0;
	}
	.singer ul li{
		margin-left:5px;
		padding:10px;
	}
	.def image{
		background-color:white;
		
	}
	.def{
		display:flex;
		width:60%;
		margin:0 auto;
	}
	.inp3{
		margin:0;
		padding:5px 5px;
		padding-right:35px;
		font-size:15px;
	}
	.view3{
		background-color:whitesmoke;
		
	}
	.view3 view input{
		width:70%;
		margin:0 auto;
		background-color:white;
		
		border-radius:3px;
	}
	.view2{
		background-color: #000000;
	}
	.view1{
		width:100%;
		
		
	}
	.ul1{
		display:flex;
		list-style:none;
		margin:0;
		padding:10px 10px;
		font-size:11px;
		width:50%;
		justify-content:space-between;
		color:white;
	}
</style>
