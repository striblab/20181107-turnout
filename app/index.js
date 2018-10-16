/**
 * Main JS file for project.
 */

// Define globals that are added through the js.globals in
// the config.json file, here like this:
// /* global _ */

// Utility functions, such as Pym integration, number formatting,
// and device checking

//import utilsFn from './utils.js';
//utilsFn({ });


// Import local ES6 modules like this:
//import utilsFn from './utils.js';

// Or import libraries installed with npm like this:
// import module from 'module';

// Utilize templates on the client.  Get the main content template.
//import Content from '../templates/_index-content.svelte.html';
//
// Get the data parts that are needed.  For larger data points,
// utilize window.fetch.  Add the build = true option in the buildData
// options.
//import content from '../content.json';
// OR: let content = await (await window.fetch('./assets/data/content.json')).json();
//
// const app = new Content({
//   target: document.querySelector('.main-app-container'),
//   data: {
//     content
//   }
// });

import Chart from './chart.js';
import AgeChart from './age.js';
import RankChart from './ranking.js';
import Map from './map.js';

const chart1 = new Chart('#chart');
const chart2 = new AgeChart('#ageChart');
const chart3 = new RankChart('#rankChart');
const chart4 = new RankChart('#rankChart2');
const map = new Map("#mapCounties");

chart1.render();
chart2.render();
chart3.render(1);
chart4.render(2);
map.render();

