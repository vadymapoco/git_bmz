export default {

 	namespaced: true,

 	state:{
 		mainscreenstate: 'mainscreen'
 	},
 	getters:{
 		mainscreenstate(state){
 		return state.mainscreenstate;
 		}
 	},
 	mutations:{
 		mainscreen_addasin(state, asin){
 			console.log('mainsreenstate signout')
			state.mainscreenstate = 'addasin';
		}
		
	},
		actions: {
		signOutAct(store){
			firebase.auth().signOut().then( () => {
				
				store.commit('signOut');
			}).catch(error =>  {
					console.log(error);
				});
			
		}
	},
	
}
	