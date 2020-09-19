<!-- 歌手页第3页 -->
<template>
	<view class="singer1">
		<view class="bannerimg1">
			<image class="bannerimg" :src="info.imgurl" mode="" />
		</view>
		
		<view class="singer" v-for="(item,index) in songslist" :key="index">
			<navigator :url="'/pages/bofang/bofang?hash='+item.hash">
				<view class="gequ">
					{{(item.filename).slice(6)}}
				</view>
				<view class="author">
					{{(item.filename).slice(0,4)}}
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
				let stringLeft = string.substring(0, string.indexOf("{"));
				let stringRight = string.substring(string.indexOf("}") + 2);
				return stringLeft + stringRight;
				console.log(stringLeft + stringRight)
			},
		},
	}
</script>

<style>
	.singer1{margin-top: 1rem;margin-left: 1rem;margin-right: 1rem;}
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
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}
	
	/* .singer-img {
	    width: 100%;
	    background-size: cover;
	    position: relative;
	}
	.singer-img::after {
	    content: '';
	    display: block;
	    position: absolute;
	    top: 0;
	    right: 0;
	    bottom: 0;
	    left: 0;
	    background: rgba(0,0,0,.3);
	} */
</style>
