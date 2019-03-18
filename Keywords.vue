<template>
	
		<v-app>
		<div >
			<b-modal v-model="tooMuchKeywords" 
					 title="В данном тарифном плане можно отслеживать ... слов" 
					 ok-title= "Перейти на следующий план"
					 @ok="$router.push('settings')"
					 >
					 
			</b-modal>

			<b-modal v-model="predeletekeyword" 
					 title="Are you sure??? delete Keyword"
					 ok-title= "Delete"
					 @ok="delete_keyword"
					 >
					 ASIN: {{current_asin}}
					 Keyword: {{current_keyword}}
					 ID_keyword: {{current_id_keyword}}
			</b-modal>

			<h3>Keyword List</h3>
			<label>Total keywords: </label>
			{{ $store.getters['keywords/allkeyword_quant']}}
			
			<div>
				
			
						<div>
							<label> ASIN :</label>
							{{$store.getters.current_asin.asin}}
						</div>

						<div>
							<label> ASIN title : </label>
							{{$store.getters.current_asin.title}}
							
						</div>

						<p> Current Asin </p>
						{{ $store.getters.current_asin.asin }}

						<br>
					<label>Current keywords: </label>
						{{ keyword_array.length }}
			</div>

			

			<b-modal v-model="predeleteasin" 
					 title="Are you sure??? delete ASIN"
					 ok-title= "Delete"
					 @ok="action_delete"
					 >
					 ASIN: {{current_asin}}
			</b-modal>

			<AppEditAsinPopup  v-if="editAsinPopup"> </AppEditAsinPopup>

			<div>
				<table class="table table-bordered">
					<tr class="name">
						<td>
							<input type="checkbox" 
							true-value="true" false-value="false"
							@change = "sellectAllKeywords">
							
						</td>
						<td>Keyword
								
						</td>
						<td> 
							<v-tooltip right> 
								<span slot="activator">ASIN</span>
								<span> This is ASIN </span>	
							 

						</v-tooltip>

						 </td>
						<td>Tag
						
						</td>
						<td class="table-button">Group
								<div class="button-block">
								<button class="btn-small" @click="SortGroupASC" >
									<icon name="angle-up" class="fa-icon"></icon>
								</button>
								<button class="btn-small" @click="SortGroupDESC" >
									<icon name="angle-down" class="fa-icon"></icon>
								</button>
							</div>
						</td>
						<td class="w50">Tracking
							<p> plan: 	{{ $store.getters['settingss/kw_track_qw'] }} </p>
							<p> total: {{ kw_track }} </p>
						</td>
						<td class="w50">Main screen</td>
						<td class="w50">Notification</td>
						<td class="w50">Amazon choice</td>
						<td class="table-menubuttons"> Menu buttons
						</td>

					</tr>

					<tr v-for="(keyword, index) in keyword_array"
						:key="keyword.id_keyword">
						<td>
							<input type="checkbox" v-model="selectedKeywords[index+1].value"
							true-value="true" false-value="false">
						</td>

						<td>
							<v-tooltip right> 
								<span slot="activator">{{ keyword.keyword }}</span>
								<span> {{ keyword.title }} </span>	
						 	</v-tooltip>
						</td>
						<td> 
							<v-tooltip right> 
								<span slot="activator">{{ keyword.asin_tovar }}</span>
								<span> {{ keyword.title }} </span>
						 	</v-tooltip>
						</td>
						<td>{{ keyword.kw_tag }}</td>
						<td>{{ keyword.kw_group }}</td>
						<td class="w50">
				       		<input type="checkbox" name="kw_tracking" v-model="kw_tracking_array[index+1].value"
				       		true-value="true" false-value="false"
				       		@change = "total_kw(index)">
				   		</td>
				       <td class="w50">

				       		<input type="checkbox" v-model="kw_mainscreen[index+1].value" 
				       		true-value="true" false-value="false">
				       </td>
				       <td class="w50">
				       					
				       				
							<input type="checkbox" v-model="kw_mail[index+1].value"
							true-value="true" false-value="false">
				       	</td>
				       <td class="w50">
							<input type="checkbox" v-model="kw_achoice[index+1].value"
							true-value="true" false-value="false">
				       </td>
						
				       
				       
				       <td class="table-menubuttons">
							<div class="menu-buttons-block">
								<button class="btn-menu-small" @click="action_kwrank(keyword)" >
									<icon name="chart-line" class="fa-icon"></icon>
								</button>
								<button class="btn-menu-small" @click="action" >
								<icon name="list" class="fa-icon"></icon>
								</button>
								<button class="btn-menu-small" @click="action" >
								<icon name="edit" class="fa-icon"></icon>
								</button>
								<button class="btn-menu-smalll" @click="action" >
								<icon name="calendar" class="fa-icon"></icon>
								</button>
								<button class="btn-menu-small" @click="modaldeletekeyword(keyword.id_keyword, keyword.asin_tovar, keyword.keyword)" >
								<icon name="trash" class="fa-icon"></icon>
								</button>
							</div>
				       </td>

				    </tr>
					
				</table>

			</div>
			<div>
				<button @click="back">back to ASIN</button>
			</div>	

			<v-btn flat @click="back"> ASIN back </v-btn>
			

		</div>
	</v-app>		

