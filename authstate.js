import Vue from 'vue';
import Vuex from 'vuex';

import {serverUrl} from './config.js';

import asinmenu from './asinmenu';

export default {

 	namespaced: true,

 	modules:{
		asinmenu
		
	},

 	state:{
 		signin: false,  /* статус показа формы/модуля аутентификации в компоненте App*/
 		signup: false,  /* статус показа формы/модуля регистрации в компоненте App*/
 		signoutbtn: false, /*показывать кнопку выхода*/
 		signinbtn: true, /*показывать кнопку входа*/
		signupbtn: true, /*показывать кнопку регистрации*/
		isMainPage: false, /* статус показа модуля главной страницы в компоненте App */
		fire_email: '',  /*  */
		useremail: '',  /*  */
		user_plan: '', /*план подписки пользователя*/
		user_plan_changed: false,
 	},
 	getters:{
 		signup(state) {
			return state.signup;
		},
		signin(state) {
			return state.signin;
 		},
 		signoutbtn(state) {
			return state.signoutbtn;
		},
		signinbtn(state) {
			return state.signinbtn;
		},
		signupbtn(state) {
			return state.signupbtn;
		},
		isMainPage(state) {
			return state.isMainPage;
		},		
		fire_email(state) {
			return state.fire_email;
		},
		useremail(state){
			return state.useremail;
		},
		user_plan(state){
			return state.user_plan;
		}

 	},
 	mutations:{
 		signIn(state){
 			console.log('выполнение signIn mutation - вход');
			state.signin = true;
			state.signup = false;
			state.signinbtn= false;
			state.signupbtn= true;
			console.log('Current user - ' +firebase.auth().currentUser);
		},
		signUp(state){
			console.log('выполнение signUp mutation - регистрация');
			state.signup = true;
			state.signin = false;
			state.signinbtn = true;
			state.signoutbtn = false;
			state.signupbtn = false; /*скрывает кнопку регистрации*/
		},
		signOut(state){
			console.log('выполнение signOut mutation - выход');
			//console.log(this);
			//console.log(asinmenu.state.asins);
          	state.isMainPage = false;
			state.signin = false;
			state.signinbtn = true;
			state.signoutbtn = false;
			state.signupbtn = true; /*показывает кнопку регистрации*/
			asinmenu.state.asins = [];
			asinmenu.state.asinLoaded = false;
  			if (firebase.auth().currentUser == null){
			state.useremail = '';}
			
		},
		authfirst(state,sett){
			console.log('выполнение authstate/authfirst mutation - записываем в хранилище uid и email');
			state.fire_email = sett.email;/*нужно передать это значение*/
			state.useremail = firebase.auth().currentUser.email;
			/* обращение к главному складу*/
			this.state.uid = sett.uid; /*передает уникальный идентификатор пользователя*/
		},
		mainPage(state, sett){
			console.log('выполнение mainPage mutation - главный экран');
			//console.log('показываем главный экран - app mainPage');
			//console.log(this);
			state.signin = false;
			state.signoutbtn = true; /*показывает кнопку выхода*/
			state.signinbtn = false; /*скрывает кнопку входа*/
			state.signupbtn = false; /*скрывает кнопку регистрации*/
			//state.isMainPage = true; /*показывает главный экран*/

			//state.fire_email = sett.email;/*нужно передать это значение*/
			//state.useremail = firebase.auth().currentUser.email;
			/* обращение к главному складу*/
			//this.state.uid = sett.uid; /*передает уникальный идентификатор пользователя*/
		},
		lookplanname(state, value){
			console.log('lookplanname mutation');
			console.log('текущий план - '+ value);
			state.user_plan = value;
		},
		user_plan_changed(state, value) {
			state.user_plan_changed = value;
		},
		
		
},
		actions: {



		/* action для выхода пользователя посредством метода сервиса FireBase */
		signOutAct(store){
			firebase.auth().signOut().then( () => {
				
				store.commit('signOut');
			}).catch(error =>  {
					console.log(error);
				});
			
		},
		/* action для открытия формы входа пользователя */
		signIn(store){
			store.commit('signIn');
		},

		signUp(store){
			store.commit('signUp');
		},
/*
		plan_name (store, id){
			console.log('выполнение plan_name action - возвращает имя текущего плана');
				return new Promise ((resolve, reject) => {
				Vue.http.get('http://bsr-consulting.com/alex.php', {
					params: {   lookplanname : 'lookplanname',
								uid: this.state.uid
							},
				
						headers: {
							  'Access-Control-Allow-Origin': '*',
							}
							
	}).then (
				(response) => {
					console.log('.then plan_name action - lookplanname mutation')
					store.commit('lookplanname', response.data[0].plan_name);
					if (store.state.user_plan_changed) {
					this.dispatch('settingss/lookplan');
					store.commit('user_plan_changed', false); 
					}
				},
				(err) => {
					console.log(err);
				}
				);
			})
				
		},*/
		plan_name(store, id) {
			return new Promise ((resolve, reject) => {
				Vue.http.post(serverUrl + 'plan_name/' + this.state.uid)
				.then (
				(response) => {
					console.log('.then plan_name action - lookplanname mutation')
					store.commit('lookplanname', response.data[0].plan_name);
					if (store.state.user_plan_changed) {
					this.dispatch('settingss/lookplan');
					store.commit('user_plan_changed', false); 
					//console.log('plan_name_laravel');
					//console.log(response);
					}
				},
				(err) => {
					console.log(err);
				}
				);
			})
		}
	}
	
}
	




