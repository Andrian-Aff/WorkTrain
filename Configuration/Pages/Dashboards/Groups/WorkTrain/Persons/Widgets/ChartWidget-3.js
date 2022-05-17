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
      chartConfig: {
        chart: {
            //   height: 300
            backgroundColor: '#eeeeee00',
        },
        credits: {
                      enabled: false
                  },
        title: {
            text: 'Структура зайнятості співробітників'
        },
        
        yAxis: {
            title: {
                text: 'Кількість співробітників'
            }
        },
    
        xAxis: {
            categories: []
        },
    
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
    
        series: [{
            name: 'К-сть Співробітників',
            data: [1,2,3,4]
        }],
    
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
        },
        plotOptions: {
            series: {
                         allowPointSelect: true,
                         point: {}
                    }
            }
        
    
    },
    onPointSelect: function(event) {
            // var message = {
            //     name: 'showValue',
            //     package: {
            //         value: event.context.y
            //     }
            // }
            // this.messageService.publish(message);
    },
    subscriptions: [],
    renderChart: function(message) {
        if (message.package.selected) {
            this.chartConfig.title.text = 'Структура зайнятості співробітників'
            message.package.name = null;
        } else {
            this.chartConfig.title.text = message.package.name
        }

        let executeQuery = {
            queryCode: 'wt_ChartLine_SelectRows',
            parameterValues: [
                {key: '@Name', value: message.package.name}
            ],
            limit: -1
        };    
        this.queryExecutor(executeQuery, this.load, this);
    },
    init: function() {
            this.subscriptions.push(this.messageService.subscribe('pie_selectValue', this.renderChart, this));

            let executeQuery = {
                queryCode: 'wt_ChartLine_SelectRows',
                parameterValues: [
                    {key: '@Name', value: null}
                ],
                limit: -1
            };    
            this.queryExecutor(executeQuery, this.load, this);
      },
      load: function(data) {
        let rows = data.rows;
        this.chartConfig.series = [{
                        name: 'К-сть Співробітників',
                        data: []
                    }];
        this.chartConfig.xAxis.categories = []; 
          for (let i=0; i< rows.length; i++) {
              this.chartConfig.xAxis.categories.push(rows[i].values[0]);
              this.chartConfig.series[0].data.push(rows[i].values[1]); 
          };
          this.chartConfig.xAxis.categories = this.chartConfig.xAxis.categories.map((e)=>{
            const spD =  e.split('T');
            return spD[0];
           })
          this.render(); 
          Array.from(document.querySelectorAll('div[id="null"]')).forEach( el => el.style.overflow = "hidden");
        
      },
      unsubscribeFromMessages(){
        for(var i =0; i < this.subscriptions.length; i++) {
                this.subscriptions[i].unsubscribe();
        }
      },
      destroy(){
           this.unsubscribeFromMessages();
      }      
  };
  }());
  ;
  }());
  