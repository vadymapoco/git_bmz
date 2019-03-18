<!-- файл входа/ управление всем приложением -->


<template>
	<v-app id="inspire">
    <v-layout row justify-center>
      <v-flex xs12 sm12 md12 lg11>
 <!-- меню входа / регистрация / аутентификация -->
  
    <v-navigation-drawer
      :clipped="$vuetify.breakpoint.lgAndUp"
      v-model="drawer"
      width="200"
      fixed
      app
    >
      <v-list >
        
          <v-list-tile v-for="(item,index) in items"
            :key="item.text"

            append-icon=""
            router :to="item.route"
            @click="menu_button(index)"
          >
            <v-list-tile-action>
            	<v-icon> {{item.icon}} </v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
            	<v-list-tile-title> {{ item.text}} </v-list-tile-title>
            </v-list-tile-content>
            </v-list-tile>
            
         
 
       
      </v-list>
    </v-navigation-drawer>
 
  <v-toolbar  app fixed> 
    <v-toolbar-side-icon v-if="isMainPage" @click="drawer = !drawer"></v-toolbar-side-icon>
    <v-toolbar-title >
        <v-btn flat class="headline text-uppercase mr-5" router to="firstpage"> BMZ_app </v-btn>
        <span class="subheading" v-if="isMainPage">User plan: {{user_plan}} </span>
        <span class="subheading" v-if="isMainPage">Current ASIN: {{$store.getters.current_asin.asin}} </span>
        <span class="subheading" v-if="isMainPage">Current Keyword: {{$store.getters['keywords/current_keyword']}} </span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
        <div> 
              
              <!--Кнопка входа-->
              <button class="btn btn-outline-success mr-3" type="button"
                      v-if="signinbtn" 
                      @click="signIn">Войти</button> <!--Кнопка входа-->

              <!--Кнопка регистрации-->
              <button class="btn btn-outline-success" type="button"
                      v-if="signupbtn"
                      @click="signUp">Регистрация</button>
              
              <!-- Кнопка выхода-->
          
            <v-layout row >
              <v-flex md10>
                <!-- поле поиска по всему содержимому таблицы главного экрана-->
              <v-text-field v-if="isMainPage" 
            append-outer-icon="search"
            label="Search"
            class="hidden-sm-and-down"
            @input="searching($event)"
            ></v-text-field>
        </v-flex>
      <v-flex md3>
              <!-- выпадающее вниз меню при нажатии на иконку пользователя-->
              <v-menu offset-y v-if="signoutbtn">
                    <v-btn
                      slot="activator"
                      color="primary"
                      
                      @click=""
                      icon
                      flat
                    >
                    <!-- иконка пользователя с меню и при наведении показывает электроннный адрес пользователя-->
                    <!-- можно заменить на аватар-->
                    <v-tooltip  left>
                      <v-icon slot="activator" large>account_circle</v-icon>
                      <span class="subheading" v-if="isMainPage">User: {{user_email}} </span>
                    </v-tooltip>
                    </v-btn>
                  
              <v-list>
                <v-list-tile
                  v-for="(menu, index) in user_menu"
                  :key="index"
                  @click="signoutClick(index)"
                >
                  <v-list-tile-title>{{ menu.title }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
</v-flex>
          </v-layout>
        
               <!-- Кнопка выхода-->
            </div>
            
         

</v-toolbar>
      </v-flex>
  </v-layout>
    
  
  <v-content >
      <v-layout row justify-center>
        <v-flex xs12 sm12 md12 lg12>
           <app-signin v-if="signin"> </app-signin>  <!-- модуль аутентификации -->
           <app-signup v-if="signup"> </app-signup>  <!-- модуль регистрации -->
           <mainpageview v-if="isMainPage" class="mx-3"></mainpageview>  <!--модуль главного окна-->

        </v-flex>
      </v-layout>
     

  
  
  </v-content>
    

  </v-app>
 
</template>

<script>

  let user = firebase.auth().currentUser;
  if (user!= null){
          console.log(user.displayName);
          console.log(user.email)};

  if (user == null){
    console.log ('Зарегистрироваться!!');
  };

//import AppInput from './Components/Input.vue';


import AppAuth from './Components/Auth.vue';
import AppSignup from './Components/Signup.vue';
import AppSignin from './Components/Signin.vue';
import AppTovar from './Components/Tovar.vue';
import bModal from 'bootstrap-vue/es/components/modal/modal';
import Mainpageview from './Components/Mainpageview';


import {mapGetters} from 'vuex';
import {mapMutations} from 'vuex';
import {mapActions} from 'vuex';

export default {
    components: {
         //  AppInput
         Mainpageview,
         AppAuth,
         AppSignup,
         AppSignin,
         AppTovar,
         bModal,
        
      },
      created(){
          this.$router.push({ path: '/'}); //чистит строку в браузере
          
         
      },
      data(){
        return{
      drawer: false,
      items: [ /*пункты меню слева*/
        { icon: 'contacts', text: 'ASIN', route: '/asin'},
        { icon: 'add_circle', text: 'add ASIN'},
        { icon: 'history', text: 'Keyword',route: '/keywords'},
        { icon: 'mood', text: 'add Keyword'},
        { icon: 'content_copy', text: 'Event', route: '/eventhistory'  },
        { icon: 'mood', text: 'add Event'},
        { icon: 'history', text: 'Settings',route: '/settings'},
        { icon: 'content_copy', text: 'Vuetify', route: '/vuetifyEx'  },
        { icon: 'add_circle', text: 'edit Tag'},
        { icon: 'group_work', text: 'ASIN Copy', route: '/asinCopy'},

      ],
      user_menu: [ /*пункты меню на иконке пользователя справа*/
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Settings' },
        { title: 'Sign Out',  }
      ]
   
    }
      },
      computed: {

      ...mapGetters('authstate', {
        //название переменной : название геттера
        signin: 'signin', /* форма входа */
        signup: 'signup', /* форма регистрации */ 
        user_email: 'useremail', /* адрес почты зарегистрированного пользователя */
        isMainPage: 'isMainPage', /* главный экран */
        signinbtn: 'signinbtn', /* кнопка входа */
        signoutbtn: 'signoutbtn', /* кнопка выхода */
        signupbtn: 'signupbtn', /* кнопка регистрации */
        user_plan: 'user_plan', /*данные по плану пользователя*/
      }),
      ...mapGetters(['currentAsin']),
      /*
      logoutbtn(){
        return this.$store.state.logoutbtn; //показывать или нет кнопку выхода
      },*/
      
    },
     methods:{
      ...mapActions('authstate',{
         // signOutAct: 'signOutAct', /*  для выхода пользователя посредством метода сервиса FireBase */
          signIn: 'signIn',   /* action по изменению статуса окна и кнопок регистрации */
          signUp: 'signUp' /* action для регистрации нового пользователя*/ 
      }),
      /*методы кнопок меню слева, прописаны только те кнопки которые не переходят по роутам*/
      menu_button(index){
        switch (index) {
          case 1:
            this.$store.commit('addAsinPopupOpen'); /* открывает окно нового товара */
            this.$store.commit('settingstrue', true);
            break;
          case 3:
            this.$store.commit('addKeywordPopupOpen');
            this.$store.commit('addkeywordtrue', true);
            break;
          case 5:
            this.$store.commit('addEventPopupOpen');
            break;
          case 8:
            this.$store.commit('EditTagTableOpen');
            break;
          }
      },
      /* методы кнопок меню пользователя справа*/
      signoutClick(index){
         switch (index) {
           case 2:
            this.$router.push({ path: '/settings'});
            break;
          case 3:
            this.preSignOut();
            break;
          }
      },
      /*метод выхода из пользователя*/
      preSignOut(){
      	this.drawer = false; /* поле отвечает за отображение и скрытие левого меню */
      	this.$router.push({ path: '/'}); //чистит строку в браузере
      	
      	this.$store.dispatch('authstate/signOutAct');  /* вызов Экшена для выхода из пользовтеля */ 
      },
      searching(value){
        console.log(value);
        this.$store.commit('search_term',value);
      }
      
    
     }
      

}

</script>

<style scoped>

        

    .amz{
      color:  white;
    }

    .user{
      color:  white;
    }


</style>
