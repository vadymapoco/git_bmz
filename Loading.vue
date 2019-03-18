<template>
	<div class="container">
		<h1> Loading..... </h1>
		<hr>
    
		</div>
  








</template>



<script>




export default{
	components: {
    
    
  },
  created(){
    console.log('Loading page created');
    console.log('вызов settingss/lookplan action - настройки согласно плана подписки');
        this.$store.dispatch('settingss/lookplan');
        this.$store.dispatch('asinmenu/asin_quant');
        this.$store.dispatch('asinmenu/looktag');  /*загружаем все теги товаров */
        this.$store.dispatch('asinmenu/lookgroup'); /* загружаем все группы товаров */
        this.$store.dispatch('keywords/lookallkeyword');
        this.$store.dispatch('keywords/allkeyword_quant');
        this.$store.dispatch('events/lookasineventhistory_all');
  }
	
}
</script>

<style scoped>

	
		
</style>