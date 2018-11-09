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
      states = ["MN","CO","WI","OR","MT","IA","ME","ND","AK","MI","GA","FL","VA","NH","SD","MA","MO","CT","DE","KS","NE","PA","MD","WA","OH"];
      nums = ["turnout",0.642162977,0.62135972,0.61216713,0.61191488,0.60240196,0.594670619,0.587135625,0.576124706,0.574958525,0.565624955,0.552486267,0.550286816,0.548192958,0.542247986,0.541231953,0.538711125,0.535458936,0.531650093,0.525978452,0.510955448,0.506685367,0.505759541,0.504694128,0.499247419,0.498476715,0.497764598];
      }
      else if (tier == 2){
      states = ["ID","NC","IL","AZ","US","WY","KY","NV","RI","AL","NJ","NM","TX","CA","TN","SC","IN","OK","WV","AR","NY","DC","MS","UT","HI","LA"];
      nums = ["turnout",0.494170027,0.491618684,0.4890301,0.488736196,0.484582149,0.483731068,0.475916973,0.47499896,0.472613744,0.470997353,0.470205821,0.465509819,0.462036753,0.458355235,0.447221757,0.445111935,0.441797707,0.42524534,0.419850391,0.409771949,0.40879818,0.408164669,0.406582312,0.403351779,0.384477615,0.353538314];
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