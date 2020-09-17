<!-- 歌手页第三页 -->
<template>
	<view>
		<view class="singer" v-for="(item,index) in songslist" :key="index">
			<navigator :url="'/pages/bofang/bofang?id='+ item.album_id">
				<view class="">
					{{(item.filename).slice(6)}}
				</view>
				<view class="">
					{{(item.filename).slice(0,4)}}
				</view>
			</navigator>
			
		</view>		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				songslist:[]
			}
		},
		methods: {
			
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
				}
			})	
		},
	}
</script>

<style>

</style>
