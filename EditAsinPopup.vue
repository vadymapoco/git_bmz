<template>
	<div class="container asin">
		
		<div id="mypopup" class="popup" @click="closeall($event)">
			<div class="popup-content" >
				<div class="content">
					<div class="popup-header">
						<h3>Edit ASIN</h3>
						
						
					</div>	
					<div class="popup-body">
						<div>


							<img :src="asin_img" width="70" height="70" alt=" no image">
							<label> {{asin_title}} </label>
							<b-form-textarea  plaintext :value = "asin_name">

							</b-form-textarea>
						</div>

						<div>
							<label> ASIN title</label>
							<input type="text" placeholder="Title" size="50" v-model="asin_title">
						</div>
						
						<div>
							<label> Tag </label>
							

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
							<label> Group tovar </label>


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
						
						
						
						
						
						

					</div>
				</div>
				<div class="popup-footer">
					<button class="btn btn-outline-success"
							@click="updateAsin"
										>Ok</button>
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
import bFormTextarea from 'bootstrap-vue/es/components/form-textarea/form-textarea';
import bContainer from 'bootstrap-vue/es/components/layout/container';
import bRow from 'bootstrap-vue/es/components/layout/row';
import bCol from 'bootstrap-vue/es/components/layout/col';

export default{

	 components: {
   	 'b-form-select': bFormSelect,
   	 'b-container': bContainer,
   	 'b-form-textarea' :  bFormTextarea,
    'b-row': bRow,
    'b-col': bCol
   	},

	data(){
		return{
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
			}
		},

	created(){
		console.log('created');
		console.log(this.$store.getters.current_asin);
		this.asin_img = this.$store.getters.current_asin.image_src;
		this.asin_name = this.$store.getters.current_asin.asin;
		this.asin_title = this.$store.getters.current_asin.title;
		this.selectedTag =  this.$store.getters.current_asin.tag;
		this.selectedGroup =  this.$store.getters.current_asin.group_tovar;
		
		console.log('asinmenu/looktag actions');
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
			this.$store.commit('editAsinPopupClose');},

		closeall(e){    /*проверяет в какой области был клик мышкой. Если клик мимо модального окна - закрывает  окно*/
			//console.log(e.target); 
			if (e.target.id == "mypopup"){
				//console.log(e.target);
				this.$store.commit('editAsinPopupClose');	
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

		updateAsin(){
			console.log('update ASIN');
				Vue.http.get('http://bsr-consulting.com/alex.php', {
					params: 
					{ updateasin : 'updateasin',
					 id_tovar: this.$store.getters.current_asin.id_tovar,
					 uid: this.$store.getters.uid,
					 asin: this.asin_name,
					 tag: this.selectedTag,
					 title: this.asin_title,
					 asin_group: this.selectedGroup}
				}).then (
				(response) => {
					console.log('update ASIN success');
					this.$store.dispatch('asinmenu/lookasin');
					this.$store.commit('editAsinPopupClose');
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

	



		
</style>