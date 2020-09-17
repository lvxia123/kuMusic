<template>
	<!-- 外面的view -->
   <view>
		 <view  v-for="i in recommend">
			 <navigator class="list" url="/pages/Songs/Songs?id={i.rankid}" open-type="navigate">
				 <!-- 左边的音乐列表 -->
				 	<view class="listpictrue"><image  :src="i.album_img_9" mode=""></image></view>
				 	<!-- 右边的音乐列表 -->
				 	<view class="listtitle ">{{i.rankname}}</view>
				 	<view class="goto"><image src="../../static/right.png" mode=""></image></view>
			</navigator>
			 </view>
		 </view>
	 </view>
</template>

<script>
  export default {

    data() {
      return {
       // 声明变量保存推荐数组
			 recommend:[]
      }
    },
    onLoad() {
			
    },
    methods: {
			// 请求排行数据
			getRanking(){
				uni.request({
					url:"http://m.kugou.com/rank/list&json=true",
					success:(res)=>{
						console.log(res);
						this.recommend=res.data.rank.list;
						console.log(res.data.rank.list)
					}
				})
			}
    },
		created() {
			this.getRanking()
		}
  }
</script>

<style>
	.list{
		height: 200rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		flex-direction: row;
		border-bottom: 1px solid #DDDDDD;
		margin: 0 20rpx;
	}
	.listpictrue{
	flex: 1;
	width: 150rpx;
	margin-right: 20rpx;
	/* height: 380rpx; */
	}
	.listpictrue>image{
		width:100%;
		height: 100%;
	}
	.listtitle{
		flex: 2;
		font-size: 30rpx;
		color: #333;
		align-self: center;
	}
	.goto{
		flex: 1;
		width: 60rpx;
		height: 100rpx;
		align-self: center;
		text-align: end;
		margin-top: 55rpx;
	}
	.goto>image{
		width: 25%;
		height: 30%; 
	}
</style>
