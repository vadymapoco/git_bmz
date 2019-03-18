<template>
	<div>
		<v-app>
		<div v-if="seeTovar">
		
			<!--
			<v-text-field
		        flat
		        
		        prepend-icon="search"
		        label="Search"
		        class="hidden-sm-and-down"
		        v-model="search_table"
		        @input="searching_table"
		      ></v-text-field>
		   -->
			<h2>ASIN Copy</h2>
		<v-container>
			<v-btn class="primary" @click="gogo"> Action </v-btn>
				<v-layout row justify-space-between>
					<v-flex md2 >
			<span > {{$store.getters['asinmenu/asin_quant']}} из {{asin_qw}} </span>
			
					</v-flex>
					<v-flex md2 >
			<v-btn dark  icon color="green" @click="cardview = true">
				<v-icon> view_module </v-icon>
			</v-btn>
			<v-btn dark icon color="green" @click="cardview = false">
				<v-icon> view_list </v-icon>
			</v-btn>
					</v-flex>
			</v-layout>
		</v-container>
			<!-- модальное окно при удалении товара -->
			<b-modal v-model="predeleteasin" 
					 title="Are you sure??? delete ASIN"
					 ok-title= "Delete"
					 @ok="action_delete"
					 >
					 ASIN: {{current_asin}}
			</b-modal>


			<!-- модальное окно при редактировании товара -->
			<AppEditAsinPopup  v-if="editAsinPopup"> </AppEditAsinPopup>

<!--

			{{ $store.getters['asinmenu/asins'] }}

			<p>  массив Asins </p>

			{{ asins_array }}
