<template>
    <view>
        <view class="page-body">
            <view class="page-section page-section-gap" style="text-align: center;">
                <!-- <audio style="text-align: left" :src="current.img" :poster="current.poster" :name="current.song_name" :author="current.author_name" :action="audioAction" controls></audio> -->
				<audio style="text-align: left" :src="current.img"  :name="current.song_name" :author="current.author_name" controls></audio>
			</view>
        </view>
    </view>
</template>

<script>
	export default {
	    data() {
	        return {
	            // current: {
	            //     poster: 'https://img2.kuwo.cn/star/albumcover/300/36/9/13515874.jpg',
	            //     name: '稻香',
	            //     author: '周杰伦',
	            //     src: 'https://img2.kuwo.cn/star/albumcover/300/36/9/13515874.jpg',
	            // },
				current:'',
	            audioAction: {
	                method: 'pause'
	            }
	        }
	    },
		onLoad: function (option) {
			const id=option.id;
			console.log(id,typeof(id));
			uni.request({
				url:'https://www.kugou.com/yy/index.php?r=play/getdata&hash='+id,
				success:(res)=>{
					console.log(res);
					this.current=res.data.authors;
					console.log(this.current);
				}
			})	
		},
	}
</script>

<style>
	.uni-audio-name{}
	.uni-audio-default{}
	.uni-audio-left{width: 100px !important;height: 100px !important;}
</style>
