import * as d3 from 'd3';
import * as c3 from 'c3';

class regionChart { 

    constructor(target) {
      this.target = target;
      this.chartCounts = null;
    }
  
    render(tier) {
      var self = this;
  
      var states;
      var nums;

      if (tier == 1) {
      states = ["MN","NH","ME","WI","IA","MA","CO","DE","FL","MI","NC","VA","CT","OR","VT","MO","OH","PA","ID","IL","LA","MD","MT","GA","KY"];
      nums = ["turnout",0.74,0.74,0.7,0.69,0.68,0.65,0.64,0.64,0.64,0.64,0.64,0.64,0.63,0.63,0.63,0.62,0.61,0.61,0.6,0.6,0.6,0.6,0.6,0.59,0.59];
      }
      else if (tier == 2){
      states = ["ND","NE","NJ","SD","WY","AL","NV","DC","IN","KS","SC","NM","RI","US","MS","AR","NY","OK","TN","TX","WV","AK","WA","AZ","HI","UT","CA"];
      nums = ["turnout",0.59,0.59,0.59,0.59,0.59,0.58,0.57,0.56,0.56,0.56,0.56,0.54,0.54,0.55,0.53,0.52,0.52,0.52,0.51,0.51,0.5,0.49,0.44,0.43,0.42,0.4,0.4];
      }

      var  padding = {
            top: 20,
            right: 40,
            bottom: 20,
            left: 100,
        };
      
      self.chartCounts = c3.generate({
          bindto: self.target,
          padding: padding,
          data: {
                columns: [
                    nums
                ],
            type: 'bar',
            labels: {
                format: {
                    'turnout': d3.format('.0%')
                }
            }
          },
            tooltip: {
                show: false
            },
            legend: {
              show: false
            },
            color: {
                pattern: ['#8b62a8']
            },
            axis: {
                  rotated: true,
                  y: {
                        max: 1,
                        min: 0,
                        padding: {bottom: 0, top: 0},
                        tick: {
                         count: 4,
                         values: [0,0.25,0.50,0.75,1],
                         format: d3.format('.0%')
                        }
                    },
                x: {
                  type: 'category',
                  categories: states,
                  padding: {right: 0, left: 0},
                        tick: {
                         rotate: -75,
                         multiline: false
                        },
                        height: 40
                }
            }
    });
  
    d3.selectAll(".c3-target-2016")
    .selectAll(".c3-bar, .c3-texts")
    .attr("transform", "translate(0, 5)");

    }
  }
  
  export { regionChart as default }