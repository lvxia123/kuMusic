<template>
	<view class="container">
		<view class="bar">
			<view @click="playmusic">
				<image v-if="play" src="../../static/icon/play.png"></image>
				<image v-else src="../../static/icon/shop.png"></image>
			</view>
			<view class="song" @click="getsong">
				<!-- {{song}} -->
				<text>{{title}}</text>/
				<text>{{songer}}</text>
			</view>
			<view @click="collect">
				<image v-if="coll" src="../../static/image/heart-active.png"></image>
				<image v-else src="../../static/image/heart.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		// props: [ "songid" ],
		data() {
			return {
				play: false,
				song: '',
				songer: '',
				title: '',
				playing: false,
				coll: false
			}
		},
		mounted() {
			getsong: {
				uni.request({ 
					url: 'http://tingapi.ting.baidu.com/v1/restserver/ting?format=json&calback=&from=webapp_music&method=baidu.ting.song.play&songid=609012146'
				}).then(res => {
					console.log(res)
					this.song = res[1].data.bitrate.file_link;
					this.songer = res[1].data.songinfo.author;
					this.title = res[1].data.songinfo.title;
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
							// audioEle.loop = true;
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
			playmusic() {
				let {
					audioEle
				} = this.store.state;
				console.log(audioEle)
				if (this.play == false) {
					this.play = true
					audioEle.pause();
				} else {
					this.play = false;
					audioEle.play();
				}
			},
			collect(){
				if(this.coll){
					this.coll = false
				}else{
					this.coll = true
				}
			},
			// async getsong() {
			// 	let res = await this.$myReq({
			// 		// methods: 'GET',
			// 		url: "yy/index.php?r=play/getdata&hash=CB7EE97F4CC11C4EA7A1FA4B516A5D97",
			// 	})
			// 	console.log(res)
			// 	// this.song = res.data.play_url;
			// 	// console.log(this.song)
			// },
			onShow() {
				console.log(this.currentTime);
				//页面每次渲染完成
				// 取出状态管理器的audio实例
				let {
					audioEle
				} = this.store.state
			}
		},
	}
</script>

<style>
	.container {
		display: flex;
		justify-content: center;
	}

	.bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 20px;
		line-height: 20px;
		padding: 20px;
		font-size: 14px;
		font-weight: 600;
		position: fixed;
		bottom: 60px;
		width: 80%;
		height: 12px;
		line-height: 12px;
		background: #E5E5E5;
		border-radius: 20px;
		margin-top: 30px;
		margin-bottom: 30px;
		color: #666666;
	}

	.bar image {
		width: 22px;
		height: 22px;
	}
	.song{
		text-align: center;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
</style>
