import Vue from 'vue';



export default {

 	namespaced: true,

 	state:{
 		current_plan: [],
 		plan_name: '',
 		plan_cost: 0,
 		asin_qw: 0,
 		kw_qw: 0,
 		kw_track_qw: 0,
 		notific_qw: 0


 	},
 	getters:{
 			current_plan(state){
 				return state.current_plan;
 			},
 			
 			plan_name(state){
 				return state.plan_name;
 			},
 			plan_cost(state){
 				return state.plan_cost;
 			},
 			asin_qw(state){
 				return state.asin_qw;
 			},
 			kw_qw(state){
 				return state.kw_qw;
 			},
 			kw_track_qw(state){
 				return state.kw_track_qw;
 			},
 			notific_qw(state){
 				return state.notific_qw;
 			},
 			

 		},

 	mutations:{
 		lookplan(state,value){
 				console.log(' look plan mutations');
 				console.log(value);
 				state.current_plan = value;
 				state.plan_name = (value[0].plan_name);
 				state.plan_cost = (value[0].plan_cost);
 				state.asin_qw = (value[0].asin_qw);
 				state.kw_qw = (value[0].kw_qw);
 				state.kw_track_qw = (value[0].kw_track_qw);
 				state.notific_qw = (value[0].notific_qw);
 			},

 		},

 	actions: {
 		
		lookplan(store){
			console.log('выполняем settingss/lookplan action - получаем данные по текущему тарифному плану');
			console.log (this.getters['authstate/user_plan']);
			
				//var uid = this.$store.getters.uid;
				Vue.http.get('http://bsr-consulting.com/alex.php', {
					params: {   lookplan : 'lookplan',
								//plan: 'basic+'
								plan: this.getters['authstate/user_plan'],
							}
				}).then (
				(response) => {
					console.log('.then lookplan action');
					store.commit('lookplan', response.data);
				},
				(err) => {
					console.log(err);
				}
				);},



		changeplan(store, value){
			console.log('выполняем settingss/change plan action');
			console.log(value);
				let id = this.getters.uid;
				//var uid = this.$store.getters.uid;
				Vue.http.get('http://bsr-consulting.com/alex.php', {
					params: {   changeplan : 'changeplan',
								uid: this.getters.uid,
								new_plan: value
							}
				}).then (
				(response) => {

					console.log('.then changeplan action - вызываем authstate/plan_name action');
					this.dispatch('authstate/plan_name', id);
					this.commit('authstate/user_plan_changed', true);
					//store.dispatch('lookplan');

					//store.commit('lookplan', response.data);
				},
				(err) => {
					console.log(err);
				}
				);
			},
		}
 	}


