<template>
	<view>
		<!-- 思彤新增头部选项卡开始 -->
		<view class="inv-h-w">
		    <view :class="['inv-h',Inv==0?'inv-h-se':'']" @click="Inv=0"  @tap="goNewSongs">新歌</view>
			<view :class="['inv-h',Inv==1?'inv-h-se':'']" @click="Inv=1" @tap="gotoRank" >排行</view>
			<!-- <view :class="['inv-h',Inv==2?'inv-h-se':'']" @click="Inv=2">歌单</view> -->
			<view :class="['inv-h',Inv==2?'inv-h-se':'']" @click="Inv=2" @tap="gotoSinger">歌手</view>
		</view>
		<!-- <view class="" v-show="Inv == 2">歌单页面</view> -->
		<!-- 思彤新增头部选项卡结束-->
		<view>
			<swiper class="swiper" circular="true" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
			 :duration="duration">
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
			<view class="cell" v-for="(item,i) in list" @click="send(item.filename)">
				<view>{{item.filename}}</view>
				<image style="width:20px; height: 20px;" src="../../assets/下载.png" mode=""></image>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				top: ['推荐', '排行', '分类', '歌手', 'MV'],
				list: [],
				background: ['color1', 'color2', 'color3', 'color4', 'color5'],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				//思彤新增：选项卡默认页面为新歌页
				Inv:0
			}
		},
		methods: {
			send(item) {

				let url = '../index/index?singername' + item
				uni.navigateTo({
					url: "/pages/bofang/bofang"
				})
			},
			//思彤新增以下4个点击事件：实现点击选项卡跳转至相应页面
			changeTab(Inv){
			    that.navIdx = Inv;                              
			},
			goNewSongs(){
			    uni.navigateTo({
			        url:"/pages/index/index"
			
			    })
			},
			gotoRank(){
			    uni.navigateTo({
			        url:"/pages/Ranking/Ranking"
			
			    })
			},
			gotoSinger(){
			    uni.navigateTo({
			        url:"/pages/singer/singer"
			
			    })
			},
			
		},
		onLoad() {
			let url1 = "http://mobilecdn.kugou.com/api/v3/search/song?format=json&keyword=新歌"
			uni.request({
				url: url1,
				success: (res) => {
					let d = res.data;
					console.log(res.data.data.info)
					this.list = res.data.data.info
					console.log(this.list)

				}
			})
		}

	}
</script>

<style>
	.swiper swiper-item view image {
		width: 100%;
	}

	.swiper swiper-item {
		margin: 0 auto;
	}

	.cell image {
		padding-right: 10px;
	}

	.cell {
		padding-top: 20px;
		padding-bottom: 20px;
		border-bottom: 1px solid lightgray;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding-left: 20px;
	}

	.cell view {
		font-size: 14px;
	}

	.df {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	/* 思彤新增以下样式：关于头部选项卡*/
	.inv-h-w{background-color: #FFFFFF;height: 100upx;display: flex;margin-bottom: 0.5rem;}
	.inv-h{font-size: 1rem;flex: 1;text-align: center;color: #000;height: 100upx;line-height: 100upx;}
	.inv-h-se{color: #5BA7FF;border-bottom: 2px solid #5BA7FF;}
	.singer-list-arrow {
	    width: .57143rem;
	    height: 1rem;
	    margin-top: .2rem;
	    background: url(../../static/images/arrow_icon.png) no-repeat;
	    background-size: 100%;
	    float: right;
	    display: block;
	}
</style>
