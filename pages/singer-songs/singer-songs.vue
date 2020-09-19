<!-- 歌手页第2页 -->
<template>
	<view class="geshou1">
		<view v-for="(item,index) in songs" :key="index">
			<navigator class="geshou" :url="'/pages/songs-list/songs-list?id='+ item.singerid">
				<image :src="item.imgurl" mode="" />
				<view class="czjz">
					<view class="songtext">
						{{item.singername}}
					</view>
					<view class="goto">
						<image src="../../static/right.png" mode=""></image>
					</view>
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
				songs:[]
			}
		},
		onLoad: function (option) {
			const id=option.id*1;
			console.log(id,typeof(id));
			uni.request({
				url:'http://m.kugou.com/singer/list/'+id+'?json=true',
				success:(res)=>{
					console.log(res);
					let imglist=[];
					let images=res.data.singers.list.info;
					for(let i of images){
						let image=this.sublist(i.imgurl);
						imglist.push(image)
					}
					console.log(imglist);
					this.songs=res.data.singers.list.info;
					console.log(this.songs);
					for(let i=0;i<this.songs.length;i++){
						this.songs[i].imgurl=imglist[i];
						console.log(this.songs[i].imgurl)
					}
				}
			});	
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
	.geshou1{
		margin-top: 1rem ;
	}
	.geshou{
		height: 3.5rem;
		margin-top: 0.8rem ;
		margin-left: 1rem;
		margin-bottom: 0.8rem;
	}
	.kongge{border-bottom: 1px solid #CCCCCC;}
	.geshou image{
		width: 3.5rem;
		height: 3.5rem;
	}
	.czjz{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		margin-right: 0.8rem;
	}
	.geshou .songtext{
		display: block;
		font-size: 0.8rem;
		margin-left: 4rem;
		margin-top: -4.5rem;
	}
	
	.goto {
		width: 60rpx;
		height: 100rpx;
		display: block;
		margin-top: -2.5rem;
	}
	
	.goto>image {
		width: 100%;
		height: 50%;
		
	}
</style>
