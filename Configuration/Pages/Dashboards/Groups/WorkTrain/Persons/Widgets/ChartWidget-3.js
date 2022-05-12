(function () {
    return (function () {
    return {
      formatTitle: function() {
          return `
              <div class="widget-title" style="position: relative; display:block; text-align: center; color: #0373d2;  font-weight: 600; text-transform: uppercase; font-size:.8vw; padding-top:3px;">
                  <span>Chart</span>
              </div>
          `;
      },
    //   chartConfig: { 
    //       chart: {
    //         //   height: 300
    //       },
    //       credits: {
    //           enabled: false
    //       },
    //       title: {
    //           text: null
    //       },
    //       plotOptions: {
    //           pie: {
    //               allowPointSelect: true,
    //               cursor: 'pointer',
    //               dataLabels: {
    //                   enabled: true,
    //                   format: '<b>{point.name}</b>: {point.y} ({point.percentage:.1f}%)'
    //               }
    //           }
    //       },
    //       tooltip: {
    //           headerFormat: '',
    //           pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
    //               'Кількість: <b>{point.y}</b><br/>' +
    //               'Процент: <b>{point.percentage:.1f}</b><br/>'
    //       },
    //       legend: {
    //           align: 'center',
    //           layout: 'horizontal',
    //           align: 'center',
    //           verticlAlign: 'bottom',
    //           itemDistance: 4,
    //           margin: 4,
    //           lineHeight:8,
    //           alignColumns: false,
    //           itemStyle:{
    //               fontWeight:'400'
    //           }
    //       },
    //       series: [
    //           {
    //               type: 'pie',
    //               name: 'Кількість співробітників',
    //               color: '#b0de35',
    //               data: []
    //           }
    //       ],
    //       responsive: {
    //           rules: [{
    //               condition: {
    //                   maxWidth: 600
    //               },
    //               chartOptions: {
    //                   xAxis: {
    //                       labels: {
    //                           style: {
    //                               fontSize: '10px'
    //                           }
                              
    //                       }
    //                   },
    //                   plotOptions: {
    //                       column: {
    //                           dataLabels: {
    //                               allowOverlap:false,
    //                               style: {
    //                                   fontSize: '9.5px'
    //                               }
    //                           }
    //                       }
    //                   },
    //                   legend: {
    //                       alignColumns: false,
    //                       itemDistance: 10,
    //                       lineHeight:8,
    //                       margin:4,
    //                       padding:3,
    //                       itemStyle: {
    //                           fontSize: '9px'
    //                       }
    //                   }
    //               }    
    //           }]
    //       }
    //   },
      chartConfig: {

        title: {
            text: 'Структура зайнятості співробітників'
        },
    
        yAxis: {
            title: {
                text: 'Кількість співробітників'
            }
        },
    
        xAxis: {
            categories: ['Працює', 'Відпустка', 'Не працює']
        },
    
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
    
        series: [{
            name: 'Співробітників',
        }, ],
    
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    
    },
    init: function() {
            let executeQuery = {
                queryCode: 'wt_ChartLine_SelectRows',
                parameterValues: [],
                limit: -1
            };
    
            this.queryExecutor(executeQuery, this.load, this);
      },
      load: function(data) {
          let rows = data.rows;
          this.chartConfig.series[0].data = []; 
              let p1 = {
                  name: 'Працює',
                  y: rows[0].values[0]
              }
  
              let p2 = {
                  name: 'Відпустка',
                  y: rows[0].values[1]
              }
  
              let p3 = {
                  name: 'Не працює',
                  y: rows[0].values[2]
              }
  

              this.chartConfig.series[0].data.push(p1); 
              this.chartConfig.series[0].data.push(p2); 
              this.chartConfig.series[0].data.push(p3); 

          
          this.render(); 
          Array.from(document.querySelectorAll('div[id="null"]')).forEach( el => el.style.overflow = "hidden");
        
      },
      destroy(){
      }        
  };
  }());
  ;
  }());
  