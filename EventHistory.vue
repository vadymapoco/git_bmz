<template>

<div>	

	<div>
		
			<h1> Event History</h1>

	
			<br>

			{{ search_keyword }}
			

			<label> {{asin.title}} </label>

			<p>ASIN {{asin.asin}}</p>

			<p>Keyword : </p>


<br>
 New Array
 <br>


			<div>
				<table class="table table-bordered">
					<tr class="name">
						
						<td>Date start
							<div class="button-block">
								<button class="btn-small" @click="SortDateStartASC" 
								>
									<icon name="angle-up" class="fa-icon"></icon>
								</button>
								<button class="btn-small" @click="SortDateStartDESC" 
								>
									<icon name="angle-down" class="fa-icon"></icon>
								</button>
							</div>
						</td>
						<td>Date end
								<div class="button-block">
								<button class="btn-small" @click="SortDateEndASC" 
								>
									<icon name="angle-up" class="fa-icon"></icon>
								</button>
								<button class="btn-small" @click="SortDateEndDESC" 
								>
									<icon name="angle-down" class="fa-icon"></icon>
								</button>
							</div>
						</td>
						<td>Asin
								<div class="button-block">
								<button class="btn-small" @click="SortAsinASC" 
								>
									<icon name="angle-up" class="fa-icon"></icon>
								</button>
								<button class="btn-small" @click="SortAsinDESC" 
								>
									<icon name="angle-down" class="fa-icon"></icon>
								</button>
							</div>

						</td>
								
						<td>Keyword
								<div class="button-block">
								<button class="btn-small" @click="SortKeywordASC" 
								>
									<icon name="angle-up" class="fa-icon"></icon>
								</button>
								<button class="btn-small" @click="SortKeywordDESC" 
								>
									<icon name="angle-down" class="fa-icon"></icon>
								</button>
							</div>
							
						</td>
						<td>Comment
							
						</td>

					</tr>
					<tr>
						<td></td>
						<td></td>
						<td></td>
						<td>
							<div>
								<input type="text" v-model="search_keyword"
									@input="searching_keyword" placeholder="input search keyword"
								>
							</div>
						</td>
						<td>
							<div>
								<input type="text" v-model="search_comment"
									@input="searching_comment" placeholder="input search" 
								>
							</div>
						</td>
					</tr>
					<tr v-for="(event, index) in eventhistory_array">
					   <td> {{event.start_date}}</td>

				       <td>{{event.end_date}}</td>
				        <td>{{event.asin}}</td>
				        <td>
				        <a  @click="keyword_link(event.asin, event)">	
				        {{event.keyword}}
						</a>
				    	</td>
				        <td>{{event.comment}}</td>
				     </tr>
					
				</table>
				
			</div>

	</div>

		

	<div>
		<button @click="add">Add New Event</button>
	</div>

	<div>
		<button @click="back">back to ASIN</button>
	</div>

	<div>
		<button @click="all_events">Look all Events</button>
	</div>

	<div>
		<button @click="current_events">Look all Current Events</button>
	</div>

	<input type="text"  placeholder="Input keyword" v-model="keyworddd">
	
	<div>
		<button @click="keyword_events">Look all Coffee Events</button>
	</div>
	<datepicker v-model="date_start" placeholder="Start date" format="yyyy-MM-dd" 
			
		></datepicker>


	

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
	import Datepicker from 'vuejs-datepicker';


	export default {

		components: {
         bModal,
         Icon,
         AppEditAsinPopup,
         'b-popover' : bPopover,
         'datepicker': Datepicker
      },
      directives: {
      	'b-popover' : bPopoverDirective
      },
      created(){
      	
      	console.log('events/lookeventhistory actions в момент создания компонента');
      	//this.$store.dispatch('events/lookasineventhistory');
      	if(this.$store.getters.current_asin.length == 0) {

      			this.eventhistory_array = this.$store.getters['events/eventhistory'].slice();
      			console.log(' массив пустой');
      			console.log(this.eventhistory_array.length);
     		} else {

      		console.log('ELSE events');
      		this.eventhistory_array = this.eventFiltered(this.$store.getters.current_asin.asin).slice();
      		this.old_eventhistory_array = this.eventhistory_array.slice();
      	}

      },
       beforeDestroy(){
      			console.log('before Destroy eventHistory');
      			console.log(this.eventhistory_array);

      			this.$store.dispatch('events/lookasineventhistory_all');
				this.$store.commit('currentAsinZerro');
		},


		data(){
			return{
			eventhistory_array: [],
			old_eventhistory_array: [],
			new_eventhistory: [],
			keyworddd: 'fire tablet',
			date_start: new Date (2018,9, 5),
			date_end: '',
			search_keyword: '',
			search_comment: '',

		
			}
		},
		computed: {
			...mapGetters('events', 
				{eventFiltered: 'eventhistory_filtered',
				 event: 'eventhistory'
			}),
			
			/*
			eventhistory(){
				return this.$store.getters['events/eventhistory'];
			},*/
			asin(){
				return this.$store.getters.current_asin;
			},

			
			
		},

		methods:{
			
			action (){

			},
			back(){
				this.$router.push({ name: 'asin'});
			},
			add(){
				console.log('addNewEvent');
				this.$store.commit('addEventPopupOpen');
			},
			keyword_link(asin, event){
				console.log(asin);
				console.log(this.$store);
				this.$store.commit('keywords/current_keyword', event);

				console.log(this.$store.getters['events/eventhistory']);
				console.log(this.$store.getters['keywords/current_keyword']);
				this.$router.push({ name: 'keywordTrack'});

			},

			all_events(){
				this.$store.dispatch('events/lookasineventhistory_all');
				this.$store.commit('currentAsinZerro');
				
				this.eventhistory_array = this.$store.getters['events/eventhistory'];
			},
			current_events(){/*
				this.eventhistory_array = this.event.filter(function(item) {
 					 return item.start_date > "2018-08-04" && item.end_date < "2018-08-30";
});*/
				//(item => item.start_date > "2018-08-03");
					this.old_eventhistory_array = this.eventhistory_array;
					console.log(this.eventhistory_array);
					var arr = this.eventhistory_array;
				this.eventhistory_array = this.eventhistory_array.filter(function(item) {
					console.log(item);
 					return item.start_date > "2018-09-01";

});
				console.log(this.eventhistory_array);
			},



			keyword_events(){
				var elem = this.keyworddd;
				this.eventhistory_array = this.event.filter(function(item) {
					return item.keyword == elem });
			},



			SortAsinASC(){ /*
				this.$store.commit('events/SortAsinASC');
				this.eventhistory_array = this.$store.getters['events/eventhistory'];*/
					var funct =	function compareNumeric(a, b) {
 					 if (a.asin > b.asin) return 1;
 					 if (a.asin < b.asin) return -1;
					}
						this.eventhistory_array.sort(funct);


			},
			SortAsinDESC(){/*
				this.$store.commit('events/SortAsinDESC');
				this.eventhistory_array = this.$store.getters['events/eventhistory'];*/
				var funct =	function compareNumeric(a, b) {
 					 if (a.asin < b.asin) return 1;
 					 if (a.asin > b.asin) return -1;
					}
				this.eventhistory_array.sort(funct);
			},
			SortKeywordASC(){ /*
				this.$store.commit('events/SortKeywordASC');
				this.eventhistory_array = this.$store.getters['events/eventhistory'];*/
				var funct =	function compareNumeric(a, b) {
 					 if (a.keyword > b.keyword) return 1;
 					 if (a.keyword < b.keyword) return -1;
					}
				this.eventhistory_array.sort(funct);
			},
			SortKeywordDESC(){/*
				this.$store.commit('events/SortKeywordDESC');
				this.eventhistory_array = this.$store.getters['events/eventhistory'];*/
				var funct =	function compareNumeric(a, b) {
 					 if (a.keyword < b.keyword) return 1;
 					 if (a.keyword > b.keyword) return -1;
					}
				this.eventhistory_array.sort(funct);
			},
			
			SortDateStartASC(){/*
				this.$store.commit('events/SortDateStartASC');
				this.eventhistory_array = this.$store.getters['events/eventhistory'];*/
				var funct =	function compareNumeric(a, b) {
 					 if (a.start_date > b.start_date) return 1;
 					 if (a.start_date < b.start_date) return -1;
					}
				this.eventhistory_array.sort(funct);
			},
			SortDateStartDESC(){/*
				this.$store.commit('events/SortDateStartDESC');
				this.eventhistory_array = this.$store.getters['events/eventhistory'];*/
				var funct =	function compareNumeric(a, b) {
 					 if (a.start_date < b.start_date) return 1;
 					 if (a.start_date > b.start_date) return -1;
					}
				this.eventhistory_array.sort(funct);
			},
			SortDateEndASC(){/*
				this.$store.commit('events/SortDateEndASC');
				this.eventhistory_array = this.$store.getters['events/eventhistory'];*/
				var funct =	function compareNumeric(a, b) {
 					 if (a.end_date > b.end_date) return 1;
 					 if (a.end_date < b.end_date) return -1;
					}
				this.eventhistory_array.sort(funct);
			},
			SortDateEndDESC(){/*
				this.$store.commit('events/SortDateEndDESC');
				this.eventhistory_array = this.$store.getters['events/eventhistory'];*/
				var funct =	function compareNumeric(a, b) {
 					 if (a.end_date < b.end_date) return 1;
 					 if (a.end_date > b.end_date) return -1;
					}
				this.eventhistory_array.sort(funct);
			},
			searching_keyword(){
					//this.old_eventhistory_array = this.eventhistory_array;
					console.log(this.search_keyword);
					var sea = this.search_keyword;
					var pattern = new RegExp( sea, 'g');
					console.log(`pattern- ${pattern}`);
					
 					//console.log(sea.search(pattern));
 					if (this.search_keyword == "") {
 						this.eventhistory_array = this.old_eventhistory_array.slice();
 						//this.$store.dispatch('events/lookasineventhistory_all');
 						//this.eventhistory_array = this.$store.getters['events/eventhistory'];
 					}
 					else { /*
					this.eventhistory_array = this.event.filter(function(item) {
						
 					 	return item.keyword == sea;})*/
 					 	this.eventhistory_array = this.event.filter(function(value) {
 					 	console.log(value.keyword);
 					 	return (pattern.test(value.keyword));})
 					 	
 					 	

				}
			},
			searching_comment(){
				//this.old_eventhistory_array = this.eventhistory_array.slice();
					
					var com = this.search_comment;
					var pattern = new RegExp( com, 'g');
					console.log(`pattern- ${pattern}`);
					
 					//console.log(sea.search(pattern));
 					if (this.search_comment == "") {
 						this.eventhistory_array = this.old_eventhistory_array.slice();
 						//this.$store.dispatch('events/lookasineventhistory_all');
 						//this.eventhistory_array = this.$store.getters['events/eventhistory'];
 					}
 					else { /*
					this.eventhistory_array = this.event.filter(function(item) {
						
 					 	return item.keyword == sea;})*/
 					 	this.eventhistory_array = this.event.filter(function(value) {
 					 	console.log(value.comment);
 					 	return (pattern.test(value.comment));})
 					 	
 					 	

				}
			},
			
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

		a:hover{
			cursor: pointer;
		}

</style>