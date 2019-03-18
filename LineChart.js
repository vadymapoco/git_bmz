//import {Bar, mixins} from 'vue-chartjs'
import {Line, mixins} from 'vue-chartjs'
//import {Doughnut, mixins} from 'vue-chartjs'
const {reactiveProp} = mixins

export default {
 // extends: Bar,
  extends:Line,
  //extends: Doughnut,
  mixins: [reactiveProp],
  props: ['chartData', 'options'],
/*
  {

      chartData: {
        type: Array | Object,
        required: false
      },
      
      chartLabels: {
        type: Array,
        required: true
      }
      
    },*/
  mounted () {

    this.renderChart(this.chartData, this.options)
/*
    this.renderChart({
      labels: this.chartLabels,// ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label:  'Data Two',
          backgroundColor: '#05CBE1',
          data: this.chartData  //[70, 45, 32, 10, 2, 12, 53]
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})*/

  }
}