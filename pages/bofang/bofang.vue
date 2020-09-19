<!-- 播放页 -->
<template>
    <view>
        <view class="page-body" v-if="current">
            <view class="page-section page-section-gap imgbg" style="text-align: center;">
				<image :src="current.img" mode="" class="bg-set"></image>
				<!-- <view class="">
					{{current.song_name}}
				</view>
				<view class="">
					{{current.author_name}}
				</view>
				<audio :src="current.play_url"  controls></audio> -->
                <audio style="text-align: left" :src="current.play_url"  :name="current.song_name" :author="current.author_name" controls></audio>
			</view>
        </view>
    </view>
</template>

<script>
	import jsonp from 'jsonp';
	export default {
	    data() {
	        return {
				current:{},
	        }
	    },
		onLoad: function (option) {
			let self = this; 
			let hash=option.hash;
				jsonp(
					"https://www.kugou.com/yy/index.php?r=play/getdata&hash="+hash,
					// "https://www.kugou.com/yy/index.php?r=play/getdata&hash=CB7EE97F4CC11C4EA7A1FA4B516A5D97", 
					// {
					// 	name: 'getshuji'//回调函数方法名称
					// }, 
					function(err,res){
					   if(err){
						   console.log(err)
					   }else{
						   console.log(res);
						   self.current=res.data;
					   }
					}
				);
				// let getshuji = function(data){
				// 		console.log(data);
				// }
				// getshuji();
			
		},
		methods:{
			
			getdata(){
					
				let self = this;
				jsonp(
					// "'https://www.kugou.com/yy/index.php?r=play/getdata&hash='+hash,"
					"https://www.kugou.com/yy/index.php?r=play/getdata&hash=CB7EE97F4CC11C4EA7A1FA4B516A5D97", 
					{
						
						 name: 'getshuji'//回调函数方法名称
					},
					function(err,res){
					   if(err){
						   console.log(err)
					   }else{
						   console.log(res);
						   self.current=res.data;
					   }
					}
				);
				// let getshuji = function(data){
				// 		console.log(data);
				// }
				// getshuji();
			}
		},
		mounted() {
			//this.getdata();
		}
	}
</script>

<style scoped>
	.uni-audio-name{}
	.uni-audio-default{}
	.uni-audio-left{width: 100px !important;height: 100px !important;}
	.uni-audio img{width: 500px;height: 500px;}
	.uni-audio{
	    width: 300px !important;
	    height: 300px !important;
	}
	.uni-audio image{
	    width: 300px !important;
	    height: 300px !important;
	}
	.bg-set {
		position: fixed;
		width: 200px;
		height: 200px;
		top: 0;
		left: 0;
		z-index: -1;
		border-radius: 50%;
		text-align: center;
	}
	
</style>
<style>
	.uni-audio-left{
		background-color: rgba(0,0,0,0.2) !important;
	}
	.uni-audio-default{
		background: rgba(0,0,0,0.2) !important;
		border: 0px solid #e0e0e0 !important;
	}
</style>