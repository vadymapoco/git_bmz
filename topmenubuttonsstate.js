export default {

 	namespaced: true,
 	state:{
 		
 		buttons: [

			{
				text: 'Add new ASIN', 
				meth: 'button1'
			},

			{
				text: 'Add New KeyWords', 
				meth: 'button2'
			},

			{
				text: 'Edit Tag Table', 
				meth: 'button3'
			},

			{
				text:'Add New Event', /*текст пункта меню*/
				meth: 'button4'
			},

			]
					
 	},
 	getters:{
 			buttons(state){
 				return state.buttons;
 			}
  	},

 	
	}
