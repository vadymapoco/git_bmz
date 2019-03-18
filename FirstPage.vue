<!--/*Задачи
1. Выбор товара - добавить возможность выбирать несколько товаров из массива и выводить данные по этим товарам
2. Сделать отдельные линии на графике для разных товаров

*/-->
<template>
	<div class="container">
		<h1> Dashboard </h1>

<v-layout row wrap justify-space-between>
    <v-flex md2 sm2>

   <v-menu
        :close-on-content-click="false"
        v-model="menu2"
        :nudge-right="40"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
        :event-color="date => date[9] % 2 ? 'red' : 'yellow'"
        :events="functionEvents"
      >
        <v-text-field
          slot="activator"
          v-model="date"
          label="Start Date"
          prepend-icon="event"
          readonly
          color="green"
        ></v-text-field>
        <v-date-picker v-model="date" @input="menu2 = false" first-day-of-week="1"></v-date-picker>
      </v-menu>
	</v-flex>

	<v-btn @click="yesterday">Yesterday</v-btn>
	<v-btn @click="today">Today</v-btn>
	<v-btn @click="this_week">This week</v-btn>
	<v-btn @click="this_month">This month</v-btn>
	<v-btn @click="all_period">All period</v-btn>

	<v-flex md2 sm2>
      <v-menu
        :close-on-content-click="false"
        v-model="menu3"
        :nudge-right="40"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
        :event-color="date => date[9] % 2 ? 'red' : 'yellow'"
        :events="functionEvents"
      >
        <v-text-field
          slot="activator"
          v-model="date2"
          label="End Date"
          prepend-icon="event"
          readonly
        ></v-text-field>
        <v-date-picker v-model="date2" @input="menu3 = false" first-day-of-week="1"></v-date-picker>
      </v-menu>
	</v-flex>
</v-layout>

<div id="top_panel">
	<v-layout row wrap>
		<v-flex md3 sm6 xs12 px-1>
            <v-card color="blue-grey darken-2" class="white--text">
              <v-card-title primary-title>
                <div>
                  <div class="headline">Total revenue</div>
                  <span>total sales</span>
                  <hr>
                  <h4>{{totalSaleUsd.toLocaleString('ru')}} - USD</h4>
                </div>
              </v-card-title>
            </v-card>
  		</v-flex>
		 <v-flex md3 sm6 xs12 px-1>
            <v-card color="blue lighten-1" class="white--text">
              <v-card-title primary-title>
                <div>
                  <div class="headline">Total unit sales</div>
                  <span>unit</span>
                  <hr>
                  <h4>{{totalSaleQuant.toLocaleString('ru')}} - Units</h4>
                </div>
              </v-card-title>
            </v-card>
  		</v-flex>
  		<v-flex md3 sm6 xs12 px-1>
            <v-card color="green lighten-1" class="white--text">
              <v-card-title primary-title>
                <div>
                  <div class="headline">Total impression</div>
                  <span>total </span>
                  <hr>
                  <h4>{{totalImpression.toLocaleString('ru')}} - Impressions</h4>
                </div>
              </v-card-title>
            </v-card>
  		</v-flex>
  		<v-flex md3 sm6 xs12 px-1>
            <v-card color="deep-orange darken-4" class="white--text">
              <v-card-title primary-title>
                <div>
                  <div class="headline">Total click</div>
                  <span>total </span>
                  <hr>
                  <h4>{{totalClick.toLocaleString('ru')}} - Clicks</h4>
                </div>
              </v-card-title>
            </v-card>
  		</v-flex>
	</v-layout>
</div>


		<!-- пример реализации перетягивания элемента, более пподробно видео в Youtube Дмитрий Трепачев
		<div id="drug" draggable="true" @dragstart="drug">
			<v-card 
					width=90
					height=90
					>
				<v-card-title>
					<span>Something text</span>
				</v-card-title>
			</v-card>
		</div>

		<div id="drop">
				
		</div>	
		<hr>
		<p>Всего продано: {{totalSaleQuant}}</p>
		<p>Общая сумма продаж: {{totalSaleUsd}}</p>
		<p>Всего показов: {{totalImpression}}</p>
		<p>Всего кликов: {{totalClick}}</p>-->

<v-layout row wrap justify-space-around>
	<!--  добавить чтобы отображались только дни недели которые есть в выбранном диапазоне дат, и исправить в єтом случае действие при нажатии на чекбокс all -->
