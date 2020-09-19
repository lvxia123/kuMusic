<template>
	<view class="search">
		<uni-section title="音乐搜索" type="line"></uni-section>
		<view class="body">
			<uni-search-bar @confirm="search" @input="input" @cancel="cancel" />
			<!-- <view class="search-result">
				<text class="search-result-text" v-text="`当前搜索为:${searchVal}`"></text>
			</view> -->
		</view>
		<view class="hot">
			<uni-section title="热门搜索" type="line"></uni-section>
			<!-- <navigator  v-for="i in hotkeyword" url="https://activity.kugou.com/music-area/dist/#/mobile/home/35">
				<view >
					<text v-text="i.keyword"></text>
				</view>
			</navigator> -->
		</view>
		<view class="music">
			<uni-list v-for="i in song">
				<uni-list-item :title="i.filename" clickable @click="onClick(i)"></uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	// import uniCard from '@/components/uni-card/uni-card.vue'
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	import uniSection from '@/components/uni-section/uni-section.vue'
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	export default {
		components: {
			uniSearchBar,
			uniSection,
			// uniCard
		},
		data() {
			return {
				searchVal: '',
				song: [],
				hotkeyword: [],
			}
		},
		// onLoad() {
		// 	uni.request({
		// 		url: "http://mobilecdn.kugou.com/api/v3/search/hot?format=json&plat=0&count=30"
		// 	}).then(res => {
		// 		console.log(res)
		// 		this.hotkeyword = res[1].data.data.info
		// 	})
		// },
		methods: {
			async search(re) {
				uni.showToast({
					title: '搜索：' + re.value,
					icon: 'none'
				});
				let res = await this.$myReq({
					// methods: 'GET',
					// let keyword=re.value
					// url: "api/v3/search/song?format=json&keyword=%E7%8E%8B%E5%8A%9B%E5%AE%8F&page=1&pagesize=20&showtype=1",
					// let keyword = this.searchVal;
					url: "api/v3/search/song?format=json&keyword=" + this.searchVal + "&page=1&pagesize=20&showtype=1",
				})
				// console.log(res)
				this.song = res.data.data.info;
				console.log(this.song)
				console.log(this.searchVal)
			},
			input(res) {
				this.searchVal = res.value
			},
			cancel(res) {
				uni.showToast({
					title: '点击取消，输入值为：' + res.value,
					icon: 'none'
				})
			},
			onClick(res) {
				// uni.showToast({
				// 	title: '歌曲:'+res.filename
				// })
				uni.navigateTo({
					url: '/pages/music/music?hash=' + res.hash
					// url: '/pages/music/music'
				});
			}
		},
		onBackPress() {
			// #ifdef APP-PLUS
			plus.key.hideSoftKeybord();
			// #endif
		}
	}
</script>

<style>
	/* 头条小程序组件内不能引入字体 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		font-weight: normal;
		font-style: normal;
		src: url('~@/static/uni.ttf') format('truetype');
	}

	/* #endif */

	/* #ifndef APP-NVUE */
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4;
		min-height: 100%;
		height: auto;
	}

	view {
		font-size: 14px;
		line-height: inherit;
	}

	.search {
		background: #fff;
	}

	.container {
		padding: 0 15px 15px;
	}

	.info {
		padding: 15px;
		color: #3b4144;
		background: #ffffff;
	}

	.body {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14px;
		background-color: #ffffff;
	}

	/* #endif */
	.container {
		padding: 0 15px;
	}

	.info {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 15px;
		color: #3b4144;
		background-color: #ffffff;
		font-size: 14px;
		line-height: 20px;
	}

	.info-text {
		font-size: 14px;
		line-height: 20px;
		color: #3b4144;
	}


	.body {
		flex-direction: column;
		padding: 15px;
		background-color: #ffffff;
	}

	.word-btn-white {
		font-size: 18px;
		color: #FFFFFF;
	}

	.word-btn {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
		height: 48px;
		margin: 15px;
		background-color: #007AFF;
	}

	.word-btn--hover {
		background-color: #4ca2ff;
	}

	.search-result {
		margin-top: 10px;
		margin-bottom: 20px;
		text-align: center;
	}

	.search-result-text {
		text-align: center;
		font-size: 14px;
	}

	.body {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 0px;
	}

	.hot view {
		display: flex;
		flex-wrap: nowrap;
		background-color: #FFF;
		width: 100%;
		height: 30px;
		line-height: 30px;
		justify-content: center;
		/* 	text-align: center; */
	}

	.hotsearch {
		display: flex;
		margin-top: 10px;
		-webkit-box-orient: horizontal;
		-webkit-box-direction: normal;
		-webkit-flex-direction: row;
		flex-direction: row;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		padding: 0 10px;
		height: 50px;
		background-color: #f8f8f8;
		font-weight: normal;
	}
</style>
