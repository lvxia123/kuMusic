<!-- 歌手页第3页 -->
<template>
	<view class="singer1">
		<view class="bannerimg1">
			<image class="bannerimg" :src="info.imgurl" mode="" />
			<view class="xinxi">
				<view class="singername">
					{{info.singername}}
				</view>
				<view class="guanzhu">
					关注
				</view>
				<view class="tingguo">
					2.8亿人听过
				</view>
			</view>
		</view>
		
		<view class="singer" v-for="(item,index) in songslist" :key="index">
			<!-- <navigator :url="'/pages/bofang/bofang?hash='+item.hash"> -->
			<navigator url="/pages/music/music">
				<view class="gequ">
					{{(item.remark)}}
				</view>
				<view class="author">
					{{(item.filename).slice(0,3)}}
				</view>
			</navigator>
			<view class="kongge"></view>
		</view>		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				songslist:[],
				info:{}
			}
		},
		onLoad: function (option) {
			const id=option.id*1;
			console.log(id,typeof(id));
			uni.request({
				url:'http://m.kugou.com/singer/info/'+id+'?json=true',
				success:(res)=>{
					console.log(res);
					this.songslist=res.data.songs.list;
					console.log(this.songslist);
					res.data.info.imgurl = this.sublist(res.data.info.imgurl);
					this.info=res.data.info;
					
				}
			})	
		},
		methods: {
			sublist(string) {
				const size=400*1;
				let stringLeft = string.substring(0, string.indexOf("{"));
				let stringRight = string.substring(string.indexOf("}") + 1);
				return stringLeft +size+ stringRight;
				console.log(stringLeft +size+ stringRight)
			},
		},
	}
</script>

<style>
	.singer1{margin-top: 0rem;margin-left: 0rem;margin-right: 0rem;}
	.singer{margin-top: 0rem;margin-left: 0.5rem;margin-right: 0.5rem;}
	.gequ{font-size: 0.9rem;margin-top: 0.7rem;}
	.author{color: #CCCCCC;font-size: 0.7rem;margin-bottom: 0.7rem;}
	.kongge{border-bottom: 1px solid #CCCCCC;}
	.bannerimg1{
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}
	.bannerimg{
		width: 100%;
	}
	.xinxi{
		position: relative;
		left: 0.5rem;
		color: #fff;
		
	}
	.singername{
		position: absolute;
		bottom: 10rem;
		font-size: 1.3rem;
	}
	.guanzhu{
		width: 2rem;
		position: absolute;
		bottom: 8rem;
		font-size: .6875rem;
		border: 1px solid rgba(255,255,255,.6);
		border-radius: .8rem;
		background: rgba(0,0,0,.3);
		text-align: center;
	}
	.tingguo{
		position: absolute;
		bottom: 1rem;
		font-size: .6875rem;
	}
</style>
