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
		
		<button class="btn btn-primary" @click="lookTovar"> Просмотреть пользователей </button>
		<button class="btn btn-primary" @click="addnewTovar"> Добавить пользователя </button>
		<button class="btn btn-primary" @click="autoincrement"> Обнулить счетчик </button>
		<button class="btn btn-primary" @click="uidprint"> UID </button>

		<div>
			<label> Delete Id </label>
			<input type="text" placeholder="ID" v-model="deleteId">
			<p></p>
			<button class="btn btn-primary" @click="deleteTovar"> Удалить товар </button>
		</div>

		<hr>
			<div v-if="false">
				<div>
				<button class="btn btn-primary" @click="get"> GET </button>
					<div>
						getresultStatus: {{getresultStatus}} <br>
						getresultHeader: {{getresultHeader}} <br>
						getresult - {{getresult}}
					</div>
				</div>
			<div>
			<button class="btn btn-primary" @click="getparam"> GET with param </button>
				<div>
					<label>todoID</label>
					<input type="text" placeholder="todoID" v-model="todoId">
					<p></p>
				</div>
				<div>
					getresult2Status: {{get2resultStatus}} <br>
					get2result: {{get2result}}
				</div>
			</div>
				<div>
				<button class="btn btn-primary" @click="post"> POST </button>
					<div>
						postresult - {{postresult}}
					</div>
				</div>
			</div>
		<hr>
				
	</form>

	<b-modal v-model="modalTovarEst" 
				 title="Товар уже есть"
				 >
			
	</b-modal>
	
	<div v-if="seeTovar">

			<table class="table table-bordered">
				<tr>
					<td>ASIN</td>
					<td>Name</td>
				</tr>
				<tr v-for="(tovar, index) in tovars">
			       <td>{{ tovar.asin }}</td>
			       <td>{{ tovar.name }}</td>
			    </tr>
				
			</table>

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
			getresult: null,
			getresultStatus: null,
			getresultHeader: null,
			get2result: null,
			get2resultStatus: null,
			todoId: '',
			postresult: null,
			postresultStatus: null,
			deleteId: null,
			user_name: '',
			user_email: '',
			user_pass: '',
			fire_email: ''
		}
	},
		computed: {
			...mapGetters(['uid']),
			uid(){
				return this.$store.uid;
			}
		},
		methods:{
			autoincrement(){

			},
			uidprint(){
				console.log(this.$store.getters.uid);
				console.log(this.$store.state.useremail);
				console.log(this.$store.getters.fire_email);
			},

			deleteTovar(){
				//var Id = JSON.stringify(this.deleteId);
				Vue.http.get('http://bsr-consulting.com/alex.php', {
					params: 
					{action: 'deleteasin',
					 asin_id: this.deleteId
					 }
				}).then (
				(response) => {
					//Vue.http.post('http://bsr-consulting.com/alex.php', {
					//		user_name : 'Vasya'
				//});
					console.log(response);
					console.log('блок POST');
					this.deleteId = '';
					this.lookTovar();
				},
				(err) => {
					console.log(err);
				}
				);
			},

			get(){
				console.log('get');
				Vue.http.get('http://jsonplaceholder.typicode.com/todos')
				.then (
				(response) => {
					this.getresultStatus = response.status;
					//this.getresultHeader = response.headers;
					this.getresult = response.data[1];
				},
				(err) => {
					console.log(err);
				}
				);
			},

			getparam(){
				console.log('getparam');
				Vue.http.get('http://jsonplaceholder.typicode.com/todos',{
					params: {
						id: this.todoId
					}
				})
				.then (
				(response) => {
					this.get2resultStatus = response.status;
					//this.getresultHeader = response.headers;
					this.get2result = response.data;
				},
				(err) => {
					console.log(err);
				}
				);
			},

			post(){
				console.log('post');
				Vue.http.post('http://jsonplaceholder.typicode.com/todos',{
					userId: '1',
					title: 'todoTitleNew',
					completed: false
				})

				.then (
				(response) => {
					this.postresultStatus = response.status;
					//this.getresultHeader = response.headers;
					this.postresult = response.data;
				},
				(err) => {
					console.log(err);
				}
				);
			},

			addnewTovar(){
				console.log("add new tovar");
				Vue.http.get('http://bsr-consulting.com/alex.php', {
					params: 
					{action : 'addasin',
					 user_name: this.user_name,
					 uid: this.$store.getters.uid,
					 fire_email: this.$store.getters.fire_email,
					 user_email: this.user_email,
					 user_pass: this.user_pass}
				}).then (
				(response) => {
					//Vue.http.post('http://bsr-consulting.com/alex.php', {
					//		user_name : 'Vasya'
				//});
					console.log(response);
					console.log('блок POST');
					console.log(this.$store.uid);
					this.lookTovar();
				},
				(err) => {
					console.log(err);
				}
				);
				
				this.user_name = '';
				this.user_email = '';
				this.user_pass = '';
			},

			lookTovar(){
				console.log("server request");
				//Vue.http.get('http://localhost/soundsenergy/alex.php', {
				Vue.http.get('http://bsr-consulting.com/alex.php', {
					params: {'action' : 'readasin',
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