-->
			

			<div v-if="!cardview">
				<table class="table table-bordered">
					<tr class="name">
						<td> Main image </td>

						<td>Title
								


						</td>
						<td class="table-tag"> Tag
							
							<div class="button-block">
								<button class="btn-small" @click="SortTagASC" 
								>
									<icon name="angle-up" class="fa-icon"></icon>
								</button>
								<button class="btn-small" @click="SortTagDESC"
								>
									<icon name="angle-down" class="fa-icon"></icon>
								</button>
							</div>
							
							
							

						</td>
						
						<td> Sales rank</td>
						<td> Best position ???</td>
						<td class="table-tag">Group
								<div class="button-block">
								<button class="btn-small" @click="SortGroupASC" 
								>
									<icon name="angle-up" class="fa-icon"></icon>
								</button>
								<button class="btn-small" @click="SortGroupDESC" 
								>
									<icon name="angle-down" class="fa-icon"></icon>
								</button>
							</div>
							
						</td>

						<td class="table-menubuttons"> Menu buttons
						</td>

					</tr>


					<tr v-for="(asin, index) in asins_array">

					   <td>
					   	<img :src="asin.image_src" width="70" height="70" alt=" no image" @click="all_image">
					   </td>				     
				       <td>
						<p>{{ asin.title }}</p>
						<p class="asin">ASIN : {{ asin.asin }}</p>
				       </td>
				         <td>{{ asin.tag }}</td>
				       <td></td>
				       <td>
				       		<v-btn class="primary" @click="go(asin)"> Action </v-btn>
				       </td>
				       <td>{{ asin.group_tovar }}</td>
				       <td>
							<v-tooltip absolute right >
								<v-icon class="black--text" small @click="action_amazon(asin.asin)" slot="activator">fab fa-amazon</v-icon>
						<!--			<icon name="brands/amazon" class="fa-icon"></icon>		-->
								<span>Amazon link</span>
							</v-tooltip>

							
								<v-tooltip absolute right >
								<v-icon class="black--text ml-1" small @click="action_list(asin)" slot="activator">fas fa-list</v-icon>
						<!--		<icon name="list" class="fa-icon"></icon>	-->
								<span>Keywords list</span>
							</v-tooltip>
								<v-tooltip absolute right >
								<v-icon class="black--text ml-1" small @click="action_edit(asin)" slot="activator">fas fa-edit</v-icon>
						<!--		<icon name="edit" class="fa-icon"></icon>	-->
								<span>Edit ASIN</span>
							</v-tooltip>
							<v-tooltip absolute right >
								<v-icon class="black--text ml-1" small @click="action_event(asin)" slot="activator">fas fa-calendar-alt</v-icon>
								<span>Event history</span>
							</v-tooltip>
						<!--		<icon name="calendar-alt" class="fa-icon"></icon>	-->
							<v-tooltip absolute right >
								<v-icon class="black--text ml-1" small @click="action_history(asin)" slot="activator">fas fa-chart-line</v-icon>
								<span>Asin history</span>
							</v-tooltip>
						<!--		<icon name="file" class="fa-icon"></icon>	-->
							<v-tooltip absolute right >
								<v-icon class="black--text ml-1" small @click="pre_action_delete(asin.id_tovar, asin.asin)" slot="activator">fas fa-trash</v-icon>
						<!--		<icon name="trash" class="fa-icon"></icon>	-->
								<span>Delete ASIN</span>
							</v-tooltip>

							
				       </td>

				    </tr>
					
				</table>
				
			</div>
			
			<div v-if="cardview">
	
        <v-container
          fluid
          grid-list-md
          fill-height
        >
          <v-layout row wrap>
            <v-flex
              v-for="(asin, index) in asins_array"
              
              xs12 sm6 md4 lg3
              :key="asin.title"
            >
              <v-card >
              	<v-container
              		
              		style=" border: 1px solid blue"
              		>	
	                <v-img
	                  :src="asin.image_src"
	                  :aspect-ratio="4/3"
	                  
	                  style=" width:auto; height: 90%"
	                  
	                >
	                </v-img>
           		 </v-container>
				
                <v-card-title
                	style="height: 20%; border: 1px solid red">
                	<v-layout column>
                		<v-flex>
                		<div class="subheading" style="height: 60px; overflow: hidden">{{  asin.title }}</div>
                		<div class=""> ASIN: {{asin.asin}}</div>
                		<div> Tag: {{asin.tag}} </div>
                		<div> Group: {{asin.group_tovar}}</div>
                	</v-flex>
                </v-layout>
                </v-card-title>
                           


                <v-card-actions style="height: 10%">
               	 <v-container class="py-0">
               		 <v-layout row justify-center fill-height>
                		<v-flex>
                  <v-spacer></v-spacer>
                  <v-btn icon color="blue-grey lighten-4" small dark>
                  	<v-tooltip >
								<v-icon class="black--text" small @click="action_amazon(asin.asin)" slot="activator">fab fa-amazon</v-icon>
						<!--			<icon name="brands/amazon" class="fa-icon"></icon>		-->
								<span>Amazon link</span>
							</v-tooltip>
                  </v-btn>
                  <v-btn icon color="blue-grey lighten-4" small dark>
                    <v-tooltip absolute right >
								<v-icon class="black--text ml-1" small @click="action_list(asin)" slot="activator">fas fa-list</v-icon>
						<!--		<icon name="list" class="fa-icon"></icon>	-->
								<span>Keywords list</span>
							</v-tooltip>
                  </v-btn>
                  <v-btn icon color="blue-grey lighten-4" small dark>
                    <v-tooltip absolute right >
								<v-icon class="black--text ml-1" small @click="action_edit(asin)" slot="activator">fas fa-edit</v-icon>
						<!--		<icon name="edit" class="fa-icon"></icon>	-->
								<span>Edit ASIN</span>
							</v-tooltip>
                  </v-btn>
                  <v-btn icon color="blue-grey lighten-4" small dark>
					<v-tooltip absolute right >
								<v-icon class="black--text ml-1" small @click="action_event(asin)" slot="activator">fas fa-calendar-alt</v-icon>
								<span>Event history</span>
							</v-tooltip>
                  </v-btn>
					<v-btn icon color="blue-grey lighten-4" small dark>
					<v-tooltip absolute right >
								<v-icon class="black--text ml-1" small @click="action_history(asin)" slot="activator">fas fa-chart-line</v-icon>
								<span>Asin history</span>
							</v-tooltip>
                  </v-btn>
                  <v-btn icon color="blue-grey lighten-4" small dark>
						<v-tooltip absolute right >
								<v-icon class="black--text ml-1" small @click="pre_action_delete(asin.id_tovar, asin.asin)" slot="activator">fas fa-trash</v-icon>
						<!--		<icon name="trash" class="fa-icon"></icon>	-->
								<span>Delete ASIN</span>
							</v-tooltip>
                  </v-btn>
							</v-flex>
						</v-layout>
					</v-container>
                </v-card-actions>

              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
     
			</div>
				
		</div>
		</v-app>	
</div>
</template>

