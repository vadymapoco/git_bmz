<template>
	<form class="mt-5" @submit.prevent="enterUser">
		<div class="form-group">
			<label for="email"> Ваш email:</label>
			<input type="email" id="email" class="form-control" placeholder="Input your email:" required
			v-model="user.email">
		</div>
		<div class="form-group">
			<label for="password"> Введите пароль (минимум 6 символов):</label>
			<input type="text" id="password" class="form-control" placeholder="Input your password:" required
			v-model="user.password">
		</div>

    
		
		
		<div class="alert alert-danger" role="alert" v-if="error">
			<strong> O-o!</strong> Пароль неверный
		</div>
    <span class="signinclass"> 

		<button type="submit" class="btn btn-primary ">Sign In!</button></span>

    <button class="btn btn-outline-success" type="button"
                      v-if="signupbtn"
                      @click="signUp">Регистрация</button>


 
	</form>
  
</template>

<script>

import {mapMutations} from 'vuex';
import {mapGetters} from 'vuex';


	export default {
data(){
return {
	error: false,
	user: {
		email: 'vadym.kulikov@gmail.com',
		password: '123456',},
  data_loaded:false,
}
},

created(){
console.log('App signin');
},

beforeDestroy(){
console.log('beforeDestroy SignIn.vue');

},
computed: {

...mapGetters('authstate',{
      signupbtn: 'signupbtn'}),
/* тоже самое только записано по другому 
signupbtn(){
return this.$store.getters['authstate/signupbtn'];
},*/


},
methods:{
...mapMutations('authstate',{
      signUp: 'signUp'}),/*
...mapMutations('mainpagestate', {
      mainPage: 'mainPage'
}),*/

/*метод входа с помощью FireBase*/
enterUser(){
	
	if (this.user.password == "") {
		this.error = true;
    console.log(this.user.email);
    console.log(this.user.password);
    console.log('password');
		}
	else 
		if (this.user.email == "") {
    this.error = true;
    console.log(this.user.email);
    console.log(this.user.password);
    console.log('email');
    }
	
	else {
		this.error = false;
		
		console.log('Почта и пароль введены');

		 firebase.auth().signInWithEmailAndPassword(this.user.email,this.user.password).
		then( response => {
      console.log('App Signin - 1-й промис');
      console.log(response);
     // console.log(this.$store.state ['mainpagestate/uid']);
			const sett = {
          email: response.email,
          uid: response.uid
      };
     // console.log(this);
     //console.log(this.$store);
     // this.$store.state['mainpagestate/uid'] = response.uid;
     // this.$store.state.uid = response.uid;
     // this.$store.dispatch('authstate/plan_name', response.uid);
      
      console.log('вызов authfirst mutation');

      this.$store.commit('authstate/authfirst', sett);
      
     
      //console.log ( this.$store.uid );
		}).
    then( response => {console.log('App Signin - 2-й промис');
        console.log('вызов asinmenu/lookasin action');
        this.$store.dispatch('asinmenu/lookasin').then(() => { 
              console.log('.then во втором промисе');
              this.$store.dispatch('authstate/plan_name');
              
        },
         error => {
             console.log ('ERROR');
         }
        ) ; /*загружаем все товары */
  }).
/*

    then( response => {console.log('App Signin 3-й промис');
        console.log(' вызов authstate/mainPage mutation');
        this.$store.commit('authstate/mainPage');
  }).
    then(  response => {console.log('App Signin 4-й промис');
         console.log('вызов authstate/plan_name action');
         this.$store.dispatch('authstate/plan_name').then(() => { 
            console.log('.then в четвертом промисе');
            
        }) ;
  }).
    then(  response => {console.log('App Signin 5-й промис');
         
            
        
  })
		.*/catch( error =>  {
      this.error = true;
			console.log(error);
		})  
	}	
	}
      

    }

	}

</script>

<style scoped>

    .signinclass{
      margin-right: 100px;
      
    }


</style>