<v-flex sm1>	<v-checkbox v-model="selected1" label="All week"></v-checkbox> </v-flex>
<v-flex sm1>	<v-checkbox v-model="selected" label="Sunday" value="0" height="1" v-if="sunday"></v-checkbox></v-flex>
<v-flex sm1>    <v-checkbox v-model="selected" label="Monday" value="1" height="1" v-if="monday"></v-checkbox></v-flex>
<v-flex sm1>    <v-checkbox v-model="selected" label="Tuesday" value="2" height="1" v-if="tuesday" ></v-checkbox></v-flex>
<v-flex sm1>    <v-checkbox v-model="selected" label="Wednesday" value="3" height="1" v-if="wednesday"></v-checkbox></v-flex>
<v-flex sm1>    <v-checkbox v-model="selected" label="Thursday" value="4" height="1" v-if="thursday"></v-checkbox></v-flex>
<v-flex sm1>    <v-checkbox v-model="selected" label="Friday" value="5" height="1" v-if="friday"></v-checkbox></v-flex>
<v-flex sm1>    <v-checkbox v-model="selected" label="Saturday" value="6" height="1" v-if="saturday"></v-checkbox></v-flex>
</v-layout>

		{{getWeekDayStart}}/{{getWeekDayEnd}}
		{{selected}}
		{{selected1}}
		{{daysWeek}}

<!--
		<table class="table table-bordered">
					<tr class="name">
						<td>ASIN</td>
						<td>Date</td>
						<td>Sale Quanty</td>
						<td>Sale USD</td>
						<td>Impression</td>
						<td>Click</td>
					</tr>
					<tr v-for="(item, index) in sales">
					    <td>{{item.asin_tovar}}</td>
				        <td>{{item.data }}</td>
				        <td>{{item.sale_quantity}}</td>
				        <td>{{item.sale_usd}}</td>
				        <td>{{item.impression}}</td>
				        <td>{{item.click}}</td>
				    </tr>
					
		</table>
-->
<!--
		<table class="table table-bordered">
					<tr class="name">
						<td>ASIN</td>
						<td>Date</td>
						<td>Sale Quanty</td>
						<td>Sale USD</td>
						<td>Impression</td>
						<td>Click</td>
					</tr>
					<tr v-for="(item, index) in totalSalesData">
					    <td>{{item.asin_tovar}}</td>
				        <td>{{item.data }}</td>
				        <td>{{item.sale_quantity}}</td>
				        <td>{{item.sale_usd}}</td>
				        <td>{{item.impression}}</td>
				        <td>{{item.click}}</td>
				    </tr>
					
		</table>
-->
<v-radio-group v-model="radios" :mandatory="false" :row="true">
      <v-radio label="Bar Chart" value="radio-1"></v-radio>
      <v-radio label="Line Chart" value="radio-2"></v-radio>
    </v-radio-group>

<v-layout row>
<v-flex sm2>
<v-select 
          :items="asins"
          label="Asin"
          v-model="asin"
></v-select>
</v-flex>
</v-layout>

<v-checkbox v-model="selectedAsin" label="All" value="all" height="1"></v-checkbox>
<v-checkbox v-model="selectedAsin" label="B07CM82TX8" value="B07CM82TX8" height="1" ></v-checkbox>
<v-checkbox v-model="selectedAsin" label="B01J94T4R2" value="B01J94T4R2" height="1"></v-checkbox>
<v-checkbox v-model="selectedAsin" label="B00N1YPXW2" value="B00N1YPXW2" height="1"></v-checkbox>

{{selectedAsin}}

<line-example :chart-data="chartreactive" :options="options" v-if="radios=='radio-2'"></line-example>
<bar-example :chart-data="chartreactive" :options="options"  v-if="radios=='radio-1'"></bar-example>
		
<table class="table table-bordered">
			<tr class="name">
				<td>ASIN</td>
				<td>Date</td>
				<td>Sale Quanty</td>
				<td>Sale USD</td>
				<td>Impression</td>
				<td>Click</td>
			</tr>
			<tr v-for="(item, index) in totalSalesDataDayByAsin">
			    <td>{{item.asin_tovar}}</td>
		        <td>{{item.data }}</td>
		        <td>{{item.sale_quantity}}</td>
		        <td>{{item.sale_usd}}</td>
		        <td>{{item.impression}}</td>
		        <td>{{item.click}}</td>
		    </tr>
			
