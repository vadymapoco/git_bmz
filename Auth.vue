<template>
	<div class="container">
		<h1> Auth </h1> 
		{{logoutbtn}}

		<div id="email" v-if="!logoutbtn">
			<label>Email</label>
			<input id="txtEmail" type="email"  v-model="email" size="40"></input></div>
		<div v-if="!logoutbtn">
			<label>Password</label>
			<input id="txtPassword" type="text" v-model="pass" size="40"></input></div>
		<button id="btnLogin" class="btn btn-action"
				@click="login"
				v-if="!logoutbtn"> Log in</button>
		<button id="bthSignUp" class="btn btn-secondary" @click="signup">Sign Up</button>
		<button id="userInfo" class="btn btn-secondary" @click="user">User info</button>
		<button id="btnLogout" class="btn btn-action" v-if="logoutbtn" @click="logout">Log out</button>
	</div>

</template>

<script>
	import {mapMutations} from 'vuex';

	export default {
		data(){
			return{
				//logoutbtn: false,
				email: "vadym.kulikov@gmail.com",
				pass: "123456",
				
			}
		},
		props:{
			
			
			
		},

		computed: {
			logoutbtn(){
				return this.$store.state.logoutbtn;
			}
		},

		methods:{
			login(){
				//console.log(this.email+ '  ' +this.pass);
				const auth = firebase.auth();
				
				auth.signInWithEmailAndPassword(this.email,this.pass)
				.then(() => {
					
					auth.onAuthStateChanged((user)=>{
					if (user!= null){
					this.$store.commit('logbtntrue');} //выполняет метод для изменения состояния logoutbtn на складе
					else {
					this.$store.commit('logbtnfalse');;
					}
					});
				})
				.catch((error) => {
					console.log(error.message);
					console.log(error.code);
					
				});
				
				
					
				
			},
			signup(){
				const auth = firebase.auth();
				auth.createUserWithEmailAndPassword(this.email,this.pass);
			},
			logout(){
				const auth = firebase.auth();
				auth.signOut()
				.then(function() {
					 // console.log(user.email);
					 // console.log(user);

				})
				.catch(function(error) {});
				//this.logoutbtn = false;
				

			},
			user(){
				const auth = firebase.auth();
				let user = auth.currentUser;
				if (user!= null){
					console.log(user.displayName);
					console.log(user.email);
					console.log(user);
					console.log(user.getIdToken());
				//	this.logoutbtn = true;
				}
				else {
					console.log('User is not sign in');
				}
			}

     },

}


</script>

<style scoped>
	#email{
		width: 900px;
	}

</style>