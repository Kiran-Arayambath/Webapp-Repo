/* globals Chart:false, feather:false */

(function () {
  'use strict'

  feather.replace({ 'aria-hidden': 'true' })

  // Visit And Sales Statistics Chart
  var ctx1 = document.getElementById('patientChart').getContext('2d');
  var visitAndSalesChart = new Chart(ctx1, {
      type: 'bar',
      data: {
          labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG'],
          datasets: [
              { label: 'RCT', data: [30, 50, 70, 40, 60, 50, 70, 90], backgroundColor: '#ff6384' },
              { label: 'C&P', data: [40, 60, 80, 50, 70, 60, 80, 100], backgroundColor: '#36a2eb' },
              { label: 'CBD', data: [50, 70, 10, 60, 80, 70, 90, 110], backgroundColor: '#cc65fe' }
          ]
      },
      options: {
          responsive: true,
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });

  // Traffic Sources Chart
  var ctx2 = document.getElementById('trafficSourcesChart').getContext('2d');
  var trafficSourcesChart = new Chart(ctx2, {
      type: 'doughnut',
      data: {
          labels: ['Search Engines', 'Direct Click', 'Bookmarks Click'],
          datasets: [{
              data: [30, 30, 40],
              backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe']
          }]
      },
      options: {
          responsive: true
      }
  });

})()
