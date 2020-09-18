<template>
	<!-- 外面的view -->
	<view>
		<view v-for="(i,k) in recommend" :key="k">
			<view class="list" @click="turto(i.rankid)">
				<!-- 左边的音乐列表 -->
				<view class="listpictrue">
					<image :src="i.banner_9" mode=""></image>
				</view>
				<!-- 右边的音乐列表 -->
				<view class="listtitle ">{{i.rankname}}</view>
				<view class="goto">
					<image src="../../static/right.png" mode=""></image>
				</view>
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
				recommend: []
			}
		},
		onLoad() {
			// 请求排行数据
		
				uni.request({
					url: "http://m.kugou.com/rank/list&json=true",
					success: (res) => {
						let list=[]
						let images = res.data.rank.list;
						// console.log(datas)
						for (let i of images) {
							// console.log(i.banner_9)
							let image = this.sublist(i.banner_9)
							// console.log(typeof(image))
							// console.log(image)
							list.push(image)
						}
						console.log(list)
						this.recommend = res.data.rank.list;
						console.log(this.recommend)
						for(let i=0;i<this.recommend.length;i++){
							this.recommend[i].banner_9=list[i]
							console.log(this.recommend[i].banner_9)
						}

					}
				})
		},
		methods: {
			turto(index) {
				console.log(index)
				uni.navigateTo({
					url: `../Songs/Songs?rankid=${index}`
				})
			},
			// 切割图片字符串
			sublist(string) {
				let stringLeft = string.substring(0, string.indexOf("{"));
				let stringRight = string.substring(string.indexOf("}") + 2);
				return stringLeft + stringRight
			},
		},
		created() {
	
		}
	}
</script>

<style>
	.list {
		height: 200rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		flex-direction: row;
		border-bottom: 1px solid #DDDDDD;
		margin-right: 20rpx;
		padding: 20rpx 15rpx;
	}

	.listpictrue {
		flex: 1;
	}

	.listpictrue>image {
		width: 100%;
		height: 100%;
	}

	.listtitle {
		flex: 2;
		font-size: 30rpx;
		color: #333;
		align-self: center;
		padding-left: 30rpx;
	}

	.goto {
		flex: 1;
		width: 60rpx;
		height: 100rpx;
		align-self: center;
		text-align: end;
		margin-top: 55rpx;
	}

	.goto>image {
		width: 25%;
		height: 30%;
	}
</style>