<script>



	import Vue from 'vue';
	import AppEditAsinPopup from '../Components/EditAsinPopup.vue';

	import bModal from 'bootstrap-vue/es/components/modal/modal';
	import Icon from 'vue-awesome/components/Icon';
	import bPopover from 'bootstrap-vue/es/components/popover/popover';
	import bPopoverDirective from 'bootstrap-vue/es/directives/popover/popover';

	import {mapGetters} from 'vuex';
	import {mapActions} from 'vuex';

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
      	// console.log('asinmenu/lookasin actions в момент создания компонента');
      	// this.$store.dispatch('asinmenu/lookasin');
      		this.$store.dispatch('asinmenu/lookasin'); 
      		this.asins_array = this.$store.getters['asinmenu/asins'];
      		this.old_asins_array = this.asins_array.slice();
      },

     
		data(){
			return{
			asinfetch: [],
			seeTovar: true,
			tovarInput: true,
			tovars: [],
			modalTovarEst: false,
			user: { user_name: 'Nothing'},
			asins: [],
			deleteId: null,
			asin_name: '',
			asin_title: '',
			asin_tag: '',
			asin_group: '',
			fire_email: '',
			predeleteasin: false,
			current_asin: '',
			current_asin_id: '',
			search_title: '',
			search_tag: '',
			search_group: '',
			search_table: '',
			asins_array: [],
			old_asins_array: [],
			cardview: false,
			cards: [
        { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex_xs: 12, flex_md: 4, flex_sm: 6 },
        { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex_xs: 12, flex_md: 4, flex_sm: 6 },
        { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex_xs: 12, flex_md: 4, flex_sm: 6 },
        { title: 'Pre-fab homes2', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex_xs: 12, flex_md: 4, flex_sm: 6 },
        { title: 'Favorite road trips2', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex_xs: 12, flex_md: 4, flex_sm: 6 },
        { title: 'Best airlines2', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex_xs: 12, flex_md: 4, flex_sm: 6 }
      ]
		}
	},
		computed: {
			...mapGetters('asinmenu', {
					asins_list: 'asins',
					

			}),
			...mapGetters('settingss', {
        asin_qw: 'asin_qw'
      		}),

			//...mapGetters(['uid']),
			uid(){
				return this.$store.getters.uid;
			},/*
			asins_array(){
				return this.$store.getters['asinmenu/asins'];
			},*/
			editAsinPopup(){
				return this.$store.getters.editAsinPopup;
			},
			search_term(){
				return this.$store.getters.search_term;
			}
			
		},
		watch: {
			search_term: function(){
				console.log('watcher',this.search_term);
				this.searching_table(this.search_term);
			}
		},

		methods:{
			...mapActions('asinmenu',{
          lookasin: 'lookasin'
      	}),
			go(asin){
				console.log(asin.asin);

			},
			gogo() {
				fetch('https://jsonplaceholder.typicode.com/posts/1')
				  .then(response => response.json())
				  .then(json => console.log(json))
				  .then(console.log('gsdfgsdfds'))

			},

			deleteTovar(){
				Vue.http.get('http://bsr-consulting.com/alex.php', {
					params: 
					{action: 'deleteasin',
					 asin_id: this.deleteId
					 }
				}).then (
				(response) => {
					this.deleteId = '';
					this.lookTovar();
				},
				(err) => {
					console.log(err);
				}
				);
			},

			addnewAsin(){
				Vue.http.get('http://bsr-consulting.com/alex.php', {
					params: 
					{ addasin : 'addasin',
					 uid: this.$store.getters.uid,
					 asin: this.asin_name,
					 
					 tag: this.asin_tag,
					 title: this.asin_title,
					 asin_group: this.asin_group}
				}).then (
				(response) => {
					//console.log(this.$store.getters['asinmenu/asins']);
					this.$store.dispatch('asinmenu/lookasin');
				},
				(err) => {
					console.log(err);
				}
				);
				
				this.user_name = '';
				this.user_email = '';
				this.user_pass = '';
			},
			action_amazon(asin){
				/*console.log(asin);*/
				var url="http://amazon.com/dp/"+asin;
				window.open(url);
			},

			pre_action_delete(asin_id, asin){
				this.current_asin = asin;
				this.current_asin_id = asin_id;
				this.predeleteasin = true;
			},

			action_delete(){
				console.log(this.current_asin_id);
				console.log('delete asin');
				Vue.http.get('http://bsr-consulting.com/alex.php', {
					params: 
					{deleteasin: 'deleteasin',
					 uid: this.$store.getters.uid,
					 asin_id: this.current_asin_id
					 }
				}).then (
				(response) => {
					/*this.deleteId = '';*/
					this.$store.dispatch('asinmenu/lookasin');
				},
				(err) => {
					console.log(err);
				}
				);
			},

			action_edit(asin){
				this.$store.commit('editAsinPopupOpen', asin);
			},
			/*вывод списка ключевых слов для этого ASIN */
			action_list(asin){
				console.log('action_list_keyword');
				console.log (asin.asin);
				this.$store.dispatch('asinmenu/action_list', asin);
				/*
				this.$store.commit('keywordlist', asin)
				this.$store.dispatch('keywords/lookkeyword', asin);*/
				setTimeout(() => {
				console.log('задержка 3 сек');
				console.log('push!!! app keyword');
				this.$router.push({ name: 'keywords'});
				
			}, 500);
				
			},
			action_history(asin){
				console.log('action history');
				this.$store.commit('keywordlist', asin);
				console.log('push!!! app asinhistory');
				this.$router.push({ name: 'asinhistory'});
			},
			action_event(asin){
				console.log('action asin event');
				//this.$store.commit('keywordlist', asin);
				this.$store.dispatch('asinmenu/action_event', asin);
				setTimeout(() => {
				console.log('push!!! app eventhistory');
				this.$router.push({ name: 'eventhistory'});
				}, 500);

			},
			all_image(){
				console.log('all image');
			},
			
			searching_title(){
					console.log(this.search_title);
					var sea = this.search_title;
					var pattern = new RegExp( sea, 'gi');

 					//console.log(sea.search(pattern));
 					if (this.search_title == "") {
 						/*this.$store.dispatch('keywords/lookallkeyword');
 						this.keyword_array = this.$store.getters['keywords/keywords'];}*/
 						this.asins_array = this.old_asins_array.slice();
 					}
 					else { /*
					this.eventhistory_array = this.event.filter(function(item) {
						
 					 	return item.keyword == sea;})*/
 					 	this.asins_array = this.asins_list.filter(function(value) {
 					 	console.log(value.title);
 					 	return (pattern.test(value.title));})
				}
			},
			searching_tag(){
					console.log(this.search_tag);
					var sea = this.search_tag;
					var pattern = new RegExp( sea, 'gi');

 					//console.log(sea.search(pattern));
 					if (this.search_tag == "") {
 						/*this.$store.dispatch('keywords/lookallkeyword');
 						this.keyword_array = this.$store.getters['keywords/keywords'];}*/
 						this.asins_array = this.old_asins_array.slice();
 					}
 					else { /*
					this.eventhistory_array = this.event.filter(function(item) {
						
 					 	return item.keyword == sea;})*/
 					 	this.asins_array = this.asins_list.filter(function(value) {
 					 	console.log(value.tag);
 					 	return (pattern.test(value.tag));})
				}
			},
			searching_group(){
					console.log(this.search_group);
					var sea = this.search_group;
					var pattern = new RegExp( sea, 'gi');

 					//console.log(sea.search(pattern));
 					if (this.search_group == "") {
 						/*this.$store.dispatch('keywords/lookallkeyword');
 						this.keyword_array = this.$store.getters['keywords/keywords'];}*/
 						this.asins_array = this.old_asins_array.slice();
 					}
 					else { /*
					this.eventhistory_array = this.event.filter(function(item) {
						
 					 	return item.keyword == sea;})*/

 					 	this.asins_array = this.asins_list.filter(function(value) {
 					 	console.log(value.group_tovar);
 					 	return (pattern.test(value.group_tovar));})
				}
			},
			searching_table(value){
					//console.log('search', value);
					//var sea = this.search_table;
					var sea = value;
					var pattern = new RegExp( sea, 'gi');
					console.log('pattern', pattern);

 					//console.log(sea.search(pattern));
 					if (value == "") {
 						/*this.$store.dispatch('keywords/lookallkeyword');
 						this.keyword_array = this.$store.getters['keywords/keywords'];}*/
 						this.asins_array = this.old_asins_array.slice();
 					}
 					else { /*
					this.eventhistory_array = this.event.filter(function(item) {
						
 					 	return item.keyword == sea;})*/
 					 	this.asins_array = this.asins_list.filter(function(value) {
 					 	return (pattern.test(value.title) || pattern.test(value.asin) || pattern.test(value.tag) || pattern.test(value.group_tovar));})
 					 	
				}
			},
			SortTagASC(){ 
				var funct =	function compareNumeric(a, b) {
 					 if (a.tag > b.tag) return 1;
 					 if (a.tag < b.tag) return -1;
					}
				this.asins_array.sort(funct);
			},
			SortTagDESC(){
				var funct =	function compareNumeric(a, b) {
 					 if (a.tag < b.tag) return 1;
 					 if (a.tag > b.tag) return -1;
					}
				this.asins_array.sort(funct);
			},
			SortGroupASC(){ 
				var funct =	function compareNumeric(a, b) {
 					 if (a.group_tovar > b.group_tovar) return 1;
 					 if (a.group_tovar < b.group_tovar) return -1;
					}
				this.asins_array.sort(funct);
			},
			SortGroupDESC(){
				var funct =	function compareNumeric(a, b) {
 					 if (a.group_tovar < b.group_tovar) return 1;
 					 if (a.group_tovar > b.group_tovar) return -1;
					}
				this.asins_array.sort(funct);
			},

				/*
				console.log("server request");
				Vue.http.get('http://bsr-consulting.com/alex.php', {
					params: {   asin : 'lookasin',
								uid: this.$store.getters.uid
							}
				}).then (
				(response) => {
					this.asins = response.data;
					console.log(response);
				},
				(err) => {
					console.log(err);
				}
				); */

			}
			
		}




</script>

<style scoped>

		.table-button{
			display:  flex;
		}

		.table-tag {
			width:  50px;
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

		.search{
			border: 1px solid grey;
		}

</style>