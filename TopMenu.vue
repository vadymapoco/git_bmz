<template>
	<div class="menu">
		
	
	<ul class=" menu-top ">
        <router-link class="menu-top-item" 
        	v-for="punkt in menuItems"
        	:key="punkt.route" 
			:to="{name:  punkt.route}" 
			tag="li"
			active-class="active"
			exact>
			<a> {{ punkt.text }} </a> <!-- здесь может быть ссылка в виде изображения и т.д.-->
		</router-link>
        
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
			...mapGetters('topmenustate', {menuItems: 'punkts'}) /*вытягиваем массив меню из склада*/
		}
	}
	

</script>

<style scoped>

		.menu-top{
			display: flex;
			justify-content: space-around;
			text-align: center;

		}
  
		.menu-top-item{
			margin:20px;
			list-style:  none;
			
		}

		.menu-top-item a:hover{
		  text-decoration: none;
		  color:  red;
		}

		.menu-top-item a{
			text-decoration: none;
		  color: black;
		}


	
</style>
