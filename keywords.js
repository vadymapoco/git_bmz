import Vue from 'vue';


export default {

 	namespaced: true,

 	state:{
 		keywords: [],
 		current_keyword: [],
 		keywordhistory : [],
 		asin: '',
 		allkeyword_quant: 0,
 		totaltrackingkwselect: 0, //счетчик выделенных ключевых слов
 		

 	},
 	getters:{
 		asin(state){
 			return state.asin;
 		},
 		keywords(state){
 			return state.keywords;
 		},
 		current_keyword(state){
 			return state.current_keyword;
 		},
 		keywordhistory(state){
 			return state.keywordhistory;
 		},
 		key: function (state, getters) {
 			return getters.asin;
 		}, 
 		//возвращает отфильтрованный массив по конкретному Асину
 		keyword_filter:(state) => (asin) => {
 				return	state.keywords.filter(item => asin.asin_tovar == this.asin);
 		},
 		/*
 		keyword_filter(state) {
 				return function(asin)  {
 				return state.keywords.filter(item => asin.asin_tovar == this.asin);}
 		},*/

 		keywordlist: state => asin => {
 			return state.keywords.filter(asin => asin.asin_tovar == asin);
 		},
 		allkeyword_quant(state){
 			return state.allkeyword_quant;
 		},
 		totaltrackingkwselect(state){
 			return state.totaltrackingkwselect;
 		}
 		
 		

 		
 	},
 	mutations:{
 		lookkeyword(state,value){
 				console.log('keyword mutation');
 				console.log('keyword array');
 				console.log(value);
 				state.keywords = value;
 				
 			},
 		lookallkeyword(state,value){
 				console.log('all keyword mutation');
 				console.log('all keyword array');
 				console.log(value);
 				state.keywords = value;
 				var x = 0;
 				for(let i=0; i<value.length; i++){

 					if (value[i].kw_tracking == 'true') {
 						x = x +1;

  			 };
  			};
  			state.totaltrackingkwselect = x;
 			},

 		change_kw_tracking_quant(state,value){
 			state.totaltrackingkwselect = state.totaltrackingkwselect + value;
 		},
 		current_keyword(state,value){
 			console.log('current keyword mutation');
 			console.log(value);
 			state.current_keyword = value.keyword;
 			console.log(this.getters.current_asin.asin);
 			console.log(this.getters['keywords/current_keyword']);
 		},
 		lookkwhistory(state,value){
 			console.log('lookkwhistory mutation');
 			state.keywordhistory = value;
 			console.log(value);
 		},
 		setkeyword(state, value){
 			console.log('setkeyword mutation');
 			console.log(value);
 			state.keyword = value;
 		},
 		allkeyword_quant(state,value){
 			state.allkeyword_quant = value.length;
 		},
 		clearCurrentKeyword(state){
 			state.current_keyword = null;
 		}
 	


	},
	actions: {
		/* получение из таблицы ключевых слов всех слов*/
		lookkeyword(store, item){
			    console.log(' look keyword action');
			   
			    console.log(item);
				console.log(this.getters.current_asin);

				Vue.http.get('http://bsr-consulting.com/alex.php', {
					params: {   lookkeyword : 'lookkeyword',
								uid: this.getters.uid,
								//current_asin: this.getters.current_asin.asin
								current_asin: item.asin
							}
				}).then (
				(response) => {
					console.log ('данные вернулись из таблицы');
					store.commit('lookkeyword', response.data);

				},
				(err) => {
					console.log(err);
				}
				);
			},

		lookallkeyword(store){
			    console.log('выполнение keywords/look all keyword action');
				//console.log(this.getters.current_asin.asin);

				Vue.http.get('http://bsr-consulting.com/alex.php', {
					params: {   lookallkeyword : 'lookallkeyword',
								uid: this.getters.uid,
							}
				}).then (
				(response) => {

					store.commit('lookallkeyword', response.data);
				})
				.then (
				(response) => {

					//this.commit('currentAsinZerro'); //
				},
				(err) => {
					console.log(err);
				}
				);
			},

		allkeyword_quant(store){
				console.log('выполнение keywords/allkeyword_quant action');
				Vue.http.get('http://bsr-consulting.com/alex.php', {
					params: {   lookallkeyword : 'lookallkeyword',
								uid: this.getters.uid,
							}
				}).then (
				(response) => {

					store.commit('allkeyword_quant', response.data);
				},
				(err) => {
					console.log(err);
				}
				);
			},
			
		lookkwhistory(store){
				console.log('lookkwhistory action');
				Vue.http.get('http://bsr-consulting.com/alex.php', {
					params: {   lookkwhistory : 'lookkwhistory',
								uid: this.getters.uid,
								current_keyword: this.getters['keywords/current_keyword']
							}
				}).then (
				(response) => {

					store.commit('lookkwhistory', response.data);
				},
				(err) => {
					console.log(err);
				}
				);
			},


	},
	
}
	