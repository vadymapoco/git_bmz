import Vue from 'vue';


export default {

 	namespaced: true,

 	state:{
 		
 	},
 	getters:{
 		
 		
 	},
 	mutations:{
 		lookkeyword(state,value){
 				console.log('keyword mutation');
 				console.log('keyword array');
 				console.log(value);
 				state.keywords = value;
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
 		}
 		


	},
	actions: {
		/* получение из таблицы ключевых слов всех слов*/
		lookkeyword(store){
			    console.log(' look keyword action');
				console.log(this.getters.current_asin.asin);

				Vue.http.get('http://bsr-consulting.com/alex.php', {
					params: {   lookkeyword : 'lookkeyword',
								uid: this.getters.uid,
								current_asin: this.getters.current_asin.asin
							}
				}).then (
				(response) => {

					store.commit('lookkeyword', response.data);
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
	