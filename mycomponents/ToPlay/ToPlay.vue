<template>
	<view class="container">
		<view class="bar">
			<view @click="playmusic">
				<image v-if="play" src="../../static/icon/play.png"></image>
				<image v-else src="../../static/icon/shop.png"></image>
			</view>
			<view @click="getsong">
				<!-- {{song}} -->
				<text>歌名</text>/
				<text>歌手</text>
			</view>
			<text>❤</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				play: false,
				song: '',
				playing: false
			}
		},
		onLoad() {
	//实例化 音频对象
			if(this.store.state.audioEle === '') {
				//就实例化音乐
				this.store.commit('setAudioEle',uni.createInnerAudioContext());
					let {audioEle} = this.store.state;
						if (!this.store.state.musicOn) { //如果当前没有音乐在播放的时候
							audioEle.autoplay = true;
							// console.log(this.song)
							audioEle.src = this.song;
							audioEle.loop = true;
							//监听音乐进入播放的状态获取时长
							audioEle.onCanplay(() => {
								//获取当前音乐的总时长
								this.store.commit('setSongLen',audioEle.duration)
							})
							audioEle.onTimeUpdate(() => {
								//获取当前的播放时间，存到vuex中
								// this.currentTime = audioEle.currentTime;
								this.store.commit('setCurrentTime',audioEle.currentTime)
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
			
						
			//实例化 音频对象
			// const audioEle = uni.createInnerAudioContext();
			// audioEle.autoplay = true;
			// audioEle.src = 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.mp3';
			// audioEle.onPlay(() => {
			//   console.log('开始播放');
			// });
			// audioEle.onError((res) => {
			//   console.log(res.errMsg);
			//   console.log(res.errCode);
			// });
		},
		methods: {
			playmusic() {
			
				if (this.play == false) {
					audioEle.pause();
					
				} else {
					this.play = false;
					audioEle.play();
				}
			},
			async getsong() {
				let res = await this.$myReq({
					// methods: 'GET',
					url: "v1/restserver/ting?format=json&calback=&from=webapp_music&method=baidu.ting.song.play&songid=73896409",
				})
				console.log(res)
				this.song = res.data.bitrate.file_link;
				console.log(this.song)
			},
			
			// ,getsong(){
			// 	uni.request({
			// 	    url: 'http://tingapi.ting.baidu.com/v1/restserver/ting?format=json&calback=&from=webapp_music&method=baidu.ting.song.play&songid=73896409', 
			// 	    success: (res) => {
			// 	        console.log(res);
			// 	        // this.text = res.data.list;
			// 	    }
			// 	});
			// }
		},
		created(){
			this.getsong()
		}
		
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
		margin: 30px;
	}

	.bar>view>image {
		width: 22px;
		height: 22px;
	}
</style>
