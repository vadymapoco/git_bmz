<template>
<div>
	<form @submit.prevent="formSubmited = true" v-if="tovarInput">
		<div>
			<label> User Name </label>
			<input type="text" placeholder="user name" v-model="user_name">
		</div>
		<div>
			<label> User Email </label>
			<input type="text" placeholder="user email" v-model="user_email">
		</div>
		<div>
			<label> User Password </label>
			<input type="text" placeholder="user password" v-model="user_pass">
		</div>
		
		<button class="btn btn-primary" @click="lookUser"> Просмотреть пользователей </button>
		<button class="btn btn-primary" @click="addnewUser"> Добавить пользователя </button>
		<button class="btn btn-primary" @click="uidprint"> UID </button>

		<div>
			<label> Delete Id </label>
			<input type="text" placeholder="ID" v-model="deleteId">
			<p></p>
			<button class="btn btn-primary" @click="deleteUser"> Удалить товар </button>
		</div>

		<hr>
			<div v-if="false">
			</div>
		<hr>
				
	</form>

				<div v-if="seeTovar">


				<div>
					<table class="table table-bordered">
						<tr>
							<td>User ID</td>
							<td>Account Email</td>
							<td>User UID</td>
							<td>User Name</td>
							<td>User Email</td>
							<td>User Pass</td>	
						</tr>
						<tr v-for="(asin, index) in asins">
					       <td>{{ asin.id_client }}</td>
					       <td>{{ asin.fire_email }}</td>
					       <td>{{ asin.fire_id }}</td>
					       <td>{{ asin.user_name }}</td>
					       <td>{{ asin.user_email }}</td>
					       <td>{{ asin.user_password }}</td>
					    </tr>
						
					</table>
					
				</div>


			</div>
</div>
</template>

<script>
	import Vue from 'vue';
	import bModal from 'bootstrap-vue/es/components/modal/modal';
	import {mapGetters} from 'vuex';


	export default {

		components: {
         bModal
      },
		data(){
			return{
			seeTovar: true,
			tovarInput: true,
			tovars: [],
			modalTovarEst: false,
			user: { user_name: 'Nothing'},
			asins: [],
			deleteId: null,
			user_name: '',
			user_email: '',
			user_pass: '',
			fire_email: ''
		}
	},
		computed: {
			
			uid(){
				return this.$store.getters.uid;
			}
		},
		methods:{
			uidprint(){
				console.log(this.$store.getters.uid);
				console.log(this.$store.getters['authstate/useremail']);
				console.log(this.$store.getters['authstate/fire_email']);
			},

			deleteUser(){
				Vue.http.get('http://bsr-consulting.com/alex.php', {
					params: 
					{action: 'deleteuser',
					 asin_id: this.deleteId
					 }
				}).then (
				(response) => {
					this.deleteId = '';
					this.lookUser();
				},
				(err) => {
					console.log(err);
				}
				);
			},
			
			addnewUser(){
				console.log("add new tovar");
				Vue.http.get('http://bsr-consulting.com/alex.php', {
					params: 
					{action : 'adduser',
					 user_name: this.user_name,
					 user_pass: this.user_pass,
					 uid: this.$store.getters.uid,
					 fire_email: this.$store.getters['authstate/fire_email'],
					 user_email: this.$store.getters['authstate/useremail'],
					 }
				}).then (
				(response) => {					
					this.lookUser();
				},
				(err) => {
					console.log(err);
				}
				);				
				this.user_name = '';
				this.user_email = '';
				this.user_pass = '';
			},

			lookUser(){
				console.log("server request");
				Vue.http.get('http://bsr-consulting.com/alex.php', {
					params: { action : 'readuser',
								uid: this.$store.getters.uid
							}
				}).then (
				(response) => {
					this.asins = response.data;
					console.log(response);
				},
				(err) => {
					console.log(err);
				}
				);
			},
			
		}
}



</script>