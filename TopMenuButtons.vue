<template>
	<div class="menu">
		
	
	<ul class=" menu-top ">
        <button  class="btn btn-primary" 
        	v-for="(button, index) in buttons"
        	
        	@click="press($event, index)" 
        	>
        	{{button.text}}		
        </button>
    </ul>
    
	</div>
</template>
<script>

import {mapGetters} from 'vuex'; 

export default{
	
	data(){
		return{
			
			}
		},

		computed: {
			...mapGetters('topmenubuttonsstate', {buttons: 'buttons'}) /*вытягиваем массив меню из склада*/
		},
		methods:{
			press(e, index){
				//добрались до свойства meth в модуле склада
				if (index==0){
				this.$store.commit('addAsinPopupOpen');	/* открывает окно нового товара */
				this.$store.commit('settingstrue', true);}	

				

				if (index==1){
				this.$store.commit('addKeywordPopupOpen');
				this.$store.commit('addkeywordtrue', true);}

				if (index==2){
				this.$store.commit('EditTagTableOpen');}	/* открытие окна редактированиия списка тегов*/ 

				if (index==3){
				this.$store.commit('addEventPopupOpen');}
				

				}
			}
		
	}
	

</script>

<style scoped>

		.menu-top{
			display: flex;
			justify-content: space-around;
			text-align: center;

		}

		.btn{
			margin:  10px;

		}

</style>
