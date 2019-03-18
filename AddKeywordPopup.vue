<template>
	<div class="container asin">
		
		<div id="mypopup" class="popup" @click="closeall($event)">
			<div class="popup-content" >
				<div class="content">
					<div class="popup-header">
						<h3>Add new Keyword</h3>
						
						
					</div>	
					<div class="popup-body">
						<div>
							<label> ASIN </label>
							{{$store.getters.current_asin.asin}}
						</div>

						<div>
							<label> ASIN title</label>
							{{$store.getters.current_asin.title}}
						</div>

						<div>
							<label> ASIN Keyword</label>
							<p>
							<textarea class="groupKeyword" name="keyword" v-model="keyword" placeholder="input new keywords"></textarea>
							</p>
						</div>
						
						<div>
							<label> Keyword Tag </label>
							

							<b-form-select  v-model="selectedTag"  @input="tag">

							<template slot="first">
							<option value="null" disabled>Please select an tag</option>
							<option value="">None</option>
							<option value="new">Add new Tag</option>
							</template>	

									<option v-for="tag in optionsTag"
											:value = "tag.tag_name">
											{{tag.tag_name}}
									</option>

							</b-form-select>
							<div v-if="newTag">
								<input type="text" placeholder="tag" size="20" v-model="asin_tag">
								<button class="btn btn-primary" @click="addnewTag"> Add tag</button>
								<button class="btn btn-primary" @click="canceladdnewTag"> Cancel</button>
							</div>
							
						
						</div>
						<div>
							<label> Keyword group </label>


							<b-form-select  v-model="selectedGroup"  @input="group">

							<template slot="first">
							<option value="null" disabled>Please select an group</option>
							<option value="">None</option>
							<option value="new">Add new Group</option>
							</template>	

									<option v-for="group in optionsGroup"
											:value = "group.name_group">
											{{group.name_group}}
									</option>

							</b-form-select>
							<div v-if="newGroup">
								<input type="text" placeholder="group" size="20" v-model="asin_group">
								<button class="btn btn-primary" @click="addnewGroup"> Add group</button>
								<button class="btn btn-primary" @click="canceladdnewGroup"> Cancel</button>
							</div>
						</div>
						
						<b-form-group>
						
							<b-form-checkbox-group id="checkbox1" v-model="selected">
							    <b-form-checkbox  value="tracking">
							      Tracking keyword position
							    </b-form-checkbox>
						   		<b-form-checkbox  value="choice">
							      Tracking amazon choice status
							    </b-form-checkbox>
						        <b-form-checkbox  value="mainscreen">
							      Add keyword to the mainscreen
							    </b-form-checkbox>
						        <b-form-checkbox  value="notification">
								      Send notification of this keyword
								    </b-form-checkbox>
							</b-form-checkbox-group>

					</b-form-group>
<div>Selected: <strong>{{ selected }}</strong></div>
					</div>
				</div>
				<div class="popup-footer">
					<button class="btn btn-outline-success"
							@click="addGroupKeywords"
										>Add Keyword</button>
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
import bFormGroup from 'bootstrap-vue/es/components/form-group/form-group';
import bFormCheckbox from 'bootstrap-vue/es/components/form-checkbox/form-checkbox';
import bFormCheckboxGroup from 'bootstrap-vue/es/components/form-checkbox/form-checkbox-group';

