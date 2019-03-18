<template>

<div>

	<div class="set">
		<h1> Settings </h1>
	</div>

	<div>
		<label>User name: {{ useremail }}</label>
	</div>
	
					
					<div>
					<label>User plan: {{ plan_name }}</label>
					<br>
					
					<label>Cost of plan: {{ plan_cost }}</label>
					<br>
				
					<label>Asins: {{ asin_qw }}</label>
					<br>
					<label>Key words: {{ kw_qw }}</label>
					<br>
					<label>Key word tracking: {{ kw_track_qw }}</label>
					<br>
					<label>Notifications: {{ notific_qw }}</label>

				</div>
				<div>
					<button class="btn btn-primary" @click="change_plan('basic')">Change your plan to Basic</button>
					<button class="btn btn-danger" @click="change_plan('basic+')">Change your plan to Basic+</button>
				</div>
	






</div>
</template>

<script>

import {mapGetters} from 'vuex';

export default{

	data(){
			return{
			plan_data: []
		}
	},	

	created(){
		console.log('created settings');
		this.$store.dispatch('settingss/lookplan');
		//this.plan_data = this.current_plan;
	}, 

	computed: {

			...mapGetters('authstate', {
        useremail: 'useremail', /* адрес почты зарегистрированного пользователя */
        user_plan: 'user_plan' 
      }),
			...mapGetters('settingss', {
        current_plan: 'current_plan',
        plan_name: 'plan_name',
        plan_cost: 'plan_cost',
        asin_qw: 'asin_qw',
        kw_qw: 'kw_qw',
        kw_track_qw: 'kw_track_qw',
        notific_qw: 'notific_qw'

        
      }),

      					

			


			
	},

	methods:{
			change_plan(new_plan){
				let id = this.$store.getters.uid;
				console.log('Change current plan');
				this.$store.dispatch('settingss/changeplan', new_plan).
				then((response) => {
					//this.$store.dispatch('settingss/lookplan');
				});
				
				//this.$store.dispatch('authstate/plan_name', id);
				
			},
			
	}

}


</script>

<style scoped>

	.set {
		border:  1px solid blue;
	}
		
</style>