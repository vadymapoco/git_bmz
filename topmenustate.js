export default {

 	namespaced: true,
 	state:{
 		punkts: [
		{
			text:'Add ASIN', /*текст пункта меню*/
			component: '/addasin', /*компонент*/
			route: 'addasin' /*роут*/ },

		{
			text: 'Add New KeyWords', 
			component: '/addkeyword',
			route: 'addkeyword'},

		{
			text: 'Settings', 
			component: '/settings', 
			route: 'settings' }
					]
 	},
 	getters:{
 			punkts(state){
 				return state.punkts;
 			}
 	}
}