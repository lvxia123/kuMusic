<template>
	<view>
		<view class="header">
			<image src="../../static/image/header.jpg"  mode=""></image>
			<view>
				<view class="tex">
					<text>潇潇</text>
					<view>
						<text class="alter">修改资料</text>
					</view>
				</view>
			</view>
		</view>
		<view class="collect">
		</view>
		<view class="song">
			<text>我创建的歌单</text>
			<text>+</text>
		</view>
		<view  class="songlist">
			<view class="red">
				<image src="../../static/image/heart.png" mode=""></image>
			</view>
			<view>
				<text>我的红心歌单</text> <br />
				<text>1首</text>
			</view>
		</view>
		<ToPlay></ToPlay>
		<!-- <lkaudio></lkaudio> -->
	</view>
</template>

<script>
	import ToPlay from "../../mycomponents/ToPlay/ToPlay.vue"
	// import lkaudio from "../../mycomponents/lkaudio/lkaudio.vue"
// import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
export default {
    components: {ToPlay}
}
</script>

<style>
	.header{
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 80px;
		line-height: 80px;
		font-size: 16px;
		align-items: center;
	}
	.header>image{
		width: 80px;
		height: 80px;
		padding-left: 20px;
	}
	.header>view{
		width: 300px;
		padding-left: 20px;
		font-weight: 600;
	}
    .alter{
	/* 	width: 80px;
		height: 30px; */
		width: 40%;
		height: 30px;
		background: #E5E5E5;
		line-height: 30px;
		text-align: center;
		font-weight: 400;
		padding: 4px;
		color: #666;
		font-size: 15px;
		border-radius: 20px 0 0 20px;
	}
	.header .tex{
		display: flex;
		justify-content: space-between;
		height: 80px;
		line-height: 80px;
	}
	.collect{
		background-image: url(../../static/image/music.jpg);
		background-repeat: no-repeat;
		width: 90%;
		height: 120px;
		border-radius:20px ;
	}
	.song,.songlist{
		display: flex;
		justify-content: space-between;
		height: 30px;
		line-height: 30px;
		padding: 20px;
		font-size: 16px;
		font-weight: 600;
	}
	.songlist{
		justify-content: space-around;
		align-items: center;
	}
	.red{
		width: 40%;
		height: 80px;
		background: #E5E5E5;
		line-height: 80px;
		text-align: center;
	}
	.red image{
		width: 22px;
		height: 22px;
	}
	
</style>
