<template>
	<div>
		
			<h1> ASIN history </h1>

			{{asin.asin}}

			<div>
				<table class="table table-bordered">
					<tr class="name">
						
						<td>Date</td>
						<td>Price</td>
						<td>BSR</td>
						<td>Reviews</td>
						<td>Review star</td>

					</tr>
					<tr v-for="(history, index) in asinhistory">
					   <td> {{history.date}}</td>

				       <td>{{history.price }}</td>
				        <td>{{history.bsr}}</td>
				        <td>{{history.review_number}}</td>
				        <td>{{history.review_star}}</td>

				    </tr>
					
				</table>
				
			</div>

			<div>
				<button @click="back">back to ASIN</button>
			</div>
			
	</div>
</template>

<script>
	import Vue from 'vue';
	import AppEditAsinPopup from '../Components/EditAsinPopup.vue';
	import bModal from 'bootstrap-vue/es/components/modal/modal';
	import {mapGetters} from 'vuex';
	import {mapActions} from 'vuex';
	import Icon from 'vue-awesome/components/Icon';
	import bPopover from 'bootstrap-vue/es/components/popover/popover';
	import bPopoverDirective from 'bootstrap-vue/es/directives/popover/popover';
	import 'vue-awesome/icons/angle-up';
	import 'vue-awesome/icons/angle-down';
	import 'vue-awesome/icons/brands/amazon';
	import 'vue-awesome/icons/trash';
	import 'vue-awesome/icons/calendar-alt';
	import 'vue-awesome/icons/edit';
	import 'vue-awesome/icons/list';
	import 'vue-awesome/icons/file';


	export default {

		components: {
         bModal,
         Icon,
         AppEditAsinPopup,
         'b-popover' : bPopover
      },
      directives: {
      		'b-popover' : bPopoverDirective
      	},
      created(){
      	console.log('asinmenu/lookasinhistory actions в момент создания компонента');
      		this.$store.dispatch('asinmenu/lookasinhistory');
      	
      },
		data(){
			return{
			

		}
	},
		computed: {
			asinhistory(){
				return this.$store.getters['asinmenu/asinhistory'];
			},
			asin(){
				return this.$store.getters.current_asin;
			}
		},

		methods:{
			back(){
				this.$router.push({ name: 'asin'});
			},
			
			action (){

			}

			

			}
			
		}




</script>

<style scoped>

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
			width: 20px;
			height: 20px;
		}

		.table-menubuttons{
			width: 200px;
		}

		td{
			font-family: verdana;
			font-size: 14px;
			text-align: left;
		}

		.asin{
			font-size: 10px;
			font-weight: bold;
		}

		.name{
			font-weight: bold;
		}

</style>