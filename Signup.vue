<template>

  <v-content>

      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md6 lg4>
            <v-card class="elevation-12">
              <v-toolbar dark color="green">
                <v-toolbar-title> Sign Up form</v-toolbar-title>
                <v-spacer></v-spacer>
                
              </v-toolbar>
              <v-card-text>
                  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field 
      prepend-icon="person"
      v-model="user.email"
      :rules="[rules.emailrequired, rules.emailRules, rules.required]"
      counter
      label="User email"
      required
    ></v-text-field>
    <v-text-field
      prepend-icon="lock"
      :append-icon="show1 ? 'visibility_off' : 'visibility'"
      :type="show1 ? 'text' : 'password'"
      v-model="user.password"
      :rules="[rules.passrequired, rules.minpass, rules.pass, rules.required]"
      label="Password"
      counter
      required
      @click:append="show1 = !show1"
    ></v-text-field>

    <v-text-field
      prepend-icon="lock"
      :append-icon="show2 ? 'visibility_off' : 'visibility'"
      :type="show2 ? 'text' : 'password'"
      :rules="[rules.required]"
      v-model="user.confirmPassword"
      label="Password"
      counter
      required
      @click:append="show2 = !show2"
    ></v-text-field>

    <v-btn
      :disabled="!valid"
      @click="submit"
    >
      Sign Up
    </v-btn>
    <v-btn @click="clear">clear</v-btn>
    <v-btn @click="signIn">Sign In</v-btn>
  </v-form>
               
              </v-card-text>
             
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
	
</template>

<script>
  
import {mapMutations} from 'vuex';

	export default {
      data(){
          return {
          	error1: false,
          	error2: false,
          	user: {
          		email: '',
          		password: '',
          		confirmPassword: ''
          	},
            valid: false,
            show1: false,
            show2: false,
            rules: {
                    required: value => !!value || 'Required',
                    passrequired: value => !!value || 'Min 6 character & number.',
                    min: v => v.length >= 8 || 'Min 8 characters',
                    emailrequired: v => !!v || 'E-mail is required',
                    emailRules:    v => /.+@.+/.test(v) || 'E-mail must be valid',
                    minpass: v => v.length >= 6 || 'Min 6 characters',
                    pass: v=> /\d/.test(v)|| 'Min 1 number'           
                  }
                    }
      },

      created(){
        console.log('App signup');
      },
      computed:{ 
        signinbtn(){
        return this.$store.getters['authstate/signinbtn'];
        }
      },
      methods:{
        ...mapMutations('authstate',{
              signIn: 'signIn', 
           }),
          clear(){
               this.$refs.form.reset()
            },
            submit(){
                 if (this.$refs.form.validate()) {
                         if (this.user.password === this.user.confirmPassword) 
                          {this.registerUser()}
                        else console.log('Check the password'); //Сделать какое то сообщение для пользователя
                  //
                  }
            },

      		registerUser(){
      			
      			if (this.user.password !== this.user.confirmPassword) {
      				this.error1 = true;
      				this.error2= false;}
      			else 
      				if (this.user.password.length <6) {
      				this.error2 = true;
      				this.error1 = false;}
      			
      			else {
      				this.error1 = false;
      				this.error2= false;
      				console.log('Ok');
      				firebase.auth().createUserWithEmailAndPassword(this.user.email,this.user.password).
      				then( () => {
      					this.$store.commit('signin');//изменил свойство в сторе

      				})
      				.catch( error =>  {
      					console.log(error);
      				})
      			}	
      			}
      }



	}

</script>