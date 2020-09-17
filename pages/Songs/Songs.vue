<template>
</template>

<script>
	export default {
	
	  data() {
	    return {
	     // 声明变量保存推荐数组
			 songs:[]
	    }
	  },
	  onLoad(opthion,pages) {
			var opthions=parseInt(opthion)
			uni.request({
				url:"http://m.kugou.com/rank/info/?rankid=opthions&page=pages&json=true",
				success:(res)=>{
					console.log(res);
					
				}
			})
	  },
	  methods: {

				
	  },
	}
</script>

<style>
</style>
