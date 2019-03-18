export default {

 	namespaced: true,

 	state:{
 		isMainPage: false,
		useremail: '',
		uid: '',
		user: null,
		items: {},
		addAsin: false,
		settings: false,
		addKeyWord: false
 		
 	},
 	getters:{
 		useremail(state){
			return state.useremail;
		},
		
		isMainPage(state) {
			return state.isMainPage;
		},
		uid(state){
			return state.uid;
		},
		addAsin(state) {
			return state.addAsin;
		}
		

 	},
 	mutations:{
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
		mainPage(state){
			//state.isMainPage = true; /*показывает главный экран*/
			authstate.state.signin = false;
			authstate.state.signoutbtn = true;
			authstate.state.signinbtn = false;
			state.isMainPage = true;
			//state.uid = uid;
			state.useremail = firebase.auth().currentUser.email;
		},
		signOut(state){
			console.log('кнопка нажата');
			console.log('выход');
			console.log(firebase.auth().currentUser);
          	state.isMainPage = false;
			authstate.state.signin = false;
			authstate.state.signinbtn = true;
			authstate.state.signoutbtn = false;
  			if (firebase.auth().currentUser == null){
			state.useremail = '';}
		},
		
	},
		actions: {
		signOutAct(){
			firebase.auth().signOut().then( () => {
				
				this.commit('signOut');
			}).catch(error =>  {
					console.log(error);
				});
			
		}
	}
}
	