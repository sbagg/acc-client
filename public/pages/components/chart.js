import { LitElement} from 'lit';
import {render} from "./chart.tpl.js";
import {Chart, registerables} from 'chart.js'; 

class AccCharts extends LitElement {

  static get properties() {
        return {
          type : {type: String},
          dataSet : {type: Array}, 
          datalabels : {type: Array},
          title : {type: String},
          color : {type: String},
          width : {type: Number},
          height : {type: Number},
          object : {type: Object},
          kc_id : {type: Array}
        };
  }

  constructor() {
    super();
    Chart.register(...registerables);
    this.ctx;
    
    this.type = 'line';
    this.color = ['red'];
    this.dataSet = [];
    this.datalabels = [];
    
    this.title = 'KC Chart';

    this.render = render.bind(this);
    
  }

  chart(){
    this.ctx = this.shadowRoot.querySelector("#myChart").getContext('2d');
    this.myChart = new Chart(this.ctx, {
      type: this.type,
      data: {
          datasets: this.dataSet,
          labels: this.datalabels
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
              suggestedMin: 3,
              suggestedMax: 3
            },
            y: {
              display: true,
              suggestedMin: 3,
              suggestedMax: 3
            }
          }
      }
  });
  }

  updated(){
    let itemCheck = this.renderRoot.querySelector("#itemCheck"); // getting the parent container of all the checkbox inputs
    let checkBoxes = itemCheck.querySelectorAll('input[type=checkbox][name=checkbox]'); // get all the check box
    let object = this.object;
    let idChecker = [];
    let self = this;

    checkBoxes.forEach(checkbox =>
      checkbox.addEventListener('change', function() {
        idChecker =
          Array.from(checkBoxes) // Convert checkboxes to an array to use filter and map.
          .filter(i => i.checked) // Use Array.filter to remove unchecked checkboxes.
          .map(i => i.value); // Use Array.map to extract only the checkbox values from the array of objects.
          
          let check = object.filter(function (obj)
          {
            return idChecker.includes(obj['id']);
          });
          let dataSet = [];
          let lab = ['earlyt', 'kc0', 'midt', 'kcmid','latet', 'kc1'];
          check.map(obj => {
            let data = [];
            data.push(obj['earlyt'], obj['kc0'], obj['midt'],obj['kcmid'], obj['latet'], obj['kc1']);
            let tempObject = {
              label: obj['label'],
              data: data,
              color: self.color,
              hoverOffset: 4
            };
            dataSet.push(tempObject);
          });
          self.dataSet = dataSet;
          self.datalabels = lab; 
          self.myChart.destroy(); 
          self.chart();

      })
    );
 
  }

  firstUpdated(){
    this.chart();
  }




}

customElements.define('acc-chart', AccCharts);