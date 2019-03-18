import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

import topmenustate from './modules/topmenustate';
import topmenubuttonsstate from './modules/topmenubuttonsstate';
import leftmenustate from './modules/leftmenustate';
import users from './modules/users';
import authstate from './modules/authstate';
import mainscreenstate from './modules/mainscreenstate';
import asinmenu from './modules/asinmenu';
import keywords from  './modules/keywords';
import events from  './modules/events';
import data from  './modules/data';
import settingss from  './modules/settingss';

//import mainpagestate from './modules/mainpagestate';

export default new Vuex.Store({
	modules:{
		topmenustate,
		topmenubuttonsstate,
		leftmenustate,
		users,
		authstate,
		mainscreenstate,
		asinmenu,
		keywords,
		events,
		data,
		settingss
		//mainpagestate
	},
	state:{
		one: 'one',
		items: {},
		uid: '',  /*уникальный номер пользователя, получаем при регистрации. является главным ключем для всех данных пользователя*/
		user: null, /*данные пользователя из FireBase*/
		items: {},
		addAsin: false,
		settings: false,
		addKeyWord: false,
		fire_email: '',
		addAsinPopup: false, 
		addKeywordPopup:false,
		AddEventPopup: false,
		editAsinPopup: false,
		EditTagTable: false,
		polesort: 'tag',
		poletagsort: 'tag_name ASC',
		polegroupsort: 'name_group ASC',
		current_asin: [], /*текущий ASIN*/
		loading: false, /*состояние процесса загрузки данных из БД*/
		search_term: '' /*данные из строки поиска в верхнем меню*/

	},
	getters: {
		addAsin(state) {
			return state.addAsin;
		},
		addKeyWord(state) {
			return state.addKeyWord;
		},
		settings(state) {
			return state.settings;
		},
		fire_email(state) {
			return state.fire_email;
		},
		uid(state){
			return state.uid;
		},
		addAsinPopup(state){
			return state.addAsinPopup;
		},
		addKeywordPopup(state){
			return state.addKeywordPopup;
		},
		AddEventPopup(state){
			return state.AddEventPopup;
		},
		editAsinPopup(state){
			return state.editAsinPopup;
		},
		EditTagTable(state){
			return state.EditTagTable;
		},
		polesort(state){
			return state.polesort;
		},
		poletagsort(state){
			return state.poletagsort;
		},
		polegroupsort(state){
			return state.polegroupsort;
		},
		current_asin(state){
			return state.current_asin;
		},
		loading(state){
			return state.loading;
		},
		search_term(state){
			return state.search_term;
		}
		
	},
	mutations:{
		/* параметры кнопок верхнего меню, 
		но не помню как работают и зачем нужны*/
		addasintrue(state, value){
			state.addAsin = value;
		},
		addkeywordtrue(state, value){
			state.addKeyWord = value;
		},
		settingstrue(state, value){
			state.settings = value;
		},
		uidwrite(state){
			state.uid = 'uiddddd';
		},
		/* открытие и закрытие окна добавления нового товара */ 
		addAsinPopupOpen(state){
			state.addAsinPopup = true;
		},
		addAsinPopupClose(state){
			state.addAsinPopup = false;
		},
		addEventPopupOpen(state){
			state.AddEventPopup = true;
		},
		addEventPopupClose(state){
			state.AddEventPopup = false;
		},
		/* открытие и закрытие окна добавления ключевого слова*/
		addKeywordPopupOpen(state){
			state.addKeywordPopup = true;
		},
		addKeywordPopupClose(state){
			state.addKeywordPopup = false;
		},
		/* открытие окна редактирования списка тегов */
		EditTagTableOpen(state){
			state.EditTagTable = true;
		},
		EditTagTableClose(state){
			state.EditTagTable = false;
		},
		/* параметры сортировки товаров*/
		polesort(state, value){
			state.polesort = value;
		},
		/* параметры сортировки тегов товаров*/
		poletagsort(state, value){
			state.poletagsort = value;
		},
		/* параметры сортировки групп товаров*/
		polegroupsort(state,value){
			state.polegroupsort = value;
		},
		/*открывает окно редактирования ASIN*/
		editAsinPopupOpen(state, value){ 
			state.editAsinPopup = true; 
			state.current_asin = value; /*получает все параметры редактируемого товара*/
			console.log('editAsinpopup mutation');
			console.log(value);
		},
		/* закрывает окно редактирования товара */
		editAsinPopupClose(state){
			state.editAsinPopup = false;
		},
		keywordlist(state,value){
			console.log( ' выполняется мутация keywordlist');
			state.current_asin = value;
			console.log(value);
			console.log(` current asin - ${state.current_asin.asin}`);
		},
		currentAsinZerro(state){
			console.log('currentAsinZerro');
			state.current_asin = [];
		},
		search_term(state, value){
			state.search_term = value;
		},
		loading(state, value){
			state.loading = value;
		}
		

		
		
		
	},
	actions: {
		
		},

	

	strict: process.env.NODE_ENV !=='production'

});