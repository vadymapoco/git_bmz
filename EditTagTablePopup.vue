<template>
	<div class="container asin">
		
		<div id="mypopup" class="popup" @click="closeall($event)">
			<div class="popup-content" >
				<div class="content">
					<div class="popup-header">
						<h3>Edit Tag Table</h3>
						
						
					</div>	
					<div class="popup-body">
						
		<div>
			<table class="table table-bordered">
				<tr>
										
					<td class="table-button"> Tag
						<div class="button-block">
							<button class="btn-small" @click="SortTagASC" >
								<icon name="angle-up" class="fa-icon"></icon>
							</button>
							<button class="btn-small" @click="SortTagDESC" >
								<icon name="angle-down" class="fa-icon"></icon>
							</button>
						</div>
					</td>
					
					
					<td class="table-menubuttons"> Menu buttons
					</td>

				</tr>
				<tr v-for="(tag, index) in tags">
			      			       
			       <td>{{ tag.tag_name }}</td>
			      
			       <td class="table-buttons-block">
						<div class="menu-buttons-block">
							<button class="btn-menu-small" @click="" >
								<icon name="list" class="fa-icon"></icon>
							</button>
							<button class="btn-menu-small" @click="" >
							<icon name="edit" class="fa-icon"></icon>
							</button>
							<button class="btn-menu-smalll" @click="" >
							<icon name="calendar-alt" class="fa-icon"></icon>
							</button>
							<button class="btn-menu-small" @click="" >
							<icon name="trash" class="fa-icon"></icon>
							</button>
						</div>
			       </td>

			    </tr>
				
			</table>
				
			</div>
						
						
						
						
						

					</div>
				</div>
				<div class="popup-footer">
					<button class="btn btn-outline-success"
							@click="action"
										>Action</button>
					<button class="btn btn-outline-danger"
							@click="close"
										>Close</button>
				</div>

				
			</div>
		</div>
	</div>

</template>

<script>

import Vue from 'vue';
import bFormSelect from 'bootstrap-vue/es/components/form-select/form-select';
import bContainer from 'bootstrap-vue/es/components/layout/container';
import bRow from 'bootstrap-vue/es/components/layout/row';
import bCol from 'bootstrap-vue/es/components/layout/col';
import Icon from 'vue-awesome/components/Icon';
import 'vue-awesome/icons/angle-up';
import 'vue-awesome/icons/angle-down';
import 'vue-awesome/icons/list';
import 'vue-awesome/icons/trash';
import 'vue-awesome/icons/calendar-alt';
import 'vue-awesome/icons/edit';

export default{

	 components: {
   	 'b-form-select': bFormSelect,
   	 'b-container': bContainer,
    'b-row': bRow,
    'b-col': bCol,
     Icon,
   	},

	data(){
		return{
				tags: []
			}
		},

	created(){
			this.$store.commit('poletagsort', 'tag_name ASC');
			this.$store.dispatch('asinmenu/looktag'); 
			setTimeout(() => {
   					 this.tags  = this.$store.getters['asinmenu/tags'];
   					
				}, 500);
   	},

	methods:{
	
		/* закрытие этого всплывающего окна по нажатию на кнопке или вне окна*/ 

		close(){
			this.$store.commit('EditTagTableClose');},

		closeall(e){    /*проверяет в какой области был клик мышкой. Если клик мимо модального окна - закрывает  окно*/
			//console.log(e.target); 
			if (e.target.id == "mypopup"){
				//console.log(e.target);
				this.$store.commit('EditTagTableClose');	
			}
		},
		
		action(){
			
		},
		SortTagASC(){
				this.$store.commit('poletagsort', 'tag_name ASC');
				this.$store.dispatch('asinmenu/looktag');
				setTimeout(() => {
   					 this.tags  = this.$store.getters['asinmenu/tags'];
   					
				}, 500);
			},

		SortTagDESC(){
			this.$store.commit('poletagsort', 'tag_name DESC');
			this.$store.dispatch('asinmenu/looktag');
			setTimeout(() => {
   					 this.tags  = this.$store.getters['asinmenu/tags'];
   					
				}, 500);
		},

		
		
	}
	
}

</script>

<style scoped>

	.popup{
		position: fixed;
		z-index: 999;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		overflow: auto;
		background-color: rgb(0,0,0);
		background-color: rgba(0,0,0,0.4);
	}

	.close:hover,
	.close:focus {
		color: black;
		text-decoration: none;
		cursor: pointer;
	}

	.popup-header{
		background-color: #FFA500; /* #FF8C00 #1E90FF #90EE90 #F8F8FF #D3D3D3*/
		color: white;
		display: flex;
		padding: 2px 16px;
		justify-content: center;
	}
	
	.popup-body{
		padding: 10px 16px; /*отступ сверху в основном блоке*/
	}

	.popup-body label{
		margin-right: 20px; /*отступ справа от названия строки*/
	}

	.popup-body div{
		margin-top: 10px; /*отступ между пунктами*/
	}

	.popup-footer{
		display:  flex;
		/*flex-direction: row-reverse;*/
		flex-direction: row;
		justify-content: flex-end; /*расположение кнопки выход*/
		padding: 2px 16px;
		color: white;
	}

	.popup-content{
		display: flex;
		flex-direction: column;
		position: relative;
		background-color: white;
		/*background-color: #fefefe;*/
		margin: auto;
		padding: 0;
		margin-top: 5%; /*отступ окна сверху экрана*/
		border: 1px solid #888;
		width: 50%; /*ширина модального окна */
		min-height: 200px;  /*высота модального окна */
	}

	.content {  /*прижали футер книзу окна*/
		flex-grow: 1;
	}

	.btn{
		margin: 10px;
	}

	.table-button{
			display:  flex;
		}

		.button-block{
			display:  flex;
			margin-left: 10px;

		}

		.fa-icon {
			margin:  0;
			padding: 0;
			width: 100%;
			height: 100%; /* or any other relative font sizes */
			 
			  /* You would have to include the following two lines to make this work in Safari */
			max-width: 100%;
			max-height: 100%;
}

		.btn-small{
			margin: 0;
			margin-right: 5px;
			padding: 0;
			width: 20px;
			height: 20px;
		}

		.btn-menu-small{
			margin: 0;
			margin-right: 2px;
			padding: 0;
			width: 25px;
			height: 25px;
		}

		.table-menubuttons{
			width: 150px;
		}
	



		
</style>