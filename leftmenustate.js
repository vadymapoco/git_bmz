export default {

 	namespaced: true,
 	state:{
 		punkts: [
 		{
			text:'ASIN', /*текст пункта меню*/
			component: '/asin', /*компонент*/
			route: 'asin' /*роут*/ },
		
		{
			text: 'Keywords', 
			component: '/keywords',
			route: 'keywords'},
		
 		{
			text: 'Event History', 
			component: '/EventHistory', 
			route: 'eventhistory' },

		{
			text: 'Settings', 
			component: '/Settings', 
			route: 'settings' },

		{
			text: 'Vuetify', 
			component: '/VuetifyEx', 
			route: 'vuetifyEx' },
					]
 	},
 	getters:{
 			punkts(state){
 				return state.punkts;
 			}
 	}
}