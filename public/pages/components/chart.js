import { LitElement} from 'lit';
import {render} from "./chart.tpl.js";
import {Chart, registerables} from 'chart.js'; 

class AccCharts extends LitElement {

  static get properties() {
        return {
          type : {type: String},
          labels : {type: Array},
          data : {type: Object},
          title : {type: String},
          color : {type: String},
          width : {type: Number},
          height : {type: Number}

        };
  }

  constructor() {
    super();
    Chart.register(...registerables);
    this.ctx;
    this.type = 'line';
    this.color = [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(32, 122, 98)'
      ];
    this.data = [{
        label: 'First dataset',
        data: [0, 20, 40, 50],
        backgroundColor: this.color,
        hoverOffset: 4
    }];

    this.labels = ['January', 'February', 'March', 'April'];
    this.title = 'Custom Chart Title'


    this.render = render.bind(this);
    
  }

  firstUpdated(){
    this.ctx = this.shadowRoot.querySelector("#myChart").getContext('2d');
    this.myChart = new Chart(this.ctx, {
      type: this.type,
      data: {
          datasets: this.data,
          labels: this.labels
      },
      options: {
        plugins: {
            title: {
                display: true,
                text: this.title,
                padding: {
                    top: 10,
                    bottom: 30
                }
            }
        },

          interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false
          },
          responsive: true,
          scales: {
            x: {
              display: true,
              suggestedMin: 20,
              suggestedMax: 70
            },
            y: {
              display: true,
              suggestedMin: 20,
              suggestedMax: 70
            }
          }
      }
  });
  }


}

customElements.define('acc-chart', AccCharts);