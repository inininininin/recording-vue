<template>
	<div id="jump">

	</div>
</template>

<script>
export default {
	name: 'jump',
	data () {
		return {
			
		}
	},
	computed:{
		
	},
	components:{

	},
	beforeCreate(){
		
	},
	created(){
		
	},
	mounted(){
		
	},
	activated(){
		
		console.log(this.$route.query.fullPath)
		this.$router.replace({path:this.$route.query.fullPath})
	},
	methods: {
		
	},
}
</script>