export default{

	 components: {
   	 'b-form-select': bFormSelect,
   	 'b-container': bContainer,
    'b-row': bRow,
    'b-col': bCol,
    'b-form-group' : bFormGroup,
    'b-form-checkbox' : bFormCheckbox,
    'b-form-checkbox-group' : bFormCheckboxGroup,
   	},

	data(){
		return{
			keyword: '',
			tags:[],
			newTag: false,
			asin_name : '',
			asin_title : '',
			asin_tag: '',
			asin_group: '',
			selectedTag: null,
			optionsTag: [
		        
		    /*    { value: 'b', text: 'Selected Option' },
		        { value: {'C': '3PO'}, text: 'This is an option with object value' },
		        { value: 'd', text: 'This one is disabled', disabled: true }*/
		      ],
		     optionsGroup: [],
		     selectedGroup: null,
		     newGroup: false,
		     selected: [],
		     groupKeywords: [], //массив ключевых слов после разделения строки группы ключевых слов
			}
		},

	created(){

		console.log('created');
		console.log('asinmenu/looktag actions');
		this.$store.commit('poletagsort', 'tag_name ASC');
		this.$store.commit('polegroupsort', 'name_group ASC');
   		this.$store.dispatch('asinmenu/looktag'); 
   		this.$store.dispatch('asinmenu/lookgroup'); 
   		
			 setTimeout(() => {
   					 console.log('запускаем метод addTagArray');
   					 this.optionsTag  = this.$store.getters['asinmenu/tags'];
   					 this.optionsGroup  = this.$store.getters['asinmenu/groups'];
   					 /*this.addTagArray();*/
				}, 500);

   		/*this.addTagArray(); /*не работает, потому что этот метод запускается раньше получения данных*/
   	},

	methods:{
	/*	close(){
			this.popupStyles.popupOpen = false;
			this.popupStyles.popupClose = true;
		}*/
		addTagArray(){
			if (this.tags.length>0){
				for (var i=0; i<this.tags.length; i++){

			this.optionsTag.push({value: this.tags[i].tag_name, text: this.tags[i].tag_name })
			}
		}
		},
		/* закрытие этого всплывающего окна по нажатию на кнопке или вне окна*/ 
		close(){
			this.$store.commit('addKeywordPopupClose');},

		closeall(e){    /*проверяет в какой области был клик мышкой. Если клик мимо модального окна - закрывает  окно*/
			//console.log(e.target); 
			if (e.target.id == "mypopup"){
				//console.log(e.target);
				this.$store.commit('addKeywordPopupClose');	
			}
		},
		
		tag(){
				
			console.log(this.selectedTag);
			if (this.selectedTag == 'new') {
				console.log ('add new tag');
				this.newTag = true;
			}
		},

		group(){
				
			console.log(this.selectedGroup);
			if (this.selectedGroup == 'new') {
				console.log ('add new group');
				this.newGroup = true;
			}
		},
		canceladdnewTag(){
			this.newTag=false;
			this.selectedTag = null;
		},

		canceladdnewGroup(){
			this.newGroup=false;
			this.selectedGroup = null;
		},

		addnewTag(){
			this.newTag  = false;
				Vue.http.get('http://bsr-consulting.com/alex.php', {
					params: 
					{ addasintag : 'addasintag',
					 uid: this.$store.getters.uid,
					 asin_tag: this.asin_tag}
				}).then (
				(response) => {
					console.log('новый тег записан в таблицу');
					this.$store.dispatch('asinmenu/looktag'); 
	   			    setTimeout(() => {
   					 console.log('запускаем метод addTagArray');
   					 this.optionsTag  = this.$store.getters['asinmenu/tags'];
   					 this.selectedTag = this.asin_tag;
   					 /*this.addTagArray();*/
				}, 500);
				},
				(err) => {
					console.log(err);
				}
				);
			
		},

		addnewGroup(){
			this.newGroup  = false;
				Vue.http.get('http://bsr-consulting.com/alex.php', {
					params: 
					{ addasingroup : 'addasingroup',
					 uid: this.$store.getters.uid,
					 asin_group: this.asin_group}
				}).then (
				(response) => {
					console.log('новая группа записана в таблицу');
					this.$store.dispatch('asinmenu/lookgroup'); 
	   			    setTimeout(() => {
   					 
   					 this.optionsGroup  = this.$store.getters['asinmenu/groups'];
   					 this.selectedGroup = this.asin_group;
   					 /*this.addTagArray();*/
				}, 500);
				},
				(err) => {
					console.log(err);
				}
				);
			
		},

		addGroupKeywords(){//наверное можно оптимизировать код работы со строками и регулярками
				console.log('addGroupKeywords');
				console.log(this.keyword);
				var newkeywordstring = this.keyword.toLowerCase();
				console.log(newkeywordstring);
				var new2keywordstring = newkeywordstring.replace(/\n/g, ",");
				console.log(new2keywordstring);
				new2keywordstring = new2keywordstring.replace(/^\s*/,'').replace(/\s*$/,'');
				console.log(new2keywordstring);
				var regul = /\s*,\s*/;
				this.groupKeywords = new2keywordstring.split(regul);
				
				console.log(this.groupKeywords);
				
				for (var i=0; i< this.groupKeywords.length; i++){
					if (this.groupKeywords[i] !== ''){
					this.addnewKeyword(this.groupKeywords[i]);}
				}
		},

		/* добавление в таблицу БД нового ключевого слова*/
		addnewKeyword(keywords){
			if (this.selected.indexOf('mainscreen') !== -1) var mainscreen = true;
			else var mainscreen = false;
			if (this.selected.indexOf('tracking') !== -1) var kw_tracking = true;
			else var kw_tracking = false;
			if (this.selected.indexOf('choice') !== -1) var choice = true;
			else var choice = false;
			if (this.selected.indexOf('notification') !== -1) var notification = true;
			else var notification = false;

			  console.log('add keyword');
				Vue.http.get('http://bsr-consulting.com/alex.php', {
					params: 
					{ addkeyword : 'addkeyword',
					uid: this.$store.getters.uid,
					asin: this.$store.getters.current_asin.asin,
					keyword: keywords,
					mainscreen : mainscreen,
					kw_tracking: kw_tracking,
					choice: choice,
					notification: notification, 
					//kw_tag: '',
					//kw_group: ''
					}
				}).then (
				(response) => {
					this.$store.commit('addKeywordPopupClose');
					this.$store.dispatch('keywords/lookkeyword');
					
				},
				(err) => {
					console.log(err);
				}
				);
			}
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

	.groupKeyword {
		border: 1px solid red;
		width: 200px;
		min-height: 100px
	}

	



		
</style>