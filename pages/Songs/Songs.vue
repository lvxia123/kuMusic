<template>
	<view style="overflow: hidden;">
			<!-- 上面的大binner -->
			<view class="bannerout">
				<image class=" banner" :src="info.banner_9" mode=""></image>
				<!--返回按钮 -->
				<view >
					<image class="lastimage" src="../../static/back.png" mode="" @click="back"></image>
					<view class="bannerrankname">{{info.rankname}}</view>
				</view>
				<view class="bannerbutton"></view>
			</view>
			<!-- 下面的音乐列表 -->
			<view @click="muics" class="songs" v-for="(i,k) in songs" :key="k">
				<view class="songsborder">
					<view class="songsid" :class="sstt[k]">{{k+1}}</view>
					<view class="songsfilename">{{i.filename}}</view>
					<!-- 下载按钮 -->
					<view class="download">
						<image src="../../static/download.png" mode=""></image>
					</view>
				</view>
			</view>
	
		</view>
</template>

<script>
	export default {
		data() {
			return {
				// 声明变量保存推荐数组
				info: {},
				songs: [],
				sstt: [
					"ss1",
					"ss2",
					"ss3",
				],
				style: ""
			}
		},
		onLoad(opthion) {
			console.log(opthion.rankid)
			let opthions = opthion.rankid * 1
			console.log(opthions)
			uni.request({
				url: `http://m.kugou.com/rank/info/?rankid=` + opthions + `&page=1&json=true`,
				success: (res) => {
					console.log(res);
					// console.log(res.data.info);
					res.data.info.album_img_9 = this.sublist(res.data.info.album_img_9);
					res.data.info.banner7url = this.sublist(res.data.info.banner7url);
					res.data.info.banner_9 = this.sublist(res.data.info.banner_9);
					res.data.info.bannerurl = this.sublist(res.data.info.bannerurl);
					res.data.info.imgurl = this.sublist(res.data.info.imgurl);
					// console.log(res.data.info);
					this.info = res.data.info;
					this.songs = res.data.songs.list;
					// console.log(this.info);
				},
			})
		},
		methods: {
			sublist(string) {
				let stringLeft = string.substring(0, string.indexOf("{"));
				let stringRight = string.substring(string.indexOf("}") + 2);
				return stringLeft + stringRight
			},
			back() {
				uni.navigateTo({
					url: "../Ranking/Ranking"
				})
			},
			muics(){
				uni.navigateTo({
					url: "../music/music"
				})
			}
		},
	}
</script>

<style>
	.bannerout{
		height: 580rpx;
		overflow: hidden;
		position: relative;
	}
	.banner {
		width: 100%;
		position: relative;
		height: 580rpx;
}
	.banner::before{
		content: '';
		display: block;
		position: absolute;
		width: 100%;
		height:400rpx;
		background-image: linear-gradient(top, rgba(0, 0, 0, 1), rgba(0, 0, 0,0));
	}
	.lastimage {
		position: absolute;
		width: 50rpx;
		height: 50rpx;
		top: 40rpx;
		left: 20rpx;
	}
	.bannerrankname {
		position: absolute;
		color: #FFFFFF;
		top: 40rpx;
		left: 130rpx;
		font-size: 1rem;
	}
	.songsborder {
		width: 95%;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-around;
		padding: 40rpx 0;
		border-bottom: 1px solid #dddd;
		margin: 10rpx 0;
		margin: 0 auto;
	}
	.songsid {
		flex: 1;
		text-align: center;
		margin-left: 10rpx;
		font-size: 0.9rem;
		align-self: center;
	}
	.songsfilename {
		flex: 11;
		font-size: 0.8rem;
		padding: 0rpx 30rpx;
		align-self: center;
	}
	.ss1,
	.ss2,
	.ss3 {
		border-radius: 50%;
		color: #ffff;
	}
	.ss1 {
		background: #e80000;
	}
	.ss2 {
		background: #ff7200;
	}
	.ss3 {
		background: #f8b300;
	}
	.download {
		flex: 1;
	}
	.download>image {
		width: 55rpx;
		height: 55rpx;
		align-self: center;
		text-align: end;
		margin-top: 10rpx;
	}
</style>
