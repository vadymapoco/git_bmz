import Vue from 'vue';


export default {

 	namespaced: true,

 	state:{
 		event: [],
 		eventhistory : []
 	},

 	getters:{
		event(state){
 			return state.event;
 		},
 		eventhistory(state){
 			return state.eventhistory;
 		},
 		event_filter:(state) => (asin) => {
 				return state.event.filter(item => asin.asin_tovar == this.asin);
 		},
 		eventhistory_filtered:(state) => (asin) =>{
 				return state.eventhistory.filter(item => asin.asin_tovar == this.asin);
 		},
 		eventhistory_filtered_keyword:(state) => (key) =>{
 			
 				return state.eventhistory.filter(item => item.keyword == this.key);
 		},
 	},
 	mutations:{
 		lookevent(state,value){
 				console.log('event mutation');
 				console.log(value);
 				state.events = value;
 			},
 		eventhistory(state,value){
 			console.log('eventhistory mutation');
 			state.eventhistory = value;
 			console.log(value);
 		},
 		SortAsinASC(state){
 			var funct =	function compareNumeric(a, b) {
 					 if (a.asin > b.asin) return 1;
 					 if (a.asin < b.asin) return -1;
					}


				console.log('mutation sortirovka');
				state.eventhistory.sort(funct);
 		},
 		SortAsinDESC(state){
 			var funct =	function compareNumeric(a, b) {
 					 if (a.asin < b.asin) return 1;
 					 if (a.asin > b.asin) return -1;
					}


				console.log('mutation sortirovka');
				state.eventhistory.sort(funct);
 		},
 		SortKeywordASC(state){
 			var funct =	function compareNumeric(a, b) {
 					 if (a.keyword > b.keyword) return 1;
 					 if (a.keyword < b.keyword) return -1;
					}


				console.log('mutation sortirovka');
				state.eventhistory.sort(funct);
 		},
 		SortKeywordDESC(state){
 			var funct =	function compareNumeric(a, b) {
 					 if (a.keyword < b.keyword) return 1;
 					 if (a.keyword > b.keyword) return -1;
					}


				console.log('mutation sortirovka');
				state.eventhistory.sort(funct);
 		},
 		SortDateStartASC(state){
 			var funct =	function compareNumeric(a, b) {
 					 if (a.start_date > b.start_date) return 1;
 					 if (a.start_date < b.start_date) return -1;
					}


				console.log('mutation sortirovka');
				state.eventhistory.sort(funct);
 		},
 		SortDateStartDESC(state){
 			var funct =	function compareNumeric(a, b) {
 					 if (a.start_date < b.start_date) return 1;
 					 if (a.start_date > b.start_date) return -1;
					}


				console.log('mutation sortirovka');
				state.eventhistory.sort(funct);
 		},
 		SortDateEndASC(state){
 			var funct =	function compareNumeric(a, b) {
 					 if (a.end_date > b.end_date) return 1;
 					 if (a.end_date < b.end_date) return -1;
					}


				console.log('mutation sortirovka');
				state.eventhistory.sort(funct);
 		},
 		SortDateEndDESC(state){
 			var funct =	function compareNumeric(a, b) {
 					 if (a.end_date < b.end_date) return 1;
 					 if (a.end_date > b.end_date) return -1;
					}


				console.log('mutation sortirovka');
				state.eventhistory.sort(funct);
 		}


 		 


	},
	actions: {
		/* получение из таблицы ключевых слов всех слов*/
		lookevent(store){
			    console.log(' lookevent action');
				console.log(this.getters.current_asin.asin);

				Vue.http.get('http://bsr-consulting.com/alex.php', {
					params: {   lookevent : 'lookevent',
								uid: this.getters.uid,
								current_asin: this.getters.current_asin.asin
							}
				}).then (
				(response) => {

					store.commit('lookevent', response.data);
				},
				(err) => {
					console.log(err);
				}
				);
			},
		lookasineventhistory(store){
				console.log('lookeventhistory action');
				//console.log(this.getters['keywords/current_keyword']);
				console.log(this.getters.current_asin.asin);
				Vue.http.get('http://bsr-consulting.com/alex.php', {
					params: {   lookasineventhistory : 'lookasineventhistory',
								uid: this.getters.uid,
								current_asin: this.getters.current_asin.asin
							}
				}).then (
				(response) => {

					store.commit('eventhistory', response.data);
				},
				(err) => {
					console.log(err);
				}
				);
			},

		lookasineventhistory_all(store){
				console.log('выполнение events/lookeventhistory_all action');
				//console.log(this.getters['keywords/current_keyword']);
				console.log(this.getters.current_asin.asin);
				Vue.http.get('http://bsr-consulting.com/alex.php', {
					params: {   lookasineventhistory_all : 'lookasineventhistory_all',
								uid: this.getters.uid,
								
							}
				}).then (
				(response) => {

					store.commit('eventhistory', response.data);
				},
				(err) => {
					console.log(err);
				}
				);
			},


	},
	
}
	