</table>


{{downloads}}		        


</div>






</template>



<script>


import Vue from 'vue';
import {mapGetters} from 'vuex';
import LineExample from '../components/LineChart.js';
import BarExample from '../components/BarChart.js';

export default{
	//extends: Bar,
	//props: ['chartdata', 'options'],

	components: {
     LineExample,
     BarExample
    
  },
  data(){
  	return{
  		selectedAsin: ['all', 'B01J94T4R2', 'B07CM82TX8', 'B00N1YPXW2'],
  		asins: [ 'all', 'B01J94T4R2', 'B07CM82TX8' ], //должен будет получить данные из таблицы Asin
  		radios: 'radio-1',
  		pickerData: '2018-08-12',
  		asin: '',
  		date: new Date(Date.UTC(2018,7,10)).toISOString().substr(0, 10), //дата начала
		date2: new Date(Date.UTC(2018,7,30)).toISOString().substr(0, 10), //конечная дата
		date3: new Date(Date.UTC(2018,5,10)),
	    menu: false,
	    modal: false,
	    menu2: false,
	    menu3: false,
	    selected: ['0','1','2','3','4','5','6'], //массив чекбоксов дней недели
	    selected1: true, // чекбокс общий 
	   // downloads: [60, 45, 32, 100, 2, 12, 53],
	    //labels: ['2017', 'February', 'March', 'April', 'May', 'June', 'July']
	    options: {
	    	responsive: true, 
	    	maintainAspectRatio: false,
	    	scales: {
		        yAxes: [{
		            ticks: {
		                
		                min: 0
		                
		            }
		        }]
		    },
		    
		   
		    legend:{
		    	display: true
		    },

	    },
	    
  	}
  },
  created(){
    console.log('First page created');
    this.$store.dispatch('settingss/lookplan');
    this.$store.dispatch('asinmenu/sales'); //получает данные по продажам из таблиц
  },
  mounted(){
  	console.log(this.date);
  	/*
  	this.renderChart({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#FC2525',
          data: [40, 39, 10, 40, 39, 80, 40]
        },{
          label: 'Data Two',
          backgroundColor: '#05CBE1',
          data: [70, 45, 32, 10, 2, 12, 53]
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})
*/
  
  },
  watch: {
  	//отслеживает состояние общего чекбокса и если он нажат то заполняет массив selected всеми днями недели
  	selected1: function(){
				console.log('watcher',this.selected1);
				if (this.selected1){ this.selected = ['0','1','2','3','4','5','6']}
					else { this.selected = []}
			},
	// отслеживает массив selected и еслли все чекбоксы нажаты переводит общий в true	
	selected: function(){
		console.log(this.selected);
		if (this.selected.length == 0 || this.selected == null) {this.selected1 = false} else if 
			(this.selected.length == 7) {this.selected1 = true}
	},
	//отслеживает изменение нажатия на список Асинов, путем контроля массива
	selectedAsin:function(newVal, oldVal){
		let asi = '';
		console.log(newVal);
		console.log(oldVal);
		if(oldVal<newVal) {console.log('Push!!!')
		console.log(newVal[newVal.length - 1])};
		 
		if(oldVal>newVal) {console.log('Delete!')
			
	};

	}

  },
/*порядок обработки данных по продажам
1. получаем данные по продажам в массив sales
2. totalSalesData - фильтрует предыдущий массив по датам из датаПикера или вручную установленные в data
3. totalSalesDataDay - фильтрует предыдущий массив по дням недели
4. totalSalesDataDayByAsin - фильтрует предыдущий массив по Asin

*/

  computed:{
  	...mapGetters('asinmenu' , {
  				sales: 'sales' //вытягивает данные по продажам
  								}),
    	
  	totalSalesData(){
  		if (this.date <= this.date2) {  
  		let startdataPick = this.date;
  		let enddataPick = this.date2;
  		//console.log('dataPick = ' + dataPick);
  		return this.sales.filter(function(item) {
  			return item.data >= startdataPick && item.data <= enddataPick;
  			});
  			} 
  			else {console.log('Конечная дата меньше начальной!!!');
  				 return []};
  		
  	},

  	/*исправить для нескольких линий товаров */
  	
  	chartreactive(){
  		let ddd = this.totalSalesDataDay;
  		return {'labels': this.labels, 'datasets': [
        {
          label:  '1-st Asin',
          borderColor: '#05CBE1', //цвет линии графика
          borderWidth: 3, //ширина линии графика
          tension: 0.0, //скругление линии графика от 0 до 0.4

          backgroundColor: 'rgba(0,0,0,0)', //,  '#05CBE1',
          data: this.downloads
         
        },
       
        {

          label:  'B00N1YPXW2',
          borderColor: '#5bb85d', //цвет линии графика
          borderWidth: 3, //ширина линии графика
          tension: 0.0, //скругление линии графика от 0 до 0.4

          backgroundColor: 'rgba(0,0,0,0)', //,  '#05CBE1',
          data: [100,130,72,35,44,192,91,55]
         
        },
      ]}
  	},
  	downloads(){
  		//this.totalSalesDataDay
  		return this.totalSalesDataDayByAsin.map(function(item){
  			return item.sale_quantity;
  		})
  	},
  	labels(){
  		return this.totalSalesDataDayByAsin.map(function(item){
  			return item.data;
  		})
  	},
  	totalSalesDataDay(){
  		let day = this.selected[0];
  		let day2 = this.selected[1];
  		let day3 = this.selected[2];
  		let day4 = this.selected[3];
  		let day5 = this.selected[4];
  		let day6 = this.selected[5];
  		let day7 = this.selected[6];
  		return this.totalSalesData.filter(function(item) {
  			return new Date(Date.parse(item.data)).getDay() == day || new Date(Date.parse(item.data)).getDay() == day2 
  			|| new Date(Date.parse(item.data)).getDay() == day3 || new Date(Date.parse(item.data)).getDay() == day4
  			|| new Date(Date.parse(item.data)).getDay() == day5 || new Date(Date.parse(item.data)).getDay() == day6
  			|| new Date(Date.parse(item.data)).getDay() == day7;
  			});
  	},
	totalSalesAsin(){
  		let asin = this.asin;
  		console.log(asin);
  		return this.sales.filter(function(item) {
  			return item.asin_tovar == asin;
  			
  		})
  	},
  	totalSalesDataDayByAsin(){
  		let asin = this.asin;
  		let selAsin = this.selectedAsin;
  		console.log(asin);
  		if( selAsin == 'all' || selAsin == '') 
		{return this.totalSalesDataDay;} else
  		{return this.totalSalesDataDay.filter(function(item) {
  			return selAsin.includes(item.asin_tovar); //фильтрует по всем товарам из массива selectedAsin
  			//return item.asin_tovar == asin; // фильтровал по одному товару
 		})}
  			
  		
  	},
  	monday(){
  		return this.daysWeek.some(function (item){
  			return item == '1';
  		})
  	},
  	tuesday(){
  		return this.daysWeek.some(function (item){
  			return item == '2';
  		})
  	},
  	wednesday(){
  		return this.daysWeek.some(function (item){
  			return item == '3';
  		})
  	},
  	thursday(){
  		return this.daysWeek.some(function (item){
  			return item == '4';
  		})
  	},
  	friday(){
  		return this.daysWeek.some(function (item){
  			return item == '5';
  		})
  	},
  	saturday(){
  		return this.daysWeek.some(function (item){
  			return item == '6';
  		})
  	},
  	sunday(){
  		return this.daysWeek.some(function (item){
  			return item == '0';
  		})
  	},
  	daysWeek(){
  		//создает массив с днями недели которые содержатся в выбранном диапазоне без дубляжа
  		let startdataPick = this.date;
  		let enddataPick = this.date2;
  		let dataSale = [];
  		if (startdataPick > enddataPick) {return null; console.log ('Конечная дата меньше начальной!!!');} else { 
  		dataSale = this.sales.filter(function(item) {
  					return item.data >= startdataPick && item.data <= enddataPick;}); 
  		//console.log(dataSale);
  		let currentDate = dataSale[0].data;
  		let week = [];
  		let day = new Date();
  		
  		console.log('цикл week');
  		for (let i=0; i< dataSale.length; i++){
	  			console.log('дата в цикле - ' + dataSale[i].data);
	  			//console.log('количество в цикле - ' + dataSale[i].sale_quantity);
  				console.log('current date - ' + currentDate);
  			if (currentDate == dataSale[i].data){
  				//console.log('дата равна');
  			currentDate = dataSale[i].data;
  			day = new Date(Date.parse(dataSale[i].data)).getDay();
  			console.log('day - ' + day);

  			if (week.length == 0) {
  				console.log('массив пустой - пуш');
  				week.push(new Date(Date.parse(dataSale[i].data)).getDay());} else {
  				console.log('массив не пустой');
  				if (week.some(function(item){
  					return  item == day;
  				})) { console.log ('такое значение есть'); } else {
  					console.log('такого значения нет - пуш');
  					week.push(new Date(Date.parse(dataSale[i].data)).getDay());}
  			};
  			//week.push(new Date(Date.parse(dataSale[i].data)).getDay());
  				if (i==dataSale.length -1) {
  					
  					break;}
  				} 
  			else {
  				console.log('день недели - ' + new Date(Date.parse(dataSale[i].data)).getDay());
  				day = new Date(Date.parse(dataSale[i].data)).getDay();
  				if (week.length == 0) {
  					console.log('вторая часть - массив пустой - пуш');
  					week.push(new Date(Date.parse(dataSale[i].data)).getDay());} else {
  					console.log('вторая часть - массив не пустой');	
  				if (week.some(function(item){
  					return  item == day;
  				})) { console.log ('вторая часть - такое значение есть');  } else {
  					console.log('вторая часть - такого значения нет - пуш');
  					week.push(new Date(Date.parse(dataSale[i].data)).getDay());}
  			};
  				//week.push(new Date(Date.parse(dataSale[i].data)).getDay());
	  			currentDate = dataSale[i].data;
  		}
  			
  			
  			}
  			
  		return week}
  	},
  	//новый массив который суммирует данные по дням
  	totalDateSale(){
  	  	let startdataPick = this.date;
  		let enddataPick = this.date2;
  		let dataSale = [];
  		let saleArray = [];
  		if (startdataPick > enddataPick) {return null; console.log ('Конечная дата меньше начальной!!!');} else { 
  		dataSale = this.sales.filter(function(item) {
  					return item.data >= startdataPick && item.data <= enddataPick;}); 
  		console.log(dataSale);
  		let currentDate = dataSale[0].data;
  		let sum_Quant = 0;
  		let sum_Usd = 0;
  		let sum_impression = 0;
  		let sum_click = 0;
  		

  		for (let i=0; i< dataSale.length; i++){
	  			//console.log('дата в цикле - ' + dataSale[i].data);
	  			//console.log('количество в цикле - ' + dataSale[i].sale_quantity);
  				//console.log('current date - ' + currentDate);
  			if (currentDate == dataSale[i].data){
  				//console.log('дата равна');
  			currentDate = dataSale[i].data;
  				//console.log('current date - ' + currentDate);
  			sum_Quant = sum_Quant + parseInt(dataSale[i].sale_quantity);
  			sum_Usd = sum_Usd + parseInt(dataSale[i].sale_usd);
  			sum_impression = sum_impression + parseInt(dataSale[i].impression);
  			sum_click = sum_click + parseInt(dataSale[i].click);
  				//console.log('sum_Qunt - ' + sum_Quant);
  				if (i==dataSale.length -1) {
  					saleArray.push({date: currentDate, sale_quant: sum_Quant, sale_usd: sum_Usd, impressions: sum_impression, click: sum_click});
  					break;}
  				} 
  			else {
	  			//console.log('else');
	  			//console.log('current date - ' + currentDate);
	  			//console.log('sum_Qunt - ' + sum_Quant);
	  			//console.log('пушим массив');
  			saleArray.push({date: currentDate, sale_quant: sum_Quant, sale_usd: sum_Usd, impressions: sum_impression, click: sum_click});
  			currentDate = dataSale[i].data;
  				//console.log('current date - ' + currentDate);
  			sum_Quant =  parseInt(dataSale[i].sale_quantity);
  			sum_Usd =  parseInt(dataSale[i].sale_usd);
  			sum_impression =  parseInt(dataSale[i].impression);
  			sum_click = parseInt(dataSale[i].click);
  		}
  				//console.log('sum_Qunt - ' + sum_Quant);
  			//console.log(saleArray);
  			//saleArray.push({date: currentDate, sale_quant: sum_Quant});
  			
  			}
  			
  		return saleArray; }
  			},

  		totalSale(){
  			let saleArray = [];
  			let sum_Quant =0;
  			let sum_Usd =0;
  			let sum_impression =0;
  			let sum_click=0;

		  			for (let i=0; i< this.totalSalesData.length; i++){
		  			sum_Quant = sum_Quant + parseInt(this.totalSalesData[i].sale_quantity);
		  			sum_Usd = sum_Usd + parseInt(this.totalSalesData[i].sale_usd);
		  			sum_impression = sum_impression + parseInt(this.totalSalesData[i].impression);
		  			sum_click = sum_click + parseInt(this.totalSalesData[i].click);
		  		}

		  		 saleArray.push({sale_quant: sum_Quant, sale_usd: sum_Usd, impressions: sum_impression, click: sum_click});
		  			return saleArray; 
  			},
  			totalImpression(){
  				return this.totalSalesDataDayByAsin.reduce(function(total, item){
  					return total + parseInt(item.impression)
  				},0)
  			},
  			totalSaleUsd(){
  				return this.totalSalesDataDayByAsin.reduce(function(total, item){
  					return total + parseInt(item.sale_usd)
  				},0)
  			},
  			totalSaleQuant(){
  				return this.totalSalesDataDayByAsin.reduce(function(total, item){
  					return total + parseInt(item.sale_quantity)
  				},0)
  			},
  			totalClick(){
  				return this.totalSalesDataDayByAsin.reduce(function(total, item){
  					return total + parseInt(item.click)
  				},0)
  			},
  			getWeekDayStart() {
 				 var days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
 				 	//console.log(this.date3);
 				 	//console.log(Date.parse(this.date3));
 				 	//console.log(this.date3.toISOString().substr(0, 10));
 				 	//console.log(Date.parse(this.date3));
 				 	//console.log(new Date(1533859200000));
 				 	//console.log(new Date(Date.parse(this.date)).getDay());
 					return days[new Date(Date.parse(this.date)).getDay()];
  	 		},
  	 		getWeekDayEnd() {
 				 var days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
 				 	//console.log(this.date3);
 				 	//console.log(Date.parse(this.date3));
 				 	//console.log(this.date3.toISOString().substr(0, 10));
 				 	//console.log(Date.parse(this.date3));
 				 	//console.log(new Date(1533859200000));
 				 	//console.log(new Date(Date.parse(this.date)).getDay());
 					return days[new Date(Date.parse(this.date2)).getDay()];
  	 		},
  	 		


},
  methods:{
  		functionEvents (date) {
        const [,, day] = date.split('-')
        if ([12, 17, 28].includes(parseInt(day, 10))) return true
        if ([1, 19, 22].includes(parseInt(day, 10))) return ['red', '#00f']
        return false
      },
      allCheck(){
      	console.log(this.selected1);
      	this.selected1 =!this.selected1;
      	if( this.selected1 ) {
      	this.selected = [0,1,2,3,4,5,6];}
      	if (!this.selected1 ) {
      	this.selected = [];}
      	
      },
      drug(){
      	//alert('DRUG');
      },
      yesterday(){
      	this.date = new Date(Date.UTC(2018,7,15)).toISOString().substr(0, 10);
  		console.log(this.date);
     	this.date2 = new Date(Date.UTC(2018,7,15)).toISOString().substr(0, 10);
      },
      today(){
      	this.date = new Date(Date.UTC(2018,7,16)).toISOString().substr(0, 10);
  		console.log(this.date);
     	this.date2 = new Date(Date.UTC(2018,7,16)).toISOString().substr(0, 10);
     	//this.date2 = new Date().toISOString().substr(0, 10);
      },
      this_week(){

      	this.date2 = new Date(Date.UTC(2018,7,16)).toISOString().substr(0, 10);
      	this.date = new Date(Date.UTC(2018,7,9)).toISOString().substr(0, 10);
      },

      this_month(){
      	this.date2 = new Date(Date.UTC(2018,7,31)).toISOString().substr(0, 10);
      	this.date = new Date(Date.UTC(2018,7,1)).toISOString().substr(0, 10);
      },
      all_period(){
      	this.date2 = new Date().toISOString().substr(0, 10);
      	this.date = new Date(Date.UTC(2018,0,1)).toISOString().substr(0, 10);
      }
       
  }
	
}
</script>

<style scoped>

	#drug{
		width: 100px;
		height: 100px;
		border: 2px solid blue;
	}

	#drop{
		width: 200px;
		height: 200px;
		border: 2px solid red;
	}
	#top_panel{
		margin-bottom: 10px;
	}
		
</style>