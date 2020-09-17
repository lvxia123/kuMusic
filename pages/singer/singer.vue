<!-- 歌手页第一页 -->
<template>
	<view class="">
		<view class="inv-h-w">
		    <view :class="['inv-h',Inv==0?'inv-h-se':'']" @click="Inv=0">新歌</view>
		    <!-- <view :class="['inv-h',Inv==1?'inv-h-se':'']" @click="Inv=1" @tap="gotoLunBo" >排行</view> -->
			<view :class="['inv-h',Inv==1?'inv-h-se':'']" @click="Inv=1">排行</view>
			<view :class="['inv-h',Inv==2?'inv-h-se':'']" @click="Inv=2">歌单</view>
			<view :class="['inv-h',Inv==3?'inv-h-se':'']" @click="Inv=3">歌手</view>
		</view>
		<view class="" v-show="Inv == 0">新歌页面</view>
		<view class="" v-show="Inv == 1">
			<navigator url="/pages/Ranking/Ranking">
				排行页面
			</navigator>
		</view>
		<view class="" v-show="Inv == 2">歌单页面</view>
		<view class="" v-show="Inv == 3">
			<view class="singer-list">
				<view class="singer" v-for="(item,index) in singers" :key="index">
					<navigator :url="'/pages/singer-songs/singer-songs?id='+ item.classid">
						<view class="singer-class-list">
							<view class="s_liebiao">
								{{item.classname}}
								<view class="singer-list-arrow"></view>
							</view>
						</view>
					</navigator>
				</view>		
			</view>
		</view>
		
		
		
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				singers:[],
				Inv:3
			}
		},
		methods: {
			getSingerInfo(){
				uni.request({
					url:"http://m.kugou.com/singer/class&json=true",  
					method:'get',
					header:{
					    'content-type':'application/x-www-form-urlencoded'
					},
					success:(res)=>{
						console.log(res);
						this.singers=res.data.list;
					}
				})	
			},
			changeTab(Inv){
			    that.navIdx = Inv;                              
			},
			// gotoLunBo(){
			//     uni.navigateTo({
			//         url:"/pages/Ranking/Ranking"
			
			//     })
			// }

		},
		onLoad(){
			this.getSingerInfo()
		},
	}
</script>

<style>
	.singer-list{margin-top: 30rpx;}
	.singer-class-list{
		margin: -0.4rem .7143rem 1.0714rem .7143rem !important;
		background: #fbfbfb;
		border: 1px solid #e4e4e4;
		border-radius: 5px;
		
	}
	.singer-class-list view:first-child {
	    border-top: none;
	}
	.singer-class-list view {
	    border-top: 1px solid #e4e4e4;
	}
	.s_liebiao {
	    padding: .7143rem;
		font-size: 0.9rem;
	}
	
	.inv-h-w{background-color: #FFFFFF;height: 100upx;display: flex;}
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
