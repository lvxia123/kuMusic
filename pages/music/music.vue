<template>
	<view class="song">
		<image :src="bgimage" mode="" class="bg-set"></image>
		<!-- 歌曲页面状态栏,点击之后返回上一页 -->
		<view class="songStatusBar" @click="navigatorBack">
			<image src="../../static/icon/arrow-down.png" mode=""></image>
		</view>
		<!-- 歌曲页背景文字区域 -->
		<view class="songContent">
			<text class="albumName-title">{{songName}}</text>
			<text class="singer">{{singer}}</text>
		</view>
		<view class="process">
			<slider backgroundColor="#D3D3D3" activeColor="#DD524D" :value="this.store.state.currentTime" min="0" :max="this.store.state.songLength"
			 @change="sliderChange" block-size="12"></slider>
		</view>
		<!-- 底部播放框-->
		<view class="playBox">
			<input type="range" value="" class="process" />
			<view class="playControl">
				<image src="../../static/icon/loop.png" mode="widthFix"></image>
				<image src="../../static/icon/prev.png" mode="widthFix" @click="prevSong"></image>
				<image :src="this.store.state.musicOn?'../../static/icon/pause-outline-filled.png':'../../static/icon/play-filled.png'"
				 mode="widthFix" @click="startPlay"></image>
				<image src="../../static/icon/next.png" mode="widthFix" @click="nextSong"></image>
				<image src="../../static/icon/time.png" mode="widthFix"></image>
			</view>
			<view class="more">
				<view class="downLoad">
					<image src="../../static/icon/download.png" mode=""></image>
					<text>下载</text>
				</view>
				<view class="collect">
					<image src="../../static/icon/collection.png" mode=""></image>
					<text>收藏</text>
				</view>
				<view class="share">
					<image src="../../static/icon/partager.png" mode=""></image>
					<text>分享</text>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bgimage: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600345477286&di=361c69316b02afe3d2460bb3144648e9&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201405%2F31%2F124814kg76m5xeenbax6qn.jpg',
				singer: null,
				song: '',
				isPlay: true,
				audioEle: '',
				currentTime: 0,
				songName: '',
				newVal: '',
				current:{},
			}
		},
		// created() {
		onLoad: function (options) {
			getsong: {
				uni.request({
						url: 'http://tingapi.ting.baidu.com/v1/restserver/ting?format=json&calback=&from=webapp_music&method=baidu.ting.song.play&songid=73896409',
						// url: 'http://tingapi.ting.baidu.com/v1/restserver/ting?format=json&calback=&from=webapp_music&method=baidu.ting.song.play&songid='+options.songid
					}).then(res => {
					console.log(res)
					this.song = res[1].data.bitrate.file_link;
					this.songName = res[1].data.songinfo.album_title;
					this.singer = res[1].data.songinfo.author;
					
					if (this.store.state.audioEle === '') {
						//就实例化音乐
						this.store.commit('setAudioEle', uni.createInnerAudioContext());
						let {
							audioEle
						} = this.store.state;
						if (!this.store.state.musicOn) { //如果当前没有音乐在播放的时候
							audioEle.autoplay = true;
							console.log(this.song)
							audioEle.src = this.song;
							audioEle.loop = true;
							//监听音乐进入播放的状态获取时长
							audioEle.onCanplay(() => {
								//获取当前音乐的总时长
								this.store.commit('setSongLen', audioEle.duration)
							})
							audioEle.onTimeUpdate(() => {
								//获取当前的播放时间，存到vuex中
								// this.currentTime = audioEle.currentTime;
								this.store.commit('setCurrentTime', audioEle.currentTime)
							});
							// 当音乐播放的时候
							audioEle.onPlay(() => {
								this.store.commit('setMusicOn', true);
							});
							// 当音乐暂停的时候
							audioEle.onPause(() => {
								this.store.commit('setMusicOn', false)
							})
						}
					}
				})
			}
		},
		methods: {
			sliderChange(e) {
				// console.log(e.target.value)
				// 获取拖住事件的值,然后尝试赋值给音乐的当前时长,改变进度条
				let value = e.target.value;
				//从vuex中取出这个音乐的实例化对象
				let {
					audioEle
				} = this.store.state;
				//当用户改变进度条的value值的时候，就动态操作音乐的播放进度
				audioEle.currentTime = value
			},
			//点击获取上一个歌曲
			prevSong() {
				console.log('切换上一个歌曲')
			},
			nextSong() {
				console.log('切换下一个歌曲')
			},
			navigatorBack() {
				uni.navigateBack()
			},
			startPlay() {
				let {
					audioEle
				} = this.store.state;
				this.isPlay = !this.isPlay;
				//若全局有音乐在播放，点击事件就应该让他停止
				if (this.store.state.musicOn) {
					audioEle.pause();
				} else {
					// 否则就让他播放
					console.log(audioEle)
					audioEle.play();
				}
				this.store.state.musicOn = !this.store.state.musicOn
			}
		},
		onShow() {
			console.log(this.currentTime);
			//页面每次渲染完成
			// 取出状态管理器的audio实例
			let {
				audioEle
			} = this.store.state
			//获取当前实例的播放位置，赋值给进度条的value
			console.log(audioEle.currentTime)
			this.newVal = audioEle.currentTime

		},

	}
</script>

<style>
	.playBox .more {
		width: 750rpx;
		display: flex;
		flex-wrap: nowrap;
		justify-content: center;
	}

	.playBox .more>view {
		margin-top: 50rpx;
		width: 50rpx;
		height: 50rpx;

		font-size: 12rpx;
	}

	.playBox .more>view>image {
		width: 100%;
		height: 100%;
	}

	.playBox .more>view:nth-child(2) {
		margin-left: 70rpx;
		margin-right: 70rpx;
	}

	.playControl {
		margin-top: 45rpx;
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-around;
	}

	.playControl>image {
		width: 50rpx;
		height: 50rpx;
	}

	.playControl>image:nth-child(3) {
		width: 150rpx;
		height: 150rpx;
	}

	.playControl>image:not(:nth-child(3)) {
		margin-top: 60rpx;
	}

	.playBox {
		width: 750rpx;
		height: 40%;
		position: absolute;
		bottom: 0;
		background-color: transparent;
	}

	.songContent {
		margin: 28% 90rpx;
	}

	.albumName-title {
		font-size: 70rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap
	}

	.albumName,
	.singer {
		font-size: 25rpx;
	}

	.songContent>text {
		display: block;
		padding-bottom: 15rpx;
	}

	page {
		color: #FFFFFF;
	}

	.song {
		box-sizing: border-box;
		padding-top: 90rpx;
	}

	.songStatusBar {
		width: 60rpx;
		height: 60rpx;
		margin-left: 90rpx;
	}

	.songStatusBar>image {
		width: 100%;
		height: 100%;
	}

	.bg-set {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: -1;
	}
</style>
