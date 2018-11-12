import 'intersection-observer';
import * as d3 from 'd3';
import * as d3tooltip from 'd3-tooltip';
import * as topojson from 'topojson';
import mncounties from '../sources/counties.json';
import turnout from '../sources/turnout.json';
import mnpct from '../sources/mnpct-small.json';

class Map {

  constructor(target) {
    this.target = target;
    this.svg = d3.select(target + " svg").attr("width", $(target).outerWidth()).attr("height", $(target).outerHeight());
    this.g = this.svg.append("g");
    this.zoomed = false;
    this.scaled = $(target).width()/520;
    this.colorScale = d3.scaleLinear()
    .domain([0, 0.2, 0.4])
    .range(['#ffffff',"#8b62a8",'#271D42']);
  }

  /********** PRIVATE METHODS **********/

  // Detect if the viewport is mobile or desktop, can be tweaked if necessary for anything in between
  _detect_mobile() {
    var winsize = $(window).width();

    if (winsize < 520) {
      return true;
    } else {
      return false;
    }
  }

  /********** PUBLIC METHODS **********/

  // Render the map
  render() {
    var self = this;

    var projection = d3.geoAlbers().scale(5037).translate([50, 970]);

    var width  = $(self.target).outerWidth();
    var height = $(self.target).outerHeight();
    var centered;

    var data = turnout.counties;

    var path = d3.geoPath(projection);

    var svg = d3.select(self.target + " svg").attr("width", width).attr("height", height);
    var g = svg.append("g");
    var tooltip = d3tooltip(d3);

    // self._render_legend();

    // Only fire resize events in the event of a width change because it prevents
    // an awful mobile Safari bug and developer rage blackouts.
    // https://stackoverflow.com/questions/9361968/javascript-resize-event-on-scroll-mobile
    var cachedWidth = window.innerWidth;
    d3.select(window).on("resize", function() {
      var newWidth = window.innerWidth;
      if(newWidth !== cachedWidth) {
        cachedWidth = newWidth;
      }
    });

    var tooltip = function(accessor) {
      return function(selection) {
          var tooltipDiv;
          var bodyNode = d3.select('body').node();
              selection.on("mouseover", function(d, i) {
                  // Clean up lost tooltips
                  d3.select('body').selectAll('div.tooltip').remove();
                  // Append tooltip
                  tooltipDiv = d3.select('body').append('div').attr('class', 'tooltip');
                  // var absoluteMousePos = d3.mouse(bodyNode);
                  // console.log(d3.event.pageX);
                  // console.log(absoluteMousePos);
                  tooltipDiv.style('left', (d3.event.pageX + 10) + 'px')
                      .style('top', (d3.event.pageY - 15) + 'px')
                      .style('position', 'absolute')
                      .style('z-index', 1001);
                  // Add text using the accessor function
                  var tooltipText = accessor(d, i) || '';

                  tooltipDiv.html(tooltipText);
                  $("#tip").html(tooltipText);

                  if (self._detect_mobile() == true) {
                      $("#tip").show();
                      // $(".key").hide();
                  }
                  // Crop text arbitrarily
                  //tooltipDiv.style('width', function(d, i){return (tooltipText.length > 80) ? '300px' : null;})
                  //    .html(tooltipText);
              })
              .on('mousemove', function(d, i) {
                  // Move tooltip
                  tooltipDiv.style('left', (d3.event.pageX + 10) + 'px')
                      .style('top', (d3.event.pageY - 15) + 'px');

              })
              .on("mouseout", function(d, i) {
                  // Remove tooltip
                  tooltipDiv.remove();
                  $("#tip").hide();
                  // $(".key").show();
                  $("#tip").html("");
              }).on("mouseleave", function(){
                  $(".shifter").removeClass("arrowselect");
              }); 

      };
  };

    g.append("g")
        .attr("class", "precincts")
      .selectAll("path")
      .data(topojson.feature(mnpct, mnpct.objects.convert).features)
      .enter().append("path")
        .attr("d", path)
        .attr("class", function(d) { return "precinct P" + d.properties.GEOID; })
        .attr("id", function(d) { return "P" + d.properties.GEOID; } )
        .style("stroke-width", '0')
        .style("stroke","#ffffff")
        .style("fill",function(d) {
          return "#dddddd";
        });

    g.append("g")
        .attr("class", "counties")
      .selectAll("path")
      .data(topojson.feature(mncounties, mncounties.objects.counties).features)
      .enter().append("path")
        .attr("d", path)
        .attr("class", function(d) { return "county C" + d.properties.COUNTYFIPS; })
        .attr("id", function(d) { return "P" + d.properties.COUNTYFIPS; } )
        .style("stroke-width", '1')
        .style("stroke","#ffffff")
        .style("fill",function(d) {
          var votes;
          for (var i=0; i < data.length; i++) {
            if (d.properties.COUNTYNAME == data[i].county) {
              votes = data[i].total_pct;
            }
          }
          return self.colorScale(votes);
        })
      .call(tooltip(function(d, i) {
        var votes;
        var total;
        var color = "#000000";
        for (var i=0; i < data.length; i++) {
          if (d.properties.COUNTYNAME == data[i].county) {
            votes = data[i].total_pct;
            total = data[i].total_ab;
          }
        }
        if (votes > 0.25) { color = "#ffffff"; }
        return "<div class='countyName'>" + d.properties.COUNTYNAME + "</div><div><span class='legendary' style='color:" + color + "; background-color:" + self.colorScale(votes) + ";'>" + d3.format(".1%")(votes) + "</span> of early votes</div><div>" + d3.format(",")(total) + " accepted ballots</div>";
    }));

    var aspect = 500 / 550, chart = $(self.target + " svg");
      var targetWidth = chart.parent().width();
      chart.attr("width", targetWidth);
      chart.attr("height", targetWidth / aspect);
      if ($(window).width() <= 520) { $(self.target + " svg").attr("viewBox","0 0 500 550"); }

    $(window).on("resize", function() {
      targetWidth = chart.parent().width();
      chart.attr("width", targetWidth);
      chart.attr("height", targetWidth / aspect);
    });
  }
}

export { Map as default }