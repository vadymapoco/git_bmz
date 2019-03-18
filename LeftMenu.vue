<template>
	<div class="menu">
		
	
	<ul class=" menu-left list-group">
        <router-link class="menu-left-item
        					list-group-item" 
        	v-for="punkt in menuItems"
        	:key="punkt.route" 
			:to="{name:  punkt.route}" 
			tag="li"
			active-class="active"
			exact>
			<a> {{ punkt.text }} </a>
		</router-link>
        
    </ul>
    
	</div>
</template>
<script>

import {mapGetters} from 'vuex'; 

export default{
props: {
	items: Array
	},
	data(){
		return{
			
			}
		},

		computed: {
			...mapGetters('leftmenustate', {menuItems: 'punkts'}) /*вытягиваем массив меню из склада*/
		}
	}
	

</script>

<style scoped>

		.menu-left{
			

		}
  
		.menu-left-item{
			
			list-style:  none;
			
		}

		.menu-left-item a:hover{
		  text-decoration: none;
		  
		}

		.menu-left-item a{
			text-decoration: none;
		  color: black;
		}


	
</style>