</template>

<script>
	import Vue from 'vue';
	import AppEditAsinPopup from '../Components/EditAsinPopup.vue';
	import bModal from 'bootstrap-vue/es/components/modal/modal';
	import {mapGetters} from 'vuex';
	import {mapActions} from 'vuex';
	import Icon from 'vue-awesome/components/Icon';
	import bFormGroup from 'bootstrap-vue/es/components/form-group/form-group';
	import bFormCheckbox from 'bootstrap-vue/es/components/form-checkbox/form-checkbox';
	import bFormCheckboxGroup from 'bootstrap-vue/es/components/form-checkbox/form-checkbox-group';
	import 'vue-awesome/icons/angle-up';
	import 'vue-awesome/icons/angle-down';
	import 'vue-awesome/icons/trash';
	import 'vue-awesome/icons/calendar';
	import 'vue-awesome/icons/edit';
	import 'vue-awesome/icons/list';
	import 'vue-awesome/icons/chart-line';


	export default {
		components: {
         bModal,
         Icon,
         AppEditAsinPopup,
         'b-form-group' : bFormGroup,
	     'b-form-checkbox' : bFormCheckbox,
	     'b-form-checkbox-group' : bFormCheckboxGroup,
      },

      created(){

      		console.log('created hook');
      		console.log('keywords/lookkeyword actions в момент создания компонента');
      		this.current_asin_id = this.$store.getters.current_asin.asin;
      		//this.$store.dispatch('keywords/lookkeyword');
      		console.log(this.$store.getters.current_asin.length);
      		//проверяем выбран ли асин или показываем все ключевые слова, если Асин не выбран то показываем все ключевые слова
      		if(!this.$store.getters.current_asin) {

      			this.keyword_array = this.$store.getters['keywords/keywords']; //копируем ссылку на массив ключевых слов
      			console.log(' массив пустой');
      			console.log(this.keyword_array.length);
      			this.old_keyword_array = this.keyword_array.slice(); //создаем копию массива
     		} else {

      		console.log('ELSE keywords');
      		this.keyword_array = this.keywordAsin(this.$store.getters.current_asin.asin)} //присваиваем новому массиву отфильтрованный массив
      		this.old_keyword_array = this.keyword_array.slice(); //создаем копию массива

      		//заполняем массивы состояний по каждому ключевому слову из массива ключевых слов т.е. из БД
      		for (let i=0; i<this.keyword_array.length; i++){
      			console.log(this.keyword_array[i].keyword);
      			this.kw_tracking_array.push({asin: this.keyword_array[i].asin_tovar, keyword: this.keyword_array[i].keyword, value: this.keyword_array[i].kw_tracking});
      			this.kw_mainscreen.push({asin: this.keyword_array[i].asin_tovar, keyword: this.keyword_array[i].keyword, value: this.keyword_array[i].mainscreen});
      			this.kw_mail.push({asin: this.keyword_array[i].asin_tovar, keyword: this.keyword_array[i].keyword, value: this.keyword_array[i].mail});
      			this.kw_achoice.push({asin: this.keyword_array[i].asin_tovar, keyword: this.keyword_array[i].keyword, value: this.keyword_array[i].achoice_tracking});
      			this.selectedKeywords.push({asin: this.keyword_array[i].asin_tovar, keyword: this.keyword_array[i].keyword, value: false});
      		};
      		//this.total_kw();//вызываем метод подсчета выделенных чекбоксов

      		 },
      beforeDestroy(){
      			console.log('before Destroy');
      			console.log(this.keyword_array);

      			for (var i=0; i<this.keyword_array.length; i++) {
      				console.log(this.$store.getters.current_asin.asin);
      				console.log(this.keyword_array[i].keyword);
      				console.log(this.kw_tracking_array[i+1].value);
      				console.log( this.kw_mainscreen[i+1].value);
      				console.log( this.kw_mail[i+1].value);
      				console.log( this.kw_achoice[i+1].value);

      				//обновляем в базе данных состояние выделенных чекбоксов
				Vue.http.get('http://bsr-consulting.com/alex.php', {
					params: 
					{ updatekwstatus : 'updatekwstatus',
					
					 uid: this.$store.getters.uid,
					 asin: this.kw_tracking_array[i+1].asin,
					 keyword: this.keyword_array[i].keyword,
					 kw_tracking: this.kw_tracking_array[i+1].value,
					 mainscreen: this.kw_mainscreen[i+1].value,
					 mail: this.kw_mail[i+1].value,
					 achoice_tracking: this.kw_achoice[i+1].value,
					 }
				}).then (
				(response) => {

					/*
					this.$store.dispatch('asinmenu/lookasin');
					this.$store.commit('editAsinPopupClose');
					*/
				},
				(err) => {
					console.log(err);
				}
				);
				};
					this.$store.dispatch('keywords/lookallkeyword');
					//this.$store.commit('currentAsinZerro');
			},
      
		data(){
			return{
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
			current_keyword: '',
			current_id_keyword: '',
			tracking: false,
			kw_array: [],
			keyword_array: [],
			old_keyword_array: [],
			kw_tracking_array: [{asin: '', keyword: '', value : ''}],
			kw_mainscreen: [{asin: '', keyword: '', value : ''}],
			kw_achoice: [{asin: '', keyword: '', value : ''}],
			kw_mail: [{asin: '', keyword: '', value : ''}],
			
			tooMuchKeywords: false,
			selectedKeywords: [{asin: '', keyword: '', value : ''}],
			allKeywordsSelect: false,
			predeletekeyword: false
			
		}
	},	

		computed: {
			...mapGetters('keywords', {
					keywordAsin: 'keyword_filter',
					keywords: 'keywords',
					kw_track: 'totaltrackingkwselect'
					

			}),
			search_term(){
				return this.$store.getters.search_term;
			},
			/* массив с отфильтрованными даннными по конкретному ASIN 
			keyword_array(){
					return this.keywordAsin(this.$store.getters.current_asin.asin);
			},

			uid(){
				return this.$store.getters.uid;
			},/*
			keyword_array(){
				return this.$store.getters['keywords/keywords'];
			},
			keyword_array:{
				get: function(){
				return this.$store.getters['keywords/keywords'];},
				set: function (){
					this.$store.commit('keywords/setkeyword');
				}
			},*/
			/*
			/* принимает отфильтрованный массив */
			/*keyword_array(){
				return this.$store.getters['keywords/keywords'];
			},*/
			editAsinPopup(){
				return this.$store.getters.editAsinPopup;
			},
			
			

			


			
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
			sellectAllKeywords(){ //выделение всех ключевыъ слов
				//console.log('sellectAllKeywords');
				//console.log(this.keyword_array.length);
				for (var i=0; i<this.keyword_array.length; i++)
				{
					//console.log(this.selectedKeywords.length);
					//console.log(this.selectedKeywords[i+1].keyword);
					this.allKeywordsSelect  == true  ?  this.selectedKeywords[i+1].value = false : this.selectedKeywords[i+1].value = true;
					
					//console.log(this.selectedKeywords[i+1].value);
				};
				this.allKeywordsSelect = !this.allKeywordsSelect;
				//console.log(this.allKeywordsSelect);
			},
			total_kw(index){
				console.log(index);
				console.log(this.kw_tracking_array[index+1].value);
				if (this.kw_tracking_array[index+1].value == 'true'){ //проверка состояния 
					this.$store.commit('keywords/change_kw_tracking_quant', 1); //если  новон состояние истина, то увеличиваем счетчик 
				} else this.$store.commit('keywords/change_kw_tracking_quant', -1); // если ложь, то уменьшаем счетчик
				
				if (this.kw_track > this.$store.getters['settingss/kw_track_qw']) { //проверяем больше ли отмеченных слов чем можно всего
					console.log('AAAAAAA');
					this.tooMuchKeywords = true;
					this.kw_tracking_array[index+1].value = 'false'; //если больше - отменяем галочку истины
					this.$store.commit('keywords/change_kw_tracking_quant', -1); // и уменьшаем счетчик, так как раньше его увеличили.
				}




				


			},
			uidprint(){
				console.log(this.$store.getters.uid);
				console.log(this.$store.getters['authstate/useremail']);
				console.log(this.$store.getters['authstate/fire_email']);
				console.log(this.$store.getters['authstate/signin']);
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

			delete_keyword(){
				console.log('delete Keyword');
				Vue.http.get('http://bsr-consulting.com/alex.php', {
					params: 
					{action: 'deletekeyword',
					 id_keyword: this.current_id_keyword,
					 uid: this.$store.getters.uid
					 }
				}).then (
				(response) => {
					this.$store.dispatch('keywords/lookallkeyword'); //не работает
					
				},
				(err) => {
					console.log(err);
				}
				);
			},

			modaldeletekeyword(id_keyword, asin, keyword){
				this.current_id_keyword = id_keyword;
				this.current_asin = asin;
				this.current_keyword = keyword;
				this.predeletekeyword = true;
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

			SortTagASC(){
				this.$store.commit('polesort', 'tag ASC');
				this.$store.dispatch('asinmenu/lookasin');
			},

			SortTagDESC(){
				this.$store.commit('polesort', 'tag DESC');
				this.$store.dispatch('asinmenu/lookasin');
			},

			SortGroupASC(){
				this.$store.commit('polesort', 'group_tovar ASC');
				this.$store.dispatch('asinmenu/lookasin');
			},

			SortGroupDESC(){
				this.$store.commit('polesort', 'group_tovar DESC');
				this.$store.dispatch('asinmenu/lookasin');
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

			action(){
				
			},

			action_kwrank(keyword){
				console.log('action kwrank');
				console.log(keyword.keyword);
				this.$store.commit('keywords/current_keyword', keyword);
				this.$router.push({ name: 'keywordTrack'});
				console.log(this.current_asin_id);
				console.log(this.$store.getters.current_asin.asin);
			},
			back(){
				console.log('back ASIN');
				
				

				for (var i=0; i<this.keyword_array.length; i++) {
      				console.log(this.$store.getters.current_asin.asin);
      				console.log(this.keyword_array[i].keyword);
      				console.log(this.kw_tracking_array[i+1].value);
      				console.log( this.kw_mainscreen[i+1].value);
      				console.log( this.kw_mail[i+1].value);
      				console.log( this.kw_achoice[i+1].value);


				Vue.http.get('http://bsr-consulting.com/alex.php', {
					params: 
					{ updatekwstatus : 'updatekwstatus',
					 id_tovar: this.$store.getters.current_asin.id_tovar,
					 uid: this.$store.getters.uid,
					 asin: this.$store.getters.current_asin.asin,
					 keyword: this.keyword_array[i].keyword,
					 kw_tracking: this.kw_tracking_array[i+1].value,
					 mainscreen: this.kw_mainscreen[i+1].value,
					 mail: this.kw_mail[i+1].value,
					 achoice_tracking: this.kw_achoice[i+1].value,
					 }
				}).then (
				(response) => {

					
					
				},
				(err) => {
					console.log(err);
				}
				);
				};
					
					this.$router.push({ name: 'asin'});
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
 						this.keyword_array = this.old_keyword_array.slice();}
 					
 					else { /*
					this.eventhistory_array = this.event.filter(function(item) {
						
 					 	return item.keyword == sea;})*/
 					 	this.keyword_array = this.keywords.filter(function(value) {
 					 	return (pattern.test(value.keyword) || pattern.test(value.asin_tovar) || pattern.test(value.kw_tag) || pattern.test(value.kw_group));})
 					 	
				}
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

		.name{
			font-weight: bold;
		}

		td{
			font-family: verdana;
			font-size: 14px;
			text-align: center;
		}

		.w50{
			width: 120px;
		}

</style>