import Vue from 'vue'; 
import VueRouter from 'vue-router'; 


Vue.use(VueRouter);

import Logo from './components/Logo';
import AddAsin from './components/AddAsin';
import Asin from './components/Asin';
import AddKeyword from './components/AddKeyword';
import Settings from './components/Settings';
import Users from './components/Users';
import Menu2 from './components/Menu2';
import Menu3 from './components/Menu3';
import Menu4 from './components/Menu4';
import Keywords from './components/Keywords';
import AsinHistory from './components/AsinHistory';
import KeywordTrack from './components/KeywordTrack';
import EventHistory from  './components/EventHistory';
import FirstPage from './components/FirstPage';
import Loading from './components/Loading';
import VuetifyEx from './components/VuetifyEx';
import AsinCopy from './components/AsinCopy';


import store from './store';

const routes = [
	
//	{
//		name: '',
//		path: '/asin', /*название пути в строке поиска*/
//		component: Asin,  /* название компонента*/
//	},
	{
		name: '',
		path: '/dashboard', /*название пути в строке поиска*/
		component: FirstPage /* название компонента*/
	},
	{
		name: 'logo',
		path: '/logo', /*название пути в строке поиска*/
		component: Logo /* название компонента*/
	},
	{
		name: 'firstpage',
		path: '/dashboard', /*название пути в строке поиска*/
		component: FirstPage /* название компонента*/
	},
	{
		name: 'addasin',
		path: '/addasin', /*название пути в строке поиска*/
		component: AddAsin /* название компонента*/
	},
	{
		name: 'asin',
		path: '/asin', /*название пути в строке поиска*/
		component: Asin,  /* название компонента*/
		beforeEnter(from, to, next){
				store.dispatch('asinmenu/lookasin');
				next();
			
		}
	},
	{
		name: 'asinCopy',
		path: '/asinCopy', /*название пути в строке поиска*/
		component: AsinCopy,  /* название компонента*/
	},

	{
		name: 'keywords',
		path: '/keywords', /*название пути в строке поиска*/
		component: Keywords,  /* название компонента*/
	},
	{
		name: 'addkeyword',
		path: '/addkeyword',
		component: AddKeyword
	},
	{
		name: 'asinhistory',
		path: '/asinhistory',
		component: AsinHistory
	},
	{
		name: 'eventhistory',
		path: '/eventhistory',
		component: EventHistory
	},
	{
		name: 'keywordTrack',
		path: '/keywordTrack',
		component: KeywordTrack
	},
	{
		name: 'settings',
		path: '/settings',
		component: Settings
	},
	{
		name: 'users',
		path: '/users',
		component: Users
	},
	{
		name: 'menu2',
		path: '/menu2',
		component: Menu2
	},
	{
		name: 'menu3',
		path: '/menu3',
		component: Menu3
	},
	{
		name: 'menu4',
		path: '/menu4',
		component: Menu4
	},
	{
		name: 'loading',
		path: '/loading',
		component: Loading
	},
	{
		name: 'vuetifyEx',
		path: '/vuetifyex',
		component: VuetifyEx
	},
	{
		path: '*',
		component: FirstPage
	}

];



export default new VueRouter({
	routes,
	mode: 'history'
});