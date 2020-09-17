<template>
	<view>
		<view>
			   <swiper class="swiper" circular="true" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
			                         <swiper-item>
			                             <view class="swiper-item uni-bg-red">
											 <image src="../../assets/banner.jpg" mode=""></image>
										</view>
			                         </swiper-item>
			                         <swiper-item>
			                             <view class="swiper-item uni-bg-green">
											 <image src="../../assets/bannar1.jpg" mode=""></image>
										 </view>
			                         </swiper-item>
			                         <swiper-item>
			                             <view class="swiper-item uni-bg-blue">
											 <image src="../../assets/bannar2.jpg" mode=""></image>
										 </view>
			                         </swiper-item>
									 <swiper-item>
										 <view class="swiper-item uni-bg-blue">
											 <image src="../../assets/bannar3.jpg" mode=""></image>
										 </view>
									 </swiper-item>
									 <swiper-item>
									 	<view class="swiper-item uni-bg-blue">
											<image src="../../assets/bannar4.jpg" mode=""></image>
									 	</view>
									 </swiper-item>
			   </swiper>
		</view>
		<view class="df">
			<view class="cell" v-for="(item,i) in list">
				<view>{{item.filename}}</view>
				<image style="width:20px; height: 20px;" src="../../assets/下载.png" mode=""></image>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				top:['推荐','排行','分类','歌手','MV'],
				list:[],
				background: ['color1', 'color2', 'color3','color4','color5'],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500
			}
		},
		
		onLoad() {
			let url1="http://mobilecdn.kugou.com/api/v3/search/song?format=json&keyword=新歌"
			uni.request({
				url:url1,
				success:(res)=>{
					let d=res.data;
					console.log(res.data.data.info)
					this.list=res.data.data.info
					console.log(this.list)
					
				}
			})
		}
		
	}
</script>

<style>
	.swiper swiper-item view image{
		width:100%;
	}
	.swiper swiper-item{
		margin:0 auto;
	}
	.cell image{
		padding-right:10px;
	}
	.cell{
		padding-top:20px;
		padding-bottom:20px;
		border-bottom:1px solid lightgray;
		display:flex;
		flex-direction:row;
		justify-content:space-between;
		padding-left:20px;
	}
	.cell view{
		font-size:14px;
	}
	.df{
		display:flex;
		flex-direction: column;
		justify-content: space-around;
	}
</style>
