export default {

 	namespaced: true,
 	state:{
 		users: getUsers()
 	},
 	getters:{
 		users(state){
 			return state.users;
 		}	
 		}
 	}


function getUsers(){
	return {
		1:{
			id_user: 1,
			login_user: "user1",
			email: "123@gmail.com",
			plan_user: "basic",
		},
		2:{
			id_user: 2,
			login_user: "user2",
			email: "proper@gmail.com",
			plan_user: "pro"
		},
		3:{
			id_user: 3,
			login_user: "user3",
			email: "paper@gmail.com",
			plan_user: "ultra"
		}
	}
}
