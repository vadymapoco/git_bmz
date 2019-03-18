<template>
	<v-app>
		<v-content>
		<span>Vuetify</span>	
		
	
		<v-btn dark color="green">Click me</v-btn>	

		<v-btn depressed class="green white--text">
			<v-icon left>email</v-icon>
			<span>email me</span>
		</v-btn>

		<v-btn small depressed class="green white--text">
			<v-icon left small>email</v-icon>
			<span>email me</span>
		</v-btn>

		<v-btn flat icon color="red">
			<v-icon>favorite</v-icon>
		</v-btn>

	</v-content>
	</v-app>
</template>

<script>

import {mapGetters} from 'vuex';

export default{

	data(){
			return{
			plan_data: []
		}
	},	

	created(){	
			},     					

	methods:{
			
			},
			
	}




</script>

<style scoped>

	
		
</style>