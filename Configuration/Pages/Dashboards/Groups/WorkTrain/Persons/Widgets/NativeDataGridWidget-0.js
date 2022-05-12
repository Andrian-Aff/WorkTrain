(function () {
  return {
    config: {
        query: {
            code: 'wt_Table_SelectRows',
            parameterValues: [],
            filterColumns: [],
            sortColumns: [],
            skipNotVisibleColumns: true,
            chunkSize: 1000
        },
         allowColumnReordering: true,
         allowColumnResizing: true,
        columnAutoWidth: true,
        showBorders: false,
        showColumnLines: false,
        showRowLines: true,
        remoteOperations: null,
        allowColumnReordering: null,
        rowAlternationEnabled: null,
        columnAutoWidth: null,
        hoverStateEnabled: true,
        columnWidth: null,
        wordWrapEnabled: true,
        allowColumnResizing: true,
        showFilterRow: true,
        showHeaderFilter: false,
        showColumnChooser: false,
        showColumnFixing: true,
        groupingAutoExpandAll: null,
        columnMinWidth: 100,
        paging: {
            pageSize: 10000
        }, 
        pager: {
            showPageSizeSelector: false,
            showInfo: false
        },
        columns: [
            {
                dataField: 'PIB',
                caption: 'ПІБ'
            },
            {
                dataField: 'Date_Employ',
                caption: 'Дата прийому',
                width: 100,
                dataType: "datetime",
                format: "yyyy-MM-dd"
            },
            {
                dataField: 'Date_Uneploy',
                caption: 'Дата звільнення',
                width: 100,
                dataType: "datetime",
                format: "yyyy-MM-dd, HH:mm"
            },
            {
                dataField: 'DepartmentName',
                caption: 'Відділ'
            },
            {
                dataField: 'PositionName',
                caption: 'Посада'
            },
            {
                dataField: 'StatusName',
                caption: 'Статус'
            }
        ],
        keyExpr: 'Id'
    },

    init: function() {
         this.loadData(this.afterLoadDataHandler);

        // this.dataGridInstance.onCellPrepared.subscribe(e => {
        //     if(e.column.dataField === 'Region' && e.data !== undefined) {
        //         fieldHtml = '<b style="text-decoration: underline; color: #004479f2; cursor: pointer;">'+e.data.Region+'</b>';
        //         e.cellElement.innerHTML = fieldHtml;
        //     }
        // });

      
        // this.dataGridInstance.onCellClick.subscribe(e => {
        //     e.event.stopImmediatePropagation();
        //     if(e.column) {
        //         if(e.column.dataField === 'Region' && e.row !== undefined) {
        //             // let message = {
        //             //     name: 'TableFilterChanged',
        //             //     value: e.key
        //             // }
        //             // this.messageService.publish(message); 
                    
        //             var date1 = new Date(this.Date);
        //             var values1 = [ date1.getDate(), date1.getMonth() + 1 ];
        //             for( var id in values1 ) {
        //               values1[ id ] = values1[ id ].toString().replace( /^([0-9])$/, '0$1' );
        //             }
        //             let formated_start_date =  date1.getFullYear()+'-'+values1[ 1 ]+'-'+values1[ 0 ];


        //             this.goToDashboard('Prozorro_Report_Detail', {queryParams: [{'Edr': e.key}, {'SumStart': this.SumStart}, {'SumEnd': this.SumEnd}, {'Date': formated_start_date}]});
        //             // window.open(location.origin + localStorage.getItem('VirtualPath') + "/sheet/page/Prozorro_Report_Detail?Edr=" + e.key + "&SumStart=" + this.SumStart + "&SumEnd=" + this.SumEnd+ "&Date=" + formated_start_date, "_blank");
        //         }
        //     }
        // });



    },
    afterLoadDataHandler: function(data) {
        this.render();
    },
    destroy(){
    }
};
}());
