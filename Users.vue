<template>
	<div class="users">
		<h1> Users </h1>
		<table class="table">
			<th v-for="table in tables">
			{{ table.table_head }}
			</th>
			<tr  v-for="user in users"
			:key="user.id_user">
				<td class="first">{{user.login_user}}</td>
				<td class="second">{{user.email}}</td>
				<td class="third">{{user.plan_user}}</td>
			</tr>
		</table>

		<div class="downmenu">
	<!--		<p @mouseover="downmenu($event)">Drop down menu</p>
	-->		<p @click="downmenu($event)">Drop down menu</p>
		</div>
		
		<div class="drop">
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
			tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
			quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
			consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
			cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
			proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi suscipit magni fugiat in sint magnam iusto veritatis! Incidunt, ducimus, veritatis. Laboriosam amet, ipsa ipsum quisquam, possimus eveniet assumenda! Aliquid, molestias!</p>
		</div>
		


			
	</div>

</template>

<script>

	var i=0;

import {mapGetters} from 'vuex';

export default{
	data(){
		return{
			tables:[
			{
				table_head: 'user name'
			},
			{
				table_head: 'user email'
			},
			{
				table_head: 'user plan'
			},
		]
		}
	},
	computed:{
		...mapGetters('users', {users: 'users'})
	},
	methods: {
		downmenu(e){
			
			e.target.style.color = 'red';
			var s = document.getElementsByClassName('drop');
			s[0].style.display = 'block';
		}
	}
	
}
</script>

<style scoped>

		.drop{
			display: none;
		}

		.users{
			border: 1px solid blue;
			width:  100%;
		}

		.table{
			border: 1px solid red;
		}
	
		 .first{
			width: 30%;
		}
		
		.second{
			width: 40%;
		}

		.third{
			width: 200px;
		}
	
</style>