<template>
  <div>
  <v-content>

      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-12">
              <v-toolbar dark color="green">
                <v-toolbar-title> Login form</v-toolbar-title>
                <v-spacer></v-spacer>
                
              </v-toolbar>
              <v-card-text>
                  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field 
      prepend-icon="person"
      v-model="user.email"
      :rules="[rules.emailrequired, rules.emailRules]"
      counter
      label="User email"
      required
    ></v-text-field>
    <v-text-field
      prepend-icon="lock"
      :append-icon="show1 ? 'visibility_off' : 'visibility'"
      :type="show1 ? 'text' : 'password'"
      :rules="[rules.required, rules.minpass]"
      v-model="user.password"
      label="Password"
      counter
      required
      @click:append="show1 = !show1"
    ></v-text-field>

    <v-btn
      :disabled="!valid"
      @click="submit"
    >
      Login
    </v-btn>
    <v-btn @click="clear">clear</v-btn>
    <v-btn @click="signUp">Sign Up</v-btn>
  </v-form>
               
              </v-card-text>
             
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

  </div>
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
  valid: false,
  show1: false,
  rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailrequired: v => !!v || 'E-mail is required',
          emailRules:    v => /.+@.+/.test(v) || 'E-mail must be valid',
          minpass: v => v.length >= 6 || 'Min 6 characters'           
        }
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
clear(){
   this.$refs.form.reset()
},

submit(){
         if (this.$refs.form.validate()) {
          this.enterUser();}
},
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
      console.log('вызов authfirst mutation');

      this.$store.commit('authstate/authfirst', sett);
      
      return true;
      //console.log ( this.$store.uid );
		})
    .then( (data) => {console.log('App Signin - 2-й промис');
       
        console.log(data);

        console.log('вызов asinmenu/lookasin action');
        this.$store.dispatch('asinmenu/lookasin');

        
      })
      .then( () => { 
              console.log('.then во втором промисе');
              
              this.$store.dispatch('authstate/plan_name');
              

  }).then( () => {
        console.log('App Signin 3-й промис');
        
        console.log(' вызов authstate/mainPage mutation');
        this.$store.commit('authstate/mainPage');
  }).
    then(  response => {console.log('App Signin 4-й промис');
         console.log('вызов authstate/plan_name action');
         this.$store.dispatch('authstate/plan_name').then( () => { 
            console.log('.then в четвертом промисе');
            
        }) ;
  }).
    then(  response => {console.log('App Signin 5-й промис');
         
            
        
  })
		.catch( error =>  {
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