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
      states = ["MN","CO","MT","OR","WI","WA","ME","ND","MI","IA","VT","GA","FL","VA","AK","NH","MD","MA","SD","MO","CT","OH","UT","DE","NE","PA"];
      nums = ["turnout",0.643,0.629,0.621,0.615,0.612,0.588,0.587,0.586,0.578,0.577,0.559,0.55,0.549,0.548,0.546,0.546,0.535,0.535,0.534,0.532,0.526,0.515,0.514,0.511,0.511,0.51];
      }
      else if (tier == 2){
      states = ["NC","ID","KS","US","AZ","IL","WY","KY","CA","NV","RI","AL","NM","NJ","IN","TX","SC","TN","DC","LA","WV","OK","NY","AR","MS","HI"];
      nums = ["turnout",0.496,0.495,0.495,0.494,0.491,0.489,0.487,0.486,0.478,0.476,0.476,0.474,0.472,0.462,0.461,0.461,0.452,0.447,0.438,0.43,0.426,0.425,0.421,0.414,0.407,0.393];
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