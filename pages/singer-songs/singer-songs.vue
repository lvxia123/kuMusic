<template>
	<view>
		<view class="" v-for="(item,index) in songs" :key="index">
			<navigator :url="'/pages/songs-list/songs-list?id='+ item.singerid">
				{{item.singername}}
			</navigator>
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
		methods: {
		},
		onLoad: function (option) {
			const id=option.id*1;
			console.log(id,typeof(id));
			uni.request({
				url:'http://m.kugou.com/singer/list/'+id+'?json=true',
				success:(res)=>{
					console.log(res);
					this.songs=res.data.singers.list.info;
					console.log(this.songs);
				}
			});	
		}
	}
</script>

<style>

</style>
