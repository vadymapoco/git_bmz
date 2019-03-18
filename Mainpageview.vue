<!-- вид главного экрана-->

<template>
  <v-app>
  <div>
    <div class="top_menu">  

    <!-- логотип в левом верхнем углу и ссылка при клике по нему на роут logo-->
    <!--
      <div class="logo">
          <router-link :to="{name:  'firstpage'}">
            <a><img src="../assets/image/1.jpg" width="100" height="100" alt="Logo">  </a>
          </router-link>
      </div>
      верхнее поле (меню или кнопки) 
      <div class="menu_button">-->
        
         <!--<TopMenu> 
         <TopMenuButtons></TopMenuButtons> </TopMenu> 
      </div>-->
    </div>
    
      <!-- левое меню -->
      


      <!-- место основного контента по центру экрана -->      
      <div class="main_content">
      <!-- в файле routes.js указан компонент по умолчанию (*) - Asin. Это запускает на месте основного контента компонент Asin  -->
          <router-view ></router-view>

   <AddEventPopup  v-if="addEventPopup"> </AddEventPopup> <!-- всплывающее окно добавления нового события -->
   <AddAsinPopup  v-if="addAsinPopup"> </AddAsinPopup> <!-- всплывающее окно добавления нового товара -->
   <AddKeywordPopup v-if="addKeywordPopup"> </AddKeywordPopup>  <!-- всплывающее окно добавления нового ключевого слова     -->
   <EditTagTablePopup  v-if="EditTagTable"> </EditTagTablePopup>  <!--всплывающее окно редактирования списка тегов      -->

     
    
    </div>
 </div>
</v-app>
</template>



<script>

import TopMenu from './TopMenu';
import TopMenuButtons from './TopMenuButtons';
import LeftMenu from './LeftMenu';
import AppTovar from '../Components/Tovar.vue';
import AddAsinPopup from '../Components/AddAsinPopup.vue';
import AddKeywordPopup from '../Components/AddKeywordPopup.vue';
import AddEventPopup from '../Components/AddEventPopup.vue';
import EditTagTablePopup from '../Components/EditTagTablePopup.vue';

import {mapGetters} from 'vuex';

export default {
  /*name: 'app',*/

  data () {
    return {
     
    }
  },
  components: {
    TopMenu,
    TopMenuButtons,
    AppTovar,
    LeftMenu,
    AddAsinPopup,
    AddKeywordPopup,
    EditTagTablePopup,
    AddEventPopup,
  },
  /* новый формат */
  created(){
        console.log('Mainpageview.vue App created');
        console.log('вызов settingss/lookplan action');
        //this.$store.dispatch('settingss/lookplan');

        
        this.$store.dispatch('asinmenu/lookasin'); /*загружаем все товары */
       

        this.$store.dispatch('asinmenu/asin_quant');
        this.$store.dispatch('asinmenu/looktag');  /*загружаем все теги товаров */
        this.$store.dispatch('asinmenu/lookgroup'); /* загружаем все группы товаров */
        this.$store.dispatch('keywords/lookallkeyword');
        this.$store.dispatch('keywords/allkeyword_quant');
        this.$store.dispatch('events/lookasineventhistory_all');
        


  },
  computed: {

    ...mapGetters({
          addAsinPopup: 'addAsinPopup', /* отслеживает нажатие и открытие вслывающего окна добавления товара */
          addKeywordPopup: 'addKeywordPopup', /* отслеживает нажатие и открытие вслывающего окна добавления ключевого слова */
          addEventPopup: 'AddEventPopup',
          EditTagTable: 'EditTagTable' /* отслеживает нажатие и открытие вслывающего окна редактирования тегов */
    }),
    

/* тоже самое но в другой форме
     addAsinPopup(){
      return this.$store.state.addAsinPopup;
     },
     addKeywordPopup(){
      return this.$store.state.addKeywordPopup;
     },
     
      EditTagTable(){
      return this.$store.state.EditTagTable;
     } */
  }
}
</script>
  


<style>
    .all{
        background-color: white;
        padding: 0;
    }

    .top_menu{
      border: 1px solid black;
      display: flex;
      margin: 0;
    }

    .logo {
      flex-grow: 1;
    }

    .btn{
      margin: 0;

    }


    .menu_button{
      margin: 0 10px ;
      display: flex;
      justify-content: flex-end;
      flex-grow: 2;
      align-items: center;
    }


    .main_place{
      border: 2px solid blue;
      display: flex;
    }

    .left_menu{
      margin: 10px;
      min-width: 100px;
      width: 10%;
      min-height: 500px;
    } 

    .main_content{
      width:  100%;
      margin:  10px;
    }
    
</style>